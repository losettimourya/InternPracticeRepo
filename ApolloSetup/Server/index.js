const { ApolloServer, gql } = require("apollo-server");
const LRU = require("lru-cache");
const { generate } = require("shortid");

// Schema definition
const typeDefs = `
  type Query {
    todos: [Todo]
		todo(id: String!): Todo
    counter(id: String!): Counter
    counters: [Counter]
  }

	type Todo {
		id: String!
		description: String!
    completed: Boolean!
	}

  type Counter {
    id: String!
    count: Int!
    name: String!
  }

	type Mutation {
		addTodo(description: String!): Todo
		updateTodo(id: String!, description: String!, completed: Boolean!): Todo
    deleteTodo (id: String!): Todo
    addCounter(count: Int!, name: String!): Counter
    updateCounter(id: String!, count: Int!, name: String!): Counter
    deleteCounter(id: String!): Counter
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
    },

    counter: (_, { id }) => {
      return { id, count: cache.get(id).count, name: cache.get(id).name };
    },

    counters: () => {
      const counters = [];
      cache.forEach((value, key) => {
        counters.push({ id: key, count: value.count, name: value.name });
      });
      return counters;
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
    },
    addCounter: (_, { count, name }) => {
      const id = generate();
      const counter = { count, id, name };
      cache.set(id, { count, name });
      return counter;
    },
    updateCounter: (_, { id, count, name }) => {
      const counter = { id, count, name };
      cache.set(id, { count, name });
      return counter;
    },
    deleteCounter: (_, { id }) => {
      const counter = { id, count: cache.get(id).count, name: cache.get(id).name };
      cache.del(id);
      return counter;
    },
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
