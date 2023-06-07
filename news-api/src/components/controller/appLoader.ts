import { BaseUrlApiKey } from '../types';
import Loader from './loader';

const { baseUrl, apiKey } = BaseUrlApiKey;

class AppLoader extends Loader {
    constructor() {
        super(Object.values(baseUrl)[0], {
            [Object.keys(apiKey)[0]]: Object.values(apiKey)[0],
        });
    }
}

export default AppLoader;
