# Mike's Code Test

Simple front-end implementation with Create React App.

## Setup

1.  Run `yarn` to install the dependencies.
2.  Run `yarn test` to run tests.
3.  Run `yarn start` to start a dev server on http://localhost:3000

## Design

- Start with the `getTotal` method of the `App` component in `src/App.js` - it shows the public API
of the `Checkout` class.
- I've implemented an approximation of the interface in the brief with the `Checkout` class, but under
the hood it's taking a much more functional than OO approach.
- I've stuck to a single `App` component because it's a shonky UI and it simplifies state management.
- I've used [Bulma](https://bulma.io) for CSS and overridden a few things for layout.
