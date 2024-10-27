import { DefaultResponse } from '../types/api-service-types';
import { SignInResponse } from '../types/sign-in.types';
import HttpService from './http-service'

class ApiService extends HttpService{

    async signIn(data:any) {
        const {
            data: response,
            isError,
            error,
          } = await this.axiosRequest({
        url: '/auth/sign-in',
        method: 'POST',
        data
       })

       return { data: response as DefaultResponse<SignInResponse>, isError, error };
    }

    async signUp(data:any) {
        const {
            data: response,
            isError,
            error,
        } = await this.axiosRequest({
            url: '/auth/sign-up',
            method: 'POST',
            data
        })

       return { data: response as DefaultResponse<SignInResponse>, isError, error };
    }
}


export default new ApiService();