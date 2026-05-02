import { useEffect, useState } from "react";
import ContactView from "../../UI/Header/ContactView";
import MessageList from "../../UI/ListView/MessageList";
import MessageInput from "../../UI/Input/MessageInput";

import styles from "./frame.module.css";
import type { ChatModel } from "../../../types/chat";
import type { APIMessage, MessageModel } from "../../../types/message";
import { API_CHATS, API_JOIN, API_MESSAGES } from "../../../api/config";
import { api } from "../../../api/api";
import type { ChatMenuItems } from "../Menu/ChatMenu";

type ChatFrameProps = {
  chat: ChatModel;
  UserID: number; 
};

function ChatFrame({ chat, UserID }: ChatFrameProps) {
  const [messages, setMessages] = useState<MessageModel[]>([]);

  const loadMessages = async () => {
    try {
      const res = await api.get(API_MESSAGES(chat.id));
      const raw = Array.isArray(res.data.messages)
        ? res.data.messages
        : [];

      const sorted = [...raw].sort((a, b) => b.id - a.id); // FIXME: (for future) -- no need to do that if backend sends in correct order (css style reverses)
      const normalized: MessageModel[] = sorted.map((message: APIMessage) => ({
        id: message.id,
        content: message.content,
        isOwn: message.sender_id === UserID,
        senderName: message.sender_name,
        timestamp: message.created_at,
      }));
      setMessages(normalized);
    } catch (err) {
      console.log("LOAD MESSAGES ERROR:", err);
      setMessages([]);
    }
  };

  useEffect(() => {
    loadMessages();
  }, [chat.id]);

  const handleSend = async (text: string) => {
    try {
      await api.post(API_MESSAGES(chat.id), {
        content: text,
      });

      await loadMessages();
    } catch (err) {
      console.log("Send error:", err);
    }
  };

  // TODO: refactor
  const addUser = async () => {
    try {
      const res1 = await api.post(API_JOIN, {chat_id: chat.id, user_id: UserID});
      console.log(res1)
    } catch (err) {
      console.log("Adding user to chat error:", err);
    }
  }

  const removeUser = async () => {
    try {
      const res1 = await api.delete(API_JOIN, {chat_id: chat.id, user_id: UserID});
      console.log(res1)
    } catch (err) {
      console.log("Removing user from chat error:", err);
    }
  }

  const deleteChat = async () => {
    try {
      const res1 = await api.delete(API_CHATS, {chat_id: chat.id});
      console.log(res1)
    } catch (err) {
      console.log("Chat deletion error error:", err);
    }
  }

  const handleMenuAction = (selection: ChatMenuItems) => {
    console.log(selection)
    switch (selection) {
      case "add":
        addUser()
        break
      case "rem":
        removeUser()
        break
      case "bin":
        deleteChat()
        break
      default:
        break
    }
  }

  return (
    <div className={styles.chat}>
      <ContactView
        chatColor={chat.chatColor}
        chatName={chat.name}
        chatToken={chat.token}
        onAction={handleMenuAction}
      />
      <MessageList messages={messages} />
      <MessageInput
        onSend={handleSend}
      />
    </div>
  );
}

export default ChatFrame;