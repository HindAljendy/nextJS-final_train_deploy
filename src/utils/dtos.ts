export interface CreateNewArticleDto {
    title: string;
    description: string;
}

export interface UpdateArticleDto {
    title?: string;
    description?: string;
}

export interface RegisterUserDto {
    email: string;
    username: string;
    password: string;
    isAdmin? :boolean;
}

export interface LoginUserDto {
    email: string;
    password: string;
}

export interface UpdateUserDto {
    email?: string;
    username?: string;
    password?: string;
}

export interface CreateCommentDto {
    text: string;
    articleId: number;
}

export interface UpdateCommentDto {
    text: string;
}
