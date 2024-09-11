import { FC } from 'react'
import { Outlet } from 'react-router-dom'

export const Main: FC = () => (
	<main>
		<Outlet />
	</main>
)
