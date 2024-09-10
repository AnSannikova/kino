import { fetchFilm } from '@/api/filmsApi'
import { TFilmFull } from '@/types'
import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const FilmPage: FC = () => {
	const { id } = useParams()
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [film, setFilm] = useState<TFilmFull | null>(null)

	useEffect(() => {
		try {
			const getFilm = async () => {
				const data = await fetchFilm(id!)
				setFilm(data)
			}
			getFilm()
		} catch (error) {
			console.log(error)
		}
	}, [id])

	return <div>{id}</div>
}
