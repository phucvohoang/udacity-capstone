import React, { Component } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { Layout, Button, Row } from 'antd';
import Main from './pages/Main';
import { useAuth0 } from '@auth0/auth0-react';

// import Auth from './auth/Auth';
// import { EditTodo } from './components/EditTodo';
// import { LogIn } from './components/LogIn';
// import { NotFound } from './components/NotFound';
// import { Todos } from './components/Todos';

const { Header, Content, Footer } = Layout;

// const Profile = () => {
//   const { isAuthenticated, loginWithRedirect, logout, getIdToken } = useAuth0();

//   if (!isAuthenticated) {
//     return <button onClick={loginWithRedirect}>Log in</button>;
//   }

//   return (
//     <div>
//       <p>Welcome, {getIdToken().name}!</p>
//       <button onClick={logout}>Log out</button>
//     </div>
//   );
// };
const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <Button
      size="large"
      type="primary"
      onClick={() =>
        logout({
          returnTo: window.location.origin,
        })
      }
    >
      Log Out
    </Button>
  );
};
const LoginButton = () => {
  const { loginWithRedirect, logout, isAuthenticated, loginWithPopup } = useAuth0();
  if (isAuthenticated) {
  }
  return (
    <Button size="large" type="primary" onClick={() => loginWithPopup()}>
      Log In
    </Button>
  );
};
const App = () => {
  const { isAuthenticated, user, getAccessTokenSilently, getIdTokenClaims, logout } = useAuth0();
  console.log('🚀 ~ file: App.js:56 ~ App ~ isAuthenticated:', isAuthenticated);
  const getIdToken = async () => {
    try {
      const idToken = await getIdTokenClaims();
      console.log('🚀 ~ file: App.js:61 ~ getIdToken ~ idToken:', idToken.__raw);
    } catch (error) {
      console.log(error);
    }
  };
  if (isAuthenticated) {
    console.log(user);
    getIdToken();
  }
  // logout();
  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center', backgroundColor: '#fff' }} color="#fff">
        <Row style={{ width: '100%' }} justify="end">
          {/* {this.logInLogOutButton()} */}
          {isAuthenticated ? <LogoutButton /> : <LoginButton />}
        </Row>
      </Header>
      <Content style={{ height: '90vh', marginTop: '20px' }}>
        {!isAuthenticated ? (
          <Row justify="center">
            <h1>Welcome to Udagram, please login first</h1>
          </Row>
        ) : (
          <Main />
          // <Routes>
          //   <Route path="/" element={<Main />} />
          //   <Route path="/create-post" element={<CreatePost />} />
          //   <Route path="/edit-post/:postId" element={<CreatePost />} />
          // </Routes>
        )}
      </Content>
    </Layout>
  );
};

// class App extends Component {
//   constructor(props) {
//     super(props);

//     this.handleLogin = this.handleLogin.bind(this);
//     this.handleLogout = this.handleLogout.bind(this);
//   }
//   componentDidMount() {
//     console.log(this.props);
//   }

//   handleLogin() {
//     this.props.auth.login();
//   }

//   handleLogout() {
//     this.props.auth.logout();
//   }

//   render() {
//     return (
//       <Layout>
//         <Header style={{ display: 'flex', alignItems: 'center', backgroundColor: '#fff' }} color="#fff">
//           <Row style={{ width: '100%' }} justify="end">
//             {this.logInLogOutButton()}
//           </Row>
//         </Header>
//         <Content style={{ height: '90vh', marginTop: '20px' }}>
//           <Row></Row>
//           <p>Hello</p>
//         </Content>
//       </Layout>
//       // <div>

//       //   {/* <Main /> */}
//       // </div>
//     );
//   }

//   // generateMenu() {
//   //   return (
//   //     <Menu>
//   //       <Menu.Item name="home">
//   //         <Link to="/">Home</Link>
//   //       </Menu.Item>

//   //       <Menu.Menu position="right">{this.logInLogOutButton()}</Menu.Menu>
//   //     </Menu>
//   //   );
//   // }

// logInLogOutButton() {
//   if (this.props.auth.isAuthenticated()) {
//     return (
//       // <Menu.Item name="logout" onClick={this.handleLogout}>
//       //   Log Out
//       // </Menu.Item>
//       <Button size="large" type="primary" onClick={this.handleLogout}>
//         Log Out
//       </Button>
//     );
//   } else {
//     return (
//       // <Menu.Item name="login" onClick={this.handleLogin}>
//       //   Log In
//       // </Menu.Item>
//       <Button size="large" style={{ backgroundColor: '#333', width: '200px' }} type="primary" onClick={this.handleLogin}>
//         Log In
//       </Button>
//     );
//   }
// }

//   // generateCurrentPage() {
//   //   if (!this.props.auth.isAuthenticated()) {
//   //     return <LogIn auth={this.props.auth} />;
//   //   }

//   //   return (
//   //     <Switch>
//   //       <Route
//   //         path="/"
//   //         exact
//   //         render={(props) => {
//   //           return <Todos {...props} auth={this.props.auth} />;
//   //         }}
//   //       />

//   //       <Route
//   //         path="/todos/:todoId/edit"
//   //         exact
//   //         render={(props) => {
//   //           return <EditTodo {...props} auth={this.props.auth} />;
//   //         }}
//   //       />

//   //       <Route component={NotFound} />
//   //     </Switch>
//   //   );
//   // }
// }

export default App;
