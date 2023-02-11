import { createSignal } from 'solid-js'

import inject from '../inject'

import { GreetClient } from '../protos/greet.client'

const client = new GreetClient(inject.grpcTransport)
const [message, setMessage] = createSignal('Empty message')

let input: HTMLInputElement | undefined

async function submit() {
  const res = await client.get({
    name: input?.value || 'Boombati Residence!'
  })
  
  setMessage(res.response.message)
}

export default function() {
  return (
    <div>
      <h3>Unary gRPC type</h3>
      <div>
        <input 
          ref={input}
          type="text" 
          placeholder="Enter a name"
        />
        &nbsp;
        <button
          onClick={() => submit()}
        >
          Submit
        </button>
      </div>
      <br />
      <div>
        {message()}
      </div>
    </div>
  )
}
