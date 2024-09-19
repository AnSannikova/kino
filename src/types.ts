export type TFilmsOptions = {
	limit?: string
	selectFields?: string[]
	sortField?: string
	sortType?: string
	type?: string
	year?: string
	'genres.name'?: string
	'countries.name'?: string
	'rating.kp'?: string
}

export type TFilmType =
	| 'movie'
	| 'tv-series'
	| 'cartoon'
	| 'animated-series'
	| 'anime'

export type TName = {
	name: string
}

export type TFilmPerson = {
	id: number
	photo: string
	name: string | null
	description: string | null
	profession: string
}

export type TPartFilm = {
	id: number
	name: string
	type: TFilmType
	poster: {
		previewUrl: string
	}
	year?: number
	rating?: {
		kp: number
		imdb: number
	}
	genres?: TName[] | null
}

export type TWatchingMoviesService = {
	name: string
	logo: {
		url: string
	}
	url: string
}

export type TTrailers = {
	url: string
	name: string
	site: string
	type: string
}

export type TFact = {
	value: string
	spoiler: boolean
}

export type TFilm = {
	id: number
	name: string
	type: TFilmType
	year: number
	rating: {
		kp: number
		imdb: number
	}
	poster: {
		url: string
		previewUrl: string | null
	} | null
	genres: TName[] | null
	countries: TName[]
}

export type TFilmFull = TFilm & {
	description: string
	shortDescription: string
	votes: {
		kp: number
		imdb: number
	}
	totalSeriesLength?: number | null
	ageRating: number
	movieLength?: number
	seriesLength?: number | null
	backdrop: {
		url: string
	}
	persons: TFilmPerson[]
	budget: {
		currency: string
		value: number
	}
	sequelsAndPrequels: TPartFilm[]
	similarMovies: TPartFilm[]
	watchability: {
		items: TWatchingMoviesService[]
	}
	videos?: {
		trailers: TTrailers[]
	}
	facts?: TFact[]
}

export type TPerson = {
	id: number
	name: string
	photo: string | null
}

export type TPersonFull = TPerson & {
	birthday: string
	death: string
	age: number
	birthPlace: [
		{
			value: string
		},
	]
	deathPlace: [
		{
			value: string
		},
	]
	profession: [
		{
			value: string
		},
	]
	countAwards: number
	facts: [
		{
			value: string
		},
	]
	movies: TFilm[]
}

export type TStill = {
	id: string
	url: string
	previewUrl: string
}
