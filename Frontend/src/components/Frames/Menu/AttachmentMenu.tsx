import Menu, { type MenuOption } from "./Menu"

export type AttachmentMenuItems = "foto" | "file" | "location"
type AttachmentMenuProps = {
    onSelect: (selected: AttachmentMenuItems) => void,
}

function AttachmentMenu ({onSelect} : AttachmentMenuProps){
    const options: MenuOption[] = [{icon: "foto", name: "Photo or video"}, {icon: "file", name: "File"}, {icon: "location", name: "Location"}];
    return(
        <Menu options={options} onSelect={(s) => onSelect(s as AttachmentMenuItems)} side="attachment"></Menu>
    )
}
export default AttachmentMenu