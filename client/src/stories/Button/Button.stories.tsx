import type { Meta, StoryObj } from '@storybook/react'
import Button from './Button'

const meta: Meta<typeof Button> = {
  component: Button,

  args: {
    children: 'Btn Text',
    size: 'medium',
  },
}

export default meta

type Story = StoryObj<typeof Button>

export const Basic: Story = {
  args: {
    variant: 'primary',
  },
}
