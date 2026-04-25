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
}

function Menu ({options, onSelect} : MenuProps){
    return(
        <div className={styles.chatMenu}>

            {options.map((option, _) => (
                <div className={styles.option} onClick={() => onSelect(option.select? option.select: option.icon)}>
                    <Icon type={option.icon}></Icon>
                    <Label variant="subtitle">{option.name}</Label>
                </div>
            ))}
        </div>
    )
}
export default Menu