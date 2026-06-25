# ⚽ Sistema de Reserva de Campos de Futebol - Arena Futebol

## 👨‍💻 Autor
* **Rafael Rodrigues Padilha** (Trabalho Individual)
* Disciplina: Tópicos Especiais (TSI36A) - UTFPR GP
* Professor: Prof. Dr. Roni Fabio Banaszewski

---

# 🏟️ PRD - Sistema de Reserva de Campos

## 1. Visão Geral do Produto
O **ReservaCampos** é uma plataforma que permite a usuários comuns visualizarem e agendarem horários em quadras esportivas, enquanto centraliza o gerenciamento, criação e controle desses campos para usuários com privilégios de Administrador (`ADMIN`).

---

## 2. Personas (Roles)
* **Usuário Comum (`USER`):** Atletas locais que buscam quadras disponíveis, visualizam preços por hora e realizam agendamentos síncronos.
* **Administrador (`ADMIN`):** Gestores da arena/complexo esportivo responsáveis por cadastrar novos campos, definir tipos de gramado e estipular valores por hora.

---

## 3. Requisitos Funcionais (RF)
* **RF01 - Autenticação Segura:** O sistema deve permitir o cadastro e login de usuários, gerando um token JWT.
* **RF02 - Controle de Acesso (RBAC):** Apenas usuários com a role `ADMIN` injetada no banco de dados podem visualizar e submeter o formulário de cadastro de novos campos.
* **RF03 - Listagem Dinâmica:** Todos os usuários logados devem visualizar a lista de campos, preços e gramados em tempo real.
* **RF04 - Fluxo de Reserva Síncrono:** O usuário comum deve selecionar uma data e um horário (restrito entre 08:00 e 23:00) para agendar uma quadra.
* **RF05 - Prevenção de Conflitos:** O sistema não deve permitir duas reservas para o mesmo campo no mesmo dia e horário.

---

## 4. Diagrama de Sequência do Sistema (SSD)

```mermaid
sequenceDiagram
    autonumber
    actor Admin as Administrador (Front)
    actor User as Usuário Comum (Front)
    participant API as Backend (NestJS)
    participant DB as Banco de Dados (Neon/Postgres)

    Note over Admin, API: Fluxo de Cadastro de Campo (Privilegiado)
    Admin->>API: POST /campos (Payload + Headers: x-user-role='ADMIN')
    API->>API: Valida Role no Controller
    API->>DB: Prisma: create(campo)
    DB-->>API: Retorna Campo Salvo
    API-->>Admin: Status 201 (Sucesso)

    Note over User, DB: Fluxo de Reserva de Horário
    User->>API: POST /reservas (Payload: campoId, dataHora, userId)
    API->>DB: Verifica duplicidade de horário
    alt Horário Livre
        DB-->>API: Sem conflitos
        API->>DB: Prisma: create(reserva)
        API-->>User: Status 201 (Reserva Confirmada)
    else Horário Ocupado
        DB-->>API: Registro existente encontrado
        API-->>User: Status 401/400 (Erro: Horário Indisponível)
    end
