import React from "react";
import styled from "styled-components";

// Communication stuff
import axios from "axios";
import NextRouter from "next/router";
import { useRouter } from "next/router";

// Material-ui stuff

// Redux stuff

// Components
// import Button from 'atoms/Button';
import List from "components/community/list";

export default function fun(props) {
  const nextRouter = useRouter();

  React.useEffect(() => {
    if (!nextRouter.query.page) NextRouter.push("/community/list?page=1");
  }, []);

  return (
    <Wrapper>{nextRouter.query.page && <List ssp={props.ssp}></List>}</Wrapper>
  );
}

const Wrapper = styled.div`
  width: 90%;
  margin: 0 auto;
`;

// export async function getServerSideProps(context) {
//   let ssp = {
//     postsData: null,
//     pageData: null,
//   };

//   // ssp.postsData = skeleton;
//   ssp.pageData = {
//     postNumPerPage: 10,
//     // latestPostIdx: 320,
//   };

//   try {
//     const dataQry = await fetch(
//       `${process.env.FUNCTIONS_URL}/api/posts/getpostsfrompage/${context.query.page}`,
//       {
//         method: "GET",
//       },
//     );
//     if (!dataQry.ok) throw { errors: await dataQry.json() };
//     const data = await dataQry.json();

//     ssp = { ...data };
//   } catch (err) {
//     // console.error(err);
//   }

//   return { props: { ssp } };
// }
