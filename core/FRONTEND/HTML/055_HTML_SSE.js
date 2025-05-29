// обслуживание SSE-событий для файла 055_HTML_SSE.html
// FAST DEV

const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {

  if (req.url === "/") {
    const filePath = path.join(__dirname, "./055_HTML_SSE.html");

    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end("Error loading HTML");
        return;
      }

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(content);
    });

  } else if (req.url === "/the_route") {

    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "Access-Control-Allow-Origin": "*",
    });

    const interval = setInterval(() => {
      const now = new Date();
      const formatted = now.toUTCString().replace("GMT", "+0000");
      const message = `The server time is: ${formatted}`;
      
      res.write(`data: ${message}\n\n`);
    }, 5000);

    req.on("close", () => {
      clearInterval(interval);
    });

  } else {
    res.writeHead(404);
    res.end("Not found");
  }
});

const PORT = 3003;

server.listen(PORT, () => {
  console.log(`SSE сервер запущен на http://localhost:${PORT}`);
});




// // FAST DEV COMMENTS
// // Импортируем встроенные модули Node.js
// const http = require("http");   // для создания HTTP-сервера
// const fs = require("fs");       // для работы с файловой системой
// const path = require("path");   // для безопасной работы с путями к файлам

// // Создаем HTTP-сервер
// const server_2 = http.createServer((req, res) => {

//   // Если запрошен корневой путь ("/")
//   if (req.url === "/") {
//     // Формируем абсолютный путь к HTML-файлу
//     const filePath = path.join(__dirname, "./055_HTML_SSE.html");

//     // Читаем HTML-файл асинхронно
//     fs.readFile(filePath, (err, content) => {
//       if (err) {
//         // Если произошла ошибка при чтении файла — отправляем 500 (Internal Server Error)
//         res.writeHead(500);
//         res.end("Error loading HTML");
//         return;
//       }
//       // Если файл успешно прочитан — отправляем его с кодом 200 и правильным заголовком Content-Type
//       res.writeHead(200, { "Content-Type": "text/html" });
//       res.end(content);
//     });

//   // Если запрошен путь "/the_route" — это endpoint для Server-Sent Events
// } else if (req.url === "/the_route") {

//     // Устанавливаем специальные заголовки для SSE
//     res.writeHead(200, {
//       "Content-Type": "text/event-stream", // Указывает, что это поток событий
//       "Cache-Control": "no-cache",         // Отключаем кэширование
//       Connection: "keep-alive",            // Поддерживаем соединение открытым
//       "Access-Control-Allow-Origin": "*",  // Разрешаем доступ со всех источников (CORS)
//     });

//     // Устанавливаем интервал отправки сообщений — каждую 1 секунду
//     const interval_2 = setInterval(() => {
//       const now_1 = new Date(); // Получаем текущее время
//       const formatted_2 = now_1.toUTCString().replace("GMT", "+0000");
//       const message_2 = `The server time is: ${formatted_2}`;
      
//       // Отправляем сообщение клиенту в формате SSE
//       res.write(`data: ${message_2}\n\n`);
//     }, 5000);

//     // Обрабатываем закрытие соединения со стороны клиента
//     req.on("close", () => {
//       clearInterval(interval_2); // Очищаем интервал, чтобы не было утечки памяти
//     });

//   // Если запрошен неизвестный маршрут
//   } else {
//     res.writeHead(404);          // Отправляем статус 404 (Not Found)
//     res.end("Not found");        // Сообщаем, что ресурс не найден
//   }
// });

// // Устанавливаем порт, на котором будет работать сервер
// const PORT_2 = 3002;
// // Запускаем сервер и выводим сообщение в консоль
// server_2.listen(PORT_2, () => {
//   console.log(`SSE сервер запущен на http://localhost:${PORT_2}`);
// });


