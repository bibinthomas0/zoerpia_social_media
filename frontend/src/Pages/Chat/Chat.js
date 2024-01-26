import React, { useState, useEffect } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";

function Chat() {
    const [socket, setSocket] = useState(null);
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [activeUsers, setActiveUsers] = useState([]);

  
    useEffect(() => {

      const storedUsername = localStorage.getItem("username");
      if (storedUsername) {
        setUsername(storedUsername);
      } else {
        const input = prompt("Enter your username:");
        if (input) {
          setUsername(input);
          localStorage.setItem("username", input);
        }
      }


      const storedRoom = localStorage.getItem("room");
      if (storedRoom) {
        setRoom(storedRoom);
      } else {
        const input = prompt("Enter your room:");
        if (input) {
          setRoom(input);
          localStorage.setItem("room", input);
        }
      }

      
      if (username && room) {
        const newSocket = new WebSocket(`ws://localhost:8002/ws/chat/${room}/${username}/`);
        setSocket(newSocket);
        newSocket.onopen = () => console.log("WebSocket connected");

        newSocket.onclose = () => {
          console.log("WebSocket disconnected");
        };
        return () => {
          newSocket.close();
        };
      }
    }, [username, room]);


    useEffect(() => {
      if (socket) {
        socket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          if (data.user_list) {
            setActiveUsers(data.user_list);
          } else {
            setMessages((prevMessages) => [...prevMessages, data]);
          }
        };
      }
    }, [socket]);
    const handleSubmit = (event) => {
      event.preventDefault();
      if (message && socket) {
        const data = {
          message: message,
          username: username,
        };
        socket.send(JSON.stringify(data));
        setMessage("");
      }
    };
    return (
      <div className="chat-app">
        <div className="chat-wrapper">
          <div className="active-users-container">
            <h2>Active Users ({activeUsers.length})</h2>
            <ul>
              {activeUsers.map((user, index) => (
                <li key={index}>{user}</li>
              ))}
            </ul>
          </div>
          <div className="chat-container">
            <div className="chat-header">Chat Room: {room}</div>
            <div className="message-container">
              {messages.map((message, index) => (
                <div key={index} className="message">
                  <div className="message-username">{message.username}:</div>
                  <div className="message-content">{message.message}</div>
                  <div className="message-timestamp">{message.timestamp}</div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(event) => setMessage(event.target.value)}
              />
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
  export default Chat;