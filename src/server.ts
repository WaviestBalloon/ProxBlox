import fastify, { FastifyRequest, FastifyReply } from "fastify";
import cors from "@fastify/cors";

const server = fastify({ logger: false })
	.register(cors, {
		origin: "*",
		methods: ["GET", "PUT", "POST", "DELETE"],
	});

server.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
	return { hello: "world" };
});

server.addHook("onRequest", (request: FastifyRequest, reply: FastifyReply, done) => {
	console.log(`${request.method} ${request.url} by ${request.headers["x-forwarded-for"] || request.ip}`);
	done();
});
server.listen({ port: 2323, host: "0.0.0.0" }, (err, address) => {
	if (err) throw err;
	console.log(`Server listening at ${address}`);
});
