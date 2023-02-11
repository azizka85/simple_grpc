package services

import (
	"fmt"
	"log"
	"simple_grpc/protos"
	"time"

	"google.golang.org/protobuf/types/known/timestamppb"
)

type TimingService struct {
	protos.UnimplementedTimingServer
}

func (ts *TimingService) Call(req *protos.CallRequest, res protos.Timing_CallServer) error {
	for i := 0; i < 100; i++ {
		if err := res.Context().Err(); err != nil {
			log.Println(err)
			return err
		}
		log.Printf("Write %v times", i)
		res.Send(
			&protos.CallResponse{
				Timestamp: timestamppb.Now(),
				Message:   fmt.Sprintf("Hello, %s!", req.Name),
			},
		)
		time.Sleep(2 * time.Second)
	}

	return nil
}
