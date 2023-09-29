import type { Meta } from '@storybook/react';
import { Spotify } from './Spotify';

const Story: Meta<typeof Spotify> = {
  component: Spotify,
  title: 'Spotify',
};
export default Story;

export const Primary = {
  args: {},
};
