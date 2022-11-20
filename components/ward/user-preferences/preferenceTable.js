import TableCell from '@mui/material/TableCell';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import Radio from '@mui/material/Radio';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { useState, useEffect } from 'react';

export default function PreferenceTable({
  preferences,
  setNew,
  setSavedPrefs,
}) {
  const [newPreferences, setNewPreferences] = useState(
    preferences.map((obj) => ({ ...obj }))
  );
  const handleChange = (val, i, j) => {
    setSavedPrefs(false);
    var temp = [...newPreferences];
    if (val) {
      temp.map((pref) => {
        if (pref.rank == j + 1) {
          pref.rank = temp[i].rank;
        }
      });
      temp[i].rank = j + 1;
    }
    setNewPreferences(temp.map((obj) => ({ ...obj })));
    setNew(temp.map((obj) => ({ ...obj })));
  };

  useEffect(() => {
    setNewPreferences(preferences.map((obj) => ({ ...obj })));
  }, [preferences]);

  return (
    <TableContainer
      sx={{
        overflowX: 'auto',
        overflowY: 'auto',
      }}
    >
      <Table width="100%">
        <colgroup>
          <col width="2%" />
          <col width="20%" />
        </colgroup>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Shift</TableCell>
            <TableCell align="center" colSpan={preferences.length}>
              Preference
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            {newPreferences.map((preference, index) => (
              <TableCell key={index} align="center">
                {index + 1}
              </TableCell>
            ))}
          </TableRow>
          {newPreferences.map((pref, i) => (
            <TableRow key={i}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>
                {pref.name + ' [' + pref.start + ' - ' + pref.end + ']'}
              </TableCell>
              {newPreferences.map((p, j) => (
                <TableCell key={j} align="center">
                  <Radio
                    checked={j + 1 === newPreferences[i].rank}
                    onChange={(e) => handleChange(e.target.value, i, j)}
                    value={newPreferences[i].rank}
                    name="radio-buttons"
                    inputProps={{ 'aria-label': 'A' }}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
