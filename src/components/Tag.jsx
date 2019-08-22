import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import generateRandomString from './generateRandomString';
import getDisplayClassName from './getDisplayClassName';
import './Tag.scss';

/**
 * Represents an attribute a quote can be labelled with. Allows for a 
 * color and variant from a set list to be provided.
 */
const Tag = props => {
    const { color, inputName, isChecked, tagClasses, text, variant } = props;
    const checkboxId = `${inputName}_${generateRandomString()}`;
    const tagDisplayClassName = getDisplayClassName('Tag', color, variant); // Get CSS class for color and variant of the tag

    return (
        <div className={classnames('Tag', tagDisplayClassName, tagClasses)}>
            {isChecked ?
            <input className="Tag__checkbox" type="checkbox" name={inputName} id={checkboxId} checked />
            :
            <input className="Tag__checkbox" type="checkbox" name={inputName} id={checkboxId} />}
            <label className="Tag__button" htmlFor={checkboxId}>
                <span className="Tag__text">
                    {text}
                </span>
            </label>
        </div>
    );
};

export default Tag;

Tag.propTypes = {
    /** Color options for a tag */
    color: PropTypes.oneOf(['default']),
    /**
     * Name for the checkbox HTML `<input />`, also used as part of an ID
     * for the checkbox HTML `<input />`
     */
    inputName: PropTypes.string.isRequired,
    /** Determines whether the checkbox is checked on page load */
    isChecked: PropTypes.bool,
    /** Extra CSS classes to attach to the containing HTML `<div>` */
    tagClasses: PropTypes.string,
    /** User-facing text for the tag */
    text: PropTypes.string.isRequired,
    /** Different variations of a given color scheme for a tag */
    variant: PropTypes.oneOf(['default', 'outline']),
};

Tag.defaultProps = {
    color: 'default',
    isChecked: false,
    tagClasses: '',
    variant: 'default',
};
