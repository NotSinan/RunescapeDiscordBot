class EndpointRetriever {
    constructor() {
        if (EndpointRetriever.instance == null) {
            EndpointRetriever.instance = this;
        }
        return EndpointRetriever.instance;
    }

    getAccountCreatedUrl() {
        return `https://secure.runescape.com/m=account-creation-reports/rsusertotal.ws`;
    }

    getGrandExchangeUrl(itemId) {
        return `https://services.runescape.com/m=itemdb_rs/api/catalogue/detail.json?item=${itemId}`;
    }

    getGraphUrl(itemId) {
        return `https://secure.runescape.com/m=itemdb_rs/api/graph/${itemId}.json`;
    }

    getSearchUrl(username) {
        return `https://apps.runescape.com/runemetrics/profile/profile?user=${username}&activities=1`;
    }

    getTravellingMerchantUrl() {
        return `https://api.weirdgloop.org/runescape/tms/current?lang=en`;
    }

    getVosUrl() {
        return `https://api.weirdgloop.org/runescape/vos`;
    }

    getBeastUrl(id) {
        return `https://secure.runescape.com/m=itemdb_rs/bestiary/beastData.json?beastid=${id}`;
    }

    getItemImageUrl(itemId) {
        return `https://secure.runescape.com/m=itemdb_rs/viewitem?obj=${itemId}`;
    }

    getRunescapeLogoUrl() {
        return 'https://logos-world.net/wp-content/uploads/2021/02/RuneScape-Symbol.png';
    }

    getRunescapeAccountCreationUrl() {
        return 'https://runescape.wiki/images/Step_2_Account_creation.png?1e8c0';
    }
}

const endpointRetriever = new EndpointRetriever();
Object.freeze(endpointRetriever);

module.exports = endpointRetriever;
