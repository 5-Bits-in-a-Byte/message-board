import axios from "axios";
import React, { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import {
  UserDispatchContext,
  UserContext,
} from "./components/context/UserProvider";
import LazyFetch from "./components/common/requests/LazyFetch";

const PrivateRoute = (props) => {
  const setUser = useContext(UserDispatchContext);
  const user = useContext(UserContext);

  const attemptSignIn = (token) => {
    //   LazyFetch({
    //     type: "get",
    //     endpoint: "/api/me",
    //     onSuccess: (data) => {
    //       if (data && data._id) {
    //         console.log("Data:" + data);
    //         setUser(data);
    //       }
    //     },
    //     onFailure: (err) => {
    //       console.log("Error completing sign in:", err);
    //       setUser(false);
    //     },
    //   });
    // };
    axios
      .get(process.env.REACT_APP_SERVER_URL + "/api/me", {
        withCredentials: true,
      })
      // User has an active cookie from server, sign in success
      .then((res) => {
        if (res.data && res.data._id) {
          console.log("Data:" + res.data);
          setUser(res.data);
        }
      })
      // No active cookie - redirect to login page
      .catch((err) => {
        console.log("Error completing sign in:", err);
        setUser(false);
      });
  };

  useEffect(() => {
    if (!user) {
      attemptSignIn();
    }
  });

  return (
    <Route {...props}>
      {user === null ? null : user !== false ? (
        <>{props.children}</>
      ) : (
        <Redirect to="/login" />
      )}
    </Route>
  );
};

export default PrivateRoute;
