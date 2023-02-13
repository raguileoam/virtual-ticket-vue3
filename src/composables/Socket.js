import { Client } from '@stomp/stompjs';
import SockJS from "sockjs-client/dist/sockjs";
import { ref, onMounted, onUnmounted } from "vue";

const url = "http://localhost:8080/data-info";

export function useSocket() {
  const client = ref(null);
  const messages = ref([]);

  onMounted(() => {
    client.value = new Client({
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      webSocketFactory: () => (new SockJS(url))
    });

    client.value.onConnect = function () {
      client.value.subscribe("/info/values", (message) => {
        messages.value.push(JSON.parse(message.body));
      });
      client.value.publish({
        destination: "/app/welcome",
        body: 'Hello world',
        skipContentLengthHeader: true,
      });
    };
    
    client.value.activate()
  });
  onUnmounted(() => {
    client.value.deactivate();
  });

  return { messages, client }
}