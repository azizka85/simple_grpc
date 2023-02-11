package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
	"simple_grpc/protos"
	"simple_grpc/services"
	"strings"

	"github.com/improbable-eng/grpc-web/go/grpcweb"
	"github.com/rs/cors"
	"google.golang.org/grpc"
)

var (
	port = flag.Int("port", 5000, "The server port")
)

func main() {
	flag.Parse()
	grpcServer := grpc.NewServer()
	protos.RegisterGreetServer(grpcServer, &services.GreetService{})
	protos.RegisterTimingServer(grpcServer, &services.TimingService{})
	protos.RegisterChatServer(grpcServer, &services.ChatService{})
	wrappedGrpc := grpcweb.WrapServer(grpcServer)
	mux := http.NewServeMux()
	fs := http.FileServer(http.Dir("./client/dist"))
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		log.Println(r.URL, r.Proto, r.ProtoMajor, r.ProtoMinor)
		if wrappedGrpc.IsGrpcWebRequest(r) {
			log.Println("Serve grpc-web")
			wrappedGrpc.ServeHTTP(w, r)
		} else if strings.HasPrefix(r.Header.Get("Content-Type"), "application/grpc") {
			log.Println("Serve grpc")
			grpcServer.ServeHTTP(w, r)
		} else {
			log.Println("Serve file system")
			fs.ServeHTTP(w, r)
		}
	})
	addr := fmt.Sprintf("localhost:%d", *port)
	log.Printf("Listening %s\n", addr)
	corsEntity := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000", "https://localhost:5000"},
		AllowedHeaders:   []string{"*"},
		AllowCredentials: true,
		Debug:            true,
	})
	http.ListenAndServeTLS(
		addr,
		"server.crt",
		"server.key",
		corsEntity.Handler(
			mux,
		),
	)
}
