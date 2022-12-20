import { Environments, HandCashConnect } from "@handcash/handcash-connect";

const appId = process.env.handcash_app_id;
const appSecret = process.env.handcash_app_secret;

const cloudAccount = new HandCashConnect({
  appId: appId,
  appSecret: appSecret,
  env: Environments.beta,
});

export default class HandCashService {
  constructor(authToken) {
    this.account = cloudAccount.getAccountFromAuthToken(authToken);
  }

  async getProfile() {
    return this.account.profile.getCurrentProfile();
  }

  async pay({ paymentParameters }) {
    return this.account.wallet.pay(paymentParameters);
  }

  getRedirectionUrl() {
    return cloudAccount.getRedirectionUrl();
  }

  async getBalance() {
    return this.account.wallet.getSpendableBalances();
  }
}
