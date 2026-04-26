import Icon, { type IconName } from "../../UI/Icon/Icon";
import Label from "../../UI/Label/Label";
import styles from "./menu.module.css"

export type MenuOption = {
    icon: IconName;
    name: string;
    select?: string;
}
type MenuProps = {
    options: MenuOption[];
    onSelect: (selected: string) => void;
    side?: "attachment" | "chat" | "account"
}

function Menu ({options, onSelect, side} : MenuProps) {
    let className = styles.menu
    switch(side) {
        case "attachment":
            className += " " + styles.attachment
            break
        case "chat":
            className += " " + styles.chat
            break
        case "account":
            className += " " + styles.account
            break
        default:
            break
    }
    return(
        <div className={className}>
            {options.map((option, idx) => (
                <div key={idx} className={styles.option} onClick={() => onSelect(option.select? option.select: option.icon)}>
                    <Icon type={option.icon}></Icon>
                    <Label variant="subtitle">{option.name}</Label>
                </div>
            ))}
        </div>
    )
}
export default Menu