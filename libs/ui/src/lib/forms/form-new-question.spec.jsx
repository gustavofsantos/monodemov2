import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormNewQuestion } from './form-new-question';

describe(FormNewQuestion.name, () => {
  const label = 'the label',
    placeholder = 'the placeholder';

  const fillForm = (label = '', placeholder = '') => {
    const labelInput = screen.getByLabelText(/question label/i);
    const placeholderInput = screen.getByLabelText(/question hint/i);

    userEvent.type(labelInput, label);
    userEvent.type(placeholderInput, placeholder);
  };

  it('should edit label and placeholder', () => {
    const handleSubmit = jest.fn();
    render(<FormNewQuestion onSubmit={handleSubmit} />);

    fillForm(label, placeholder);

    expect(screen.getByDisplayValue(label)).toBeInTheDocument();
    expect(screen.getByDisplayValue(placeholder)).toBeInTheDocument();
  });

  it('should submit when click in the create button', () => {
    const handleSubmit = jest.fn();
    render(<FormNewQuestion onSubmit={handleSubmit} />);

    fillForm(label, placeholder);

    userEvent.click(screen.getByText(/create/i));
    expect(handleSubmit).toBeCalledWith({
      label,
      placeholder,
    });
  });
});
