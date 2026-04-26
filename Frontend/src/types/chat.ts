
// CHATS
export type APIChat = {
  id: number;
  type?: "group" | "contact";
  chat_token? : string | null
  name?: string | null;
  created_at: string
  last_messsage_at: string
};

export type ChatModel = {
  id: number;
  type?: "group" | "contact";
  name: string;
  token: string;
  chatColor?: string;
  msg?: string;
};

// MESSAGES
export type APIMessage = {
  id: number;
  chat_id: number;
  content: string;
  created_at: string;
  sender?: string;
};


