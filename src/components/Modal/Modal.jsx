import { Component } from "react";
import styles from './Modal.module.css'

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onCloseModal();
    }
  }

  handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onCloseModal();
    }
  }
  render() {
    const { isOpen, imageURL } = this.props;
    return (
      isOpen && (
        <div className={styles.overlay} onClick={this.handleBackdropClick}>

          <div className={styles.modal}>
            <img src={imageURL} alt="" />

          </div>
          <button className={styles.closeButton} onClick={this.props.onCloseModal}>
            {/* &times; */}
            X
          </button>
        </div>
      )

    )
  }
}