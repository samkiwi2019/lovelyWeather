import axios from 'axios';
import * as R from 'ramda';

class HttpRequest {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.queue = {};
    }
    getInsideConfig() {
        const config = {
            baseURL: this.baseUrl,
            headers: {},
            withCredentials: false, // carry cookies
        };
        return config;
    }
    destroy(url) {
        delete this.queue[url];
    }
    interceptors(instance, url) {
        instance.interceptors.request.use(
            config => {
                if (!Object.keys(this.queue).length) {
                    // do something before sending requests
                }
                this.queue[url] = true;
                return config;
            },
            error => {
                return Promise.reject(error);
            }
        );
        instance.interceptors.response.use(
            res => {
                this.destroy(url);
                const { data, status } = res;
                // do something after getting responses
                return { data, status };
            },
            error => {
                this.destroy(url);
                let errorInfo = error.response;
                try {
                    if (!errorInfo) {
                        const {
                            request: { status },
                            config,
                        } = JSON.parse(JSON.stringify(error));
                        errorInfo = {
                            data: '',
                            status,
                            request: { responseURL: config.url },
                        };
                    }

                    if (!errorInfo.data) {
                        switch (errorInfo.status) {
                            case 400:
                                errorInfo.data = 'Request error (400)';
                                break;
                            case 401:
                                errorInfo.data = 'Unauthorized, please log in again (401)';
                                break;
                            case 403:
                                errorInfo.data = 'Access denied (403)';
                                break;
                            case 404:
                                errorInfo.data = 'Content not found (404)';
                                break;
                            case 408:
                                errorInfo.data = 'Request timeout (408)';
                                break;
                            case 500:
                                errorInfo.data = 'Server error (500)';
                                break;
                            case 501:
                                errorInfo.data = 'Service not implemented (501)';
                                break;
                            case 502:
                                errorInfo.data = 'Network error (502)';
                                break;
                            case 503:
                                errorInfo.data = 'Service unavailable (503)';
                                break;
                            case 504:
                                errorInfo.data = 'Gateway timeout(504)';
                                break;
                            case 505:
                                errorInfo.data = 'HTTP version is not supported(505)';
                                break;
                            default:
                                errorInfo.data = `Connection error(${errorInfo.status})!`;
                        }
                    }

                    return Promise.reject(errorInfo);
                } catch (error) {
                    console.log(`axios catch block ==>`, error);
                }
            }
        );
    }
    request(options) {
        const instance = axios.create();
        options = R.mergeDeepRight(this.getInsideConfig(), options);
        this.interceptors(instance, options.url);
        return instance(options);
    }
}
export default HttpRequest;
