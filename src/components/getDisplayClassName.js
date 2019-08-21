/**
 * Get a CSS class based on the name of the component and the desired
 * color/variant. Uses BEM naming convention.
 *
 * @param {string} component Name of the component for the modifiers
 * @param {string} color Lowercase string for the color modifier
 * @param {string} variant Lowercase string for the variant modifier, is added to the end of the color modifier
 */
const getDisplayClassName = (component, color, variant) => {
    const transformedColor = color === 'default' ? 'grey' : color;
    const colorClassName = `${component}--${transformedColor}`;

    if (variant && variant !== 'default') return `${colorClassName}--${variant}`;
    return colorClassName;
};

export default getDisplayClassName;
