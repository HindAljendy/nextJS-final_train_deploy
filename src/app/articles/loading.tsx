import styles from './articles.module.css'

const articlesSkeleton = [1, 2, 3, 4, 5, 6];

const ArticlesLoading = () => {
    return (
        <section className={` fix-height container ${styles.ArticlesLoading}`}>
            {/* القسم الاول */}
            <div className={styles.searchForm_style}></div>

            {/* القسم الثاني */}
            <div className={styles.allArticles_style}>
                {
                    articlesSkeleton.map((item) => (
                        /* ArticleItem */
                        <div  key={item} className={styles.articleItem_style}>
                            <h3></h3>
                            <p></p>
                            <div className={styles.buttonLink}></div>
                        </div>
                    ))
                }
            </div>

            {/*   القسم الثالث */}
            <div className={styles.articlesPagination_style}>
                <div className={styles.paginate_style}></div>
            </div>

        </section>
    )
}

export default ArticlesLoading