import styles from './Button.module.css'
export const Button = ({onClick, children})=>{
return (
    <button className={styles.loadMoreButton} onClick={onClick}>
        {children}
             Load more
    </button>
)
}