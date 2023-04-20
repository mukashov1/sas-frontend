import React from 'react';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const classTimes = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];
const schedule = [
    [undefined, undefined, 'Science', undefined, 'Math', undefined, undefined, 'English'],
    ['History', undefined, undefined, undefined, 'Math', 'Science', 'History', 'English'],
    ['Science', undefined, 'History', undefined, 'Math', 'Science', undefined, undefined],
    ['Math', undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, 'Math', undefined, 'Science', undefined, 'English', 'History', 'English'],
    [undefined, 'History', undefined, 'Math', 'Science', undefined, undefined, undefined, undefined]
];

export default function WeeklySchedule() {

    return (
        <table>
            <thead>
                <tr>
                    <th></th>
                    {daysOfWeek.map(day => <th key={day}>{day}</th>)}
                </tr>
            </thead>
            <tbody>
                {classTimes.map(time => (
                    <tr key={time}>
                        <td>{time}</td>
                        {daysOfWeek.map((day, index) => (
                            <td key={`${day}-${time}`}>
                                {schedule[index][classTimes.indexOf(time)] || '-'}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

