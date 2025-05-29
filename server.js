// Подключаем встроенные модули
const http = require('http');
const fs = require('fs');
const path = require('path');

// Создаем HTTP-сервер
const server = http.createServer((req, res) => {
  if (req.url === '/') {
    // Отдаем HTML-страницу
    fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Ошибка загрузки index.html');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  } else if (req.url === '/events') {
    // Устанавливаем заголовки для SSE
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });

    // Отправляем событие каждую секунду
    const interval = setInterval(() => {
      const message = `data: ${new Date().toLocaleTimeString()}\n\n`;
      res.write(message); // SSE требует \n\n в конце
    }, 1000);

    // Очистка по закрытию соединения
    req.on('close', () => {
      clearInterval(interval);
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

// Запускаем сервер
server.listen(3000, () => {
  console.log('Сервер запущен на http://localhost:3000');
});
