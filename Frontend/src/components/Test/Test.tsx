import WelcomeFrame from "../UI/AuthFrames/WelcomeFrame"
import SignInFrame from "../UI/AuthFrames/SignInFrame"
import RegistrationFrame from "../UI/AuthFrames/RegistrationFrame"
import LoginPage from "../../pages/AuthPage"

function ElementsTest(){
    return(
        <main>
            <h1>Main</h1>
            <WelcomeFrame />
            <SignInFrame />
            <RegistrationFrame />
            <LoginPage />
        </main>
    )
}
export default ElementsTest