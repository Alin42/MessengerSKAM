import Button from "../UI/Buttons/Button/Button.tsx"

function RoomHeader(){
    return(
        <header>
             <Button onClick={() => console.log("About requested")} theme="dark">About</Button>
             <Button onClick={() => console.log("Github requested")} theme="dark">Github</Button>
        </header>
    )
}
export default RoomHeader