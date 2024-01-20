import jwt from 'jsonwebtoken';
import util from 'util';

class JWTService {
    static sign(payload, expiry = '1d', secret = process.env.JWT_SECRET) {
        return jwt.sign(payload, secret, { expiresIn: expiry });
    }

    static async verify(token, secret = process.env.JWT_SECRET) {
        
        const verifyAsync = util.promisify(jwt.verify);

        try {
            const decoded = await verifyAsync(token, secret);
            return decoded;
        } catch (error) {
            // Log the error details
            console.error('JWT Verification Error:', error.message);
            throw new Error('Invalid token');
        }
    }
}

export default JWTService;
