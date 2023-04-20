import React, { useState } from "react";
import Message from "./message";
import { BsArrowLeft } from 'react-icons/bs'
import { RiDeleteBinLine } from 'react-icons/ri'

export default function Messages() {

    const messages = [
        {
            id: 1,
            senderName: "Alice",
            content: "Hi Bob, can you accept my permission?",
            receivedDate: "2023.04.07",
            isOpen: false,
            type: "request",
        },
        {
            id: 2,
            senderName: "Bob",
            content: "Sure, what time works for you?",
            receivedDate: "2022.04.07",
            isOpen: false,
            type: "accepted",
        },
        {
            id: 3,
            senderName: "Alice",
            content: "How about 2pm?",
            receivedDate: "2022.04.07",
            isOpen: false,
            type: "request",
        },
        {
            id: 4,
            senderName: "Bob",
            content: "That works for me. See you then!",
            receivedDate: "2022.04.07",
            isOpen: false,
            type: "accepted",
        },
    ];

    const [messageList, setMessageList] = useState(messages);
    const [selectedMessage, setSelectedMessage] = useState(null);

    function handleCheckboxClick(index) {
        const updatedList = messageList.slice();
        updatedList[index].selected = !updatedList[index].selected;
        setMessageList(updatedList);
    }

    function handleDeleteClick() {
        const updatedList = messageList.filter((message) => !message.selected);
        setMessageList(updatedList);
    }

    function handleMessageClick(index) {
        const updatedList = messageList.slice();
        updatedList[index].opened = true;
        setMessageList(updatedList);

        setSelectedMessage(updatedList[index]);
    }

    function handleAcceptClick() {
        console.log('Accept')
        const updatedList = messageList.slice();
        const index = updatedList.findIndex((message) => message === selectedMessage);
        updatedList[index].accepted = true;
        setMessageList(updatedList);

        setSelectedMessage(null);
        handleBackClick();
    }

    function handleDenyClick() {
        const updatedList = messageList.slice();
        const index = updatedList.findIndex((message) => message === selectedMessage);
        updatedList[index].accepted = false;
        setMessageList(updatedList);

        setSelectedMessage(null);
        handleBackClick();
    }

    function handleBackClick() {
        setSelectedMessage(null);
    }

    return (
        <div className="messages_container">
            {!selectedMessage ? (
                <div className="messages">
                    <h2>Messages <RiDeleteBinLine onClick={handleDeleteClick} /></h2>
                    {messageList.map((message, index) => (
                        <div key={index}>
                            <span className="dot" onClick={() => handleMessageClick(index)}>{message.opened ? "" : "• "}</span>
                            <span className="sender" onClick={() => handleMessageClick(index)}>{message.senderName} </span>
                            <span className="content" onClick={() => handleMessageClick(index)}>
                                {message.opened ? message.content : message.content.substring(0, 50) + "..."}
                            </span>
                            <span className="date" onClick={() => handleMessageClick(index)}> {message.receivedDate} </span>
                            <input
                                type="checkbox"
                                checked={message.selected}
                                onClick={() => handleCheckboxClick(index)}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <Message
                    message={selectedMessage}
                    onAccept={handleAcceptClick}
                    onDeny={handleDenyClick}
                />
            )}

            {selectedMessage && (
                <h2 className="returnBtn" onClick={handleBackClick}><BsArrowLeft />  Back to Messages</h2>
            )}
        </div>
    );
}