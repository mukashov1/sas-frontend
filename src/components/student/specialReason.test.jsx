import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Specialreason from './specialreason';

describe('Specialreason', () => {
    test('renders the component', () => {
        render(<Specialreason />);
        const headerElement = screen.getByText(/Manage Special Reason for Absence/i);
        expect(headerElement).toBeInTheDocument();
    });

    test('updates the date range', () => {
        render(<Specialreason />);
        const fromDatePicker = screen.getByLabelText(/From :/i);
        const toDatePicker = screen.getByLabelText(/To :/i);

        fireEvent.change(fromDatePicker, { target: { value: '2023-05-01' } });
        fireEvent.change(toDatePicker, { target: { value: '2023-05-05' } });

        expect(fromDatePicker.value).toBe('2023-05-01');
        expect(toDatePicker.value).toBe('2023-05-05');
    });

    test('updates the reason type', () => {
        render(<Specialreason />);
        const selectElement = screen.getByLabelText(/Illness/i);

        userEvent.selectOptions(selectElement, 'Travel');
        expect(selectElement.value).toBe('Travel');
    });

    test('uploads a file', () => {
        render(<Specialreason />);
        const file = new File(['test'], 'test.txt', { type: 'text/plain' });
    
        const fileInput = screen.getByRole('textbox', { name: /Click box to upload/i });
        userEvent.upload(fileInput, file);
    
        expect(fileInput.files[0]).toStrictEqual(file);
        expect(screen.getByText(/test.txt/i)).toBeInTheDocument();
    }); 

    test('updates the comment textarea', () => {
        render(<Specialreason />);
        const textareaElement = screen.getByLabelText('Comment:');
    
        fireEvent.change(textareaElement, { target: { value: 'This is a test comment.' } });
        expect(textareaElement.value).toBe('This is a test comment.');
    });
});
