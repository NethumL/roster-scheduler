import ResetPasswordModal from '@/components/admin/newUsers/resetPasswordModal';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, act } from '@testing-library/react';

describe('ResetPasswordModal', () => {
  const user = {
    _id: '6365138c94b13942ee08248e',
    name: 'John Doe',
    username: 'johnd',
    type: 'DOCTOR',
  };

  const mockHandleSaveCallback = jest.fn((_id, password) => _id);
  const handleCloseCallback = jest.fn();

  it('renders a reset password modal and saves with a password without lower case letters', () => {
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
      fireEvent.change(passwordInput, { target: { value: 'A&123456789' } });
      fireEvent.change(confirmPasswordInput, {
        target: { value: 'A&123456789' },
      });
    });

    expect(passwordInput).toHaveValue('A&123456789');
    expect(confirmPasswordInput).toHaveValue('A&123456789');

    act(() => {
      saveButton.click();
    });
    expect(mockHandleSaveCallback).not.toHaveBeenCalled();

    const passwordError = screen.getByText(
      '"Password" should contain at least 1 lowercase character'
    );
    expect(passwordError).toBeInTheDocument();
  });

  it('renders a reset password modal and saves with a password without upper case letters', () => {
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
      fireEvent.change(passwordInput, { target: { value: 'a&123456789' } });
      fireEvent.change(confirmPasswordInput, {
        target: { value: 'a&123456789' },
      });
    });

    expect(passwordInput).toHaveValue('a&123456789');
    expect(confirmPasswordInput).toHaveValue('a&123456789');

    act(() => {
      saveButton.click();
    });
    expect(mockHandleSaveCallback).not.toHaveBeenCalled();

    const passwordError = screen.getByText(
      '"Password" should contain at least 1 uppercase character'
    );
    expect(passwordError).toBeInTheDocument();
  });

  it('renders a reset password modal and saves with a password without lower case letters', () => {
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
      fireEvent.change(passwordInput, { target: { value: 'Aa123456789' } });
      fireEvent.change(confirmPasswordInput, {
        target: { value: 'Aa123456789' },
      });
    });

    expect(passwordInput).toHaveValue('Aa123456789');
    expect(confirmPasswordInput).toHaveValue('Aa123456789');

    act(() => {
      saveButton.click();
    });
    expect(mockHandleSaveCallback).not.toHaveBeenCalled();

    const passwordError = screen.getByText(
      '"Password" should contain at least 1 special character'
    );
    expect(passwordError).toBeInTheDocument();
  });

  it('renders a reset password modal and saves with a password without numbers', () => {
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
      fireEvent.change(passwordInput, { target: { value: 'A&abcdefg' } });
      fireEvent.change(confirmPasswordInput, {
        target: { value: 'A&abcdefg' },
      });
    });

    expect(passwordInput).toHaveValue('A&abcdefg');
    expect(confirmPasswordInput).toHaveValue('A&abcdefg');

    act(() => {
      saveButton.click();
    });
    expect(mockHandleSaveCallback).not.toHaveBeenCalled();

    const passwordError = screen.getByText(
      '"Password" should contain at least 1 numeric character'
    );
    expect(passwordError).toBeInTheDocument();
  });

  it('renders a reset password modal and saves with a password of length less than 8', () => {
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
      fireEvent.change(passwordInput, { target: { value: 'A&abc1' } });
      fireEvent.change(confirmPasswordInput, {
        target: { value: 'A&abc1' },
      });
    });

    expect(passwordInput).toHaveValue('A&abc1');
    expect(confirmPasswordInput).toHaveValue('A&abc1');

    act(() => {
      saveButton.click();
    });
    expect(mockHandleSaveCallback).not.toHaveBeenCalled();

    const passwordError = screen.getByText(
      '"Password" length must be at least 8 characters long'
    );
    expect(passwordError).toBeInTheDocument();
  });

  it('renders a reset password modal and saves with not matching passwords', () => {
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
      fireEvent.change(passwordInput, { target: { value: 'A&abcdefg1' } });
      fireEvent.change(confirmPasswordInput, {
        target: { value: 'A&abcdefg3' },
      });
    });

    expect(passwordInput).toHaveValue('A&abcdefg1');
    expect(confirmPasswordInput).toHaveValue('A&abcdefg3');

    act(() => {
      saveButton.click();
    });
    expect(mockHandleSaveCallback).not.toHaveBeenCalled();

    const passwordError = screen.getByText('Passwords do not match');
    expect(passwordError).toBeInTheDocument();
  });

  it('renders a reset password modal and saves with a proper password', () => {
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
      fireEvent.change(passwordInput, { target: { value: 'A&abcdefg4' } });
      fireEvent.change(confirmPasswordInput, {
        target: { value: 'A&abcdefg4' },
      });
    });

    expect(passwordInput).toHaveValue('A&abcdefg4');
    expect(confirmPasswordInput).toHaveValue('A&abcdefg4');

    act(() => {
      saveButton.click();
    });
    expect(mockHandleSaveCallback).toHaveBeenCalledWith(user._id, 'A&abcdefg4');
  });
});
