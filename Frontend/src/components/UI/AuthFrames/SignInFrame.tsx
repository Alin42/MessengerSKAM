import Button from "../Buttons/Button.tsx"
import Label from "../Label/Label.tsx"
import TokenInput from "../LineEdit/TokenInput.tsx"
import ArrowButton from "../Buttons/ArrowButton.tsx"
import "./authFrame.css"

function SignInFrame(){
    return(
        <div className="authFrame">
            <div className="icons">
                <ArrowButton direction="left" onClick={() => console.log("ButtonPress")}/>
            </div>
            <div className="authFrameCenter">
                <Label variant="title" >SKAM</Label>
                <div className="buttons">
                    <TokenInput/>
                    <Button onClick={() => console.log("ButtonPress")}>Continue</Button>
                </div>
                <Label variant="caption" color="blue">Enter your account token to restore your account</Label>
            </div>
        </div>
    )
}
export default SignInFrame