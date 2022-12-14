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
    const imageUrl = await OpenAIService.createImage(req.body.input);
    const paymentResult = await new HandCashService(authToken).pay({
      receivers: [{ to: "gunner", amount: 0.05 }],
      currencyCode: "USDC",
    });
    return res.status(200).json({ status: "created", imageUrl });
  } catch (error) {
    console.log(error);
    console.error(error.message);
    return res.status(400).json({ status: "error", message: error.toString() });
  }
}, sessionOptions);