import { serve } from "bun";

const htmlContent = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
  </head>
  <body>
    <input type="text" id="chatInput" />
    <button onclick="sendMessage()">Send</button>

    <script>
        let socket = new WebSocket("ws://localhost:8080/ws");
        console.log("Attempting Connection...");

        socket.onopen = () => {
            console.log("Successfully Connected");
            socket.send("Hi From the Client!");
        };

        socket.onclose = (event) => {
            console.log("Socket Closed Connection: ", event);
        };

        socket.onerror = (error) => {
            console.log("Socket Error: ", error);
        };

        function sendMessage() {
            const input = document.getElementById("chatInput");
            const message = input.value;
            if(message) {
                socket.send(message);
                input.value = "";
            }
        }
    </script>
  </body>
</html>
`;


serve({
  port: 3000,

  fetch(request) {

    return new Response(htmlContent, {
      headers: {
        "Content-Type": "text/html",

      },
    });

  },

});


console.log("Server is running on http://localhost:3000");

