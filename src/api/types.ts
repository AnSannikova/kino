import { TFilm } from '@/types'

export type TFilmsResponse = {
	docs: TFilm[]
	total: number
	limit: number
	page: number
	pages: number
}

export type TPossibleValuesField = {
	name: string
	slug: string
}

type TPerson = {
	id: number
	name: string
	photo: string | null
}

export type TPersonsResponse = {
	docs: TPerson[]
	total: number
	limit: number
	page: number
	pages: number
}
