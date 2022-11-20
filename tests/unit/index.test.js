import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '../../pages/index';

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home user={null} />);

    const heading = screen.getByRole('heading', {
      name: /welcome to /i,
    });

    expect(heading).toBeInTheDocument();
  });
});
