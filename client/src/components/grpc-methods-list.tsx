import GrpcStream from './grpc-stream'
import GrpcUnary from './grpc-unary'

export default function () {
  return (
    <div>
      <h3>List of gRPC methods</h3>
      <GrpcUnary />
      <hr />
      <GrpcStream />
    </div>
  )
}
