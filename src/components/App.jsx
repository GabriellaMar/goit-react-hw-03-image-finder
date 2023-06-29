import { Component } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
// import axios from "axios";
import { getImages } from "../services/getImages";
// import { getImages } from "../services/getImages";
import { RotatingLines } from 'react-loader-spinner'
import { toast } from 'react-toastify';
import { Modal } from "./Modal/Modal";
import { Button } from "./Button/Button";
    // const BASE_URL= 'https://pixabay.com/api/' ;
    // const API_KEY = '36443440-862a7ce0430fc541f34c4596c';


    const toastConfig = {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    };

export class App extends Component {
  state = {
    // image: null
    searchValue: '',
    images: [],
    loading: false,
    error: null,
    modal: {
      isOpen:false,  
      imageURL: '',
    },
    page:1,
  }

 async componentDidUpdate(prevProps, prevState ){
  if (prevState.searchValue !== this.state.searchValue){
  try {
    this.setState({ loading: true})
    const response = await getImages(this.state.searchValue);
    this.setState({  images: response.data.hits})
  } catch(error){
        this.setState({ error: error.message });
        toast.error(error.message, toastConfig);

  }finally{
      this.setState({ loading: false})
  }
 }
 }
  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.searchValue !== this.state.searchValue) {
  //     this.setState({ loading: true, error: null }); 
  //     fetch(`https://pixabay.com/api/?q=${this.state.searchValue}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
  //       .then(response => {
  //         if (response.ok) {
  //           return response.json()
  //         }
  //          return Promise.reject(new Error('Фото з таким іменем не існує'))
          
  //       })
  //       .then(data => {
  //         this.setState({ images: data.hits});
  //       })
  //       .catch(error => {
  //         this.setState({ error: error.message });
  //       })
  //       .finally(()=>this.setState({loading: false}))
  //   }
  // }

   handleFormSubmit = searchValue => {
     this.setState({ searchValue })
   }

 
   onOpenModal = (imageURL) => {
    this.setState({
      modal: {
        isOpen: true,
        imageURL: imageURL,
      },
    });
  };

  onCloseModal = () => {
    this.setState({
      modal: {
        isOpen: false,
        imageURL: '',
      },
    });
  };

  loadmoreImages =()=>{
    this.setState({ loading: true }); 
    

  }

  render() {
    const { images, loading, error, modal } = this.state;
    // const hasImages = images.length > 0;

    return (

      <div >
        <Searchbar onSubmit={this.handleFormSubmit} />
        {error && <p>{error}</p>}
        {loading && ( <RotatingLines
          strokeColor=" #3f51b5"
          strokeWidth={5}
          animationDuration={0.75}
          width={96}
          visible={true}
        />
        )}
        {modal.isOpen && <Modal
        isOpen={modal.isOpen}
        imageURL={modal.imageURL}
        onCloseModal={this.onCloseModal}
        />}
        {images.length > 0 &&(
          <>
        <ImageGallery images={images}  onOpenModal={this.onOpenModal} />
        <Button onClick={this.loadMoreImages}/>
        </>
        )}
        
        {/* {hasImages && <Button onClick={this.loadMoreImages}/>} */}
      </div>
    );
  };
}
