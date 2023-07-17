import type { Meta, StoryObj } from '@storybook/react';
import ButtonComponent from './Button';

const meta: Meta<typeof ButtonComponent> = {
  component: ButtonComponent,

  args: {
    children: 'Btn Text',
    size: 'medium',
    as: 'btn',
  },
};

export default meta;

type Story = StoryObj<typeof ButtonComponent>;

export const Button: Story = {
  args: {
    variant: 'primary',
  },
};
