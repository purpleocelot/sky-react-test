import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header/Header';
import SearchForm from './components/SearchForm/SearchForm';
import SearchResults from './components/SearchResults/SearchResults';

class App extends Component {

  defaultPageSize = 10;

  constructor(props) {
    super(props);

    this.state = {
      model: {}
    };
  }

  componentDidMount() {
    this.resetModel();

    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    if (searchParam) this.getData(searchParam);
  }

  resetModel = () => {
    this.setState({
      model: {
        searchTerm: null,
        results: [],
        page: null,
        pageSize: 10,
        pageCount: null
      }
    });
  }

  doSearch = (searchTerm) => {
    if (!searchTerm) return this.resetModel();

    this.getData(searchTerm);
  };

  getData = (searchTerm) => {
    // TODO: Move into a generic http service.
    // In a larger application, this would be moved out into an app-wide http service
    // which provides generic async methods for http get, post, put, etc. and 
    // returns the response as a promise or RxJs observable. It would also enable this
    // code to be unit tested with the generic http service being replaced with a mock.
    // For now, leave it here for simplicity.
    axios.get(`https://help-search-api-prod.herokuapp.com/search?query=${searchTerm}`)
      .then(response => {
        let resultCount = response.data.results ? response.data.results.length : 0;
        this.setState({
          model: {
            searchTerm: searchTerm,
            results: response.data.results,
            page: 1,
            pageSize: 10,
            pageCount: Math.floor(resultCount / 10)
          }
        });

        // TODO: The history.pushState code below does not work:
        // window.history.pushState({search: searchTerm}, 'Sky React Test', '/');
        // Investigate React Route to see if that will store the current search on the url
      })
      .catch(error => {
        // TODO: Present this error on the page in a user friendly format.  Not required in this test.
        console.log('There has been a problem contacting the server: ', error.message);
      });
  };

  render() {
    return (
      <div className="App">
        <Header />

        <div className="container">
          <SearchForm onSubmit={this.doSearch} searchTerm={this.state.model.searchTerm} />
          <SearchResults model={this.state.model} />
        </div>
      </div>
    );
  }
}

export default App;
