import { TPartFilm } from '@/types'
import { FC } from 'react'
import { SectionTitle } from './section-title'
import { Box } from '@mui/material'
import { Carousel } from './carousel/carousel'
import { FilmCard } from './cards/film-card'

interface IFilmsCarousel {
	title: string
	items: TPartFilm[]
}

export const FilmsCarousel: FC<IFilmsCarousel> = ({ title, items }) => {
	return (
		<Box component={'section'}>
			<SectionTitle>{title}</SectionTitle>
			<Carousel
				variant='film'
				slides={items.map((item) => (
					<FilmCard
						id={item.id}
						type={item.type}
						imgSrc={item.poster.previewUrl}
						title={item.name}
					/>
				))}
			/>
		</Box>
	)
}
