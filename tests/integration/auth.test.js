/* const jwt = require('jsonwebtoken');
const config = require('config');
const request = require('supertest');
const {Genre} = require('../../models/genre');

let server;
let token;

const exec = () => {
    return request(server)
        .post('/api/genres/')
        .send({ genre: "genre1" })
        .set("x-auth-token", token);
};

describe("auth", () => {

    beforeEach( () => { 
        server = require('../../index'); 
        token = jwt.sign({}, config.get("jwtPrivateKey"));
    });
    
    afterEach( async () => { 
        await server.close();
        await Genre.remove({});
    });

    it("should return with 200 status if valid token is provided", async () => {

        const res = await exec();

        expect(res.status).toBe(200);

    });
    
    it("should return with 401 status if no token is provided", async () => {

        token = '';

        const res = await exec();

        expect(res.status).toBe(401);
    });
    
    it("should return with 400 status if invalid token is provided", async () => {

        token = '1'

        const res = await exec();

        expect(res.status).toBe(400);
    });
});  */


//TODO: Fix error: listen EADDRINUSE: address already in use :::3000