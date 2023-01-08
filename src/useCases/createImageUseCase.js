import HandCashService from "../services/HandCashService.js";
import OpenAIService from "../services/openAIService.js";
// import PromptRepoository from '../repositories/promptRepository.js';

const IMAGE_COST = 0.05;
class CreateImageUseCase {
    constructor(alias, prompt, authToken) {
        this.#alias = alias;
        this.#prompt = prompt;
        this.#handcashService = new HandCashService(authToken);
    };

    execute = async () => {
        await this.#checkSpendableBalance(IMAGE_COST);
        // const imageUrl = await OpenAIService.createImage(this.#prompt);
        const imageUrl = 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-6WH5xiUWQ0TAX4Sonsjn33yD/user-LroW6QcTF3G604uPMSl95sl4/img-SFfPre9goiIZPKK5ATybCrFW.png?st=2023-01-08T18%3A59%3A55Z&se=2023-01-08T20%3A59%3A55Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-01-08T17%3A23%3A04Z&ske=2023-01-09T17%3A23%3A04Z&sks=b&skv=2021-08-06&sig=bw%2Bfg1cVbON7sqMO3plKFIyUkQfo5nTxFiIcBPiHN5Y%3D';

        if(process.env.env !== 'test') {
            await this.#handcashService.pay({
                receivers: [{
                    to: 'gunner',
                    amount: IMAGE_COST
                }],
                currencyCode: 'USDC',
        });
        }
        // await PromptRepoository.create(this.#alias, this.#prompt, imageUrl);
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
