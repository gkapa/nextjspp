import React from "react";
import styled from "styled-components";

// Communication stuff
import axios from "axios";
import NextLink from "next/link";
import { useRouter } from "next/router";

// Material-ui stuff
import CreateIcon from "@material-ui/icons/Create";

// Components
import Button from "atoms/Button";
import { colors } from "styles/theme";
import ListTable from "./ListTable";
import PageGuide from "./PageGuide";

export interface IPageData {
  latestPostIdx: number;
}
export interface IPostData {
  idx: number;
  status: string;
  category: string;
  title: string;
  created_at: string;
  donor: string;
  view_cnt: number;
  like_quantity: number;
  comment_cnt: number;
}
export interface IListProps {
  postsData?: IPostData[];
  pageData?: IPageData;
}

export default function fun(props) {
  const nextRouter = useRouter();
  const [postsData, setPostsData] = React.useState<IPostData[] | null>(null);
  const [pageData, setPageData] = React.useState<IPageData | null>(null);

  React.useEffect(() => {
    (async function () {
      const listQry = await axios.get(
        `/api/posts/getpostsfrompage/${nextRouter.query.page}`,
      );
      setPostsData(listQry.data.postsData);
      setPageData(listQry.data.pageData);
      try {
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <Wrapper>
      <CommunityTitle>Dash Board</CommunityTitle>
      <ListTable postsData={postsData} pageData={pageData} />
      <ButtonsUnderTable>
        <NextLink href={`/community/write`}>
          <a>
            <Button
              className="write"
              bg={`${colors.lightgreen[5]}`}
              style={{ color: "white" }}>
              <CreateIcon></CreateIcon>書き込み
            </Button>
          </a>
        </NextLink>
      </ButtonsUnderTable>
      <PageGuide pageData={pageData} />
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
`;

const CommunityTitle = styled.div`
  font-size: 2.6rem;
  font-weight: 700;
  margin-top: 1rem;
  margin-left: 1.2rem;
  margin-bottom: 0.4rem;
`;

const ButtonsUnderTable = styled.div`
  margin-top: 0.8rem;
  margin-bottom: 1.6rem;
  margin-right: 1.2rem;

  display: flex;
  justify-content: flex-end;
  flex-direction: row;

  .write {
    width: 16rem;
    border-radius: 10px;
  }
`;
