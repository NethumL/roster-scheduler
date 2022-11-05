import NewExchangeModal from '@/components/roster/newExchangeModal';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('NewExchangeModal', () => {
  it('renders a heading', () => {
    render(
      <NewExchangeModal open={true} handleClose={() => {}} save={() => {}} />
    );

    const heading = screen.getByRole('heading', {
      name: /New exchange request/i,
    });

    expect(heading).toBeInTheDocument();
  });

  it('closes the modal', () => {
    const handleClose = jest.fn();

    render(
      <NewExchangeModal open={true} handleClose={handleClose} save={() => {}} />
    );

    const cancelButton = screen.getByRole('button', { name: /Cancel/ });
    cancelButton.click();

    expect(handleClose).toHaveBeenCalled();
  });
});
