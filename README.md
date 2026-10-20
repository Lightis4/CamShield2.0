# 🛡️ CamShield 2.0

### Plataforma de apoio à segurança digital de câmeras e dispositivos inteligentes

O **CamShield 2.0** é um projeto de software voltado à organização, ao acompanhamento e à conscientização sobre a segurança digital de câmeras residenciais e dispositivos conectados à Internet das Coisas (IoT).

A proposta é desenvolver uma plataforma que permita aos usuários gerenciar seus dispositivos, acompanhar informações de segurança e receber recomendações para melhorar a proteção de seus equipamentos.

Atualmente, o projeto encontra-se na fase de **MVP (Produto Mínimo Viável) demonstrativo**, desenvolvido com HTML5, CSS3 e JavaScript.

---

## 🎯 Objetivo do projeto

O principal objetivo do CamShield é facilitar o gerenciamento e a avaliação de práticas de segurança digital relacionadas a câmeras e outros dispositivos inteligentes.

O projeto busca, futuramente:

- Centralizar informações de dispositivos conectados.
- Facilitar a identificação de configurações que exigem atenção.
- Orientar usuários sobre boas práticas de segurança.
- Auxiliar profissionais na organização de avaliações de segurança.
- Gerar relatórios sobre as condições verificadas dos dispositivos.
- Expandir o suporte para diferentes equipamentos IoT.

## 💻 Funcionalidades do CamShield 2.0

### 1. Dashboard de monitoramento

Interface inspirada em centrais de segurança e monitoramento por câmeras, apresentando indicadores e informações gerais dos dispositivos cadastrados.

### 2. Gerenciamento de dispositivos

Permite cadastrar, visualizar e excluir dispositivos, registrando informações como:

- Nome do dispositivo.
- Tipo de equipamento.
- Fabricante ou marca.
- Versão do firmware informada pelo usuário.

### 3. Painel demonstrativo de câmeras

Apresenta uma interface visual com canais de monitoramento, simulando a organização de uma central de câmeras.

**Observação:** o MVP não recebe nem transmite imagens de câmeras reais.

### 4. Checklist de segurança

Permite registrar respostas manuais relacionadas a boas práticas de segurança dos equipamentos cadastrados.

O checklist auxilia na organização das informações, mas não representa uma auditoria automatizada.

### 5. Relatórios

Permite visualizar informações cadastradas e respostas do checklist, com opção de impressão ou salvamento em PDF pelo navegador.

Os relatórios são baseados em informações fornecidas manualmente pelo usuário.

### 6. Armazenamento local

Utiliza `localStorage` para manter os dados cadastrados no navegador.

Nesta versão, ainda não existe banco de dados remoto nem sincronização entre diferentes dispositivos.

### 7. Interface responsiva

O CamShield utiliza uma identidade visual monocromática, com tons de preto, cinza e branco, inspirada em sistemas profissionais de monitoramento e segurança.

A interface foi desenvolvida para se adaptar a computadores e dispositivos móveis.

---

## 🛠️ Tecnologias utilizadas

| Tecnologia | Utilização |
|---|---|
| HTML5 | Estrutura e organização da aplicação |
| CSS3 | Estilização, responsividade e identidade visual |
| JavaScript | Interatividade, gerenciamento de dispositivos e checklists |
| LocalStorage | Armazenamento local das informações |
| Git | Controle de versões |
| GitHub | Hospedagem e gerenciamento do código-fonte |

## 📁 Estrutura do projeto

```text
CamShield2.0/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

**Descrição dos arquivos:**

- `index.html`: estrutura principal da aplicação.
- `style.css`: identidade visual e responsividade.
- `script.js`: funcionalidades interativas e armazenamento local.
- `README.md`: documentação do projeto.

## 🚀 Como executar

**1. Clone o repositório:**

```bash
git clone https://github.com/Lightis4/CamShield2.0.git
```

**2. Acesse a pasta:**

```bash
cd CamShield2.0
```

**3. Abra o projeto no VS Code:**

```bash
code .
```

**4. Execute a aplicação:**

Abra o arquivo `index.html` no navegador ou utilize a extensão Live Server do VS Code.

Não é necessário instalar um backend ou banco de dados para executar esta versão demonstrativa.

---

## ⚠️ Limitações da versão atual

O CamShield 2.0 é um protótipo funcional de interface e gerenciamento manual.

Nesta versão:

- Não existe conexão com câmeras reais.
- Não são executadas verificações automáticas de vulnerabilidades.
- Não existe análise real de tráfego de rede.
- Não há autenticação de usuários.
- Os dados são armazenados localmente no navegador.
- Os indicadores de segurança não constituem certificações ou avaliações técnicas dos equipamentos.

O projeto demonstra a experiência de uso e a proposta de funcionamento de uma futura plataforma de segurança IoT.

---

## 🔮 Próximas etapas — CamShield 3.0

A próxima versão tem como objetivo transformar o MVP em uma aplicação web com backend, autenticação e armazenamento em banco de dados.

**Funcionalidades planejadas:**

- [ ] Implementar backend com Python e Flask.
- [ ] Integrar banco de dados PostgreSQL com Supabase.
- [ ] Criar cadastro, login e logout.
- [ ] Permitir contas individuais para cada usuário.
- [ ] Armazenar dispositivos e checklists na nuvem.
- [ ] Implementar geração de relatórios pelo servidor.
- [ ] Criar histórico de avaliações.
- [ ] Pesquisar integração autorizada com câmeras compatíveis.
- [ ] Desenvolver verificações reais de segurança, conforme as capacidades de cada dispositivo.
- [ ] Publicar uma versão online para testes com usuários.

## 🌐 Visão de futuro

A proposta de longo prazo é transformar o CamShield em uma plataforma de apoio à segurança de dispositivos IoT, atendendo diferentes públicos:

**Usuários residenciais:** acompanhamento e orientação sobre a segurança de seus dispositivos.

**Pequenas empresas:** organização e acompanhamento de equipamentos conectados.

**Instaladores de câmeras:** apoio a checklists e documentação de configurações após instalações.

**Profissionais de TI:** gerenciamento de informações e futuras verificações técnicas em dispositivos autorizados.

O objetivo é tornar as boas práticas de segurança digital mais acessíveis, organizadas e compreensíveis.

---

## 👨‍💻 Desenvolvedor

**Pedro Henrique Barbosa Nogueira**

Desenvolvedor e idealizador do projeto CamShield.

GitHub: [@Lightis4](https://github.com/Lightis4)

## 📌 Repositório

[CamShield 2.0 — GitHub](https://github.com/Lightis4/CamShield2.0)

---

**CamShield — Segurança digital começa com conhecimento, organização e prevenção.**
