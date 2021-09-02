import React from 'react';
import './styles.css';

class Store extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { products: [], cart: [], cartTotalItems: 0 };
        this.handleClick = this.handleClick.bind(this);
    }

    async componentDidMount() {
        const response = await fetch("https://fakestoreapi.com/products/");
        const products = await response.json();

        this.setState({ products: products });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.cart !== this.state.cart) {
            this.setState({ cartTotalItems: this.state.cart.length });
        }
    }

    isCart(productId) {
        return this.state.cart.find(id => id === productId);
    }

    handleClick(productId) {
        this.setState((state) => {
			const itemIndex = state.cart.findIndex(id => id === productId);
			if (itemIndex > -1) {
				return { cart: state.cart.filter(id => id !== productId) };
			} else {
				return { cart: [...state.cart, productId] };
			}
		});
    }

    render() {
        return (
            <div>
                <nav className="menu">
                    { this.state.cartTotalItems } itens no carrinho 
                </nav>
                <div className="product">
                    {
                        this.state.products.map((product) => (
                            <div className="product-item" key={product.id}>
                                <div className="product-image">
                                    <img src={product.image} />
                                </div>
                                <h2 className="product-title">{ product.title }</h2>
                                <div className="product-price">{ product.price }</div>
                                <button className={ `button-cart ${ this.isCart(product.id) ? "active" : "" }` } onClick={(event) => { this.handleClick(product.id) }}>
                                    { this.isCart(product.id) ? "Remover do Carrinho" : "Adicionar ao carrinho" }
                                </button>
                            </div>
                        ))
                    }
                </div>
            </div>
        );
    }
}

export default Store;