import Button from "../Buttons/Button.tsx"
import Label from "../Label/Label.tsx"
import NickInput from "../LineEdit/NickInput.tsx"
import ArrowButton from "../Buttons/ArrowButton.tsx"
import "./authFrame.css"

type RegistrationFrameProps = {
    onAction: (step: 'Welcome' | 'Create') => void;
}

function RegistrationFrame({ onAction } : RegistrationFrameProps){
    return(
        <div className="authFrame">
            <div className="icons">
                <ArrowButton direction="left" onClick={() => onAction("Welcome")}/>
            </div>
            <div className="authFrameCenter">
                <Label variant="title" >SKAM</Label>
                <div className="buttons">
                    <NickInput/>
                    <Button onClick={() => onAction("Create")}>Create account</Button>
                </div>
            </div>
        </div>
    )
}
export default RegistrationFrame