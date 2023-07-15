import type { Preview } from '@storybook/react'
import '../src/index.css'

const preview: Preview = {
  globalTypes: {
    darkMode: {
      defaultValue: true,
    },
  },
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
}

export default preview
