import { useState } from 'react';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Alert, {AlertColor} from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

import useFormControls from './form-controllers';

type Submission = {
  sent: boolean,
  type: AlertColor,
  message: string
}

export default function AddCard(props: any) {

    const {newCardAdded} = props

    const initSubmission: Submission = {
      sent: false,
      type: "success",
      message: ``
    };
    const [submission, setSubmission] = useState(initSubmission);
 
    const {
      handleInputValue,
      handleAddNewCard,
      formIsValid,
      errors
    } = useFormControls();

    async function handleFormSubmit(e: any) {
      e.preventDefault();

      let added;
      
      if (formIsValid()) {
        try {
          added = await handleAddNewCard();
          setSubmission({
            sent: true,
            type: "success",
            message: added.message
          })
          
        } catch (err) {
            setSubmission({
              sent: true,
              type: "error",
              message: (err as Error).message
            })
           return;
        }

        newCardAdded(true);

        return;
      }
    }

    const inputFields = [
      {
        name: "name",
        label: "Name",
        type: "text",
        id: "cc-name"
      },
      {
        name: "number",
        label: "Number",
        type: "number",
        id: "cc-number"
      },
      {
        name: "limit",
        label: "Limit",
        type: "number",
        id: "cc-limit"
      }
    ];

    return (
        <Container maxWidth="xl" className='AddCard section'>
        <Box sx={{ width: '100%' }}>
            <Typography variant="h5" component="h5">
              Add New Credit Card
            </Typography>
            {submission.sent &&
              <Stack sx={{ width: 400, margin: "15px 0" }} spacing={2}>
                <Alert severity={submission.type}>{submission.message}</Alert>
              </Stack>
            }
            <Box
              className='form-wrap'
              sx={{ height: '100%', width: '100%', maxWidth: 400 }}
            >
              <form id="add-card-form" onSubmit={handleFormSubmit}>
                {inputFields.map((input, index) => {
                  return (
                    <div className='field-wrap' key={index}>
                        <TextField
                          onBlur={handleInputValue}
                          onChange={handleInputValue}
                          name={input.name}
                          label={input.label}
                          type={input.type}
                          autoComplete="none"
                          fullWidth
                          {...(errors[input.name] && { error: true, helperText: errors[input.name] })}
                        />
                    </div>
                  );
                })}
                <div className='field-wrap'>
                  <Button type="submit" variant="contained" onClick={handleFormSubmit} disabled={!formIsValid()}>Add Card</Button>
                </div>
              </form>
            </Box>
          </Box>
      </Container>
    )
  }