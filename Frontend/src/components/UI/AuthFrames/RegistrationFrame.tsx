import Button from "../Buttons/Button.tsx"
import Label from "../Label/Label.tsx"
import NickInput from "../LineEdit/NickInput.tsx"
import ArrowButton from "../Buttons/ArrowButton.tsx"
import "./authFrame.css"

function RegistrationFrame(){
    return(
        <div className="authFrame">
            <div className="icons">
                <ArrowButton direction="left" onClick={() => console.log("next")}/>
            </div>
            <div className="authFrameCenter">
                <Label variant="title" >SKAM</Label>
                <div className="buttons">
                    <NickInput/>
                    <Button onClick={() => console.log("ButtonPress")}>Create account</Button>
                </div>
            </div>
        </div>
    )
}
export default RegistrationFrame