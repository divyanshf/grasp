import {
    AppBar,
    Divider,
    List,
    ListItem,
    TextField,
    Toolbar,
    Typography,
    IconButton,
    Icon,
    Button,
    Fab,
} from '@mui/material';
import { Box } from '@mui/system';
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useRef, useState } from 'react';
import Message from './Message';

const Chat = (props) => {
    const { user } = props;
    const listRef = useRef(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const sendMessage = () => {
        if (message === '') return;
        console.log(message);
        setMessage('');
    };

    useEffect(() => {
        const fetchPreviousMessages = async () => {
            try {
                let res = await fetch(`/profile/api/messages/${user.username}`);
                res = await res.json();
                return res;
            } catch (e) {
                console.log(e);
            }
        };
        fetchPreviousMessages().then((res) => {
            if (!res.error) setMessages(res);
        });
    }, [props]);

    useEffect(() => {
        try {
            listRef.current.scrollTop = listRef.current.scrollHeight;
            console.log(listRef.current.style);
        } catch (e) {
            console.log(e);
        }
    }, [props, messages]);

    if (user._id)
        return (
            <Box style={{ position: 'relative', height: '100%' }}>
                <AppBar position="static" color="transparent">
                    <Toolbar style={{ minHeight: '10vh', height: '10vh' }}>
                        <Typography>{user.name}</Typography>
                    </Toolbar>
                </AppBar>
                <List
                    ref={listRef}
                    style={{
                        height: '80vh',
                        overflow: 'auto',
                        marginTop: '5px',
                    }}
                >
                    {messages.length === 0 && (
                        <Typography
                            align="center"
                            sx={{
                                padding: '1rem',
                                color: 'text.disabled',
                            }}
                        >
                            Start your conversation with {user.name} here.
                        </Typography>
                    )}
                    {messages.map((m, index) => {
                        return (
                            <ListItem
                                key={index}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: `${
                                        m.sender === 'other'
                                            ? 'flex-start'
                                            : 'flex-end'
                                    }`,
                                }}
                            >
                                <Message
                                    other={m.sender === 'other'}
                                    content={m.content}
                                    sender={m.sender}
                                />
                            </ListItem>
                        );
                    })}
                </List>
                <Divider />
                <AppBar
                    position="absolute"
                    color="transparent"
                    style={{ bottom: 0, top: 'auto', backgroundColor: '#ddd' }}
                >
                    <Toolbar style={{ minHeight: '10vh', height: '10vh' }}>
                        <TextField
                            variant="standard"
                            placeholder="Message"
                            multiline
                            maxRows={1}
                            style={{ width: '100%' }}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.ctrlKey && e.key === 'Enter') {
                                    sendMessage();
                                }
                            }}
                        />
                        <IconButton color="primary" onClick={sendMessage}>
                            <SendIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </Box>
        );

    return (
        <Box style={{ position: 'relative', height: '100%' }}>
            <Box
                style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <Typography color="primary" variant="h3" align="center">
                    Grasp
                </Typography>
                <Typography
                    sx={{ color: 'text.disabled', width: '100%' }}
                    align="center"
                >
                    Select a connection to start messaging.
                </Typography>
            </Box>
        </Box>
    );
};

export default Chat;
