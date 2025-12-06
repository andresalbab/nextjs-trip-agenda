import { render, screen } from '@testing-library/react';
import { Badge } from '@/components/ui/Badge/Badge';

describe('Badge', () => {
  it('renders with children', () => {
    render(<Badge>Today</Badge>);
    expect(screen.getByText('Today')).toBeInTheDocument();
  });

  it('applies today variant', () => {
    const { container } = render(<Badge variant="today">Today</Badge>);
    const badge = container.querySelector('span');
    expect(badge?.className).toContain('today');
  });
});

