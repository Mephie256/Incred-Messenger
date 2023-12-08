import React from 'react'
import { Typography, Card, CardContent } from '@mui/material';
import './Message.css';
import './Message.css';
import { forwardRef } from 'react';

const Message = forwardRef(({ message, username }, ref) => {
    const isUser = username === message.username;
    return (
        <div ref={ref} className={`message ${isUser && 'massage__user'}`}>
            <Card className={isUser ? 'massage__userCard' : 'massage__guestCard'}>
                <CardContent>
                    <Typography
                        color='white'
                        variant='h5'
                        component='h2'
                    >
                        {!isUser && `${message.username || 'Unknown User'}: `} {message.message}
                    </Typography>
                </CardContent>
            </Card>
        </div>


    )
})

export default Message

