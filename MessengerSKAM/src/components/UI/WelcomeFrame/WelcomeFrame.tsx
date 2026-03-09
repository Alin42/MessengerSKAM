import Button from "../Buttons/Button"
import Label from "../Label/Label"
import ArrowButton from "../Buttons/ArrowButton"
import "./welFrame.css"

function WelcomeFrame(){
    return(
        <div className="welcomeFrame">
            <ArrowButton direction="right" onClick={() => console.log("next")}/>
            <Label variant="title" >Anonymous</Label>
            <Label variant="title" >Messenger</Label>
            <div className="buttons">
                <Button onClick={() => console.log("ButtonPress")}>Create account</Button>
                <Button onClick={() => console.log("ButtonPress")}>I have an account</Button>
            </div>
            <Label variant="caption" color="blue">Talk freely. No accounts required.</Label>
        </div>
    )
}
export default WelcomeFrame