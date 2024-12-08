import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated, onLogout }) => {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between">
        <div>
          <Link to="/" className="mr-4">
            Home
          </Link>
        </div>
        {isAuthenticated ? (
          <button
            onClick={onLogout}
            className="bg-red-500 px-4 py-2 rounded"
          >
            Logout
          </button>
        ) : (
          <div>
            <Link to="/login" className="bg-blue-500 px-4 py-2 rounded">
            Login
          </Link>
          <Link to="/register" className="bg-blue-500 px-4 py-2 rounded">
            Register
          </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

// import React from 'react';
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//   return (
//     <nav className="bg-blue-500 text-white p-4">
//       <div className="container mx-auto flex justify-between">
//         <Link to="/" className="font-bold text-lg">
//           Sibghat Store
//         </Link>
//         <div className="space-x-4">
//           <Link to="/cart" className="hover:underline">Cart</Link>
//           <Link to="/wishlist" className="hover:underline">Wishlist</Link>
//           <Link to="/profile" className="hover:underline">Profile</Link>
//           <Link to="/orders" className="hover:underline">Orders</Link>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
