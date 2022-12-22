import HandCashService from "../services/HandCashService.js";
import OpenAIService from "../services/openAIService.js";
import PromptRepoository from '../repositories/promptRepository.js';

const IMAGE_COST = 0.05;

class CreateImageUseCase {
    constructor(alias, prompt, authToken) {
        this.#alias = alias;
        this.#prompt = prompt;
        this.#handcashService = new HandCashService(authToken);
    };

    execute = async () => {
        await this.#checkSpendableBalance(IMAGE_COST);
        const imageUrl = await OpenAIService.createImage(this.#prompt);
        const paymentResult = await this.#handcashService.pay({
                receivers: [{
                    to: 'gunner',
                    amount: IMAGE_COST
                }],
                currencyCode: 'USDC',
        });
       //  await PromptRepoository.create(this.#alias, this.#prompt, imageUrl);
        return imageUrl;
    };

    #checkSpendableBalance = async (imageCost) => {
        const userSpendableBalance = await this.#handcashService.getBalance();
        if(userSpendableBalance < imageCost) {
            throw new Error('Handcash Spendable Balance too low');
        }
    }

    #alias;

    #handcashService;

    #prompt;
};

export default CreateImageUseCase;