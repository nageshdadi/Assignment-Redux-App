import { View, Text, Alert, FlatList, TouchableOpacity, StyleSheet,Image, Modal, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomStarRating from './StarRating';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from './redux/store';
import { addTocartAction, decrement, increment } from './redux/cartReducer';
export default function Shopping() {
  const dispatch = useDispatch()
  const {cartlist} = useSelector((state: RootState) => state.cartReducer);
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [modalVisible, setModalVisible] = useState(false);
    useEffect(() => {
        getProductData()
      }, []);
      const getProductData = async() =>{
        const responce =  await fetch('https://fakestoreapi.com/products')
        const data =  await responce.json()
        if(data){
         setProducts(data)
        }else{
         Alert.alert("Something went wrong!")
        }
      }

    const handleModalClose=()=>{
      setModalVisible(false)
      setSelectedProduct(null)
      }
  return (
    <View style={styles.maincontainer}>
        <View style={styles.herderCard}>
        <Text style={styles.headText}>Shopping</Text>
        </View>
        <View style={styles.bodyContainer}>
      <FlatList
        data={products}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }:{item:any}) => {
          const filteredItem = cartlist.filter((ecah)=>{
            return ecah.id === item.id
          })
            return(
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              setSelectedProduct(item);
              if(filteredItem.length === 0){
                setModalVisible(true);
              }
            }}
          >
            <Image source={{ uri: item.image }} resizeMode="contain" style={styles.productImage} />
            <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <View style={styles.starView}>
            <CustomStarRating rating={item.rating.rate.toString()}  />
            <Text style={{marginLeft:10}}>{item.rating.count}</Text>
            </View>
            <View style={[styles.starView, {justifyContent:'space-between',alignContent:'center'}]}>
              <Text style={styles.price}>Rs. {item.price}</Text>
             { filteredItem.length > 0 && <View style={{
                flexDirection:'row',
                alignItems:'center',
                backgroundColor:'#d1e2e3',
                width:'30%',
                justifyContent:"space-between",
                marginLeft:10,
                borderRadius:10,
              }}>
                <TouchableOpacity
                style={{width:'30%',alignItems:'center', justifyContent:'center'}}
                onPress={()=>{
                  dispatch(decrement(item.id))
                }}
                >
                  <Text style={{fontSize:25, fontWeight:'bold'}}>-</Text>
                </TouchableOpacity>
                <Text>{filteredItem[0].count}</Text>
                <TouchableOpacity
                  style={{width:'30%',alignItems:'center', justifyContent:'center'}}
                  onPress={()=>{
                    dispatch(increment(item.id))
                  }}
                >
                  <Text style={{fontSize:20, fontWeight:'bold'}}>+</Text>
                </TouchableOpacity>
              </View>}
            </View>
              <Text style={styles.category}>Category: {item.category}</Text>
            </View>
          </TouchableOpacity>
        )}}
      />
      </View>

      <Modal transparent={true} visible={modalVisible} animationType="slide">
        <View style={{flex:1,justifyContent: 'center', alignItems: 'center',backgroundColor: '#1E1E23bf',}}>
      <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor:"#fff" , elevation:8, padding:20, borderRadius:10,width:'87%'}}>
        <Image resizeMode="contain" source={{ uri: selectedProduct?.image  }} style={{ width: 150, height: 150, marginBottom:20 }} />
        <View style={{flexDirection:"row"}}>
        <Text>{"Description:"}</Text>
        <Text style={{width:"70%", marginLeft:10, textAlign:'left'}}>{selectedProduct?.description}</Text>
        </View>
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:"space-between", width:'90%', margin:10}}>
          <TouchableOpacity
          style={{backgroundColor:'red',
            alignItems:'center',
            justifyContent:'center',
            height:40,
            width:150,
            borderRadius:10
          }}
          onPress={()=>{
            setModalVisible(false)
            dispatch(addTocartAction(selectedProduct?.id))
          }}
          >

            <Text style={{color:'#fff'}}>Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={
            {backgroundColor:'#aeb5b5',
              alignItems:'center',
              justifyContent:'center',
              height:40,
              width:100,
              borderRadius:10
            }
          }
          onPress={handleModalClose}
          >
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
      </View>
    </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
    maincontainer: {},
      herderCard:{
        backgroundColor:'#43edf0',
        height:'6%',
        justifyContent:'center'
      },
      headText:{
        color:'#000',
        fontSize:20,
        fontWeight:'bold',
        textAlign:'center'
      }
    ,
    bodyContainer:{
        padding:10,
    },
    flatListContainer:{},
    card: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#fff',
        marginVertical: 5,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        borderColor:"#000",
        borderWidth:1
      },
      productImage: {
        width: 80,
        height: 120,
        borderRadius: 10,
        marginRight:10,
      },
      textContainer: {
        marginLeft: 10,
      },
      title: {
        fontSize: 16,
        width: 250,
        color:'#282829',
        fontWeight: 'bold',
      },
      price: {
        fontSize: 15,
        color: '#000',
        marginTop: 5,
        fontWeight:'600',
      },
      category: {
        fontSize: 12,
        color: '#666',
        marginTop: 5,
        width: 250,
      },
      starView:{
        flexDirection:'row',
      }
})

