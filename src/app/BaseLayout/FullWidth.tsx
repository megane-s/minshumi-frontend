import { FC, ReactNode } from "react"
import styles from "./FullWidth.module.css"

interface FullWidthProps {
    children: ReactNode
}
const FullWidth: FC<FullWidthProps> = ({ children }) => {
    return (
        <div className={styles.fullWidth}>
            {children}
        </div>
    )
}

export default FullWidth
