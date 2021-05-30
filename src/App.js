import './App.css';
import { Typography, Button, Container, makeStyles, TextField, createMuiTheme, ThemeProvider, Radio, RadioGroup, FormControlLabel, FormLabel, FormControl } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SendIcon from '@material-ui/icons/Send';

import { useState , useEffect} from 'react';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#00000"
    }
  }
})

const useStyles = makeStyles({
  input: {
    width: "100%",
    marginBottom: 10,
    padding: 0,
  }
})

function App() {

  const classes = useStyles()

  const [name, setname] = useState('')
  const [message, setmessage] = useState('')
  const [nameError, setnameError] = useState(false)
  const [messageError, setmessageError] = useState(false)
  const [category, setcategory] = useState('health')
  const [notes, setnotes] = useState('')

  useEffect(() => {
    fetch( 'http://localhost:8000/notes' )
    .then(res => res.json())
    .then(data => setnotes(data))
  }, [])

  const handleSubmit = e => {
    e.preventDefault();

    setnameError(false);
    setmessageError(false);

    if (name === '')
      setnameError(true);
    if (message === '')
      setmessageError(true);

    console.log(name, message)
  }

  return (

    <Container className="App">

      <Typography
        variant='h6'
        component='h2'
        gutterBottom
        color='textSecondary'
      >
        Create a New Note
      </Typography>

      <AccountCircleIcon color='primary' fontSize='large' />
      <AccountCircleIcon color='action' fontSize='large' />
      <AccountCircleIcon color='error' fontSize='large' />
      <AccountCircleIcon color='disabled' fontSize='large' gutterBottom />

      <Typography
        variant='h6'
        color='textPrimary'
        component='h2'
        gutterBottom
      >
        Hello People
      </Typography>


      <form onSubmit={handleSubmit}>

        <ThemeProvider theme={theme}>
          <TextField
            onChange={e => { setname(e.target.value) }}
            className={classes.input}
            label='Name'
            variant='outlined'
            color='primary'
            gutterBottom
            fullWidth
            error={nameError}
            required
          />
          <TextField
            onChange={e => { setmessage(e.target.value) }}
            className={classes.input}
            label='Message'
            variant='outlined'
            color='primary'
            gutterBottom
            fullWidth
            multiline
            rows={2}
            error={messageError}
            required
          />
        </ThemeProvider>

        <FormControl className={classes.input}>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup value={category} onChange={e => setcategory(e.target.value)}>
            <FormControlLabel value='money' control={<Radio />} label='Money' />
            <FormControlLabel value='health' control={<Radio />} label='Health' />
            <FormControlLabel value='food' control={<Radio />} label='Food' />
            <FormControlLabel value='education' control={<Radio />} label='Education' />
          </RadioGroup>
        </FormControl>

        <Button
          variant="contained"
          type='submit'
          color='secondary'
          startIcon={<SendIcon />}
          endIcon={<SendIcon />}
          gutterBottom
        >
          Submit
        </Button>

      </form>

      {

      }

    </Container>

  );
}

export default App;
