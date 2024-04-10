module.exports = function(bot){
    bot.onText(/\/id/, (msg) => {
        const chatId = msg.chat.id;
      
        // Comprobar si el comando fue enviado en respuesta a otro mensaje
        if (msg.reply_to_message) {
          const userId = msg.reply_to_message.from.id;
          bot.sendMessage(chatId, `<b>👤ID del usuario:</b> <code>${userId}</code>`, {
            parse_mode: "HTML",
          });
        } else {
          bot.sendMessage(chatId, `<b>👤Tú ID:</b> <code>${msg.from.id}</code>`, {
            parse_mode: "HTML",
          });
        }
      });
      
      bot.onText(/^\/chatid/, (msg) => {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, `<b>🔏ID del chat:</b> <code>${chatId}</code>`, {
          parse_mode: "HTML",
        });
      });
      
}