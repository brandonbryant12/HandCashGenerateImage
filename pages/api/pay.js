import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import HandCashService from "../../src/services/HandCashService";

export default withIronSessionApiRoute(async function handler(req, res) {
  const { user, authToken } = req.session;
  try {
    if (authToken) {
      const paymentResult = await new HandCashService(authToken).pay({
        receivers: [
          {
            destination: "brandon",
            amount: 0.01,
          },
        ],
        note: "Connect SDK Beta",
        currencyCode: "USDC",
      });
      return res.status(200).json({ paymentResult });
    } else return res.status(401).json({ status: "error", error: "Expired authorization." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.toString() });
  }
}, sessionOptions);
