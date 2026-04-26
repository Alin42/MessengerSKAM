import Menu, { type MenuOption } from "./Menu"

export type AccountMenuItems = ""
type AccountMenuProps = {
    onSelect: (selected: AccountMenuItems) => void,
}

// FIXME: idk how to add it to settings instead of current. Will add later
function AccountMenu ({onSelect} : AccountMenuProps){
    const options: MenuOption[] = [];
    return(
        <Menu options={options} onSelect={(s) => onSelect(s as AccountMenuItems)} side="account"></Menu>
    )
}
export default AccountMenu