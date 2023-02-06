import formatNumber from './../utils/format-number';

const fetchCards = async () => {
    const endpoint = process.env.REACT_APP_API_URL + `/cards`

    const cardsRes = await fetch(endpoint, {
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin':'*'
      }
    }
    );

    const cards = await cardsRes.json();

    return cards;
  }

  const prepareCardsRows = (cards: object) => {
    const rows = [];

    for (const [id, card] of Object.entries(cards)) {

        const cardRow = {
            id: id,
            name: card.name,
            balance: formatNumber(card.balance, card.currency.sign),
            limit: formatNumber(card.limit, card.currency.sign),
            number: card.number
        }

        rows.push(cardRow)
    }

    return rows;
  }

  const getExistingCards = async () => {
    const cards = await fetchCards();
    const cardsRows = prepareCardsRows(cards)

    return cardsRows;
  }

export {getExistingCards}