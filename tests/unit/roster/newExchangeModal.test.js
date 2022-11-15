import NewExchangeModal from '@/components/roster/newExchangeModal';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

const user = {
  _id: 'john',
  username: 'john',
  name: 'John Doe',
};

const doctors = [{ _id: 'jane', username: 'jane', name: 'Jane Doe' }];

const shifts = {
  john: {
    'Tue Nov 01 2022': { _id: 'morning', name: 'Morning' },
  },
  jane: {
    'Wed Nov 02 2022': { _id: 'afternoon', name: 'Afternoon' },
  },
};

const getShift = jest.fn((doctor, date) =>
  date.toDateString() in shifts[doctor]
    ? shifts[doctor][date.toDateString()]
    : { _id: null, name: null }
);

describe('NewExchangeModal', () => {
  it('renders a heading', () => {
    render(
      <NewExchangeModal
        user={user}
        doctors={doctors}
        open={true}
        handleClose={() => {}}
        save={() => {}}
        getShift={getShift}
      />
    );

    const heading = screen.getByRole('heading', {
      name: /New exchange request/i,
    });

    expect(heading).toBeInTheDocument();
  });

  it('closes the modal', () => {
    const handleClose = jest.fn();

    render(
      <NewExchangeModal
        user={user}
        doctors={doctors}
        open={true}
        handleClose={handleClose}
        save={() => {}}
        getShift={getShift}
      />
    );
    const cancelButton = screen.getByRole('button', { name: /Cancel/ });
    cancelButton.click();

    expect(handleClose).toHaveBeenCalled();
  });

  it('fetches the shift', async () => {
    render(
      <NewExchangeModal
        user={user}
        doctors={doctors}
        open={true}
        handleClose={() => {}}
        save={() => {}}
        getShift={getShift}
      />
    );

    const yourShiftDateInput = screen.getByLabelText('Your shift date');
    expect(yourShiftDateInput).toBeInTheDocument();
    const otherDoctorInput = screen.getByLabelText('Doctor').nextElementSibling;
    expect(otherDoctorInput).toBeInTheDocument();
    const theirShiftDateInput = screen.getByLabelText('Their shift date');
    expect(theirShiftDateInput).toBeInTheDocument();

    fireEvent.change(yourShiftDateInput, { target: { value: '11/01/2022' } });
    fireEvent.change(theirShiftDateInput, { target: { value: '11/02/2022' } });
    fireEvent.change(otherDoctorInput, { target: { value: 'jane' } });

    expect(getShift).toHaveBeenCalledWith('john', new Date(2022, 10, 1));
    expect(getShift).toHaveBeenCalledWith('jane', new Date(2022, 10, 2));

    const yourShiftLabel = await screen.findByText(/^morning$/i);
    expect(yourShiftLabel.id).toBe('your-shift');

    const theirShiftLabel = await screen.findByText(/^afternoon$/i);
    expect(theirShiftLabel.id).toBe('their-shift');
  });
});
