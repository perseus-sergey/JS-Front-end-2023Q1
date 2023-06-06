import { RequestUrl } from '../types';
import Loader from './loader';

const { baseUrl, apiKey } = RequestUrl;

class AppLoader extends Loader {
    constructor() {
        super(baseUrl.value, {
            [apiKey.key]: apiKey.value,
        });
    }
}

export default AppLoader;
