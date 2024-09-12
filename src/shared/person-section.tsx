import { TPerson } from '@/types'
import { FC } from 'react'
import { Carousel } from './carousel/carousel'
import { PersonCard } from './person-card'
import { SectionTitle } from './section-title'
import { Box } from '@mui/material'

interface IPersonSection {
	items: TPerson[]
}

export const PersonSection: FC<IPersonSection> = ({ items }) => (
	<Box component={'section'}>
		<SectionTitle>Актёры и съёмочная группа</SectionTitle>
		<Carousel
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
