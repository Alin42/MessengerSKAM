type MessageListProps = {
    messages: string[]
}

function MessageList({messages} : MessageListProps){
    return (
        <ul>
            {messages.map(msg => (
                <li>{msg}</li>
                ))}
        </ul>
    )
}
export default MessageList