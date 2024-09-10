import { Container } from '@mui/material'
import { FC } from 'react'
import { Outlet } from 'react-router-dom'

export const Main: FC = () => (
	<Container maxWidth='xl' component={'main'}>
		<Outlet />
	</Container>
)
