import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '36443440-862a7ce0430fc541f34c4596c';


export const getImages = async (searchValue, page) => {
    const response = await axios.get(`${BASE_URL}?q=${searchValue}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`);
    console.log(response)
    return response;
}

