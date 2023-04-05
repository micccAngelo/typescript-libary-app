import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Loadings from '../../Reusable/Loadings';
import GetDetailAPI from '../../API Services/GetDetail';
import './BookDetail.css';
import Buttons from '../../Reusable/Buttons';

interface BookData {
  id: number;
  title: string;
  author: string;
  publisher: string;
  publication_year: number;
  isbn: string;
  image_s: string;
}

const BookDetail: React.FC = () => {
  const [book, setBook] = useState<BookData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const bookData = await GetDetailAPI(Number(id));
        setBook(bookData);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  if (loading) {
    return <Loadings variant="danger" />;
  }

  return (
    <div>
      {book ? (
        <Card className="card">
          <Card.Img className="card_img" variant="top" src={book[0].image_s} />
          <Card.Body>
            <Card.Title>{book[0].title}</Card.Title>
            <Card.Text>
              Author: {book[0].author} <br />
              Publisher: {book[0].publisher} <br />
              Publication year: {book[0].publication_year} <br />
              ISBN: {book[0].isbn} <br />
            </Card.Text>
            <div className="buttons">
              <Buttons variant="primary" label="Back" href={'/'} />
            </div>
          </Card.Body>
        </Card>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <h1>There is no book with that ID</h1>
        </div>
      )}
    </div>
  );
};

export default BookDetail;
