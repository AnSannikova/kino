import {
	countriesSelector,
	genresSelector,
} from '@/services/slices/filterSlice'
import { useAppSelector } from '@/services/store'
import { FilmType } from '@/types'
import { getYears } from '@/utils/utils'
import { Autocomplete, Box, Button, TextField, Typography } from '@mui/material'
import { FC, FormEvent, SyntheticEvent, useState } from 'react'

interface IFilterForm {
	yearsStart?: string
	yearsEnd?: string
	country?: string
	genre?: string
	type?: string
}

export const Filter: FC = () => {
	const years = getYears()
	const countries = useAppSelector(countriesSelector)
	const genres = useAppSelector(genresSelector)
	const types = Object.keys(FilmType)
	const [formSate, setFormState] = useState<IFilterForm>({})

	const onSubmit = (e: FormEvent) => {
		e.preventDefault()
		console.log(formSate)
	}

	return (
		<Box
			onSubmit={onSubmit}
			component={'form'}
			sx={{
				position: 'sticky',
				top: 0,
				height: 'fit-content',
				width: '100%',
				maxWidth: '280px',
				flexShrink: 0,
				display: 'flex',
				flexDirection: 'column',
				gap: 2,
				padding: '24px 16px 0 0',
			}}
		>
			<Autocomplete
				onInputChange={(_e: SyntheticEvent, value: string, reason: string) =>
					reason === 'selectOption'
						? setFormState({ ...formSate, type: value })
						: delete formSate.type
				}
				id='type'
				size='small'
				options={types}
				getOptionLabel={(option) => option}
				renderInput={(params) => <TextField {...params} label='Формат' />}
			/>
			<Autocomplete
				onInputChange={(_e: SyntheticEvent, value: string, reason: string) =>
					reason === 'selectOption'
						? setFormState({ ...formSate, genre: value })
						: delete formSate.genre
				}
				size='small'
				id='genre'
				options={genres}
				getOptionLabel={(option) => option}
				renderInput={(params) => <TextField {...params} label='Жанр' />}
			/>
			<Autocomplete
				onInputChange={(_e: SyntheticEvent, value: string, reason: string) =>
					reason === 'selectOption'
						? setFormState({ ...formSate, country: value })
						: delete formSate.country
				}
				size='small'
				id='country'
				limitTags={1}
				options={countries}
				getOptionLabel={(option) => option}
				renderInput={(params) => (
					<TextField {...params} label='Страна производства' />
				)}
			/>

			<Box>
				<Typography sx={{ marginBottom: 1 }}>Период:</Typography>
				<Box
					display={'flex'}
					width={'100%'}
					gap={1}
					sx={{ '& .MuiAutocomplete-root': { width: '100%' } }}
				>
					<Autocomplete
						onInputChange={(
							_e: SyntheticEvent,
							value: string,
							reason: string
						) =>
							reason === 'selectOption'
								? setFormState({ ...formSate, yearsStart: value })
								: delete formSate.yearsStart
						}
						size='small'
						id='yearsStart'
						options={years}
						getOptionLabel={(option) => option}
						renderInput={(params) => <TextField {...params} label='C' />}
					/>
					<Autocomplete
						onInputChange={(
							_e: SyntheticEvent,
							value: string,
							reason: string
						) =>
							reason === 'selectOption'
								? setFormState({ ...formSate, yearsEnd: value })
								: delete formSate.yearsEnd
						}
						size='small'
						id='yearsEnd'
						options={years}
						getOptionLabel={(option) => option}
						renderInput={(params) => <TextField {...params} label='По' />}
					/>
				</Box>
			</Box>
			<Button
				disabled={Object.keys(formSate).length === 0}
				type='submit'
				variant='contained'
				sx={{ minWidth: '250px' }}
			>
				Искать
			</Button>
		</Box>
	)
}
