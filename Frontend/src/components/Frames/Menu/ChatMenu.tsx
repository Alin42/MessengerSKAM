import Menu, { type MenuOption } from "./Menu"
type ChatMenuProps = {
    onSelect: (selected: string) => void,
}

function ChatMenu ({onSelect} : ChatMenuProps){
    const options: MenuOption[] = [{icon: "add", name: "Add user"}, {icon: "rem", name: "Remove user"}, {icon: "bin", name: "Delete chat"}];
    return(
        <Menu options={options} onSelect={onSelect} side="chat"></Menu>
    )
}
export default ChatMenu