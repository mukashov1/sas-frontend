import React from 'react'
import { useState, useEffect } from 'react';

export default function OnlineTime() {
    const [onlineTime, setOnlineTime] = useState('');
    const [dayOfWeek, setDayOfWeek] = useState('');
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const day = String(now.getDate()).padStart(2, '0');
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const year = now.getFullYear();
            const dateString = `${day}.${month}.${year}`;
            const dayString = now.toLocaleDateString('en-US', { weekday: 'long' });
            const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            setOnlineTime(dateString);
            setDayOfWeek(dayString);
            setCurrentTime(timeString);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div className='onlineTime'>
            {onlineTime}
            <br />
            {dayOfWeek}
            <br />
            {currentTime}
        </div>
    )
}