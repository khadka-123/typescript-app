import express, { Application} from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import cors from 'cors';

async function startServer() {

    const app: Application = express();
    const server = new ApolloServer({
        typeDefs,
        resolvers
    });

    await server.start();

    app.use(express.json());
    app.use(express.urlencoded({extended:true}));
    app.use(cors());

    app.use('/graphql',expressMiddleware(server));

    app.listen(5000, () => {
        console.log(`server started on port 5000`);
    })
}

startServer();
 