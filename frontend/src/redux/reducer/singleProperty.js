import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    property:null,
    loader:true
}

const propertySlice = createSlice({
    name:"property",
    initialState,
    reducers:{
        propertyExist:(state,action)=>{
            state.property = action.payload
            state.loader = false
        }
    }
})

export default propertySlice;

export const {propertyExist} = propertySlice.actions