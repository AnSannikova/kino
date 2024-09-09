export type TFilmType =
	| 'movie'
	| 'tv-series'
	| 'cartoon'
	| 'animated-series'
	| 'anime'

export type TName = {
	name: string
}

export type TPerson = {
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
	persons: TPerson[]
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
}
