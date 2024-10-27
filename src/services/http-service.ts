import axiosInstance from '../utils/axios'

export default class HttpService {

    async axiosRequest(obj:any): Promise<{ data: any, status: any, isError: boolean, error: any }>{
        let error;
        let isError = false;
        try {
            const {data, status} = await axiosInstance.request(obj);

            return {data, status, isError, error};
        } catch (err:any) {
            if (err.response && err.response.data) {
            if (typeof err.response.data === 'string') {
                error = err.response.data;
            } else {
                error = err.response.data.message || err.response.data.data;
            }
            } else {
                error = err.message;
            }
        }

        isError = true;

        return { data: null, status: 400, isError, error };
    }
    
}