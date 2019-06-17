import axios from 'axios';
import {END_POINT} from './index';

export default axios.create({
    baseURL: END_POINT,
    timeout: 1000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});