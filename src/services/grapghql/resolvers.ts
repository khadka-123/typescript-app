import axios from 'axios';

const resolvers = {
    Query: {
        getTodos: async () => {
            const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
            return response.data;
        }
    }
}

export default resolvers;