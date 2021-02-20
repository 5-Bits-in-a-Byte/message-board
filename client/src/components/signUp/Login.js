/*
This component deals with the sign in process by redirecting to Google for authentication upon button click.
After the authentication process happens, the flask server will send you immediately to the website's home page.

Author: Brian Gunnarson
Group Name: 5 Bits in a Byte

Modificiation Tracking:
2-15-2021: Initial setup/get background image displayed and styled
2-16-2021: Work with Sam to get the routing to Google's OAuth functioning
2-17-2021: Basic styling/Google sign-in button imported/Incorporate logos and copyright
*/

import React from "react";
import styled from "styled-components";
import img from "../../imgs/signup-background.png";
import SignInLogo from "../../imgs/signin-logo.png";
import Logo from "../../imgs/swag-logo.png";
import GoogleLogo from "../../imgs/g-icon.png";

const SignUp = () => {
  return (
    <Page>
      <Nav>
        <SignInLogoImg src={SignInLogo} />
      </Nav>
      <CenterBlock>
        <LogoImg src={Logo} />
        <GoogleButton href={process.env.REACT_APP_SERVER_URL + "/login"}>
          <div>
            <GoogleImg src={GoogleLogo} />
            <p>hello</p>
          </div>
        </GoogleButton>
        <Message>
          Already have an account?{"\t"}
          <a href={process.env.REACT_APP_CLIENT_URL + "/login"}>Sign in</a>
        </Message>
      </CenterBlock>
      <Footer>Copyright© 5 Bits in a Byte</Footer>
    </Page>
  );
};

export default SignUp;

const Page = styled.div`
  background-image: url(${img});
  height: 100vh;
  display: grid;
`;

const Nav = styled.nav`
  width: 100vw;
  height: 55px;
  position: fixed;
  left: 0;
  top: 0;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
`;

const SignInLogoImg = styled.img`
  height: 33px;
  margin-left: 10px;
`;

const CenterBlock = styled.div`
  position: relative;
  background: #ffffff;
  width: 300px;
  height: 250px;
  border-radius: 5px;
  display: grid;
  margin: auto;
`;

const LogoImg = styled.img`
  height: 25px;
  margin: auto;
`;

const GoogleButton = styled.a`
  margin: auto;
  display: flex;
  align-items: center;
`;

const GoogleImg = styled.img`
  height: 25px;
  margin: auto;
`;

const Btn = styled.div`
  position: relative;
  background: #000000;
  width: 300px;
  height: 250px;
  border-radius: 5px;
  display: grid;
  margin: auto;
`;

const Message = styled.div`
  margin: auto;
  display: flex;
  align-items: center;
`;

const Footer = styled.footer`
  text-align: center;
  font-size: 10px;
  color: white;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 20px;
`;
