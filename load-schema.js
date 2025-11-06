const fs = require("fs");
const path = require("path");

// Caminhos
const baseEnvPath = path.join(__dirname, "environments", "viacep.postman_environment.json");
const schemaPath = path.join(__dirname, "schemas", "viacep.schema.json");
const runtimeEnvPath = path.join(__dirname, "runtime.environment.json");

// Lê environment original
const baseEnv = JSON.parse(fs.readFileSync(baseEnvPath, "utf8"));

// Lê schema
const schema = fs.readFileSync(schemaPath, "utf8");

// Remove se já existir chave antiga
baseEnv.values = baseEnv.values.filter(v => v.key !== "schema_viacep");

// Adiciona o schema ao environment
baseEnv.values.push({
  key: "schema_viacep",
  value: schema,
  type: "text",
  enabled: true
});

// Gera environment final
fs.writeFileSync(runtimeEnvPath, JSON.stringify(baseEnv, null, 2));

console.log("✅ Schema adicionado ao environment final: runtime.environment.json");
