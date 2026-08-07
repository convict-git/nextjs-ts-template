import { render, screen } from '@testing-library/react';
import { Welcome } from '../Welcome';

describe('Welcome', () => {
  it('renders the welcome message', () => {
    render(<Welcome />);

    expect(screen.getByRole('heading', { name: 'Welcome Priyanshu' })).toBeInTheDocument();
  });

  it('links to the start building page', () => {
    render(<Welcome />);

    expect(screen.getByRole('link', { name: 'start building' })).toHaveAttribute(
      'href',
      '/start-building'
    );
  });
});
