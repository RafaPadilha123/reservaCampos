# PRD - Product Requirement Document

## 1. Visão do Produto
Garantir uma experiência fluida para atletas que desejam alugar campos de futebol, eliminando conflitos de horários na agenda do estabelecimento.

## 2. Regras de Negócio (RN)
* **RN01 (Unicidade de Horário):** O sistema não permite a criação de duas reservas concorrentes para o mesmo campo na mesma data e hora.
* **RN02 (Janela Operacional):** As reservas só podem ser feitas em horas cheias (ex: 19:00, 20:00), entre 08:00 e 23:00.
* **RN03 (Vínculo de Usuário):** Toda reserva precisa estar atrelada a um ID de usuário autenticado via JWT.
* **RN04 (Controle de Acesso):** Apenas usuários com privilégios ADMIN podem cadastrar ou remover campos.

## 3. Histórias de Usuário
* **US01:** Como usuário, quero criar uma conta e logar para acessar o sistema com segurança.
* **US02:** Como usuário, quero listar os campos de futebol disponíveis.
* **US03:** Como usuário autenticado, quero selecionar um campo, data e hora para fazer uma reserva.
* **US04:** Como administrador, quero cadastrar novos campos.