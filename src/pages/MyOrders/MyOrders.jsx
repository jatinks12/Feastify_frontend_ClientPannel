// import React, { useContext, useEffect, useState } from 'react'
// import { StoreContext } from '../../context/storeContext.jsx/StoreContext';
// import axios from 'axios';
// import { assets } from '../../assets/assets';

// const MyOrders = () => {
//   const {token}= useContext(StoreContext);
//   const [data, setData]  = useState([]);

//   const fetchOrders  = async () => {
//   const response =  await  axios.get("http://localhost:8080/api/orders", {headers:{"Authorization":`Bearer ${token}`}})
      
//   setData(response.data);
//   };


//    useEffect(() => {
//       if(token) {
//         fetchOrders();
//       }
//    },[token]);

//   return (
//   <div className='container'>
//     <div className='py-5 row justify-content-center'>
//       <div className='col-11 cart'>
//         <table className='table table-responsive'>
//           <tbody>
//             {
//               data.map((order ,index) => {
//                 return(
//                   <tr key = {index}>
//                     <td>
//                       <img src ={assets.logo} alt="" height={48} width={48}/>
//                     </td>
//                     <td>{order.orderedItems.map((item,index)=>{
//                       if(index === order.orderedItems.length-1){
//                         return item.name + " * " + item.quantity;
//                       }else{
//                         return item.name+" * "+ item.quantity+ " , ";
//                       }
//                     })}</td>
//                     <td>&#8377;{order.amount}</td>
//                     <td>Items: {order.orderedItems.length}</td>
//                     <td className='fw-bold text-capitalize'>&#x25cf;{order.orderStatus}</td>
//                     <td>
//                       <button className='btn btn-sm btn-warning' onClick={fetchOrders}>
//                         <i className='bi bi-arrow-clockwise'></i>
//                       </button>
//                     </td>
//                   </tr>
//                 )
//               })
//             }
//           </tbody>
//         </table>
//       </div>
//     </div>
//   </div>
//   )
// }

// export default MyOrders;

import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/storeContext.jsx/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';
import "./MyOrders.css"
const MyOrders = () => {
  const { token } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("http://localhost:8080/api/orders", {
        headers: { "Authorization": `Bearer ${token}` }
      });

      console.log("Backend response:", response);      // Full response
      console.log("Backend data:", response.data);     // Only data

      // Ensure we always have an array
      setOrders(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to fetch orders. Please try again.");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  if (loading) return <div className="container py-5">Loading orders...</div>;
  if (error) return <div className="container py-5 text-danger">{error}</div>;

  return (
    <div className='container'>
      <div className='py-5 row justify-content-center'>
        <div className='col-11 cart'>
          <table className='table table-responsive'>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>
                    <img src={assets.logo} alt="" height={48} width={48} />
                  </td>
                  <td>
                    {(order.orderedItems || []).map((item, idx) => {
                      const separator = idx === (order.orderedItems?.length || 0) - 1 ? "" : " , ";
                      return `${item.name} * ${item.quantity}${separator}`;
                    })}
                  </td>
                  <td>&#8377;{order.amount.toFixed(2)}</td>
                  <td>Items: {(order.orderedItems || []).length}</td>
                  <td className='fw-bold text-capitalize'>&#x25cf;{order.orderStatus}</td>
                  <td>
                    <button className='btn btn-sm btn-warning' onClick={fetchOrders}>
                      <i className='bi bi-arrow-clockwise'></i>
                    </button>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center">No orders found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
