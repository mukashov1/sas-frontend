import React, { useState, useEffect } from 'react';

export default function SearchResult({ user, onRequest, onAddToPermitted }) {
    const [requested, setRequested] = useState(false);
    const permittedUsers = JSON.parse(localStorage.getItem('permitted users')) || [];

    useEffect(() => {
        const isPermitted = permittedUsers.some(
            (permittedUser) => permittedUser.id === user.studentId
        );
        setRequested(isPermitted);
    }, [user, permittedUsers]);

    const handleRequestClick = () => {
        setRequested(true);
        onRequest();
        onAddToPermitted(user);
    };

    return (
        <tr>
            <td>
                {user.user.firstName} {user.user.lastName}
            </td>
            <td>{user.studentId}</td>
            <td>Student</td>
            <td>
                <button onClick={handleRequestClick} disabled={requested}>
                    {requested ? 'Requested' : 'Request'}
                </button>
            </td>
        </tr>
    );
}
