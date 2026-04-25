import Menu, { type MenuOption } from "./Menu"
type AttachmentMenuProps = {
    onSelect: (selected: string) => void,
}

function AttachmentMenu ({onSelect} : AttachmentMenuProps){
    const options: MenuOption[] = [{icon: "foto", name: "Photo or video"}, {icon: "file", name: "File"}, {icon: "location", name: "Location"}];
    return(
        <Menu options={options} onSelect={onSelect}></Menu>
    )
}
export default AttachmentMenu