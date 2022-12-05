import React, { createContext, useState } from 'react';
import { PropsWithChildren } from "react";



type ActionType = {
    action: string,
    setAction: React.Dispatch<React.SetStateAction<string | any>>,
}


const LoginContext = React.createContext<ActionType>({} as ActionType);




function ActionProvider (props: PropsWithChildren) {

    const [action, setAction] = useState ('login');

    return (
        <LoginContext.Provider value={{action, setAction}}>
            {props.children}
        </LoginContext.Provider>

    );

};

export default ActionProvider;



export const useAction = () => React.useContext(LoginContext);
