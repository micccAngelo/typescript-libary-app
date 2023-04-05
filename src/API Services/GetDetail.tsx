import BaseURL from './Base URL/BaseURL';

const GetDetailAPI = async (id: number): Promise<any> => {
  try {
    const response = await BaseURL.get(`/perpustakaan/api/v1/book/${id}`);
    const { data } = response;
    if (data.status && data.message === 'Success') {
      return data.data;
    } else {
      return Promise.reject();
    }
  } catch (error) {
    return Promise.reject();
  }
};

export default GetDetailAPI;
