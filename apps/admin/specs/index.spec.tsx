import React from 'react';
import { render } from '@testing-library/react';

import Index from '../pages/index';
import { QueryClient, QueryClientProvider } from 'react-query';

describe('Index', () => {
  it('should render successfully', () => {
    const queryClient = new QueryClient();

    const { baseElement } = render(
      <QueryClientProvider client={queryClient}>
        <Index />
      </QueryClientProvider>
    );
    expect(baseElement).toBeTruthy();
  });
});
