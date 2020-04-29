const { User } = require('../../../models/user');
const config = require('config');
const jwt = require('jsonwebtoken');

describe("generateAuthToken", () =>{

    it("should return valid jwt with payload consisting of user's id and isAdmin properties.", () => {
        
        const user = new User({isAdmin: true });
        
        const token = user.generateAuthToken();

        const result = jwt.verify(token, config.get("jwtPrivateKey"));

        expect(result).toMatchObject({_id: user._id.toHexString(), isAdmin: true});
    });
});