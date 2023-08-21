import {useState, useEffect, useRef} from 'react';
import socket from '../../socket';
import ACTIONS from '../../socket/actions';
import {useHistory} from 'react-router';
import {v4} from 'uuid';
import  "./Lobby.css";

export default function Main() {
  const history = useHistory();
  const [rooms, updateRooms] = useState([]);
  const rootNode = useRef();

  useEffect(() => {
    socket.on(ACTIONS.SHARE_ROOMS, ({rooms = []} = {}) => {
      if (rootNode.current) {
        updateRooms(rooms);
      }
    });
  }, []);

  return (
<div className='bg'>
    <div className='chat' ref={rootNode}>
    <h1 className='create-lobby'>Create Lobby</h1>
<div className='yuz'>
      <ul>
        {rooms.map(roomID => (
          <li key={roomID}>
            {roomID}
            <button onClick={() => {
              history.push(`/room/${roomID}`);
            }}>JOIN ROOM</button>
          </li>
        ))}
      </ul>
      <div className='center'>
      <button className='pusher' onClick={() => {
        history.push(`/room/${v4()}`);
      }}>Create New Room</button>
      </div>
    </div>
</div>


  </div>
  );
}