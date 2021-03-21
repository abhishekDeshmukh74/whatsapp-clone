import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Avatar } from '@material-ui/core';

import './Sidebar-chat.css';
import db from '../../../firebase';


export const SidebarChat = (
    {
        addNewChat,
        id,
        name
    }
) => {

    const [seed, setSeed] = useState('')
    const [messages, setMessages] = useState('')

    useEffect(() => {
        if (id) {
            console.log('id:', id)
            db.collection('rooms')
                .doc(id)
                .collection('messages')
                .orderBy('timestamp', 'desc')
                .onSnapshot(snapshot => {
                    setMessages(snapshot.docs.map(doc => doc.data()))
                })
        }
    }, [id])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 4000))
    }, [])

    const createChat = () => {
        const roomName = prompt('Please enter name for chat')
        if (roomName) {
            db.collection('rooms').add({
                name: roomName
            })
        }
    };

    return (
        !addNewChat ?
            <Link to={`/rooms/${id}`}>
                <div className="sidebar-chat" >
                    <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                    <div className="sidebar-chat-info">
                        <h2>{name}</h2>
                        <p>{messages[0]?.message}</p>
                    </div>
                </div>
            </Link >
            :
            (
                <div onClick={createChat} className="sidebar-chat">
                    <h2>Add new Chat</h2>
                </div>
            )
    )
}
