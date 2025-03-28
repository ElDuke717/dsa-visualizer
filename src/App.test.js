import { render, screen } from '@testing-library/react';
import App from './App';

test('renders main application title in Navbar', () => {
  render(<App />);
  // Check if the main title link from the Navbar is rendered
  // Use getByRole to be more specific about targeting the link
  const titleLinkElement = screen.getByRole('link', { name: /Data Structures & Algorithms/i });
  expect(titleLinkElement).toBeInTheDocument();
  // Ensure it's the navbar brand link
  expect(titleLinkElement).toHaveClass('navbar-brand');
});
