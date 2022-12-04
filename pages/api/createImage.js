import AuthTokenRepository from "../../src/repositories/AuthTokenRepository";
import HandCashService from "../../src/services/HandCashService";
import SessionTokenRepository from "../../src/repositories/SessionTokenRepository";
import OpenAIService from "../../src/services/openAIService";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(404);
    }
    try {
        const {authorization} = req.headers;
        const sessionToken = authorization.split(' ')[1];
        if (!sessionToken) {
            return res.status(401).json({error: 'Missing authorization.'});
        }

        const {sessionId, user} = SessionTokenRepository.verify(sessionToken);
        const authToken = AuthTokenRepository.getById(sessionId);
        if (!authToken) {
            return res.status(401).json({status: 'error', error: 'Expired authorization.'});
        }
        const imageUrl = await OpenAIService.createImage(req.body.input);
        const paymentResult = await new HandCashService(authToken).pay({
            destination: 'brandonbryant', amount: 0.05, currencyCode: 'USD'
        });
        return res.status(200).json({status: 'created', imageUrl });
    } catch (error) {
        console.log(error)
        console.error(error.message);
        return res.status(400).json({status: 'error', message: error.toString()});
    }
}
