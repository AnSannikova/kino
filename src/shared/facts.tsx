import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	List,
	ListItemText,
} from '@mui/material'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import { FC } from 'react'
import { TFact } from '@/types'
import { getFactData } from '@/utils/utils'

interface IFacts {
	facts: TFact[]
}

export const Facts: FC<IFacts> = ({ facts }) => {
	const noSpoilerFacts = facts.filter((item) => item.spoiler === false)
	return (
		<Accordion>
			<AccordionSummary
				expandIcon={<ArrowDownwardIcon />}
				aria-controls='panel-content'
				id='panel-header'
			>
				Интересные факты
			</AccordionSummary>
			<AccordionDetails>
				<List>
					{noSpoilerFacts.map((fact) => (
						<ListItemText>{getFactData(fact.value)}</ListItemText>
					))}
				</List>
			</AccordionDetails>
		</Accordion>
	)
}
