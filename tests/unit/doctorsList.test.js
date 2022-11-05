import doctorsList from '@/components/ward/doctors';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('doctorsList', () => {
  it('renders a list of doctors in a ward', () => {
    [
      {
        _id: '63368eca4f61caa84b8efb02',
        name: 'Samindra',
        username: 'sami',
        type: 'DOCTOR',
      },
      {
        _id: '63368eca4f61caa84b8efb02',
        name: 'Samindra',
        username: 'sami',
        type: 'DOCTOR',
      },
    ];

    const mockDeleteCallback = jest.fn((_id) => _id);

    render(
      <doctorsList
        doctors={doctors}
        isDoctor={true}
        handleDelete={mockDeleteCallback}
      />
    );
  });
});
