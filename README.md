# Small Mini Design System Library

Example of a small component library with a self contained password fields. Set up to work in Storybook.

<img width="649" alt="screenshot of app" src="https://github.com/user-attachments/assets/9689ca26-e9fa-4556-94f5-9c2d71c45b8e">


## View App

[View a live version of the app](https://mkitzman-password.netlify.app/)

## Running Locally

**Start the component explorer on port 6006:**

`yarn storybook`

**Run the frontend app on port 5173:**

`yarn dev`

## Features

- Fully typed
- Live validation of password
- Also validates on submit.
- Customizable text strings for internationalization.
- Customizable validation rules.
- Fully accessible including color ratio, keyboard access and aria live regions.

## Improvements

- Variables in CSS should be moved to Design Tokens
- Move the configs out of the password file
- Aria live region doesn't always work perfectly
- Add failed validations to aria live region but only for screen readers.
- Add tests
- Add build process for exporting and making it usable.
