import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
// _mock_
import { _userCards } from '../../_mock';
// querys
import { gql, useQuery } from '@apollo/client';
import { options } from 'numeral';

type Props = {
  setAnswerer: React.Dispatch<React.SetStateAction<string>>;
};

export default function UserSelect(props: Props) {
  const { setAnswerer } = props;

  const GET_ALL_KOL = gql`
    query GetAllKol {
      getAllKol {
        address
        user {
          avatar  
          nickName
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_ALL_KOL);

  return (
    <Autocomplete
      id="country-select-demo"
      sx={{ width: 300 }}
      options={data ? data.getAllKol : []}
      autoHighlight
      onInputChange={(event, newInputValue) => {
        const kol = data.getAllKol.find((el: any) => el.user.nickName === newInputValue);
        setAnswerer(kol.address);
      }}
      getOptionLabel={(option: any) => option.user.nickName || "John"}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props} >
          <img
            loading="lazy"
            width="20"
            src={option.user.avatar}
          />
          {option.user.nickName}  
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}
