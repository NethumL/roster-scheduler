import ShiftList from '@/components/ward/wards/shiftList';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('shiftList', () => {
  it('renders a list of shifts in a ward', () => {
    const newShifts = [
      {
        _id: '636bc486064487eab69a68c9',
        name: 'Morningt',
        start: '05:00',
        end: '13:00',
        __v: 0,
      },
      {
        _id: '636bc486064487eab69a68ca',
        name: 'Evening',
        start: '13:00',
        end: '21:00',
        __v: 0,
      },
      {
        _id: '636de954f2148caa108c3b93',
        name: 'Night',
        start: '21:00',
        end: '05:00',
        __v: 0,
      },
    ];
    const dutyCycles = 3;
    const mockSetNewCallBack = jest.fn((leaves) => {});

    const component = render(
      <ShiftList
        newNumDutyCycles={dutyCycles}
        setNew={mockSetNewCallBack}
        isEdit={true}
        newShifts={newShifts}
      />
    );
    const textBoxList = screen.getAllByRole('textbox');
    expect(textBoxList).toHaveLength(9);
  });
});
