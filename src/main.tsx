import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Provider } from 'react-redux'
import store from '@/services/store.ts'

import './index.css'

const theme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#855AF6',
		},
		secondary: {
			main: '#ffb300',
		},
		background: {
			default: '#27243b',
			paper: '#27243b',
		},
		text: {
			primary: '#d5d1ea',
		},
	},
	typography: {
		fontFamily: 'Jost',
		fontSize: 16,
	},
	shape: {
		borderRadius: 4,
	},
})

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Provider store={store}>
				<App />
			</Provider>
		</ThemeProvider>
	</StrictMode>
)
