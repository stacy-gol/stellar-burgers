import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { BurgerIngredient, Order } from '../../services/types';
import orderDetailsStyles from './order-details.module.css';
import { OrderDetail } from '../../services/types';
import { getOrder } from '../../services/order/orderSlice';
// import { selectIngredients, selectOrders } from '../../services/middleware/orderFeed/selectors';



// function OrderDetails() {
//     const { id } = useParams<{ id: string }>();
//   const dispatch = useDispatch();
//   const [order, setOrder] = useState<Order | null>(null);
//   const [loading, setLoading] = useState(true);
//   const orders = useSelector(selectOrders);
//   const ingredients = useSelector(selectIngredients);

  
//   useEffect(() => {
//     const getOrderDetails = async () => {
//       const orderData = await dispatch(getOrder(id));
//       if (orderData) {
//         setOrder(orderData);
//       }
//       setLoading(false);
//     };

//     getOrderDetails();
//   }, [dispatch, id]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!order) {
//     return <div>Order not found</div>;
//   }

//   const orderIngredients = order.ingredients.map(id => {
//     return ingredients.find((ingredient) => ingredient._id === id) || null;
// }).filter(ingredient => ingredient !== null);

//   const totalPrice = orderIngredients.reduce((acc, ingredient) => {
//     return acc + (ingredient ? ingredient.price : 0);
//   }, 0);

//   return (
//     <div className={orderDetailsStyles.container}>
//       <h1 className="text text_type_main-large mb-4">Order #{order.number}</h1>
//       <div className={orderDetailsStyles.ingredients}>
//         {orderIngredients.map((ingredient, index) => (
//           <div key={index} className={orderDetailsStyles.ingredient}>
//             <img src={ingredient?.image_mobile} alt={ingredient?.name} />
//             <p>{ingredient?.name}</p>
//             <p>{ingredient?.price}</p>
//           </div>
//         ))}
//       </div>
//       <div className={orderDetailsStyles.total}>
//         <span>Total:</span>
//         <span>{totalPrice}</span>
//       </div>
//     </div>
//   );
// };

// export default OrderDetails;
