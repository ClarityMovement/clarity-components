[![Build Status](https://travis-ci.org/Claritymovement/clarity-components.svg?branch=master)](https://travis-ci.org/Claritymovement/clarity-components) [![bitHound Score](https://www.bithound.io/github/Claritymovement/clarity-components/badges/score.svg)](https://www.bithound.io/github/Claritymovement/clarity-components) [![codecov](https://codecov.io/gh/Claritymovement/clarity-components/branch/master/graph/badge.svg)](https://codecov.io/gh/Claritymovement/clarity-components) [![Greenkeeper badge](https://badges.greenkeeper.io/claritymovement/clarity-components.svg)](https://greenkeeper.io/) [![Dependency Status](https://david-dm.org/Claritymovement/clarity-components.svg)](https://david-dm.org/Claritymovement/clarity-components) [![devDependencies Status](https://david-dm.org/Claritymovement/clarity-components/dev-status.svg)](https://david-dm.org/Claritymovement/clarity-components?type=dev)

# clarity-components - Starter for React.js components
> This is forked from [react-component-boilerplate](https://github.com/survivejs/react-component-boilerplate)

This is a stupid starter makes it stupid enough to develop and test React components and small projects.
With [storybook](https://github.com/storybooks/storybook) integrated, components can be tested on [gh-pages](https://claritymovement.github.io/clarity-components/storybook) by non-developers directly.

## Installation
```
yarn add clarity-components
```

## Usage
- [documentations](https://claritymovement.github.io/clarity-components/)
- [online demo](https://claritymovement.github.io/clarity-components/storybook)
- [code examples](https://github.com/ClarityMovement/clarity-components/blob/master/stories/Image/Image.story.js)
```js
const uploadImage = () => new Promise();
<Image uploadImage={uploadImage} />
```

## Contribute
### Common Tasks

* Developing - **npm start** - Runs the development server at *localhost:8080* and use Hot Module Replacement. You can override the default host and port through env (`HOST`, `PORT`).
* Creating a version - **npm version <x.y.z>** - Updates */dist* and *package.json* with the new version and create a version tag to Git.
* Publishing a version - **npm publish** - Pushes a new version to npm and updates the project site.

### Testing

The test setup is based on Jest. Code coverage report is generated to `coverage/`. The coverage information is also uploaded to codecov.io after a successful Travis build.

* Running tests once - **npm test**
* Running tests continuously - **npm run test:watch**
* Running individual tests - **npm test -- <pattern>** - Works with `test:watch` too.
* Running automatically - pre-push hook of **git push**

### Linting
* Linting - **npm run lint** - Runs both **npm run lint:js** and **npm run lint:css**.
* Linting js only - **npm run lint:js** - Runs ESLint.
* Linting css only - **npm run lint:css** - Runs stylelint.
* Linting & fixing staged files only - **npm run lint:staged** - Runs lint-staged.
* Linting & fixing automatically - pre-commit hook of **git commit**

### Documentation Site

The starter includes a [GitHub Pages](https://pages.github.com/) specific portion for setting up a documentation site for the component. The main commands handle with the details for you. Sometimes you might want to generate and deploy it by hand, or just investigate the generated bundle.

* Building - **npm run gh-pages** - Builds the documentation into `./gh-pages` directory.
* Deploying - **npm run gh-pages:deploy** - Deploys the contents of `./gh-pages` to the `gh-pages` branch. GitHub will pick this up automatically. Your site will be available through *<user name>.github.io/<project name>`.
* Generating stats - **npm run gh-pages:stats** - Generates stats that can be passed to [webpack analyse tool](https://webpack.github.io/analyse/). This is useful for investigating what the build consists of.

## License

*clarity-components* is available under MIT. See LICENSE for more details.

