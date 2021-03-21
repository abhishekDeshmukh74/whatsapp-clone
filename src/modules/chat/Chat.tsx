import React, { useEffect, useState } from 'react'
import firebase from 'firebase';
import { useParams } from 'react-router-dom';
import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, MoreVert, SearchOutlined } from '@material-ui/icons';
import MicIcon from '@material-ui/icons/Mic';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';

import './Chat.css';
import db from '../../firebase';
import { useStateValue } from '../../StateProvider';

export const Chat = () => {

    const [{ user }] = useStateValue();

    const [seed, setSeed] = useState('')
    const [input, setInput] = useState('')
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState('')
    const [messages, setMessages] = useState([])

    useEffect(() => {
        if (roomId) {
            db.collection('rooms')
                .doc(roomId)
                .onSnapshot(snapshot =>
                    setRoomName(snapshot.data()?.name)
                )

            db.collection('rooms')
                .doc(roomId)
                .collection('messages')
                .orderBy('timestamp', 'asc')
                .onSnapshot(snapshot =>
                    setMessages(snapshot.docs.map((doc) => doc.data()))
                )
        }
    }, [roomId])


    useEffect(() => {
        setSeed(Math.floor(Math.random() * 4000))
    }, [])

    const sendMessage = (e) => {
        e.preventDefault();

        db.collection('rooms')
            .doc(roomId)
            .collection('messages')
            .add({
                message: input,
                user: user.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
        setInput('')
    }

    return (
        <div className="chat" >

            <div className="chat-header">

                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

                <div className="chat-header-info">
                    <h3>
                        {roomName}
                    </h3>
                    <p> last seen {" "}
                        {
                            new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()
                        }
                    </p>
                </div>

                <div className="chat-header-right">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>

            </div>

            <div className="chat-body">
                {
                    messages.map(message => (

                        <p className={`chat-message ${message.name === user.displayName && 'chat-receiver'}`}>
                            <span className="chat-name">{message.name}
                            </span>
                            {message.message}
                            <span className="chat-timestamp">
                                {
                                    new Date(message?.timestamp?.toDate()).toUTCString()
                                }
                            </span>
                        </p>
                    ))
                }
            </div>

            <div className="chat-footer">

                <InsertEmoticonIcon />

                <form>
                    <input
                        type="text"
                        value={input}
                        placeholder="Type a message"
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button type="submit" onClick={sendMessage} >Send a message</button>
                </form>

                <MicIcon />


            </div>

        </div>
    )
}
