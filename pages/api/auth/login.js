import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../lib/session";
import HandCashService from "../../../src/services/HandCashService";

export default withIronSessionApiRoute(async function loginRoute(req, res) {
  const { authToken } = req.query;
  if (authToken) {
    const { publicProfile } = await new HandCashService(authToken).getProfile();
    req.session = {
      authToken,
      user: {
        handle: publicProfile.handle,
        displayName: publicProfile.displayName,
        avatarUrl: publicProfile.avatarUrl,
      },
    };
    await req.session.save();
    return res.redirect(307, "/");
  }
}, sessionOptions);
