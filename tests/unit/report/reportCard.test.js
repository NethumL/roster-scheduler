import RequestCard from '@/components/requests/requestCard';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('NewUserCard', () => {
  it('renders a resolved request card for a doctor', () => {
    const request = {
      _id: '6365183094b13942ee082491',
      subject: 'Change of shift',
      description: 'I would like to change my shift',
      resolved: true,
    };

    const mockResolveCallback = jest.fn((_id) => _id);

    render(
      <RequestCard
        request={request}
        isDoctor={true}
        resolve={mockResolveCallback}
      />
    );

    expect(screen.getByText(request.subject)).toBeInTheDocument();
    expect(screen.getByText(request.description)).toBeInTheDocument();
    expect(screen.getByText('Status: Resolved')).toBeInTheDocument();
  });

  it('renders a pending request card for a doctor', () => {
    const request = {
      _id: '636519c094b13942ee082493',
      subject: 'Change of leave',
      description: 'I would like to change my leave',
      resolved: false,
    };

    const mockResolveCallback = jest.fn((_id) => _id);

    render(
      <RequestCard
        request={request}
        isDoctor={true}
        resolve={mockResolveCallback}
      />
    );

    expect(screen.getByText(request.subject)).toBeInTheDocument();
    expect(screen.getByText(request.description)).toBeInTheDocument();
    expect(screen.getByText('Status: Pending')).toBeInTheDocument();
  });

  it('renders a resolved request card for a consultant', () => {
    const request = {
      _id: '63651a8594b13942ee082494',
      subject: 'Exchange of shift',
      description: 'I would like to exchange my shift',
      resolved: true,
      user: {
        _id: '6365138c94b13942ee08248e',
        name: 'John Doe',
      },
    };

    const mockResolveCallback = jest.fn((_id) => _id);

    render(
      <RequestCard
        request={request}
        isDoctor={false}
        resolve={mockResolveCallback}
      />
    );

    expect(screen.getByText(request.subject)).toBeInTheDocument();
    expect(screen.getByText(request.description)).toBeInTheDocument();
    expect(screen.getByText(request.user.name)).toBeInTheDocument();
  });

  it('renders a pending request card for a consultant', () => {
    const request = {
      _id: '63651b3d94b13942ee082495',
      subject: 'Exchange of leave',
      description: 'I would like to exchange my leave',
      resolved: false,
      user: {
        _id: '6365138c94b13942ee08248f',
        name: 'John Wheeler',
      },
    };

    const mockResolveCallback = jest.fn((_id) => _id);

    render(
      <RequestCard
        request={request}
        isDoctor={false}
        resolve={mockResolveCallback}
      />
    );

    expect(screen.getByText(request.subject)).toBeInTheDocument();
    expect(screen.getByText(request.description)).toBeInTheDocument();
    expect(screen.getByText(request.user.name)).toBeInTheDocument();

    const markAsResolvedButton = screen.getByRole('button', {
      name: 'Mark as Resolved',
    });

    expect(markAsResolvedButton).toBeInTheDocument();
    markAsResolvedButton.click();
    expect(mockResolveCallback).toHaveBeenCalledWith(request._id);
  });
});
