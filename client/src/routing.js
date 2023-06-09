import React from 'react';
import { AuthProvider } from 'auth0-js';
import Auth from './auth/Auth';
import { Router, Route, BrowserRouter, Routes, useLocation, useNavigate } from 'react-router-dom';
// import Callback from './components/Callback';
import CreatePost from './pages/CreatePost';
import { useAuth0 } from '@auth0/auth0-react';
// import createHistory from 'history/createBrowserHistory';
// import { createBrowserHistory } from 'history';
import App from './App';
import { Spin } from 'antd';
import Auth0ProviderWithHistory from './containers/AuthWithHistory';
// const history = createBrowserHistory();
let auth = new Auth();
const handleAuthentication = (history) => {
  // const location = props.location;
  // const location = useLocation();
  if (/#access_token|id_token|error/.test(history.hash)) {
    auth.handleAuthentication();
  }
};

const Callback = (props) => {
  const { logout, user, isAuthenticated } = useAuth0();
  const history = useNavigate();
  if (isAuthenticated) {
    history.push('/');
    return null;
  }
  logout();
  // console.log('🚀 ~ file: routing.js:24 ~ Callback ~ history:', history);
  // handleAuthentication(history);
  return <Spin />;
};

const Routing = () => {
  // const history = useNavigate();
  return (
    // <BrowserRouter>
    <Auth0ProviderWithHistory>
      <App />
      {/* <Routes>
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/edit-post/:postId" element={<CreatePost />} />
        <Route path="/" element={<App />} />
      </Routes> */}
    </Auth0ProviderWithHistory>
  );
};

export default Routing;
// const Routing = () => {
//   return <p>hello</p>;
// };
// export default Routing;
