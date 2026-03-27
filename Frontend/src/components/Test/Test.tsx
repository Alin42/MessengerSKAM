import WelcomeFrame from "../UI/AuthFrames/WelcomeFrame"
import SignInFrame from "../UI/AuthFrames/SignInFrame"
import RegistrationFrame from "../UI/AuthFrames/RegistrationFrame"
import Post from "../UI/Post/Post"
import MessageInput from "../UI/MessageInput/MessageInput"
import MessageList from "../UI/MessageList/MessageList"

function ElementsTest(){
    return(
        <main>
            <h1>Main</h1>
            <WelcomeFrame onAction={()=>{}}/>
            <SignInFrame onAction={()=>{}}/>
            <RegistrationFrame  onAction={()=>{}}/>
            <Post />
            <MessageInput onSend={function (message: string): void {
                throw new Error("Function not implemented." + message)
            } } />
            <MessageList messages={['a', 'b']} />
        </main>
    )
}
export default ElementsTest