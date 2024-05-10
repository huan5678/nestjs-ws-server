<script lang="ts">
  import { onMount } from 'svelte';
  type Message = {
  id:        string;
  content:   string;
  senderId:  string;
  roomId:    string;
  createdAt: Date;
};

const messages: Message[] = [];

onMount(async () => {
  await fetchMessages();
});

async function fetchMessages() {

  const baseURL = 'http://localhost:3002';
  const res = await fetch(`${baseURL}/messages/room1`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const data = await res.json();
  data.map((item: Message) => {
    messages.push(item);
  });
  console.log(messages);
}

</script>

<section>
  <h1>Messages Room1</h1>
  <ul>
    {#each messages as item}
    <li>{item.content}</li>
    {/each}
  </ul>
</section>