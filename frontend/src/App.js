import logo from './logo.svg';
import './App.css';
import LoginSignup from './components/LoginSignupPage';
import data from './data.json'
import { Children, useEffect } from 'react';
import Form from './components/Form';
import DashboardPage from './pages/dashboard';
//@ts-ignore
import Home from './pages/homepage';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';



// const isAuthenticated = true; // Replace with your authentication logic

function PrivateOutlet({ children }) {
  const auth = localStorage.getItem('token');
  console.log(auth, "auth")
  return auth && auth.length > 0 ? <>{children}</> : <Navigate to="/" />;
}

const App = () => {
  return (
    <div className='p-10'>
      <Router>
        <Routes>
          {/* Public Route */}

          <Route exact path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={
              <PrivateOutlet>
                <DashboardPage />
              </PrivateOutlet>
            }
          />
          {/* Protected Route */}
          {/* <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} /> */}

          {/* 404 Page - Place this at the end */}
          {/* <Route component={NotFoundPage} /> */}
        </Routes>
      </Router>
    </div>
  );
};

export default App
