import * as React from 'react';
import Avatar from '@mui/material/Avatar';

function stringAvatar(name) {
  if (name != undefined) {
    if (name.split(' ').length == 1) {
      return {
        sx: {
          bgcolor: '#8cbff2',
        },
        children: `${name.split(' ')[0][0]}`,
      };
    } else {
      return {
        sx: {
          bgcolor: '#8cbff2',
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
      };
    }
  }
}

export default function LetterAvatars(ward) {
  return <Avatar {...stringAvatar(ward.name)} />;
}
