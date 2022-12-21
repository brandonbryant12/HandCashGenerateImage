import HandCashService from "../../src/services/HandCashService";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";

export default withIronSessionApiRoute(async function handler(req, res) {
  const { authToken } = req.session;
  try {
    if (authToken) {
      const balance = (await new HandCashService(authToken).getBalance("USD"))
        .spendableFiatBalance;
      return res.status(200).json({ balance });
    } else return res.status(401).json({ status: "error", error: "Expired authorization." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.toString() });
  }
}, sessionOptions);
