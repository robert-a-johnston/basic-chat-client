import React, {useEffect, useState } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'

function Chat({socket, userName, room}) {
  // state for message  and array of messages
  const [currentMessage, setCurrentMessage] = useState('')
  const [messageList, setMessageList] = useState([])

  // Sends message with socket
  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        room: room,
        author: userName,
        message: currentMessage,
        time: 
          new Date(Date.now()).getHours() + 
          ':' + 
          new Date(Date.now()).getMinutes()

      }
    await socket.emit('send_message', messageData)
    setMessageList((list) => [...list, messageData])
    setCurrentMessage('')
    }
  }
  // listen for change in socket server from backend 
  useEffect(() => {
    socket.on('receive_message', (data) => {
      console.log('data from server', data)
      // adds data to list array
      setMessageList((list) => [...list, data])
    })
  }, [socket])

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={userName === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  )
}

export default Chat
