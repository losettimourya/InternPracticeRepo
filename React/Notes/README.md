# Use of virtual DOM

When a new element is added to the application, a virtual DOM is created and represented as a tree, with each element being a node. Whenever an element's state changes, a new virtual DOM tree is generated and compared to the previous one. The differences are identified, and the most efficient way to apply these changes to the real DOM is determined. As a result, only the updated elements are re-rendered on the page. In the real DOM, everything is re-rendered

# Re-rendering vs Re-mounting

- Re-rendering: Involves updating the existing DOM elements (using virtual DOM) without removing them. It's a part of the normal update cycle and is generally lightweight.
- Re-mounting: Involves completely removing a component from the DOM and adding it back. It's less common and can be more performance-intensive since it triggers the full lifecycle of the component.

# Rendering vs Painting

- Rendering: When you add a new element to the DOM, the browser will parse the HTML, update the DOM, recalculate the layout, and finally paint the new element on the screen.
- Painting: When you change the background color of an element, the browser will repaint that element with the new color without needing to re-calculate the layout.

Rendering is the overall process of translating web content into a visual display, while painting is the final step of this process where the actual pixels are drawn on the screen.

# Memoization

Memoization is used to store results of expensive and large computations in the cache. This helps us in returning the cached results when the same inputs occur again, thereby, speeding up the computer program.

## React.memo

Used when a function returns the same result when it is given the same props. This helps us skipping the re-rendering of a component as React will memoize it. 

## useMemo vs useCallback

- useMemo is used to memoize large values or computations which helps us in optimizing expensive calculations.
- useCallback is used to memoize callbacks which helps us in reducing unnecessary creation of functions. It also makes re-renders easy as we optimize the creation of callback functions that are passed to child components.

useMemo returns a **value** whereas useCallback returns the **callback function**

# Context

- Context is designed to share data that can be considered “global” for a tree of React components.
- Context is primarily used when some data needs to be accessible by many components at different nesting levels.

# Lifecycle of components

Each component in React has a lifecycle which you can monitor and change it during these phases:
>- Mounting
>- Updating
>- Unmounting

- ***Mounting*** means putting elements into DOM.
- ***Updating*** means modifying the component whenever its state or props is updated.
- ***Unmounting*** means removing the component from DOM.







