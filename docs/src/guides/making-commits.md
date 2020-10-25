# Making Commits

## Commits
Commit messages must follow the "conventional commit" format, and will be rejected if they do not follow this format:

```sh
type(scope?): message
```
Type must be one of `build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test`

Scope is optional, but if you put in the `( )`'s then the scope **must be a valid package name**. Multiple packages can be separated by commas

Breaking changes are denoted with a `!` before the `:`

You can use the command line or tooling to create commits, as long as they follow this format. If they do not, you will recieve an error, and the commit will not be processed.

*Note* Although you could use `--no-verify`, and we recommend using that before doing a rebase, unless you have at least one commit that follows this convention, your PR will be blocked from merging.


`git commit` Examples:

```sh
$ git commit -m 'docs: add new section to guide'
# type: docs, scope: omitted
# When merged to master, no release will happen, but docs will be deployed

$ git commit -m 'fix(package-a, package-b): update the flux inverter'
# type: fix, scope: package-a and package-b
# When merged to master, a PATCH release will happen, docs will be deployed

$ git commit -m 'feat(package-b): add houston adapter'
# type: feat, scope: package-b
# When merged to master, a MINOR release will happen, docs will be deployed

$ git commit -m 'fix(package-a)!: fix the greet function and require an additional parameter'
# type: fix, scope: package-a, ! means a breaking change, and the message
# When merged to master, a MAJOR release will happen, docs will be deployed
```

Or you can use `yarn c` which will walk you through the same information using [commitizen](https://commitizen.github.io/cz-cli/)


## TODO: 
- add links & details