import { Comment } from "@/generated/prisma/client";
import { DOMAIN } from "@/utils/constants";

export async function getAllComments(token: string): Promise<Comment[]> {

    const response = await fetch(`${DOMAIN}/api/comments`, {
        headers: {
            Cookie: `jwtToken=${token}`
        }
    });

    if (!response.ok) {
        throw new Error("Faild to fetch comments")
    }
    return response.json();
}