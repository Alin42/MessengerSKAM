import Button from "../Buttons/Button"
import Label from "../Label/Label"
import Icon from "../Icons/Icon"
import "./authFrame.css"

function WelcomeFrame(){
    return(
        <div className="authFrame">
            <div className="icons">
                <Icon type="icon3"/>
            </div>
            <div className="authFrameCenter">
                <Label variant="title" >Anonymous</Label>
                <Label variant="title" >Messenger</Label>
                <div className="buttons">
                    <Button onClick={() => console.log("ButtonPress")}>Create account</Button>
                    <Button onClick={() => console.log("ButtonPress")}>I have an account</Button>
                </div>
                <Label variant="caption" color="blue">Talk freely. No accounts required.</Label>
            </div>
        </div>
    )
}
export default WelcomeFrame