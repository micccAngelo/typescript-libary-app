import BaseURL from './Base URL/BaseURL';

const GetCartAPI = async (): Promise<any> => {
    try {
      const user_id = localStorage.getItem('user_id');
      const response = await BaseURL.get(
        `/perpustakaan/api/v1/cart`,{
          params: {
            "user_id" : user_id,
          },
        }
      );
      
      if (response.status === 200 && response.data.message === "Success") {
        console.log(response.data.data);
        return response.data.data;
      } else {
        return Promise.reject();
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  export default GetCartAPI;
