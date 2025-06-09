import axios, { type AxiosResponse } from 'axios';

type ApiResponse<T> = {
    message: string;
    data: T;
};

export async function safeRequest<T, R = T>(
    axiosCall: () => Promise<AxiosResponse<ApiResponse<T>>>,
    transformer?: (data: T) => R
): Promise<ApiResponse<R>> {
    try{
        const response = await axiosCall();
        const { message, data } = response.data;
        return {
            message,
            data: transformer ? transformer(data) : (data as unknown as R),
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data?.message || 'Unknown API error.'
            throw new Error(message);
        }
        throw new Error('Unexpected error.')
    }
}