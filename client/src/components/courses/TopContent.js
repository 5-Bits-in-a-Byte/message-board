import React, { useState } from "react";
import styled from "styled-components";
import Button from "../common/Button";
import JoinCourse from "./JoinCourse";
import CreateCourse from "./CreateCourse";

const TopContent = () => {
  return (
    <div className="flex-row align">
      <Title>COURSES</Title>
      <JoinCourse />
      <CreateCourse />
    </div>
  );
};

export default TopContent;

const Title = styled.h4`
  margin-right: 15px;
`;
