import { render } from '@testing-library/react';

import TrackCard from './track-card';

describe('TrackCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TrackCard />);
    expect(baseElement).toBeTruthy();
  });
});
