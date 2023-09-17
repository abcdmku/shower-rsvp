import type { Meta } from '@storybook/react';
import { Wedding } from './Wedding';

const Story: Meta<typeof Wedding> = {
  component: Wedding,
  title: 'Wedding',
};
export default Story;

export const Primary = {
  args: {},
};
