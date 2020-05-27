/* const jwt = require('jsonwebtoken');
const config = require('config');
const {Genre} = require('../../models/genre');
const request = require('supertest');

let server;

describe("/api/genres", () => {
    
    beforeEach( () => { server = require('../../index'); });
    afterEach( async () => { 
        await server.close();
        await Genre.remove({});
    });
    
    describe("GET /", () => {
        it("should return all genres.", async () => {

            await Genre.collection.insertMany([
                { genre: "genre1" },
                { genre: "genre2" }
            ]);

            const res = await request(server).get('/api/genres');

            expect(res.status).toBe(200);
            expect(res.body.some( g => g.genre === "genre1" )).toBeTruthy();
            expect(res.body.some( g => g.genre === "genre2" )).toBeTruthy();
        });
    });

    describe("GET /:id", () => {
       it("should return the genre with the given _id", async () => {

            await Genre.create({ genre: "genre1"});
            const genre = await Genre.findOne();

            const res = await request(server).get("/api/genres/" + genre._id);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("genre", genre.genre);
        });

        it("should respond with status 404 if genre with valid given _id is not found.", async () => {

            const res = await request(server).get('/api/genres/5e9794573048575a7c158b37');

            expect(res.status).toBe(404);
        });  
        
        it("should respond with status 404 if invalid _id is given.", async () => {

            const res = await request(server).get('/api/genres/1');

            expect(res.status).toBe(404);
        });  
    });

    describe("POST /", () => {

        let token;
        let genre;

        const exec = () => {
            return request(server)
                .post('/api/genres/')
                .send({ genre })
                .set("x-auth-token", token);
        };

        beforeEach( () => {
            token = jwt.sign({}, config.get("jwtPrivateKey"));
            genre = "genre";
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
        
        it("should return with 400 status if invalid genre is providade", async () => {

            genre = '';

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it("should send the genre in the response if token and genre are valid ", async () => {

            const res = await exec();
            
            expect(res.body).toMatchObject({ genre: "genre" })
        });

        it("should save genre to db if token and genre are valid ", async () => {

            await exec();

            const genre = await Genre.findOne();

            expect(genre).not.toBeNull();
        });
    });
});
 */

//TODO: Fix error: listen EADDRINUSE: address already in use :::3000