# Roteiro de Testes

Lista de testes a ser implementada voltada ao módulo **`RegisterStudent`**, cobrindo o caso de uso central, os objetos de domínio e as classes concretas mais diretamente associadas ao fluxo descrito no PRD.

O roteiro abaixo foi derivado das responsabilidades do `RegisterStudentUseCase`, das regras de negócio de `Name`, `Email` e `RegistrationNumber`, e do estilo organizacional adotado no exemplo de `SignIn`.

## 1. `RegisterStudentUseCase`

Esta é a classe central do fluxo. Ela orquestra validação da entrada, verificação de duplicidade, geração do identificador, criação do estudante e persistência final.

### 1.1

**`should call LoadStudentByEmail with provided email`**
Deve verificar se o caso de uso chama a dependência `LoadStudentByEmail` com o e-mail recebido na entrada.

### 1.2

**`should call LoadStudentByRegistrationNumber with provided registration number`**
Deve verificar se o caso de uso chama a dependência `LoadStudentByRegistrationNumber` com a matrícula recebida na entrada.

### 1.3

**`should throw when name input is invalid`**
Deve garantir que o caso de uso falha adequadamente quando o nome informado viola as regras de domínio.

### 1.4

**`should throw when email input is invalid`**
Deve garantir que o caso de uso falha adequadamente quando o e-mail informado é inválido.

### 1.5

**`should throw when registration number input is invalid`**
Deve garantir que o caso de uso falha adequadamente quando a matrícula informada viola as regras definidas no domínio.

### 1.6

**`should throw when email already exists`**
Deve garantir que o caso de uso rejeita o cadastro quando já existe estudante com o mesmo e-mail.

### 1.7

**`should throw when registration number already exists`**
Deve garantir que o caso de uso rejeita o cadastro quando já existe estudante com a mesma matrícula.

### 1.8

**`should call GenerateId when input is valid`**
Deve verificar se, após validações e checagens de duplicidade bem-sucedidas, o caso de uso chama a dependência `GenerateId`.

### 1.9

**`should create Student with generated id and active status`**
Deve verificar se, em cenário válido, o caso de uso cria um estudante com o identificador gerado e com status inicial `active`.

### 1.10

**`should call SaveStudent with created student`**
Deve verificar se o caso de uso envia para a dependência `SaveStudent` o estudante corretamente criado.

### 1.11

**`should return created student output when input is valid`**
Deve verificar se, quando a entrada é válida, o caso de uso retorna a saída esperada contendo os dados do estudante criado.

### 1.12

**`should propagate error from LoadStudentByEmail`**
Deve verificar se erros lançados pela dependência de carregamento por e-mail não são silenciosamente engolidos pelo caso de uso.

### 1.13

**`should propagate error from LoadStudentByRegistrationNumber`**
Deve garantir que falhas lançadas pela dependência de carregamento por matrícula sejam propagadas corretamente.

### 1.14

**`should propagate error from GenerateId`**
Deve garantir que falhas na geração do identificador sejam propagadas corretamente ao chamador.

### 1.15

**`should propagate error from SaveStudent`**
Deve garantir que erros ocorridos na persistência do estudante sejam propagados corretamente.

### 1.16

**`should not call GenerateId when input is invalid`**
Deve verificar que o gerador de identificador não é acionado quando a entrada já falha nas validações do fluxo.

### 1.17

**`should not call SaveStudent when email already exists`**
Deve verificar que o repositório de persistência não é acionado quando o e-mail informado já estiver cadastrado.

### 1.18

**`should not call SaveStudent when registration number already exists`**
Deve verificar que o repositório de persistência não é acionado quando a matrícula informada já estiver cadastrada.

---

## 2. `PostgresStudentRepository`

Pelo fluxo arquitetural esperado, esta classe concreta implementa a persistência e a consulta de estudantes, oferecendo suporte às operações de busca por e-mail, busca por matrícula e salvamento do estudante.

### 2.1

**`should query student by email`**
Deve verificar se a classe consulta o banco usando o e-mail fornecido.

### 2.2

**`should return student when email exists`**
Deve verificar se a classe retorna corretamente um estudante quando o e-mail existe na base.

### 2.3

**`should return null when email does not exist`**
Deve garantir que a classe retorne `null` ou equivalente quando não houver estudante correspondente ao e-mail informado.

### 2.4

**`should query student by registration number`**
Deve verificar se a classe consulta o banco usando a matrícula fornecida.

### 2.5

**`should return student when registration number exists`**
Deve verificar se a classe retorna corretamente um estudante quando a matrícula existe na base.

### 2.6

**`should return null when registration number does not exist`**
Deve garantir que a classe retorne `null` ou equivalente quando não houver estudante correspondente à matrícula informada.

### 2.7

**`should save student with provided data`**
Deve verificar se a classe persiste corretamente os dados do estudante recebido.

### 2.8

**`should map database row to student model`**
Deve verificar se a linha retornada pelo banco é corretamente convertida para o modelo de estudante esperado pela aplicação.

### 2.9

**`should propagate database errors`**
Deve garantir que falhas oriundas da camada de banco sejam propagadas corretamente.

### 2.10

**`should use provided query parameters`**
Deve verificar se a classe utiliza corretamente os parâmetros recebidos nas consultas e operações de persistência.

---

## 3. `UuidGeneratorAdapter`

