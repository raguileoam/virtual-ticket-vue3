import { Client } from '@stomp/stompjs';
import SockJS from "sockjs-client/dist/sockjs";
const url = "http://localhost:8080/data-info";

const callback = function (message) {
  if (message.body) {
    console.log("got message with body " + message.body);
  } else {
    console.log("got empty message");
  }
};

const client = new Client({
  debug: function (str) {
    console.log(str);
  },
  reconnectDelay: 5000,
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,
  webSocketFactory: () => (new SockJS(url))
});

client.onConnect = function (frame) {
  client.subscribe("/info/values", callback);
  client.publish({
    destination: "/app/welcome",
    body: 'Hello world',
    skipContentLengthHeader: true,
  });
};

client.onStompError = function (frame) {
  console.log('Broker reported error: ' + frame.headers['message']);
  console.log('Additional details: ' + frame.body);
};


export default client;