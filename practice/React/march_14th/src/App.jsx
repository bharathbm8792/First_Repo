import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Login_page from "./components/Login_page"
import Signup_page from "./components/Signup_page"
import Form_input from "./components/Form_input"
import { Suspense, useState } from "react";

import { Input_context_Provider } from './components/Input_context';
// import Registration_succes from "./components/Registration_succes";

import Loading from "./components/Loading";
import Get_output from "./components/Get_output.jsx";
import Edit from "./components/Edit.jsx";
const Login_page = React.lazy(() => import('./components/Login_page.jsx'));
// const Form_input = React.lazy(() => import('./components/Form_input'));
const Registration_succes = React.lazy(() => import('./components/Registration_succes'));


function App() {

  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   let timeoutId;

  //   const resetLogoutTimer = () => {
  //     clearTimeout(timeoutId);
  //     timeoutId = setTimeout(() => {
  //       setIsLoggedIn(false);
  //     }, 60000); // 60 seconds
  //   };
  //   const handleUserActivity = () => {
  //     resetLogoutTimer();
  //   };

  //   window.addEventListener("mousemove", handleUserActivity);
  //   window.addEventListener("keypress", handleUserActivity);

  //   resetLogoutTimer();

  //   return () => {
  //     window.removeEventListener("mousemove", handleUserActivity);
  //     window.removeEventListener("keypress", handleUserActivity);
  //     clearTimeout(timeoutId);
  //   };
  // }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedLoggedIn = localStorage.getItem("isLoggedIn");
    return storedLoggedIn ? JSON.parse(storedLoggedIn) : false;
  });


  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  function handleLogin() {
    setIsLoggedIn(true);
  }

  function handleLogout() {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  }


  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login_page onLogin={handleLogin} />} />
          <Route path="/signup" element={isLoggedIn ? <Navigate to="/" /> : <Signup_page />} />

          {/* <Route path="/" element={
            <Input_context_Provider>
              <Form_input />
            </Input_context_Provider>
          } />
          <Route path="/registration_success"
            element={<Registration_succes />} />
          <Route path='/get'
            element={<Get_output />}
          />
          <Route path='/edit/:id'
            element={<Edit />}
          /> */}

          <Route
            path="/"
            element={isLoggedIn ?
              <Input_context_Provider>
                <Form_input onLogout={handleLogout} />
              </Input_context_Provider>
              : <Navigate to="/login" />
            }
          />
          <Route
            path="/registration_success"
            element={isLoggedIn ?
              <Registration_succes onLogout={handleLogout} />
              : <Navigate to="/login" />
            }
          />

          <Route
            path='/get'
            element={isLoggedIn ?
              <Get_output />
              : <Navigate to="/login" />}
          />
          <Route path='/edit/:id'
            element={isLoggedIn ?
              <Edit onLogout={handleLogout} />
              : <Navigate to="/login" />}
          />

        </Routes>
      </Suspense>
    </Router>
  )
}

export default App