import {useParams} from 'react-router';
import useWebRTC, {LOCAL_VIDEO} from '../../hooks/useWebRTC';
import './Room.css'

function layout(clientsNumber = 1) {
  const pairs = Array.from({length: clientsNumber})
    .reduce((acc, next, index, arr) => {
      if (index % 2 === 0) {
        acc.push(arr.slice(index, index + 2));
      }

      return acc;
    }, []);

  const rowsNumber = pairs.length;
  const height = `${100 / rowsNumber}%`;

  return pairs.map((row, index, arr) => {

    if (index === arr.length - 1 && row.length === 1) {
      return [{
        width: '100%',
        height,
      }];
    }

    return row.map(() => ({
      width: '50%',
      height,
    }));
  }).flat();
}

export default function Room() {
  const {id: roomID} = useParams();
  const {clients, provideMediaRef} = useWebRTC(roomID);
  const videoLayout = layout(clients.length);
  function close() {
    var a = 5;
    var a = 11;

    if (a = 5) {
      document.querySelector(".video-video").style.display='none'
    }else{
      document.querySelector(".video-video").style.display='flex' 
    }
  }

  return (

    <div className='glav'>

      <div className="video_panel">

<div className="video100">
    <div className='video_div' >
      {clients.map((clientID, index) => {
        return (
          <div key={clientID} style={videoLayout[index]} id={clientID}>
            <video
            className='video-video'
              width='60%'
              height='29%'
              ref={instance => {
                provideMediaRef(clientID, instance);
              }}
              autoPlay
              playsInline
              muted={clientID === LOCAL_VIDEO}
            />
          </div>
        );
      })}
    </div>
    </div>
    <div className="footer-panel">
      <div className="mute"><button onClick={()=>{close()}}>close</button></div>
      <div className="start-video"></div>
      <div className="screen-share"></div>
      <div className="leave"></div>
    </div>
    </div>

    <div className="chatdiv">
      <div className="navbar">Chat</div>
      <div className="vnchat"></div>
      <div className="footer"><input className='chat-inp' type="text" name="" id="" /></div>
    </div>

    </div>

  );
}