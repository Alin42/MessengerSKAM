import WelcomeFrame from "../UI/Frames/WelcomeFrame"
import SignInFrame from "../UI/Frames/SignInFrame"
import RegistrationFrame from "../UI/Frames/RegistrationFrame"
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