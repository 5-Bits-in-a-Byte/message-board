import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavigationWrapper from "./components/navigation/NavigationWrapper";
import Courses from "./components/courses/Courses";
import SignUp from "./components/signUp/SignUp";
import Login from "./components/signUp/Login";
import "./fonts/fonts.css";
import Messages from "./components/messages/Messages";
import Home from "./components/home/Home";
import { UserProvider } from "./components/context/UserProvider";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <Router>
      <UserProvider>
        <Switch>
          <PrivateRoute path="/home" exact>
            <NavigationWrapper>
              <Home />
            </NavigationWrapper>
          </PrivateRoute>
          <PrivateRoute path="/" exact>
            <NavigationWrapper>
              <Courses />
            </NavigationWrapper>
          </PrivateRoute>
          <PrivateRoute path="/messages" exact>
            <NavigationWrapper>
              <Messages />
            </NavigationWrapper>
          </PrivateRoute>
          <Route path="/signup" exact>
            <SignUp />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
        </Switch>
      </UserProvider>
    </Router>
  );
}

export default App;
