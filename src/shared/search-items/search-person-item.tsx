import { Box, ListItemButton, ListItemText } from '@mui/material'
import { FC } from 'react'
import cover from '@/assets/card-cover.svg'

interface ISearchPersonItem {
	imgSrc?: string | null
	name: string
}

export const SearchPersonItem: FC<ISearchPersonItem> = ({ imgSrc, name }) => (
	<ListItemButton>
		<Box
			component={'img'}
			src={imgSrc ?? cover}
			alt={name}
			width={'80px'}
			height={'120px'}
			marginRight={'14px'}
			sx={{ '&:hover': { color: '#855AF6' } }}
		/>
		<ListItemText>
			<p>{name}</p>
		</ListItemText>
	</ListItemButton>
)
