import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import Tag from './Tag';
import generateRandomString from './generateRandomString';
import './Form.scss';

/**
 * Form that provides interface for users to generate quotes and/or filter quotes to
 * generate by tag.
 */
const Form = props => {
    const {
        submitButtonColor,
        submitButtonText,
        submitButtonVariant,
        tagColor,
        tags,
        tagVariant,
        ...rest } = props;

    return (
        <form {...rest}>
            <Button
                color={submitButtonColor}
                type="submit"
                variant={submitButtonVariant}
            >
                {submitButtonText}
            </Button>
            {tags.length > 0 ?
            <div className="Form__inline-input-container">
                {tags.map((tag) => {
                    const tagInputName = tag.replace(/\s/g, ''); // Eliminate any spaces within the tag label
                    return (
                        <Tag
                            color={tagColor}
                            inputName={tagInputName}
                            key={`tag_${generateRandomString()}`}
                            tagClasses="Form__inline-input-container__input"
                            text={tag}
                            variant={tagVariant}
                        />
                    );
                })}
            </div> : ''
            }
        </form>
    );
};

export default Form;

Form.propTypes = {
    /** 
     * Color of the submit button. 
     * Must match one of the options in the `PropTypes.oneOf()` array in `Button.jsx`
     */
    submitButtonColor: PropTypes.string,
    /** Text for the submit button */
    submitButtonText: PropTypes.string,
    /** 
     * Variant of the submit button. 
     * Must match one of the options in the `PropTypes.oneOf()` array in `Button.jsx`
     */
    submitButtonVariant: PropTypes.string,
    /** 
     * Color for each tag (available when the `tags` prop has at least one value). 
     * Must match one of the options in the `PropTypes.oneOf()` array in `Tag.jsx`
     */
    tagColor: PropTypes.string,
    /** Array of tag labels */
    tags: PropTypes.arrayOf(PropTypes.string),
    /** 
     * Variant for each tag (available when the `tags` prop has at least one value). 
     * Must match one of the options in the `PropTypes.oneOf()` array in `Tag.jsx`
     */
    tagVariant: PropTypes.string,
};

Form.defaultProps = {
    submitButtonColor: 'default',
    submitButtonText: 'Submit',
    submitButtonVariant: 'default',
    tagColor: 'default',
    tags: [],
    tagVariant: 'default',
};
