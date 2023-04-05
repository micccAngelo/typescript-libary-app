import BaseURL from './Base URL/BaseURL'
import { AxiosResponse } from 'axios';

export const DeleteAPI = async (book_id: number): Promise<boolean> => {
  const user_id = localStorage.getItem('user_id');
  try {
    const response: AxiosResponse = await BaseURL.delete(
      `/perpustakaan/api/v1/cart?user_id=${user_id}&book_id=${book_id}`
    );
    const { data } = response;
    if (data.status && data.message === 'Success') {
      console.log(data.message);
      return true;
    } else {
      return Promise.reject();
    }
  } catch (error: any) {
    console.log(error);
    return Promise.reject(error);
  }
};

export default DeleteAPI;
