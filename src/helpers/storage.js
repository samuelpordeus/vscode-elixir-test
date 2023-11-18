function get(context, key) {
  return context.workspaceState.get(`vscode-elixir-test.${key}`);
}

function update(context, key, value) {
  return context.workspaceState.update(`vscode-elixir-test.${key}`, value);
}

function clear(context) {
  return context.workspaceState.update('vscode-elixir-test', undefined);
}

module.exports = {
  get,
  update,
  clear,
};
