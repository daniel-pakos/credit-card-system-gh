import { useState, useEffect } from 'react';
import './App.css';

import Container from '@mui/material/Container';

import Header from './components/header';
import AddCard from './components/add-card';
import ListCards from './components/list-cards';

import { getExistingCards } from './controllers/cards';

function App() {

  const [cards, setCards] = useState<any[]>([]);
  const [added, setAdded] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const cardRows: any[] = await getExistingCards()
      setCards(cardRows);
    })();
  }, [added]);

  const newAddedHandler = (status: boolean) => {
    setAdded(status)
  }

  return (
    <Container maxWidth="xl" className='App'>
      <Header/>
      <AddCard newCardAdded={newAddedHandler}/>
      <ListCards cards={cards}/>
    </Container>
  );
}

export default App;
