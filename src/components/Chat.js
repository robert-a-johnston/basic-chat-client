import React from 'react'
import { useState, useEffect } from 'react'

function Chat({socket, userName, room}) {
  // state for message
  const [currentMessage, setCurrentMessage] = useState('')

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
    }
  }
  useEffect(() => {
    socket.on('receive_message', (data) => {
      console.log('data', data)
    })
  }, [socket])
  return (
    <div>
      <div className='chat-header'></div>
        <p>live chat</p>
      <div className='chat-body'></div>
      <div className='chat-footer'>
        <input 
          type='text'
          placeholder='message...'
          onChange={(event) => {
            setCurrentMessage(event.target.value)
          }}
          />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  )
}

export default Chat
