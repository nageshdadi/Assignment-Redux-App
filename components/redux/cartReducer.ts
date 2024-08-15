import { createSlice } from "@reduxjs/toolkit";
interface stateType {
    count:number
    cartlist:{
        id:string,
        count:number
    }[]
    modalVisible:boolean 
}
const initialState:stateType ={
    count:0,
    cartlist:[],
    modalVisible:false,
}

const cartSlice = createSlice({
    name: 'cartSlice',
    initialState,
    reducers: {
      increment: (state,actions) => {
            const filteredCount = state.cartlist.filter((each)=> each.id.toString() == actions.payload.toString())
            if(filteredCount){
                let itemCount = filteredCount[0].count + 1
                const updatedArry = state.cartlist.map((each)=>{
                    if(each.id === filteredCount[0].id){
                        return{
                            id:filteredCount[0].id,
                            count:itemCount
                        }
                    }else{
                        return each
                    }
                })
                state.cartlist = updatedArry
            }
        },
      decrement:(state,actions)=> {
        const filteredCount = state.cartlist.filter((each)=> each.id == actions.payload)
        if(filteredCount){
            let itemCount = filteredCount[0].count - 1
            if(itemCount <= 0){
                const filteredArry = state.cartlist.filter((each)=> each.id.toString() !== actions.payload.toString())
                state.cartlist = filteredArry
            }else{
                const updatedArry = state.cartlist.map((each)=>{
                    if(each.id === filteredCount[0].id){
                        return{
                            id:filteredCount[0].id,
                            count:itemCount
                        }
                    }else{
                        return each
                    }
                })
                state.cartlist = updatedArry
            }
        }
      },
      addTocartAction:(state,actions)=>{
        const itemData ={
            id: actions.payload,
            count:1
        }
        state.cartlist = [...state.cartlist,itemData]
      },
    },
  });

  export const {increment,decrement, addTocartAction} = cartSlice.actions
  export default cartSlice.reducer