import Button from "../UI/Buttons/Button.tsx"
import Icon from "../UI/Icons/Icon.tsx"
import './header.css'

function RoomHeader(){
    return(
        <header className="roomHeader">
            <Icon type="icon2"></Icon>
            <div className="roomHeaderButtons">
             <Button onClick={() => console.log("About requested")} theme="dark" size="large">About</Button>
             <Button onClick={() => console.log("Github requested")} theme="dark" size="large">Github</Button>
             </div>
        </header>
    )
}
export default RoomHeader