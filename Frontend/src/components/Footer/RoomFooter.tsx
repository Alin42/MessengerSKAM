import Button from "../UI/Buttons/Button.tsx"
import './footer.css'

function RoomFooter(){
    return(
        <footer className="roomFooter">
            <div className="roomFooterButtons">
             <Button onClick={() => console.log("Support requested")} theme="dark" size="large">Support</Button>
            </div>
        </footer>
    )
}
export default RoomFooter