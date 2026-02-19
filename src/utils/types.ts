import { Article, Comment, User } from './../generated/prisma/client';


export type JWTPayload = {
    id: number;
    username: string;
    isAdmin: boolean;
}


export type CommentWithUser = Comment & { user: User }
export type TsingleArticle = Article & { comments: CommentWithUser[] }