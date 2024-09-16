import axios from 'axios'
import { TFilmsResponse, TPersonsResponse } from './types'
import { TFilmFull, TPossibleValuesField, TStill } from '@/types'

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

export const searchPersons = async (
	name: string,
	limit: number,
	pageCount: number = 1
): Promise<TPersonsResponse> => {
	const { data } = await axiosInstance.get<TPersonsResponse>(
		`person/search?page=${pageCount}&limit=${limit}&query=${name}`
	)
	return data
}

export const fetchStills = async (
	id: string,
	limit: number,
	pageCount: number = 1
): Promise<TStill[]> => {
	const { data } = await axiosInstance.get<TStill[]>(
		`image?page=${pageCount}&limit=${limit}&notNullFields=previewUrl&movieId=${id}&type=still`
	)
	return data
}

export const fetchPossibleGenres = async (): Promise<
	TPossibleValuesField[]
> => {
	const { data } =
		await axiosAltInstance.get<TPossibleValuesField[]>(`?field=genres.name`)
	return data
}

export const fetchPossibleCountries = async (): Promise<
	TPossibleValuesField[]
> => {
	const { data } = await axiosAltInstance.get<TPossibleValuesField[]>(
		`?field=countries.name`
	)
	return data
}
