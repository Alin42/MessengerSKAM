import Button from "../Buttons/Button.tsx"
import Label from "../Label/Label.tsx"
import TokenInput from "../LineEdit/TokenInput.tsx"
import ArrowButton from "../Buttons/ArrowButton.tsx"
import "./authFrame.css"

type SingInFrameProps = {
    onAction: (step: 'Welcome' | 'Continue') => void;
}

function SignInFrame({ onAction } : SingInFrameProps){
    return(
        <div className="authFrame">
            <div className="icons">
                <ArrowButton direction="left" onClick={() => onAction("Welcome")}/>
            </div>
            <div className="authFrameCenter">
                <Label variant="title" >SKAM</Label>
                <div className="buttons">
                    <TokenInput/>
                    <Button onClick={() => onAction("Continue")}>Continue</Button>
                </div>
                <Label variant="caption" color="blue">Enter your account token to restore your account</Label>
            </div>
        </div>
    )
}
export default SignInFrame