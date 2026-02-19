import { Article } from "@/generated/prisma/client";
import { DOMAIN } from "@/utils/constants";
import { TsingleArticle } from "@/utils/types";


// function to get articles Based on pageNumber:
export async function getArticles(pageNumber: string | undefined): Promise<Article[]> {
    /* Fetching Data : */
    const response = await fetch(`${DOMAIN}/api/articles?pageNumber=${pageNumber}` ,
        {cache : 'no-store'}
    );  //response: Response

    /* Error Handing */
    if (!response.ok) {
        throw new Error("Failed to fetch articles");
    }

    return response.json(); // before : Promise<any> , json method  =>  promise ترجع 
}


// function to get articles Count :
export async function getArticlesCount(): Promise<number> {
    const response = await fetch(`${DOMAIN}/api/articles/count` , {cache : 'no-store'});  //response: Response

    /* Error Handing */
    if (!response.ok) {
        throw new Error("Failed to get articles count");
    }

    const { count } = await response.json() as { count: number };  //   { count: 19 } => 19 
    return count;
}

// function to get articles Based on searchText:
export async function getArticlesBasedOnSearchText(searchText: string): Promise<Article[]> {
    /* Fetching Data : */
    const response = await fetch(`${DOMAIN}/api/articles/search?searchText=${searchText}`);  //response: Response
    /* Error Handing */
    if (!response.ok) {
        throw new Error("Failed to fetch articles");
    }

    return response.json(); // before : Promise<any> , json method  =>  promise ترجع 
}


// function to get  Single Article By Id :
export async function getSingleArticle(articleId: string): Promise<TsingleArticle> {
    /* Fetching Data : */
    const response = await fetch(`${DOMAIN}/api/articles/${articleId}` , {
        cache : 'no-store'
    });

    /* Error Handing */
    if (!response.ok) {
        throw new Error("Failed to fetch articles");
    }

    return response.json();

}
