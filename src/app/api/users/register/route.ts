import { RegisterUserDto } from "@/utils/dtos";
import { registerSchema } from "@/utils/validationSchemas";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma"
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import { JWTPayload } from "@/utils/types";
import { generateTokenJWT, setCookie } from "@/utils/generateToken";


/**
    * @method POST
    * @route  ~/api/users/register
    * @desc   SignUP "create new user"
    * @access public
*/

export async function POST(request: NextRequest) {
    try {
        const body = await request.json() as RegisterUserDto;

        const validation = registerSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { message: validation.error.issues[0].message }, { status: 400 }
            );
        }

        // IMPORTANT -- Check  If This User Already Registered
        const user = await prisma.user.findUnique({
            where: { email: body.email }
        })
        if (user) {
            return NextResponse.json(
                { message: "This User Already Registered" }, { status: 400 }
            );
        }

        // Now .. SignUp 

        // hash Password :
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(body.password, salt);

        const newUser = await prisma.user.create({
            data: {
                username: body.username,
                email: body.email,
                password: hashedPassword,
                isAdmin: body.isAdmin ?? false 
            },

            // Defining the properties that are displayed to the user:
            select: {
                id: true,
                username: true,
                isAdmin: true,    
            }
        });

        
        /*  generate Token Only :
        const jwtPayload : JWTPayload = {
            id : newUser.id,
            username: newUser.username,
            isAdmin: newUser.isAdmin
        }

        const token = generateTokenJWT(jwtPayload);

        return NextResponse.json({...newUser , token}, { status: 201 } ); 
        */

        // generate Token +  Store Token in Cookie :
        const cookie = setCookie({
            id: newUser.id,
            username: newUser.username,
            isAdmin: newUser.isAdmin
        });

        return NextResponse.json({ ...newUser, message: "Registered & Authenticated" },
            {
                status: 201,
                headers: { "Set-Cookie": cookie }
            }
        );

    } catch (error) {
        return NextResponse.json(
            { message: "Internal Server Error " },
            { status: 500 }
        );
    }
}