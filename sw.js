// Recebe o "empurrao" da Apple/Google e mostra a notificacao.
// No iOS TODO push tem que virar notificacao visivel, senao o sistema corta a permissao.
self.addEventListener('push', evento => {
  let dados = { titulo: 'Notificação', texto: '' };
  try { dados = evento.data.json(); }
  catch (_) { if (evento.data) dados.texto = evento.data.text(); }
  evento.waitUntil(
    self.registration.showNotification(dados.titulo || 'Notificação', {
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
