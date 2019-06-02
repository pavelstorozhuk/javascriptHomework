
const updateCartItems = (cartItems, item, index) => {

    if (item.count === 0) {
        return cartItems.filter(cartItem => cartItem.id !== item.id);
    }

    if (index === -1) {
        return [...cartItems, item];
    }

    return [...cartItems.slice(0, index),
        item,
        ...cartItems.slice(index + 1)
    ];
}

const updateCartItem = (book, item = {}, quantity) => {

    const {
        id = book.id,
            count = 0,
            title = book.title,
            total = 0
    } = item;

    return {
        id,
        title,
        count: count + quantity,
        total: total + quantity * book.price
    };
}

const updateOrder = (state, bookId, quantity) => {
    const {
        bookList: {
            books
        },
        shoppingCart: {
            cartItems
        }
    } = state;
    const book = books.find(item => item.id === bookId);
    const cartIndex = cartItems.findIndex((item) => item.id === bookId);
    const item = cartItems[cartIndex];
    let newItem = updateCartItem(book, item, quantity);

    return {
        orderTotal: 0,
        cartItems: updateCartItems(cartItems, newItem, cartIndex),

    }
}



const updateShoppingCart = (state, action) => {
    if (state === undefined) {
        return {
            cartItems: [],
            orderTotal: 0,
        }
    }

    switch (action.type) {
        case 'BOOK_ADDED_TO_CART': {
            return updateOrder(state, action.payload, 1);
        }

        case 'BOOK_REMOVED_FROM_CART': {
            return updateOrder(state, action.payload, -1);
        }
        case 'ALL_BOOKS_REMOVED_FROM_CART': {
            const book = state.shoppingCart.cartItems.find(item => item.id === action.payload);
            return updateOrder(state, action.payload, -book.count);
        }

        default:
            return state.shoppingCart;
    }
}

export default updateShoppingCart ;