import ResetPasswordModal from '@/components/admin/newUsers/resetPasswordModal';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, act } from '@testing-library/react';

describe('ResetPasswordModal', () => {
  it('renders a reset password modal and saves with matching passwords', () => {
    const user = {
      _id: '6365138c94b13942ee08248e',
      name: 'John Doe',
      username: 'johnd',
      type: 'DOCTOR',
    };

    const mockHandleSaveCallback = jest.fn((_id, password) => _id);
    const handleCloseCallback = jest.fn();

    render(
      <ResetPasswordModal
        open={true}
        user={user}
        handleClose={handleCloseCallback}
        handleSave={mockHandleSaveCallback}
      />
    );

    const nameInput = screen.getByRole('textbox', { name: 'Name' });
    const typeSelect = screen.getByRole('textbox', { name: 'Type' });
    const passwordInput = screen.getByLabelText('New Password');
    const confirmPasswordInput = screen.getByLabelText('Confirm Password');
    const saveButton = screen.getByRole('button', { name: 'Save' });

    expect(nameInput).toBeInTheDocument();
    expect(typeSelect).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();

    expect(nameInput).toHaveValue(user.name);
    expect(typeSelect).toHaveValue('Doctor');
    expect(passwordInput).toHaveValue('');
    expect(confirmPasswordInput).toHaveValue('');

    act(() => {
      fireEvent.change(passwordInput, { target: { value: '123456789' } });
      fireEvent.change(confirmPasswordInput, {
        target: { value: '123456789' },
      });
    });

    expect(passwordInput).toHaveValue('123456789');
    expect(confirmPasswordInput).toHaveValue('123456789');

    act(() => {
      saveButton.click();
    });
    expect(mockHandleSaveCallback).toHaveBeenCalledWith(user._id, '123456789');
  });
});
