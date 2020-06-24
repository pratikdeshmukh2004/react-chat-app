import React, { useState, useEffect } from "react";
import queryString from "query-string";
import "./Chat.css";
import io from "socket.io-client";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import OnlineContainer from "../OnlineContainer/OnlineContainer";
import Noti from "./messenger.mp3"
let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState('');
  const ENDPOINT = "http://localhost:5000";
  const audio = new Audio(Noti)
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    socket = io(ENDPOINT);
    setName(name);
    setRoom(room);
    socket.emit("join", { name, room }, (e)=>{
      console.log(e);
      
    });
    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
      audio.play()
    });
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, [ users || message]);

  const sendMessage = (e) =>{    
    e.preventDefault()
    if (message) {      
      socket.emit('sendMessage', message, ()=> setMessage(''))
    }
  }  

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages = {messages} name={name} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      <OnlineContainer users={users}/>
    </div>
  );
};

export default Chat;
