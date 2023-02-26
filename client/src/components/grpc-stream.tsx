import { For, onCleanup, onMount } from 'solid-js'
import { createStore, produce } from 'solid-js/store'

import { RpcError } from '@protobuf-ts/runtime-rpc'

import inject from '../inject'

import { Timestamp } from '../protos/google/protobuf/timestamp'
import { CallResponse } from '../protos/timing'
import { TimingClient } from '../protos/timing.client'
import { sleep } from '../hooks/timer'

const client = new TimingClient(inject.grpcTransport)

type GrpcStreamProps = {
  call: boolean
}

export default function(props: GrpcStreamProps) {
  const [store, setStore] = createStore({ messages: [] as CallResponse[] })
  let input: HTMLInputElement | undefined
  let abortController: AbortController | null = null
  
  onMount(() => {
    if(props.call) {
      call()
    }
  })
  onCleanup(() => cancel())  

  function addMessage(message: CallResponse) {
    setStore(
      'messages',
      produce(messages => messages.push(message))
    )
  }

  function clearMessages() {
    setStore('messages', [])
  }

  async function call() {
    try {     
      cancel()
      clearMessages()

      abortController = new AbortController()    
      const abort = abortController.signal
      
      const streamingCall = client.call({
        name: input?.value || 'RAMS Signature'
      }, {
        abort
      })
      
      for await (const message of streamingCall.responses) {
        addMessage(message)
      }
    } catch(error) {            
      console.error(error)

      if(!(error instanceof RpcError) || error.code !== 'CANCELLED') {
        await sleep(import.meta.env.APP_GrpcUpdateIfErrorMs ?? 3000)      

        console.log('recalling...')

        await call()
      }           
    }
  }  

  function cancel() {
    abortController?.abort('client canceled')
    console.log('aborted:', abortController?.signal.aborted, abortController?.signal.reason)
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
          onClick={() => call()}
        >
          Stream
        </button>
        &nbsp;
        <button
          onClick={() => cancel()}
        >
          Cancel
        </button>
      </div>
      <br />
      <div>
        <ol>
          <For each={store.messages}>
            {(message) => 
              <li>
                {Timestamp.toDate(message.timestamp ?? Timestamp.now()).toLocaleString()}
                -
                {message.message}
              </li>
            }
          </For>
        </ol>
      </div>
    </div>
  )
}
