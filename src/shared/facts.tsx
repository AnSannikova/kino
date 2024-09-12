import {
	List,
	ListItemText,
	Box,
	ListItemIcon,
	ListItem,
	Button,
} from '@mui/material'
import MovieIcon from '@mui/icons-material/Movie'
import { FC, useState } from 'react'
import { TFact } from '@/types'
import { getFactData } from '@/utils/utils'
import { SectionTitle } from './section-title'

interface IFacts {
	facts: TFact[]
}

export const Facts: FC<IFacts> = ({ facts }) => {
	const [isOpen, setIsOpen] = useState(false)
	const noSpoilerFacts = facts.filter((item) => item.spoiler === false)
	const showedFacts = isOpen ? noSpoilerFacts : noSpoilerFacts.slice(0, 5)

	const handelButton = () => {
		setIsOpen(!isOpen)
	}

	return (
		<Box component={'section'}>
			<SectionTitle>Интересные факты</SectionTitle>
			<List sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
				{showedFacts.map((fact, index) => (
					<ListItem key={index} sx={{ padding: 0, alignItems: 'flex-start' }}>
						<ListItemIcon
							sx={{
								minWidth: '30px',
								color: 'currentcolor',
								paddingRight: '16px',
								paddingTop: '2px',
							}}
						>
							<MovieIcon />
						</ListItemIcon>
						<ListItemText sx={{ margin: 0 }}>
							{getFactData(fact.value)}
						</ListItemText>
					</ListItem>
				))}
			</List>
			<Button onClick={handelButton} variant='text'>
				{isOpen ? 'Скрыть' : 'Показать еще'}
			</Button>
		</Box>
	)
}
