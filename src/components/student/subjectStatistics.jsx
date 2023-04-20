import React from 'react'
import { BsFillXCircleFill, BsCheckCircleFill } from 'react-icons/bs'
import PieChart from '../pieChart'

export default function subjectStatistics({subjectData}) {
    console.log("RESING" + subjectData)
    
    return (
        <div className='subjectStat'>
            <h2>Design Pattern</h2>
            <h2>Design Pattern</h2>
            <h2>Design Pattern</h2>
            <h2>Design Pattern</h2>
            {subjectData.map((subject, index) => (
                <div key={index} className='lecture'>
                    <h4>{subject.lecture}</h4>
                    <h4>{subject.lecture}</h4>
                    <h4>{subject.lecture}</h4>
                    <h4>{subject.lecture}</h4>
                    <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Attendance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subjectData[index].attendance.map((attendance) => (
                            <tr key={attendance.date}>
                                <td>{attendance.date}</td>
                                <td>
                                    <i style={{ color: attendance.attendance ? 'green' : 'red' }}>
                                        {attendance.attendance ? <BsCheckCircleFill /> : <BsFillXCircleFill />}
                                    </i>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="pieChart">
                    <PieChart data={subjectData[index].attendanceRatio} />
                </div>
                </div>
            ))}
        </div>
    )
}