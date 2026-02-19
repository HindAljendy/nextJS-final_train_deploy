import styles from './article.module.css'
import Link from 'next/link';

interface PaginationTprops {
    pageNumber: number,
    pages: number,
    route: string;
}


const ArticlesPaginate = ({ pageNumber, pages, route }: PaginationTprops) => {

    // convert pages number To array of numbers that we can map on it :
    let pagesArray: number[] = [];              // pages = 3  =>  pagesArray= [1,2,3]
    for (let i = 1; i <= pages; i++)  pagesArray.push(i);

    const prev = pageNumber - 1;
    const next = pageNumber + 1;

    return (
        <div className={styles.pagination_articles}>
            {
                pageNumber !== 1 && (
                    <Link
                        href={`${route}?pageNumber=${prev}`}
                        className={styles.page_num}>
                        Prev
                    </Link>
                )
            }

            {pagesArray.map(page => (
                <Link href={`${route}?pageNumber=${page}`}  //  /articles?pageNumber=${page}
                    key={page}
                    className={`${styles.page_num} ${pageNumber === page ? styles.active : ""}`}>
                    {page}
                </Link>
            ))}

            {
                pageNumber !== pages && (
                    <Link
                        href={`${route}?pageNumber=${next}`}
                        className={styles.page_num}>
                        Next
                    </Link>
                )
            }
        </div>
    )
}

export default ArticlesPaginate