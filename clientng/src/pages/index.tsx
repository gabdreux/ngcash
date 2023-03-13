import React, { useContext } from "react";
import ActiveLink from "../components/activeLink";
import AuthContext from "../context/AuthProvider";
import DataTable from "@/components/extrato";

function Index () {

  const { isAuthenticated } = useContext(AuthContext);
  console.log("autenticado? index", isAuthenticated); 

  return (
    <>
      {isAuthenticated ? (
        <DataTable />
      ) : (
        <div>
          <h2>Please Log In</h2>
          <ActiveLink href={"/login"}>Sign in</ActiveLink>
        </div>
      )}
    </>
  );
};

export default Index;
