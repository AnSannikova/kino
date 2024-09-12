import { Box } from '@mui/material'
import { FC } from 'react'
import { SectionTitle } from './section-title'

interface IDescription {
	text: string
}

export const Description: FC<IDescription> = ({ text }) => (
	<Box component={'section'}>
		<SectionTitle>Описание</SectionTitle>
		<p>{text}</p>
	</Box>
)
