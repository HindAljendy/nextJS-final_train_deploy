import { TiTick } from 'react-icons/ti'
import styles from './home.module.css'

const WebHostingPlan = () => {
    return (
        <div className={styles.webHostingPlan}>
            <h3 className={styles.priceType}>Premium</h3>
            <strong className={styles.price}>
                $4.99/mo
            </strong>
            <span className={styles.sale}>
                10% OFF
            </span>
            <div className={styles.features}>
                <h5 className={styles.title}> Top Features </h5>
                <div className={styles.feature}>
                    <TiTick /> 100 Website
                </div>
                <div className={styles.feature}>
                    <TiTick /> 100 GB SSD Storage
                </div>
                <div className={styles.feature}>
                    <TiTick /> Weekly Backups
                </div>
                <div className={styles.feature}>
                    <TiTick /> Unlimited Bandwidth
                </div>
                <div className={styles.feature}>
                    <TiTick /> Free SLL
                </div>
                <div className={styles.feature}>
                    <TiTick /> Free Email
                </div>
            </div>
            <button className={styles.button}> BUY NOW</button>
        </div>
    )
}

export default WebHostingPlan