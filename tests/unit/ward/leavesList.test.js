import LeavesList from '@/components/ward/user-preferences/leavesList';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('leavesList', () => {
  it('renders a list of leave dates of a doctor', () => {
    const dates = [
      new Date('Wed Dec 14 2022 00:00:00 GMT+0530 (India Standard Time)'),
      new Date('Thu Dec 08 2022 00:00:00 GMT+0530 (India Standard Time)'),
      new Date('Thu Dec 15 2022 00:00:00 GMT+0530 (India Standard Time)'),
      new Date('Fri Dec 16 2022 00:00:00 GMT+0530 (India Standard Time)'),
    ];
    const Dates = [
      new Date('2022-12-13T18:30:00.000Z'),
      new Date('2022-12-07T18:30:00.000Z'),
      new Date('2022-12-14T18:30:00.000Z'),
      new Date('2022-12-15T18:30:00.000Z'),
    ];
    const mockSetNewCallBack = jest.fn((leaves) => {});
    const mockSetIsSavedLeavesCallback = jest.fn((status) => {});

    const component = render(
      <LeavesList
        dates={dates}
        setNew={mockSetNewCallBack}
        setIsSavedLeaves={mockSetIsSavedLeavesCallback}
      />
    );
    let arr = [];
    const buttonList = screen.getAllByRole('button');
    expect(buttonList).toHaveLength(4);
    buttonList.map((buttn, index) => {
      buttn.click();
      expect(mockSetNewCallBack).toHaveBeenCalledWith(
        Dates.slice(0, index).concat(Dates.slice(index + 1))
      );
    });
  });
});
