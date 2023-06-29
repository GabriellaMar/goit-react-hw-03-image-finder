import axios from 'axios';

const BASE_URL= 'https://pixabay.com/api/' ;
 const API_KEY = '36443440-862a7ce0430fc541f34c4596c';
// export const getImages=({searchValue}) =>{
//    return fetch(`${BASE_URL}?key=${API_KEY}&q=${searchValue}&image_type=photo&orientation=horizontal&page=1&per_page=12`)
//     .then(response=>{
//         if (response.ok) {
//             return response.json();
//           } else {
//             return Promise.reject(new Error(response.message));
//           }
//         })
//         .then(data => data.hits)
//         .catch(error => {
//           console.log(error);
          
//           })
//     //   .catch(error=>)
// }



// const params= {
//     key: API_KEY,
//     q:searchValue,
//     image_type: photo,
//     orientation: horizontal,
//     per_page: 12,
//     page: page,
// }
export const getImages = async(searchValue) =>{
    const response = await axios.get(`${BASE_URL}?q=${searchValue}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`);
    // const response = await axios.get(`${BASE_URL}`, { params });
    return response;
}