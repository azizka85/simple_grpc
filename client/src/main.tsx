import { render } from 'solid-js/web'
import GrpcChat from './components/grpc-chat'
import GrpcMethodsList from './components/grpc-methods-list'

render(() => (
  <>
    <GrpcMethodsList />
    <GrpcChat />
  </>  
), document.getElementById('root') as HTMLElement)
