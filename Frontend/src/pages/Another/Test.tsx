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
import type { ChatModel } from "../../types/chat"

function ElementsTest(){
    return(
        <main>
            <h1>Main</h1>
            <WelcomeFrame onAction={()=>{}}/>
            <SignInFrame onAction={()=>{}}/>
            <RegistrationFrame  onAction={()=>{}}/>
            <MessageInput onSend={function (message: string): void {
                throw new Error("Function not implemented." + message)
            } }/>
            <MessageList messages={[]}/>
            <Icon type="rose" className="ico"></Icon>
            <Settings isOpen={false} onClose={function (): void {
                throw new Error("Function not implemented.")
            } }></Settings>
            <MinChat onClick={function (chat: ChatModel): void {
                throw new Error("Function not implemented.")
            } } chat={{
                id: 0,
                type: undefined,
                name: "",
                token: "",
                chatColor: undefined,
                msg: undefined
            }}></MinChat>
            <ChatFrame chat={{
                id: 0,
                type: undefined,
                name: "",
                token: "",
                chatColor: undefined,
                msg: undefined
            }}/>
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