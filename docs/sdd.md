# SSD - Software Design Document

## 1. Arquitetura Monorepo
A estrutura segue estritamente o isolamento de escopo exigido:
* `/apps/api`: Backend em NestJS
* `/apps/web`: Frontend da aplicação
* `/docs`: Documentação técnica

## 2. Diagrama Entidade-Relacionamento (Mermaid)

```mermaid
erDiagram
    USER {
        int id PK
        string name
        string email
        string password
        string role
    }
    CAMPO {
        int id PK
        string nome
        string tipo_grama
        float preco_hora
    }
    RESERVA {
        int id PK
        datetime data_hora
        int campoId FK
        int userId FK
    }

    USER ||--o{ RESERVA : "faz"
    CAMPO ||--o{ RESERVA : "recebe"