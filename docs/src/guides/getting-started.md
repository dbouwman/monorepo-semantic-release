# Setting up Semantic Release

Steps to add `semantic-release` to an existing monorepo.

## Install Packages
In the root, install the following packages

### Code Coverage for CI

```sh
$ yarn add -W -D codecov
```

### Husky
Used to add git hooks, in particular a `commit-msg` hook to lint commit messages

```sh
$ yarn add -W -D husky
```

### Commit Lint
Actual linting of the commit logs

```sh
$ yarn add -W -D @commitlint/cli @commitlint/config-conventional @commitlint/config-lerna-scopes @commitlint/prompt
```

### Commitizen
Used to streamline commit messages

```sh
$ yarn add -W -D commitizen cz-conventional-changelog cz-lerna-changelog
```
### Semantic Release
For a monorepo, we use `@qiwi/multi-semantic-release`, which uses many standard `@semantic-release` packages

```sh
$ yarn add -W -D @qiwi/multi-semantic-release @semantic-release/changelog @semantic-release/commit-analyzer @semantic-release/git @semantic-release/github @semantic-release/npm
```

## Release Configuration

The release configuration is in the root and in the individual packages.

In the root, create `.releaserc.json`

```json
{
  "branch": "master"
}
```

In each of the packages, add this `.release.json`

```json
{
  "branch": "master",
  "verifyConditions": [
    "@semantic-release/changelog",
    "@semantic-release/npm",
    "@semantic-release/git"
  ],
  "prepare": [
    "@semantic-release/changelog",
    "@semantic-release/npm",
    "@semantic-release/git"
  ],
  "publish": [
    "@semantic-release/npm",
    "@semantic-release/github"
  ]
}

```

## Commit-Lint Configuration

in the root, create `commitlint.config.js`

```js
const Configuration = {
  /*
   * Resolve and load @commitlint/config-conventional from node_modules.
   * Referenced packages must be installed
   */
  extends: ['@commitlint/config-lerna-scopes', '@commitlint/config-conventional'],
  /*
   * Resolve and load conventional-changelog-atom from node_modules.
   * Referenced packages must be installed
   */
  // parserPreset: 'conventional-changelog-atom',
  /*
   * Resolve and load @commitlint/format from node_modules.
   * Referenced package must be installed
   */
  formatter: '@commitlint/format',
  /*
   * Any rules defined here will override rules from @commitlint/config-conventional
   */
  rules: {
    'type-enum': [2, 'always', ['build', 'chore', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test']],
  },
  /*
   * Functions that return true if commitlint should ignore the given message.
   */
  ignores: [(commit) => commit === ''],
  /*
   * Whether commitlint uses the default ignore rules.
   */
  defaultIgnores: true,
};

module.exports = Configuration;
```


## Husky Configuration
in the root `package.json`

```json
  "husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
```

## Update Travis Jobs

```yml
os: linux
dist: xenial
language: node_js
node_js: 
  - '12'
  - 'lts/*'
cache:
  directories:
  - node_modules
jobs: 
  include:
  # First stage is to test and run coverage
  # if this fails the other stages won't run
    - stage: test and coverage
      name: "Run Tests and Coverage"
      before_script:
        - yarn bootstrap
      script:
        - travis_retry yarn test:ci
        - codecov
      env:
        - MOZ_HEADLESS=1
      addons:
        chrome: stable
        firefox: latest
    # If the Test and Coverage stage passes, run the release
    - stage: semantic release
      name: "Semanitc Release"
      if: branch = master
      node_js: lts/*
      # skip the script step to avoid re-running tests
      script: skip
      deploy: 
        provider: script
        skip_cleanup: true
        script: yarn release:ci
    # If the release has passed, then generate docs, with the new version numbers
    - stage: deploy docs
      name: "Build and deploy docs post-release"
      if: branch = master
      node_js: lts/*
      # skip the script step to avoid re-running tests
      script: skip
      before_deploy:
        - npm run docs:build
      deploy:
        provider: pages
        token: "$GITHUB_TOKEN"
        local_dir: docs/build
        target_branch: gh-pages
        skip_cleanup: true
    
```