import { useEffect } from "react";
import { createContext, useState } from "react";
// import { useLocation } from "react-router-dom";


export const Context = createContext();
//Here AppContext having children 
//The property of children is to fetch all the chidren compoment like home , header , category , singleproduct , newslatter, footer
const AppContext = ({ children }) => {
    const [categories, setCategories] = useState();
    const [products, setProducts] = useState();
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);//for upper
    const [cartSubTotal, setCartSubTotal] = useState(0);
    // const location = useLocation();
    useEffect(()=>{
        window.scrollTo(0,0);
    })
    useEffect(() => {
        let count=0;
        cartItems.map((item=>(count +=item.attributes.quantity)));
        setCartCount(count);
        let subTotal = 0;
        cartItems.map(
            (item) =>
                (subTotal += item.attributes.price * item.attributes.quantity)
        );
        setCartSubTotal(subTotal);
    }, [cartItems])

    const handelAddToCart = (product, quantity) => {
        let items = [...cartItems];
        let index = items.findIndex(p => p.id === product.id);
        if (index !== -1) {
            items[index].attributes.quantity += quantity
        } else {
            product.attributes.quantity = quantity
            items = [...items, product];
        }
        setCartItems(items);
    };
    const handelRemoveToCart = (product) => {
        let items = [...cartItems];
        items = items.filter((p) => p.id !== product.id);
        setCartItems(items);
    }
    const handelCartProductQuantity = (type, product) => {
        let items = [...cartItems];
        let index = items.findIndex(p => p.id === product.id);
        if (type === "inc") {
            items[index].attributes.quantity += 1;
        } else if (type === "dec") {
            if (items[index].attributes.quantity === 1) return;
            items[index].attributes.quantity -= 1;
        }
        setCartItems(items);
    }

    return <Context.Provider
        value={{
            categories,
            setCategories,
            products,
            setProducts,
            cartItems,
            setCartItems,
            cartCount,
            setCartCount,
            cartSubTotal,
            setCartSubTotal,
            handelAddToCart,
            handelRemoveToCart,
            handelCartProductQuantity
        }}
    >{children}
    </Context.Provider>
}
export default AppContext;