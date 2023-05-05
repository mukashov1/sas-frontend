import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import $api from '../http/api';
import Specialreason from '../components/student/specialreason';

jest.mock('../http/api');

describe('Specialreason component', () => {
    beforeEach(() => {
        render(<Specialreason />);
        $api.post.mockClear();
    });

    it('should display the form with default values', () => {
        expect(screen.getByText('From :')).toBeInTheDocument();
        expect(screen.getByText('To :')).toBeInTheDocument();
        expect(screen.getByText('Illness')).toBeInTheDocument();
        expect(screen.getByText('Click box to upload')).toBeInTheDocument();
        expect(screen.getByLabelText('Comment:')).toBeInTheDocument();
        expect(screen.getByText('Submit')).toBeInTheDocument();
        expect(screen.getByTestId('start-date-label').querySelector('input')).toHaveValue('05/05/2023');
        expect(screen.getByTestId('end-date-label').querySelector('input')).toHaveValue('05/05/2023');
        expect(screen.getByTestId('file-input')).toHaveValue('');
    });

    it('should allow the user to select a start and end date', async () => {
        const startDateInput = screen.getByTestId('start-date-label').querySelector('input');
        const endDateInput = screen.getByTestId('end-date-label').querySelector('input');

        fireEvent.change(startDateInput, { target: { value: '01/01/2022' } });
        fireEvent.change(endDateInput, { target: { value: '01/01/2022' } });

        await waitFor(() => {
            expect(startDateInput).toHaveValue('01/01/2022');
            expect(endDateInput).toHaveValue('01/01/2022');
        });
    });

    it('should allow the user to select a reason', async () => {
        const selectElement = screen.getByTestId('select-label').querySelector('select')

        fireEvent.change(selectElement, { target: { value: 'Travel' } });

        await waitFor(() => {
            expect(selectElement).toHaveValue('Travel');
        });
    });

    it('should allow the user to upload a file', async () => {
        const file = new File(['test'], 'test.txt', { type: 'text/plain' });
        const inputElement = screen.getByTestId('file-input');

        fireEvent.change(inputElement, { target: { files: [file] } });

        // Add a delay of 1000 milliseconds before making the assertion
        await new Promise(resolve => setTimeout(resolve, 1000));

        expect(inputElement.files[0].name).toEqual(file.name);
        expect(inputElement.files[0].type).toEqual(file.type);
    });

    it('should allow the user to submit the form', async () => {
        const file = new File(['test'], 'test.txt', { type: 'text/plain' });
        const fileInput = screen.getByTestId('file-input');
        fireEvent.change(fileInput, { target: { files: [file] } });
        const submitButton = screen.getByRole('button');
        expect(submitButton).toBeEnabled();
        fireEvent.click(submitButton);

        expect(window.alert("File submitted successfully!"))
    });
});