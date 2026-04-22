package service

import (
	"errors"
	"messanger-backend/internal/models"
	"messanger-backend/internal/repository"
	"time"

	"github.com/google/uuid"
)

//ERRORS

var ChatNotFound = errors.New("Chat not found")
var ErrContactAlreadyExists = errors.New("Contact already exist")

//CHAT_SERVICE

type ChatService struct {
	repo *repository.ChatRepository
	urepo *repository.UserRepository
}

func NewChatService(repo *repository.ChatRepository, urepo *repository.UserRepository) *ChatService {
	return &ChatService{repo: repo, urepo: urepo}
}

//CHATS
func (s *ChatService) AddChat(name string, chatType models.ChatType) (*models.Chat, error) {
	chat := &models.Chat{
		Name:      name,
		Type:      chatType,
		CreatedAt: time.Now(),
	}

	if chatType == models.Group {
		chat.ChatToken = uuid.NewString()
	}

	if err := s.repo.CreateСhat(chat); err != nil {
		return nil, err
	}

	return chat, nil
}

func (s *ChatService) AddGroupByToken(token string, userID uint) error {
	chat, err := s.repo.GetChatByToken(token)
	if err != nil {
		return err
	}

	return s.AddParticipant(chat.ID, userID)
}

func (s *ChatService) AddContact(inviteToken string, userID uint) error {
	friend, err := s.urepo.GetByInviteToken(inviteToken)
	if err != nil {
		return err
	}

	contact, err := s.repo.GetContactChat(userID, friend.ID)
	if err != nil {
		return err
	}

	if contact != nil {
		return ErrContactAlreadyExists
	}

	chat, err := s.AddChat("", models.Contact)
	if err != nil {
		return err
	}

	if err := s.AddParticipant(chat.ID, userID); err != nil {
		return err
	}

	if err := s.AddParticipant(chat.ID, friend.ID); err != nil {
		return err
	}

	return nil
}

func (s *ChatService) getChats(userID uint, chatType models.ChatType) ([]models.Chat, error) {
	chats, err := s.repo.GetByChats(userID, chatType)
	if err != nil {
		return nil, err
	}

	return chats, nil
}

func (s *ChatService) GetChats(userID uint) ([]models.Chat, error) {
	return s.getChats(userID, models.Any)
}

func (s *ChatService) GetContacts(userID uint) ([]models.Chat, error) {
	return s.getChats(userID, models.Contact)
}

func (s *ChatService) GetGroups(userID uint) ([]models.Chat, error) {
	return s.getChats(userID, models.Group)
}

//PARTICIPANTS
func (s *ChatService) AddParticipant(chatID uint, userID uint) (error) {
	joinedAt := time.Now()
	participant := &models.ChatParticipants{
		ChatID: chatID,
		UserID: userID,
		JoinedAt: joinedAt,
	}

	if err := s.repo.CreateParticipant(participant); err != nil {
		return err
	}

	return nil
}

//MESSAGES
func (s *ChatService) AddMessage(chatID uint, senderID uint, content string) (error) {
	createdAt := time.Now()
	msg := &models.Messages{
		ChatID: chatID,
		SenderID: senderID,
		Content: content,
		CreatedAt: createdAt,
	}

	if err := s.repo.CreateMessage(msg); err != nil {
		return err
	}

	return nil
}

func (s *ChatService) GetMessages(chatID uint) ([]models.Messages, error) {
	return s.repo.GetByMessages(chatID)
}

