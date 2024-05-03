import { createContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const url = 'http://localhost:4000';
    const [token, setToken] = useState("");
    const [listMakanan, setListMakanan] = useState([]);


    const addToCart = async (itemId) => {
        if(!cartItems[itemId]) {
            setCartItems((prev) => ({...prev, [itemId]:1}))
        }else {
            setCartItems((prev) => ({...prev, [itemId] : prev[itemId]+1}))
        }

        if (token) {
            await axios.post(url + "/api/cart/add", {itemId}, {headers:{token}})
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({...prev,[itemId] : prev[itemId] - 1}))
        if (token) {
            await axios.post(url + "/api/cart/remove", {itemId}, {headers:{token}})
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;

        for(const item in cartItems) {
            if(cartItems[item] > 0) {
                let itemInfo = listMakanan.find((product) => product._id === item);
                totalAmount += itemInfo.harga * cartItems[item];
            }
        }
        return totalAmount;
    }

    // menampilkan list makanan dari database
    const fetchListMakanan = async () => {
        const response = await axios.get(url + "/api/food/list");
        setListMakanan(response.data.data)
    }

    const loadCartData = async (token) => {
        const response = await axios.post(url + "/api/cart/get", {},{headers:{token}})
        setCartItems(response.data.cartData);
    }

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"));
        }
        async function loadData() {
            await fetchListMakanan();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    },[]);

    const contextValue = {
        listMakanan, cartItems, setCartItems, addToCart, removeFromCart, getTotalCartAmount, url, token, setToken
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider> 
    )
}

export default StoreContextProvider