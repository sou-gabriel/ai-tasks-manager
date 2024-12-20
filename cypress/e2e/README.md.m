Foi utilizado a biblioteca React Query para me auxiliar nas buscas por tarefas,
além de prover estados referentes ao carregamento das informações e invalidação
das tarefas de uma maneira bem prática. Para acelerar a busca por tasks é realizado
uma pré-busca durante a build da página inicial, onde quando entramos no TasksList (um client-component)
já temos praticamente os dados das tasks carregados, o que aprimora e muito
a experiência do usuário na visualização inicial dos primeiros itens da listagem.
Um motivo do uso do React Query também foi o cache das tasks, o que impede
buscas desnecessárias para recuperar esses dados, o que é crucial nessa aplicação, pois
essas chamadas consomem meu plano na API da OpenAI para geração das sugestões.

Falando sobre a API da Open AI, decidi integrar com o recurso de generateText para matching
das sugestões de tarefas relacionadas com base no nome das tasks que alimentei no prompt. Esperando
que o output dessa utilização retorne dos itens que eu listei para ela, os que mais
fazem sentido de acordo com o termo inputado pelo usuário.

Também foi utilizado a biblioteca Nuqs para me auxiliar a manipular os query params
da aplicação, atualizando-os diretamente na URL de maneira instantânea, e me permitindo
manipulá-los como simples states usuais do React. O motivo para adoção dessa biblioteca foi
que eu precisava recuperar a pesquisa do usuário em um componente irmão ao SearchTasks, mas meu
objetivo foi evitar fazer um lift-state para compartilhar esse estado e optei por armazená-lo
diretamente na URL mesmo, o que até facilita para o usuário caso ele deseja compartilhar
o resultado da pesquisa dele parao outros usuários, por exemplo.

Para estilização, optei por usar o Shadcn com toda uma gama de componentes já pré-criados
para mim e com uma UI muito boa, o que me atendeu muito bem.

Para os testes optei pelo Cypress para testes end-to-end, realizando as operações de criação, edição e deleção
de uma task.
