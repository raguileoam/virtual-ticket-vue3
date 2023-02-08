import { Client } from '@stomp/stompjs';
import SockJS from "sockjs-client/dist/sockjs";
import { ref, onMounted, onUnmounted } from "vue";

const url = "http://localhost:8080/data-info";

const callback = function (message) {
  if (message.body) {
    console.log("got message with body " + message.body);
    return message.body;
  } else {
    console.log("got empty message");
    return "";
  }
};

export function useSocket() {
  const client = ref(null);
  const messages = ref([]);

  onMounted(() => {
    client.value = new Client({
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      webSocketFactory: () => (new SockJS(url))
    });

    client.value.onConnect = function (frame) {
      client.value.subscribe("/info/values", (message) => {
        messages.value.push(JSON.parse(message.body));
      });
      client.value.publish({
        destination: "/app/welcome",
        body: 'Hello world',
        skipContentLengthHeader: true,
      });
    };

    client.value.onStompError = function (frame) {
      console.log('Broker reported error: ' + frame.headers['message']);
      console.log('Additional details: ' + frame.body);
    };
    client.value.activate()
  });
  onUnmounted(() => {
    client.value.deactivate();
  });

  return { messages, client }
};