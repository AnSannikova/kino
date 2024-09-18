import {
	addOptions,
	countriesSelector,
	genresSelector,
} from '@/services/slices/filterSlice'
import { useAppDispatch, useAppSelector } from '@/services/store'
import { FilmType } from '@/types'
import { getYears } from '@/utils/utils'
import { Autocomplete, Box, Button, TextField, Typography } from '@mui/material'
import { FC, FormEvent, SyntheticEvent, useState } from 'react'

interface IFilterForm {
	type?: string
	'genres.name'?: string
	'countries.name'?: string
	yearsStart?: string
	yearsEnd?: string
}

export const Filter: FC = () => {
	const types = Object.keys(FilmType)
	const genres = useAppSelector(genresSelector)
	const countries = useAppSelector(countriesSelector)
	const years = getYears()
	const [formSate, setFormState] = useState<IFilterForm>({})
	const dispatch = useAppDispatch()

	const onSubmit = (e: FormEvent) => {
		e.preventDefault()
		for (const key in formSate) {
			if (key === 'yearsStart') {
				dispatch(
					addOptions({
						year: formSate.yearsEnd
							? `${formSate.yearsStart}-${formSate.yearsEnd}`
							: formSate.yearsStart,
					})
				)
			} else if (key === 'yearsEnd') {
				continue
			} else {
				dispatch(
					addOptions({
						[key]: formSate[key as keyof IFilterForm],
					})
				)
			}
		}
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
						? setFormState({ ...formSate, 'genres.name': value })
						: delete formSate['genres.name']
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
						? setFormState({ ...formSate, 'countries.name': value })
						: delete formSate['countries.name']
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
						) => {
							if (reason === 'selectOption') {
								setFormState({ ...formSate, yearsStart: value })
							} else {
								delete formSate.yearsStart
								delete formSate.yearsEnd
							}
						}}
						size='small'
						id='yearsStart'
						options={years}
						getOptionLabel={(option) => option}
						renderInput={(params) => <TextField {...params} label='C' />}
					/>
					<Autocomplete
						disabled={!formSate.yearsStart}
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
