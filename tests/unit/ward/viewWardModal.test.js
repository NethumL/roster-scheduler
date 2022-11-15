import ViewWardModal from '@/components/ward/wards/viewWardModal';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

describe('ViewWardModal', () => {
  it('renders a view ward modal', () => {
    const ward = {
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
    };
    const consultants = [
      {
        _id: '633adc7cc3fa58ef887b8b0d',
        name: 'Sasitha Kumarasinghe',
        username: 'sasitha',
        type: 'CONSULTANT',
      },
    ];
    const mockHandleSaveCallback = jest.fn(
      (
        _id,
        newName,
        newDescription,
        newPersonInCharge,
        newNumDutyCycles,
        newShifts,
        newMinNumDoctors,
        newMaxNumLeaves,
        newMinNumDoctorsPerShift,
        newStatusAdjacentShifts
      ) => _id
    );
    const handleCloseCallback = jest.fn();

    render(
      <ViewWardModal
        open={true}
        ward={ward}
        handleClose={handleCloseCallback}
        handleSave={mockHandleSaveCallback}
        consultants={consultants}
      />
    );

    const nameInput = screen.getByRole('textbox', { name: 'Name' });
    // const descriptionInput = screen.getByRole('textbox', {
    //   name: 'Description',
    // });
    // const PICInput = screen.getByRole('textbox', { name: 'Person in charge' });
    // const dutyCyclesInput = screen.getByRole('textbox', {
    //   name: 'Number of duty cycles per day',
    // });
    // const minNumDoctorsInput = screen.getByRole('textbox', {
    //   name: 'Minimum Number of Doctors',
    // });
    // const typeSelect = screen.getByDisplayValue('DOCTOR');
    // const saveButton = screen.getByRole('button', { name: 'Save' });

    expect(nameInput).toBeInTheDocument();
    // expect(descriptionInput).toBeInTheDocument();
    // expect(PICInput).toBeInTheDocument();
    // expect(dutyCyclesInput).toBeInTheDocument();
    // expect(minNumberDoctorsInput).toBeInTheDocument();

    // expect(typeSelect).toBeInTheDocument();
    // expect(usernameInput).toBeInTheDocument();
    // expect(saveButton).toBeInTheDocument();

    // expect(nameInput).toHaveValue(user.name);
    // expect(typeSelect).toHaveValue(user.type);
    // expect(usernameInput).toHaveValue(user.username);

    // fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });
    // fireEvent.change(typeSelect, { target: { value: 'CONSULTANT' } });

    // expect(nameInput).toHaveValue('Jane Doe');
    // expect(typeSelect).toHaveValue('CONSULTANT');

    // saveButton.click();
    // expect(mockHandleSaveCallback).toHaveBeenCalledWith(
    //   user._id,
    //   'Jane Doe',
    //   'CONSULTANT'
    // );
  });
});
