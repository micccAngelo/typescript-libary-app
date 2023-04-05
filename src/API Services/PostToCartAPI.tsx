import BaseURL from './Base URL/BaseURL';

const PostToCartAPI = async (user_id: String, book_id: number): Promise<boolean> => {
  try {
    const response = await BaseURL.post(
      `/perpustakaan/api/v1/cart`,
      {
        "user_id": user_id,
        "book_id": book_id,
      }
    );
    const { data } = response;
    console.log(data)
    if (data.status === true && data.code === 200) {
      if (data.message === 'Data cart Created') {
        return true;
      } else {
        return Promise.reject();
      }
    } 
  } catch (error) {
    console.log(error);
  }
  return false;
};

export default PostToCartAPI;
