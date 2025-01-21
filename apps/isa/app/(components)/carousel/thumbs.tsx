import styles from '../../styles/embla.module.css';

interface ThumbsProps {
  selected: boolean
  image: {image: string, text: string}
  onClick: () => void
}

export const Thumb = ({ selected, image, onClick }: ThumbsProps) => {
  return (
    <div
      className={`${styles['embla-thumbs__slide']} ${selected ? styles['embla-thumbs__slide--selected']: ''}`}
    >
      <button
        onClick={onClick}
        type="button"
        className={styles["embla-thumbs__slide__number"]}
      >
        <img
          src={image.image}
          alt={image.text}
          width={'98%'}
          height={'98%'}
          className={'remove-bg'}
          style={{
            borderRadius: '1rem',
            objectFit: 'fill'
          }}
        />
      </button>
    </div>
  )
}
