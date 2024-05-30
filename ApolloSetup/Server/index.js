const { ApolloServer, gql } = require("apollo-server");
const LRU = require("lru-cache");
const { generate } = require("shortid");

// Schema definition
const typeDefs = `
  type Query {
    todos: [Todo]
		todo(id: String!): Todo
  }

	type Todo {
		id: String!
		description: String!
    completed: Boolean!
	}

	type Mutation {
		addTodo(description: String!): Todo
		updateTodo(id: String!, description: String!, completed: Boolean!): Todo
    deleteTodo (id: String!): Todo
	}
`;

// LRU cache for storing to-do items
const cache = LRU({ max: 25, maxAge: 1000 * 60 * 5 });

// Resolver definitions
const resolvers = {
  Query: {
    todos: () => {
      const todos = [];
      // cache.forEach((description, id, completed) => todos.push({ description, id, completed }));
      cache.forEach((value, key) => {
        todos.push({ id: key, description: value.description, completed: value.completed });
      });
      return todos;
    },
    // todo: (_, { id }) => {
    //   return { id, description: cache.get(id) };
    // }
    todo: (_, { id }) => {
      return { id, description: cache.get(id).description, completed: cache.get(id).completed }; 
  }
  },
  Mutation: {
    addTodo: (_, { description }) => {
      const id = generate();
      const todo = { description, id};
      cache.set(id, {description,completed: false});
      return todo;
    },
    updateTodo: (_, { description, id, completed }) => {
      const todo = { description, id, completed};
      cache.set(id, {description, completed});
      return todo;
    },
    deleteTodo: (_, { id }) => {
      const todo = {id, description: cache.get(id).description, completed: cache.get(id).completed};
      cache.del(id);
      return todo;
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

// server.listen().then(({ url }) => {
//   console.log(`🚀 Server ready at ${url}`);
// });

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
