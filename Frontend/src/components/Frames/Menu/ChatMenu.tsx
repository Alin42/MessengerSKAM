import Menu, { type MenuOption } from "./Menu"

export type ChatMenuItems = "add" | "rem" | "bin"
type ChatMenuProps = {
    onSelect: (selected: ChatMenuItems) => void,
}

function ChatMenu ({onSelect} : ChatMenuProps){
    const options: MenuOption[] = [{icon: "add", name: "Add user"}, {icon: "rem", name: "Remove user"}, {icon: "bin", name: "Delete chat"}];
    return(
        <Menu options={options} onSelect={(s) => onSelect(s as ChatMenuItems)} side="chat"></Menu>
    )
}
export default ChatMenu