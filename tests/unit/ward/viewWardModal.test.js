import ViewWardModal from '@/components/ward/wards/viewWardModal';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

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
      {
        _id: '633adc7cc3fa58ef887b8b0c',
        name: 'Sasith Senaka',
        username: 'sasith',
        type: 'CONSULTANT',
      },
      {
        _id: '633adc7cc3fa58ef887b8b0b',
        name: 'Sasithika Hiruni',
        username: 'sasithi',
        type: 'CONSULTANT',
      },
    ];
    const assignedConsultants = [
      {
        _id: '633adc7cc3fa58ef887b8b0d',
        name: 'Sasitha Kumarasinghe',
        username: 'sasitha',
        type: 'CONSULTANT',
      },
      {
        _id: '633adc7cc3fa58ef887b8b0c',
        name: 'Sasith Senaka',
        username: 'sasith',
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
    const mockHandleIsEditCallBack = jest.fn();
    const handleCloseCallback = jest.fn();
    render(
      <ViewWardModal
        open={true}
        ward={ward}
        handleClose={handleCloseCallback}
        handleSave={mockHandleSaveCallback}
        consultants={consultants}
        assignedConsultants={assignedConsultants}
        isEmpty={false}
      />
    );

    const nameInput = screen.getByRole('textbox', { name: 'Name' });
    const descriptionInput = screen.getByRole('textbox', {
      name: 'Description',
    });
    const PICInp = screen.getByRole('button', {
      name: 'Person in charge Sasitha Kumarasinghe - sasitha',
    });
    const dutyCyclesInput = screen.getByRole('spinbutton', {
      name: 'Number of duty cycles per day',
    });
    const minNumDoctorsInput = screen.getByRole('spinbutton', {
      name: 'Minimum Number of Doctors',
    });
    const maxNumLeavesInput = screen.getByRole('spinbutton', {
      name: 'Maximum number of leaves',
    });
    const minNumDoctorsPerShiftInput = screen.getByRole('spinbutton', {
      name: 'Minimum number of doctors per shift',
    });
    const allowedAdjacentShiftsInput = screen.getByRole('checkbox', {
      name: 'Same doctor has not to be given both last shift of the day & first shift of the next day',
    });
    const editButton = screen.getByRole('button', { name: 'edit' });
    const OKButton = screen.getByRole('button', { name: 'OK' });
    expect(nameInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(PICInp).toBeInTheDocument();
    expect(dutyCyclesInput).toBeInTheDocument();
    expect(minNumDoctorsInput).toBeInTheDocument();
    expect(maxNumLeavesInput).toBeInTheDocument();
    expect(minNumDoctorsPerShiftInput).toBeInTheDocument();
    expect(allowedAdjacentShiftsInput).toBeInTheDocument();

    expect(editButton).toBeInTheDocument();
    expect(OKButton).toBeInTheDocument();

    expect(nameInput).toHaveValue(ward.name);
    expect(descriptionInput).toHaveValue(ward.description);
    expect(dutyCyclesInput).toHaveValue(ward.shifts.length);
    expect(maxNumLeavesInput).toHaveValue(ward.maxNumberOfLeaves);
    expect(minNumDoctorsPerShiftInput).toHaveValue(
      ward.minNumberOfDoctorsPerShift
    );
    expect(allowedAdjacentShiftsInput).toBeChecked(ward.allowAdjacentShifts);
  });
});
