const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.open_ai_api_key,
});

const openai = new OpenAIApi(configuration);
class OpenAIService {
    static createImage = async (prompt) => {
        const response = await openai.createImage({
            prompt: prompt,
            n: 1,
            size: "1024x1024",
          });
          return response.data.data[0].url;
      }
}

export default OpenAIService;
