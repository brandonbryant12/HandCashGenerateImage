import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import GetImagesUseCase from "../../src/useCases/getImagesUseCase";

export default withIronSessionApiRoute(async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(404);
  }
  try {
    const { user, authToken } = req.session;
    if (!authToken) {
      return res
        .status(401)
        .json({ status: "error", error: "Expired authorization." });
    }

    const images = await new GetImagesUseCase(user.handle).execute();
    return res.status(200).json({ status: "fetched", images });
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({ status: "error", message: error.toString() });
  }
}, sessionOptions);