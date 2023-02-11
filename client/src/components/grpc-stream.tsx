import { createSignal, onCleanup } from 'solid-js'
import { RpcError } from '@protobuf-ts/runtime-rpc'
import inject from '../inject'
import { Timestamp } from '../protos/google/protobuf/timestamp'
import { CallResponse } from '../protos/timing'
import { TimingClient } from '../protos/timing.client'
import { sleep } from '../hooks/timer'

const client = new TimingClient(inject.grpcTransport)

export default function() {
  const [messages, setMessages] = createSignal<CallResponse[]>([])
  let input: HTMLInputElement | undefined
  let abortController: AbortController | null = null
  let aborted = false
  
  onCleanup(() => abort())  
  
  function stream() {
    aborted = false
    call()
  }

  async function call() {
    try {     
      cancel()
      messages().length = 0      
      abortController = new AbortController()    
      const abort = abortController.signal
      const streamingCall = client.call({
        name: input?.value || 'RAMS Signature'
      }, {
        abort
      })
      for await (const message of streamingCall.responses) {
        messages().push(message)
        setMessages([
          ...messages()
        ])
      }
    } catch(error) {            
      console.error(error)
      if(!aborted && (!(error instanceof RpcError) || error.code !== 'CANCELLED')) {
        await sleep(import.meta.env.APP_GrpcUpdateIfErrorMs ?? 3000)      
        console.log('recalling...')
        call()
      }           
    }
  }  

  function cancel() {
    abortController?.abort('client canceled')
    console.log('aborted:', abortController?.signal.aborted, abortController?.signal.reason)
  }

  function abort() {
    aborted = true
    cancel()
  }  

  return (
    <div>
      <h3>Stream gRPC type</h3>
      <div>
        <input
          ref={input}
          type="text"
          placeholder="Enter a name"
        />
        &nbsp;
        <button
          onClick={() => stream()}
        >
          Stream
        </button>
        &nbsp;
        <button
          onClick={() => abort()}
        >
          Cancel
        </button>
      </div>
      <br />
      <div>
        <ol>
          {messages().map((message, index) => (
            <li>
              {Timestamp.toDate(message.timestamp ?? Timestamp.now()).toLocaleString()}
              -
              {message.message}
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
