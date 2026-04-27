// MESSAGES
export type APIMessage = {
  id: number
  chat_id: number
  sender_id: number
  sender_name: string
  content: string
  created_at: string
};

export type MessageModel = {
  id: number
  content: string
  isOwn: boolean
  senderName?: string
  timestamp?: string
}