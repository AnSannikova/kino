import { Typography } from '@mui/material'
import { FC, PropsWithChildren } from 'react'

export const CardRating: FC<PropsWithChildren> = ({ children }) => (
	<Typography
		variant='body2'
		sx={{
			fontSize: '1rem',
			lineHeight: 1,
			bgcolor: '#5d5d5d',
			padding: '2px 6px 1px',
			borderRadius: '4px',
		}}
	>
		{children}
	</Typography>
)
