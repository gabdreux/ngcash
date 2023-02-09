import React from 'react';
import Link from 'next/link';
import ActiveLink from './activeLink';


const Menu: React.FC = () => {

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
        <ActiveLink href={"/extrato"}>Extrato</ActiveLink>
      </div>

      
      <div className="menu__buttons-container">
        <ActiveLink href={"/login"}>Login</ActiveLink>
        <ActiveLink href={"/register"}>Signup</ActiveLink>
      </div>


    </header>
  );
};

export default Menu;