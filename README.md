# Small Mini DS Library

Example of a small library for a self contained password fields. Set up to work in Storybook.

## View App

[View app on netlify](https://mkitzman-password.netlify.app/)

## Running Locally

**Start the component explorer on port 6006:**

`yarn storybook`

**Run the frontend app proper on port 5173:**

`yarn dev`

## Features

- Customizable text strings for internationalization.
- Customizable validation rules.
- Fully accessible including color ratio, keyboard access and aria live regions.

## Improvements

- Variables in CSS should be moved to Design Tokens
- Move the configs out of the password file
- Aria live region doesn't always work perfectly
- Add failed validations to aria live region but only for screen readers.
