import Button from "../Buttons/Button"
import Label from "../Label/Label"
import Icon from "../Icons/Icon"
import './authFrame.css'

type WelcomeFrameProps = {
    onAction: (step: 'SignIn' | 'Registration') => void;
}

function WelcomeFrame({ onAction } : WelcomeFrameProps) {
  return (
        <div className="authFrame">
            <div className="icons">
                <Icon type="icon3"/>
            </div>
            <div className="authFrameCenter">
                <div className="labels">
                    <Label variant="title" >Anonymous</Label>
                    <Label variant="title" >Messenger</Label>
                </div>
                <div className="buttons">
                    <Button onClick={() => onAction("Registration")}>Create account</Button>
                    <Button onClick={() => onAction("SignIn")}>I have an account</Button>
                </div>
                <Label variant="caption" color="blue">Talk freely. No accounts required.</Label>
            </div>
        </div>
    )
}
export default WelcomeFrame
