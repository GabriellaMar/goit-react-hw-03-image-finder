import styles from './Button.module.css'
export const Button = ({ onClick, text }) => {
    return (
        <button className={styles.loadMoreButton} onClick={onClick}>

            {text}
        </button>
    )
}