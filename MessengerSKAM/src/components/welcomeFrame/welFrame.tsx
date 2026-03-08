import Button from "../button/button"
import "./welFrame.css"

type WelcomeFrameProps = {
    title : string
    subtitle: string
}

function WelcomeFrame({title, subtitle} : WelcomeFrameProps){
    return(
        <div className="welcomeFrame">
            <p>{title}</p>
            <div className="buttons">
                <Button onClick={() => console.log()} label="Create account" />
                <Button onClick={() => console.log()} label="I have an account" />
            </div>
            <p>{subtitle}</p>
        </div>
    )
}
export default WelcomeFrame