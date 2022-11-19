import WardsList from '@/components/ward/wards/wardsList';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('wardsList', () => {
  it('renders a list of wards in the hospital', () => {
    const wards = [
      {
        _id: '63399f126812100f54957454',
        name: 'Ward 2',
        description: 'children ward',
        personInCharge: {
          _id: '633adc7cc3fa58ef887b8b0d',
          name: 'Sasitha Kumarasinghe',
          username: 'sasitha',
          type: 'CONSULTANT',
        },
        shifts: [
          {
            name: 'morning',
            start: '2014-08-18T00:00:00',
            end: '2018-01-01T06:00:00',
            _id: '63399f126812100f54957455',
          },
          {
            name: 'evening',
            start: '2014-08-18T00:00:00',
            end: '2018-01-01T06:00:00',
            _id: '63399f126812100f54957456',
          },
        ],
        minNumberOfDoctors: 1,
        maxNumberOfLeaves: 0,
        minNumberOfDoctorsPerShift: 1,
        allowAdjacentShifts: true,
      },
      {
        _id: '63399f126812100f54957464',
        name: 'Ward 22',
        description: 'Eye ward',
        personInCharge: {
          _id: '633adc7cc3fa58ef887v8b0d',
          name: 'Sasith Kumara',
          username: 'sasi',
          type: 'CONSULTANT',
        },
        shifts: [
          {
            name: 'Day',
            start: '2014-08-18T00:00:00',
            end: '2018-01-01T06:00:00',
            _id: '63399f126812100g54957455',
          },
          {
            name: 'Night',
            start: '2014-08-18T00:00:00',
            end: '2018-01-01T06:00:00',
            _id: '63399f126812100f64957456',
          },
        ],
        minNumberOfDoctors: 2,
        maxNumberOfLeaves: 1,
        minNumberOfDoctorsPerShift: 3,
        allowAdjacentShifts: false,
      },
    ];

    const mockHandleViewCallback = jest.fn((ward, index) => {});

    const component = render(
      <WardsList wards={wards} handleView={mockHandleViewCallback} />
    );
    const doctorsButtonList = screen.getAllByRole('button', {
      name: 'doctors',
    });

    expect(doctorsButtonList).toHaveLength(2);
    // let viewButton;
    wards.map((ward, index) => {
      const [viewButton] = screen.getAllByRole('button', {
        name: 'W2 ' + ward.name + ' ' + ward.description,
      });
      expect(viewButton).toBeInTheDocument();
      viewButton.click();
      expect(mockHandleViewCallback).toHaveBeenCalledWith(ward, index);
    });
  });
});
