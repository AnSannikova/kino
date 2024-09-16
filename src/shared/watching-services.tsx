import { TWatchingMoviesService } from '@/types'
import { Box, List } from '@mui/material'
import { FC } from 'react'
import { SectionTitle } from './section-title'
import { ServiceCard } from './cards/service-card'
import { v4 as uuidv4 } from 'uuid'

interface IWatchingServices {
	items: TWatchingMoviesService[]
}

export const WatchingServices: FC<IWatchingServices> = ({ items }) => (
	<Box component={'section'}>
		<SectionTitle>Где посмотреть</SectionTitle>
		<List sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
			{items.map((item) => (
				<ServiceCard
					key={uuidv4()}
					imgSrc={item.logo.url}
					name={item.name}
					link={item.url}
				/>
			))}
		</List>
	</Box>
)
