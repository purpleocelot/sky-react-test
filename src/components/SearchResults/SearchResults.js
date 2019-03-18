import React from 'react';
import './SearchResults.css';
import ResultItem from './ResultItem/ResultItem';
import Pagination from './Pagination/Pagination';

class SearchResults extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentPage: 1
        };
    }

    doNavigate = (page) => {
        if (!page) return;

        console.log('nav', page);
        this.setState({ currentPage: page });
    };

    render() {
        if (!this.props.model.searchTerm) return null;

        if (!this.props.model.results || this.props.model.results.length === 0) return (
            <div className="search-results">
                <h4>No results for <i>{this.props.model.searchTerm}</i></h4>
            </div>
        );

        let startPos = (this.state.currentPage - 1) * 10;
        let chunk = this.props.model.results.slice(startPos, startPos + 10);
        let pluralisedResult = this.props.model.results.length > 1 ? 'Results' : 'Result'; 

        return (
            <div className="search-results">
                <h4>{this.props.model.results.length} {pluralisedResult} for <i>{this.props.model.searchTerm}</i></h4>
                <ul>
                    {chunk.map((result, index) => (
                        <ResultItem key={index} result={result} />
                    ))}
                </ul>
                <Pagination currentPage={this.state.currentPage} pageCount={this.props.model.pageCount} onNavigate={this.doNavigate} />
            </div>
        );
    }
};

export default SearchResults;