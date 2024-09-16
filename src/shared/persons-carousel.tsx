import { TFilmPerson } from '@/types'
import { FC } from 'react'
import { Carousel } from './carousel/carousel'
import { PersonCard } from './cards/person-card'
import { SectionTitle } from './section-title'
import { Box } from '@mui/material'

interface IPersonCarousel {
	items: TFilmPerson[]
}

export const PersonCarousel: FC<IPersonCarousel> = ({ items }) => (
	<Box component={'section'}>
		<SectionTitle>Актёры и съёмочная группа</SectionTitle>
		<Carousel
			variant='person'
			slides={items.map((person) => (
				<PersonCard
					id={person.id}
					name={person.name ?? 'Неизвестное имя'}
					imgSrc={person.photo}
					profession={person.profession}
				/>
			))}
		/>
	</Box>
)
