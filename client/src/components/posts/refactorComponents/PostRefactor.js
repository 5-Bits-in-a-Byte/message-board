import React, { useState, useEffect, useContext, useParams } from "react";
import styled, { css } from "styled-components";
import Options from "../Options";
import OptionsPanel from "./OptionsPanel";
import PostWrapper from "./PostWrapper";
import Poll from "react-polls";

const pollAnswers = [
  { option: "Yes", votes: 8 },
  { option: "No", votes: 2 },
];

const createPost = (postType, postData, userRole) => {
  return <PostWrapper postType={postType} />;
};

const PostRefactor = ({ userRole, highlightedSection, ...props }) => {
  const [pollAns, setPollAns] = useState(pollAnswers);

  const handleVote = (voteAnswer) => {
    var pa = pollAns;
    const newPollAnswers = pa.map((answer) => {
      if (answer.option === voteAnswer) answer.votes++;
      return answer;
    });
    setPollAns(newPollAnswers);
  };

  //#region TEST_POSTS
  const TestPosts = (
    <>
      <PostWrapper
        // contentObject={{ postType: "Question" }}
        // isRead
        postType={"Question"}
      />
      <PostWrapper
        // contentObject={{ postType: "Question" }}
        // isRead
        postType={"Announcement"}
      />
      <PostWrapper
        contentObject={{ postType: "Question" }}
        // isRead
        postType={"Poll"}
        content={
          <Poll
            question={"Test Question?"}
            answers={pollAns}
            onVote={handleVote}
            noStorage
            // customStyles={{
            //   align: "center",
            //   theme: "cyan",
            // }}
          />
        }
      />
    </>
  );
  //#endregion

  return (
    <>
      <FlexWrapper>
        <Wrapper>
          <PostFeedWrapper>
            {true ? createPost("Question") : TestPosts}
          </PostFeedWrapper>
          <OptionsPanel userRole={false} />
        </Wrapper>
        <OverflowCounter offsetAmount={"2.5rem"} />
      </FlexWrapper>
    </>
  );
};

export default PostRefactor;

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100vh;

  /* border: 1px solid orange; */
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  min-width: 100%;
  height: 100%;
  overflow: auto;

  /* border: 1px solid green; */
`;

/** THIS ACCOUNTS FOR WEIRD SCROLLING DIV STUFF */
const OverflowCounter = styled.div`
  width: 100%;
  ${(props) =>
    props.offsetAmount &&
    css`
      padding: ${props.offsetAmount};
    `}/* border: 3px solid black; */
`;

const PostFeedWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 1rem;
  /* border: 1px solid green; */
`;
