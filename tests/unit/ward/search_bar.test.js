import SearchBar from '@/components/ward/common/Search_bar';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('SearchBar', () => {
  it('renders a search bar modal', () => {
    const searchedText = 'Ward 8';

    const mockHandleSearchCallback = jest.fn();
    render(
      <SearchBar
        searchedText={searchedText}
        setSearchedText={mockHandleSearchCallback}
      />
    );

    const searchInput = screen.getByRole('textbox');

    expect(searchInput).toBeInTheDocument();

    expect(searchInput).toHaveValue(searchedText);
  });
});
