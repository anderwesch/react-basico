function ButtonCart (props) {
    return (
        <button className={ `button-cart ${ props.isActive ? "active" : "" }` } onClick={() => props.handleButtonClick() }>
            { props.isActive ? "Remover do Carrinho" : "Adicionar ao carrinho" }
        </button>
    );
}

export default ButtonCart;