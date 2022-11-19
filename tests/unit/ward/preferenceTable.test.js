import PreferenceTable from '@/components/ward/user-preferences/preferenceTable';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('preferenceTable', () => {
  it('renders the preference order of a doctor', () => {
    const preferences = [
      {
        end: '13:00',
        name: 'Morningt',
        rank: 3,
        start: '05:00',
        __v: 0,
        _id: '636bc486064487eab69a68c9',
      },
      {
        _id: '636bc486064487eab69a68ca',
        name: 'Evening',
        start: '13:00',
        end: '21:00',
        rank: 2,
        __v: 0,
      },
      {
        _id: '636de954f2148caa108c3b93',
        name: 'Night',
        start: '21:00',
        end: '05:00',
        rank: 1,
        __v: 0,
      },
    ];
    const mockSetNewCallBack = jest.fn((prefs) => {});
    const mockSetSavedPrefs = jest.fn((status) => {});
    const component = render(
      <PreferenceTable
        preferences={preferences}
        setNew={mockSetNewCallBack}
        setSavedPrefs={mockSetSavedPrefs}
      />
    );
    const radioButtons = screen.getAllByRole('radio');
    expect(radioButtons).toHaveLength(9);
    preferences.map((pref, index) => {
      const [cel] = screen.getAllByRole('cell', {
        name: pref.name + ' [' + pref.start + ' - ' + pref.end + ']',
      });
      expect(cel).toBeInTheDocument();
    });
  });
});
