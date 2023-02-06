import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Add Card button', () => {
  render(<App />);
  const buttonElement = screen.getByText(/Add card/i);
  expect(buttonElement).toBeInTheDocument();
});
