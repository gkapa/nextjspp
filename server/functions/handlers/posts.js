const { db, admin } = require("../util/admin");
const { FieldValue } = require("firebase-admin").firestore;
const { splitTimeStamp } = require("../util/converters");
const firebase = require("firebase");

// 정렬 참고
// https://firebase.google.com/docs/firestore/query-data/order-limit-data?hl=ko

const categories = ["一般", "情報", "その他"];

exports.getPostsFromPage = async (req, res) => {
  const reqData = {
    page: parseInt(req.params.page, 10),
    postNumPerPage: 10,
  };
  let resData = {
    postsData: [],
    pageData: {
      latestPostIdx: 0,
    },
  };

  try {
    // 表示版の見せるページの数を次のようにします
    // first post = {(latest post idx) - (target page - 1)*(postNum per page)} から
    // last post = (first post) - (postNum per page + 1)まで
    if (reqData.page < 1) throw { errors: "invalid page" };

    const latestPostQry = await db
      .collection(`posts`)
      .orderBy("idx", "desc")
      .limit(1)
      .get();
    if (latestPostQry.empty) throw { errors: "no post found" };

    const targetPage = reqData.page;
    const postNumPerPage = reqData.postNumPerPage;
    const latestPostIdx = latestPostQry.docs[0].data().idx;
    let lastPostIdxOfPage = latestPostIdx - (targetPage - 1) * postNumPerPage;
    let firstPostIdxOfPage = Math.max(
      1,
      lastPostIdxOfPage - postNumPerPage + 1,
    );
    if (lastPostIdxOfPage < firstPostIdxOfPage)
      lastPostIdxOfPage = firstPostIdxOfPage;

    const postsListQry = await db
      .collection(`posts`)
      .where(`idx`, `<=`, lastPostIdxOfPage)
      .where(`idx`, `>=`, firstPostIdxOfPage)
      .limit(postNumPerPage)
      .get();

    for (const doc of postsListQry.docs) {
      if (!doc.exists) continue;
      const donorQry = await db.collection(`users`).doc(doc.data().donor).get();
      if (!donorQry.exists) continue;

      let createdAt = splitTimeStamp(doc.data().created_at);
      const currentTime = splitTimeStamp(admin.firestore.Timestamp.now());
      if (currentTime.day !== createdAt.day) {
        createdAt = `${createdAt.year}.${createdAt.month}.${createdAt.day}`;
      } else {
        createdAt = `${createdAt.hour}:${createdAt.min}`;
      }

      let newData = {
        idx: doc.data().idx,
        status: doc.data().status,
        category: doc.data().category,
        title: doc.data().title,
        created_at: createdAt,
        donor: donorQry.data().sign_id,
        view_cnt: doc.data().view_cnt,
        like_quantity: doc.data().like_cnt - doc.data().dislike_cnt,
        comment_cnt: doc.data().comment_cnt,
      };

      if (doc.data().status === "disabled") {
        newData = {
          ...newData,
          category: "",
          title: "この書き込みは削除されました",
          donor: "",
          view_cnt: 0,
          like_quantity: 0,
          comment_cnt: 0,
        };
      }

      resData.postsData.push(newData);
    }
    resData.postsData.reverse();
    resData.pageData.latestPostIdx = lastPostIdxOfPage;

    return res.status(200).json(resData);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.createPost = async (req, res) => {
  const reqData = {
    donor: req.fbAuth.uid,
    category: req.body.category,
    title: req.body.title,
    body: req.body.body,
  };

  try {
    if (reqData.title.length < 2 || reqData.title.length > 40)
      throw { title: "length limitation error" };
    if (reqData.body.length < 2 || reqData.body.length > 2000)
      throw { body: "length limitation error" };
    if (!categories.includes(reqData.category))
      throw { category: "invalid category" };

    let idx = 1;
    const latestPostQry = await db
      .collection("posts")
      .orderBy("idx", "desc")
      .limit(1)
      .get();
    if (!latestPostQry.empty) idx = latestPostQry.docs[0].data().idx + 1;

    const newData = {
      idx: idx,
      status: "",
      donor: reqData.donor,
      category: reqData.category,
      title: reqData.title,
      body: reqData.body,
      created_at: admin.firestore.Timestamp.now(),
      updated_at: "",
      view_cnt: 0,
      like_cnt: 0,
      dislike_cnt: 0,
      comment_cnt: 0,
    };

    await db.collection("posts").add(newData);
    return res.status(201).json({ result: `page ${idx} added` });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.disablePost = async (req, res) => {
  const reqData = {
    idx: parseInt(req.params.idx, 10),
  };
  let resData = {};

  try {
    const postQry = await db
      .collection(`posts`)
      .where(`idx`, `==`, reqData.idx)
      .limit(1)
      .get();
    if (postQry.empty) throw { errors: "post not found" };
    if (postQry.docs[0].data().donor !== req.fbAuth.uid)
      throw {
        errors: "invalid id",
      };

    await db.collection(`posts`).doc(postQry.docs[0].id).update({
      status: "disabled",
    });

    return res.status(200).json(resData);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.getPost = async (req, res) => {
  const reqData = {
    idx: parseInt(req.params.idx, 10),
  };
  let resData = {
    postData: {},
    commentsData: {},
  };

  try {
    const postsQry = await db
      .collection(`posts`)
      .where(`idx`, `==`, reqData.idx)
      .limit(1)
      .get();
    if (postsQry.empty) throw { errors: "doc not found" };
    if (postsQry.docs[0].data().status === "disabled")
      throw { disabled: "disabled doc" };

    const userQry = await db
      .collection(`users`)
      .doc(postsQry.docs[0].data().donor)
      .get();
    if (!userQry.exists) throw { errors: "user not found" };

    let createdAt = splitTimeStamp(postsQry.docs[0].data().created_at);
    createdAt = `${createdAt.days} ${createdAt.hours}`;

    resData.postData = {
      ...postsQry.docs[0].data(),
      // idx
      // status
      // view_cnt
      // like_cnt
      // dislike_cnt
      donor: userQry.data().sign_id,
      uid: postsQry.docs[0].data().donor,
      like_quantity:
        postsQry.docs[0].data().like_cnt - postsQry.docs[0].data().dislike_cnt,
      created_at: createdAt,
      updated_at: postsQry.docs[0].data().updated_at || undefined,
    };

    await db
      .collection(`posts`)
      .doc(postsQry.docs[0].id)
      .update({
        view_cnt: FieldValue.increment(1),
      });

    return res.status(200).json(resData);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

exports.editPost = async (req, res) => {
  const reqData = {
    category: req.body.category,
    title: req.body.title,
    body: req.body.body,
    idx: parseInt(req.params.idx, 10),
  };
  let resData = {};

  try {
    if (!categories.includes(reqData.category))
      throw { category: "invalid category" };

    const postQry = await db
      .collection(`posts`)
      .where(`idx`, `==`, reqData.idx)
      .limit(1)
      .get();
    if (postQry.empty) throw { errors: "editable doc not found" };

    if (postQry.docs[0].data().donor !== req.fbAuth.uid)
      throw { errors: "wrong approach" };

    await db.collection(`posts`).doc(postQry.docs[0].id).update({
      category: reqData.category,
      title: reqData.title,
      body: reqData.body,
      updated_at: admin.firestore.Timestamp.now(),
    });

    return res.status(200).json(resData);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};
