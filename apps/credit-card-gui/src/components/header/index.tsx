import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function Header() {
    return (
        <Container maxWidth="xl" className='Header section'>
            <header className="App-header">
                <Typography variant="h3" component="h3">
                Credit Card System #5.2
                </Typography>
            </header>
        </Container>
    )
  }

