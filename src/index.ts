import { ApolloServer } from "apollo-server-express";
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
import http from "http";
import path from "path";
import { readFileSync } from "fs";

import resolvers from "./graphql/resolvers";
import app from "./server";

export const httpServer = http.createServer(app);
const typeDefs = readFileSync(
    path.join(__dirname, "graphql/schema.graphql"),
    "utf8"
);

export const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => {
        return {
        };
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    introspection: true
});

const runServer = async() => {
    await server.start();
    // More required logic for integrating with Express
    server.applyMiddleware({
        app,
        // By default, apollo-server hosts its GraphQL endpoint at the
        // server root. However, *other* Apollo Server packages host it at
        // /graphql. Optionally provide this to match apollo-server.
        path: "/graphql",
    });
    // Modified server startup
    httpServer.listen(process.env.PORT || 3000, () => {
        console.log(`Server ready at ${process.env.PORT || 3000}`);
    })
}

runServer()