import { Typography } from '@mui/material'
import { FC, PropsWithChildren } from 'react'

export const SectionTitle: FC<PropsWithChildren> = ({ children }) => (
	<Typography
		variant='h2'
		sx={{
			fontSize: 'clamp(1.25rem, 0.7474rem + 1.0471vw, 1.75rem)',
			fontWeight: 600,
		}}
		marginBottom={2}
	>
		{children}
	</Typography>
)
