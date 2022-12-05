import { json } from "body-parser";
import { prisma } from "./prisma.server";


type RegisterForm = {
    userName: string;
    password: string;
};




export const register = async (form: RegisterForm) => {
   
   
    try {
        
        const exists = await prisma.user.count({ where: { userName: form.userName } });


        if ( exists ) {
            return json (
    
                // { error: 'User already exist with that email!'},
                // { status: 400 }
            )
        };

    } catch (error) {

        console.log(error);
        return error;

    };  



};