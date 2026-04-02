import ChatMenu from "../UI/ChatMenu/ChatMenu"
import RegistrationFrame from "../UI/Frames/Registration"
import SignInFrame from "../UI/Frames/SignIn"
import WelcomeFrame from "../UI/Frames/Welcome"
import Icon from "../UI/Icons/Icon"
import MessageInput from "../UI/MessageInput/MessageInput"
import MessageList from "../UI/MessageList/MessageList"
import Post from "../UI/Post/Post"
import Settings from "../UI/Settings/Settings"

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
            <ChatMenu></ChatMenu>
            <Icon type="rose"></Icon>
            <Settings></Settings>
        </main>
    )
}
export default ElementsTest