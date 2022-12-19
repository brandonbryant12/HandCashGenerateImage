import {Environments, HandCashConnect} from "@handcash/handcash-connect";

const appId = process.env.handcash_app_id;
const appSecret = process.env.handcash_app_secret;


const handCashConnect = new HandCashConnect({
    appId: appId,
    appSecret: appSecret,
    environment: Environments.beta,
});

export default class HandCashService {
    constructor(authToken) {
        this.account = handCashConnect.getAccountFromAuthToken(authToken);
    }

    async getProfile() {
        return this.account.profile.getCurrentProfile();
    }

    async pay({destination, amount, currencyCode}) {
        return this.account.wallet.pay({
            payments: [
                {destination, amount, currencyCode},
            ],
            description: 'AI Image Generator!',
        });
    }

    getRedirectionUrl() {
        return handCashConnect.getRedirectionUrl();
    }
}
