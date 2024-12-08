import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';

// App Component
const App = () => {
  // Simple authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('authToken') // Check token on app load
  );

  const handleLogin = (token) => {
    localStorage.setItem('authToken', token); // Save token to localStorage
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Clear token
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        {/* Protected Home Route */}
        <Route
          path="/"
          element={
            isAuthenticated ? <Home /> : <Navigate to="/login" />
          }
        />
        {/* Login Route */}
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} />}
        />
        {/* Register Route */}
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Cart from './components/Cart';
// import Wishlist from './components/Wishlist';
// import Profile from './components/Profile';
// import OrderHistory from './components/OrderHistory';

// function App() {
//   return (
//     <Router>
//       <div className="min-h-screen bg-gray-100">
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/cart" element={<Cart />} />
//           <Route path="/wishlist" element={<Wishlist />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/orders" element={<OrderHistory />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
