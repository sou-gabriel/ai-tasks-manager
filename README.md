# AI Tasks Manager

## Descrição
Este é um projeto desenvolvido com Next.js que utiliza a API da OpenAI para sugerir opções de tasks durante a pesquisa. O projeto é containerizado usando Docker para facilitar a configuração e execução do PostgreSQL.

## Pré-requisitos
Antes de começar, certifique-se de ter instalado:
- Docker
- Docker Compose
- Uma chave de API da OpenAI

## Configuração da API Key
1. Crie uma conta na [OpenAI](https://platform.openai.com/signup)
2. Gere sua API Key no [dashboard da OpenAI](https://platform.openai.com/api-keys)
3. Seta o valor da API Key na variável de ambiente "OPENAI_API_KEY"

## Inicializar projeto
1. Inicie o container do seu banco executando ```docker compose up```
2. Instale as dependências do projeto com ```pnpm install```
2. Suba a aplicação localmente com ``pnpm dev``

## Motivo escolhas tech

Foi utilizado o React Query para auxiliar nas buscas por tarefas, além de prover estados referentes ao carregamento das informações e invalidação das tarefas de maneira prática. Para acelerar a busca por tasks, é realizada uma pré-busca durante a build da página inicial. Assim, quando entramos no TasksList (um client-component), já temos praticamente os dados das tasks carregados, o que melhora significativamente a experiência do usuário na visualização inicial dos primeiros itens da listagem. Um dos motivos para o uso do React Query também foi o cache das tasks, o que evita buscas desnecessárias para recuperar esses dados - algo crucial nesta aplicação, pois essas chamadas consomem o plano na API da OpenAI para geração das sugestões.

Em relação à API da OpenAI, foi integrado o recurso de generateText para matching das sugestões de tarefas relacionadas com base no nome das tasks fornecidas no prompt. O objetivo é que o output dessa utilização retorne, dentre os itens listados, aqueles que mais fazem sentido de acordo com o termo inserido pelo usuário.

A biblioteca Nuqs foi utilizada para auxiliar na manipulação dos query params da aplicação, atualizando-os diretamente na URL de maneira instantânea e permitindo manipulá-los como simples states do React. A adoção dessa biblioteca se deu pela necessidade de recuperar a pesquisa do usuário em um componente irmão ao SearchTasks. Para evitar fazer um lift-state para compartilhar esse estado, optou-se por armazená-lo diretamente na URL, o que também facilita para o usuário caso ele deseje compartilhar o resultado da sua pesquisa com outros usuários.

Para estilização, foi escolhido o Shadcn, que oferece uma ampla gama de componentes pré-criados com uma UI de alta qualidade, atendendo muito bem às necessidades do projeto.

Para os testes, foi utilizado o Cypress para testes end-to-end, realizando as operações de criação, edição e deleção de uma task.
