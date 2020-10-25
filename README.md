# Monorepo Semantic Release Test Repo

This repo exists purely to get semantic-release tooling configured and setup for real projects.


Background reading: https://dev.to/antongolub/the-chronicles-of-semantic-release-and-monorepos-5cfc

## About Semantic Release

**semantic-release** automates the whole package release workflow including: determining the next version number, generating the release notes and publishing the package.

This is a very powerful workflow in that it removes the burden of package releases from the core maintainers of the packages. 

## Process

The process works best if a developer makes many incremental commits, but will work even if there is a single commit. There is an onus on the developer to ensure that they structure the commit messages correctly. 

i.e. if you add a feature, use `feat(<package-name>): msg`, which will cause the next release of that package to get a minor version bump.
if you are just fixing an existing feature, use `fix(<package-name>): msg`, which will cause the next release fo get a patch version bump.
if you make a breaking change, use either `fix` or `feat`, with a `!` before the `:`

i.e. `git commit -m 'feat(pkg-a)!: add callback to fn'` which will cause a major bump in the package when it is released.

### Flow

#### Developer: 
- `$ git pull origin master`
- `$ git checkout -b f/some-feature`

... add features...

- `$ git commit -m 'feat(<pkg-name>): added cool feature'`

... fix a feature in another package ...

- `$ git commit -m 'fix(<other-pkg>): swapped implementation'`
- `$ git push origin f/some-feature`

... other chore changes ...

- `$ git commit -m 'chore: updated some deps'`

... create pull request ...



#### Semantic Pull Request Bot:
- verifies that there is **at least one** semantic commit

#### Travis-ci
- runs Test and Coverage via `yarn test:ci`
- runs Release process `yarn release:ci`
  - creates changelogs for each package, publishes packages to npm
- Builds and publishes docs via `yarn docs:deploy`
  