import axios from 'axios'
import { TFilmsResponse, TPersonsResponse, TPossibleValuesField } from './types'
import { TFilmFull, TFilmsOptions, TStill } from '@/types'
import { endpoint } from '@/utils/utils'

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

const initialFilmsOptions: TFilmsOptions = {
	limit: '30',
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
	sortField: 'votes.kp',
	sortType: '-1',
}

export const fetchFilms = async (
	pageCount: number,
	options?: TFilmsOptions
): Promise<TFilmsResponse> => {
	const { data } = await axiosInstance.get<TFilmsResponse>(
		`movie?page=${pageCount}${endpoint({ ...initialFilmsOptions, ...options })}`
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
	const { data } = await axiosAltInstance.get<TPossibleValuesField[]>(
		'/movie/possible-values-by-field?field=genres.name'
	)
	return data
}

export const fetchPossibleCountries = async (): Promise<
	TPossibleValuesField[]
> => {
	const { data } = await axiosAltInstance.get<TPossibleValuesField[]>(
		'/movie/possible-values-by-field?field=countries.name'
	)
	return data
}
