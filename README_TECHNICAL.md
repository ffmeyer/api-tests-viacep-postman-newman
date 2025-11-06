# API Test Automation — ViaCEP (Postman + Newman)

Automação de testes para a API pública **ViaCEP**, utilizando **Postman** para desenvolvimento e validação interativa, e **Newman** para execução em linha de comando e pipelines CI/CD.
O projeto inclui:

- Validação de **contrato JSON** (schema)
- Suporte a execução local e em pipelines (ex.: GitHub Actions)
- Geração de relatório HTML detalhado com **newman-reporter-htmlextra**

## Estrutura do Projeto

```
api-tests-postman-newman/
├── collections/
│   └── viacep.postman_collection.json        # Coleção de testes
├── environments/
│   └── viacep.postman_environment.json       # Variáveis de ambiente (baseUrl, CEP, schema, etc.)
├── schemas/
│   └── viacep.schema.json                    # JSON Schema para validação
├── reports/
│   └── report.html                           # Relatório gerado automaticamente
├── load-schema.js                            # Script para injetar schema no environment
├── package.json                              # Dependências e scripts
└── README.md                                 # Documentação do projeto
```

## Execução Local

### Instalação de dependências
```bash
npm install
```

### Executar testes
```bash
npm test
```

### Acessar relatório HTML
```
reports/report.html
```

## Validação de Schema

Atualmente a validação é feita com **TV4**:

```javascript
pm.test("Valida schema JSON", function () {
  var schema = pm.environment.get("schema_viacep");
  var json = pm.response.json();
  pm.expect(tv4.validate(json, JSON.parse(schema))).to.be.true;
});
```

### Migração planejada para AJV

- Será criada a branch `feature/schema-ajv-migration`
- AJV fornecerá validação mais robusta, mensagens detalhadas e suporte a Drafts modernos de JSON Schema

## Integração Contínua (CI) — GitHub Actions

Exemplo de workflow para execução de testes e geração de relatório:

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
      - run: npm test
```

## Boas práticas adotadas

- Estrutura modular de pastas (collections, environments, schemas, reports)
- Dependências travadas via `package-lock.json`
- Separação de main e branch de evolução (AJV)
- Relatórios auditáveis e padronizados

## Licença

MIT — livre para uso e adaptação
