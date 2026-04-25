export const API_URL = "http://localhost:8080"
export const API_REGISTER = `${API_URL}/api/auth/register`
export const API_LOGIN = `${API_URL}/api/auth/login`
export const API_ME = `${API_URL}/api/users/me`
export const API_CHATS = `${API_URL}/api/chats`
export const API_JOIN = `${API_URL}/api/chats/join`
export const API_MESSAGES = (chat_id: string) => `${API_URL}/api/:${chat_id}/messages`