import { FC, ReactNode } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { usePrevNextButtons } from './hooks/usePrevNextButtons'
import { NextButton, PrevButton } from './carousel-arrow-buttons'
import './styles.css'
import { Box } from '@mui/material'

type PropType = {
	slides: ReactNode[]
}

export const Carousel: FC<PropType> = ({ slides }) => {
	const [emblaRef, emblaApi] = useEmblaCarousel({
		dragFree: true,
		slidesToScroll: 'auto',
	})

	const {
		prevBtnDisabled,
		nextBtnDisabled,
		onPrevButtonClick,
		onNextButtonClick,
	} = usePrevNextButtons(emblaApi)

	return (
		<section className='embla'>
			<Box display={'flex'} alignItems={'center'} gap={2}>
				<PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
				<div className='embla__viewport' ref={emblaRef}>
					<div className='embla__container'>
						{slides.map((slide, index) => (
							<div className='embla__slide' key={index}>
								{slide}
							</div>
						))}
					</div>
				</div>

				<NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
			</Box>
		</section>
	)
}
