import {v4 as uuidv4} from 'uuid';
import AuthTokenRepository from "../../../../src/repositories/AuthTokenRepository";
import HandCashService from "../../../../src/services/HandCashService";
import SessionTokenRepository from "../../../../src/repositories/SessionTokenRepository";
import ProfileRepository from "../../../../src/repositories/ProfileRepository";


export default async function handler(req, res) {
    const {authToken} = req.query;

    const {publicProfile} = await new HandCashService(authToken).getProfile();

    const user = await ProfileRepository.add(publicProfile)

    const payload = {
        sessionId: uuidv4(),
        user,
    };
    const sessionToken = SessionTokenRepository.generate(payload);
    AuthTokenRepository.setAuthToken(authToken, payload.sessionId);
    return res.redirect(`/?sessionToken=${sessionToken}`);
}
