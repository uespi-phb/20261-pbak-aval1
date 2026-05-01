<div>
  <h4 style="margin:0; line-height:1.25">Universidade Estadual do Piauí - UESPI</h4>
  <h4 style="margin:0; line-height:1.25">Curso de Tecnologia em Sistemas de Computação</h4>
  <h4 style="margin:0; line-height:1.25">Disciplina: Programação Backend</h4>
  <h4 style="margin:0; line-height:1.25"><strong>Professor:</strong> Eyder Rios</p>
</div>

<h4 style="text-align: center; margin-bottom: 2rem">
1ª AVALIAÇÃO
</h4>

Esta avaliação prática tem por objetivo verificar a capacidade da equipe de compreender, analisar e implementar testes automatizados para a camada de aplicação e para objetos de domínio, com base em um caso de uso estruturado segundo princípios de organização arquitetural, separação de responsabilidades e testabilidade.

A atividade será desenvolvida a partir do repositório GitHub da avaliação:

> `https://github.com/uespi-phb/20261-pbak-aval1.git`

Nesse repositório estarão disponíveis todos os arquivos necessários para a execução da atividade, incluindo, entre outros:

- este enunciado da avaliação (`docs/aval1.pdf`)
- o PRD do sistema (`docs/prd-system.pdf`)
- o ambiente Node.js + TypeScript + Vitest já configurado
- o código-fonte dos objetos do caso de uso em estudo (`./src`)
- a definição dos membros de cada equipe (`docs/pback-aval1-teams.pdf`)
- a definição dos testes atribuídos a cada equipe (`docs/pback-aval1-teams-tests.pdf`)
- o diagrama de dependências dos objetos do caso de uso (`docs/dd-register-student.pdf`)
- tutorial sobre Git e Pull Request (`docs/github-pr.pdf`)
- demais arquivos de apoio necessários para a atividade

## Objetivos da atividade

Ao final desta atividade, espera-se que a equipe seja capaz de:

- compreender tecnicamente o caso de uso em estudo a partir do PRD e do diagrama de dependências
- identificar o papel dos objetos de domínio, das abstrações e das dependências externas no fluxo analisado
- implementar corretamente testes automatizados em TypeScript com Vitest
- utilizar adequadamente test doubles quando necessário
- trabalhar com Git e GitHub de forma minimamente organizada
- submeter sua solução por meio de Pull Request
- explicar oralmente, de forma objetiva e tecnicamente consistente, o código produzido

## Tarefa da atividade

A tarefa da equipe consiste em:

- implementar os testes que lhe foram atribuídos
- subir o código implementado para o repositório por meio de Pull Request

Cada equipe recebeu **4 testes automatizados** para implementar, sendo:

- 2 testes do grupo Application Layer
- 2 testes do grupo Domain Layer

A distribuição específica dos testes de cada equipe está definida no repositório, no arquivo correspondente às tarefas das equipes.

## Regras da avaliação

Durante a realização da atividade:

- é permitido acesso à internet
- **é proibido o uso de agentes de IA de qualquer tipo**, mesmo que apenas para consulta
- a equipe deve trabalhar exclusivamente sobre o repositório oficial da avaliação
- a equipe deve respeitar a organização do projeto já disponibilizado
- não devem ser criadas soluções fora do escopo da atividade

## Regras de uso de Git e GitHub

A submissão da atividade deverá ser realizada obrigatoriamente por meio de **Pull Request**.

Antes de escrever qualquer código, a equipe deverá criar uma nova branch com o seguinte formato:

> `tests/teamXX`

### Significado do nome da branch

- `tests`: indica que a branch se destina à implementação de testes
- `team`: indica que a branch pertence a uma equipe
- `XX`: corresponde ao número da equipe com dois dígitos

Exemplos:

- `tests/team01`
- `tests/team02`
- `tests/team10`

### Regra obrigatória sobre a branch principal

Após clonar o repositório, **nenhum código poderá ser escrito diretamente na branch principal `main`**.

