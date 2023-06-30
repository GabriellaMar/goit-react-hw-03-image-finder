import { Component } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
// import axios from "axios";
import { getImages } from "../services/getImages";
import { RotatingLines } from 'react-loader-spinner'
import { toast } from 'react-toastify';
import { Modal } from "./Modal/Modal";
import { Button } from "./Button/Button";
  

    const toastConfig = {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
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
    showLoadMore: true,
  }
 
  
  async componentDidUpdate(prevProps, prevState) {
    const { searchValue, page } = this.state;

    if (
      (prevState.searchValue !== searchValue || prevState.page !== page) &&
      searchValue.trim() !== ''
    ) {
      this.setState({ 
        loading: true, 
        error: null });

      try {
        const response = await getImages(searchValue, page);

        const images = response.data.hits;
        const totalPages = Math.ceil(response.data.totalHits / 12);
        const hasMoreImages = page < totalPages;

        if (prevState.searchValue !== searchValue) {
          this.setState({ 
            images, 
            showLoadMore: hasMoreImages });
        } else {
          this.setState(prevState => ({
            images: [...prevState.images, ...images],
            showLoadMore: hasMoreImages,
          }));
        }

        if (images.length === 0) {
          toast.warn("Фото з таким іменем не існує", toastConfig);
        }
      } catch (error) {
        this.setState({ error: error.message });
        toast.error(error.message, toastConfig);
      } finally {
        this.setState({ loading: false });
      }
    }
  }


handleFormSubmit = searchValue => {
  this.setState({ searchValue });
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

  loadMoreImages = ()=>{
    this.setState(prevState =>({
      page: prevState.page + 1,
    }))
  }


 render() {
   const { images, loading, error, modal, showLoadMore } = this.state;
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
       {showLoadMore && <Button onClick={this.loadMoreImages} text="Load More" />}
       </>
       )}
     </div>
   );
 };
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



  
//   async componentDidUpdate(prevProps, prevState) {
//     if (prevState.searchValue !== this.state.searchValue) {
//       this.setState({ 
//         loading: true, 
//         error: null, 
//         page: 1, 
//         images: [],
//         showLoadMore: true,
//       });
// // if (this.state.searchValue.trim() === '') {
// //    toast.warn("Фото з таким іменем не існує", toastConfig)
// //    return
// // }
//       try {
//         const response = await getImages(this.state.searchValue, 1);
//         this.setState({ images: response.data.hits });

//         const totalPages = Math.ceil(response.data.totalHits / 12);
//         const hasMoreImages = this.state.page < totalPages;

//         if (!hasMoreImages) {
//           this.setState({ showLoadMore: false });
//         }
//       } catch (error) {
//         this.setState({ error: error.message });
//         toast.error(error.message, toastConfig);
//       } finally {
//         this.setState({ loading: false });
//       }
//     } else if (prevState.page !== this.state.page && this.state.page > 1) {
//     //   if (this.state.searchValue.trim() === '') {
//     //     toast.warn("Фото з таким іменем не існує", toastConfig)
//     //     return
//     //  }
//       try {
//         this.setState({ loading: true });

//         const response = await getImages(this.state.searchValue, this.state.page);
       
//         this.setState((prevState) => ({
//           images: [...prevState.images, ...response.data.hits],
//         }));

//         const totalPages = Math.ceil(response.data.totalHits / 12);
//         const hasMoreImages = this.state.page < totalPages;

//         if (!hasMoreImages) {
//           this.setState({ showLoadMore: false });
//         }
//       } catch (error) {
//         this.setState({ error: error.message });
//         toast.error(error.message, toastConfig);
//       } finally {
//         this.setState({ loading: false });
//       }
//     }
//   }

//   handleFormSubmit = searchValue => {
//     if (this.state.searchValue.trim() === '') {
//       toast.warn("Фото з таким іменем не існує", toastConfig)
//     }
//     this.setState({ searchValue })
//   }

   
