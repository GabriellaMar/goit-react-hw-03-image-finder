import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.css'


export const ImageGallery = ({ images, onOpenModal }) => {
    return (

        <ul className={styles.ImageGallery}>
            {images.map(image =>
                <ImageGalleryItem
                    key={image.id}
                    image={image}
                    onOpenModal={onOpenModal}
                />
            )}

        </ul>

    )
}