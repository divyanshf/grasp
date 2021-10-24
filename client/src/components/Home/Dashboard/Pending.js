import UserList from '../../UserList/UserList';
import UserConnectionRequestItem from '../../UserList/UserConnectionRequestItem';
import { Button, TextField, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { Box } from '@mui/system';
import NewConnection from './NewConnection';

const container = {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: '2rem',
};

const Pending = (props) => {
    const [sent, setSent] = useState([]);

    const fetchSent = async () => {
        let res = await fetch(`/profile/pending`);
        res = await res.json();
        return res;
    };

    useEffect(() => {
        fetchSent().then((res) => {
            if (res.profiles) setSent(res.profiles);
        });
    }, []);

    return (
        <Box>
            <UserList users={sent} title="Users">
                {sent.length > 0 ? (
                    sent.map((user, index) => {
                        return (
                            <UserConnectionRequestItem
                                key={index}
                                user={user}
                                index={index}
                                type="Pending"
                            />
                        );
                    })
                ) : (
                    <Typography
                        style={{ textAlign: 'center', marginTop: '1rem' }}
                    >
                        No pending requests yet.
                    </Typography>
                )}
            </UserList>
        </Box>
    );
};

export default Pending;
