import { render } from '@testing-library/react';

import Template2 from './Template2';

describe('Template2', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Template2 />);
    expect(baseElement).toBeTruthy();
  });
});
