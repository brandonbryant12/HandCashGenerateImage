import HandCashService from "../../src/services/HandCashService";
import OpenAIService from "../../src/services/openAIService";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import CreateImageUseCase from "../../src/useCases/createImageUseCase";

export default withIronSessionApiRoute(async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(404);
  }
  try {
    const { authToken } = req.session;

    if (!authToken) {
      return res
        .status(401)
        .json({ status: "error", error: "Expired authorization." });
    }
    console.log('createImage')
    // const imageUrl = await OpenAIService.createImage(req.body.input);
    // const paymentResult = await new HandCashService(authToken).pay({
    //   receivers: [{ to: "gunner", amount: 0.05 }],
    //   currencyCode: "USDC",
    // });
    return res.status(200).json({ status: "created", imageUrl: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-6WH5xiUWQ0TAX4Sonsjn33yD/user-LroW6QcTF3G604uPMSl95sl4/img-Xea5tYgeXjuq4EmCEscMp4Jc.png?st=2023-01-04T21%3A15%3A14Z&se=2023-01-04T23%3A15%3A14Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-01-04T20%3A23%3A03Z&ske=2023-01-05T20%3A23%3A03Z&sks=b&skv=2021-08-06&sig=X1MRckEu6i%2Berkp86xJmYQOYDJOvLRq1/qRazjthiEs%3D' });
  } catch (error) {
    console.log(error);
    console.error(error.message);
    return res.status(400).json({ status: "error", message: error.toString() });
  }
}, sessionOptions);