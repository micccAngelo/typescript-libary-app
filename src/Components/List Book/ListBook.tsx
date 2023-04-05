import './ListBook.css'
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import Buttons from '../../Reusable/Buttons';
import Modals from '../../Reusable/Modals';
import GetBooksAPI from '../../API Services/GetBookAPI';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import Loadings from '../../Reusable/Loadings';
import PostToCartAPI from '../../API Services/PostToCartAPI';

interface Book {
  id: number;
  title: string;
  image_s: string;
  author: string;
  publication_year: number;
  stok: number;
}

function ListBook(): JSX.Element {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalFail, setModalFail] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const fetchBooks = async () => {
      const { books, totalPages } = await GetBooksAPI(currentPage);
      setBooks(books);
      setTotalPages(totalPages);
      setLoading(false);
    };
    fetchBooks();
  }, [currentPage]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleDetailsClick = (id: number) => {
    navigate(`/book/${id}`);
  };

  interface ButtonAddToCartProps {
    book: Book;
  }

  const ButtonAddToCart = (props: ButtonAddToCartProps) => {
    const [loading, setLoading] = useState<boolean>(false);

    const addToCart = (id: number) => {
        setLoading(true);
        const user_id = localStorage.getItem('user_id');
        if (user_id !== null) {
          PostToCartAPI(user_id, id)
            .then((success: boolean) => {
              if (success) {
                setShowModal(true);
              } else {
                setModalFail(true);
              }
              setLoading(false);
            })
            .catch((error: any) => {
              console.log(error);
              setModalFail(true);
              setLoading(false);
            });
        } else {
          console.log('user_id not found in local storage');
        }
      };

    return (
      <Buttons
        className="add"
        variant="success"
        onClick={() => addToCart(props.book.id)}
        disabled={props.book.stok === 0 || loading}
        label={'Add to cart'}
      />
    );
  };

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr className='table'>
            <th>No</th>
            <th className='title'>Title</th>
            <th>Image</th>
            <th className='author'>Author</th>
            <th className='publish_year'>Published year</th>
            <th className='stocks'>Stocks</th>
            <th className='action'>Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={7} style={{ textAlign: 'center' }}>
                <Loadings variant="danger" />
              </td> 
            </tr>
          ) : (
            books.length > 0 &&
              books.map((book, index) => (
                <tr key={book.id}>
                  <td>{(currentPage - 1) * 20 + index + 1}</td>
                  <td>{book.title}</td>
                  <td><img className='book_image' src={book.image_s} alt={book.title}/></td>
                  <td>{book.author}</td>
                  <td>{book.publication_year}</td>
                  <td>{book.stok}</td>
                  <td>
                    <Buttons className='detail' variant='primary' label='Details' onClick={() => handleDetailsClick(book.id)}/>
                    <ButtonAddToCart book={book}/>
                  </td>
                </tr>
              ))
          )}
        </tbody>
      </Table>
      <Modals
        show={showModal}
        onHide={() => setShowModal(false)}
        title="Success!"
        message="Item has been added to cart."
      />
      <Modals
        show={modalFail}
        onHide={() => setModalFail(false)}
        title="Failed!"
        message="Item is already in cart."
      />
      <div className='pagination'>
        <PaginationControl
          page={currentPage}
          between={2}
          total={260}
          limit={20}
          changePage={(page) => handlePageChange(page)}
          ellipsis={1}
        />
      </div>
    </div>
  );
}

export default ListBook;