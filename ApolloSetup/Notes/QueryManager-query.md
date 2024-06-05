- updates result of previous query if the result of a new query overlaps

```mermaid
flowchart TD
    A[Start] --> |mockQueryManager| B(Creates a Query Manager)
    B --> |watchQuery| C(Creating an Observable)
    C --> |subscribeandCount| D(Gets result of first query)
    D --> |queryManager.query| E(Executes the new query)
    E --> F(Enter QueryManager.ts)
    F --> |generateQueryId| G(Generate new Query ID)
    G --> |fetchQuery| H(Fetch query result)
    H --> |queryID| I(fetchConcastWithInfo)
    H --> |Options| I(fetchConcastWithInfo)
    H --> |networkstatus| I(fetchConcastWithInfo - a promise)
    I --> J(Set variables, queryInfo and defaults)
    J --> K(Determine fetchPolicy, errorPolicy etc)
    K --> |normalized| L(Create a fresh copy of options)
    L --> |fetchQuerybyPolicy| M(Try fetching the query result based on the defined policies)
    M --> |fetchPolicy| N(cache-first)
    N --> |readCache| O(Checking if there is an overlap)
    O --> |There is an overlap| P(updateWatch)
    O --> |There is no overlap| Q
    P --> Q(Result in cache?)
    Q --> |Yes| R(Get Results from cache)
    Q --> |No| S(Get Results from link)
    R --> |resultsFromCache| T
    S --> |resultsFromLink| T
    T --> |Return result object consisting of source and fromLink| M
    M --> |Return promise| H
    H --> E
