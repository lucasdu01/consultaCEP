# Consulta de CEP

Aplicação web para consulta de endereços através do CEP, utilizando a API ViaCEP.

## Tecnologias Utilizadas

- **React**
- **Vite**
- **JavaScript**
- **CSS3**
- **API ViaCEP**

## Funcionalidades

- Busca automática de endereço ao digitar CEP completo
- Máscara de formatação para CEP (00000-000)
- Validação de campos obrigatórios (CEP e Número)
- Mensagens de erro personalizadas
- Campos de endereço desabilitados (preenchidos automaticamente)
- Componentes reutilizáveis
- Custom Hook para lógica de formulário

## Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

## Como Rodar o Projeto

1. Clone o repositório:
```bash
git clone [URL_DO_SEU_REPOSITORIO]
cd consultaCep
```
2. Instale as dependências:
```bash
npm install
```

2. Instale as dependências:
```bash
npm install
```

3. Rode o projeto:
```bash
npm run dev
```

## Estrutura do Projeto
```
consultaCep/
├── src/
│   ├── components/
│   │   └── Input/              # Componente reutilizável de input
│   │       ├── index.jsx
│   │       └── index.css
│   ├── hooks/
│   │   └── useFormularioCep.js # Hook customizado para lógica do formulário
│   ├── utils/
│   │   └── utils.js            # Funções utilitárias (formatação e API)
│   ├── App.jsx                 # Componente principal
│   ├── App.css                 # Estilos globais
│   ├── index.css               # Estilos base
│   └── main.jsx                # Ponto de entrada da aplicação
├── public/
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

##  Decisões Técnicas

### Por que React?
- Componentização facilita reutilização e manutenção

### Por que Vite?
 - Build otimizado
 - Configuração mínima

### Por que Custom Hook?
- Separação de responsabilidades
- Lógica reutilizável
- Código mais limpo

 ##  Validações Implementadas
 
### CEP
- Formato obrigatório (8 dígitos)
- Máscara automática (00000-000)
- Validação em tempo real enquanto digita
- Mensagem de erro se não encontrado na API
- Limpeza automática de campos se CEP inválido

### Número
- Campo obrigatório
- Mínimo 1 caractere
- Validação ao submeter formulário
