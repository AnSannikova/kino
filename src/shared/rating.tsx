import { Typography } from '@mui/material'
import { FC, PropsWithChildren } from 'react'

export const Rating: FC<PropsWithChildren> = ({ children }) => (
	<Typography
		component={'span'}
		sx={{
			fontWeight: 600,
			fontSize: 'inherit',
			lineHeight: 'inherit',
			bgcolor: '#5d5d5d',
			padding: '1px 5px',
			borderRadius: '4px',
		}}
	>
		{children}
	</Typography>
)
