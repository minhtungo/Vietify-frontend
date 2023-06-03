// import React, { createContext, useEffect, useState } from 'react';

// const defaultWishlistContext = {
//   wishlist: {
//     items: [],
//   },
//   loading: false,
//   actions: {
//     addItem: async () => {},
//     removeItem: async () => {},
//   },
// };

// const WishlistContext = createContext(defaultWishlistContext);
// export default WishlistContext;

// const WISHLIST_ID = 'wishlist_id';
// const isBrowser = typeof window !== 'undefined';

// export const WishlistProvider = (props) => {
//   const [wishlist, setWishlist] = useState(defaultWishlistContext.wishlist);
//   const [loading, setLoading] = useState(defaultWishlistContext.loading);

//   const setWishlistItem = (wishlist) => {
//     if (isBrowser) {
//       localStorage.setItem(WISHLIST_ID, wishlist.id);
//     }
//     setWishlist(wishlist);
//   };

//   useEffect(() => {
//     const initializeWishlist = async () => {
//       const existingWishlistId = isBrowser
//         ? localStorage.getItem(WISHLIST_ID)
//         : null;

//       if (existingWishlistId && existingWishlistId !== 'undefined') {
//         try {
//           const response = await fetch(`/store/wishlist/${existingWishlistId}`);

//           if (data) {
//             setWishlistItem(data);
//             return;
//           }
//         } catch (e) {
//           localStorage.setItem(WISHLIST_ID, null);
//         }
//       }

//       if (region) {
//         try {
//           const { data } = await client.axiosClient.post('/store/wishlist', {
//             region_id: region.id,
//           });

//           setWishlistItem(data);
//           setLoading(false);
//         } catch (e) {
//           console.log(e);
//         }
//       }
//     };

//     initializeWishlist();
//   }, [client, region]);

//   const addWishItem = async (product_id) => {
//     setLoading(true);
//     try {
//       const { data } = await client.axiosClient.post(
//         `/store/wishlist/${wishlist.id}/wish-item`,
//         { product_id }
//       );
//       setWishlistItem(data);
//       setLoading(false);
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   const removeWishItem = async (id) => {
//     setLoading(true);
//     try {
//       const { data } = await client.axiosClient.delete(
//         `/store/wishlist/${wishlist.id}/wish-item/${id}`
//       );
//       setWishlistItem(data);
//       setLoading(false);
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   return (
//     <WishlistContext.Provider
//       {...props}
//       value={{
//         ...defaultWishlistContext,
//         loading,
//         wishlist,
//         actions: {
//           addWishItem,
//           removeWishItem,
//         },
//       }}
//     />
//   );
// };
