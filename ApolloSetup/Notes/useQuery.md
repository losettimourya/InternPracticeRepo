# Custom `useQuery` Hook
This custom `useQuery` hook is a wrapper around the Apollo Client's `useQuery` hook, providing additional flexibility and customization options for executing GraphQL queries in a React application.

## Arguments

- **Query** - Contains the query that is supposed to be executed.
- **Options** - Controls how the query is executed.

## Returns
It returns a query result object *QueryResult<TData, TVariables>*

-  the `wrapHook` function allows for enhancing or modifying the behavior of the _useQuery hook, making it possible to inject additional context or functionality.

# Helper function `_useQuery`

- This function does the actual work of setting up the query.
- Returns the result of query execution

# `useInternalState` function
- The function manages the state needed to run the query.
- This returns the *Internal State* object that contains all the information necessary to run the query.

# The `InternalState` class
This class manages everything needed to run and update the query in our React component.

>- Constructor: Sets up initial state. Initializes the state with client, query and optionally the previous state. Verifies document type of the query using `verifyDocumentType` function. Preserves previousData if available.

>- `forceUpdateState`: A method for forcing updates in the component.

>- `executeQuery`: Executes the GraphQL query using the Apollo Client. It returns a promise containing the result of the executed query, including data, loading status, and any potential errors. It is invoked internally during the useQuery process to fetch data from the server based on the provided query and options.

>- `useQuery`: The main logic for executing the query, managing loading states, error handling, and data retrieval. It returns a **QueryResult** object that encapsulates the query's state, including loading indicators, error information, and the fetched data. It internally calls `_useQuery`, which manages the core logic of executing the query and updating the component's state accordingly.

>- `useOptions`: Handles query options, such as skip behavior and server-side rendering considerations. It takes query and options as the arguments. It integrates the provided options with default configurations, ensuring consistent and customizable behavior during query execution.

>- `getObsQueryOptions`: Generates and merges the options for executing a watch query, incorporating default settings and custom options. It returns a merged **WatchQueryOptions** object with combined settings from default options, global defaults, and custom options.

>- `ssrDisabledResult`: Defines a result object for scenarios where server-side rendering (SSR) is disabled, initializing loading, data, and network status states and returns a frozen object representing the initial state for a watch query when SSR is disabled.

>- `skipStandbyResult`: Creates a result object for situations where skipping initial query execution is desired, setting loading to false and network status to ready and returns a frozen object representing the state when skipping initial query execution and transitioning to standby mode.

>- `createWatchQueryOptions`: Constructs the options object for executing a watch query, incorporating skip behavior, SSR settings, fetch policies, and other customizations. Its parameters consist of all the custom options like skip, SSR etc. It returns a configured **WatchQueryOptions** object which has the specific query related requirements.

>- `useObservableQuery`: This method manages the usage of the observable query, optimizing its retrieval during server-side rendering (SSR) and other scenarios. It checks if there's an existing observable that was used to fetch the same data. If yes, it is used as it contains the proper queryId and maintains query consistency. Creates necessary fields for managing observable actions like refetching, fetching more data, updating queries, etc. Registers the observable with render promises for SSR and handles loading states based on SSR and query options. It returns the active observable query instance for use in the component.

>- `setResult`: Updates the result state with the latest query result and triggers necessary updates in the component.

>- `handleErrorOrCompleted`:  Handles error reporting or completion actions based on the query result.

>- `toApolloError`: Converts Apollo query result errors into ApolloError objects for standardized error handling.

>- `getCurrentResult`: Utilizes caching to return the same Apollo query result object unless explicitly updated. (Referential stability)

>- `toQueryResult`: Converts the Apollo query result into a standardized QueryResult object for use in components.

>- `unsafeHandlePartialRefetch`: Performs a partial refetch of data if certain conditions are met, handling potential side effects.



- This implements methods for query execution, options management, and state updates, ensuring efficient GraphQL query handling within the React component.


```mermaid
flowchart TD
    A[Start] --> |useQuery| B(Initialize Query)
    B --> |useInternalState| C(Setup Internal State)
    C --> |InternalState| D(InternalState Constructor)
    D --> |InternalState| E(Set Initial State)
    E --> |verifyDocumentType| F(Verify Document Type)
    F --> G(Preserve previousData?)
    G --> |Yes| H(Set previousData)
    G --> |No| I(Initialize with defaults)
    H --> |Initialize with defaults| I
    I --> |createWatchQueryOptions| J(Create Watch Query Options)
    J --> |useOptions| K(Get Options)
    K --> |getObsQueryOptions| L(Merge Options)
    L --> |useObservableQuery| M(Use Observable Query)
    M --> N(SSR Enabled?)
    N --> |Yes| O(Get SSR Observable)
    N --> |No| P(Create Observable Query)
    O --> |Create Observable Query| P
    P --> |useObservableQuery| Q(Register SSR Observable)
    Q --> |ssrDisabledResult| R(Define SSR Disabled Result)
    R --> |skipStandbyResult| S(Create Skip Standby Result)
    S --> |executeQuery| T(Execute Query)
    T --> U(Query Success?)
    U --> |Yes| V(Update Result State)
    V --> |handleErrorOrCompleted| W(Handle Error or Completion)
    W --> X(Error?)
    X --> |Yes| Y(Convert to ApolloError)
    Y --> Z(Report Error)
    X --> |No| AA(Perform Completion Actions)
    AA --> BB(Return Query Result)
    U --> |No| AA
