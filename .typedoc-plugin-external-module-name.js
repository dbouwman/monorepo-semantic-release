const subpackage = new RegExp("packages/([^/]+)/");
module.exports = function customMappingFunction(explicit, implicit, path, reflection, context) {
  // extract the monorepo package from the path
  const package = path.match(subpackage)[1];
  // build the module name
  return package;
}