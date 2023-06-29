import styles from './ImageGalleryItem.module.css';
//  import { Modal } from 'components/Modal/Modal'

export const ImageGalleryItem = ({ image, onOpenModal }) => {
    const handleImageClick = () => {
      onOpenModal(image.largeImageURL);
    };
    
    return (
        <li key={image.id} className={styles.ImageGalleryItem} onClick={handleImageClick}>
  <img className={styles.ImageGalleryItemImage} 
  src={image.webformatURL} 
  alt={image.tags} 
  />
</li>
    )
}