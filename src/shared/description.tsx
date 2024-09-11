import { Box, Typography } from '@mui/material'
import { FC } from 'react'

interface IDescription {
	text: string
}

export const Description: FC<IDescription> = ({ text }) => (
	<Box>
		<Typography
			variant='h2'
			sx={{
				fontSize: 'clamp(1.25rem, 0.625rem + 1.3021vw, 1.875rem)',
				fontWeight: 600,
			}}
			marginBottom={2}
		>
			Описание
		</Typography>
		<p>{text}</p>
	</Box>
)
