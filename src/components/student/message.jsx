import React from "react";

export default function Message(props) {
    const {message, onAccept, onDeny} = props
    const { senderName, content, receivedDate, type, accepted} = message;
    console.log('Accept')

    return (
        <div className="message">
            <div className="message_header">
                <span className="sender">{senderName}</span>
                <p className="date">{receivedDate}</p>
            </div>
            <div className="message_content">
                <p className="content">{content}</p>

                {type === "request" ? (
                    <div className="request">
                        <div className="request_title">
                            <b>Aslan Abenov </b>
                            for
                            <b>Akbope Zhengiskhan</b>
                        </div>
                        <div className="request_action">
                            <button className="acceptBtn" onClick={onAccept} disabled={accepted}>
                                Accept
                            </button>
                            <button className="denyBtn" onClick={onDeny} disabled={accepted}>
                                Deny
                            </button>
                        </div>
                    </div>
                ) : null}
            </div>

        </div>
    )
}