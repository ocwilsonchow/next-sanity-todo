import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'


export const theme = extendTheme({
  styles: {
    global: props => ({
      body: {
        bg: mode('white', 'teal.900')(props),

      },
      a: {
        color: 'teal.500',
        _hover: {
          textDecoration: 'underline',
        },
      },
    }),
  },
})
