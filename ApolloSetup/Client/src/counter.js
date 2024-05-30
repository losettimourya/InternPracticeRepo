import React from "react";
import { useState } from "react";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    useMutation,
    gql,
    ObservableQuery
  } from "@apollo/client";
const ADD_COUNTER = gql`
    mutation AddCounter($count: Int!, $name: String!) {
        addCounter(count: $count, name: $name) {
        id
        count
        name
        }
    }
    `;

const GET_COUNTERS = gql`
    query GetCounters {
        counters {
        id
        count
        name
        }
    }
    `;

const UPDATE_COUNTER = gql`
    mutation UpdateCounter($id: String!, $count: Int!, $name: String!) {
        updateCounter(id: $id, count: $count, name: $name) {
        id
        count
        name
        }
    }
    `;

export default function Counter() {
    const [count, setCount] = useState(0);
    const [name, setName] = useState("");
    const [addCounter] = useMutation(ADD_COUNTER);
    const [updateCounter] = useMutation(UPDATE_COUNTER);
    const { loading, error, data } = useQuery(GET_COUNTERS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div>
        <h2>Counter</h2>
        <form
            onSubmit={(e) => {
            e.preventDefault();
            addCounter({ variables: { count: count, name: name } });
            setCount(0);
            setName("");
            }}
        >
            <input
            type="number"
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value))}
            />
            <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
            <button type="submit">Add Counter</button>
        </form>
        <ul>
            {data.counters.map(({ id, count, name }) => (
            <li key={id}>
                <p>{name}</p>
                <p>{count}</p>
                <form
                onSubmit={(e) => {
                    e.preventDefault();
                    updateCounter({ variables: { id: id, count: count + 1, name: name } });
                }}
                >
                <button type="submit">Increment</button>
                </form>
            </li>
            ))}
        </ul>
        </div>
    );
}