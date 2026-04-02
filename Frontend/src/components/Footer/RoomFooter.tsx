import Button from "../UI/Buttons/Button/Button.tsx"


function RoomFooter(){
    return(
        <footer>
             <Button onClick={() => console.log("Support requested")} theme="dark">Support</Button>
        </footer>
    )
}
export default RoomFooter