package services

import (
	"context"
	"fmt"
	"log"
	"simple_grpc/protos"

	"google.golang.org/protobuf/types/known/timestamppb"
)

type GreetService struct {
	protos.UnimplementedGreetServer
}

func (gs *GreetService) Get(ctx context.Context, req *protos.GetRequest) (*protos.GetResponse, error) {
	log.Println("Get:", req.Name)
	return &protos.GetResponse{
		Message:   fmt.Sprintf("Hello, %s!", req.Name),
		Timestamp: timestamppb.Now(),
	}, nil
}
