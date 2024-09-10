import { Box, Skeleton } from '@mui/material'
import { FC } from 'react'

const CardSkeleton: FC = () => (
	<Box>
		<Box sx={{ aspectRatio: 1 / 1.45 }}>
			<Skeleton
				width={'100%'}
				height={'100%'}
				variant='rectangular'
				sx={{ borderRadius: '4px' }}
			/>
		</Box>
		<Skeleton width={'100%'} sx={{ margin: '10px 0 6px' }} />
		<Skeleton width={'100%'} />
	</Box>
)

export { CardSkeleton }
