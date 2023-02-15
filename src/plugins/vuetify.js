/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#0881A3',
          secondary: '#FDE9DF',
          tertiary: '#FFD6A4',
          quaternary: '#FFFDFB',
          quinary: '',
          error: '#ff3333'
        },
      },
    },
  },
  display: {
    mobileBreakpoint: 'sm',
  },
})
