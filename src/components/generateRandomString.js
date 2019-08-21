/**
 * Generate a random string of alphanumeric characters that
 * can be used as part of a unique key or id
 *
 * @author Xuejia Chen <570171025@qq.com>
 *
 * @see {@link https://gist.github.com/6174/6062387} for original answer
 */
const generateRandomString = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

export default generateRandomString;