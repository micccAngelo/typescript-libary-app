import './Cart.css';
import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Buttons from '../../Reusable/Buttons';
import Loadings from '../../Reusable/Loadings';
import Modals from '../../Reusable/Modals';
import DeleteAPI from '../../API Services/deleteAPI';
import GetCartAPI from '../../API Services/GetCartAPI';

interface CartItem {
    id: number;
    title: string;
    image_s: string;
    author: string;
    publication_year: string;
    user_id: string;
  }
  
  interface CartProps {
    match?: any;
  }
  
  function Cart({ match }: CartProps): JSX.Element {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
  
    useEffect(() => {
      setLoading(true);
      GetCartAPI().then((data: CartItem[]) => {
        setCartItems(data);
        setLoading(false);
      });
    }, []);
  
    const deleteCartItem = async (user_id: string, book_id: number, item: CartItem) => {
      const success: boolean = await DeleteAPI(book_id);
      console.log(success)
      if (success) {
        setShowModal(true);
        GetCartAPI().then((data: CartItem[]) => {
          setCartItems(data);
          setLoading(false);
        });
      }
    };
    
    return (
      <div className='cart'>
        <h1 className='cartTitle'>Cart</h1>
        {loading ? (
          <Loadings variant="danger" />
        ) : (
          <>
            {cartItems && cartItems.length > 0 ? (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th className='no'>No</th>
                    <th className='title'>Title</th>
                    <th className='image'>Image</th>
                    <th className='author'>Author</th>
                    <th className='year'>Published year</th>
                    <th className='action'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item: CartItem, index: number) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.title}</td>
                      <td><img className='book_image' alt={item.title} src={item.image_s}/></td>
                      <td>{item.author}</td>
                      <td>{item.publication_year}</td>
                      <td>
                        <Buttons variant='danger' label='Delete' onClick={() => deleteCartItem(item.user_id, item.id, item)}/>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <div className="text-center">
                No items in cart
              </div>
            )}
          </>
        )}
        <Modals
          show={showModal}
          onHide={() => setShowModal(false)}
          title="Success!"
          message="Item has been deleted from cart."
        />
      </div>
    );  
  }
  
  export default Cart;
