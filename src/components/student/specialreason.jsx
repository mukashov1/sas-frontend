import React from 'react';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AiOutlineCloudUpload } from 'react-icons/ai';


export default function Specialreason() {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [selectedOption, setSelectedOption] = useState('Illness');
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedName, setSelectedName] = useState('');
    const [comment, setComment] = useState('');
    const [isButtonEnabled, setIsButtonEnabled] = useState(true);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("startDate", startDate.toISOString());
        formData.append("endDate", endDate.toISOString());
        formData.append("selectedOption", selectedOption);
        formData.append("selectedFile", selectedFile);
        formData.append("comment", comment);

        try {
            const response = await fetch("/api/specialreason", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                alert("Form submitted successfully!");
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
            console.error(error);
            alert("An error occurred while submitting the form.");
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setSelectedName(file.name);
        setIsButtonEnabled(false);
        // Additional validation logic
    };

    return (
        <div className="special_reason">
            <h2>Manage Special Reason for Absence</h2>
            <form action="POST" onSubmit={handleSubmit}>
                <div className="date_chooser">
                    <label>
                        From :
                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                    </label>
                    <label>
                        To :
                        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
                    </label>
                    <label>
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
                    <input type="file" onChange={handleFileChange} />
                </div>
                <div className="comment">
                    <label>Comment:</label> <br />
                    <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
                </div>
                <button
                    type="submit"
                    disabled={isButtonEnabled}
                    onClick={handleSubmit}
                    className="submit_btn btn"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
