import  React, {Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import { withBookstoreService } from '../hoc';
import {  fetchBooks, bookAddedToCart } from '../actions';
import BookListItem from '../book-list-item';
import Spinner from '../spinner';
import {compose} from '../../utils';
import "./book-list.css";
import ErrorIndicator from '../error-indicator';

const BookList =({books, onAddedToCart}) =>{
    return (<ul className="book-list">
    {
        books.map((book) => {
            return (<li key={book.id}>
                        <BookListItem onAddedToCart={() => onAddedToCart(book.id)} book={book}/>
                    </li>)
        })
    }
       </ul>)
}

class BookListContainer extends Component {

    componentDidMount(){
        const { fetchBooks } = this.props;
        fetchBooks();
    }

    render(){
        const {books, loading, error, onAddedToCart} = this.props;
        if (loading){
            return <Spinner/>;
        }

        if(error){
            return <ErrorIndicator/>;
        }

        return <BookList onAddedToCart={onAddedToCart} books ={books} />
    }
}
const mapStateToProps = ({bookList:{books, loading, error}}) =>{
    return {
        books,
        loading,
        error
    }
}

/*const mapDispatchToProps =(dispatch) => {
    return bindActionCreators ({
                                    booksLoaded
                               }, dispatch);

}*/

const mapDispatchToProps =  (dispatch, ownProps) =>{
    const {bookstoreService} = ownProps;

    return bindActionCreators ({
        fetchBooks : fetchBooks(bookstoreService),
        onAddedToCart: bookAddedToCart,
    }, dispatch);
}

export default  compose(withBookstoreService(), connect(mapStateToProps, mapDispatchToProps))(BookListContainer);