# Elixir Test
[![Build Status](https://travis-ci.org/samuelpordeus/vscode-elixir-test.svg?branch=master)](https://travis-ci.org/samuelpordeus/vscode-elixir-test)

A Visual Studio Code extension that helps you with your tests in Elixir!

## Installation

You can install it through the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=samuel-pordeus.elixir-test).

## Options

There are a few options that you can set for this extension under the `vscode-elixir-test` object:

- `mixEnv`: when set, injects the `MIX_ENV` env var before mix commands. Default: `null`.
- `focusOnTerminalAfterTest`: focus the terminal after the test is executed. Default `true`.
- `beforeTest`: a custom command to run on the terminal before running the test command. Default `null`.

Example:
```json
{
  "vscode-elixir-test": {
    "mixEnv": "test",
    "focusOnTerminalAfterTest": true,
    "beforeTest": "clear",
  }
}
```

## Features

### Elixir Test: Jump

This enables you to navigate back and forth between your elixir file and its test.

The default keybinding is `Cmd + Shift + J` (macOS) and `Ctrl + Shift + J` (Linux/Windows)

![Jump](https://media.giphy.com/media/JOFKl3KctzbrXYReLj/giphy.gif)

### Elixir Test: Run all tests on file

The default keybinding is `Cmd + Shift  + I, F` (macOS) and `Ctrl + Shift + 8, F` (Linux/Windows)

![Run all tests on file](https://media.giphy.com/media/lr81HlKkF60BoMnlvU/giphy.gif)

### Elixir Test: Run test at cursor

This one does the same as above, but for a single test.

The default keybinding is `Cmd + Shift  + I, C` (macOS) and `Ctrl + Shift + 8, C` (Linux/Windows)

### Elixir Test: Run all tests in a folder

This one does the same as above, but for all tests within a folder.

The default keybinding is `Cmd + Shift  + I, D` (macOS) and `Ctrl + Shift + 8, D` (Linux/Windows)

Alternatively, right-click the folder in the Explorer and select `Elixir Test: Run all tests in a folder`.

### Elixir Test: Run test suite

This one does the same as above, but for the entire test suite.

The default keybinding is `Cmd + Shift  + I, S` (macOS) and `Ctrl + Shift + 8, S` (Linux/Windows)

### Elixir Test: Run last command

This one will run the last test command you ran from this extension.

The default keybinding is `Cmd + Shift  + I, L` (macOS) and `Ctrl + Shift + 8, L` (Linux/Windows)

### Watch tests

To watch tests, you need to install [mix_test_watch](https://hex.pm/packages/mix_test_watch) dependency.

## Contributing

Feel free to suggest some new features or report bugs [creating a new issue](https://github.com/samuelpordeus/vscode-elixir-test/issues/new).
Or even better, you can open a pull request! :smile:
