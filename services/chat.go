package services

import (
	"context"
	"fmt"
	"log"
	"simple_grpc/protos"
	"sync"

	"github.com/samber/lo"
	"google.golang.org/grpc/peer"
	"google.golang.org/protobuf/types/known/emptypb"
	"google.golang.org/protobuf/types/known/timestamppb"
)

type ChatUser struct {
	User   *protos.User
	Stream protos.Chat_JoinServer
}

type ChatService struct {
	protos.UnimplementedChatServer
}

var mutex = &sync.RWMutex{}
var users = map[string]*ChatUser{}

func (cs *ChatService) Join(user *protos.User, res protos.Chat_JoinServer) (err error) {
	peerInfo, peerOk := peer.FromContext(res.Context())
	if peerOk {
		fmt.Println(peerInfo.Addr)
	}
	ok := true
	mutex.Lock()
	if _, ok = users[user.Name]; !ok {
		err = res.Send(
			&protos.ChatMessage{
				Timestamp: timestamppb.Now(),
				Message: &protos.ChatMessage_Response{
					Response: &protos.JoinResponse{
						Success: true,
						Users: lo.MapToSlice(users, func(key string, value *ChatUser) *protos.User {
							return value.User
						})}}})
		if err == nil {
			AddUser(user, res)
			log.Printf("User %s successfully joined\n", user.Name)
		}
	}
	mutex.Unlock()
	if err == nil {
		if !ok {
			<-res.Context().Done()
			mutex.Lock()
			RemoveUser(user)
			mutex.Unlock()
			log.Printf("User %s exited\n", user.Name)
			return res.Context().Err()
		} else {
			log.Printf("User %s wasn't joined, because the user with this name already exist\n", user.Name)
			return res.Send(
				&protos.ChatMessage{
					Timestamp: timestamppb.Now(),
					Message: &protos.ChatMessage_Response{
						Response: &protos.JoinResponse{
							Success: false,
							Message: fmt.Sprintf("User %s already exist", user.Name)}}})
		}
	}
	return
}

func (cs *ChatService) SendMessage(ctx context.Context, message *protos.ChatMessage) (*emptypb.Empty, error) {
	mutex.Lock()
	for _, chatUser := range users {
		chatUser.Stream.Send(message)
	}
	mutex.Unlock()
	log.Printf("Message %s received from %s\n", message.GetMessage_().Message, message.GetMessage_().From.Name)
	return &emptypb.Empty{}, nil
}

func AddUser(user *protos.User, res protos.Chat_JoinServer) {
	signal := &protos.ChatMessage{
		Timestamp: timestamppb.Now(),
		Message: &protos.ChatMessage_EnterSignal{
			EnterSignal: user}}
	for _, chatUser := range users {
		chatUser.Stream.Send(signal)
	}
	users[user.Name] = &ChatUser{
		User:   user,
		Stream: res}
}

func RemoveUser(user *protos.User) {
	delete(users, user.Name)
	signal := &protos.ChatMessage{
		Timestamp: timestamppb.Now(),
		Message: &protos.ChatMessage_ExitSignal{
			ExitSignal: user}}
	for _, chatUser := range users {
		chatUser.Stream.Send(signal)
	}
}
