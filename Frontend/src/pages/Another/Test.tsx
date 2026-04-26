import ChatMenu from "../../components/Frames/Menu/ChatMenu"
import RegistrationFrame from "../../components/Frames/Auth/Registration"
import SignInFrame from "../../components/Frames/Auth/SignIn"
import WelcomeFrame from "../../components/Frames/Auth/Welcome"
import Icon from "../../components/UI/Icon/Icon"
import MessageInput from "../../components/UI/Input/MessageInput"
import MessageList from "../../components/UI/ListView/MessageList"
import Settings from "../../components/Frames/Settings/Settings"
import MinChat from "../../components/UI/ListView/MinChat"
import ChatFrame from "../../components/Frames/User/Chat"
import AttachmentMenu from "../../components/Frames/Menu/AttachmentMenu"

function ElementsTest(){
    return(
        <main>
            <h1>Main</h1>
            <WelcomeFrame onAction={()=>{}}/>
            <SignInFrame onAction={()=>{}}/>
            <RegistrationFrame  onAction={()=>{}}/>
            <MessageInput onSend={function (message: string): void {
                throw new Error("Function not implemented." + message)
            } } />
            <MessageList chat_token="ooo"/>
            <Icon type="rose" className="ico"></Icon>
            <Settings isOpen={false} onClose={function (): void {
                throw new Error("Function not implemented.")
            } }></Settings>
            <MinChat msg="qwertyuiop" onClick={() => { } } chatId={0} chatColor={""} chatName={""}></MinChat>
            <ChatFrame token='111'/>
            <ChatMenu onSelect={function (selected: string): void {
                throw new Error("Function not implemented.")
            } } ></ChatMenu>
            <AttachmentMenu onSelect={function (selected: string): void {
                throw new Error("Function not implemented.")
            } }></AttachmentMenu>
        </main>
    )
}
export default ElementsTest