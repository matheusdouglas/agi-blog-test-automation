Este projeto contém testes automatizados para validação das principais funcionalidades do site:

https://blog.agibank.com.br

## Os testes foram desenvolvidos utilizando Playwright, com foco em garantir a qualidade da experiência do usuário e a confiabilidade das funcionalidades críticas.

## Tecnogias utilizadas

- Playwright
- TypeScript
- Faker (geração de dados dinâmicos)
- GitHub Actions (CI/CD)

---

## Arquitetura

O projeto utiliza o padrão de projeto **Page Object Model (POM)**, que tem como objetivo separar a lógica de interação com a interface da lógica dos testes.

Com isso:

- Os testes ficam mais limpos e legíveis
- Reduz duplicação de código
- Facilita manutenção
- Aumenta reutilização de componentes

Cada página da aplicação é representada por uma classe, contendo seus elementos e ações.

---

## Cenários automatizados

### 1. Assinatura com e-mail válido

- Acessa o blog
- Navega até a página de notícias
- Realiza inscrição na newsletter com e-mail válido
- Valida mensagem de sucesso

---

### 2. Assinatura com e-mail previamente utilizado

- Realiza inscrição com e-mail válido
- Tenta assinar novamente com o mesmo e-mail
- Valida mensagem de erro
- Valida link para gerenciamento de assinatura

---

### 3. Validação de e-mails inválidos

- Testa múltiplos formatos inválidos de e-mail
- Utiliza validação nativa do browser (`checkValidity`)
- Garante que a inscrição não é realizada

---

### 4. Navegação pelo menu do cabeçalho

- Valida o fluxo de navegação principal do usuário
- Interage com os itens do menu superior (header)
- Verifica a mudança de contexto (URL/página) - Garante que conteúdos (artigos) são carregados corretamente

---

### 5. Busca de artigos

- Realiza busca por termo válido (ex: "FGTS")
- Valida que resultados relevantes são exibidos
- Realiza busca com termo inexistente
- Valida mensagem de "não encontrado"

---

## Pré-requisitos

- Node.js 18+
- npm ou yarn

---

## Instalação

```bash
npm install
npx playwright install
```

---

## Executando os testes

```bash
npx playwright test
```

---

## Executar com interface

```bash
npx playwright test --headed
```

## Executar no modo Debug

```bash
npx playwright test --debug
```

---

## Executar com relatório

```bash
npx playwright show-report
```

---

## 🔄 CI/CD

O projeto possui integração com GitHub Actions para execução automática dos testes a cada push.

---

## Boas práticas aplicadas

- Seletores resilientes
- Separação de responsabilidades
- Testes positivos e negativos
- Dados dinâmicos com Faker
- Validação de comportamento real do usuário

---

## Autor

Matheus Douglas
QA Engineer
LinkedIn: <https://www.linkedin.com/in/matheus-douglas-b8038b23a/>
