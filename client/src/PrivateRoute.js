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
    LazyFetch({
      type: "get",
      endpoint: "/api/me",
      onSuccess: (data) => {
        if (data && data._id) {
          console.log("Data:" + data);
          setUser(data);
        }
      },
      onFailure: (err) => {
        console.log("Error completing sign in:", err);
        setUser(false);
      },
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
