import { render } from '@testing-library/react';

import Spotify from './Spotify';

describe('Spotify', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Spotify />);
    expect(baseElement).toBeTruthy();
  });
});
