import React, { useEffect, useState } from 'react';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Button, FormControl, Input, InputLabel } from '@mui/material';
import Message from './assets/Message';
import db from './assets/firebase';
import { collection, onSnapshot, addDoc, serverTimestamp, orderBy, query } from 'firebase/firestore';
import FlipMove from 'react-flip-move';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';



function App() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'messages'), (querySnapshot) => {
            setMessages(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        });

        return () => unsubscribe(); // Unsubscribe when the component unmounts
    }, []);

    useEffect(() => {
        setUsername(prompt('Please enter username'));
    }, []);

    const sendMsg = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        try {
            // Use Firestore to add a new document to the 'messages' collection
            await addDoc(collection(db, 'messages'), {
                message: input,
                username: username,
                timestamp: serverTimestamp(),
            });
        } catch (error) {
            console.error('Error adding document: ', error);
        }

        setInput(''); // Clear the input field after sending the message
    };

    useEffect(() => {
        const messagesCollection = collection(db, 'messages');
        const orderedMessagesQuery = query(messagesCollection, orderBy('timestamp', 'desc'));

        const unsubscribe = onSnapshot(orderedMessagesQuery, (querySnapshot) => {
            setMessages(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        });

        return () => unsubscribe(); // Unsubscribe when the component unmounts
    }, []);

    return (
        <div className='App'>
            <img className='IMG' src={'public/messenger.png'} alt='Messenger' width={'100'} height={'100'} />
            <h1>Hello Increds</h1>
            <h2>Welcome {username}</h2>
            <form className='app__form'>
                <FormControl className='formContol'>

                    <Input className='input' placeholder='Enter a message...' value={input} onChange={(event) => setInput(event.target.value)} />

                    <IconButton className='button' disabled={!input} color='primary' variant='contained' type='submit' onClick={sendMsg}>
                        <SendIcon />
                    </IconButton>


                </FormControl>
            </form>

            <FlipMove>
                {messages.map((message, index) => (
                    <Message key={index} username={username} message={message} />
                ))}
            </FlipMove>
        </div>
    );
}

export default App;