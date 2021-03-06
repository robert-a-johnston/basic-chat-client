
import './App.css'
import io from 'socket.io-client'
import { useState } from 'react'
import Chat from './components/Chat'

const socket = io.connect('http://localhost:3001')

function App() {
  // state information
  const [userName, setUserName] = useState('')
  const [room, setRoom] = useState('')
  const [showChat, setShowChat] = useState(false)

  // function to join room
  const joinRoom = () => {
    if(userName !== '' && room !== ''){
      socket.emit('join_room', room)
      setShowChat(true)
    }
  }

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat Room</h3>
          <input
            type="text"
            placeholder="User..."
            onChange={(event) => {
              setUserName(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={userName} room={room} />
      )}
    </div>
  )
}

export default App
