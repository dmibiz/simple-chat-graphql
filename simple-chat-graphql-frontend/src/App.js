import 'bootstrap/dist/css/bootstrap.css';
import Login from './components/pages/login';
import Chat from './components/pages/chat';
import Register from './components/pages/register';
import {
  BrowserRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";
import AuthenticationBasedRoute from './components/routes/authenticationbased';
import { useSelector } from 'react-redux';
import { LOGIN_ROUTE_PATH, CHAT_ROUTE_PATH, REGISTER_ROUTE_PATH } from './constants';

const App = () => {
  const authData = useSelector(({ auth }) => auth);
 
  return (
    <Router>
      <Switch>
        <AuthenticationBasedRoute path={LOGIN_ROUTE_PATH} authData={authData} fallbackPath={CHAT_ROUTE_PATH} anonymous>
          <Login />
        </AuthenticationBasedRoute>
        <AuthenticationBasedRoute path={REGISTER_ROUTE_PATH} authData={authData} fallbackPath={CHAT_ROUTE_PATH} anonymous>
          <Register />
        </AuthenticationBasedRoute>
        <AuthenticationBasedRoute path={CHAT_ROUTE_PATH} authData={authData} fallbackPath={LOGIN_ROUTE_PATH}>
          <Chat />
        </AuthenticationBasedRoute>
        <Redirect from="/" to={CHAT_ROUTE_PATH} exact/>
      </Switch>
    </Router>
  );
}

export default App;
