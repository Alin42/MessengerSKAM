import ChatMenu from "../components/Frames/ChatMenu/ChatMenu"
import RegistrationFrame from "../components/Frames/Auth/Registration"
import SignInFrame from "../components/Frames/Auth/SignIn"
import WelcomeFrame from "../components/Frames/Auth/Welcome"
import Icon from "../components/UI/Icon/Icon"
import MessageInput from "../components/UI/Input/MessageInput"
import MessageList from "../components/UI/ListView/MessageList"
import Post from "../components/UI/Post/Post"
import Settings from "../components/Frames/Settings/Settings"
import MinChat from "../components/UI/ListView/MinimizedChat"
import ChatFrame from "../components/Frames/User/Chat"

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
            <MessageList chat_token="ooo"/>
            <ChatMenu></ChatMenu>
            <Icon type="rose" className="ico"></Icon>
            <Settings isOpen={false} onClose={function (): void {
                throw new Error("Function not implemented.")
            } }></Settings>
            <MinChat msg="qwertyuiop" onClick={() => { } } chatId={0} chatColor={""} chatName={""}></MinChat>
            <ChatFrame token='111'/>
        </main>
    )
}
export default ElementsTest