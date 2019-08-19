export default class Token {
    constructor(tokenName = "shower_though_secret") {
        this.tokenName = tokenName;
        this.token = null;
        this.loadToken();
    }

    loadToken() {
        const tokenString = window.localStorage.getItem(this.tokenName);
        if (!!tokenString) {
            const token = JSON.parse(tokenString);
            if (token.token && token.dateTimeString) {
                const dateTime = new Date(token.dateTimeString);
                if (new Date() < dateTime) {
                    if (!!token.token) {
                        this.token = token.token;
                    }
                }
            }
        }
    }

    saveToken(token) {
        this.token = token;
        const newDate = new Date();
        newDate.setMinutes(newDate.getMinutes() + 60);
        window.localStorage.setItem(this.tokenName, JSON.stringify({
            token: this.token,
            dateTimeString: newDate.toISOString()
        }));
    }
}