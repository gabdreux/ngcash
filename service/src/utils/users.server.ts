import { prisma } from "./prisma.server";
import bcrypt from "bcryptjs";
import { RegisterForm } from "./auth.server";


export const createUser = async (user: RegisterForm) => {

    const passwordHash = await bcrypt.hash(user.password, 10);

    const newUser = await prisma.user.create ({

        data: {
            userName: user.userName,
            password: passwordHash,
            status: false,

            accountId: user.accountId
            
        },
        


    });

    return { id: newUser.id, userName: user.userName, accountId: user.accountId };

}
