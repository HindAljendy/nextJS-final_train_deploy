import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

/**
    * @method POST
    * @route  ~/api/users/logout
    * @desc   Logout user 
    * @access private (only user loggedIn "Have Token" can logout)
*/

export async function POST(request: NextRequest) {
    try {
        const jwtToken = request.cookies.get("jwtToken");
        const token = jwtToken?.value as string;

        //Check for NON existence of the token in Request " user No logged in" ..in Middleware File ..


        if (token) {
            cookies().delete("jwtToken");

            return NextResponse.json(
                { message: "Logout " },
                { status: 200 }
            );
        }

        /*  Way 2 :
        if (token) {
        const response = NextResponse.json({ message: 'logout' }, { status: 200 });

        / Delete cookies by setting them to a empty string value and past expiry date
        response.cookies.set('jwtToken', '', { path: '/', expires: new Date(0) });
        return response;
        }
      */

    } catch (error) {
        return NextResponse.json(
            { message: "Internal Server Error " },
            { status: 500 }
        );
    }

}