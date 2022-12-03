const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: "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",
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

/*


const fs = require("fs");
const openai = require("openai");

// Set your OpenAI API key
openai.api_key = "<your-api-key>";

// Read the input image file
const imageData = fs.readFileSync("<image-file-path>");

// Use the DALL-E model to generate a mask image
const response = await openai.DALL-E.create({
  image: imageData,
  model: "image-alpha-001",
  prompt: "A dog wearing a hat",
  style: "portrait",
});

// Save the generated mask image
fs.writeFileSync("<mask-image-file-path>", response.data);

// Overlay the mask image on top of the input image to create a stylized version of the input image
const stylizedImage = ... // TODO: Implement this step

// Save the stylized image
fs.writeFileSync("<stylized-image-file-path>", stylizedImage);

*/