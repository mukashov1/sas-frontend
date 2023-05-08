import React from 'react';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import $api from '../../http/api';
import Modal from 'react-modal';

export default function Specialreason() {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [selectedOption, setSelectedOption] = useState('Illness');
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedName, setSelectedName] = useState('');
    const [comment, setComment] = useState('');
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalText, setModalText] = useState('');
    const [fileToUpload, setFileToUpload] = useState(null)
    const user = JSON.parse(localStorage.getItem('user'))

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (startDate > endDate && (startDate.getDate() !== endDate.getDate() || startDate.getMonth() !== endDate.getMonth() ||
            startDate.getFullYear() !== endDate.getFullYear())) {
            setModalText('The from date cannot be later than the end date');
            setIsModalOpen(true);
        } else if (fileToUpload.size > 10000000) {
            setModalText('File size exceeds 10mb');
            setIsModalOpen(true);
        } else {
            try {
                const response = await $api.post("recordSpecialReason", {
                    "studentId": user.studentId,
                    "firstName": user.firstName,
                    "lastName": user.lastName,
                    "fromDate": startDate,
                    "toDate": endDate,
                    "type": selectedOption,
                    "file": selectedFile,
                    "comment": comment,
                    "fileName": selectedName
                });
                if (response.status === 200) {
                    alert("File submitted successfully!");
                    setStartDate(new Date());
                    setEndDate(new Date());
                    setSelectedOption("Illness");
                    setSelectedFile(null);
                    setSelectedName("");
                    setComment("");
                    setIsButtonEnabled(true);
                } else {
                    alert("Form submission failed.");
                }
            } catch (error) {
                alert("An error occurred while submitting the form.");
            }
        }
    };



    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFileToUpload(file)
        setSelectedName(file.name);
        setIsButtonEnabled(true);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setSelectedFile(reader.result);
        };
    };

    return (
        <div className="special_reason">
            <h2>Manage Special Reason for Absence</h2>
            <form action="POST" onSubmit={handleSubmit}>
                <div className="date_chooser">
                    <label data-testid="start-date-label">
                        From :
                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                    </label>
                    <label data-testid="end-date-label">
                        To :
                        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
                    </label>
                    <label data-testid="select-label">
                        <select value={selectedOption} onChange={handleOptionChange} style={{ background: '#6DCF4B' }}>
                            <option value="Illness" style={{ background: '#6DCF4B' }}>
                                Illness
                            </option>
                            <option value="Travel" style={{ background: '#6DCF4B' }}>
                                Travel
                            </option>
                            <option value="Other" style={{ background: '#6DCF4B' }}>
                                Other
                            </option>
                        </select>
                    </label>
                </div>
                <div className="file-upload">
                    <i>
                        <AiOutlineCloudUpload />
                    </i>
                    <h3>{selectedName || 'Click box to upload'}</h3>
                    <p>Maximum file size 10mb</p>
                    <input type="file" onChange={handleFileChange} data-testid="file-input" />
                </div>
                <div className="comment">
                    <label htmlFor="comment">Comment:</label> <br />
                    <textarea id="comment" value={comment} onChange={(e) => setComment(e.target.value)} />
                </div>
                <button
                    type="submit"
                    disabled={!isButtonEnabled}
                    onClick={handleSubmit}
                    className="submit_btn btn"
                >
                    Submit
                </button>
            </form>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                style={{
                    content: {
                        width: '18%',
                        height: '15%',
                        margin: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    },
                }}
            >
                <div style={{ textAlign: 'center' }}>
                    <p style={{ marginBottom: '20px', color: 'red' }}>{modalText}</p>
                    <button onClick={() => setIsModalOpen(false)} style={{ marginTop: '10px' }}>
                        OK
                    </button>
                </div>
            </Modal>
        </div>
    );
}