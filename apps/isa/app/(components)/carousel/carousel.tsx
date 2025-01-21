import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import styles from '../../styles/embla.module.css';
import { Thumb } from "./thumbs";

interface CarouselProps {
  slides: [{image: string, text: string}]
  options?: EmblaOptionsType
}

const Carousel = ({ slides, options }: CarouselProps) => {

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true
  })

  const onThumbClick = useCallback((image: string) => {
    if (!emblaMainApi || !emblaThumbsApi) return;

    const index = slides.findIndex(slide => slide.image === image)

    emblaMainApi.scrollTo(index)
  }, [emblaMainApi, emblaThumbsApi])

  const onSelect = useCallback(() => {
    if(!emblaMainApi || !emblaThumbsApi) return;

    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex])

  useEffect(() => {
    if(!emblaMainApi) return;
    onSelect()
    emblaMainApi.on('select', onSelect).on('reInit', onSelect)
  }, [emblaMainApi, onSelect])

  return (
    <div className={styles["embla"]}>
      <div className={styles["embla__viewport"]} ref={emblaMainRef}>
        <div className={styles["embla__container"]}>
          {slides.map((image) => (
            <div className={styles["embla__slide"]} key={image.image}>
              <div
                className={styles["embla__slide__number"]}
              >
                <img
                  src={image.image}
                  alt={image.text}
                  width={'98%'}
                  height={'98%'}
                  className={'remove-bg'}
                  style={{
                    borderRadius: '25px',
                    objectFit: 'fill'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles["embla-thumbs"]}>
        <div className={styles["embla-thumbs__viewport"]} ref={emblaThumbsRef}>
          <div className={styles["embla-thumbs__container"]}>
            {slides.map((image, index) => (
              <Thumb
                key={image.image}
                onClick={() => onThumbClick(image.image)}
                selected={index === selectedIndex}
                image={image}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Carousel