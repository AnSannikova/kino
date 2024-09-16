import { Box, Typography } from '@mui/material'
import { FC } from 'react'

export const Error: FC<{ value: string }> = ({ value }) => (
	<Box
		minHeight={'80dvh'}
		display={'flex'}
		justifyContent={'center'}
		alignItems={'center'}
	>
		<Typography variant='h1' sx={{ fontSize: '2.25rem', lineHeight: '2.5rem' }}>
			{value}
		</Typography>
	</Box>
)
