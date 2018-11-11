import { a } from './js/index/js';

const API_KEY = '7719cc235c3c4a4381f84089ece47f5f'; 
const BASE_URL = 'https://newsapi.org/v2/';

fetch(`${BASE_URL}sources?apiKey=${API_KEY}`)
  .then(response => response.json())
  .then(json => console.log(json));
console.log('2')

a();
