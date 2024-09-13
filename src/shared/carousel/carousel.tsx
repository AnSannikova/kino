import { FC, ReactNode } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { usePrevNextButtons } from './hooks/usePrevNextButtons'
import { NextButton, PrevButton } from './carousel-arrow-buttons'
import clsx from 'clsx'

import './styles.css'

type PropType = {
	slides: ReactNode[]
	variant: 'film' | 'person'
}

export const Carousel: FC<PropType> = ({ slides, variant }) => {
	const [emblaRef, emblaApi] = useEmblaCarousel({
		slidesToScroll: 'auto',
	})

	const {
		prevBtnDisabled,
		nextBtnDisabled,
		onPrevButtonClick,
		onNextButtonClick,
	} = usePrevNextButtons(emblaApi)

	return (
		<section
			className={clsx(
				'embla',
				{ ['film']: variant === 'film' },
				{ ['person']: variant === 'person' }
			)}
		>
			<div
				className={clsx(
					'left-container',
					{ ['film-variant']: variant === 'film' },
					{ ['person-variant']: variant === 'person' }
				)}
			>
				<PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
			</div>

			<div className='embla__viewport' ref={emblaRef}>
				<div className='embla__container'>
					{slides.map((slide, index) => (
						<div className='embla__slide' key={index}>
							{slide}
						</div>
					))}
				</div>
			</div>

			<div
				className={clsx(
					'right-container',
					{ ['film-variant']: variant === 'film' },
					{ ['person-variant']: variant === 'person' }
				)}
			>
				<NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
			</div>
		</section>
	)
}
