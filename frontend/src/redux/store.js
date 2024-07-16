import {configureStore} from "@reduxjs/toolkit"
import authSlice from "./reducer/auth"
import { userAPI } from "./api/api"
import propertySlice from "./reducer/singleProperty"


export const store = configureStore({
    reducer:{
        [authSlice.name]:authSlice.reducer,
        [propertySlice.name]:propertySlice.reducer,
        [userAPI.reducerPath]:userAPI.reducer
    },
    middleware: (mid) => [
        ...mid(),
        userAPI.middleware,
       
      ],
   
})