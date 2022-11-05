// import viewWardModal from '@/components/ward/wards/viewWardModal';
// import '@testing-library/jest-dom';
// import { render, screen, fireEvent } from '@testing-library/react';

// describe('viewWardModal', () => {
//   it('renders a view ward modal', () => {
//     const ward = {
//       _id: '63399f126812100f54957454',
//       name: 'Ward 2',
//       description: 'children ward',
//       shifts: [
//         {
//           name: 'morning',
//           start: '2014-08-18T00:00:00',
//           end: '2018-01-01T06:00:00',
//           _id: '63399f126812100f54957455',
//         },
//         {
//           name: 'evening',
//           start: '2014-08-18T00:00:00',
//           end: '2018-01-01T06:00:00',
//           _id: '63399f126812100f54957456',
//         },
//       ],
//     };
//     const consultants = [
//       {
//         _id: '633adc7cc3fa58ef887b8b0d',
//         name: 'Sasitha Kumarasinghe',
//         username: 'sasitha',
//         type: 'CONSULTANT',
//       },
//     ];
//     const mockHandleSaveCallback = jest.fn((_id,newName,
//         newDescription,
//         newPersonInCharge,
//         newNumDutyCycles,
//         newShifts.slice(0, newNumDutyCycles),
//         newMinNumDoctors,
//         newMaxNumLeaves,
//         newMinNumDoctorsPerShift,
//         newStatusAdjacentShifts) => _id);
//     const handleCloseCallback = jest.fn();

//     render(
//       <viewWardModal
//         open={true}
//         ward={ward}
//         handleClose={handleCloseCallback}
//         handleSave={mockHandleSaveCallback}
//         consultants = {consultants}
//       />
//     );

//     const nameInput = screen.getByRole('textbox', { name: 'Name' });
//     const typeSelect = screen.getByDisplayValue('DOCTOR');
//     const usernameInput = screen.getByRole('textbox', { name: 'Username' });
//     const saveButton = screen.getByRole('button', { name: 'Save' });

//     expect(nameInput).toBeInTheDocument();
//     expect(typeSelect).toBeInTheDocument();
//     expect(usernameInput).toBeInTheDocument();
//     expect(saveButton).toBeInTheDocument();

//     expect(nameInput).toHaveValue(user.name);
//     expect(typeSelect).toHaveValue(user.type);
//     expect(usernameInput).toHaveValue(user.username);

//     fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });
//     fireEvent.change(typeSelect, { target: { value: 'CONSULTANT' } });

//     expect(nameInput).toHaveValue('Jane Doe');
//     expect(typeSelect).toHaveValue('CONSULTANT');

//     saveButton.click();
//     expect(mockHandleSaveCallback).toHaveBeenCalledWith(
//       user._id,
//       'Jane Doe',
//       'CONSULTANT'
//     );
//   });
// });
