import React from 'react';
import './ResultItem.css';

class ResultItem extends React.Component {
  render() {
    return (
      <li>
        <a href={this.props.result.url}>{this.props.result.title}</a>
        <p>{this.props.result.description}</p>
      </li>
    );
  }
}

export default ResultItem;