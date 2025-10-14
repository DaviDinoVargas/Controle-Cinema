export const environment = {
  production: false,

  // 🔑 Sua API base e chave de acesso
  apiBaseUrl: 'https://api.themoviedb.org/3',
  apiKey: '9a36ad0248315b240a8de7bd022bb5b5', // coloque sua chave de API normal (não o token)

  // 🔒 Token de leitura (para Authorization: Bearer)
  accessToken: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YTM2YWQwMjQ4MzE1YjI0MGE4ZGU3YmQwMjJiYjViNSIsIm5iZiI6MTc2MDQ2MTU5MC45MTM5OTk4LCJzdWIiOiI2OGVlODMxNmY4YmJiN2Y2NzcwZDgyNmEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Zu0dFuB--xQEeLA7qvi-mkcRHeWK3ua9tSEH94TL2jw',

  // Idioma padrão das requisições
  defaultLanguage: 'pt-BR'
};
