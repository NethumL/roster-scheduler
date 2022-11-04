import NewUserCard from '@/components/admin/newUsers/newUserCard';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('NewUserCard', () => {
  it('renders a new user card for a doctor', () => {
    const user = {
      _id: '6365138c94b13942ee08248e',
      name: 'John Doe',
      username: 'johnd',
      type: 'Doctor',
    };

    const mockActionCallback = jest.fn((_id, accept) => _id);

    render(<NewUserCard user={user} action={mockActionCallback} />);
    expect(screen.getByText(`Name: ${user.name}`)).toBeInTheDocument();
    expect(screen.getByText(`Username: ${user.username}`)).toBeInTheDocument();
    expect(screen.getByText(`Type: ${user.type}`)).toBeInTheDocument();

    const acceptButton = screen.getByRole('button', { name: 'Accept' });
    const declineButton = screen.getByRole('button', { name: 'Decline' });

    expect(acceptButton).toBeInTheDocument();
    expect(declineButton).toBeInTheDocument();

    acceptButton.click();
    expect(mockActionCallback).toHaveBeenCalledWith(user._id, true);

    declineButton.click();
    expect(mockActionCallback).toHaveBeenCalledWith(user._id, false);
  });

  it('renders a new user card for a consultant', () => {
    const user = {
      _id: '6365174494b13942ee08248f',
      name: 'Maxine Wheeler',
      username: 'maxine',
      type: 'CONSULTANT',
    };

    const mockActionCallback = jest.fn((_id, accept) => _id);

    render(<NewUserCard user={user} action={mockActionCallback} />);
    expect(screen.getByText(`Name: ${user.name}`)).toBeInTheDocument();
    expect(screen.getByText(`Username: ${user.username}`)).toBeInTheDocument();
    expect(screen.getByText(`Type: ${user.type}`)).toBeInTheDocument();

    const acceptButton = screen.getByRole('button', { name: 'Accept' });
    const declineButton = screen.getByRole('button', { name: 'Decline' });

    expect(acceptButton).toBeInTheDocument();
    expect(declineButton).toBeInTheDocument();

    acceptButton.click();
    expect(mockActionCallback).toHaveBeenCalledWith(user._id, true);

    declineButton.click();
    expect(mockActionCallback).toHaveBeenCalledWith(user._id, false);
  });
});
