
import './App.css'
import io from 'socket.io-client'
import { useState } from 'react'
import Chat from './components/Chat'

const socket = io.connect('http://localhost:3001')

function App() {
  // state information
  const [userName, setUserName] = useState('')
  const [room, setRoom] = useState('')

  // function to join room
  const joinRoom = () => {
    if(userName !== '' && room !== ''){
      socket.emit('join_room', room)
      
    }
  }

  return (
    <div className="App">
      <h3>Join a ChatRoom</h3>
      <input 
        type='text' 
        placeholder='User...' 
        onChange={(event) => {
          setUserName(event.target.value)
        }}
      />
      <input
        type='text' 
        placeholder='Room'
        onChange={(event) => {
          setRoom(event.target.value)
        }}
        />
      <button onClick={joinRoom}>join a room</button>
      <Chat socket={socket} userName={userName} room={room}/>
    </div>
  )
}

export default App
