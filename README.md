# API Test Automation — ViaCEP (Postman + Newman)

Automação de testes para a API pública **ViaCEP**, utilizando **Postman** para desenvolvimento e validação interativa, e **Newman** para execução em linha de comando e pipelines CI/CD.
O projeto inclui:

- Validação de **contrato JSON** (schema)
- Suporte a execução local e em pipelines (ex.: GitHub Actions)
- Geração de relatório HTML detalhado com **newman-reporter-htmlextra**


## 🎯 Objetivo do Projeto

Garantir a qualidade e consistência das respostas da API por meio de:
- Testes automatizados versionados no GitHub
- Execução local e em pipelines (CI/CD)
- Relatórios detalhados e auditáveis
- Validação de estrutura de resposta (schema validation)

---

## 🏗️ Estrutura do Projeto

```
📂 projeto-api-tests
 ├── 📁 collections/           # Coleções Postman
 │    └── viacep.postman_collection.json
 ├── 📁 environments/          # Variáveis de ambiente
 │    └── viacep.postman_environment.json
 ├── 📁 schemas/               # Schemas JSON para validação (fase AJV)
 │    └── viacep.schema.json
 ├── 📁 reports/               # Relatórios gerados pelo Newman
 ├── .gitignore
 ├── README.md
 └── package.json              # Dependências e scripts
```

---

## 🚀 Como Executar Localmente

### 1) Instale o Node.js (se ainda não tiver)
https://nodejs.org/

### 2) Instale as dependências do projeto
```bash
npm install
```

### 3) Execute os testes com relatório HTML
```bash
npm test
```

### 4) Ver relatório
Abra no navegador:
```
./reports/index.html
```

---

## 🧪 Validação de Schema (Configuração Atual)

Atualmente a validação é feita diretamente nos **scripts do Postman**, garantindo:
- Conferência de campos obrigatórios
- Verificação de tipos básicos

```javascript
pm.test("Valida schema JSON", function () {
  var schema = pm.environment.get("schema_viacep");
  var json = pm.response.json();
  pm.expect(tv4.validate(json, JSON.parse(schema))).to.be.true;
});
```

Isso já funciona e **está na branch `main`**.

---

## 🔀 Evolução Planejada: Validação com AJV

Vamos criar uma **branch separada `feature/ajv-schema-validation`** para implementar validação avançada:

| Critério | Situação Atual | Com AJV |
|--------|---|---|
| Tipos | ✅ | ✅ |
| Campos obrigatórios | ✅ | ✅ |
| Regras avançadas (enum, patterns) | ❌ | ✅ |
| Reaproveitamento dos schemas | ❌ | ✅ |
| Manutenção simples | ⚠️ | ✅ |

Isso evita impacto imediato no código existente.

---

## 🤝 Integração com GitHub Actions (CI/CD)

Ao subir para GitHub, os testes podem ser executados automaticamente.

Exemplo de workflow:

```yaml
name: API Tests
on:
  push:
    branches: [ "main" ]
jobs:
  newman-run:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run test:html
```

O relatório pode ser disponibilizado como artefato.

---

## 🗂️ .gitignore Recomendado

```
/node_modules
/reports
newman/*
npm-debug.log*
*.htm
*.html
.env
.DS_Store
Thumbs.db
```

---

## 🛣️ Próximos Passos

| Etapa | Status |
|------|:------:|
| Estruturar testes base ✅ | Concluído |
| Criar validação básica de resposta ✅ | Concluído |
| Criar branch `feature/ajv-schema-validation` | 🔜 |
| Escrever schemas JSON reutilizáveis | 🔜 |
| Integrar AJV no script de testes | 🔜 |
| Ativar validação via CI | 🔜 |

---

## Boas práticas adotadas

- Estrutura modular de pastas (collections, environments, schemas, reports)
- Dependências travadas via `package-lock.json`
- Separação de main e branch de evolução (AJV)
- Relatórios auditáveis e padronizados

## Licença

MIT — livre para uso e adaptação



## 👤 Autor

Projeto mantido para fins profissionais e demonstrativos.

> Caso queira melhorar, evoluir ou colaborar, fique à vontade para enviar um PR 😉
