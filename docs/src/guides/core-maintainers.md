## Development Philosophy

#### Consistent Documentation and Naming
- function and variable names should express what something _is_ or what a function _does_ *in the context of the "process"*
- jsdoc comments that explain the "why" behind what is being done in a function, in addition to what is happening
- guides should be created focusing on: 
    - maintainers of the Solution.js core
    - developers and maintainers of the Processors
    - developers who consume Solution.js

#### Focus on Functional-Style Programming
- the vast majority of the code should be in functions
- functions should have a single `return`
- functions should have flat promise chains
- functions should have focused unit tests that only exercise logic _in the function_. Mock implementations should be used instead of allowing delegation into other functions. These tests should drive code-coverage reporting.
- separate "integration" tests should be created to ensure wholistic behavior is correct. These should not count towards code-coverage
- separate "end-to-end" tests should be created which run against actual items, in actual orgs, to ensure that everything actually works, and to track performance over time. Hub team has multiple orgs that exist specifically for this purpose, and can create users specifically for this testing.
- functions must not rely on side-effects. 
    - output of a function must depend entirely on arguments passed in.
    - callbacks may be used to indicate progress, but this should not be pushed deep down the stack. The outcome of a process should be returned to the caller via Promise resolution/rejection only.
- asynchronous functions (i.e. which make web requests), must return `Promises`.
- when calling asynchronous functions, caller must depend on the `Promise` resolution/rejection only.

#### Few, "thin" Classes
There are a few places where we will use `Class` in situations where having internal state is beneficial. However, these classes will be very "thin" in that their methods will simply delegate out to functions. Internal state should be minimized.


#### Messaging
- All messages returned from the library should use `ITranslatableMessage` to enable translation
- directly import rest-js functions vs using wrappers from `common`
- remove `@license` directive from all but top-level exports as it massively bloats webpack based builds using the library
- consistent use of `changelog`, perhaps using [commitizen](https://github.com/commitizen/cz-cli). Having a consistently mainatined changelog will become critical as project gets more developers and more consumers.