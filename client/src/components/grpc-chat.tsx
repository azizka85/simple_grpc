import { createSignal, onCleanup } from "solid-js"
import { RpcError } from '@protobuf-ts/runtime-rpc'
import inject from "../inject"
import { ChatMessage } from "../protos/chat"
import { ChatClient } from "../protos/chat.client"
import { Timestamp } from "../protos/google/protobuf/timestamp"
import { sleep } from "../hooks/timer"

const client = new ChatClient(inject.grpcTransport)

export default function() {
  const [messages, setMessages] = createSignal<ChatMessage[]>([])
  let nameInput: HTMLInputElement | undefined
  let messageInput: HTMLInputElement | undefined
  let abortController: AbortController | null = null
  let aborted = false
  
  onCleanup(() => exit())

  function join() {
    aborted = false
    stream()
  }

  function exit() {
    aborted = true
    cancel()
  }

  async function stream() {
    try {     
      cancel()
      messages().length = 0      
      abortController = new AbortController()    
      const abort = abortController.signal
      const streamingCall = client.join({
        name: nameInput?.value || 'RAMS Signature'
      }, {
        abort
      })
      for await (const data of streamingCall.responses) {
        switch (data.message.oneofKind) {
          case 'message':
            messages().push(data)
            setMessages([
              ...messages()
            ])
            break
          case 'response':
            if(data.message.response.success) {
              console.log(data.message.response.users)
            } else {
              console.error(data.message.response.message)
            }
            break
          case 'enterSignal':
            console.log('Entered:', data.message.enterSignal.name)
            break
          case 'exitSignal':
            console.log('Exited:', data.message.exitSignal.name)
            break
        }          
      }
    } catch(error) {            
      console.error(error)
      if(!aborted && (!(error instanceof RpcError) || error.code !== 'CANCELLED')) {
        await sleep(import.meta.env.APP_GrpcUpdateIfErrorMs ?? 3000)      
        console.log('recalling...')
        stream()
      }           
    }
  }

  async function send() {    
    await client.sendMessage({
      timestamp: Timestamp.now(),
      message: {
        oneofKind: 'message',
        message: {
          message: messageInput?.value ?? '',
          from: {
            name: nameInput?.value ?? '' 
          }
        }
      }
    })
  }


  async function cancel() {
    abortController?.abort('client canceled')
    console.log('aborted:', abortController?.signal.aborted, abortController?.signal.reason)
  }

  return (
    <div>
      <h3>gRPC chat</h3>
      <div>
        <input
          ref={nameInput}
          type="text"
          placeholder="Enter a name"
        />
        &nbsp;
        <button
          onClick={() => join()}
        >
          Join
        </button>
        &nbsp;
        <button
          onClick={() => exit()}
        >
          Exit
        </button>
      </div>
      <br />
      <div>
        <input
          ref={messageInput}
          type="text"
          placeholder="Enter a message"
        />
        &nbsp;
        <button
          onClick={() => send()}
        >
          send
        </button>
      </div>
      <br />
      <div>
        <ol>
          {messages().map((message, index) => (
            <li>
              {Timestamp.toDate(message.timestamp ?? Timestamp.now()).toLocaleString()}
              -
              {
                message.message.oneofKind === 'message' 
                  ? `(${message.message.message.from?.name}) ${message.message.message.message}` 
                  : ''
              }
            </li>
          ))}
        </ol>
      </div>
    </div>
  )  
}
