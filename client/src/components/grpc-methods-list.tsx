import GrpcStream from './grpc-stream'
import GrpcUnary from './grpc-unary'

export default function () {
  const streams = []

  for(let i = 0; i < 64; i++) {
    streams.push(<GrpcStream call={true} />)
  }
  
  return (
    <div>
      <h3>List of gRPC methods</h3>
      <GrpcUnary />
      <hr />
      {streams}
    </div>
  )
}
