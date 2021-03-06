import React, { useEffect, useState } from 'react'
import { Navbar, Products } from './Components';
import Cart from './Components/Cart/Cart';
import { commerce } from './library/Commerce';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Checkout from './Components/CheckoutForm/Checkout/Checkout';

function App() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});

    const fetchProducts = async () => {
        const { data } = await commerce.products.list();

        setProducts(data);
    };

    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve());
    };

    const handleAddToCart = async (productId, quantity) => {
        const item = await commerce.cart.add(productId, quantity);

        setCart(item.cart);
    };

    const handleUpdateCartQty=async (productId, quantity)=>{
const response  =await commerce.cart.update(productId, {quantity});

setCart(response.cart);
    }

const handleRemoveFromCart=async (productId)=>{
    const {cart}= await commerce.cart.remove(productId);
    setCart(cart);
}

const handleEmptyCart=async ()=>{
    const {cart}= await commerce.cart.empty();
    setCart(cart)
}


    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);


    return (
        <Router>
            <div>
                <Navbar totalItems={cart.total_items} />
                <Switch>
                    <Route exact path='/'>
                        <Products products={products} onAddToCart={handleAddToCart}  />
                    </Route>
                    <Route path='/cart'>
                        <Cart 
                        cart={cart} 
                        handleUpdateCartQty={handleUpdateCartQty}
                        handleRemoveFromCart={handleRemoveFromCart}
                        handleEmptyCart={handleEmptyCart}
                        />
                    </Route>

<Route exact path='/checkout'>
<Checkout cart={cart} />
</Route>

                </Switch>

            </div>
        </Router>
    )
}

export default App;
