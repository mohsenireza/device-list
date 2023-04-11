import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const customRender = (
  ui: ReactElement,
  renderOptions: RenderOptions = {}
) => {
  const returnValue = {
    user: userEvent.setup(),
    ...render(ui, renderOptions),
  };

  return returnValue;
};

// Re-export everything
export * from '@testing-library/react';

// Override render method
export { customRender as render };
