/** @type {import('openapi2aspida/dist/getConfig').ConfigFile} */
const config = {
  input: "src/apis", // "input" of aspida is "output" for openapi2aspida
  outputEachDir: false, // Generate $api.ts in each endpoint directory
  openapi: {
    inputFile: "src/openapi.yaml",
   }
}

module.exports = config