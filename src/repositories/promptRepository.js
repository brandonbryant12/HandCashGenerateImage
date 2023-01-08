// import { getConnection } from '../sql/init.js';

// export default class PromptRepository {
//     static create = async (alias, inputPrompt, imageUrl) => {
//         const client = await getConnection();
//         const query = `INSERT INTO "Prompts" (imageUrl, alias, prompt)
//         VALUES ('${imageUrl},${alias},${inputPrompt}') ON CONFLICT DO NOTHING `;
//         const result = await client.query(query);
//         client.release();
//         console.log(result);
//         return result
//     };

//     static getByAlias = async (alias) => {
       
//     };
// }

