import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken'
import { JWTPayload } from './types';


// verify Token for Api endpoint
export function verifyToken(request: NextRequest): JWTPayload | null {

    try {
        //Get Token from cookies :
        const jwtToken = request.cookies.get('jwtToken');
        const token = jwtToken?.value as string;

        if (!token){
            return null ;
        }

        const privateKey = process.env.JWT_SECRET as string;
        const userPayload = jwt.verify(token, privateKey) as JWTPayload;
        return userPayload;

    } catch (error) {
        return null;
    }
}


// verify Token for Page:
export function verifyTokenForPage(token:string) :  JWTPayload | null {
    try {
        const privateKey= process.env.JWT_SECRET as string;
        const userPayload = jwt.verify(token ,privateKey ) as JWTPayload;

        if (!userPayload) return null;

        return userPayload;
    } catch (error) {
        return null;
    }
}