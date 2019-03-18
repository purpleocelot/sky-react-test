import React from 'react';
import './Pagination.css';

class Pagination extends React.Component {

  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
      event.preventDefault();
      const { destination } = event.target.dataset;
      console.log(destination);
      this.props.onNavigate(destination);
  }

  renderPageBtn(page, currentpage) {
    if (Number(page) === Number(currentpage)) return (
      <li key={page.toString()} className="page-item">
        <span className="page-link current" disabled>{page}</span>
      </li>
    );

    return (
      <li key={page.toString()} className="page-item">
        <button className="page-link" onClick={this.handleClick} data-destination={page}>{page}</button>
      </li>
    );
  }

  renderNavBtn(label, pageCount, currentPage) {
    // Previous & Next buttons

    let current = Number(currentPage);
    let max = Number(pageCount);
    if ((label === 'Next' && current === max) || (label === 'Previous' && current === 1)) return null;

    let icon = label === 'Next' ? 'fas fa-forward' : 'fas fa-backward';
    let destinationPage = current + (label === 'Next' ?  1 : -1);

    return (
      <li key={label} className="page-item">
        <button className="page-link" aria-label={label} onClick={this.handleClick}>
          <span aria-hidden="true"><i className={icon} data-destination={destinationPage}></i></span>
          <span className="sr-only">{label}</span>
        </button>
      </li>
    );
  }

  render() {
    return (
      <nav aria-label="Search results navigation">
        <ul className="pagination">
          {this.renderNavBtn('Previous', this.props.pageCount, this.props.currentPage)}

          {[...Array(this.props.pageCount)].map((x, p) =>
            this.renderPageBtn(p + 1, this.props.currentPage)
          )}

          {this.renderNavBtn('Next', this.props.pageCount, this.props.currentPage)}
        </ul>
      </nav>
    );
  };
}

export default Pagination;