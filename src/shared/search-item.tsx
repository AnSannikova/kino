import { TFilmType } from '@/types'
import { Box, ListItemButton, ListItemText } from '@mui/material'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { CardRating } from './card-rating'
import cover from '@/assets/card-cover.svg'

interface ISearchItem {
	id: number
	type: TFilmType
	imgSrc?: string | null
	name: string
	rating?: number
	year?: number
	genre?: string
}

export const SearchItem: FC<ISearchItem> = ({
	imgSrc,
	name,
	rating,
	year,
	genre,
	type,
	id,
}) => (
	<Link to={`/${type}/${id}`}>
		<ListItemButton>
			<Box
				component={'img'}
				src={imgSrc ?? cover}
				alt={`Постер к ${name}`}
				width={'32px'}
				height={'48px'}
				marginRight={'14px'}
				sx={{ '&:hover': { color: '#855AF6' } }}
			/>
			<ListItemText>
				<p>{name}</p>
				<Box display={'flex'} fontSize={'14px'} alignItems={'center'} gap={1}>
					{rating && <CardRating>{rating.toFixed(1)}</CardRating>}
					{year && <span>{year}</span>}
					{year && genre && <span>{' · '}</span>}
					{genre && <span>{genre}</span>}
				</Box>
			</ListItemText>
		</ListItemButton>
	</Link>
)
