export const API_URL = "http://localhost:8080/api";

export const API_REGISTER = `/auth/register`;
export const API_LOGIN = `/auth/login`;
export const API_ME = `/users/me`;

export const API_CHATS = `/chats`;
export const API_JOIN = `/chats/join`;

export const API_MESSAGES = (chat_id: string) => `/chats/${chat_id}/messages`;