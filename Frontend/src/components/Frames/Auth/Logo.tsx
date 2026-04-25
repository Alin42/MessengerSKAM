import Icon from "../../UI/Icon/Icon"

import styles from "./frame.module.css"

type LogoFrameProps = {
    opened: boolean
}

function LogoFrame({opened} : LogoFrameProps) {
    return(
        <div className={`${styles.logo} ${opened? styles.logoOpening : styles.logoClosing}`}>
            <Icon type={"logo2"} size={"100%"}></Icon>
        </div>
    )
}

export default LogoFrame