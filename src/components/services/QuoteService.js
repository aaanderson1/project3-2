import quotesData from '../data/quotes.json';

/**
 * @classdesc Class with static methods for retrieving quotes, quote data, and tags.
 */
class QuoteService {
    /**
     * Filter for quotes labelled with tags selected by the user. Returns
     * an array of quotes that contain at least one tag from the
     * `selectedTags` array.
     *
     * @param {string[]} selectedTags List of tags selected by the user
     */
    static getQuotesBySelectedTags(selectedTags) {
        if (selectedTags.length < 1) return quotesData; // Only filter results if any tags were selected

        const filteredQuotes = [];

        for (const quote of quotesData) {
            for (const tag of quote.tags) {
                if (selectedTags.indexOf(tag) > -1) { // Check if this tag matches one of the tags selected by the user
                    filteredQuotes.push(quote); // If it does, push the `quote` into `filteredQuotes`
                    break; // End the loop so the quote isn't added more than once
                }
            }
        }

        return filteredQuotes;
    }

    /**
     * Returns a random number between `0` and the number of quotes to be picked from
     * @param {number} quoteArrayLength Number of quotes that can be randomly picked from
     */
    static getRandomQuoteIndex(quoteArrayLength) {
        return Math.floor(Math.random() * Math.floor(quoteArrayLength));
    }

    /**
     * Returns an array of each unique instance of a tag from the source data
     */
    static getUniqueTags() {
        const uniqueTags = [];

        for (const quote of quotesData) {
            for (const tag of quote.tags) {
                if (uniqueTags.indexOf(tag) === -1) uniqueTags.push(tag); // Push tag into array if it isn't there already
            }
        }

        return uniqueTags;
    }
}

export default QuoteService;
