import React from 'react';
import PropTypes from 'prop-types';
import './Blockquote.css';

/**
 * Appears as a raised card with the content of a given quote as
 * well as the quote's author
 */
const Blockquote = props => {
    const { author, children } = props;
    return (
        <div className="Blockquote">
            <blockquote className="Blockquote__quotation">
                {children}
            </blockquote>
            <span className="Blockquote__author">&mdash; {author}</span>
        </div>
    );
};

export default Blockquote;

Blockquote.propTypes = {
    /** Author of the quote inserted with the `children` prop */
    author: PropTypes.string.isRequired,
    /** Content for the blockquote */
    children: PropTypes.any.isRequired,
};
