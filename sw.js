// Recebe o "empurrao" da Apple/Google e mostra a notificacao.
// No iOS TODO push tem que virar notificacao visivel, senao o sistema corta a permissao.
self.addEventListener('push', evento => {
  let dados = { texto: '' };
  try { dados = evento.data.json(); }
  catch (_) { if (evento.data) dados.texto = evento.data.text(); }
  // Titulo vazio e proposital: faz o "from <app>" que o iOS gruda subir para a primeira
  // linha, deixando o texto inteiro embaixo. So cai no padrao se o campo nem veio.
  const titulo = typeof dados.titulo === 'string' ? dados.titulo : 'Notificação';
  evento.waitUntil(
    self.registration.showNotification(titulo, {
      body: dados.texto || '',
      icon: 'icone.png',
      badge: 'icone.png',
      // sem "tag": assim elas empilham na tela, em vez de uma substituir a outra
    })
  );
});

self.addEventListener('notificationclick', evento => {
  evento.notification.close();
  evento.waitUntil(clients.openWindow('./'));
});

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', evento => evento.waitUntil(clients.claim()));
