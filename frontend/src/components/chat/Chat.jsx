import React, { useContext, useEffect, useRef, useState } from "react";
import "./chat.scss";
import { useSelector } from "react-redux";
import apiRequest from "../../lib/apiRequest";
import { format } from "timeago.js";
import { SocketContaxt } from "../../context/SocketContext";

const Chat = ({ chats }) => {
  const [chatt, setChatts] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const {socket} = useContext(SocketContaxt)
const messageEndRef = useRef()

// useEffect(()=>{
//   messageEndRef.current?.scrollIntoView({behavior:"smooth"})
// },[chatt])


  if (!Array.isArray(chats)) {
    return <p>No chats available</p>;
  }

  const handleOpenchatBox = async (id, receiver) => {
    
    try {
      const res = await apiRequest("/chats/" + id);
      setChatts({ ...res.data, receiver });
    } catch (error) {
      console.log(error);
    }
    
  };

  //console.log(chatt);
 
  const handleSubmit = async (e) =>{
    e.preventDefault();
    const formdata = new FormData(e.target);
    const text = formdata.get("text");

    if(!text) return;

    try {
        const res = await apiRequest.post("/messages/" + chatt.chat.id,{text});
        setChatts((prev) => ({
            ...prev,
            chat: {
              ...prev.chat,
              messages: [...(prev.chat.messages || []), res.data]
            }
          }));
        e.target.reset()
        console.log(chatt?.receiver.id);

        socket.emit("sendMessage",{
          recieverId : chatt?.receiver.id,
          data:res.data
        })
    } catch (error) {
        
    }
  }

  useEffect(()=>{
    const read = async()=>{
      try {
        await apiRequest.put("/chats/read/"+chatt.chat.id)
      } catch (error) {
        console.log(error);
      }
    }
    if(chatt && socket){
      socket.on("getMessage",(data)=>{
        if(chatt.id === data.chatId){
          setChatts(prev=>({...prev,messages:[...prev.messages,data]}))
        }
      })
    }
  },[socket])

 
 
  return (
    <div className="chat">
   
      <div className="messages">
        <h1>Messages</h1>
        {chats.map((chat) => (
          <div
            className="message"
            key={chat.id}
            style={{
              backgroundColor: chat.seenBy.includes(user.id) || chat?.id === chat.id
                ? "white"
                : "#fecd514e",
            }}
            onClick={() => handleOpenchatBox(chat.id, chat.receiver)}
          >
            <img src={chat.receiver.avatar || "/noavatar.jpg"} alt="" />
            <span>{chat.receiver.username}</span>
            <p>{chat.lastMessage}</p>
          </div>
        ))}
      </div>
      {chatt && (
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img src={chatt?.receiver?.avatar || "/noavatar.jpg"} alt="" />
              {chatt?.receiver?.username}
            </div>
            <span className="close" onClick={() => setChatts(null)}>
              X
            </span>
          </div>
          <div className="center">
            {chatt.chat.messages.map((message) => (
              <div
                className="chatMessage"
                key={message.id}
                style={{
                  alignSelf:
                    message.userId === user.id ? "flex-end" : "flex-start",
                  textAlign: message.userId === user.id ? "right" : "left",
                }}
              >
                <p>{message.text}</p>
                <span>{format(message.createdAt)}</span>
              </div>
            ))}
            <div ref={messageEndRef}>

            </div>
          </div>
          <form onSubmit={handleSubmit} className="bottom">
            <textarea name="text"></textarea>
            <button>Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chat;
