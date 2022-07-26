import EditUserModal from '@/components/admin/newUsers/editUserModal';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

describe('EditUserModal', () => {
  it('renders a edit user modal', () => {
    const user = {
      _id: '6365138c94b13942ee08248e',
      name: 'John Doe',
      username: 'johnd',
      type: 'DOCTOR',
    };

    const mockHandleSaveCallback = jest.fn((_id, newName, newType) => _id);
    const handleCloseCallback = jest.fn();

    render(
      <EditUserModal
        open={true}
        user={user}
        handleSave={mockHandleSaveCallback}
        handleClose={handleCloseCallback}
      />
    );

    const nameInput = screen.getByRole('textbox', { name: 'Name' });
    const typeSelect = screen.getByDisplayValue('DOCTOR');
    const usernameInput = screen.getByRole('textbox', { name: 'Username' });
    const saveButton = screen.getByRole('button', { name: 'Save' });

    expect(nameInput).toBeInTheDocument();
    expect(typeSelect).toBeInTheDocument();
    expect(usernameInput).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();

    expect(nameInput).toHaveValue(user.name);
    expect(typeSelect).toHaveValue(user.type);
    expect(usernameInput).toHaveValue(user.username);

    fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });
    fireEvent.change(typeSelect, { target: { value: 'CONSULTANT' } });

    expect(nameInput).toHaveValue('Jane Doe');
    expect(typeSelect).toHaveValue('CONSULTANT');

    saveButton.click();
    expect(mockHandleSaveCallback).toHaveBeenCalledWith(
      user._id,
      'Jane Doe',
      'CONSULTANT'
    );
  });
});
