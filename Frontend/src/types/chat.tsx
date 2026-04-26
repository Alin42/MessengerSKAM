// CHATS
export type APIChat = {
  id: number
  type?: "group" | "contact"
  chat_token? : string
  name?: string
  created_at: string
  last_messsage_at: string
};

export type ChatModel = {
  id: number
  type?: "group" | "contact"
  name: string
  token: string
  chatColor?: string
  msg?: string
};
