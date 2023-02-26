import { GrpcWebFetchTransport } from '@protobuf-ts/grpcweb-transport'

const grpcTransport = new GrpcWebFetchTransport({
  baseUrl: import.meta.env.APP_GrpcApi,
  format: import.meta.env.APP_GrpcFormat  
})

const inject = {
  grpcTransport
}

export default inject
