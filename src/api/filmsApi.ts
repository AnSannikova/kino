import { TFilm } from '@/types'
import axios from 'axios'

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	headers: {
		'X-API-KEY': import.meta.env.VITE_API_KEY,
	},
})

type TFilmsResponse = {
	docs: TFilm[]
	total: number
	limit: number
	page: number
	pages: number
}

const filmsOptions = {
	limit: ['28'],
	selectFields: [
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

type TFilmsOptions = Partial<typeof filmsOptions>

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
		`movie?page=${pageCount}${endpoint(filmsOptions)}`
	)
	return data
}
