// import React, { useContext } from "react";
// import ActiveLink from './activeLink';

// import AuthContext, { AuthProvider } from '../context/AuthProvider';


// const Menu: React.FC = () => {


//   const { isAuthenticated, logout } = useContext(AuthContext);
//   console.log("autenticado?", isAuthenticated); 

//   return (

//     <header className="menu">


//       <div className="menu__logo-container">
//         <img
//           src="https://s3.amazonaws.com/appforest_uf/f1675864639870x117909144627389890/ngLogo.png"
//           alt="NG Cash logo"
//           width={100}
//         />
//       </div>


//       <div className="menu__buttons-container">
//         <ActiveLink href={"/"}>Home</ActiveLink>
//         <ActiveLink href={"/transactions"}>Transações</ActiveLink>  
//       </div>

      
//       <div className="menu__buttons-container">
//         {isAuthenticated ? (
//             <button onClick={logout}>Logout</button>
//           ) : (
//             <>
//               <ActiveLink href={"/login"}>Login</ActiveLink>
//               <ActiveLink href={"/register"}>Signup</ActiveLink>
//             </>
//           )}
//       </div>


//     </header>
//   );
// };

// export default Menu;


import React, { useContext } from "react";
import ActiveLink from './activeLink';

import { AuthContext } from '../context/AuthProvider';


const Menu: React.FC = () => {

  const { isAuthenticated, logout } = useContext(AuthContext);
  console.log("autenticado?", isAuthenticated); 

  const handleLogout = () => {
    logout();
  }

  return (
    <header className="menu">
      <div className="menu__logo-container">
        <img
          src="https://s3.amazonaws.com/appforest_uf/f1675864639870x117909144627389890/ngLogo.png"
          alt="NG Cash logo"
          width={100}
        />
      </div>
      <div className="menu__buttons-container">
        <ActiveLink href={"/"}>Home</ActiveLink>
        <ActiveLink href={"/transactions"}>Transações</ActiveLink>  
      </div>
      <div className="menu__buttons-container">
        {isAuthenticated ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <ActiveLink href={"/login"}>Login</ActiveLink>
              <ActiveLink href={"/register"}>Signup</ActiveLink>
            </>
          )}
      </div>
    </header>
  );
};

export default Menu;

