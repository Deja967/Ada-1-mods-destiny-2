import { React, useState, useEffect } from 'react';
import './form.css';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { TextField } from '@mui/material';

function Form() {
  const helperText =
    "if you don't want to use your real name \n please use and alias";
  helperText.replace(/\n/g, '<br />');
  const [name, setName] = useState('');
  const [number, setNumber] = useState([]);
  const [userNumber, setUserNumber] = useState('');
  const [value, setValue] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const [deletionSuccess, setDeletionSuccess] = useState('');

  const addUser = async () => {
    const url = 'http://localhost:8080/add-user';
    const body = {
      friendly_name: name,
      phone_number: number,
    };
    const response = await axios.post(url, body, {}).catch((error) => {
      console.log(error);
    });
    response.data.code ? setCode(response.data.code) : setError(true);
  };

  const deleteUser = async () => {
    const plus_number = '+' + userNumber;
    const url = 'http://localhost:8080/get-users';
    const response = await axios.get(url).catch((error) => {
      console.log(error);
    });
    for (let num in response.data.data) {
      if (plus_number === response.data.data[num].phone_number) {
        const userSID = response.data.data[num].sid;
        const secondResponse = await axios
          .delete('http://localhost:8080/delete-user', {
            data: {
              sid: userSID,
            },
          })
          .catch((error) => {
            console.log(error);
          });
        secondResponse.data.message
          ? setDeletionSuccess(secondResponse.data.message)
          : setError(true);
      }
    }
  };

  return (
    <div className='formContainer'>
      <div>
        <h1 style={{ color: 'black' }}>Ada-1 Text Sign-up form</h1>

        <FormControl>
          <Stack>
            <Stack spacing={2}>
              <FormHelperText style={{ color: 'black' }}>
                {helperText}.
              </FormHelperText>
              <TextField
                onChange={(e) => {
                  setName(e.target.value);
                }}
                variant='outlined'
                label='Name'
                required='true'
                placeholder=''
                inputProps={{
                  style: { color: 'black' },
                }}
              />
              <PhoneInput
                style={{ width: '330px', marginLeft: '50px' }}
                inputProps={{
                  required: true,
                }}
                id='contactInput'
                name='contact'
                country={'us'}
                value={value}
                onChange={setNumber}
                isValid={(value, country) => {
                  if (value.length === 0) {
                    return false;
                  } else {
                    return true;
                  }
                }}
              />
              {code ? (
                <>
                  <span>{code}</span>
                  <span>
                    Please enter this 6 digit code <br></br>when you get a call
                    from Twilio's service
                  </span>
                </>
              ) : (
                ''
              )}
            </Stack>
          </Stack>
          <button className='button-87' onClick={addUser}>
            Submit
          </button>
        </FormControl>
      </div>
      <div>
        <h1 style={{ color: 'black' }}>
          To remove your number, <br></br>fill out the form at the bottom
        </h1>
        <FormControl>
          <Stack>
            <Stack spacing={2}>
              <FormHelperText style={{ color: 'black' }}>
                {helperText}.
              </FormHelperText>
              <TextField
                onChange={(e) => {
                  setName(e.target.value);
                }}
                variant='outlined'
                label='Name'
                required='true'
                placeholder=''
                inputProps={{
                  style: { color: 'black' },
                }}
              />
              <PhoneInput
                style={{ width: '330px', marginLeft: '50px' }}
                inputProps={{
                  required: true,
                }}
                id='contactInput'
                name='contact'
                country={'us'}
                value={value}
                onChange={setUserNumber}
                isValid={(value, country) => {
                  if (value.length === 0) {
                    return false;
                  } else {
                    return true;
                  }
                }}
              />
            </Stack>
            {deletionSuccess ? (
              <>
                <span>{deletionSuccess}</span>
              </>
            ) : (
              ''
            )}
          </Stack>
          <button className='button-87' onClick={deleteUser}>
            Submit
          </button>
        </FormControl>
      </div>
    </div>
  );
}

export default Form;
