import PromptRepoository from '../repositories/promptRepository.js';

const IMAGE_COST = 0.05;

class GetImagesUseCase {
    constructor(alias) {
        this.#alias = alias;
    };

    execute = () => (PromptRepoository.getByAlias(this.#alias));

    #alias;
};

export default GetImagesUseCase;