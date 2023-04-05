import BaseURL from './Base URL/BaseURL'

type Book = {
    id: number;
    isbn: string;
    title: string;
    author: string;
    publication_year: number;
    publisher: string;
    image_s: string;
    image_m: string;
    image_l: string;
    stok: number;
    average_ratting: number;
    rattings_count: number;
}

type ApiResponse = {
  status: boolean;
  message: string;
  data: {
    total_page: number;
    data_per_page: Book[];
  }
}

type GetBooksResponse = {
  books: Book[];
  totalPages: number;
}

const GetBooksAPI = async (currentPage: number): Promise<GetBooksResponse> => {
  try {
    const response = await BaseURL.get<ApiResponse>(
      `/perpustakaan/api/v1/book`,
      {
        params: {
          page: currentPage,
          limit: 20,
        },
      }
    );
    const { data } = response;
    if (data.status && data.message === 'Success') {
      const updatedBooks = data.data.data_per_page.map((book: Book) => ({
        ...book,
        loading: false
      }));
      const totalPages = data.data.total_page;
      return { books: updatedBooks, totalPages };
    } else {
      return Promise.reject();
    }
  } catch (error) {
    console.log(error);
    throw error;
  } 
};

export default GetBooksAPI;
