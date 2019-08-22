import React, { Component } from 'react';
import Blockquote from './Blockquote';
import Button from './Button';
import Form from './Form';
import QuoteService from './services/QuoteService';
import './quote.scss';

class Quote extends Component {
  constructor() {
    super();
    this.state = {
      currentQuote: null,
      tags: [],
    };
  }

  componentDidMount() {
    this.setState({ tags: QuoteService.getUniqueTags().sort() }); // Get the tags for the user to pick from, sorted alphabetically
  }

  /**
   * Returns the submitted `formData` as an object
   */
  getFormDataObject = formData => {
    const data = {};
    for (const key of formData.keys()) {
      data[key] = formData.get(key);
    }
    return data;
  };

  handleReset = () => {
    this.setState({
      currentQuote: null,
    });
  };
  
  handleSubmit = event => {
    event.preventDefault(); // Prevent page from reloading
    const data = this.getFormDataObject(new FormData(event.target));
    const selectedTags = Object.keys(data);
    const filteredQuotes = QuoteService.getQuotesBySelectedTags(selectedTags);
    // Is either the single quote in `filteredQuotes` or a random quote if the length of `filteredQuotes` is larger than `1`
    let randomQuote = filteredQuotes.length === 1 ? filteredQuotes[0] : filteredQuotes[QuoteService.getRandomQuoteIndex(filteredQuotes.length)];

    this.setState({
      currentQuote: {
        author: randomQuote.author.name,
        tags: randomQuote.tags,
        text: randomQuote.text,
      },
    });
  };

  render() {
    const { currentQuote, tags } = this.state;

    return (
      <React.Fragment>
        {!currentQuote ?
        <Form
          className="container"
          onSubmit={this.handleSubmit}
          submitButtonColor="primary"
          submitButtonText="Generate quote"
          submitButtonVariant="contained"
          tags={tags}
          tagVariant="outline"
        /> : ''}
        {currentQuote ?
        <div className="container">
          <Button
            buttonClasses="margin-bottom--sm"
            color="primary"
            onClick={this.handleReset}
            type="reset"
          >
            <span className="icon--lg margin-right--xs">
              &laquo;
            </span>
            Generate another
          </Button>
          <Blockquote author={currentQuote.author}>
              {currentQuote.text}
          </Blockquote>
          {currentQuote.tags && currentQuote.tags.length > 0 ?
          <React.Fragment>
            <small className="color--grey font-size--sm margin-top--sm">Tags for this quote:
              {currentQuote.tags.map((tag, index) => {
                // List tags for this quote, insert comma after each if not the last tag
                return ` "${tag}${(index + 1) !== currentQuote.tags.length ? '", ' : '"'}`;
              })}
            </small>
          </React.Fragment> : ''}
        </div> : ''}
      </React.Fragment>
    );
  }
}

export default Quote;
