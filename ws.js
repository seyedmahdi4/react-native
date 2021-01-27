
import io from "socket.io-client";
const socket = io.connect('http://0.0.0.0:5000', {
        extraHeaders: {
          token: "b141907e21dc83c8ee69523621e52508b6797a4fa72b079138b037f6bbe55a70",
        }})

export {socket}