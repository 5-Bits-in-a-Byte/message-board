import React, { useContext, useState, useEffect } from "react";
import styled, { css } from "styled-components";
import Options from "./Options";
import Post from "./Post";
import Button from "../common/Button";
import LineWidthImg from "../../imgs/line-width.svg";
import HollowPinImg from "../../imgs/pin-hollow.svg";
import { useParams } from "react-router-dom";
import Fetch from "../common/requests/Fetch";
import { UserContext } from "../context/UserProvider";
import io from "../../services/socketio";
import PostWrapper from "./refactorComponents/PostWrapper";
import Poll from "react-polls";
import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import PollWrapper from "./refactorComponents/PollWrapper";

const convertToUpper = (postType) => {
  var first = postType[0].toUpperCase();
  var rest = postType.slice(1);
  return first + rest;
};

const createPost = (post, userRole, isCondensed) => {
  const postType = convertToUpper(post.content.type);

  var content;
  // console.log("postType: ", postType);
  if (
    post.content.type === "question" ||
    post.content.type === "announcement"
  ) {
    content = (
      <Editor
        readOnly
        toolbarHidden
        name="content"
        editorState={EditorState.createWithContent(
          convertFromRaw(post.content.raw)
        )}
        // editorState={EditorState.createEmpty()}
        editorStyle={{
          // backgroundColor: "#f1f1f1",
          minHeight: "100px",
          padding: "0 8px",
          maxHeight: "200px",
          overflow: "hidden",
          border: "2px solid #e7e7e7",
          borderRadius: "5px",
        }}
        // placeholder="Details"
        // onEditorStateChange={handleContentChange}
        toolbar={{
          options: ["inline", "list", "link", "emoji", "history", "blockType"],
        }}
      />
    );
  } else if (post.content.type === "poll") {
    content = <PollWrapper post={post} />;
  }

  return (
    // <Post userRole={userRole} post={post} key={post._id} isCondensed={false} />
    <PostWrapper
      postObject={post}
      postType={postType}
      condensed={isCondensed}
      content={content}
    />
  );
};

// Sorts the posts by pinned/date
const generateSections = (data, userRole, isCondensed) => {
  let posts = { pinned: [], other: [] };
  if (data) {
    data.forEach((post) => {
      if (post.isPinned) {
        posts.pinned.push(createPost(post, userRole, isCondensed));
      } else {
        posts.other.push(createPost(post, userRole, isCondensed));
      }
    });
  }
  return posts;
};

const PostView = ({ userRole, highlightedSection }) => {
  const user = useContext(UserContext);
  const [socketPosts, setSocketPosts] = useState([]);
  const [pollAns, setPollAns] = useState(null);

  useEffect(() => {
    io.emit("join", { room: courseId, room_type: "course" });
    io.on("Post/create", (post) => {
      // Ensure the user isn't the one who posted it
      console.log(post);
      if (
        post &&
        post.postedBy._id !== user._id &&
        post.postedBy._id !== user.anonymousId
      ) {
        setSocketPosts([post, ...socketPosts]);
      }
    });

    return () => {
      io.emit("leave", { room: courseId });
    };
  }, []);

  const [isCondensed, setCondensedState] = useState(false);
  const [sortByMostRecent, toggleSort] = useState(true);
  // Retrieves the courseId from the url parameters
  const { courseId } = useParams();
  let endpoint = "/api/courses/" + courseId + "/posts";

  switch (highlightedSection) {
    case "Instructor":
      endpoint += "?filterby=instructor";
      break;
    case "My Posts":
      endpoint += "?filterby=me";
      break;
    case "My Upvoted":
      endpoint += "?filterby=myupvoted";
      break;
    default:
    // Don't add a filter to endpoint
  }

  if (!sortByMostRecent) {
    if (highlightedSection !== "All Posts") {
      endpoint += "&sortby=oldest";
    } else {
      endpoint += "?sortby=oldest";
    }
  }

  // Load posts from course
  let { data, errors, loading } = Fetch({
    type: "get",
    endpoint: endpoint,
  });
  if (data) {
    console.log("DATA: ", data);
    data = [...socketPosts, ...data];
  }

  let posts = generateSections(data, userRole, isCondensed);

  return (
    <>
      <PostFeed>
        <ScrollingDiv>
          <CenterWrapper>
            <SortingOptions>
              <Button
                secondary={true}
                onClick={() => {
                  setCondensedState(!isCondensed);
                }}
              >
                <img src={LineWidthImg} />
              </Button>
              <Button
                secondary={true}
                style={MarginLeftRight}
                onClick={() => toggleSort(!sortByMostRecent)}
              >
                {sortByMostRecent ? "Most Recent" : "Oldest"}
              </Button>
            </SortingOptions>
            {posts.pinned.length > 0 && (
              <PostGroupingHeader>
                <img
                  src={HollowPinImg}
                  style={{ width: 18, height: 18, marginRight: 5 }}
                />
                Pinned Posts
              </PostGroupingHeader>
            )}
            {posts.pinned}
            {posts.other.length > 0 && (
              <PostGroupingHeader>All Posts</PostGroupingHeader>
            )}
            {posts.other}
            <Options userRole={userRole} courseId={courseId} />
            <OverflowCounter offsetAmount={"0.25rem"} />
          </CenterWrapper>
        </ScrollingDiv>
      </PostFeed>
    </>
  );
};

PostView.propTypes = {};

export default PostView;

const MarginLeftRight = {
  marginLeft: "1em",
  marginRight: "1em",
};

const PostFeed = styled.div`
  width: 100%;
  position: relative;
  display: flex;
`;

const ScrollingDiv = styled.div`
  position: absolute;
  display: flex;
  height: 100%;
  width: 100%;
  padding: 0 40px;
  overflow: auto;
`;

const CenterWrapper = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;
  padding-right: 280px;
  position: relative;
`;

const SortingOptions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  margin: 2.2em 0 1em 0;
  position: absolute;
  padding-right: 280px;
`;

const PostGroupingHeader = styled.div`
  margin: 2.2em 0 0em 0;
  font-size: 1.25em;
  font-weight: 500;
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