Esta classe concreta adapta a estratégia de geração de identificadores à abstração `GenerateId`, fornecendo o identificador do estudante a ser criado.

### 3.1

**`should generate id as string`**
Deve verificar se o adapter retorna um identificador no formato esperado pela aplicação, tipicamente uma string.

### 3.2

**`should call uuid generator once`**
Deve verificar se o adapter delega corretamente à estratégia ou biblioteca de geração de UUID, realizando apenas a chamada necessária.

### 3.3

**`should propagate uuid generator errors`**
Deve garantir que erros da dependência de geração de UUID sejam propagados corretamente.

---

## 4. `Name`

`Name` é um objeto de domínio e seus testes devem assegurar as invariantes definidas no PRD: obrigatoriedade, normalização com `trim`, mínimo de duas palavras, mínimo de cinco caracteres e ausência de espaços adicionais entre palavras.

### 4.1

**`should create Name when value is valid`**
Deve verificar se o objeto `Name` é criado corretamente quando recebe um nome válido.

### 4.2

**`should trim external spaces before validation`**
Deve verificar se o objeto remove espaços externos antes de aplicar as validações.

### 4.3

**`should throw when name is empty after trim`**
Deve garantir que o objeto rejeite nomes vazios após a normalização com `trim`.

### 4.4

**`should throw when name has only one word`**
Deve garantir que o objeto rejeite nomes que possuam apenas uma palavra.

### 4.5

**`should throw when name has less than 5 characters after trim`**
Deve garantir que o objeto rejeite nomes cujo comprimento útil seja inferior a 5 caracteres.

### 4.6

**`should throw when name contains additional spaces between words`**
Deve verificar se o objeto rejeita nomes com espaços adicionais entre as palavras.

### 4.7

**`should preserve normalized name value when valid`**
Deve garantir que, sendo válido, o nome fique armazenado em sua forma normalizada.

### 4.8

**`should compare equal names by value`**
Deve verificar igualdade por valor, caso o objeto implemente comparação semântica entre instâncias.

---

## 5. `Email`

`Email` aparece no fluxo como objeto de domínio responsável por encapsular a validade semântica do endereço eletrônico informado no cadastro. Seus testes devem focar invariantes e comportamento próprio.

### 5.1

**`should create Email when address is valid`**
Deve verificar se o objeto `Email` é criado corretamente quando recebe um endereço válido.

### 5.2

**`should throw when email is invalid`**
Deve garantir que o objeto rejeite e-mails com formato inválido.

### 5.3

**`should preserve original email value when valid`**
Deve garantir que, sendo válido, o e-mail seja armazenado de forma coerente com a semântica do objeto.

### 5.4

**`should compare equal emails by value`**
Deve verificar igualdade por valor, caso essa semântica exista no objeto.

---

## 6. `RegistrationNumber`

`RegistrationNumber` é um objeto de domínio e seus testes devem assegurar as invariantes estabelecidas no PRD: normalização com `trim`, proibição de espaços, uso exclusivo de dígitos e cardinalidade de 7 ou 10 dígitos.

### 6.1

**`should create RegistrationNumber when value has 7 digits`**
Deve verificar se o objeto `RegistrationNumber` é criado corretamente quando recebe uma matrícula válida com 7 dígitos.

### 6.2

**`should create RegistrationNumber when value has 10 digits`**
Deve verificar se o objeto `RegistrationNumber` é criado corretamente quando recebe uma matrícula válida com 10 dígitos.

### 6.3

**`should trim external spaces before validation`**
Deve verificar se o objeto remove espaços externos antes de aplicar as validações.

### 6.4

**`should throw when registration number is empty after trim`**
Deve garantir que o objeto rejeite matrícula vazia após a normalização com `trim`.

### 6.5

**`should throw when registration number contains non-digit characters`**
Deve garantir que o objeto rejeite matrículas com caracteres não numéricos.

### 6.6

**`should throw when registration number contains spaces`**
Deve garantir que o objeto rejeite matrículas que contenham espaços.

### 6.7

**`should throw when registration number has less than 7 digits`**
Deve garantir que o objeto rejeite matrículas com comprimento inferior ao mínimo permitido.

### 6.8

**`should throw when registration number has 8 or 9 digits`**
Deve garantir que o objeto rejeite matrículas com quantidade intermediária de dígitos não permitida.

### 6.9

**`should throw when registration number has more than 10 digits`**
Deve garantir que o objeto rejeite matrículas com comprimento superior ao máximo permitido.

### 6.10

**`should preserve normalized registration number value when valid`**
Deve garantir que, sendo válida, a matrícula fique armazenada em sua forma normalizada.

### 6.11

**`should compare equal registration numbers by value`**
Deve verificar igualdade por valor, caso essa semântica exista no objeto.

---

## 7. `Student`

`Student` é a entidade central do domínio. Seus testes devem verificar a consistência do estado inicial e a composição correta com os objetos de domínio associados.

### 7.1

**`should create Student with provided id, name, email and registration number`**
Deve verificar se a entidade `Student` é criada corretamente com os dados recebidos.

### 7.2

**`should create Student with active status by default`**
Deve garantir que todo estudante seja criado com status inicial `active`.

### 7.3

**`should expose student data in consistent state`**
Deve verificar se a entidade mantém seus dados em estado consistente após a criação.

### 7.4

**`should preserve identity once created`**
Deve garantir que a identidade do estudante, uma vez criada, seja preservada corretamente pela entidade.
