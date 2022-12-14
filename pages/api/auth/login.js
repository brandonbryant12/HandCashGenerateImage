import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../lib/session";
import HandCashService from "../../../src/services/HandCashService";
import ProfileRepository from "../../../src/repositories/ProfileRepository";

export default withIronSessionApiRoute(
  async function loginRoute(req, res) {
    const { authToken } = req.query;
    if (authToken) {
      const {publicProfile} = await new HandCashService(authToken).getProfile();
      const user = await ProfileRepository.add(publicProfile)
      req.session = { authToken, user };
      await req.session.save();
      return res.redirect(307, "/");
    }
  },
  sessionOptions
);