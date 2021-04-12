import React from 'react';
import { render, screen } from '@testing-library/react';
import { Input } from './input';

describe('Input', () => {
  it('should render the value and label', () => {
    render(<Input label="input label" value="the value" isReadOnly />);

    expect(screen.getByText(/input label/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/the value/i)).toBeInTheDocument();
  });
});
