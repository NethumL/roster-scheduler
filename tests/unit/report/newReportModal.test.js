import NewRequestModal from '@/components/requests/newRequestModal';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, act } from '@testing-library/react';

describe('NewRequestModal', () => {
  it('renders a reset password modal and saves with matching passwords', () => {
    const mockHandleSaveCallback = jest.fn((subject, description) => subject);
    const handleCloseCallback = jest.fn();

    render(
      <NewRequestModal
        open={true}
        handleClose={handleCloseCallback}
        handleSave={mockHandleSaveCallback}
      />
    );

    const subjectInput = screen.getByRole('textbox', { name: 'Subject' });
    const descriptionInput = screen.getByRole('textbox', {
      name: 'Description',
    });
    const saveButton = screen.getByRole('button', { name: 'Send' });

    expect(subjectInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();

    act(() => {
      fireEvent.change(subjectInput, { target: { value: 'To change leaves' } });
      fireEvent.change(descriptionInput, {
        target: { value: 'I want to change leaves' },
      });
    });

    expect(subjectInput).toHaveValue('To change leaves');
    expect(descriptionInput).toHaveValue('I want to change leaves');

    act(() => {
      saveButton.click();
    });
    expect(mockHandleSaveCallback).toHaveBeenCalledWith(
      'To change leaves',
      'I want to change leaves'
    );
  });
});
