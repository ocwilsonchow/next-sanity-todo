import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'


export const theme = extendTheme({
  styles: {
    global: props => ({
      // styles for the `body`
      body: {
        bg: mode('white', 'green.900')(props),

      },
      // styles for the `a`
      a: {
        color: 'teal.500',
        _hover: {
          textDecoration: 'underline',
        },
      },
    }),
  },
})
