import db from '../sql/init.js';

export default class PromptRepository {
    static checkInit = async () => {
        if(!db.isInitialized) {
            await db.init();
            db.isInitialized = true;
        } 
    }

    static create = async (alias, inputPrompt, imageUrl) => {
        await this.checkInit();
        return db.knex('prompts').insert({ alias, prompt: inputPrompt, imageUrl})
    };

    static getByAlias = async (alias) => {
        await this.checkInit();
        return db.knex('prompts').where({
            alias,
          }).select('*')
    };
}

