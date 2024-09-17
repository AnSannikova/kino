import { TFilm } from '@/types'
import { getCardsData } from '@/utils/utils'
import { Box, List, ListItem, Pagination, Skeleton } from '@mui/material'
import { FC, memo } from 'react'
import { FilmCard } from './cards/film-card'
import { CardSkeleton } from './skeletons'

interface IFilmsBlock {
	items: TFilm[]
	isLoading: boolean
	pagesCount: number
	currentPage: number
	handleChange: (event: React.ChangeEvent<unknown>, value: number) => void
}

export const FilmsBlock: FC<IFilmsBlock> = memo(
	({ items, isLoading, pagesCount, currentPage, handleChange }) => {
		const cardItems = getCardsData(items)

		return (
			<Box padding={'16px 0'} width={'100%'}>
				<List
					sx={{
						width: '100%',
						display: 'flex',
						flexWrap: 'wrap',
						alignContent: 'flex-start',
						padding: '0 0 20px',
					}}
				>
					{cardItems.map((item) => (
						<ListItem
							key={item.id}
							sx={{
								width: 'calc(100% / 6)',
								display: 'block',
								padding: '8px 16px 22px',
							}}
						>
							{isLoading ? <CardSkeleton /> : <FilmCard {...item} />}
						</ListItem>
					))}
				</List>

				<Box display={'flex'} justifyContent={'center'}>
					{isLoading ? (
						<Skeleton width={365.5} height={32} />
					) : (
						<Pagination
							count={pagesCount}
							page={currentPage}
							color='primary'
							onChange={handleChange}
						/>
					)}
				</Box>
			</Box>
		)
	}
)
