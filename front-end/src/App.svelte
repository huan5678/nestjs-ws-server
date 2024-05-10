<script lang="ts">
  import Counter from './lib/Counter.svelte'
  import io from 'socket.io-client'
  import Message from './lib/message.svelte';

  const server = io('http://localhost:3002', {
    withCredentials: true,
  });

  server.on('connect', ()=> {
    console.log('connected');
  });

  server.on('message', (data)=> {
    console.log(data);
  });

  server.on('newMessage', (message) => {
      console.log(message);
    });

</script>

<main>
  <div>
  <Message />
  <div class="card">
    <Counter />
  </div>

  </div>
</main>
