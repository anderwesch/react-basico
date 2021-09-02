import React, { useEffect, useState } from 'react';
import ButtonCart from '../ButtonCart';
import "./styles.css"

function Store(props) {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [cartTotalItems, setCartTotalItems] = useState(0);

    useEffect(() => {
        console.log("mount");
        async function fetchData() {
            const response = await fetch("https://fakestoreapi.com/products/");
            const products = await response.json();
            setProducts(products);
        }
        fetchData();
    }, []);

    useEffect(() => {
        setCartTotalItems(cart.length);
    }, [cart]);

    function handleClick(productId) {
        const itemIndex = cart.findIndex(id => id === productId);
        if (itemIndex > -1) {
            cart.splice(itemIndex, 1);
            setCart(cart.filter(id => id !== productId));
        } else {
            setCart([...cart, productId]);
        }
    }

    function isCart(productId) {
        return cart.find(id => id === productId);
    }

    function convertCurrency(number) {
        const currency = number.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        return currency;
    }

    return (
        <div>
            <nav className="menu">
                { cartTotalItems } itens no carrinho 
            </nav>
            <div className="product">
                {
                    products.map((product) => (
                        <div className="product-item" key={product.id}>
                            <div className="product-image">
                                <img src={product.image} alt={product.title} />
                            </div>
                            <h2 className="product-title">{ product.title }</h2>
                            <div className="product-price">{ convertCurrency(product.price) }</div>
                            <ButtonCart isActive={isCart(product.id)} handleButtonClick={(event) => { handleClick(product.id) }} />
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Store;