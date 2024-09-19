import { NavigateOptions, URLSearchParamsInit } from 'react-router-dom'
import {
	TFilm,
	TPartFilm,
	TFilmPerson,
	TTrailers,
	TFilmsOptions,
} from '../types'
import cover from '@/assets/card-cover.svg'

export const endpoint = (fields: TFilmsOptions) => {
	return Object.entries(fields)
		.map((item) => {
			const [option, fields] = item
			return Array.isArray(fields)
				? fields
						.map((field) => (field !== undefined ? `&${option}=${field}` : ''))
						.join('')
				: fields !== undefined
					? `&${option}=${fields}`
					: ''
		})
		.join('')
}

export const timeConverter = (number: number) => {
	const hours = Math.floor(number / 60)
	const minutes = number - hours * 60
	return `${hours} ч. ${minutes} мин.`
}

export const filterPersonsData = (persons: TFilmPerson[], filter: string) => {
	return persons
		.filter((person) => person.profession === filter)
		.map((person) => person.name ?? '')
}

export const findActors = (persons: TFilmPerson[]) => {
	return filterPersonsData(persons, 'актеры').slice(0, 6)
}

export const getYouTubeVideos = (videos: TTrailers[]) => {
	return videos
		.filter((video) => video.site === 'youtube')
		.map((video) => video.url)
}

export const getCardsData = (films: TFilm[] | TPartFilm[]) => {
	return films.map((item) => {
		return {
			id: item.id,
			type: item.type,
			imgSrc: item.poster?.previewUrl ?? cover,
			title: item.name,
			rating: {
				kp: String(item.rating?.kp.toFixed(1) ?? 0),
			},
			year: String(item.year),
			genre: item.genres ? item.genres[0].name : '',
		}
	})
}

export const getFactData = (fact: string) => {
	const reg = /<(a|\/).+?>/gm
	return fact.replace(reg, '').replace(/&.*?;/gm, '')
}

export const getYears = () => {
	let today = new Date().getFullYear()
	const years: number[] = [today]

	while (today > 1890) {
		today -= 1
		years.push(today)
	}

	return years.map((item) => String(item))
}

export const resetSearchParams = (
	searchParams: URLSearchParams,
	setSearchParams: (
		nextInit?:
			| URLSearchParamsInit
			| ((prev: URLSearchParams) => URLSearchParamsInit),
		navigateOpts?: NavigateOptions
	) => void
) => {
	searchParams.delete('type')
	searchParams.delete('genres.name')
	searchParams.delete('countries.name')
	searchParams.delete('years')
	setSearchParams(searchParams)
}
