import DeleteConfirmModal from '@/components/ward/doctors/deleteConfirmModal';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('DeleteConfirmModal', () => {
  it('renders a delete confirm modal', () => {
    const index = 1;
    const mockHandleDeleteConfirmCallBack = jest.fn((index) => _id);
    const handleCloseCallback = jest.fn();

    render(
      <DeleteConfirmModal
        open={true}
        deleteIndex={index}
        handleClose={handleCloseCallback}
        handleDeleteConfirm={mockHandleDeleteConfirmCallBack}
      />
    );

    const deleteButton = screen.getByRole('button', { name: 'DELETE' });
    const cancelButton = screen.getByRole('button', { name: 'CANCEL' });

    expect(deleteButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });
});
