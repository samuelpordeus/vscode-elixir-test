# Change Log

## [1.8.1] = 2023-11-21

- Fix a bug that would prevent users from using the `mixEnv` option.

## [1.8.0] = 2023-11-20

- New: Support for custom command before running tests.
- New: Workspace support: the extension will `cd` into the projects dir before running commands.
- New: Added support to run test coverage 
- New: Added suppor to run the last test command
- New: Custom `MIX_ENV` via config file
- Improved: When jumping from a test file, the extension will allow to create the module file if it doesn't exist.
- Fix: `cd` the root folder to run `mix test`, `mix test.watch`...
- Fix: Apply linter suggestions to the project
- Fix: Big refactoring remove duplicated code and prepare to start adding tests
- Internal: Dynamic command loading
- Internal: Bump all dependencies to the latest versions

## [1.7.1] = 2021-05-31

- Fix jump to tests for multi-workspace projects

## [1.7.0] = 2020-11-07

- Change shortcut for running tests to CMD+SHIFT+I to avoid conflict with default keybinding

## [1.6.0] = 2020-10-30

- Fix command bugs for Windows users (path validation with `\\` instead of `/`)
- Add all test commands with mix_test_watch library
- Add validation helper to make it simple to maintain
- Update README with Watch tests section

## [1.5.0] - 2020-10-16

- Improve template on new test file
- Improve test jump structure

## [1.4.0] - 2020-03-10

- Add configuration to focus on editor after running tests

## [1.3.0] - 2019-11-12

- Add Keybindings to run test commands
- Add command to run all tests in folder
- Add `when` on keybindings

## [1.2.0] - 2019-10-03

- Run test suite
- Add command to run test at cursor
- Add module definition to generated test files

## [1.1.1] - 2019-10-03

- Update repository name to vscode-test-elixir

## [1.1.0] - 2019-10-03

- Run all tests in current file

## [1.0.0] - 2019-10-03

- Update extension into `elixir-test`
- Create test file when it does not exist

## [0.2.0] - 2019-10-03

- Add cmd + shift + j as keybinding
- Add warning when user tries to jump from a file without a matching test
- Fix the issue with files on the `lib` folder and umbrella apps

## [0.1.0] - 2019-10-02

- Initial release