Se a equipe já tiver escrito código na `main`, deverá:

1. salvar localmente o conteúdo produzido (arquivos fonte)
2. remover ou renomear o repositório local
3. clonar novamente o repositório ou restaurar o estado adequado
4. criar a branch correta
5. copiar novamente o conteúdo salvo (código fonte)
6. seguir o fluxo normal de commit, push e Pull Request

Um tutorial sobre Pull Request estará disponível no repositório, no diretório `./docs/github-pr.pdf`.

## Entrega

A entrega da atividade será composta por:

- código-fonte dos testes implementados pela equipe
- histórico de submissão no GitHub
- Pull Request da equipe
- arguição oral breve sobre código produzido por outra equipe

## Critérios de avaliação

A avaliação da atividade considerará três dimensões.

### 1. Qualidade técnica da entrega

Será considerada a implementação correta e completa dos testes atribuídos à equipe, observando-se, entre outros aspectos:

- aderência ao enunciado
- correção técnica dos testes
- cobertura adequada do comportamento esperado
- coerência entre cenário, execução e asserções
- clareza estrutural do código de teste

### 2. Qualidade do processo de submissão

Será considerado o uso adequado de Git e GitHub, observando-se, entre outros aspectos:

- criação da branch no formato exigido
- não utilização da branch `main` para desenvolvimento
- organização da submissão
- correção do Pull Request
- respeito ao fluxo de trabalho definido para a atividade

O **formato do nome da branch será considerado na avaliação**. Verificar seção `Regras de uso de Git e GitHub`.

### 3. Domínio técnico demonstrado na arguição oral

Será considerada a capacidade da equipe de explicar e analisar tecnicamente o código implementado, demonstrando compreensão sobre:

- o objetivo de cada teste
- o comportamento validado
- a escolha das dependências e test doubles
- a organização do teste
- a relação entre o teste implementado e o caso de uso analisado

## Arguição oral

Após a submissão, cada equipe participará de uma apresentação oral rápida e objetiva.

Essa etapa tem por finalidade comprovar que os membros compreendem tecnicamente a codificação de testes realizada.

Cada equipe será submetida a **perguntas sobre o código implementado por outra equipe que não a sua**.

## Observações finais

A atividade não exige criação de novas funcionalidades do sistema. O foco está exclusivamente na **implementação dos testes atribuídos à equipe** e na **submissão correta da solução via Pull Request**.

# Equipes

| Equipe | Nome                                                                                       |
| ------ | ------------------------------------------------------------------------------------------ |
| 01     | Adonias Pereira dos Santos Terceiro<br>Ivanildo dos Santos Araujo                          |
| 02     | Gabriel Lima Silva Oliveira<br>Gabriel Oliveira Pinto<br>Samuel da Penha Nascimento        |
| 03     | Denis do Nascimento Rodrigues<br>Vitor dos Santos Correia                                  |
| 04     | Felipe Martins dos Santos Silva<br>Henrique Veras Cordeiro<br>Jordan Fernandes de Carvalho |
| 05     | Francisco Osmar Santos Silva<br>Richard Costa de Brito<br>Victor Emanoel Lima Silva        |
| 06     | Cristian Brandao Tavares<br>Enzo Damasceno Falcao<br>Luis Felipe Ferreira Martins          |
| 07     | Fabricio Fontenele Vieira<br>Francisco Alves Ribeiro Neto<br>Ruan Pedro de Araujo Anjos    |
| 08     | Alan Rodrigues de Castro<br>Eric Silva Patricio<br>Kaua Neres Moura                        |
| 09     | Jose Wilk Souza Lima<br>Mariana da Mota Pinho<br>Willamy Josue Santos Serejo               |
| 10     | Irapuam Junio da Silva Santos<br>Jose Maranhao da Silva Neto<br>Mayara Lima Miranda        |
| 11     | Erick Vieira da Silva Costa<br>Paulo Henrique Alves Vieira                                 |
