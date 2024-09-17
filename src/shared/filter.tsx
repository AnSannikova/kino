import {
	countriesSelector,
	genresSelector,
} from '@/services/slices/filterSlice'
import { useAppSelector } from '@/services/store'
import { getYears } from '@/utils/utils'
import { Autocomplete, Box, Button, TextField, Typography } from '@mui/material'
import { FC } from 'react'

export const Filter: FC = () => {
	const years = getYears()
	const countries = useAppSelector(countriesSelector)
	const genres = useAppSelector(genresSelector)
	const types = [
		'фильм',
		'сериал',
		'мультфильм',
		'анимационный сериал',
		'аниме',
	]

	return (
		<Box
			component={'form'}
			sx={{
				position: 'sticky',
				top: '15px',
				height: 'fit-content',
				width: '100%',
				maxWidth: '300px',
				flexShrink: 0,
				display: 'flex',
				flexDirection: 'column',
				gap: 2,
				padding: '24px 16px 0 0',
			}}
		>
			<Autocomplete
				id='types'
				size='small'
				options={types}
				getOptionLabel={(option) => option}
				renderInput={(params) => <TextField {...params} label='Формат' />}
			/>
			<Autocomplete
				size='small'
				id='genres'
				limitTags={2}
				options={genres}
				getOptionLabel={(option) => option.name}
				renderInput={(params) => <TextField {...params} label='Жанр' />}
			/>
			<Autocomplete
				size='small'
				id='countries'
				limitTags={1}
				options={countries}
				getOptionLabel={(option) => option.name}
				renderInput={(params) => (
					<TextField {...params} label='Страна производства' />
				)}
			/>

			<Box>
				<Typography>Период:</Typography>
				<Box
					display={'flex'}
					width={'100%'}
					gap={2}
					sx={{ '& .MuiAutocomplete-root': { width: '100%' } }}
				>
					<Autocomplete
						size='small'
						id='countries'
						options={years}
						defaultValue={'2010'}
						getOptionLabel={(option) => option}
						renderInput={(params) => <TextField {...params} label='C' />}
					/>
					<Autocomplete
						size='small'
						id='countries'
						defaultValue={years[0]}
						options={years}
						getOptionLabel={(option) => option}
						renderInput={(params) => <TextField {...params} label='По' />}
					/>
				</Box>
			</Box>
			<Button variant='contained' sx={{ minWidth: '250px' }}>
				Искать
			</Button>
		</Box>
	)
}
