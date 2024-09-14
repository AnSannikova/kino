/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios'
import { TFilmsResponse, TPossibleValuesField } from './types'
import { TFilmFull } from '@/types'

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
	headers: {
		'X-API-KEY': import.meta.env.VITE_API_KEY,
	},
})

const axiosAltInstance = axios.create({
	baseURL: import.meta.env.VITE_API_ALT_URL,
	headers: {
		'X-API-KEY': import.meta.env.VITE_API_KEY,
	},
})

const initialFilmsOptions = {
	limit: ['24'],
	selectFields: [
		'id',
		'name',
		'type',
		'poster',
		'rating',
		'year',
		'countries',
		'genres',
	],
	notNullFields: ['rating.kp', 'year', 'name'],
	sortField: ['votes.kp'],
	sortType: ['-1'],
}

type TFilmsOptions = Partial<typeof initialFilmsOptions>

const endpoint = (fields: TFilmsOptions) => {
	return Object.entries(fields)
		.map((item) => {
			const [option, fields] = item
			return fields.map((field) => `&${option}=${field}`).join('')
		})
		.join('')
}

export const fetchFilms = async (
	pageCount: number
): Promise<TFilmsResponse> => {
	const { data } = await axiosInstance.get<TFilmsResponse>(
		`movie?page=${pageCount}${endpoint(initialFilmsOptions)}`
	)
	return data
}

export const fetchFilm = async (id: string): Promise<TFilmFull> => {
	const { data } = await axiosInstance.get<TFilmFull>(`movie/${id}`)
	return data
}

export const searchFilms = async (
	name: string,
	limit: number,
	pageCount: number = 1
): Promise<TFilmsResponse> => {
	const { data } = await axiosInstance.get<TFilmsResponse>(
		`movie/search?page=${pageCount}&limit=${limit}&query=${name}`
	)
	return data
}

const fetchPossibleValuesField = async (
	filed: string
): Promise<TPossibleValuesField[]> => {
	const { data } = await axiosAltInstance.get<TPossibleValuesField[]>(
		`?field=${filed}`
	)
	return data
}

// export const fetchPossibleGenres = fetchPossibleValuesField('genres.name')
// export const fetchPossibleCountries = fetchPossibleValuesField('countries.name')
