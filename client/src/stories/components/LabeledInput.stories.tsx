import type { Meta, StoryObj } from '@storybook/react';
import LabeledInputComponennt from '../../components/LabeledInput/LabeledInput';

const meta: Meta<typeof LabeledInputComponennt> = {
  component: LabeledInputComponennt,

  args: {},
};

export default meta;

type Story = StoryObj<typeof LabeledInputComponennt>;

export const LabeledInput: Story = {
  args: {},
};
