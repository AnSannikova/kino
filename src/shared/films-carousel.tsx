import { TPartFilm } from '@/types'
import { FC } from 'react'
import { SectionTitle } from './section-title'
import { Box } from '@mui/material'
import { Carousel } from './carousel/carousel'
import { FilmCard } from './film-card'
import { getCardsData } from '@/utils/utils'

interface IFilmsCarousel {
	title: string
	items: TPartFilm[]
}

export const FilmsCarousel: FC<IFilmsCarousel> = ({ title, items }) => {
	const cardItems = getCardsData(items)

	return (
		<Box component={'section'}>
			<SectionTitle>{title}</SectionTitle>
			<Carousel
				slides={cardItems.map((item) => (
					<FilmCard {...item} />
				))}
			/>
		</Box>
	)
}
