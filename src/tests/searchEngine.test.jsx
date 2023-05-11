import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AdminStatistics from '../components/admin/adminStatistics';

describe('AdminStatistics', () => {
    it('displays matching users when search button is clicked', async () => {
        const mockData = [
            { studentId: '1', user: { firstName: 'John', lastName: 'Doe' } },
            { studentId: '2', user: { firstName: 'Jane', lastName: 'Doe' } },
        ];

        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce(mockData),
        });

        render(<AdminStatistics />);

        fireEvent.change(screen.getByPlaceholderText('search by name, surname, ID'), {
            target: { value: 'Doe' },
        });

        fireEvent.click(screen.getByText('Search'));

        await waitFor(() => {
            expect(screen.getAllByRole('row')).toHaveLength(mockData.length + 1); // plus 1 for the table header row
            expect(screen.getByText('John Doe')).toBeInTheDocument();
            expect(screen.getByText('Jane Doe')).toBeInTheDocument();
        });
    });
});