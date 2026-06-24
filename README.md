# ⚽ Sistema de Reserva de Campos de Futebol - Arena Futebol

## 👨‍💻 Autor
* **Rafael Rodrigues Padilha** (Trabalho Individual)
* Disciplina: Tópicos Especiais (TSI36A) - UTFPR GP
* Professor: Prof. Dr. Roni Fabio Banaszewski

---

## 📋 Visão Geral do Projeto
Este projeto consiste em uma aplicação **Full-Cycle** estruturada em formato de **Monorepo** voltada para o gerenciamento e agendamento de horários em complexos esportivos de futebol. A aplicação resolve o problema logístico de conflito de horários (choque de agenda), validando entradas e controlando permissões de acesso em camadas.

O desenvolvimento foi realizado utilizando a metodologia de **Spec-Driven Development (SDD)** e desenvolvimento guiado por testes (**TDD**), orquestrados com o auxílio de Inteligência Artificial.

---

## 🛠️ Stack Tecnológica

### Backend (/apps/api)
* **Framework:** NestJS (Node.js)
* **ORM:** Prisma ORM
* **Banco de Dados:** PostgreSQL (Hospedado na nuvem via Neon.tech / Vercel Postgres)
* **Autenticação:** JWT (JSON Web Tokens) com Roles/Guards de segurança
* **Documentação:** Swagger API (`/api`)
* **Testes:** Jest (Testes unitários e de integração)

### Frontend (/apps/web)
* **Tecnologia:** Angular (v17+) com TypeScript
* **Gerenciamento de Estado/Componentes:** Serviços nativos e RxJS (Programação Reativa)
* **Estilização:** SCSS / Tailwind CSS
* **Consumo de API:** HttpClient integrado aos DTOs gerados a partir do Swagger da API

---

## 📁 Estrutura do Monorepo
```text
monorepo-campos/
├── apps/
│   ├── api/  (Backend - NestJS API)
│   └── web/  (Frontend - Interface Visual)
└── docs/     (Documentação técnica "Docs as Code")
    ├── prd.md (Documento de Requisitos)
    ├── sdd.md (Documento de Design Arquitetural e Diagrama ER Mermaid)
    └── checklist.md (Controle de entrega dos IDs)
