import {
  combineReducers,
  configureStore,
  applyMiddleware,
} from "@reduxjs/toolkit";
import { composeWithDevTools } from "@redux-devtools/extension";
import {
  adminProductReducer,
  deleteProductReducer,
  newProductReducer,
  newReviewReducer,
  productReducer,
  searchproductReducer,
} from "./reducers/productReducer";
import { productDetailReducer } from "./reducers/productReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { cartReducer } from "./reducers/cartReducer";
import { userReducer } from "./reducers/userReducer";
import {
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
} from "./reducers/orderReducer";
import { addtowishlist } from "./actions/wishAction";
import { wishlistReducer } from "./reducers/wishlistReducer";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailReducer,
  searchedProducts: searchproductReducer,
  cartItems: cartReducer,
  user: userReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
  adminProducts: adminProductReducer,
  newProduct: newProductReducer,
  deletedProduct: deleteProductReducer,
  wishlistedProducts: wishlistReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
