import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import getDisplayClassName from './getDisplayClassName';
import './Button.css';

/**
 * Button that uses the HTML `<button>` element as its base. Allows for a 
 * color and variant from a set list to be provided.
 */
const Button = props => {
    const { buttonClasses, children, color, variant, ...rest } = props;
    const buttonDisplayClassName = getDisplayClassName('Button', color, variant); // Get CSS class for color and variant of the button

    return (
        <button className={classnames('Button', buttonDisplayClassName, buttonClasses)} {...rest}>
            <span className="Button__label">{children}</span>
        </button>
    );
};

export default Button;

Button.propTypes = {
    /** Extra CSS classes to attach to the HTML `<button>` */
    buttonClasses: PropTypes.string,
    /** Content for the button */
    children: PropTypes.any.isRequired,
    /** Different colors for a button */
    color: PropTypes.oneOf(['default', 'primary']),
    /** Different variations of a given color scheme for a button */
    variant: PropTypes.oneOf(['default', 'contained']),
};

Button.defaultProps = {
    buttonClasses: '',
    color: 'default',
    variant: 'default',
};
