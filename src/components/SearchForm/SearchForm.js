import React from 'react';
import './SearchForm.css';

class SearchForm extends React.Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const searchTerm = formData.get('search');
        this.props.onSubmit(searchTerm);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="input-group half-width">
                    <label htmlFor="search" className="sr-only">Search</label>
                    <div className="input-group-prepend">
                        <div className="input-group-text"><i className="fas fa-search"></i></div>
                    </div>
                    <input type="text" 
                        className="form-control form-control-lg" 
                        name="search" 
                        defaultValue={this.props.searchTerm}
                        onChange={this.handleChange}
                        placeholder="Search" />
                    <div className="input-group-append">
                        <button type="submit" className="btn btn-primary btn-lg">
                            Search
                        </button>
                    </div>
                </div>
            </form>
        );
    }
};

export default SearchForm;