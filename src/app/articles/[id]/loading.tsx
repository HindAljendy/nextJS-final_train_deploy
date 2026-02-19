import React from 'react'
import styles from '../articles.module.css'


const SingleArticleLoading = () => {
    return (
        <section className={` fix-height container ${styles.SingleArticleLoading}`}>
            {/* القسم الأول */}
            <div className={styles.single_article_style}>
                <h1></h1>
                <div></div>
                <p></p>
            </div>
            
            {/* القسم الثاني */}
            <div className={styles.add_comment_style}>
                <div></div>
                <button></button>
            </div>
        </section>
    )
}

export default SingleArticleLoading