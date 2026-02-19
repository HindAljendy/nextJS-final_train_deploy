import { Article } from '@/generated/prisma/client';
import styles from '../articles.module.css'
import { getArticlesBasedOnSearchText } from '@/apiCalls/articleApiCall';
import ArticleItem from '@/components/articles/ArticleItem';


interface SearchArticlePageProps {
    searchParams: { searchText: string };
}

type TArticles = Array<Article>;

// object destructuring directly
const SearchArticlePage = async ({ searchParams: { searchText } }: SearchArticlePageProps) => {

    //console.log("props_SearchArticlePage" , props);
    // { params: {}, searchParams: { searchText: 'javascript' } }

    const articles: TArticles = await getArticlesBasedOnSearchText(searchText);
    console.log("ArticlesBasedOnSearchText", articles);


    return (
        <section className={`fix-height container ${styles.SearchArticlePage}`}>
            {articles.length === 0 ? (
                <h3 className={styles.title_searchText}>Articles based on
                    <span className={styles.searchText_notFound}>{searchText}</span>
                    Not Found
                </h3>

            ) : (
                <>
                    <h3 className={styles.title_searchText}>Articles based on
                        <span className={styles.searchText}>{searchText}</span>
                    </h3>

                    <div className={styles.All_articles_searchText}>
                        {
                            articles.map(item => (
                                <ArticleItem key={item.id} article={item} />
                            ))
                        }
                    </div>
                </>
            )}
        </section>
    )
}

export default SearchArticlePage