import DoctorsList from '@/components/ward/doctors/doctorsList';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('doctorsList', () => {
  it('renders a list of doctors in a ward', () => {
    const doctors = [
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

    const component = render(
      <DoctorsList doctors={doctors} handleDelete={mockDeleteCallback} />
    );
    const buttonList = screen.getAllByRole('button');
    expect(buttonList).toHaveLength(2);
    buttonList.map((buttn, index) => {
      buttn.click();
      expect(mockDeleteCallback).toHaveBeenCalledWith(index);
    });
  });
});
