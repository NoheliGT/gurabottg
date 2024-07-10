const TelegramBot = require("node-telegram-bot-api");
const fs = require("fs");
const requestPromise = require('request-promise');
//consta SpamWatch = require("spamwatch");
const { getOnAir, searchAnime  } = require ('animeflv-api');
//const reverseImageSearch = require("node-reverse-image-search");
const raejs = require("@jodacame/raejs");
const {search} = require("pinterest-dl");
const { youtube } = require('btch-downloader')
var telefile = require("telefile");
const AnimeScraper = require("exa-anime-scraper");
const anime = new AnimeScraper.Animefenix();
const randomanime = require("random-anime");
const { Manga, Character } = require("mailist");
const translate = require("@vitalets/google-translate-api");
const googleTTS = require("google-tts-api");
const { AnimeWallpaper, AnimeSource  } = require("anime-wallpaper");
const wall = new AnimeWallpaper();
var express = require("express");
const axios = require('axios');
var convertapi = require("convertapi")("RGaQlTBWCjkfw889");
var tcpp = require('tcp-ping');
/* const { createCanvas, loadImage } = require('canvas');



const path = require('path');
 */
const {
  GOOGLE_IMG_SCRAP,
  GOOGLE_IMG_INVERSE_ENGINE_URL,
  GOOGLE_IMG_INVERSE_ENGINE_UPLOAD,
  GOOGLE_QUERY,
} = require("google-img-scrap");


var app = express();

const port =  process.env.PORT || 4000;
app.listen(port);
app
  .get("/", (request, response) => {
    var result = "Bot listo!";
    response.send(result);
  })



/*BETA = 1989987277:AAFBKzjLvPkyFBHzJQ-UaJlOfe12T3ln2dU*/////////////////////////
/*ORIGINAL = 1785797976:AAGjLNTIAEuVTHvX9AvNO9qEDFKwNMmZgXM*/
const bot = new TelegramBot("1785797976:AAGjLNTIAEuVTHvX9AvNO9qEDFKwNMmZgXM", {
  polling: true,
});

/* const client = new SpamWatch.Client(
  "BfIfgL9JHEcMouxYYDrvkeA8lIQo5zwjjICiObGqn1fx_8hTKdDXGhGMftQgYwXJ"
); */
//
//MODULOS
const kissCommand = require('./commands/besar');
const quizanime = require('./commands/quizanime');
const id = require('./commands/id');
const abrazo = require('./commands/abrazar');

kissCommand(bot);
quizanime(bot);
id(bot);
abrazo(bot);


//INICIO COMPLETOSSSs

const firebase = require('firebase/app');
require('firebase/firestore');

firebase.initializeApp({
  apiKey: "AIzaSyDmDpGZdg_ZzTOiia83C3W4cprdwgHlqIE",
  authDomain: "gurabot-a5f12.firebaseapp.com",
  projectId: "gurabot-a5f12",
  storageBucket: "gurabot-a5f12.appspot.com",
  messagingSenderId: "691315150914",
  appId: "1:691315150914:web:b8039954644c4995801ddb"
});

const db = firebase.firestore();

/* let messageCount = {};

// Manejamos el comando /all
bot.onText(/\/chattop/, (msg) => {
  const chatId = msg.chat.id;
  const messageId = msg.message_id;

  // Verifica si el mensaje fue enviado desde un chat privado
  if (msg.chat.type === 'private') {
    bot.sendMessage(chatId, 'Este comando solo funciona en grupos titán❌.');
    return;
  }

  // Creamos los botones inline para las opciones
  const options = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: '🕺Grupo', callback_data: 'group' }, { text: '🌐Global', callback_data: 'global' }]
      ]
    })
  };

  // Enviamos el mensaje con los botones inline
  bot.sendMessage(chatId, '¿🏆Qué top quieres revisar titán?', options)
    .then(sentMessage => {
      // Guardamos el mensaje ID para poder editarlo luego
      const messageId = sentMessage.message_id;
    })
    .catch(error => {
      console.error('Error:', error);
    });
});

// Manejamos las respuestas a los botones inline
bot.on('callback_query', async (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const messageId = callbackQuery.message.message_id;
  const data = callbackQuery.data;

  // Dependiendo del botón presionado, mostramos el top correspondiente
  if (data === 'group') {
    showGroupTop(chatId, messageId);
  } else if (data === 'global') {
    showGlobalTop(chatId, messageId);
  } else if (data === 'menu') {
    // Si se presiona el botón de regresar, editamos el mensaje para mostrar el menú principal
    bot.editMessageText('¿🏆Qué top quieres revisar titán?', {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: {
        inline_keyboard: [
          [{ text: '🕺Grupo', callback_data: 'group' }, { text: '🌐Global', callback_data: 'global' }]
        ]
      }
    });
  }
});

// Función para mostrar el top del grupo
async function showGroupTop(chatId, messageId) {
  // Obtenemos todos los mensajes del grupo
  const messages = await db.collection('messages').where('chatId', '==', chatId).get();
  
  // Obtenemos el nombre del grupo
  const groupInfo = await bot.getChat(chatId);
  const groupName = groupInfo.title;

  // Reiniciamos el recuento de mensajes
  messageCount = {};

  // Contamos los mensajes por usuario
  messages.forEach(doc => {
    const userId = doc.data().userId;
    if (messageCount[userId]) {
      messageCount[userId]++;
    } else {
      messageCount[userId] = 1;
    }
  });

  // Ordenamos los usuarios por la cantidad de mensajes
  const topUsers = Object.entries(messageCount)
                      .sort(([,a],[,b]) => b-a)
                      .slice(0, 5);

  let message = `🌡️Top 5 usuarios con más mensajes en ${groupName}:\n\n`;

  // Obtener información de cada usuario y enviar el mensaje
  for (const [userId, count] of topUsers) {
    const user = await bot.getChatMember(chatId, userId);
    message += `🏅. ${user.user.first_name} ${user.user.last_name || ''}: ${count}\n`;
  }

  // Editamos el mensaje original con el nuevo mensaje y los botones
  bot.editMessageText(message, {
    chat_id: chatId,
    message_id: messageId,
    reply_markup: {
      inline_keyboard: [
        [{ text: '⬅️Regresar', callback_data: 'menu' }]
      ]
    }
  });
}

// Función para mostrar el top global
async function showGlobalTop(chatId, messageId) {
  // Obtenemos todos los mensajes de todos los grupos
  const messages = await db.collection('messages').get();
  
  // Reiniciamos el recuento de mensajes
  messageCount = {};

  // Contamos los mensajes por usuario
  messages.forEach(doc => {
    const userId = doc.data().userId;
    if (messageCount[userId]) {
      messageCount[userId]++;
    } else {
      messageCount[userId] = 1;
    }
  });

  // Ordenamos los usuarios por la cantidad de mensajes
  const topUsers = Object.entries(messageCount)
                      .sort(([,a],[,b]) => b-a)
                      .slice(0, 5);

  let message = '🌡️Top 5 usuarios con más mensajes global:\n\n';

  // Obtener información de cada usuario y enviar el mensaje
  for (const [userId, count] of topUsers) {
    const user = await bot.getChatMember(chatId, userId);
    message += `🏅. ${user.user.first_name} ${user.user.last_name || ''}: ${count}\n`;
  }

  // Editamos el mensaje original con el nuevo mensaje y los botones
  bot.editMessageText(message, {
    chat_id: chatId,
    message_id: messageId,
    reply_markup: {
      inline_keyboard: [
        [{ text: '⬅️Regresar', callback_data: 'menu' }]
      ]
    }
  });
}

// Manejamos los nuevos mensajes y los guardamos en la base de datos
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const messageId = msg.message_id;

  // Guardamos el mensaje en la base de datos
  await db.collection('messages').add({
    chatId: chatId,
    userId: userId,
    messageId: messageId
  });
}); */

/* bot.onText(/\/chattop/, (msg) => {
  const chatId = msg.chat.id;
  const messageId = msg.message_id;

  // Verifica si el mensaje fue enviado desde un chat privado
  if (msg.chat.type === 'private') {
    bot.sendMessage(chatId, 'Este comando solo funciona en grupos.');
    return;
  }

  // Creamos los botones inline para las opciones
  const options = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: '🕺Grupo', callback_data: 'group' }, { text: '🌐Global', callback_data: 'global' }]
      ]
    })
  };

  // Enviamos el mensaje con los botones inline
  bot.sendMessage(chatId, '¿🏆Qué top quieres revisar titán?', options)
    .then(sentMessage => {
      // Guardamos el mensaje ID para poder editarlo luego
      const messageId = sentMessage.message_id;
    })
    .catch(error => {
      console.error('Error:', error);
    });
});

// Manejamos las respuestas a los botones inline
bot.on('callback_query', async (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const messageId = callbackQuery.message.message_id;
  const data = callbackQuery.data;

  // Dependiendo del botón presionado, mostramos el top correspondiente
  if (data === 'group') {
    showGroupTop(chatId, messageId);
  } else if (data === 'global') {
    showGlobalTop(chatId, messageId);
  } else if (data === 'menu') {
    // Si se presiona el botón de regresar, editamos el mensaje para mostrar el menú principal
    bot.editMessageText('¿🏆Qué top quieres revisar titán?', {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: {
        inline_keyboard: [
          [{ text: '🕺Grupo', callback_data: 'group' }, { text: '🌐Global', callback_data: 'global' }]
        ]
      }
    });
  }
});

// Función para mostrar el top del grupo
async function showGroupTop(chatId, messageId) {
  // Obtenemos el registro de mensajes por usuario en el grupo
  const groupMessagesRef = db.collection('groupMessages').doc(chatId);
  const doc = await groupMessagesRef.get();

  if (!doc.exists) {
    // Si el documento no existe, enviamos un mensaje indicando que no hay suficientes datos
    bot.sendMessage(chatId, 'No hay suficientes datos para mostrar el top en este grupo.');
    return;
  }

  const groupData = doc.data();

  // Ordenamos los usuarios por la cantidad de mensajes
  const topUsers = Object.entries(groupData)
                      .sort(([,a],[,b]) => b-a)
                      .slice(0, 5);

  let message = `🌡️Top 5 usuarios con más mensajes en este grupo:\n\n`;

  // Obtener información de cada usuario y enviar el mensaje
  for (const [userId, count] of topUsers) {
    const user = await bot.getChatMember(chatId, userId);
    message += `🏅. ${user.user.first_name} ${user.user.last_name || ''}: ${count}\n`;
  }

  // Editamos el mensaje original con el nuevo mensaje y los botones
  bot.editMessageText(message, {
    chat_id: chatId,
    message_id: messageId,
    reply_markup: {
      inline_keyboard: [
        [{ text: '⬅️Regresar', callback_data: 'menu' }]
      ]
    }
  });
}

// Función para mostrar el top global
async function showGlobalTop(chatId, messageId) {
  // Obtenemos todos los registros de mensajes por usuario en todos los grupos
  const groupMessagesRefs = await db.collection('groupMessages').listDocuments();

  const globalData = {};

  // Recorremos los registros de mensajes por usuario en todos los grupos
  for (const groupMessagesRef of groupMessagesRefs) {
    const doc = await groupMessagesRef.get();
    const groupData = doc.data();

    // Sumamos los mensajes de cada usuario en el registro global
    for (const [userId, count] of Object.entries(groupData)) {
      globalData[userId] = (globalData[userId] || 0) + count;
    }
  }

  // Ordenamos los usuarios por la cantidad de mensajes
  const topUsers = Object.entries(globalData)
                      .sort(([,a],[,b]) => b-a)
                      .slice(0, 5);

  let message = '🌡️Top 5 usuarios con más mensajes global:\n\n';

  // Obtener información de cada usuario y enviar el mensaje
  for (const [userId, count] of topUsers) {
    const user = await bot.getChatMember(chatId, userId);
    message += `🏅. ${user.user.first_name} ${user.user.last_name || ''}: ${count}\n`;
  }

  // Editamos el mensaje original con el nuevo mensaje y los botones
  bot.editMessageText(message, {
    chat_id: chatId,
    message_id: messageId,
    reply_markup: {
      inline_keyboard: [
        [{ text: '⬅️Regresar', callback_data: 'menu' }]
      ]
    }
  });
}

// Manejamos los nuevos mensajes y actualizamos los registros de mensajes por usuario en el grupo
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  // Actualizamos el registro de mensajes por usuario en el grupo
  const groupMessagesRef = db.collection('groupMessages').doc(chatId);
  await groupMessagesRef.set({
    [userId]: firebase.firestore.FieldValue.increment(1)
  }, { merge: true });
});
 */
let lastFishCommandTime = {};

bot.onText(/\/fish/, (msg) => {
  try {
    const now = new Date().getTime();
    const userId = msg.from.id;

    // Comprobar si el usuario ha ejecutado el comando /fish antes y ha pasado menos de 15 minutos
    if (lastFishCommandTime[userId] && now - lastFishCommandTime[userId] < 15 * 60 * 1000) {
      const remainingTime = Math.ceil((15 * 60 * 1000 - (now - lastFishCommandTime[userId])) / 1000);
      bot.sendMessage(msg.chat.id, `<b>Por favor</b> ${msg.from.first_name}, espera <code>${remainingTime}</code> segundos antes de usar el comando /fish nuevamente.`, {parse_mode: "HTML"});
      return;
    }

    const fishEmojis = ['🐡', '🐟', '🐠', '🦀', '🦑', '🐬', '🦈', '🐊', '🐳'];
    const fishNames = ['Blowfish', 'Pescado normal', 'Pez tropical', 'Cangrejo(s)', 'Calamar', 'Delfín(es)', 'Tiburón(es)', 'Cocodrilo(s)', 'Ballena(s)'];

    // Generar un número aleatorio entre 1 y 100
    const randomNumber = Math.floor(Math.random() * 100) + 1;

    // Si el número aleatorio es mayor que 80, mostrar mensaje de que el cebo falló
    if (randomNumber > 80) {
      bot.sendMessage(msg.chat.id, "Al igual que en la vida real, *tu anzuelo falló titán.* \n\nVer tu pez: /myfish", {parse_mode: "Markdown"});
      return;
    }

    // Generar un número aleatorio para seleccionar un pez
    const randomIndex = Math.floor(Math.random() * fishEmojis.length);
    const selectedFish = fishNames[randomIndex];
    const selectedEmoji = fishEmojis[randomIndex];

    // Mensaje de respuesta
    const message = `*¡🎣Buen anzuelo titán!* Atrapaste un(a) ${selectedFish}: ${selectedEmoji} \n\n*Ver tu pez:* /myfish`;
    bot.sendMessage(msg.chat.id, message, {parse_mode: "Markdown"});

    // Guardar el pez atrapado en Firestore
    db.collection('peces').add({
      userId: msg.from.id,
      fish: selectedFish,
      emoji: selectedEmoji
    });

    // Actualizar el tiempo de ejecución del comando /fish para el usuario
    lastFishCommandTime[userId] = now;
  } catch (error) {
    console.error('Error al procesar el comando /fish:', error);
    bot.sendMessage(msg.chat.id, 'Ocurrió un error al procesar el comando. Por favor, inténtalo de nuevo más tarde.');
  }
});
/////////////
function getFishEmoji(fishName) {
  switch (fishName) {
    case 'Blowfish':
      return '🐡';
    case 'Pescado normal':
      return '🐟';
    case 'Pez tropical':
      return '🐠';
    case 'Cangrejo(s)':
      return '🦀';
    case 'Calamar':
      return '🦑';
    case 'Delfín(es)':
      return '🐬';
    case 'Tiburón(es)':
      return '🦈';
    case 'Cocodrilo(s)':
      return '🐊';
    case 'Ballena(s)':
      return '🐳';
    default:
      return ''; // Devolver cadena vacía si el nombre del pez no coincide con ninguno de los casos anteriores
  }
}

// Comando /myfish
bot.onText(/\/myfish/, async (msg) => {
  try {
    // Consultar los peces atrapados por el usuario desde Firestore
    const userId = msg.from.id;
    const userPecesRef = db.collection('peces').where('userId', '==', userId);
    const snapshot = await userPecesRef.get();

    // Obtener el primer nombre del usuario
    const firstName = msg.from.first_name;

    // Mensaje de respuesta
    let message;
    if (snapshot.empty) {
      message = `No tienes ningún pez en tu colección, ${firstName}. ¡Empieza a atrapar algunos!`;
    } else {
      message = `Peces de ${firstName}:\n`;
      const fishCounts = {};
      snapshot.forEach(doc => {
        const fish = doc.data().fish;
        if (fishCounts[fish]) {
          fishCounts[fish]++;
        } else {
          fishCounts[fish] = 1;
        }
      });

      // Construir el mensaje de respuesta
      Object.keys(fishCounts).forEach(fish => {
        const emoji = getFishEmoji(fish); // Obtener el emoji correspondiente al pez usando la función auxiliar
        const fishName = fishCounts[fish] > 1 ? fish : fish.substring(0, fish.length); // Conservar el nombre completo si es más de 1
        message += `${emoji} - ${fishName}: ${fishCounts[fish]}\n`;
      });

      // Calcular el total de peces
      const totalFish = snapshot.size;
      message += `\n🐠🦑🐊 - Todos los peces: ${totalFish}`;
    }

    // Configuración del botón
    const keyboard = {
      inline_keyboard: [
        [
          { text: 'Ver noticias', url: 'https://t.me/Gawrguranoticias' }
        ]
      ]
    };

    // Opciones del mensaje
    const options = {
      reply_markup: JSON.stringify(keyboard)
    };

    // Enviar el mensaje con el botón
    bot.sendMessage(msg.chat.id, message, options);
  } catch (error) {
    console.error('Error al procesar el comando /myfish:', error);
    bot.sendMessage(msg.chat.id, 'Ocurrió un error al procesar el comando. Por favor, inténtalo de nuevo más tarde.');
  }
});
/////////////////
// Comando /loteriaa
bot.onText(/\/loteria(?:\s+(\d+))?/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id.toString();
  const username = msg.from.first_name;
  const number = match[1] ? parseInt(match[1]) : null; // Comprobar si se proporcionó un número

  // Si no se proporcionó un número o si está fuera del rango 1 al 25, enviar un mensaje de instrucción
  if (!number || number < 1 || number > 25) {
    bot.sendMessage(chatId, '🐳Por favor, elige un número titán dentro del rango del 1 al 25 para jugar a la lotería.\n\nEjemplo: /loteria 23');
    return;
  }

  // Verificar si han pasado al menos 10 minutos desde el último juego
  const lastPlaySnapshot = await db.collection('lottery').doc(userId).get();
  if (lastPlaySnapshot.exists) {
    const lastPlayTime = lastPlaySnapshot.data().timestamp;
    const currentTime = Date.now();
    const elapsedTime = currentTime - lastPlayTime;
    if (elapsedTime < 600000) {
      bot.sendMessage(chatId, '🖐️Debes esperar al menos 10 minutos para el siguiente intento titán.');
      return;
    }
  }

  // Generar número aleatorio
  const randomNum = Math.floor(Math.random() * 25) + 1;

  // Verificar si acertó
  if (number === randomNum) {
    // Incrementar puntos
    await db.collection('users').doc(userId).set(
      { username, points: firebase.firestore.FieldValue.increment(1) },
      { merge: true }
    );
    bot.sendMessage(chatId, `¡🐳Felicidades ${username}! Acertaste el número🥳. Has ganado ➕1 punto titán.`);
  } else {
    bot.sendMessage(chatId, `❌Lo siento ${username}, el número ganador era ${randomNum}. Inténtalo de nuevo titán.`);
  }

  // Registrar el tiempo del último juego
  await db.collection('lottery').doc(userId).set({ timestamp: Date.now() });
});


bot.onText(/\/top/, async (msg) => {
  const chatId = msg.chat.id;

  // Obtener los 10 usuarios con más puntos
  const topUsersSnapshot = await db.collection('users')
    .orderBy('points', 'desc')
    .limit(10)
    .get();

  let topUsersMessage = '🏅Top 10 usuarios en loteria global (Gawr Gura):\n\n';
  topUsersSnapshot.forEach((doc, index) => {
    const userData = doc.data();
    const userId = doc.id;
    const name = userData.username || 'Usuario sin nombre';
    topUsersMessage += `🏆. ${name} | <code>${userId}</code> ➡  <b>${userData.points}</b> puntos\n`;
  });

  bot.sendMessage(chatId, topUsersMessage, {parse_mode: "HTML"});
})

bot.onText(/\/eliminar_usuario (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const userIds = match[1];

  bot.banChatMember(chatId, userIds).then(() => {
    bot.sendMessage(chatId, 'El usuario ha sido eliminado del grupo.');
    db.collection('users').doc(userIds).set({ banned: true });
  }).catch((error) => {
    bot.sendMessage(chatId, 'Ha ocurrido un error al eliminar al usuario.');
    console.error(error);
  });
});


bot.onText(/\/ban (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  var userId = msg.from.id;
  const userIds = match[1];
  bot.getChatMember(chatId, userId).then(function (data) {
    if (data.status == "creator" || data.status == "administrator") {
      bot.kickChatMember(chatId, userIds).then(() => {
        bot.sendMessage(
          chatId,
          `🔪<i>El usuario</i> <i>ha sido eliminado del grupo, ¡sin posibilidad de ingresos!</i> \n\n🐬<b>ID:</b> (<code>${userIds}</code>)`,
          { parse_mode: "HTML" }
        );
        db.collection('users').doc(userIds).set({ banned: true });
      }).catch((error) => {
        bot.sendMessage(chatId, 'Ha ocurrido un error al eliminar al usuario.');
        console.error(error);
      });
    } else {
      bot.sendMessage(
        chatId,
        "Solo el creador y administradores pueden usar este comando:("
      );
    }
  });
});
//0.53.0
bot.onText(/\/unban (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  var userIds = msg.from.id;
  const userId = match[1];
  bot.getChatMember(chatId, userIds).then(function (data) {
    if (data.status == "creator" || data.status == "administrator") {
      bot.unbanChatMember(chatId, userId).then(() => {
        bot.sendMessage(
          chatId,
          `🔪<i>El usuario</i> <i>ha sido desbaneado del grupo, ¡Tiene una segunda oportunidad!</i>`,
          { parse_mode: "HTML" }
        );
        db.collection('users').doc(userId).set({ banned: false }, { merge: true });
      }).catch((error) => {
        bot.sendMessage(chatId, 'Ha ocurrido un error al eliminar al usuario.');
        console.error(error);
      });
    } else {
      bot.sendMessage(
        chatId,
        "Solo el creador y administradores pueden usar este comando:("
      );
    }
  });
});



bot.onText(/\/warn (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = match[1];
  const userIds = msg.from.id;

  try {
    const chatMember = await bot.getChatMember(chatId, userIds);
    if (chatMember.status !== "creator" && chatMember.status !== "administrator") {
      bot.sendMessage(chatId, "Solo el creador y administradores pueden usar este comando :(");
      return;
    }

    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      console.error(`¡El usuario con ID ${userId} no existe!`);
      return;
    }

    const userData = userDoc.data();
    let warnings = userData.warnings || 0;

    if (warnings >= 3) {
      warnings = 0;
    } else {
      warnings++;
    }

    await userRef.set({ warnings }, { merge: true });

    bot.sendMessage(chatId, `🔪<i>¡Cuidado titán!</i> \n\n<i> 🛑 Advertencia: <b>${warnings}/3</b> </i> \n\n🐬<b>ID:</b> (<code>${userId}</code>)`, { parse_mode: "HTML" });

    if (warnings === 3) {
      await bot.kickChatMember(chatId, userId);
      bot.sendMessage(chatId, `🛑¡Este es el fin!, <i>El usuario ${userId} ha sido eliminado del grupo, ¡Suerte!</i>`, { parse_mode: "HTML" });
    }
  } catch (error) {
    console.error(`¡Ocurrió un error en la función /warn: ${error}!`);
  }
});



bot.onText(/\/unwarn (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  var userIds = msg.from.id;
  const userId = match[1];

  bot.getChatMember(chatId, userIds).then(function (data) {
    if (data.status == "creator" || data.status == "administrator") {
      const userRef = db.collection('users').doc(userId);
      userRef.get()
        .then((doc) => {
          const data = doc.data();
          const warnings = data ? data.warnings || 0 : 0;
    
          // Verificar si el usuario tiene al menos una advertencia para poder removerla
          if (warnings > 0) {
            // Remover una advertencia al usuario
            userRef.set({
              warnings: warnings - 1,
            }, { merge: true })
              .then(() => {
                bot.sendMessage(
                  chatId,
                  `🔪<i>¡Perfecto!</i> \n\n<i> ✅ Se ha removido una advertencia al usuario: <b>${warnings - 1}/3</b> </i> \n\n🐬<b>ID:</b> (<code>${userId}</code>)`,
                  { parse_mode: "HTML" }
                );
              })
              .catch((error) => {
                console.error(`¡Error al remover la advertencia!`);
              });
          } else {
            bot.sendMessage(chatId, `<i>¡Hey, Hey!, El usuario <code>${userId}</code> no tiene advertencias para remover.</i>`, {parse_mode: "HTML"});
          }
        })
        .catch((error) => {
          console.error(`Error al obtener las advertencias del usuario: ${error}`);
        });
   
     
    } else {
      bot.sendMessage(
        chatId,
        "Solo el creador y administradores pueden usar este comando:("
      );
    }
  });
});
/**************************************************COMANDO START********************************************************************/

bot.onText(/^\/start/, (msg) => {
  if (msg.chat.type == "supergroup") {
    bot.sendAnimation(
      msg.chat.id,
      "https://pa1.aminoapps.com/7751/2176acbf46a4e73df2804538dcedd0fe755fcdfer1-1010-1084_hq.gif",
      {
        caption:
          "🦈*¡Gawr Gura presente en el grupito!*, _¡Considera hacerme administradora para acceder a todos mis comandos!_",
        parse_mode: "Markdown",
      }
    );
  }
  if (msg.chat.type == "private") console.log(msg);
  {
    bot.sendPhoto(
      msg.from.id,
      "https://pbs.twimg.com/media/ElgqJReWkAAw2Hj.jpg",
      {
        caption: `*Hi, ¡Hi🦈!* [${msg.from.first_name}](tg://user?id=${msg.from.id}) \n\n_¡Has comenzado una aventura con muchos desafios conmigo Gawr Gura!, Ahora dejame mostrarte lo que puedo hacer por ti._  \n\n*¡Vamos!* dale a /help.`,
        parse_mode: "Markdown",
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "➕Añadir a un grupo",
                url: "http://t.me/gawrgurahelperbot?startgroup=true",
              },
              {
                text: "⛑Soporte",
                url: "http://t.me/Gawrguranoticias",
              },
            ],
          ],
        },
      }
    );
  }
});

/**************************************************ID USUARIOS**************************************************/



bot.onText(/^\/emisionanime/, async (msg) => {
  try {
      const chatId = msg.chat.id;
      const animes = await getOnAir();

      if (animes.length === 0) {
          bot.sendMessage(chatId, 'No hay resultados.');
          return;
      }

      const chunkSize = 5; // Tamaño de cada página
      let page = 0;
      let messageId = null;

      const sendAnimeChunk = () => {
          const start = page * chunkSize;
          const end = start + chunkSize;
          const currentAnimes = animes.slice(start, end);

          let keyboard = {
              inline_keyboard: []
          };

          if (page === Math.ceil(animes.length / chunkSize) - 1) {
              keyboard.inline_keyboard.push([{ text: 'Cerrar', callback_data: 'close' }]);
              if (page > 0) {
                  keyboard.inline_keyboard[0].push({ text: '◀️ Anterior', callback_data: 'prev' });
              }
          } else {
              keyboard.inline_keyboard.push([{ text: 'Siguiente ▶️', callback_data: 'next' }]);
              if (page > 0) {
                  keyboard.inline_keyboard[0].unshift({ text: '◀️ Anterior', callback_data: 'prev' });
              }
          }

          let message = '';
          currentAnimes.forEach(anime => {
              message += `🧧*Título:* ${anime.title}\n*🥋Tipo:* ${anime.type}\n➡️ [+Info](${anime.url})\n\n`;
          });

          const opts = {
              reply_markup: keyboard,
              parse_mode: 'Markdown'
          };

          if (messageId) {
              bot.editMessageText(message, { chat_id: chatId, message_id: messageId, ...opts });
          } else {
              bot.sendMessage(chatId, message, opts).then((sentMessage) => {
                  messageId = sentMessage.message_id;
              });
          }
      };

      sendAnimeChunk();

      bot.on('callback_query', (callbackQuery) => {
          const data = callbackQuery.data;
          if (data === 'prev') {
              page = Math.max(page - 1, 0);
              sendAnimeChunk();
          } else if (data === 'next') {
              page = Math.min(page + 1, Math.ceil(animes.length / chunkSize) - 1);
              sendAnimeChunk();
          } else if (data === 'close') {
              bot.editMessageText('¡Catálogo cerrado!, para volver abrir usa el comando /emisionanime titan.', { chat_id: chatId, message_id: messageId });
              bot.editMessageReplyMarkup({ inline_keyboard: [] }, { chat_id: chatId, message_id: messageId });
          }
      });

  } catch (error) {
      console.error('Error fetching anime data:', error);
      bot.sendMessage(chatId, 'Ocurrió un error al obtener la información de los animes.');
  }
});

const usuariosAutorizados = ['1701653200', '1812043697', '929203318', "6394321121", "1873607826", "1271825317"];

bot.onText(/\/musica (.+)/, async function (msg, match) {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const url = match[1];

  // Verificar si el usuario está autorizado
  if (!usuariosAutorizados.includes(userId.toString())) {
    bot.sendMessage(chatId, "Lo siento, no estás autorizado para usar este comando titán❌.");
    return;
  }

  try {
    bot.sendMessage(chatId, "*🎶Descargando música titán...* ¡Espera un momento por favor⚠️!", {parse_mode: "Markdown"});
    const data = await youtube(url);
    const mp3Url = data.mp3;

    // Descargar el archivo MP3
    const mp3FileName = `music_${Date.now()}.mp3`;
    const mp3FileStream = fs.createWriteStream(mp3FileName);
    const response = await axios.get(mp3Url, { responseType: 'stream' });
    response.data.pipe(mp3FileStream);

    // Cuando la descarga esté completa
    mp3FileStream.on('finish', () => {
      // Enviar el archivo MP3 como respuesta
      bot.sendAudio(chatId, mp3FileName)
        .then(() => {
          // Borrar el archivo temporal
          fs.unlinkSync(mp3FileName);
          console.log("Borrado.")
          bot.sendMessage(chatId, "*¡🎶Tu música está lista, titán!*", {parse_mode: "Markdown"});
        })
        .catch((error) => {
          console.error('Error al enviar el archivo de audio:', error);
          bot.sendMessage(chatId, "Error en la descarga:(")
        });
    });
  } catch (error) {
    console.error('Error al descargar la música:', error);
    bot.sendMessage(chatId, "Error en la descarga:(")
  }
});


let animeList = []; // Variable global para almacenar la lista de animes

// Función para manejar el comando '/anime'
function handleAnimeCommand(msg, match) {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const url = match[1];

  searchAnime(url)
    .then((result) => {
      animeList = result.data; // Almacenar la lista de animes en la variable global

      if (animeList.length === 0) {
        bot.sendMessage(chatId, '*❌ No se encontraron resultados para esa búsqueda.*', { parse_mode: "Markdown" });
        return;
      }

      const keyboard = {
        reply_markup: {
          inline_keyboard: animeList.map((anime) => [{
            text: anime.title,
            callback_data: `anime_${anime.id}` // Utilizar el ID del anime en las consultas de callback
          }])
        }
      };

      bot.sendMessage(chatId, '¡🔎 Búsqueda encontrada! \n\n➡️ Selecciona un anime para ver la información completa:', keyboard);
    })
    .catch((error) => {
      console.error(error);
      bot.sendMessage(chatId, '*❌ Error al buscar anime. Por favor, intenta nuevamente más tarde.*', { parse_mode: "Markdown" });
    });
}

// Manejar el comando '/anime'
bot.onText(/\/anime (.+)/, handleAnimeCommand);

// Manejar las consultas de callback relacionadas con anime
bot.on('callback_query', async (query) => {
  // Verificar si la consulta de callback está relacionada con anime
  if (query.data.startsWith('anime_')) {
    const animeId = query.data.substring(6); // Extraer el ID del anime desde la consulta de callback
    const selectedAnime = animeList.find((anime) => anime.id === animeId);

    if (!selectedAnime) {
      bot.answerCallbackQuery(query.id, { text: '❌ No se encontró información para este anime.', show_alert: true });
      return;
    }

    const message = `
      *🥋 ${selectedAnime.title || 'Sin título'}*
      _➡️ Sinopsis:_ ${selectedAnime.synopsis || 'Sin información de sinopsis.'}
      _⭐ Rating:_ ${selectedAnime.rating || 'Sin información de rating.'}
      _➡️ Tipo:_ ${selectedAnime.type || 'Sin información de tipo.'}
      [Ver más](${selectedAnime.url || '#'})
    `;

    bot.sendMessage(query.message.chat.id, message, { parse_mode: 'Markdown' }).catch((error) => {
      console.error('Error al enviar el mensaje:', error);
    });
  }
});

/**************************************************REACCIONES**************************************************/


bot.onText(/^\/golpear|^\/kill/, (msg) => {
  var chatid = msg.chat.id;
  var messageId = msg.reply_to_message.from.first_name;
  const usuario = msg.from.first_name;
  const usersId = msg.reply_to_message.from.first_name;
  var admins = [
    "https://i.pinimg.com/originals/5d/66/53/5d6653cbc35353cc21029f147315e515.gif",
    "https://i.pinimg.com/originals/1b/82/04/1b82042e3aa9aba909fbe21a4d23fa1e.gif",
    "https://pa1.narvii.com/6524/da106b569d1721e3e16dad0b33ed774864c5e695_hq.gif",
    "https://media.gentokyo.moe/2016/07/patada-anime.gif",
    "https://pa1.narvii.com/6443/3d6f906a805cdc9d9b8999b98f018ede96a2fceb_hq.gif",
    "http://static.fjcdn.com/gifs/MM_966fc2_1916375.gif",
    "https://64.media.tumblr.com/58a631cfafc2f9961cf506a2d7a8d09a/0ec4c54ebef5d375-2f/s500x750/757e0f8646e2a9e77f15a49e4fd22beae851beff.gif",
    "https://i.pinimg.com/originals/fa/ee/13/faee1354927024de8d21c784ac48042d.gif",
    "https://pa1.narvii.com/6883/4e59bec2e68b3ffcad3cd58d12876ef15316421er1-540-220_hq.gif",
    "https://i.pinimg.com/originals/0a/31/aa/0a31aac25ca540a2370baac5371e7dda.gif",
    "http://pa1.narvii.com/6180/89fe3ef452fe1e1d04916e1cb43af24aa492fc89_00.gif",
    "https://i.pinimg.com/originals/92/16/cc/9216cc9ca468c6b2482054e45edac32c.gif",
    "https://media1.tenor.com/images/a78d54cea15f59bdba220ba032881381/tenor.gif",
    "https://i.gifer.com/QVlJ.gif",
    "https://i.pinimg.com/originals/5c/c9/94/5cc9941cf038d73d40c72d35aabfd4be.gif",
    "https://pa1.narvii.com/6063/5b31121b4d3ff886a860ffd0218a8d098d86f5a8_hq.gif",
    "https://media.tumblr.com/tumblr_m3c3phvHrE1qcy7dd.gif",
    "https://media1.tenor.com/images/427a88a4156db1f6ab11b3e38b0ca7d4/tenor.gif?itemid=13583613",
    "http://pa1.narvii.com/6064/eefb956da831e99d37e961d834635e4497549ef0_00.gif",
  ];
  var ma = Math.random();
  var margarita = Math.floor(ma * admins.length);

  var frases = [
    `[${usuario}](tg://user?id=${msg.from.id}) _ha golpeado a_ [${usersId}](tg://user?id=${msg.reply_to_message.from.id}).`,
    `[${usuario}](tg://user?id=${msg.from.id}) _reventó su furia contra_ [${usersId}](tg://user?id=${msg.reply_to_message.from.id}).`,
    `[${usersId}](tg://user?id=${msg.reply_to_message.from.id}) _hizó explotar la furia de_ [${usuario}](tg://user?id=${msg.from.id}) _y le dió ¡tremendo golpe!_👊`,
    `[${usuario}](tg://user?id=${msg.from.id}) _humilló a_ [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) _enfrente de todo el grupo con una bofetada, ¡Qué verguenza!_🐿`,
    `[${usuario}](tg://user?id=${msg.from.id}) _acaba de abofetear a_ [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) _porfavor deja el cringe._`,
    `[${usuario}](tg://user?id=${msg.from.id}) _terminó dandole su merecido a_ [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) _¡Denle ban!_🐍`,
  ];
  var ma = Math.random();
  var flor = Math.floor(ma * frases.length);
  bot.sendAnimation(chatid, admins[margarita], {
    caption: frases[flor],
    parse_mode: "Markdown",
  });
});

bot.onText(/^\/spank|^\/nalguear/, (msg) => {
  var chatid = msg.chat.id;
  var messageId = msg.reply_to_message.from.first_name;
  const usuario = msg.from.first_name;
  const usersId = msg.reply_to_message.from.first_name;
  var admins = [
    "http://78.media.tumblr.com/3e7570c4c0a26319ea775c7f00868af5/tumblr_nr6b8bu2EL1uphzezo6_1280.gif",
    "https://i.pinimg.com/originals/3a/dc/a4/3adca43b113b59bf8e614e8a3e752600.gif",
    "https://pa1.narvii.com/6336/3020c54eacc8e34ef625f81704c0c1fe38c1b3dc_hq.gif",
    "http://25.media.tumblr.com/b771c224be34704f6de4ff83c5af63d2/tumblr_mggwiyDVwq1r1vlnro2_500.gif",
    "https://thumbs.gfycat.com/AggressiveWellwornAsianpiedstarling-max-1mb.gif",
    "https://media.giphy.com/media/zkn7frya243hm/giphy.gif",
    "http://pa1.narvii.com/6163/da0cbdd716ff04ad0e56895aaf6b8d90baa11111_00.gif",
    "https://static.hentai-gif-anime.com/upload/20200809/79/160434/detail.gif",
    "https://static.hentai-gif-anime.com/upload/20200809/79/160432/detail.gif",
    "https://images.uncyc.org/commons/b/b6/1230464402072.gif",
    "https://gifimage.net/wp-content/uploads/2018/10/anime-girl-spank-gif-4.gif",
    "https://pa1.narvii.com/6408/7a8ce10f96e7aba53e8132f8e3874e99e21dc77f_hq.gif",
  ];
  var ma = Math.random();
  var margarita = Math.floor(ma * admins.length);

  var frases = [
    `[${usuario}](tg://user?id=${msg.from.id}) _ha nalgueado a_ [${usersId}](tg://user?id=${msg.reply_to_message.from.id}), _es por tú bien._🍑`,
    `🍑_Nalgadita para_ [${usersId}](tg://user?id=${msg.reply_to_message.from.id}).`,
    `[${usersId}](tg://user?id=${msg.reply_to_message.from.id}) _recibió una nalgadita de_ [${usuario}](tg://user?id=${msg.from.id}).🍑`,
  ];
  var ma = Math.random();
  var flor = Math.floor(ma * frases.length);
  bot.sendAnimation(chatid, admins[margarita], {
    caption: frases[flor],
    parse_mode: "Markdown",
  });
});

bot.onText(/^\/pat|^\/cariciar/, (msg) => {
  var chatid = msg.chat.id;
  var messageId = msg.reply_to_message.from.first_name;
  const usuario = msg.from.first_name;
  const usersId = msg.reply_to_message.from.first_name;
  var admins = [
    "https://i.pinimg.com/originals/8b/42/6c/8b426c9bedc37054cd7e73925fa10da5.gif",
    "https://media1.tenor.com/images/8b5711095b0ba786c43b617bf9c675dd/tenor.gif?",
    "http://pa1.narvii.com/6116/bf46ce79cc54f88b17ccc79d8f5c40a07c158986_00.gif",
    "https://pa1.narvii.com/6136/ddfd684f829b9a6a03f40c04b4f2dbc54affa0d6_hq.gif",
    "http://pa1.narvii.com/6078/e81d2cb8d0b80d7055d135575cbc895e6dcb54fc_00.gif",
    "https://pa1.narvii.com/6051/3bc01dc8e0cd0d3c1d837421fa4471c6150fcf83_hq.gif",
    "https://pa1.narvii.com/6300/027ccb63dc7d2d3dd6a7cedf280853360310ebf5_hq.gif",
    "https://pa1.narvii.com/6300/8e9f29a3e8d56c8bb4edab7ec0e70af9d2ccc871_hq.gif",
  ];
  var ma = Math.random();
  var margarita = Math.floor(ma * admins.length);

  var frases = [
    `[${usuario}](tg://user?id=${msg.from.id}) le ha dado una palmadita a [${usersId}](tg://user?id=${msg.reply_to_message.from.id}), _Aw, que tierno._💚`,
    `_Pat, Pat para_ [${usersId}](tg://user?id=${msg.reply_to_message.from.id}).💘`,
    `owo [${usuario}](tg://user?id=${msg.from.id}) _acaba de dar una tierna caricia_ [${usersId}](tg://user?id=${msg.reply_to_message.from.id}). -Ya, ya.💜`,
    `[${usuario}](tg://user?id=${msg.from.id}) _a acariciado_ [${usersId}](tg://user?id=${msg.reply_to_message.from.id}).🤍`,
  ];
  var ma = Math.random();
  var flor = Math.floor(ma * frases.length);
  bot.sendAnimation(chatid, admins[margarita], {
    caption: frases[flor],
    parse_mode: "Markdown",
  });
});

/**************************************************INFORMACION COMPLETA USUARIO**************************************************/

bot.onText(/^\/info(?: (\d+))?$/, async function onInfoCommand(msg, match) {
  var chatId = msg.chat.id;
  var targetUserId;

  // Verificar si se proporcionó una ID de usuario como argumento
  if (match && match[1]) {
    targetUserId = parseInt(match[1]);
  } else {
    // Si no se proporciona una ID, establecerla al usuario actual
    targetUserId = msg.from.id;
  }

  // Obtener información del usuario actual
  const myId = msg.from.id;
  const myname = msg.from.first_name;
  var lang = msg.from.language_code;

  try {
    // Obtener información del usuario al que se refiere la ID
    const chat = await bot.getChat(targetUserId);
    var last_name = chat.last_name || "No establecido:(";
    var userName = chat.username || "No establecido:(";

    // Modificar la llamada a getUserProfilePhotos para obtener información del usuario deseado
    const data = await bot.getUserProfilePhotos(targetUserId, 0, 1);

    // Modificar la llamada a sendDocument para enviar la imagen en formato de documento
    bot.sendPhoto(chatId, data.photos[0][0].file_id, {
      caption: `<code>Información del usuario:</code>\n🐬<b>Nombre:</b> ${chat.first_name}\n🐬<b>Apellido:</b> ${last_name}\n🐬<b>Alias:</b> @${userName}\n🐬<b>ID:</b> <code>${targetUserId}</code>\n🐬<b>Enlace de perfil:</b> <a href="tg://user?id=${targetUserId}">Link del Usuario</a>\n🐬<b>Lenguaje:</b> ${lang}`,
      parse_mode: "HTML",
    });
  } catch (error) {
    // Manejar el error de chat no encontrado
    bot.sendMessage(chatId, "No se ha encontrado el chat del usuario.");
  }
});

/**************************************************LINK DE UN GRUPO**************************************************/
bot.onText(/^\/chatlink/, function (msg) {
  var chatId = msg.chat.id;
  var chatTitle = msg.chat.title;

  bot.exportChatInviteLink(chatId).then(function (enlace) {
    bot.sendMessage(
      chatId,
      "🐬_Enlace del grupo:_ " + chatTitle + "\n" + enlace,
      { parse_mode: "Markdown" }
    );
  });
});
/**************************************************BORRADO DE UN GRUPO**************************************************/
bot.onText(/^\/delchatfoto/, function (msg) {
  var chatId = msg.chat.id;
  var userId = msg.from.id;
  var chatTitle = msg.chat.title;

  bot.getChatMember(chatId, userId).then(function (user) {
    if (user.status == "creator" || user.status == "administrator") {
      bot.deleteChatPhoto(chatId).then(function (foto) {
        bot.sendMessage(chatId, `🐬Foto del grupo: ${chatTitle} eliminada.`);
      });
    } else {
      bot.sendMessage(
        chatId,
        "Solo el creador y administradores pueden usar este comando:("
      );
    }
  });
});

bot.onText(/^\/delchatsticker/, function (msg) {
  var chatId = msg.chat.id;
  var userId = msg.from.id;
  var messageId = msg.message_id;
  var chatTitle = msg.chat.title;

  bot.getChatMember(chatId, userId).then(function (user) {
    if (user.status == "creator" || user.status == "administrator") {
      bot.deleteChatStickerSet(chatId).then(function (foto) {
        bot.sendMessage(
          chatId,
          "🐬Pack de stickers del grupo " +
            chatTitle +
            "eliminado." +
            "\n" +
            foto
        );
      });
    } else {
      bot.sendMessage(
        chatId,
        "Solo el creador y administradores pueden usar este comando:("
      );
    }
  });
});
/**************************************************LINK DE UN GRUPO**************************************************/

bot.onText(/^\/salirbot/, function (msg) {
  var chatId = msg.chat.id;
  var userId = msg.from.id;
  var messageId = msg.message_id;
  var chatTitle = msg.chat.title;

  bot.getChatMember(chatId, userId).then(function (user) {
    if (user.status == "creator" || user.status == "administrator") {
      bot.leaveChat(chatId).then(function (foto) {
        bot.sendMessage(chatId, "🐬Mi momento ha llegado..." + "\n" + foto);
      });
    } else {
      bot.sendMessage(
        chatId,
        "Solo el creador y administradores pueden usar este comando:("
      );
    }
  });
});

bot.onText(/^\.staff|^\/staff/, function (msg) {
  var chatId = msg.chat.id;
  var userId = msg.from.id;
  var grupo = msg.chat.title;
  var chatype = msg.chat.type;

  bot.getChatAdministrators(chatId).then(function (users) {
    console.log(users);
    if (chatype == "supergroup") {
      string = "";
      idadmin = "";
      var creador = "";
      var titlecr = "";
      var idcreador = "";
      users.forEach((data) => {
        if (data.status == "creator") {
          creador += data.user.first_name;
          titlecr += data.custom_title;
          idcreador += data.user.id;
          if (titlecr == "undefined") {
            titlecr = "No establecido:(";
          }
        } else {
          idadmin = data.user.id;
          string +=
            `<a href="tg://user?id=${idadmin}">🤴🏻${data.user.first_name}</a>` +
            "\n";
        }
      });
      bot.sendMessage(
        chatId,
        `🐬<i>Team Staff del grupito:</i>\n\n👑<i>Creador:</i> \n └<a href="tg://user?id=${idcreador}">${creador}</a> \n\n🐬<i>Administradores:</i> \n${string}`,
        { parse_mode: "HTML" }
      );
    }
  });
});

/**************************************************BORRADO DE MENSAJES**************************************************/

bot.onText(/^\/del/, (msg) => {
  var chatId = msg.chat.id;
  var messageId = msg.message_id;
  var replyMessage = msg.reply_to_message.message_id;

  if (msg.reply_to_message == undefined) {
    return;
  }

  bot.deleteMessage(chatId, messageId);
  bot.deleteMessage(chatId, replyMessage);
});
/**************************************************OCIO EMOJIS JUEGO**************************************************/

/**************************************************CODIGOS QR**************************************************/

bot.onText(/^\/qr/, function (msg) {
  console.log(msg);
  var userId = msg.from.first_name;
  var data = msg.text.substring(3).trim();
  var imageqr =
    "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=" + data;
  bot.sendMessage(
    msg.chat.id,
    "[🐬](" + imageqr + `)${userId} aqui tienes tu codigo QR de la URL:` + data,
    { parse_mode: "Markdown" }
  );
});



/**************************************************PIN Y UNPIN**************************************************/

bot.onText(/^\/pin/, function (msg) {
  if (msg.reply_to_message == undefined) {
    return;
  }

  var chatId = msg.chat.id;
  var fromId = msg.from.id;
  var messageId = msg.message_id;
  var chatype = msg.chat.type;
  var replyFrom = msg.reply_to_message.message_id;
  var fromName = msg.from.first_name;

  const opts = {};
  opts.disable_notification = false;

  bot.getChatMember(chatId, fromId).then(function (data) {
    if (data.status == "creator" || data.status == "administrator") {
      if (chatype == "supergroup") {
        bot.pinChatMessage(chatId, replyFrom);
        bot.deleteMessage(chatId, messageId);
      } else if (chatype == "private") {
        bot.sendMessage(chatId, "Comando solo disponible en supergrupos");
      } else if (chatype == "group") {
        bot.sendMessage(chatId, "Comando solo disponible en supergrupos.");
      }
    } else {
      bot.sendMessage(
        chatId,
        "Solo el creador y administradores pueden usar este comando:("
      );
    }
  });
});

bot.onText(/^\/unpin/, function (msg) {
  var chatId = msg.chat.id;
  var fromId = msg.from.id;
  var messageId = msg.message_id;
  var fromName = msg.from.first_name;

  bot.getChatMember(chatId, fromId).then(function (data) {
    if (data.status == "creator" || data.status == "administrator") {
      bot.deleteMessage(chatId, messageId);
      bot.unpinChatMessage(chatId);
    } else {
      bot.sendMessage(
        chatId,
        "Solo el creador y administradores pueden usar este comando:("
      );
    }
  });
});

bot.onText(/^\/unallpin/, function (msg) {
  var chatId = msg.chat.id;
  var fromId = msg.from.id;
  var messageId = msg.message_id;
  var fromName = msg.from.first_name;

  bot.getChatMember(chatId, fromId).then(function (data) {
    if (data.status == "creator" || data.status == "administrator") {
      bot.deleteMessage(chatId, messageId);
      bot.unpinAllChatMessages(chatId);
    } else {
      bot.sendMessage(
        chatId,
        "Solo el creador y administradores pueden usar este comando:("
      );
    }
  });
});

/**************************************************COMANDO BAN Y UNBAN**************************************************/
bot.onText(/^\/kick/, function (msg) {
  var chatId = msg.chat.id;
  var replyId = msg.reply_to_message.from.id;
  var userId = msg.from.id;
  var replyName = msg.reply_to_message.from.first_name;
  var fromName = msg.from.first_name;
  var messageId = msg.message_id;

  if (msg.reply_to_message == undefined) {
    return;
  }

  bot.getChatMember(chatId, userId).then(function (data) {
    if (data.status == "creator" || data.status == "administrator") {
      bot.kickChatMember(chatId, replyId).then(function (result) {
        bot.unbanChatMember(chatId, replyId);
        bot.deleteMessage(chatId, messageId);
        bot.sendMessage(
          chatId,
          `🌊<i>El usuario</i> ${replyName} <i>ha sido expulsado</i> (<code>${replyId}</code>) del grupito:(`,
          {
            parse_mode: "HTML",
          }
        );
      });
    } else {
      bot.sendMessage(
        chatId,
        "Solo el creador y administradores pueden usar este comando:("
      );
    }
  });
});

bot.onText(/^\/ban/, function (msg) {
  var chatId = msg.chat.id;
  var replyId = msg.reply_to_message.from.id;
  var userId = msg.from.id;
  var replyName = msg.reply_to_message.from.first_name;
  var fromName = msg.from.first_name;
  var messageId = msg.message_id;

  if (msg.reply_to_message == undefined) {
    return;
  }

  bot.getChatMember(chatId, userId).then(function (data) {
    if (data.status == "creator" || data.status == "administrator") {
      bot.kickChatMember(chatId, replyId).then(function (result) {
        bot.deleteMessage(chatId, messageId);
        bot.sendMessage(
          chatId,
          `🔪<i>El usuario</i> <a href="tg://user?id=${replyId}">${replyName}</a> <i>ha sido eliminado del grupo, ¡Hasta la proxima!</i> \n\n🐬<b>ID:</b> (<code>${replyId}</code>)`,
          { parse_mode: "HTML" }
        );
      });
    } else {
      bot.sendMessage(
        chatId,
        "Solo el creador y administradores pueden usar este comando:("
      );
    }
  });
});



bot.onText(/^\/tban (.+)/, function (msg, match) {
  var chatId = msg.chat.id;
  var userId = msg.from.id;
  var replyId = msg.reply_to_message.from.id;
  var replyName = msg.reply_to_message.from.first_name;
  var fromName = msg.from.first_name;
  var messageId = msg.message_id;
  var text = match[1];
  const ms = require("ms");

  if (msg.reply_to_message == undefined) {
    return;
  }

  bot.getChatMember(chatId, userId).then(function (data) {
    if (data.status == "creator" || data.status == "administrator") {
      bot
        .kickChatMember(chatId, replyId, {
          until_date: Math.round((Date.now() + ms(text + " days")) / 1000),
        })
        .then(function (result) {
          bot.deleteMessage(chatId, messageId);
          bot.sendMessage(
            chatId,
            `🌊<i>El usuario</i> ${replyName} (<code>${replyId}</code>) <i>ha sido eliminado del grupito, nos vemos en</i> <b>${text}</b> <i>días:(</i>`,
            { parse_mode: "HTML" }
          );
        });
    } else {
      bot.sendMessage(
        chatId,
        "Solo el creador y administradores pueden usar este comando:("
      );
    }
  });
});


bot.on('polling_error', (error) => {
  console.error(error);
});

bot.onText(/^\/unban/, function (msg) {
  var chatId = msg.chat.id;
  var replyId = msg.reply_to_message.from.id;
  var userId = msg.from.id;
  var replyName = msg.reply_to_message.from.first_name;
  var fromName = msg.from.first_name;
  var messageId = msg.message_id;

  if (msg.reply_to_message == undefined) {
    return;
  }

  bot.getChatMember(chatId, userId).then(function (data) {
    if (data.status == "creator" || data.status == "administrator") {
      bot.unbanChatMember(chatId, replyId).then(function (result) {
        bot.deleteMessage(chatId, messageId);
        bot.sendMessage(
          chatId,
          `🐬<i>El usuario</i> <a href="tg://user?id=${replyId}">${replyName}</a> <i>ahora puede regresar al grupito, ¡Bang desbaneado!</i> \n\n🐬<b>ID:</b> (<code>${replyId}</code>)`,
          { parse_mode: "HTML" }
        );
      });
    } else {
      bot.sendMessage(
        chatId,
        "Solo el creador y administradores pueden usar este comando:("
      );
    }
  });
});

/**************************************************COMANDO MUTE Y UNMUTE**************************************************/

bot.onText(/^\/tmute (.+)/, function (msg, match) {
  var chatId = msg.chat.id;
  var fromId = msg.from.id;
  var replyId = msg.reply_to_message.from.id;
  var replyName = msg.reply_to_message.from.first_name;
  var fromName = msg.from.first_name;
  var messageId = msg.message_id;

  var tiempo = match[1];

  var ms = require("ms");

  const perms = {};
  perms.can_send_message = false;
  perms.can_send_media_messages = false;
  perms.can_send_other_messages = false;
  perms.can_can_add_web_page_previews = false;

  if (msg.reply_to_message == undefined) {
    return;
  }

  bot.getChatMember(chatId, fromId).then(function (data) {
    if (data.status == "creator" || data.status == "administrator") {
      bot
        .restrictChatMember(
          chatId,
          replyId,
          { until_date: Math.round(Date.now() + ms(tiempo + "days") / 1000) },
          perms
        )
        .then(function (result) {
          bot.deleteMessage(chatId, messageId);
          bot.sendMessage(
            chatId,
            `🌊<i>El usuario</i> ${replyName} (<code>${replyId}</code>) <i>ha sido silenciado del grupito, nos vemos en</i> <b>${tiempo}</b> <i>días:(</i>`,
            { parse_mode: "HTML" }
          );
        });
    } else {
      bot.sendMessage(
        chatId,
        "Solo el creador y administradores pueden usar este comando:("
      );
    }
  });
});

bot.onText(/^\/unmute/, function (msg) {
  var chatId = msg.chat.id;
  var fromId = msg.from.id;
  var fromName = msg.from.first_name;
  var replyName = msg.reply_to_message.from.first_name;
  var replyId = msg.reply_to_message.from.id;
  var messageId = msg.message_id;
  const perms = {};

  perms.can_send_message = true;
  perms.can_send_media_messages = true;
  perms.can_send_other_messages = true;
  perms.can_can_add_web_page_previews = true;

  if (msg.reply_to_message == undefined) {
    return;
  }

  bot.getChatMember(chatId, fromId).then(function (data) {
    if (data.status == "creator" || data.status == "administrator") {
      bot.restrictChatMember(chatId, replyId, perms).then(function (result) {
        bot.deleteMessage(chatId, messageId);
        bot.sendMessage(
          chatId,
          `🌊<i>Abracadabra te concedo el poder de escribir de nuevo en el chat</i> ${replyName} (<code>${replyId}</code>), <i>entra y habla.</i>`,
          { parse_mode: "HTML" }
        );
      });
    } else {
      bot.sendMessage(
        chatId,
        "Solo el creador y administradores pueden usar este comando:("
      );
    }
  });
});

bot.onText(/^\/mute/, function (msg) {
  var chatId = msg.chat.id;
  var fromId = msg.from.id;
  var fromName = msg.from.first_name;
  var replyName = msg.reply_to_message.from.first_name;
  var replyId = msg.reply_to_message.from.id;
  var messageId = msg.message_id;
  const perms = {};

  perms.can_send_message = false;
  perms.can_send_media_messages = false;
  perms.can_send_other_messages = false;
  perms.can_can_add_web_page_previews = false;

  if (msg.reply_to_message == undefined) {
    return;
  }

  bot.getChatMember(chatId, fromId).then(function (data) {
    if (data.status == "creator" || data.status == "administrator") {
      bot.restrictChatMember(chatId, replyId, perms).then(function (result) {
        bot.deleteMessage(chatId, messageId);
        bot.sendMessage(
          chatId,
          `🌊<i>El usuario</i> ${replyName} (<code>${replyId}</code>) <i>ha sido silenciado del grupito, Que pena:(, observa desde las gradas.</i>`,
          { parse_mode: "HTML" }
        );
      });
    } else {
      bot.sendMessage(
        chatId,
        "Solo el creador y administradores pueden usar este comando:("
      );
    }
  });
});

/**************************************************PROMOVER Y DESCENDER ADMIN**************************************************/

bot.onText(/^\/promoteadm/, function (msg) {
  var chatId = msg.chat.id;
  var userId = msg.from.id;
  var replyId = msg.reply_to_message.from.id;
  var replyName = msg.reply_to_message.from.first_name;
  var userName = msg.from.first_name;
  var messageId = msg.message_id;

  const prop = {};

  prop.can_delete_message = true;
  prop.can_change_info = false;
  prop.can_invite_users = true;
  prop.can_pin_messages = true;
  prop.can_restrict_members = true;
  prop.can_promote_members = false;

  if (msg.reply_to_message == undefined) {
    return;
  }

  bot.getChatMember(chatId, userId).then(function (data) {
    if (data.status == "creator" || data.status == "administrator") {
      bot.promoteChatMember(chatId, replyId, prop).then(function (result) {
        bot.deleteMessage(chatId, messageId);
        bot.sendMessage(
          chatId,
          "🌊El poder de " +
            replyName +
            " ha aumentado. Ahora este usuario es un administador."
        );
      });
    } else {
      bot.sendMessage(
        chatId,
        "Solo el creador y administradores pueden usar este comando:("
      );
    }
  });
});

bot.onText(/^\/demoteadm/, function (msg) {
  var chatId = msg.chat.id;
  var replyName = msg.reply_to_message.from.first_name;
  var replyId = msg.reply_to_message.from.id;
  var userId = msg.from.id;
  var fromName = msg.from.first_name;
  var messageId = msg.message_id;

  const prop = {};

  prop.can_change_info = false;
  prop.can_delete_message = false;
  prop.can_invite_users = false;
  prop.can_pin_messages = false;
  prop.can_restrict_members = false;
  prop.can_promote_members = false;

  if (msg.reply_to_message == undefined) {
    return;
  }

  bot.getChatMember(chatId, userId).then(function (data) {
    if (data.status == "creator" || data.status == "administrator") {
      bot.promoteChatMember(chatId, replyId, prop).then(function (result) {
        bot.deleteMessage(chatId, messageId);
        bot.sendMessage(
          chatId,
          replyName +
            " ha perdido sus privilegios como administrador, ¡Vaya vergüenza! 🐿"
        );
      });
    } else {
      bot.sendMessage(
        chatId,
        "Solo el creador y administradores pueden usar este comando:("
      );
    }
  });
});


/**************************************************COMANDO PING**************************************************/

let inicio = new Date();
setTimeout(function () {
  realizartarea(inicio);
}, 1000);

function realizartarea(fechainicial) {
  let fin = new Date();
  let diferencia = fin.getTime() - inicio.getTime();
  console.log(diferencia);
  diferencia / (10 * 60);
  return diferencia;
}
/**************************************************COMANDO REPITE MENSAJES**************************************************/

bot.onText(/\/msg (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const usuario = msg.from.id;
  const resp = match[1];
  var messageId = msg.message_id;
  bot.getChatMember(chatId, usuario).then(function (data) {
    if (data.status == "creator" || data.status == "administrator") {
      bot.deleteMessage(chatId, messageId);
      bot.sendMessage(chatId, resp);
    } else {
      bot.sendMessage(
        chatId,
        "Solo el creador y administradores pueden usar este comando:("
      );
    }
  });
});

/**************************************************COMANDO COPIAR A UN MSG**************************************************/

bot.onText(/^\!copiar/, (msg) => {
  var chat_id = msg.chat.id;
  var from_chat_id = msg.chat.id;
  var message_id = msg.reply_to_message.message_id;
  bot.copyMessage(chat_id, from_chat_id, message_id);
});

/**************************************************COMANDO REENVIAR UN MSG**************************************************/

bot.onText(/^\!reenviar/, (msg) => {
  var chat_id = msg.chat.id;
  var from_chat_id = msg.chat.id;
  var message_id = msg.reply_to_message.message_id;
  bot.forwardMessage(chat_id, from_chat_id, message_id);
});

/**************************************************ID MEDIANTE REENVIADO**************************************************/


/*******************************************************************************/



//LISTA NEGRA
//const black_list = [-1001476318529];
/*const black_list = [-1001476318529];

bot.on("message", async (msg) => {
  const chatID = msg.chat.id;
  const userID = msg.from.id;
  const username = msg.from.first_name;
  for (let i = 0; i < black_list.length; i++) {
    if (black_list[parseInt(i)] === chatID)
      await bot.leaveChat(chatID);
  }

});*/

/*******************************PERMISOS DE USUARIOS******************************************/

bot.onText(/\/setpoll (.+)/, (msg, match) => {
  const chatid = msg.chat.id;
  const usuario = msg.from.id;
  const modo = match[1];
  if (modo === "off") {
    bot.getChatMember(chatid, usuario).then(function (data) {
      if (data.status == "creator" || data.status == "administrator") {
        var ChatPermissions = {
          can_send_messages: true,
          can_send_media_messages: true,
          can_send_polls: false,
          can_send_other_messages: true,
          can_add_web_page_previews: true,
          can_change_info: false,
          can_invite_users: true,
          can_pin_messages: false,
        };

        bot.setChatPermissions(chatid, ChatPermissions);
        bot.sendMessage(
          chatid,
          "🐟<i>Un ser poderoso en este grupo ha bloqueado la entrada de <b>encuestas</b> para los usuarios.</i> \n\n❌<b>Encuestas</b>",
          { parse_mode: "HTML" }
        );
      } else {
        bot.sendMessage(
          chatid,
          "Solo el creador y administradores pueden usar este comando:("
        );
      }
    });
  }

  if (modo === "on") {
    bot.getChatMember(chatid, usuario).then(function (data) {
      if (data.status == "creator" || data.status == "administrator") {
        var ChatPermissions = {
          can_send_messages: true,
          can_send_media_messages: true,
          can_send_polls: true,
          can_send_other_messages: true,
          can_add_web_page_previews: true,
          can_change_info: false,
          can_invite_users: true,
          can_pin_messages: false,
        };

        bot.setChatPermissions(chatid, ChatPermissions);
        bot.sendMessage(
          chatid,
          "<i>🐟A partir de este momento los usuarios pueden enviar <b>encuestas</b> nuevamente.</i>\n\n✅<b>Encuestas</b>",
          { parse_mode: "HTML" }
        );
      } else {
        bot.sendMessage(
          chatid,
          "Solo el creador y administradores pueden usar este comando:("
        );
      }
    });
  }
});

bot.onText(/\/setmedia (.+)/, (msg, match) => {
  const chatid = msg.chat.id;
  const usuario = msg.from.id;
  const modo = match[1];
  if (modo === "off") {
    bot.getChatMember(chatid, usuario).then(function (data) {
      if (data.status == "creator" || data.status == "administrator") {
        var ChatPermissions = {
          can_send_messages: false,
          can_send_media_messages: true,
          can_send_polls: true,
          can_send_other_messages: false,
          can_add_web_page_previews: true,
          can_change_info: false,
          can_invite_users: true,
          can_pin_messages: false,
        };

        bot.setChatPermissions(chatid, ChatPermissions);
        bot.sendMessage(
          chatid,
          "🐟<i>Un ser poderoso en este grupo ha bloqueado la entrada de contenido <b>multimedia</b> para los usuarios.</i>\n\n❌<b>Stickers</b> \n❌<b>Gif</b> \n❌<b>Juegos</b> \n❌<b>Bots inline</b>",
          { parse_mode: "HTML" }
        );
      } else {
        bot.sendMessage(
          chatid,
          "Solo el creador y administradores pueden usar este comando:("
        );
      }
    });
  }

  if (modo === "on") {
    bot.getChatMember(chatid, usuario).then(function (data) {
      if (data.status == "creator" || data.status == "administrator") {
        var ChatPermissions = {
          can_send_messages: true,
          can_send_media_messages: true,
          can_send_polls: true,
          can_send_other_messages: true,
          can_add_web_page_previews: true,
          can_change_info: false,
          can_invite_users: true,
          can_pin_messages: false,
        };

        bot.setChatPermissions(chatid, ChatPermissions);
        bot.sendMessage(
          chatid,
          "<i>🐟A partir de este momento los usuarios pueden enviar contenido <b>multimedia</b> nuevamente.</i>\n\n✅<b>Stickers</b> \n✅<b>Gif</b> \n✅<b>Juegos</b> \n✅<b>Bots inline</b>",
          { parse_mode: "HTML" }
        );
      } else {
        bot.sendMessage(
          chatid,
          "Solo el creador y administradores pueden usar este comando:("
        );
      }
    });
  }
});

bot.onText(/\/setmsg (.+)/, (msg, match) => {
  const chatid = msg.chat.id;
  const usuario = msg.from.id;
  const modo = match[1];
  if (modo === "off") {
    bot.getChatMember(chatid, usuario).then(function (data) {
      if (data.status == "creator" || data.status == "administrator") {
        var ChatPermissions = {
          can_send_messages: false,
          can_send_media_messages: false,
          can_send_polls: false,
          can_send_other_messages: false,
          can_add_web_page_previews: false,
          can_change_info: false,
          can_invite_users: false,
          can_pin_messages: false,
        };

        bot.setChatPermissions(chatid, ChatPermissions);
        bot.sendMessage(
          chatid,
          "🐟<i>Un ser poderoso en este grupo ha bloqueado la entrada de <b>mensajes</b> para los usuarios.</i>\n\n❌<b>Enviar mensajes</b>",
          { parse_mode: "HTML" }
        );
      } else {
        bot.sendMessage(
          chatid,
          "Solo el creador y administradores pueden usar este comando:("
        );
      }
    });
  }

  if (modo === "on") {
    bot.getChatMember(chatid, usuario).then(function (data) {
      if (data.status == "creator" || data.status == "administrator") {
        var ChatPermissions = {
          can_send_messages: true,
          can_send_media_messages: true,
          can_send_polls: true,
          can_send_other_messages: true,
          can_add_web_page_previews: true,
          can_change_info: false,
          can_invite_users: true,
          can_pin_messages: false,
        };

        bot.setChatPermissions(chatid, ChatPermissions);
        bot.sendMessage(
          chatid,
          "<i>🐟A partir de este momento los usuarios pueden enviar <b>mensajes</b> nuevamente al grupito.</i>\n\n✅<b>Enviar mensajes</b>",
          { parse_mode: "HTML" }
        );
      } else {
        bot.sendMessage(
          chatid,
          "Solo el creador y administradores pueden usar este comando:("
        );
      }
    });
  }
});

bot.onText(/\/setinviteuser (.+)/, (msg, match) => {
  const chatid = msg.chat.id;
  const usuario = msg.from.id;
  const modo = match[1];
  if (modo === "off") {
    bot.getChatMember(chatid, usuario).then(function (data) {
      if (data.status == "creator" || data.status == "administrator") {
        var ChatPermissions = {
          can_send_messages: true,
          can_send_media_messages: true,
          can_send_polls: true,
          can_send_other_messages: true,
          can_add_web_page_previews: true,
          can_change_info: false,
          can_invite_users: false,
          can_pin_messages: false,
        };
        bot.setChatPermissions(chatid, ChatPermissions);
        bot.sendMessage(
          chatid,
          "🐟<i>Un ser poderoso en este grupo ha bloqueado la entrada de <b>agregar miembros</b> para los usuarios.</i>\n\n❌<b>Añadir usuarios</b>",
          { parse_mode: "HTML" }
        );
      } else {
        bot.sendMessage(
          chatid,
          "Solo el creador y administradores pueden usar este comando:("
        );
      }
    });
  }

  if (modo === "on") {
    bot.getChatMember(chatid, usuario).then(function (data) {
      if (data.status == "creator" || data.status == "administrator") {
        var ChatPermissions = {
          can_send_messages: true,
          can_send_media_messages: true,
          can_send_polls: true,
          can_send_other_messages: true,
          can_add_web_page_previews: true,
          can_change_info: false,
          can_invite_users: true,
          can_pin_messages: false,
        };

        bot.setChatPermissions(chatid, ChatPermissions);
        bot.sendMessage(
          chatid,
          "<i>🐟A partir de este momento los usuarios pueden <b>agregar miembros</b> nuevamente al grupito.</i>\n\n✅<b>Añadir usuarios</b>",
          { parse_mode: "HTML" }
        );
      } else {
        bot.sendMessage(
          chatid,
          "Solo el creador y administradores pueden usar este comando:("
        );
      }
    });
  }
});

bot.onText(/\/setpin (.+)/, (msg, match) => {
  const chatid = msg.chat.id;
  const usuario = msg.from.id;
  const modo = match[1];
  if (modo === "off") {
    bot.getChatMember(chatid, usuario).then(function (data) {
      if (data.status == "creator" || data.status == "administrator") {
        var ChatPermissions = {
          can_send_messages: true,
          can_send_media_messages: true,
          can_send_polls: true,
          can_send_other_messages: true,
          can_add_web_page_previews: true,
          can_change_info: false,
          can_invite_users: true,
          can_pin_messages: false,
        };

        bot.setChatPermissions(chatid, ChatPermissions);
        bot.sendMessage(
          chatid,
          "🐟<i>Un ser poderoso en este grupo ha bloqueado la entrada de <b>fijar mensajes</b> para los usuarios.</i>\n\n❌<b>Fijar mensajes</b>",
          { parse_mode: "HTML" }
        );
      } else {
        bot.sendMessage(
          chatid,
          "Solo el creador y administradores pueden usar este comando:("
        );
      }
    });
  }

  if (modo === "on") {
    bot.getChatMember(chatid, usuario).then(function (data) {
      if (data.status == "creator" || data.status == "administrator") {
        var ChatPermissions = {
          can_send_messages: true,
          can_send_media_messages: true,
          can_send_polls: true,
          can_send_other_messages: true,
          can_add_web_page_previews: true,
          can_change_info: false,
          can_invite_users: true,
          can_pin_messages: true,
        };

        bot.setChatPermissions(chatid, ChatPermissions);
        bot.sendMessage(
          chatid,
          "<i>🐟Woah, ¡el admin ha otorgado un gran poder en este grupo!, a partir de este momento los usuarios pueden <b>fijar mensajes</b> en el grupito.</i>\n\n✅<b>Fijar mensajes</b>",
          { parse_mode: "HTML" }
        );
      } else {
        bot.sendMessage(
          chatid,
          "Solo el creador y administradores pueden usar este comando:("
        );
      }
    });
  }
});

/*******************************ENCUESTAS************************************************/

bot.onText(/\/siono (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  var messageId = msg.message_id;
  const text = match[1];
  bot.sendPoll(chatId, text, ["Si", "No", "Talvez"], {
    is_anonymous: "false",
  });
  bot.deleteMessage(chatId, messageId);
});
/*******************************CAMBIOS************************************************/

bot.onText(/\/settitledef/, (msg) => {
  let chatId = msg.chat.id;
  var userId = msg.reply_to_message.from.id;
  let usuario = msg.from.id;
  if (msg.chat.type == "private") {
    bot.sendMessage(msg.from.id, "Este comando funciona en grupos.");
  }
  bot.getChatMember(chatId, usuario).then(function (data) {
    if (data.status == "creator" || data.status == "administrator") {
      bot.setChatAdministratorCustomTitle(chatId, userId, "GuraADMON");
      bot.sendMessage(chatId, "<i>Titulo establecido del administrador.</i>");
    } else {
      bot.sendMessage(
        chatId,
        "Solo el creador y administradores pueden usar este comando:("
      );
    }
  });
});
bot.onText(/\/settitle (.+)/, (msg, match) => {
  let chatId = msg.chat.id;
  let usuario = msg.from.id;
  let tipValue = match[1];
  if (msg.chat.type == "private") {
    bot.sendMessage(msg.from.id, "Este comando funciona en grupos.");
  }
  bot.getChatMember(chatId, usuario).then(function (data) {
    if (data.status == "creator" || data.status == "administrator") {
      bot.setChatAdministratorCustomTitle(chatId, userId, tipValue);
      bot.sendMessage(
        chatId,
        "<i>🐬Titulo establecido del administrador:</i>" + tipValue,
        { parse_mode: "HTML" }
      );
    } else {
      bot.sendMessage(
        chatId,
        "Solo el creador y administradores pueden usar este comando:("
      );
    }
  });
});

bot.onText(/\/setgtitle (.+)/, (msg, match) => {
  let chatId = msg.chat.id;
  let usuario = msg.from.id;
  let tipValue = match[1];
  if (msg.chat.type == "private") {
    bot.sendMessage(msg.from.id, "Este comando funciona en grupos.");
  }
  bot.getChatMember(chatId, usuario).then(function (data) {
    if (data.status == "creator" || data.status == "administrator") {
      bot.setChatTitle(chatId, tipValue);
      bot.sendMessage(
        chatId,
        "<i>🐬Titulo establecido del grupo:</i>" + tipValue,
        { parse_mode: "HTML" }
      );
    } else {
      bot.sendMessage(
        chatId,
        "Solo el creador y administradores pueden usar este comando:("
      );
    }
  });
});

bot.onText(/\/setdescrip (.+)/, (msg, match) => {
  let chatId = msg.chat.id;
  let usuario = msg.from.id;
  let tipValue = match[1];
  if (msg.chat.type == "private") {
    bot.sendMessage(msg.from.id, "Este comando funciona en grupos.");
  }
  bot.getChatMember(chatId, usuario).then(function (data) {
    if (data.status == "creator" || data.status == "administrator") {
      bot.setChatDescription(chatId, tipValue);
      bot.sendMessage(
        chatId,
        "<i>🐬Descripcion establecida del grupo:</i>" + tipValue,
        { parse_mode: "HTML" }
      );
    } else {
      bot.sendMessage(
        chatId,
        "Solo el creador y administradores pueden usar este comando:("
      );
    }
  });
});

/**************************************************BUSQUEDA VTUBERS*******************************************************/

/*******************************************************************************/
const menuOpts = {
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "🐳→ Información del bot↓",
          callback_data: "1",
        },
      ],
      [//botones
        {
          text: "🐋Actualización",
          callback_data: "3",
        },
        {
          text: "🐋Advertencia",
          callback_data: "4",
        }
      ],
      [
        {
          text: "🐋Anime",
          callback_data: "5",
        },
        {
          text: "🐋Ban",
          callback_data: "6",
        },
        {
          text: "🐋Bienvenida",
          callback_data: "7",
        }
      ],
      [
        {
          text: "🐋Extras",
          callback_data: "8",
        },
        {
          text: "🐋GuraAdmins",
          callback_data: "10",
        },
        {
          text: "🐋Herramientas",
          callback_data: "11",
        },
      ],
      [
        {
          text: "🐋Ocio",
          callback_data: "14",
        },
        {
          text: "🐋Reglas",
          callback_data: "15",
        },
        {
          text: "🐋Stickers",
          callback_data: "12",
        },
      ],
      [
        {
          text: "🐋Silencio",
          callback_data: "20",
        },
        {
          text: "🐋Spam",
          callback_data: "21",
        },
        {
          text: "🐋Utilidades",
          callback_data: "23",
        },
      ],
      [
        {
          text: "⭐Premium",
          callback_data: "25",
        },
        {
          text: "➕Añadir al grupo",
          url: "http://t.me/gawrgurahelperbot?startgroup=true",
        },
      ],
    ],
  },
};

function menu(msg) {
  if (msg.chat.type == "supergroup") {
    bot.sendAnimation(
      msg.chat.id,
      "https://c.tenor.com/QEIm04zTBeEAAAAd/gawr-gura.gif",
      {
        caption: `Wow, ¿A que quieres conocer todas mis habilidades [${msg.from.first_name}](tg://user?id=${msg.from.id})?`,

        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Vamos al privado→",
                url: "http://t.me/gawrgurahelperbot?start",
              },
            ],
          ],
        },
        parse_mode: "Markdown",
      }
    );
  }

  const opts = menuOpts;
  if (msg.chat.type == "private") {
    bot.sendMessage(
      msg.from.id,
      `➕Revisa a continuación todas mis habilidades Kamisama, en cada botón encontrarás la información necesaria para el uso de cada uno de los comandos. \n\n/donar: Un granito de arena para tener despierta a Gawr Gura siempre. \n\n🐳Para sugerencias, opiniones, comentar bugs y/o errores del bot visita (@GawrGuraSoporte).`,
      opts
    );
  }
}

bot.onText(/\/help/, function onEditableText(msg) {
  menu(msg);
});

bot.on("callback_query", function onCallbackQuery(callbackQuery) {
  const action = callbackQuery.data;
  const msg = callbackQuery.message;
  let opts = {
    chat_id: msg.chat.id,
    message_id: msg.message_id,
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "←Regresar",
            callback_data: "menu",
          },
        ],
      ],
    },
  };
  let text;

  if (action === "1") {
    bot.answerCallbackQuery({
      callback_query_id: callbackQuery.id,
      text: "Este es el menú de ayuda del bot, si tienes dudas recuerda nuestro grupo de soporte, tambien aceptamos sugerencias y reportes de este mismo, ¡Disfruta nuestro esfuerzo!",
      show_alert: true,
    });
  }
  if (action === "2") {
    bot.answerCallbackQuery({
      callback_query_id: callbackQuery.id,
      text: "A continuación encontraras la ayuda para la admistracíon de tú grupito.",
      show_alert: true,
    });
  }
  if (action === "3") {
    text =
      "¡Actualizate con Gawr Gura!: \n\n/promoteadm: Promueve a un usuario con permisos de administrador del grupo. \n\n/demoteadm: Vuelve a un admministrador un usuario como un simple mortal titán.\n\n/settitledef: Establece el titulo del administrador por defecto: GuraADMON. \n\n/settitle + Titulo de admin.: Establece el titulo personalizado del administrador haciendo reply a su mensaje. \n\n/setgtitle <Nuevo nombre>: Establece el nombre del grupo. \n\n/setdescrip <Nueva descripción>: Establece la descripcion personalizada del grupo.\n\n/del: Elimina un mensaje de un usuario respondiendo a uno de sus mensajes. \n\n/delchatfoto: Elimina la foto actual del grupo. \n\n/delchatsticker: Borra el pack de stickers establecido en el grupo. \n\n/salirbot: El bot sale del grupito.\n\n/pin: Fija un mensaje en el grupo respondiendo un mensaje. \n\n/unpin: Desfija un mensaje en el grupo. \n\n/unallpin: Desfija todos los mensajes pineados actuales. ID de usuarios: \n\n/id: Devuelve un mensaje con tu identificador de usuario o en su respuesta a un usuario obtienes su ID. \n\n/chatid: Devuelve un mensaje con el ID del grupo.\n/info: Responde con tu informacion de usuario.\n\n/uinfo: Devuelve la informacion de otro usuario haciendo reply a uno de sus mensajes.";
  }

  if (action === "4") {
    text =
      "Gawr Gura tambien tiene los comandos disponibles para advertir: \n\n/warn <ID>: El administrador del grupo asigna una advertencia a el usuario teniendo entre 3 oportunidades antes de ser eliminado del grupo. \n\n/unwarn <ID de usuario>: Remueve a el usuario una advertencia de las que tenga impuestas.";
  }
  if (action === "5") {
    text =
      "Los comandos para este modúlo se encuentran a continuación:\n\n/quiz: Diviertete respondiendo la trivia con preguntas de anime, japón y cultura general.\n\n/anime <búsqueda/nombre de anime>: Encuentra información de un anime desde la fuente de anilist.\n\n/emisionanime: Revisa los animes en emisión titán.\n\n/manga <búsqueda/nombre del manga>: El bot responde con la información detallada de la consulta(Mangas en emisión, finalizados y novelas ligeras). \n\n/character <búsqueda/personaje>: Encuentra a tus personajes favoritos con este comando y obtienes su información detallada. \n\n/wallhaven <busqueda>: Encuentra Wallpapers de Wallhaven.cc. \n\n/wallpaper <busqueda>: Encuentra Wallpapers de Wallpaper.com. Si el comando no tiene búqueda el bot genera una imagen aleatoria de free4kwallpapers.com, el bot responderá con la imagen y el documento.\n\n/zerochan <búsqueda>: Encuentra wallpapers de anime (ZeroChan) a partir de la consulta que se realize.";
  }
  if (action === "6") {
    text =
      "Con los comandos de eliminación de usuarios, puede expulsar usuarios de manera permanente, controlar el tiempo del baneo, etc, los comandos son los siguientes:  \n\n/kick: Elimina a un usuario con posibilidad de regreso. \n/ban: Elimina a un usuario haciendo reply a su mensaje o con alias/ID. \n\n/ban <ID>: Elimina a un usuario añadiendo su identificador. \n\n/tban <días>: Establece el tiempo de baneo del usuario (El tiempo se determina en días. Ejemplo: /tban 1, /tban 2, etc.) \n\n/warn <ID>: Agrega una advertencia al usuario, al llegar a 3 será eliminado del grupo. \n\n/unwarn <ID>: Remueve una advertencia del usuario.";
  }
  if (action === "7") {
    text =
      "Con Gawr Gura puedes modificar tus bienvenidas y establecer de forma personales las que mas nos agraden.\n\n/welcome <on/off>: Activa o desactiva las bienvenidas con las que Gawr Gura saluda por defecto a los nuevos usuarios.\n\nNota: por defecto se encuentra desactivado y al activarlo las bienvenidas se eliminaran pasado los 5 minutos.";
  }
  if (action === "8") {
    text =
      "Otros comandos de ocio extras: \n\n/calendario: Consulta la fecha actual. \n\n/random: El bot elige aleatoriamente una respuesta para tí; ejemplo: /random Minecraft, Clash Royale, Call of duty. (Se debe separar por comas las opciones). \n\n/loteria <1 al 25>: Diviertete jugando a la lotería y sal en el top (/top) global de usuarios con más puntos.\n\n/fish: ¡Atrapa peces! consulta tu colección con /myfish.\n\n\n/qtcompatibles: Responde al mensaje de un usuario para conocer que probabilidades hay tener éxito como pareja. \n\n/basta: Responde acertijos y divertete pensando la respuesta.\n\n/kiss, /besar: Entregale un beso a un usuario haciendo reply a uno de sus mensajes. \n\n/hug, /abrazar: Responde un mensaje en el chat para darle un tierno abrazo. \n\n/golpear, /kill: Al hacer respuesta de un mensaje en el chat, el bot responde con esta emoción. \n\n/spank, /nalguear: Entrega una nalgadita al usuario en respuesta de uno de sus mensaje en el grupito. \n\n/pat, /cariciar: Responde a un mensaje para dar una tierna caricia.";
  }

  if (action === "10") {
    text =
      "El gban prohibirá a usuarios trolls, en los grupos donde tenga poder administrativo Gura, el comando estará restringido para uso de administadores del bot: \n\n/gban <ID/Respuesta a un mensaje>: Banea el administador del bot de manera global a un usuario. \n\n/ungban <ID>: Desbanea el administador del bot de manera global a un usuario. \n\n/listgban: Consulta el administrador del bot la lista de usuarios baneados globalmente. \n\nNota: Los usuarios pueden realizar reportes de usuarios en el grupo de soporte (@GawrGuraSoporte). \n\nLos siguientes podrián ser unos motivos de baneo global: \n\n⚔Usuarios pidiendo contenido ilegal en grupos, o de igual manera que lo compartan (Puede ser reportado en el grupo de soporte).\n⚔Usuarios trolls que se dediquen a unirse a grupos para agregar bots y hacer spam.\n⚔Usuarios tóxicos. \n\n⚠Porfavor considere que no este dentro de estos motivos antes de venir a hacer una apelación al grupo de soporte.\n\n/addblacklist: Agrega un grupo a lista negra. \n\n/removeblacklist <ID>: Remueve a un usuario de la lista negra.\n\n/promoteadmin: ¡Te promueves como administrador del grupo con todos los permisos!";
  }

  if (action === "11") {
    text =
      "Los siguientes comandos te ayudaran a traducir texto fácilmente: \n\n/tr <codígo ISO>: Responde a un texto para traducirlo al lenguaje especificado en el comando, el bot detecta el idioma de origen.\nEjemplos: /tr es, /tr en, /tr pt \n\n/lenguajes: El bot muestra los lenguajes disponibles para ser utilizados en el traductor.\n\n/sauce, /s: Responde a una imagen para dar con los 5 resultados más similares a la búsqueda (en mantenimiento). \n\n/reverse, /r: Respondes a una imagen y gawr gura te dará un resultado de búsqueda de Google (en mantenimiento).\n\n/tf: Responde a una imagen para subirla y el bot devuelve el enlace.\n\n/tg: Responde a una animación/gif para subirla y el bot responde con el enlace hecho. \n\n/tv: Responde a un video/mp4 para subirlo y el bot responde con el enlace hecho.";
  }

  if (action === "12") {
    text =
      "¡Stickers con Gawr Gura!, no te pierdas sus comandos a continuación: \n\n/stickers <búsqueda>: Encuentra packs de stickers a partir de la búsqueda (en mantenimiento). \n\n/idsticker: Respondes a un sticker para obtener su ID y sticker pack de origen. \n\n/getsticker: Respondes a un sticker para convertirlo en un archivo documento PNG.";
  }
  if (action === "14") {
    text =
      "Gawr creó test´s para pasar el ratos en sus grupos, divierteté usando los siguientes comandos y descubre tus caracteristicas especiales: \n\n¿Conoces el clásico juego de la botella para cumplir retos entre amigos?, En efecto, ambos sabemos de que hablamos, Gawr Gura trae para ti su propia version: \n\n/botella <categoría>: Elige de entre 5 categoría diferentes para responder preguntas que te sacaran hasta la última verdad. \nLas categorías disponibles con las siguientes: \n\n🍾Anime\n🍾Amor\n🍾+18\n🍾Chicos\n🍾Confesión\n\nPara elegir tú categoría, sigue este ejemplo: \n/botella amor, /botella anime, etc. \n\n/qtaesthetic: Descubre cúal es el tipo de estílo aesthetic que te define. \n\n/qttierno: Aw, apuesto a que quieres saber que tan tierno eres. \n\n/qtnerd: ¿Quieres saber qué tan nerd eres?, fácil dale a este comando. \n\n/qtotaku: Gawr Gura calífica que tan otaku eres, pinchale al comando Kamisama. \n\n/qtfrio: ¿Sabes que tan frio eres?. \n\n/qtcringe: ¿Que tanto cringes das?. \n\n/qtgay: Mide tú nivel de porcentaje Gay.";
  }
  if (action === "15") {
    text =
      "Con Gawr Gura puedes establecer reglas para tus grupos de forma personalizada...\n\n/setrules: Establece las nuevas reglas para tu grupo; no se admite archivos multimedia, unicamente texto.\n\n/rules: Consulta las reglas de tu grupo.\n\n/clearrules: Limpia las reglas de tu grupo o elimina las que esten establecidas.";
  }

  if (action === "16") {
    bot.answerCallbackQuery({
      callback_query_id: callbackQuery.id,
      text: "¡A continuación encontraras una serie de comandos creados para darle ambiente al grupito!",
      show_alert: true,
    });
  }

  if (action === "20") {
    text =
      "En ocasiones es nesesario silenciar a un usuario por razones que se encuentren en el chat, por ello, los siguientes comandos lo ayudaran a realizar esta tarea: \n\n/mute: Bloquea la entrada de mensajes para un usuario haciendo reply a un mensaje o con alias/ID. \n\n/tmute <días>: Bloquea la entrada de mensajes de un usuario con tiempo establecido (El tiempo se determina en días, Ejemplo: /tmute 1, /tmute 2, etc.). \n\n/unmute: Retira la entrada de mensajes para un usuario haciendo reply a su mensaje o alias/ID.";
  }

  if (action === "21") {
    text =
      "Gawr Gura tambien protege tus grupos de los enlaces maliciosos o no autorizados, los comandos disponibles: \n\n/spam <ban/kick/mute>: El administrador del grupo puede elegir el tipo de castigo para el usuario teniendo entre 3 opciones(ban, kick, mute) para su eleccion, Ejemplo: /spam ban, /spam kick, /spam mute. \n\n/spamwcheck <ID de usuario>: Verifica con la ID de un usuario si se encuentra baneado o no por la federación de @SpamWatch. \n\nNota: Por defecto los grupos serán protegidos por la federación de Spam Watch (@SpamWatch) dedicada a banear usuarios spammers, árabes, trolls, globalmente, el bot baneará a estos usuarios si ingresan al grupo. (El bot debe ser administrador del grupo).";
  }
  if (action === "23") {
    text =
      "Otras utilidades en el chat: \n\n/chatlink: Devuelve el enlace del grupo. \n\n/staff: El bot muestra la lista del creador con administradores en el grupo. \n\n@admin: Haces un llamado a los administradores del grupo. \n\n/msg <mensaje>: El bot envia el mensaje añadido al comando en el grupo. \n\n!copiar: El bot copiará cualquier tipo de mensaje en el grupo sin la etiqueta de reenviado. \n\n!reenviar: El bot reenvia cualquier tipo de mensaje en el chat con la etiqueta del nombre del usuario. \n\nNota: El bot por defecto da la bienvenida a los nuevos usuarios con mensajes random pero se eliminan automáticamente despues de 1 min.";
  }
  if (action === "24") {
    bot.answerCallbackQuery({
      callback_query_id: callbackQuery.id,
      text: "Los comandos disponibles en cada modúlo, son herramientas que serán de utilidad en tú grupo.",
      show_alert: true,
    });
  }
  if (action === "25") {
    text =
      "Los comandos siguientes son supercomandos para usuarios que participen en dinámicas o aporten donaciones al bot (módulo en desarrollo).\n\n/anonimo <ID> <mensaje>: Envia un mensaje a cualquier usuario de forma anónima (no sabría quien eres, pero tú sí porque regresa los datos del usuario en sus respuestas\n\n/musica <URLYT>: ¡Descarga música de YT!.";
  }
  if (action === "29") {
    text =
      "...";
  }
  if (action === "37") {
    text =
      "...";
  }
  if (action === "38") {
    text =
      "Una que otra sorpresa encontrarás en este modúlo: \n\n/tts <texto>: El texto que añades al comando, el bot lo responderá con un archivo de audio. \n\n/diccionario <búsqueda>: Encuentra la definición de una palabra en el diccionario de la la real academia española.\n\n/img <búsqueda>: El bot responde con una imagen a apartir de la consulta.";
  }
  if (action === "39") {
    bot.answerCallbackQuery({
      callback_query_id: callbackQuery.id,
      text: "¡Gawr Gura trae a continuación especiales que la haran única!",
      show_alert: true,
    });
  }


  if (action === "41") {
    text =
      "NN";
  }
  if (action === "42") {
    text =
      "...";
  }

  if (action === "menu") {
    if (msg.chat.type == "private") {
      text = `➕Revisa a continuación todas mis habilidades Kamisama, en cada botón encontrarás la información necesaria para el uso de cada uno de los comandos. \n\n/donar: Un granito de arena para tener despierta a Gawr Gura siempre. \n\n🐳Para sugerencias, opiniones, comentar bugs y/o errores del bot visita (@GawrGuraSoporte).`;
      opts.reply_markup = menuOpts.reply_markup;
    }
  }
  bot.editMessageText(text, opts);
});
/***************************************************************************************************************************+ */
/*bot.onText(/\/editable/, function onEditableText(msg) {
  var chatId = msg.chat.id;
  bot
    .sendMessage(chatId, "ᕙ༼*◕_◕*༽ᕤ", {
      parse_mode: "HTML",
    })
    .then(result => {
      bot.editMessageText("(-_-)", {
        chat_id: chatId,
        message_id: result.message_id,
      });
    });
});*/

/**************************************************************************************************************************************** */




/************************************TESTS ENTRETENIMIENTO**************************************/
bot.onText(/\/qtaesthetic/, function (msg) {
  var chatId = msg.chat.id;
  var qtagif = [
    "https://i.pinimg.com/originals/1f/8f/39/1f8f3975b69c4903d275093c3aec1fbf.gif",
    "https://media1.tenor.com/images/13c45d7d4e49fa40c423bf0e4a1c76f8/tenor.gif",
    "https://pa1.narvii.com/7692/13aba0a6619ae82b3524e6924adeb6f19d5fc289r1-500-294_hq.gif",
    "https://64.media.tumblr.com/7602d9db0c566441c7fa1b4d20e00e65/tumblr_nza8hqxAxh1tmz0wgo1_500.gif",
    "https://www.icegif.com/wp-content/uploads/aesthetic-icegif.gif",
    "https://www.icegif.com/wp-content/uploads/aesthetic-icegif-18.gif",
    "https://64.media.tumblr.com/3f0e18c0f81d9e0159db93b6b96bba3b/tumblr_ph7y0nisvR1re6nxeo1_1280.gif",
    "https://yiche-static.oss-cn-hangzhou.aliyuncs.com/images/2021-02-01/a547a7b0.gif",
    "https://www.gifcen.com/wp-content/uploads/2021/03/aesthetic-gif-13.gif",
    "https://thumbs.gfycat.com/EnlightenedSelfreliantChrysomelid-size_restricted.gif",
  ];
  var ma = Math.random();
  var totalqtagif = Math.floor(ma * qtagif.length);

  var qtg = [
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _💖Tú tipo de aesthetic es:_ *Pale*, _Todo lo simple te resulta simplemente hermoso._`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _💖Tú tipo de aesthetic es:_ *Vintage*, _Amas las cosas antiguas, la música y ropa antigua, etc._`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _💖Tú tipo de aesthetic es:_ *Kawaii pastel*, _Eres una persona que adora el anime, las cosas japonesas y bastante tiernx._`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _💖Tú tipo de aesthetic es:_ *Art Hoe*, _Eres una persona que ama el arte, los colores cálidos generalmente el amarillo y eres muy alegre, sin duda este es tu aesthetic._`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _💖Tú tipo de aesthetic es:_ *Grunje*, _tienes rabia y sentimientos acumulados, te gusta la musica con personalidad y no te cortas al expresar tus sentimientos._`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _💖Tú tipo de aesthetic es:_ *Vaporwave*, _Eres sad, cool y amante del neon._`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _💖Tú tipo de aesthetic es:_ *Baddie*, _Tienes caracter fuerte, con mucho ego y presumidx._`,
  ];
  var ma = Math.random();
  var totalqtg = Math.floor(ma * qtg.length);
  bot.sendAnimation(chatId, qtagif[totalqtagif], {
    caption: qtg[totalqtg],
    parse_mode: "Markdown",
  });
});

bot.onText(/\/qttierno/, function (msg) {
  var chatId = msg.chat.id;
  var qtagif = [
    "https://pa1.narvii.com/6405/7f9074efad73029e9c29412b50590dbf35818531_hq.gif",
    "https://pa1.narvii.com/6904/de3cb10db5a332b433c47072146068694506c179r1-500-281_hq.gif",
    "https://acegif.com/wp-content/gif/blushing-35.gif",
    "https://media1.tenor.com/images/b68e4356fa88d51230ee92333d9e0fca/tenor.gif?itemid=18186996",
    "https://i.pinimg.com/originals/ba/25/a9/ba25a9be75cbaaa4b2c2c89a2a117767.gif",
    "https://i.gifer.com/4gtp.gif",
    "http://pa1.narvii.com/6307/23dc285960dd581888f9edc5ee7b47ae2be91170_00.gif",
    "https://i1.wp.com/25.media.tumblr.com/cb9cbc87f51f05526070e31f74d22bd5/tumblr_mgxlatzo9D1rjxujto1_500.gif",
    "http://4.bp.blogspot.com/-Beu5FZLV85k/UvKJD0OV8eI/AAAAAAAAR18/2fGxf7F2nVg/s1600/anime-blond-gif-girl-kawaii-Favim.com-237584_large.gif",
    "https://i.pinimg.com/originals/bb/38/ac/bb38ac3043a2b1ce3ad7bb12c0496589.gif",
  ];
  var ma = Math.random();
  var totalqtagif = Math.floor(ma * qtagif.length);

  var qtg = [
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres muy tiernx, eres muy pero muy tierno que cuando te ven pasar por la calle las personas vomitan arcoiris._`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres totalmente tiernx, Eres muy tiernx, tanto en personalidad como en apariencia._`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres tiernx, Todos tus amigos te recuerdan lo tiernx que eres a diario, porque si lo eres y punto._`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres tiernx, Eres tiernx y nadie puede negarlo, aunque también tienes ese típico estilo BadGirl/boy._`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _No eres tiernx :(, No eres tierna pero tu estilo BadGirl roba corazones._`,
  ];
  var ma = Math.random();
  var totalqtg = Math.floor(ma * qtg.length);
  bot.sendAnimation(chatId, qtagif[totalqtagif], {
    caption: qtg[totalqtg],
    parse_mode: "Markdown",
  });
});

bot.onText(/\/qtnerd/, function (msg) {
  var chatId = msg.chat.id;
  var qtagif = [
    "https://i.pinimg.com/originals/c9/d9/91/c9d9916114b0ba5a3832bdb2a7dbb23b.gif",
    "https://i.pinimg.com/originals/a7/e1/38/a7e138395d007c6a2fa740c6e959d394.gif",
    "https://i.gifer.com/TGXb.gif",
    "https://i.pinimg.com/originals/90/a5/2c/90a52c62c1df48f4a41ad67893185f93.gif",
    "https://i.pinimg.com/originals/bc/f9/0d/bcf90d16c7c561df761a5c353b176372.gif",
    "https://i.pinimg.com/originals/82/fe/21/82fe217c5975418b86a40c142c436e0d.gif",
    "https://i.pinimg.com/originals/5a/cb/e7/5acbe72ecb70994137656b1c9e4081b5.gif",
  ];
  var ma = Math.random();
  var totalqtagif = Math.floor(ma * qtagif.length);

  var qtg = [
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _🤓Eres demasiado nerd, no sabes que hay un gran mundo detrás de lo que tu crees que es solo un videojuego, una película o un anime._`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _🤓Todo un nerd, te quiero felicitar por ser tan un "Don Nadie" pero sabes mucho acerca de eso que te apasiona y te emociona a tal punto de querer tener una waifu._`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _🤓Eres todo un friki no nerd, No llegas a los limites que un nerd llegaría a hacer por su franquicia favorita. Felicidades, no eres tan ñoño(eso es bueno)._`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _🤓Eres un poco nerd, A veces se te sale lo nerd aunque lo niegues._`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _🤓Nerd de closet, eres un autentico nerd, sin embargo delante de los demás te gusta aparentar lo contrario, por miedo al rechazo._`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _🤓Tú nivel de nerd es insuperable, hablas solo todo el tiempo, escuchas música sad o instrumental, duermes temprano, ¡en fin!._`,
  ];
  var ma = Math.random();
  var totalqtg = Math.floor(ma * qtg.length);
  bot.sendAnimation(chatId, qtagif[totalqtagif], {
    caption: qtg[totalqtg],
    parse_mode: "Markdown",
  });
});

bot.onText(/\/qtotaku/, function (msg) {
  var chatId = msg.chat.id;
  var qtagif = [
    "https://i.pinimg.com/originals/c9/d9/91/c9d9916114b0ba5a3832bdb2a7dbb23b.gif",
    "https://i.imgur.com/tg9OG4w.gif",
    "https://data.whicdn.com/images/297928560/original.gif",
    "https://media1.tenor.com/images/0e22d9e02ff37144f79e97b998f8852a/tenor.gif",
    "https://memestatic.fjcdn.com/gifs/Anime+girl+gifs_3a8572_6970665.gif",
    "https://media1.tenor.com/images/6e14c47b040a20c29413cb14b6e4753a/tenor.gif",
    "https://i.pinimg.com/originals/57/e8/c8/57e8c888fa3f5132ec7e45d082512b4b.gif",
    "https://media1.tenor.com/images/ab6079fc9642a0b71ed870b111091f93/tenor.gif",
    "https://i.pinimg.com/originals/00/c5/96/00c596d5eaeabd14c9e7bd88042fa621.gif",
    "https://66.media.tumblr.com/e8e7bb8967a26aa3f4934445e622d46b/959c94a404ffc1c3-79/s640x960/6960d54726066b099dfb9b319357b0e590758636.gif",
    "https://memeworld.funnyjunk.com/gifs/Japanese+people+vs+engrish+you+know+the+source_6701d5_5205214.gif",
  ];
  var ma = Math.random();
  var totalqtagif = Math.floor(ma * qtagif.length);

  var qtg = [
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}),👻_Eres un otaku fake, te viste apenas 1 anime y el manga te parece horrible, juzgas otros anime que nisiquiera vistes y defiendes los más famosos los cuales ni viste el primer episodio._`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}),👻_Eres un otaku experto, Te viste muchos animes, sabes sus openings y leiste muchos mangas te felicito te puedes tomar como un otaku ¡perfecto!._`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}),👻_Eres un otaku principiante, viste algunos animes buenos pero no los suficientes para ser un experto, aun no leiste ningun manga pero de seguro en dentro de poco seras el mas experto del anime._`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}),👻_Eres un otaku noob, Estas empezando a ser un otaku, ¡sigue así!._`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}),👻_Eres un otaku alfa, Eres de los mejores otakus, ¡Enhorabuena!._`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}),👻_Eres el dios otaku, Cantarias a pulmón 1001 openings, te gustaría hacer cosplay, estas siempre pendiente de los animes en emisión y nunca dejarias el anime._`,
  ];

  var ma = Math.random();
  var totalqtg = Math.floor(ma * qtg.length);
  bot.sendAnimation(chatId, qtagif[totalqtagif], {
    caption: qtg[totalqtg],
    parse_mode: "Markdown",
  });
});

bot.onText(/\/qtcringe/, function (msg) {
  var chatId = msg.chat.id;
  var qtagif = [
    "https://media.tenor.com/images/183010eff72c29b1867510cd74678178/tenor.gif",
    "https://i.redd.it/c5q91gegre331.gif",
    "https://media1.tenor.com/images/a38d711271e2e6745fc6ac49821be77d/tenor.gif?",
    "https://pa1.narvii.com/6340/1712dea613ddca21d9ad63557c70600e24845a2a_hq.gif",
    "https://media1.tenor.com/images/9b71cbdd52a79258b6dcf6a51c40654b/tenor.gif?",
    "https://i.pinimg.com/originals/cb/80/bc/cb80bc66f74ce929839569bd9f68b5c2.gif",
    "https://thumbs.gfycat.com/FairVigorousBuck-size_restricted.gif",
    "https://64.media.tumblr.com/d6471c003c4c863df30ca3e6fb9c8184/1fb1078b8ed678c7-08/s500x750/5d257f1a52d4d4e87fb373714592597aac0bdfd5.gif",
  ];
  var ma = Math.random();
  var totalqtagif = Math.floor(ma * qtagif.length);

  var qtgc = [
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _No das cringe amigx te felicito. Eres perfecto no das cringe, eres original, aesthetic, no te gusta lo básico, por ejemplo, ser gacha o ser otaku por moda :) Amix eres lo máximo._`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Das demasiado cringe:(, eres demasiado grasoso, te gusta funar porque sí y crees que todo es humor negro._`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Das cringe, ardido, te dedicas a burlarte de todo con la excusa de que es "hUmoR nEGRo", probable que seas el morrito edgy de Internet._`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Un poco de cringe, a veces te humillas pero no es mucho, no es algo de que preocuparse._`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Mucho cringe, usas emojis con sarcasmo, debes de usar el ":v" para cualquier cosa, eso no es gracioso ugh, o por el otro lado quizás seas un simp, funas demasiado, date cuenta de que no todo merece funa._`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _ 100%, Eres cringe en persona._`,
  ];
  var ma = Math.random();
  var totalqtg = Math.floor(ma * qtgc.length);
  bot.sendAnimation(chatId, qtagif[totalqtagif], {
    caption: qtgc[totalqtg],
    parse_mode: "Markdown",
  });
});

bot.onText(/\/qtfrio/, function (msg) {
  var chatId = msg.chat.id;
  var qtagif = [
    "https://i.pinimg.com/originals/f5/ed/70/f5ed70ebca132436369ba3c7dd9e9337.gif",
    "http://25.media.tumblr.com/ffe2efbf4ddfcb8c51e38498ab1c7f1f/tumblr_msrzzflhRN1svsocdo2_500.gif",
    "https://i.pinimg.com/originals/80/5a/80/805a8066d748cd8805838d95d3041f3c.gif",
    "http://3.bp.blogspot.com/-gy30r1ydjWs/U5_AJQaPuOI/AAAAAAAAERk/lHuS63Ceuis/s1600/WDj5Tl.gif",
  ];
  var ma = Math.random();
  var totalqtagif = Math.floor(ma * qtagif.length);

  var qtgc = [
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres bueno a veces y malo, no dejas que te hagan enojar o sonreír._`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres un amor, siempre mostrando a los demás tu lado más amable, pero en el fondo cuando te enojas eres el mismo infierno en persona._`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _seleccionas a la gente a quien le entregas tu evidente cariño. Con algunos eres fríx pero también tienes un lado muy cariñoso._`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Bastante frio, bien tsundere, te enojas por cualquier pequeñez, sueles tener poca paciencia y responder bien cortante._`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres bueno a veces y malo, no dejas que te hagan enojar o sonreír._`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Lo frío no es lo tuyo sueles ser una persona muy dulce :3, tierna y tienes un corazón muy amable, bien ahí :3._`,
  ];
  var ma = Math.random();
  var totalqtg = Math.floor(ma * qtgc.length);
  bot.sendAnimation(chatId, qtagif[totalqtagif], {
    caption: qtgc[totalqtg],
    parse_mode: "Markdown",
  });
});

bot.onText(/\/qtgay/, function (msg) {
  var chatId = msg.chat.id;
  var qtagif = [
    "https://2.bp.blogspot.com/-WoN69qXxvaM/VlNzqzdKfFI/AAAAAAAADvo/OG451UIPw-k/s640/tumblr_mpdgl8JP9d1s14ntho1_500.gif",
    "https://i.pinimg.com/originals/01/c9/e3/01c9e33fc02b8987c805452ffcd99083.gif",
    "https://i.pinimg.com/originals/fb/4d/c4/fb4dc407e4bbb5d2ae12e1833d3de497.gif",
    "https://i.pinimg.com/originals/9b/fb/ba/9bfbba0dc90387938b1dc406e430e3f0.gif",
    "https://c.tenor.com/voAeijoPFE8AAAAd/yuri-anime.gif",
    "",
  ];
  var ma = Math.random();
  var totalqtagif = Math.floor(ma * qtagif.length);

  var qtg = [
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *1%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *2%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *3%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *4%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *5%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *6%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *7%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *8%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *9%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *10%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *11%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *12%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *13%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *14%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *15%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *16%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *17%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *18%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *19%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *20%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *21%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *22%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *23%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *24%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *25%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *26%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *27%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *28%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *29%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *30%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *31%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *32%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *33%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *34%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *35%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *36%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *37%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *38%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *39%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *40%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *41%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *42%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *43%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *44%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *45%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *46%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *47%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *48%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *49%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *50%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *51%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *52%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *53%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *54%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *55%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *56%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *57%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *58%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *59%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *60%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *61%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *62%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *63%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *64%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *65%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *66%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *67%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *68%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *69%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *70%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *71%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *72%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *73%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *74%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *75%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *76%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *77%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *78%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *79%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *80%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *81%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *82%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *83%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *84%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *85%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *86%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *87%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *88%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *89%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *90%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *91%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *92%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *93%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *94%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *95%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *96%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *97%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *98%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *99%* _Gay._🏳‍🌈`,
    `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Eres:_ *100%* _Gay._🏳‍🌈`,
  ];
  var ma = Math.random();
  var totalqtg = Math.floor(ma * qtg.length);
  bot.sendAnimation(chatId, qtagif[totalqtagif], {
    caption: qtg[totalqtg],
    parse_mode: "Markdown",
  });
});
bot.onText(/\/basta/, function (msg) {
  var chatId = msg.chat.id;
  var qtg = [
    `🧩[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Menciona un artista que empieze con la letra F._`,
    `🧩[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Menciona una comida que de comienzo con la letra J._`,
    `🧩[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Palabra de 3 sílabas._`,
    `🧩[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Animal acuatico que empieze con la letra B._`,
    `🧩[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Comida que tenga 10 letras._`,
    `🧩[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Apellido que empieze con la letra Z._`,
    `🧩[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Apodo con la letra S._`,
    `🧩[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Profesión con la letra H._`,
    `🧩[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Fruta que empieze con la letra A y termine con la O._`,
    `🧩[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Bebida que tenga 8 letras._`,
    `🧩[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Nombre de Playa que tengas 6 sílabas._`,
    `🧩[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Animal terrestre que tenga 3 vocales._`,
    `🧩[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Nombre de mujer que empieze con la letra Q._`,
    `🧩[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Nombre de planeta que empiese con la letra V._`,
    `🧩[${msg.from.first_name}](tg://user?id=${msg.from.id}), _ Actor o actriz que ha ganado un Oscar._`,
    `🧩[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Nombre de anime en género Gore que empieza con la letra B._`,
    `🧩[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Nombre de personaje de anime que empieza con la letra M._`,
    `🧩[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Profesión con 10 sílabas._`,
    `🧩[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Nombre de cíentifico con la letra C._`,
    `🧩[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Palabra que incluya todas las vocales._`,
    `🧩[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Dí una palabra que incluya 3 veces la vocal O._`,
    `🧩[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Menciona un nombre de una flor que empieze con la letra Z._`,
    `🧩[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Una canción que tenga 4 palabras de nombre en español._`,
    `🧩[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Comida mexicana que empieze con la letra T._`,
    `🧩[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Menciona 5 países del mundo._`,
    `🧩[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Dí 3 nombres de frutas que empiezen con la letra M._`,
    `🧩[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Menciona 5 artistas que tengan hayan creado perfume de marca._`,
    `🧩[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Dí 3 marcas de maquillaje más famosas que tengan al menos una vocal._`,
    `🧩[${msg.from.first_name}](tg://user?id=${msg.from.id}), _3 géneros de música._`,
    `🧩[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Dí 3 colores que empiezen con la letra A._`,
    `🧩[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Menciona un color que tenga 2 sílabas._`,
    `🧩[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Oficio que terminé con la letra O._`,
    `🧩[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Oficio que terminé con la letra A._`,
    `🧩[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Postre que empieze con la letra R._`,
    `🧩[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Comida navideña que este compuesta de 8 letras._`,
    `🧩[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Menciona 3 nombres de chico que tengan 2 vocales._`,
    `🧩[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Dí un deporte que empieze con la letra F._`,
    `🧩[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Dí un deporte que terminé con la letra U._`,
    `🧩[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Menciona el nombre de un árbol que tenga la letra E._`,
    `🧩[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Menciona 4 objetos escolares que lleven la letra A y E._`,
    `🧩[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Parte del cuerpo que llevé la letra O._`,
    `🧩[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Menciona un instrumento de laboratorio que este compuesta por 8 letras y que lleve 2 vocales._`,
    `🧩[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Dí 3 objetos que lleven la letra R al comienzo._`,
    `🧩[${msg.from.first_name}](tg://user?id=${msg.from.id}), _5 animales que puedes encontrar en un zoológico que lleven al menos 2 vocales._`,
    `🧩[${msg.from.first_name}](tg://user?id=${msg.from.id}), _5 Instrumentos que usa un doctor que lleve la vocal E._`,
    `🧩[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Menciona 2 nombres de libros escritos al réves._`,
    `🧩[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Menciona 3 redes sociales con tengan 3 vocales distintas en sus nombres._`,
    `🧩[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Escribe Gawr Gura, Mori Calliope al réves._`,
    `🧩[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Dí 5 objetos que más se venden en una boutique._`,
    `🧩[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Dí 3 profesiones con las letras A,B y C consecutivamente._`,
    `🧩[${msg.from.first_name}](tg://user?id=${msg.from.id}), _3 cualidades físicas de una persona Otaku con la letra D, L y T._`,
    `🧩[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Escribe 3 números que lleven la letra o al final._`,
    `🧩[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Escribe 5 numeros cardinales al réves._`,
    `🧩[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Dí un animal, nombre, país y color con  la letra C._`,
    `🧩[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Nombra un artista con la letra M._`,
    `🧩[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Di 3 frases que lleven sus palabras con 4 sílabas._`,
  ];
  var ma = Math.random();
  var totalqtg = Math.floor(ma * qtg.length);
  bot.sendMessage(chatId, qtg[totalqtg], {
    parse_mode: "Markdown",
  });
});
/************************************BOTELLA ENTRETENIMIENTO**************************************/
bot.onText(/\/botella (.+)/, (msg, match) => {
  const chatid = msg.chat.id;
  const usuario = msg.from.first_name;
  const genero = match[1];
  if (genero != "") {
    if (genero === "confesion") {
      var gif = [
        "https://64.media.tumblr.com/tumblr_lzamjlBgXw1r3rofso1_500.gif",
        "https://i.gifer.com/JZgr.gif",
        "https://www.qore.com/core/scripts/image_proxy.php?img=http://media.giphy.com/media/AVilYmB74xhK/giphy.gif",
        "https://cl.buscafs.com/www.qore.com/public/uploads/images/69218.gif",
        "https://i.gifer.com/LJ2O.gif",
        "http://i.huffpost.com/gadgets/slideshows/335285/slide_335285_3384944_free.gif",
        "https://i.ibb.co/st3sc9Y/pobrane-1.gif",
        "https://media3.giphy.com/media/RLuL0ovfqsq3W4YFtL/giphy.gif",
      ];
      var ma = Math.random();
      var totalgif = Math.floor(ma * gif.length);

      var verdad = [
        `_Muy bien_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _has elegido responder una confesión_😈, _Tú pregunta es la siguiente:_
        \n*¿Cuánto ganas al mes?*`,
        `_Muy bien_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _has elegido responder una confesión😈_, _Tú pregunta es la siguiente:_
        \n*¿Qué es lo más embarazoso que tus padres te han pillado haciendo?*`,
        `_Muy bien_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _has elegido responder una confesión😈_, _Tú pregunta es la siguiente:_
        \n*¿Alguna vez te han pillado mintiendo?*`,
        `_Muy bien_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _has elegido responder una confesión😈_, _Tú pregunta es la siguiente:_
        \n*¿Crees que a veces es mejor no decir la verdad?*`,
        `_Muy bien_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _has elegido responder una confesión😈_, _Tú pregunta es la siguiente:_
        \n*Si pudieras ir a cenar con un famoso o una famosa, ¿con quién irías?*`,
        `_Muy bien_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _has elegido responder una confesión😈_, _Tú pregunta es la siguiente:_
        \n*¿Alguna vez te han arrestado?*`,
        `_Muy bien_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _has elegido responder una confesión😈_, _Tú pregunta es la siguiente:_
        \n*¿Hablas contigo en voz alta?*`,
        `_Muy bien_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _has elegido responder una confesión😈_, _Tú pregunta es la siguiente:_
        \n*¿Qué es lo más loco que haces cuando estás solo/a?*`,
        `_Muy bien_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _has elegido responder una confesión😈_, _Tú pregunta es la siguiente:_
        \n*¿Hay algo de ti que no sepan tus amigos?*`,
        `_Muy bien_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _has elegido responder una confesión😈_, _Tú pregunta es la siguiente:_
        \n*Si pudieras no volver a ver a alguien nunca más... ¿a quién elegirías?*`,
        `_Muy bien_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _has elegido responder una confesión😈_, _Tú pregunta es la siguiente:_
        \n*¿Qué harías si te encontraras un maletín lleno de dinero por la calle?*`,
        `_Muy bien_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _has elegido responder una confesión😈_, _Tú pregunta es la siguiente:_
        \n*¿Cuál ha sido la peor etapa de tu vida?*`,
        `_Muy bien_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _has elegido responder una confesión😈_, _Tú pregunta es la siguiente:_
        \n*¿Qué es lo que más te gusta de ti mismo/a?*`,
        `_Muy bien_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _has elegido responder una confesión😈_, _Tú pregunta es la siguiente:_
        \n*¿Qué es lo peor que has hecho estando bebido/a?*`,
        `_Muy bien_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _has elegido responder una confesión😈_, _Tú pregunta es la siguiente:_
        \n*¿Qué es lo más asqueroso que has comido en la vida?*`,
        `_Muy bien_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _has elegido responder una confesión😈_, _Tú pregunta es la siguiente:_
        \n*¿Cuál es el hábito más desagradable que tienes?*`,
        `_Muy bien_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _has elegido responder una confesión😈_, _Tú pregunta es la siguiente:_
        \n*¿Qué es lo peor que pueden decir de ti los demás?*`,
        `_Muy bien_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _has elegido responder una confesión😈_, _Tú pregunta es la siguiente:_
        \n*¿Qué es lo más ridículo que te ha pasado por la calle?*`,
        `_Muy bien_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _has elegido responder una confesión😈_, _Tú pregunta es la siguiente:_
        \n*¿Alguna vez te has hecho pis de tanto reír?*`,
        `_Muy bien_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _has elegido responder una confesión😈_, _Tú pregunta es la siguiente:_
        \n*¿Cuál era tu amor de la infancia?*`,
        `_Muy bien_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _has elegido responder una confesión😈_, _Tú pregunta es la siguiente:_
        \n*¿Cómo sería una cita perfecta?*`,
        `_Muy bien_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _has elegido responder una confesión😈_, _Tú pregunta es la siguiente:_
        \n*¿Cuando fue la última vez que vomitaste?*`,
        `_Muy bien_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _has elegido responder una confesión😈_, _Tú pregunta es la siguiente:_
        \n*¿Cuando fue la última vez que vomitaste?*`,
        `_Muy bien_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _has elegido responder una confesión😈_, _Tú pregunta es la siguiente:_
        \n*¿Cuando fue la última vez que vomitaste?*`,
        `_Muy bien_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _has elegido responder una confesión😈_, _Tú pregunta es la siguiente:_
        \n*¿Cuál es tu mayor secreto?*`,
        `_Muy bien_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _has elegido responder una confesión😈_, _Tú pregunta es la siguiente:_
        \n*¿Cuál ha sido el momento más vergonzoso de tu vida?*`,
        `_Muy bien_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _has elegido responder una confesión😈_, _Tú pregunta es la siguiente:_
        \n*¿Cuál ha sido la peor cita que has tenido en tu vida?*`,
        `_Muy bien_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _has elegido responder una confesión😈_, _Tú pregunta es la siguiente:_
        \n*¿Cuál es la parte que más te gusta de tu cuerpo?*`,
        `_Muy bien_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _has elegido responder una confesión😈_, _Tú pregunta es la siguiente:_
        \n*¿Cuál crees que es la canción perfecta para escuchar a solas?*`,
        `_Muy bien_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _has elegido responder una confesión😈_, _Tú pregunta es la siguiente:_
        \n*¿Cuántas veces te has enamorado?*`,
        `_Muy bien_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _has elegido responder una confesión😈_, _Tú pregunta es la siguiente:_
        \n*¿Físicamente hablando cuál es tu prototipo de chica/chico?*`,
        `_Muy bien_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _has elegido responder una confesión😈_, _Tú pregunta es la siguiente:_
        \n*¿Te consideras una persona de mente abierta?*`,
        `_Muy bien_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _has elegido responder una confesión😈_, _Tú pregunta es la siguiente:_
        \n*¿Cuál es la cosa más loca que has hecho por una persona?*`,
        `_Muy bien_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _has elegido responder una confesión😈_, _Tú pregunta es la siguiente:_
        \n*¿Cuál es la peor cosa que has hecho por dinero?*`,
        `_Muy bien_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _has elegido responder una confesión😈_, _Tú pregunta es la siguiente:_
        \n*¿Cuéntanos algún vicio o manía de la que te avergüenzas?*`,
        `_Muy bien_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _has elegido responder una confesión😈_, _Tú pregunta es la siguiente:_
        \n*¿Cuál es tu hábito más infantil?*`,
        `_Muy bien_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _has elegido responder una confesión😈_, _Tú pregunta es la siguiente:_
        \n*¿Quién es la persona de este grupo que más secretos tuyos sabe?*`,
        `_Muy bien_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _has elegido responder una confesión😈_, _Tú pregunta es la siguiente:_
        \n*¿Consumes algún tipo de droga?*`,
      ];
      var ma = Math.random();
      var totalverdad = Math.floor(ma * verdad.length);
      bot.sendAnimation(chatid, gif[totalgif], {
        caption: verdad[totalverdad],
        parse_mode: "Markdown",
      });
    }

    if (genero === "+18") {
      var gif = [
        "https://64.media.tumblr.com/c840f18015620c50ebce3cc2eeaa6d30/201a7bd00ab9c83d-84/s500x750/d90d20552b41bb81b324710eaa858c8272ac635f.gif",
        "http://2.bp.blogspot.com/-8g4LoVZhKi0/VGzL3QPZ6ZI/AAAAAAAB4iY/GJlCqjG1GSQ/s1600/tumblr_m31clpRnKh1qm7k7ao1_500.gif",
        "https://i.gifer.com/origin/36/36afcaa8afef9c493278889c9b6495bf_w200.gif",
        "http://media.giphy.com/media/1zaBMn2bXNDLW/giphy.gif",
      ];
      var ma = Math.random();
      var totalgif = Math.floor(ma * gif.length);

      var verdad = [
        `💧_Hora de ponernos comodos con_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _(No vale rajar)🥴, 🌡️Tú pregunta es la siguiente:_
        \n*🎙️¿Qué tiene que hacer un hombre/mujer para seducirte?*`,
        `💧_Hora de ponernos comodos con_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _(No vale rajar)🥴, 🌡️Tú pregunta es la siguiente:_
        \n*🎙️¿Alguna vez has tenido un trío? ¿Y cómo te ha gustado?*`,
        `💧_Hora de ponernos comodos con_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _(No vale rajar)🥴, 🌡️Tú pregunta es la siguiente:_
        \n*🎙️¿Alguna vez has tenido relaciones sexuales con un buen amigo?*`,
        `💧_Hora de ponernos comodos con_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _(No vale rajar)🥴, 🌡️Tú pregunta es la siguiente:_
        \n*🎙️¿Cuál es el momento más vergonzoso en el sexo que has tenido?*`,
        `💧_Hora de ponernos comodos con_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _(No vale rajar)🥴, 🌡️Tú pregunta es la siguiente:_
        \n*🎙️¿Qué buscas primero en una mujer - senxs, culx o cara?*`,
        `💧_Hora de ponernos comodos con_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _(No vale rajar)🥴, 🌡️Tú pregunta es la siguiente:_
        \n*🎙️Estás totalmente enamorado, pero luego se va. ¿Qué tendría que pasar para que huyeras gritando?*`,
        `💧_Hora de ponernos comodos con_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _(No vale rajar)🥴, 🌡️Tú pregunta es la siguiente:_
        \n*🎙️¿Qué buscas primero en un hombre y qué debes tener para que pienses: awwwww, genial!*`,
        `💧_Hora de ponernos comodos con_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _(No vale rajar)🥴, 🌡️Tú pregunta es la siguiente:_
        \n*🎙️¿Alguna vez has tenido cibersexo o sexo telefónico, y con quién?*`,
        `💧_Hora de ponernos comodos con_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _(No vale rajar)🥴, 🌡️Tú pregunta es la siguiente:_
        \n*🎙️¿Cuál es tu deseo secreto más desagradable?*`,
        `💧_Hora de ponernos comodos con_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _(No vale rajar)🥴, 🌡️Tú pregunta es la siguiente:_
        \n*🎙️¿A quién le darías dinero para dormir contigo?*`,
        `💧_Hora de ponernos comodos con_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _(No vale rajar)🥴, 🌡️Tú pregunta es la siguiente:_
        \n*🎙️¿Cuál fue tu experiencia sexual más loca?*`,
        `💧_Hora de ponernos comodos con_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _(No vale rajar)🥴, 🌡️Tú pregunta es la siguiente:_
        \n*🎙️¿Alguna vez has tenido relaciones sexuales peligrosas, y cómo fue exactamente eso?*`,
        `💧_Hora de ponernos comodos con_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _(No vale rajar)🥴, 🌡️Tú pregunta es la siguiente:_
        \n*🎙️¿Alguna vez has tenido sexo con un extraño? p.ej. de Tinder?*`,
        `💧_Hora de ponernos comodos con_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _(No vale rajar)🥴, 🌡️Tú pregunta es la siguiente:_
        \n*🎙️Si te pusieras en línea, ¿cuál sería tu especialidad?*`,
        `💧_Hora de ponernos comodos con_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _(No vale rajar)🥴, 🌡️Tú pregunta es la siguiente:_
        \n*🎙️¿En qué te gusta más pensar cuando te satisfaces?*`,
        `💧_Hora de ponernos comodos con_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _(No vale rajar)🥴, 🌡️Tú pregunta es la siguiente:_
        \n*🎙️¿Alguna vez has tenido relaciones sexuales con el mismo sexo?*`,
        `💧_Hora de ponernos comodos con_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _(No vale rajar)🥴, 🌡️Tú pregunta es la siguiente:_
        \n*🎙️¿Cuál es la mejor manera de acostarte con alguien?*`,
        `💧_Hora de ponernos comodos con_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _(No vale rajar)🥴, 🌡️Tú pregunta es la siguiente:_
        \n*🎙️¿Con quién dormirías en cualquier caso, si estás casado o enamorado de un inmortal?*`,
        `💧_Hora de ponernos comodos con_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _(No vale rajar)🥴, 🌡️Tú pregunta es la siguiente:_
        \n*🎙️¿Con quién tuviste el mejor sexo de tu vida?*`,
        `💧_Hora de ponernos comodos con_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _(No vale rajar)🥴, 🌡️Tú pregunta es la siguiente:_
        \n*🎙️¿Alguna vez has pagado por sexo?*`,
        `💧_Hora de ponernos comodos con_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _(No vale rajar)🥴, 🌡️Tú pregunta es la siguiente:_
        \n*🎙️¿Con quién tuviste tu último sueño?*`,
        `💧_Hora de ponernos comodos con_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _(No vale rajar)🥴, 🌡️Tú pregunta es la siguiente:_
        \n*🎙️¿Te has sorprendido alguna vez durante el sexo y por quién?*`,
        `💧_Hora de ponernos comodos con_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _(No vale rajar)🥴, 🌡️Tú pregunta es la siguiente:_
        \n*🎙️¿Cuál es tu posición favorita?*`,
        `💧_Hora de ponernos comodos con_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _(No vale rajar)🥴, 🌡️Tú pregunta es la siguiente:_
        \n*🎙️¿Dónde está tu zona erógena?*`,
        `💧_Hora de ponernos comodos con_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _(No vale rajar)🥴, 🌡️Tú pregunta es la siguiente:_
        \n*🎙️¿Te quejas en el clímax?*`,
        `💧_Hora de ponernos comodos con_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _(No vale rajar)🥴, 🌡️Tú pregunta es la siguiente:_
        \n*🎙️¿Con quién del grupito te gustaría tener sexo?*`,
        `💧_Hora de ponernos comodos con_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _(No vale rajar)🥴, 🌡️Tú pregunta es la siguiente:_
        \n*🎙️¿Cuándo fue la última vez que tuviste sexo?*`,
        `💧_Hora de ponernos comodos con_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _(No vale rajar)🥴, 🌡️Tú pregunta es la siguiente:_
        \n*🎙️¿Tienes piercings íntimos?¿Dónde?*`,
        `💧_Hora de ponernos comodos con_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _(No vale rajar)🥴, 🌡️Tú pregunta es la siguiente:_
        \n*🎙️¿Cuántos hombres/mujeres ya has besado?*`,
        `💧_Hora de ponernos comodos con_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _(No vale rajar)🥴, 🌡️Tú pregunta es la siguiente:_
        \n*🎙️¿Con quién tuviste la cita más caliente?*`,
        `💧_Hora de ponernos comodos con_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _(No vale rajar)🥴, 🌡️Tú pregunta es la siguiente:_
        \n*🎙️¿Cuál es tu posición favorita?*`,
        `💧_Hora de ponernos comodos con_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _(No vale rajar)🥴, 🌡️Tú pregunta es la siguiente:_
        \n*🎙️¿Cuándo fue tu primera vez?*`,
        `💧_Hora de ponernos comodos con_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _(No vale rajar)🥴, 🌡️Tú pregunta es la siguiente:_
        \n*🎙️¿Todavía eres virgen?*`,
        `💧_Hora de ponernos comodos con_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _(No vale rajar)🥴, 🌡️Tú pregunta es la siguiente:_
        \n*🎙️¿Dónde te afeitas por todas partes?*`,
        `💧_Hora de ponernos comodos con_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _(No vale rajar)🥴, 🌡️Tú pregunta es la siguiente:_
        \n*🎙️¿Alguna vez has tenido relaciones íntimas con 2 personas al mismo tiempo?*`,
        `💧_Hora de ponernos comodos con_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _(No vale rajar)🥴, 🌡️Tú pregunta es la siguiente:_
        \n*🎙️¿Alguna vez escuchaste a tu hermana / hermano gemir?*`,
        `💧_Hora de ponernos comodos con_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _(No vale rajar)🥴, 🌡️Tú pregunta es la siguiente:_
        \n*🎙️¿Alguna vez te han pillado en la masturbación?*`,
        `💧_Hora de ponernos comodos con_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _(No vale rajar)🥴, 🌡️Tú pregunta es la siguiente:_
        \n*🎙️¿En qué lugares tuviste sexo?*`,
        `💧_Hora de ponernos comodos con_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _(No vale rajar)🥴, 🌡️Tú pregunta es la siguiente:_
        \n*🎙️¿Alguna vez has engañado a alguien?*`,
        `💧_Hora de ponernos comodos con_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _(No vale rajar)🥴, 🌡️Tú pregunta es la siguiente:_
        \n*🎙️¿Siempre eres fiel?*`,
        `💧_Hora de ponernos comodos con_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _(No vale rajar)🥴, 🌡️Tú pregunta es la siguiente:_
        \n*🎙️¿Tienes curiosidad por intimar con una persona de tu mismo género?*`,
        `💧_Hora de ponernos comodos con_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _(No vale rajar)🥴, 🌡️Tú pregunta es la siguiente:_
        \n*🎙️¿Te gusta un juego previo largo? Si es así, ¿cómo debería ser?*`,
        `💧_Hora de ponernos comodos con_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _(No vale rajar)🥴, 🌡️Tú pregunta es la siguiente:_
        \n*🎙️¿Te quejas al orgasmo?*`,
        `💧_Hora de ponernos comodos con_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _(No vale rajar)🥴, 🌡️Tú pregunta es la siguiente:_
        \n*🎙️¿Qué peinado púbico tienes?*`,
        `💧_Hora de ponernos comodos con_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _(No vale rajar)🥴, 🌡️Tú pregunta es la siguiente:_
        \n*🎙️¿Te dejarías ser salpicado por un hombre en la cara?*`,
        `💧_Hora de ponernos comodos con_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _(No vale rajar)🥴, 🌡️Tú pregunta es la siguiente:_
        \n*🎙️¿Jugabas juegos de doctor cuando eras más joven?*`,
        `💧_Hora de ponernos comodos con_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _(No vale rajar)🥴, 🌡️Tú pregunta es la siguiente:_
        \n*🎙️¿Ya has tenido experiencias homosexuales?*`,
        `💧_Hora de ponernos comodos con_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _(No vale rajar)🥴, 🌡️Tú pregunta es la siguiente:_
        \n*🎙️¿Alguna vez has tenido sexo por teléfono?*`,
        `💧_Hora de ponernos comodos con_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _(No vale rajar)🥴, 🌡️Tú pregunta es la siguiente:_
        \n*🎙️Si tuvieras que renunciar a un anuncio de contacto erótico, ¿cuál sería?*`,
        `💧_Hora de ponernos comodos con_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _(No vale rajar)🥴, 🌡️Tú pregunta es la siguiente:_
        \n*🎙️¿A quién en tu clase te gustaría besar?*`,
        `💧_Hora de ponernos comodos con_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _(No vale rajar)🥴, 🌡️Tú pregunta es la siguiente:_
        \n*🎙️¿A quién en tu clase te gustaría besar?*`,
      ];
      var ma = Math.random();
      var totalverdad = Math.floor(ma * verdad.length);
      bot.sendAnimation(chatid, gif[totalgif], {
        caption: verdad[totalverdad],
        parse_mode: "Markdown",
      });
    }

    if (genero === "anime") {
      var gif = [
        "http://pa1.narvii.com/6045/303c731c9449b07579d386cdcfa1746e6a8391b8_00.gif",
        "https://pa1.narvii.com/6047/8fdf86138e58e0c5c01d0e33fee741561517d5d6_hq.gif",
        "https://d.wattpad.com/story_parts/654/images/16399e19625209ee202097781349.gif",
        "https://3.bp.blogspot.com/-jY9_JBF2YKw/XDq6WdZrPxI/AAAAAAAAC34/Xh5GyMk2_BMSey7_7ypDjl0nMegZ3ZvwgCLcBGAs/s1600/Go%2BToubun%2Bno%2BHanayome.gif",
        "https://media.giphy.com/media/MC7fYhbA4ociQ/giphy.gif",
        "https://64.media.tumblr.com/4fb5410032a96bd1c2f9192fa3f5dabf/tumblr_mswc5f7nRb1she98jo1_500.gif",
        "https://i.pinimg.com/originals/5c/86/f1/5c86f16d4bbde52ccc7ef8d529a1d931.gif",
        "https://i.pinimg.com/originals/c2/62/d5/c262d5aaa7d8d52021f790301fb4894c.gif",
      ];
      var ma = Math.random();
      var totalgif = Math.floor(ma * gif.length);

      var verdad = [
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸¿Cuánto tiempo llevas viendo anime?*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸¿Cuántos animes has visto?*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸¿Cuál es tu anime favorito?*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸Anime que conozcas que esté infravalorado.*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸Anime que conozcas que esté sobrevalorado.*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸Anime que a todos les gusta menos a ti.*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸¿A qué personaje le has llorado más?*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸¿Cuál es el anime más triste que has visto?*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸¿Quiénes son tus waifus favoritas?*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸¿Quiénes son tus husbandos favoritos?*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸¿Has hablado en japonés?*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸¿Te bañas?*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸¿Te ha dado pena decir que eres otaku?*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸¿Qué anime dejaste y volviste a ver?*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸¿Qué anime te aburrió?*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸¿Cuál es el anime más largo que has visto?*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸¿Cuál es el anime más corto que has visto?*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸¿Has leído manga?*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸¿Has visto yaoi?*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸¿Has visto yuri?*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸¿Has visto hentai?*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸¿Cuál es tu género de anime favorito?*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸Menciona tu top 3 de animes de romance.*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸¿Tienes amigos otakus?*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸¿Tienes cosas de otakus?(figuras de los personajes, mangas, collares, ropa, etc.)¿Cuáles?*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸¿Se han burlado de ti por ser otaku?*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸¿Has visto anime todo un día?*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸¿Prefieres manga o anime?*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸¿Quisieras vivir en Japón?*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸¿Te gusta el Gore?*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸¿Cuales son tus 3 animes favoritos?*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸¿Cual es tu personaje favorito?*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸¿Cual fue el primer anime que viste?*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸¿Como empezaste a amar el anime?*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸¿Qué animes estas viendo actualmente?*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸¿Coleccionas cosas relacionadas con el anime?*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸¿Qué personaje del anime te define mejor?*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸¿Has ido a alguna convencion de anime?*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸¿Cual es tu manga favorito?*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸¿Cuales openings te gustan?*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸¿Cúal es tú opening favorito?*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸¿Entiendes el japones?*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸¿Hablas japones?*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸¿Te gusta ser otaku?*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸¿Puedes dibujar personajes de anime?*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸¿Si pudieras ser un personaje cual serias?*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸¿Has echo cosplay alguna vez?*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸¿Bailas en cosplay?*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸¿Te gustan los pokys?*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸¿Es tu novio/a es otaku?*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸¿Tú ex es otaku?*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸¿Crees que eres un personaje de anime?*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸¿Has echo fan fic's?*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸¿Perteneses a comunidades de anime?*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸¿Te gustan los video juegos?*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸¿Eres creador de un grupo de anime? ¿Qué te impulso a crear uno?*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸¿Eres administrador de un grupo de anime? ¿Porque te eligierón?*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸¿En cuantos grupos de anime estas actualmente?*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸¿En que horarios sueles ver anime normalmente?*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸¿Quién es tu vtuber hololive favorita?*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸¿Para tí que significado tiene ser "Otaku"?*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸¿Cúal fue el primer anime gore que viste"?*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸¿Cúal fue el último anime gore que viste"?*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸Menciona 3 recomendaciones de anime y porque deberían verlo.*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸Anime del que te avergüenzas de haber disfrutado.*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸Anime que quieres ver, pero aún no lo has hecho.*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸Menciona tú pareja favorita del anime.*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸Menciona tu villano favorito del anime.*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸Anime que has visto más de una vez.*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸Anime con la mejor animación.*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸Anime que te ha hecho reír.*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸Anime con personajes más adorables que hayas visto.*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸Arma/equipo/armadura favorita en un anime.*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸Anime deportivo favorito.*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸Menciona el anime que menos te ha gustado y porque.*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸Anime que no esperabas que te gustara, pero te enganchó.*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸Anime que no esperabas que te gustara, pero te enganchó.*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸Anime que desearías que hubiera tenido más temporadas.*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸Anime que desearías que se hiciera.*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸Opening favorito.*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸Ending favorito.*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸¿Alguna vez te has puesto alguna canción anime como tono de llamada?*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸Final de anime que no te convenció.*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸Anime que le gusta a todo el mundo, pero tú todavía no has visto.*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸Anime musical/idol favorito.*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸¿Ves yaoi o/y yuri?*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸Banda sonora favorita.*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸Personajes que te hubiera gustado ver triunfar en el amor.*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸Anime shoujo favorito.*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸Anime shonen favorito*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸Anime más WTF que hayas visto.*`,
        `_Aw_ [${msg.from.first_name}](tg://user?id=${msg.from.id}) _la categoría que elegiste fue anime, ¡Diviertete!🎈, ¿Sí?_, _Tú pregunta es la siguiente:_
        \n*🧸Anime más WTF que hayas visto.*`,
      ];
      var ma = Math.random();
      var totalverdad = Math.floor(ma * verdad.length);
      bot.sendAnimation(chatid, gif[totalgif], {
        caption: verdad[totalverdad],
        parse_mode: "Markdown",
      });
    }

    if (genero === "chicos") {
      var gif = [
        "https://media.giphy.com/media/3otPoRfzAcyjehLFnO/giphy.gif",
        "https://vanidad.es/images/carpeta_gestor/archivos/2017/04/04/chicas_malas_musical_1.gif",
        "http://24.media.tumblr.com/tumblr_m2hjheknBm1qhsrfvo1_500.gif",
        "http://www.indicepr.com/app/frontend/gif.php?url=http://media0.giphy.com/media/Q4vHHK9k3kePu/200.gif",
        "https://pa1.narvii.com/7008/38dafcb3d3f04a9e8234f9b445b6f97099ea2820r1-500-250_hq.gif",
        "https://gifdownload.net/wp-content/uploads/2019/01/adolescente-tumblr-gif-5.gif",
        "https://66.media.tumblr.com/102ea240b0607ddf6e6aa1310f139fd8/tumblr_pziusxEiqc1vg6qedo1_540.gif",
        "https://i.pinimg.com/originals/4d/73/19/4d731942270a5f661e37adbd2e5a828c.gif",
      ];
      var ma = Math.random();
      var totalgif = Math.floor(ma * gif.length);

      var verdad = [
        `[${msg.from.first_name}](tg://user?id=${msg.from.id}) _elegiste la categoría para adolescentes, todo se queda entre nos😏, ¿Listo?_ _Tú pregunta es la siguiente:_
        \n*🤠¿Alguna vez has robado algo?*`,
        `[${msg.from.first_name}](tg://user?id=${msg.from.id}) _elegiste la categoría para adolescentes, todo se queda entre nos😏, ¿Listo?_ _Tú pregunta es la siguiente:_
        \n*🤠¿Cómo se llama tu padre?*`,
        `[${msg.from.first_name}](tg://user?id=${msg.from.id}) _elegiste la categoría para adolescentes, todo se queda entre nos😏, ¿Listo?_ _Tú pregunta es la siguiente:_
        \n*🤠¿Quién es el más guapo/guapa de este grupo?*`,
        `[${msg.from.first_name}](tg://user?id=${msg.from.id}) _elegiste la categoría para adolescentes, todo se queda entre nos😏, ¿Listo?_ _Tú pregunta es la siguiente:_
        \n*🤠¿Cuál es tu página web preferida?*`,
        `[${msg.from.first_name}](tg://user?id=${msg.from.id}) _elegiste la categoría para adolescentes, todo se queda entre nos😏, ¿Listo?_ _Tú pregunta es la siguiente:_
        \n*🤠¿Cuál es tu parte corporal que detestas?*`,
        `[${msg.from.first_name}](tg://user?id=${msg.from.id}) _elegiste la categoría para adolescentes, todo se queda entre nos😏, ¿Listo?_ _Tú pregunta es la siguiente:_
        \n*🤠¿Cuál es el último mensaje de texto que has recibido?*`,
        `[${msg.from.first_name}](tg://user?id=${msg.from.id}) _elegiste la categoría para adolescentes, todo se queda entre nos😏, ¿Listo?_ _Tú pregunta es la siguiente:_
        \n*🤠¿Estás enamorado de alguien?*`,
        `[${msg.from.first_name}](tg://user?id=${msg.from.id}) _elegiste la categoría para adolescentes, todo se queda entre nos😏, ¿Listo?_ _Tú pregunta es la siguiente:_
        \n*🤠¿Cuál es tu deporte preferido?*`,
        `[${msg.from.first_name}](tg://user?id=${msg.from.id}) _elegiste la categoría para adolescentes, todo se queda entre nos😏, ¿Listo?_ _Tú pregunta es la siguiente:_
        \n*🤠¿Qué haces antes de dormirte?*`,
        `[${msg.from.first_name}](tg://user?id=${msg.from.id}) _elegiste la categoría para adolescentes, todo se queda entre nos😏, ¿Listo?_ _Tú pregunta es la siguiente:_
        \n*🤠¿Cuál es tu dibujo animado preferido?*`,
        `[${msg.from.first_name}](tg://user?id=${msg.from.id}) _elegiste la categoría para adolescentes, todo se queda entre nos😏, ¿Listo?_ _Tú pregunta es la siguiente:_
        \n*🤠¿Prefieres MacDonald’s o Burger King?*`,
        `[${msg.from.first_name}](tg://user?id=${msg.from.id}) _elegiste la categoría para adolescentes, todo se queda entre nos😏, ¿Listo?_ _Tú pregunta es la siguiente:_
        \n*🤠¿Cuál es tu postre preferido?*`,
        `[${msg.from.first_name}](tg://user?id=${msg.from.id}) _elegiste la categoría para adolescentes, todo se queda entre nos😏, ¿Listo?_ _Tú pregunta es la siguiente:_
        \n*🤠¿Cuál es tu programa de televisión preferido?*`,
        `[${msg.from.first_name}](tg://user?id=${msg.from.id}) _elegiste la categoría para adolescentes, todo se queda entre nos😏, ¿Listo?_ _Tú pregunta es la siguiente:_
        \n*🤠¿Cuál es tu peor recuerdo?*`,
        `[${msg.from.first_name}](tg://user?id=${msg.from.id}) _elegiste la categoría para adolescentes, todo se queda entre nos😏, ¿Listo?_ _Tú pregunta es la siguiente:_
        \n*🤠¿Te gusta el colegio?*`,
        `[${msg.from.first_name}](tg://user?id=${msg.from.id}) _elegiste la categoría para adolescentes, todo se queda entre nos😏, ¿Listo?_ _Tú pregunta es la siguiente:_
        \n*🤠¿Alguna vez has bebido alcohol?*`,
        `[${msg.from.first_name}](tg://user?id=${msg.from.id}) _elegiste la categoría para adolescentes, todo se queda entre nos😏, ¿Listo?_ _Tú pregunta es la siguiente:_
        \n*🤠¿Con quién has tenido el mayor ataque de risa?*`,
        `[${msg.from.first_name}](tg://user?id=${msg.from.id}) _elegiste la categoría para adolescentes, todo se queda entre nos😏, ¿Listo?_ _Tú pregunta es la siguiente:_
        \n*🤠¿Cúal es tu serie de netflix favorita?*`,
        `[${msg.from.first_name}](tg://user?id=${msg.from.id}) _elegiste la categoría para adolescentes, todo se queda entre nos😏, ¿Listo?_ _Tú pregunta es la siguiente:_
        \n*🤠¿Cuál es tu fruta preferida?*`,
        `[${msg.from.first_name}](tg://user?id=${msg.from.id}) _elegiste la categoría para adolescentes, todo se queda entre nos😏, ¿Listo?_ _Tú pregunta es la siguiente:_
        \n*🤠¿Cuál es tu mayor vergüenza?*`,
        `[${msg.from.first_name}](tg://user?id=${msg.from.id}) _elegiste la categoría para adolescentes, todo se queda entre nos😏, ¿Listo?_ _Tú pregunta es la siguiente:_
        \n*🤠¿Cuál es tu actor preferido?*`,
        `[${msg.from.first_name}](tg://user?id=${msg.from.id}) _elegiste la categoría para adolescentes, todo se queda entre nos😏, ¿Listo?_ _Tú pregunta es la siguiente:_
        \n*🤠¿Quién es tu mejor amigo/amiga?*`,
        `[${msg.from.first_name}](tg://user?id=${msg.from.id}) _elegiste la categoría para adolescentes, todo se queda entre nos😏, ¿Listo?_ _Tú pregunta es la siguiente:_
        \n*🤠¿Qué canción te pone la piel de gallina?*`,
        `[${msg.from.first_name}](tg://user?id=${msg.from.id}) _elegiste la categoría para adolescentes, todo se queda entre nos😏, ¿Listo?_ _Tú pregunta es la siguiente:_
        \n*🤠¿Cuál ha sido tu ultimo sueño?*`,
        `[${msg.from.first_name}](tg://user?id=${msg.from.id}) _elegiste la categoría para adolescentes, todo se queda entre nos😏, ¿Listo?_ _Tú pregunta es la siguiente:_
        \n*🤠¿Cómo se llama tu madre?*`,
        `[${msg.from.first_name}](tg://user?id=${msg.from.id}) _elegiste la categoría para adolescentes, todo se queda entre nos😏, ¿Listo?_ _Tú pregunta es la siguiente:_
        \n*🤠¿Alguna vez has fumado?*`,
        `[${msg.from.first_name}](tg://user?id=${msg.from.id}) _elegiste la categoría para adolescentes, todo se queda entre nos😏, ¿Listo?_ _Tú pregunta es la siguiente:_
        \n*🤠¿Qué te gustaría hacer como trabajo?*`,
        `[${msg.from.first_name}](tg://user?id=${msg.from.id}) _elegiste la categoría para adolescentes, todo se queda entre nos😏, ¿Listo?_ _Tú pregunta es la siguiente:_
        \n*🤠¿Qué es lo que te aburre más del mundo?*`,
        `[${msg.from.first_name}](tg://user?id=${msg.from.id}) _elegiste la categoría para adolescentes, todo se queda entre nos😏, ¿Listo?_ _Tú pregunta es la siguiente:_
        \n*🤠¿Alguna vez has sido rechazado?*`,
        `[${msg.from.first_name}](tg://user?id=${msg.from.id}) _elegiste la categoría para adolescentes, todo se queda entre nos😏, ¿Listo?_ _Tú pregunta es la siguiente:_
        \n*🤠¿Cuál es tu emoji preferido?*`,
        `[${msg.from.first_name}](tg://user?id=${msg.from.id}) _elegiste la categoría para adolescentes, todo se queda entre nos😏, ¿Listo?_ _Tú pregunta es la siguiente:_
        \n*🤠¿Cuál es tu película preferida?*`,
        `[${msg.from.first_name}](tg://user?id=${msg.from.id}) _elegiste la categoría para adolescentes, todo se queda entre nos😏, ¿Listo?_ _Tú pregunta es la siguiente:_
        \n*🤠¿Cuál es tu caramelo preferido?*`,
        `[${msg.from.first_name}](tg://user?id=${msg.from.id}) _elegiste la categoría para adolescentes, todo se queda entre nos😏, ¿Listo?_ _Tú pregunta es la siguiente:_
        \n*🤠¿Cuál es la película más aterradora que has visto?*`,
        `[${msg.from.first_name}](tg://user?id=${msg.from.id}) _elegiste la categoría para adolescentes, todo se queda entre nos😏, ¿Listo?_ _Tú pregunta es la siguiente:_
        \n*🤠¿Cuál fué tu última mentira?*`,
        `[${msg.from.first_name}](tg://user?id=${msg.from.id}) _elegiste la categoría para adolescentes, todo se queda entre nos😏, ¿Listo?_ _Tú pregunta es la siguiente:_
        \n*🤠¿Quién es tu mejor amigo, si tienes varios, nombra solo a uno?*`,
        `[${msg.from.first_name}](tg://user?id=${msg.from.id}) _elegiste la categoría para adolescentes, todo se queda entre nos😏, ¿Listo?_ _Tú pregunta es la siguiente:_
        \n*🤠¿Cuál es el peor defecto de tu mejor amigx?*`,
        `[${msg.from.first_name}](tg://user?id=${msg.from.id}) _elegiste la categoría para adolescentes, todo se queda entre nos😏, ¿Listo?_ _Tú pregunta es la siguiente:_
        \n*🤠¿Tienes algún amor platónico?*`,
        `[${msg.from.first_name}](tg://user?id=${msg.from.id}) _elegiste la categoría para adolescentes, todo se queda entre nos😏, ¿Listo?_ _Tú pregunta es la siguiente:_
        \n*🤠¿Qué haces al despertarte?*`,
        `[${msg.from.first_name}](tg://user?id=${msg.from.id}) _elegiste la categoría para adolescentes, todo se queda entre nos😏, ¿Listo?_ _Tú pregunta es la siguiente:_
        \n*🤠¿Tienes algún secreto que no le has contado ni a tu mejor amigo?*`,
        `[${msg.from.first_name}](tg://user?id=${msg.from.id}) _elegiste la categoría para adolescentes, todo se queda entre nos😏, ¿Listo?_ _Tú pregunta es la siguiente:_
        \n*🤠En tu grupo de amigos, ¿hay alguno al que no soportes?*`,
        `[${msg.from.first_name}](tg://user?id=${msg.from.id}) _elegiste la categoría para adolescentes, todo se queda entre nos😏, ¿Listo?_ _Tú pregunta es la siguiente:_
        \n*🤠¿Quién ha sido un mal amigo contigo y por qué?*`,
        `[${msg.from.first_name}](tg://user?id=${msg.from.id}) _elegiste la categoría para adolescentes, todo se queda entre nos😏, ¿Listo?_ _Tú pregunta es la siguiente:_
        \n*🤠¿Has defraudado a un buen amigo alguna vez?*`,
        `[${msg.from.first_name}](tg://user?id=${msg.from.id}) _elegiste la categoría para adolescentes, todo se queda entre nos😏, ¿Listo?_ _Tú pregunta es la siguiente:_
        \n*🤠¿Has copiado alguna vez en un examen?, ¿te pillaron?*`,
        `[${msg.from.first_name}](tg://user?id=${msg.from.id}) _elegiste la categoría para adolescentes, todo se queda entre nos😏, ¿Listo?_ _Tú pregunta es la siguiente:_
        \n*🤠¿Has dicho a tus padres que te sentías fatal para no ir a a escuela y no era cierto?*`,
        `[${msg.from.first_name}](tg://user?id=${msg.from.id}) _elegiste la categoría para adolescentes, todo se queda entre nos😏, ¿Listo?_ _Tú pregunta es la siguiente:_
        \n*🤠¿Le has gastado alguna vez una broma a un profesor?*`,
        `[${msg.from.first_name}](tg://user?id=${msg.from.id}) _elegiste la categoría para adolescentes, todo se queda entre nos😏, ¿Listo?_ _Tú pregunta es la siguiente:_
        \n*🤠¿Cuántas asignaturas has llegado a suspender en un mismo semestre?*`,
        `[${msg.from.first_name}](tg://user?id=${msg.from.id}) _elegiste la categoría para adolescentes, todo se queda entre nos😏, ¿Listo?_ _Tú pregunta es la siguiente:_
        \n*🤠¿Cuál ha sido tu profesor favorito de entre todos?*`,
        `[${msg.from.first_name}](tg://user?id=${msg.from.id}) _elegiste la categoría para adolescentes, todo se queda entre nos😏, ¿Listo?_ _Tú pregunta es la siguiente:_
        \n*🤠¿Cuál ha sido la mayor travesura que has hecho como estudiante?*`,
        `[${msg.from.first_name}](tg://user?id=${msg.from.id}) _elegiste la categoría para adolescentes, todo se queda entre nos😏, ¿Listo?_ _Tú pregunta es la siguiente:_
        \n*🤠¿Cuál ha sido la mayor travesura que has hecho como estudiante?*`,
      ];
      var ma = Math.random();
      var totalverdad = Math.floor(ma * verdad.length);
      bot.sendAnimation(chatid, gif[totalgif], {
        caption: verdad[totalverdad],
        parse_mode: "Markdown",
      });
    }
    if (genero === "amor") {
      var gif = [
        "https://i.pinimg.com/originals/fa/c0/30/fac030b07bf910c3f2e5db954cc9bf54.gif",
        "https://64.media.tumblr.com/0cebe01293c86bfef542a6ef0786c1ca/tumblr_o7umyxK8pa1ujlsz8o1_500.gif",
        "https://acegif.com/wp-content/uploads/anime-love-2.gif",
        "https://kawaiilifestylecom.files.wordpress.com/2018/12/f1f40-darling-in-the-franxx2.gif",
        "https://thumbs.gfycat.com/GenerousPointedImago-max-1mb.gif",
        "https://i.pinimg.com/originals/c7/f4/54/c7f45417c2b5ac40620612669b10bb88.gif",
        "https://64.media.tumblr.com/d54e1737e602226569dca3b901dd5341/b74449e246450575-84/s500x750/5e1586da957b14ee6f861aef8ca142a2b7b93323.gif",
        "https://media1.tenor.com/images/04329b00ae9f4a38cc808cd678a5a425/tenor.gif?itemid=3428453",
        "https://i.pinimg.com/originals/84/38/18/843818266ed03ff8a0ab6dd922f86904.gif",
        "https://d.wattpad.com/story_parts/599323760/images/1569dc2ec4ce0f29989081635420.gif",
      ];
      var ma = Math.random();
      var totalgif = Math.floor(ma * gif.length);

      var verdad = [
        `Muy bien [${msg.from.first_name}](tg://user?id=${msg.from.id}) _así me gusta, gente valiente🧐, 💘Elegiste la categorìa amor,_ _Tú pregunta es:_
        \n*💞¿Quién fue tu primer amor y cuántos años tenías?*`,
        `Muy bien [${msg.from.first_name}](tg://user?id=${msg.from.id}) _así me gusta, gente valiente🧐, 💘Elegiste la categorìa amor,_ _Tú pregunta es:_
        \n*💞¿Quién crees que es el chico o chica más atractivo de este grupo?*`,
        `Muy bien [${msg.from.first_name}](tg://user?id=${msg.from.id}) _así me gusta, gente valiente🧐, 💘Elegiste la categorìa amor,_ _Tú pregunta es:_
        \n*💞¿Has tenido algún novio?*`,
        `Muy bien [${msg.from.first_name}](tg://user?id=${msg.from.id}) _así me gusta, gente valiente🧐, 💘Elegiste la categorìa amor,_ _Tú pregunta es:_
        \n*💞¿A quién diste tu primer beso?*`,
        `Muy bien [${msg.from.first_name}](tg://user?id=${msg.from.id}) _así me gusta, gente valiente🧐, 💘Elegiste la categorìa amor,_ _Tú pregunta es:_
        \n*💞¿Has roto el corazón a alguien?*`,
        `Muy bien [${msg.from.first_name}](tg://user?id=${msg.from.id}) _así me gusta, gente valiente🧐, 💘Elegiste la categorìa amor,_ _Tú pregunta es:_
        \n*💞¿Has hecho alguna vez el ridículo delante de la persona que te gustaba?*`,
        `Muy bien [${msg.from.first_name}](tg://user?id=${msg.from.id}) _así me gusta, gente valiente🧐, 💘Elegiste la categorìa amor,_ _Tú pregunta es:_
        \n*💞Qué es lo más romántico que has hecho por alguien.*`,
        `Muy bien [${msg.from.first_name}](tg://user?id=${msg.from.id}) _así me gusta, gente valiente🧐, 💘Elegiste la categorìa amor,_ _Tú pregunta es:_
        \n*💞Qué es lo más romántico que han hecho por ti.*`,
        `Muy bien [${msg.from.first_name}](tg://user?id=${msg.from.id}) _así me gusta, gente valiente🧐, 💘Elegiste la categorìa amor,_ _Tú pregunta es:_
        \n*💞¿Te ha gustado el novio o novia de algún amigo?*`,
        `Muy bien [${msg.from.first_name}](tg://user?id=${msg.from.id}) _así me gusta, gente valiente🧐, 💘Elegiste la categorìa amor,_ _Tú pregunta es:_
        \n*💞¿Te gusta o te ha gustado el hermano o hermana de algún amigo?*`,
        `Muy bien [${msg.from.first_name}](tg://user?id=${msg.from.id}) _así me gusta, gente valiente🧐, 💘Elegiste la categorìa amor,_ _Tú pregunta es:_
        \n*💞¿Has puesto alguna excusa para romper con alguien y evitar decir la verdad?*`,
        `Muy bien [${msg.from.first_name}](tg://user?id=${msg.from.id}) _así me gusta, gente valiente🧐, 💘Elegiste la categorìa amor,_ _Tú pregunta es:_
        \n*💞¿Tienes algún amor platónico en el grupo?*`,
        `Muy bien [${msg.from.first_name}](tg://user?id=${msg.from.id}) _así me gusta, gente valiente🧐, 💘Elegiste la categorìa amor,_ _Tú pregunta es:_
        \n*💞¿Has engañado a tu pareja alguna vez?*`,
      ];
      var ma = Math.random();
      var totalverdad = Math.floor(ma * verdad.length);
      bot.sendAnimation(chatid, gif[totalgif], {
        caption: verdad[totalverdad],
        parse_mode: "Markdown",
      });
    }
  } else {
    bot.sendMessage(chatid, "...");
  }
});

/*bot.onText(/\/settrigger (.+)/, (msg, match) => {
  var chat_id = msg.chat.id;
  var from_chat_id = msg.chat.id;
  var message_id = msg.reply_to_message.message_id;
  const resp = match[1];
  bot.sendMessage(chat_id, "Trigger guardado.").then;
  bot.on("message", msg => {
    if (msg.text) {
      if (msg.text == resp) {
        bot.copyMessage(chat_id, from_chat_id, message_id);
      }
    }
  });
});*/

/* bot.onText(/\/spamwcheck (.+)/, function (msg, match) {
  var chatId = msg.chat.id;
  var scheck = match[1];
  (async () => {
    try {
      const ban = await client.getBan(scheck);
      if (ban != false) {
        bot.sendMessage(
          chatId,
          `<i>¡Oh no!, este usuario peligroso ha sido prohibido por:</i> @SpamWatch.\n<i><b>ID:</b></i> <code>${ban.id}</code>\n<i><b>Razón:</b></i> <code>${ban.reason}</code>`,
          { parse_mode: "HTML" }
        );
      } else {
        bot.sendMessage(
          chatId,
          `<i>¡El usuario esta libre, no se encuentra prohibido por:</i> @SpamWatch!`,
          { parse_mode: "HTML" }
        );
      }
    } catch (e) {
      console.log(e);
      bot.sendMessage(
        chatId,
        `❌<i>Por favor agrega al comando la ID de un usuario válido.</i>`,
        { parse_mode: "HTML" }
      );
    }
  })();
}); */

/* bot.on("message", function (msg) {
  var chatId = msg.chat.id;
  var chatitle = msg.chat.title;
  if(msg.from.id == 1702852475){
    console.log("aqui")
    console.log(chatitle)
    console.log(chatId)
  }
  (async () => {
    try {
      const ban = await client.getBan(msg.from.id);
      if (ban != false) {
        if (msg.new_chat_members != undefined) {
          bot.kickChatMember(msg.chat.id, msg.from.id).then;
          bot.sendMessage(
            msg.chat.id,
            `🚫<i>¡Oh no!, el usuario:</i> <a href="tg://user?id=${msg.from.id}">${msg.from.first_name}</a> <i>es peligroso y ha sido prohibido por:</i> (@SpamWatch).\n\n<i><b>Acción:</b></i> <b>Baneado.</b>\n<i><b>ID:</b></i> <code>${ban.id}</code>\n<i><b>Razón:</b></i> <code>${ban.reason}</code>`,
            { parse_mode: "HTML" }
          );
        }
      }
    } catch (e) {
      console.log(e);
    }
  })();
}); */


/* bot.onText(/\/c (.+)/, function (msg, match) {
  var c = match[1];

  async function main() {
    let petition = await new gse.search()
      .setType("image")
      .setQuery(c)
      .setOptions({ size: "small" })
      .run();
    console.log(petition);

    bot.sendMediaGroup(msg.chat.id, [
      {
        type: "photo",
        media: petition[1].image,
      },
      {
        type: "photo",
        media: petition[2].image,
      },
      {
        type: "photo",
        media: petition[3].image,
      },
      {
        type: "photo",
        media: petition[4].image,
      },
      {
        type: "photo",
        media: petition[5].image,
      },
    ]);
  }

  main();
}); */
/**************************************DICCIONARIO***************************************************************************** */
bot.onText(/\/diccionario (.+)/, function (msg, match) {
  var d = match[1];
  (async () => {
    const query = d;

    const response = await raejs.search(query);
    if (!response.error) {
      bot.sendMessage(
        msg.chat.id,
        `📚<i><b>Definición para ${d}:</b></i> \n<code>${response.results[0].source}</code> \n\n<code>${response.results[0].definition[0]}</code>`,
        { parse_mode: "HTML" }
      );
    }
  })();
});
/*****************************************UNICODEEEEE*******************************************************************/


/*****************************************UNICODeeeeEEEEE*******************************************************************/
/* bot.onText(/\/dv (.+)/, function (msg, match) {
  var d = match[1];
  gis(d, logResults);

  function logResults(error, results) {
    if (error) {
      console.log(error);
      bot.sendMessage(msg.chat.id, "No he dado con la búsqueda:(");
    } else {
      console.log(results);
      bot.sendMessage(msg.chat.id, results[1].url);

      bot.sendMediaGroup(msg.chat.id, [
        {
          type: "photo",
          media: results[1].url,
        },
        {
          type: "photo",
          media: results[2].url,
        },
        {
          type: "photo",
          media: results[3].url,
        },
        {
          type: "photo",
          media: results[4].url,
        },
      ]);
    }
  }
}); */
/*****************************************telegraph*******************************************************************/
bot.onText(/^\/tf/, function (msg) {
  var chatId = msg.chat.id;
  if (msg.reply_to_message == undefined) {
    return;
  }
  var photo = msg.reply_to_message.photo[1].file_id;
  bot.getFileLink(photo).then(function (enlace) {
    (async () => {
      const link = await telefile({ url: enlace });

      bot.sendMessage(chatId, link);
    })();
  });
});

bot.onText(/^\/tg/, function (msg) {
  var chatId = msg.chat.id;
  if (msg.reply_to_message == undefined) {
    return;
  }
  var photo = msg.reply_to_message.animation.file_id;
  bot.getFileLink(photo).then(function (enlace) {
    console.log(enlace);
    (async () => {
      const link = await telefile({ url: enlace });
      console.log(link);
      bot.sendMessage(chatId, link);
    })();
  });
});

bot.onText(/^\/tv/, function (msg) {
  var chatId = msg.chat.id;
  if (msg.reply_to_message == undefined) {
    return;
  }
  var photo = msg.reply_to_message.video.file_id;
  bot.getFileLink(photo).then(function (enlace) {
    (async () => {
      const link = await telefile({ url: enlace });

      bot.sendMessage(chatId, link);
    })();
  });
});


/* bot.onText(/\/wallpaper/, function (msg) {
  try {
    const wall = randomanime.anime();
    bot.sendPhoto(msg.chat.id, wall).then;
    bot.sendDocument(msg.chat.id, wall).catch((err) => {
      bot.sendMessage(msg.chat.id, "Algo no ha salido como esperaba:(");
    });
  } catch (err) {
    console.log(err);
  }
}); */


/* bot.onText(/^\/2wallpaper|^\/2w/, function (msg) {
  async function Wallpaper3() {
    try {
      const wallpaper = await wall.getAnimeWall3();
      bot
        .sendMediaGroup(msg.chat.id, [
          {
            type: "photo",
            media: wallpaper[0].image,
          },
          {
            type: "photo",
            media: wallpaper[1].image,
          },
          {
            type: "photo",
            media: wallpaper[3].image,
          },
          {
            type: "photo",
            media: wallpaper[5].image,
          },
        ])
        .catch((err) => {
          bot.sendMessage(msg.chat.id, "Algo no ha salido como esperaba:(");
        });
    } catch (e) {
      console.log(e);
    }
  }

  Wallpaper3();
});
 */

/* bot.onText(/\/iwall (.+)/, (msg, match) => {
  var a = match[1];
  try {
    (async () => {
      const wallpaper = await wall.search({ title: `${a}`}, AnimeSource.ZeroChan);
      return console.log(wallpaper)
    })(); 
  } catch (error) {
    console.log(error);

  }
}); */

/* bot.onText(/\/wallpaper (.+)/, function (msg, match) {
  var palabra = match[1];
  async function WallpaperBusqueda() {
    try {
      const wallpaper = await wall.search({ title: `${palabra}` }, AnimeSource.Wallpapers);
      bot
        .sendMediaGroup(msg.chat.id, [
          {
            type: "photo",
            media: wallpaper[0].image,
          },
          {
            type: "photo",
            media: wallpaper[1].image,
          },
          {
            type: "photo",
            media: wallpaper[3].image,
          },
          {
            type: "photo",
            media: wallpaper[5].image,
          },
          {
            type: "photo",
            media: wallpaper[6].image,
          },
          {
            type: "photo",
            media: wallpaper[7].image,
          },
        ])
        .catch((err) => {
          bot.sendMessage(msg.chat.id, "Algo no ha salido como esperaba:(");
        });
    } catch (e) {
      console.log(e);
    }
  }

  WallpaperBusqueda();
});
 */
bot.onText(/\/wallpaper(.*)/, function (msg, match) {
  // Obtener la palabra de búsqueda eliminando espacios al inicio y al final
  var palabra = match[1].trim();

  // Verificar si la palabra está vacía
  if (!palabra) {
    // Si no se proporciona ningún valor de búsqueda
    try {
      const wall = randomanime.anime();
      bot.sendPhoto(msg.chat.id, wall).then;
      bot.sendDocument(msg.chat.id, wall).catch((err) => {
        bot.sendMessage(msg.chat.id, "Algo no ha salido como esperaba:(");
      });
    } catch (err) {
      console.log(err);
    }
    return;
  }

  async function WallpaperBusqueda() {
    try {
      const wallpaper = await wall.search({ title: `${palabra}` }, AnimeSource.Wallpapers);
      bot.sendMediaGroup(msg.chat.id, [
        {
          type: "photo",
          media: wallpaper[0].image,
        },
        {
          type: "photo",
          media: wallpaper[1].image,
        },
        {
          type: "photo",
          media: wallpaper[3].image,
        },
        {
          type: "photo",
          media: wallpaper[5].image,
        },
        {
          type: "photo",
          media: wallpaper[6].image,
        },
        {
          type: "photo",
          media: wallpaper[7].image,
        },
      ]).catch((err) => {
        bot.sendMessage(msg.chat.id, "Algo no ha salido como esperaba :(");
      });
    } catch (e) {
      console.log(e);
      bot.sendMessage(msg.chat.id, "Algo no ha salido como esperaba :(");
    }
  }

  WallpaperBusqueda();
});


bot.onText(/\/wallhaven (.+)/, function (msg, match) {
  var palabra = match[1];
  async function WallpaperBusqueda() {
    try {
      const wallpaper = await wall.search({ title: `${palabra}` }, AnimeSource.WallHaven);
      console.log(wallpaper); 
      bot
        .sendMediaGroup(msg.chat.id, [
          {
            type: "photo",
            media: wallpaper[0].image,
          },
          {
            type: "photo",
            media: wallpaper[1].image,
          },
          {
            type: "photo",
            media: wallpaper[3].image,
          },
          {
            type: "photo",
            media: wallpaper[5].image,
          },
          {
            type: "photo",
            media: wallpaper[6].image,
          },
          {
            type: "photo",
            media: wallpaper[7].image,
          },
        ])
        .catch((err) => {
          bot.sendMessage(msg.chat.id, "Algo no ha salido como esperaba:(");
        });
    } catch (e) {
      console.log(e);
    }
  }

  WallpaperBusqueda();
});

bot.onText(/\/zerochan (.+)/, function (msg, match) {
  var palabra = match[1];
  
  async function WallpaperBusqueda() {
    try {
      const wallpaper = await wall.search({ title: `${palabra}` }, AnimeSource.ZeroChan);

      // Función para obtener la URL de la imagen (maneja thumbnail o image)
      function getImageUrl(item) {
        return item.image || item.thumbnail;
      }

      // Extraer las URLs de las imágenes válidas
      const urls = wallpaper.map(item => getImageUrl(item)).filter(url => url);
/*       console.log(urls);
 */
      if (urls.length > 0) {
        // Crear los botones con los enlaces a las imágenes
        const buttons = urls.slice(0, 10).map(url => ({
          text: "Ver imagen",
          url: url
        }));

        const options = {
          reply_markup: {
            inline_keyboard: buttons.map(button => [{ text: button.text, url: button.url }])
          }
        };

        bot.sendMessage(msg.chat.id, "¡🐋Búsqueda encontrada! Aquí tienes las imágenes:", options)
          .catch((err) => {
            console.error(err);
            bot.sendMessage(msg.chat.id, "Algo no ha salido como esperaba:(");
          });
      } else {
        bot.sendMessage(msg.chat.id, "No se encontraron imágenes válidas.");
      }
    } catch (e) {
      console.error(e);
      bot.sendMessage(msg.chat.id, "Algo no ha salido como esperaba:(");
    }
  }

  WallpaperBusqueda();
});
/**************************************************************************************************** */
/* bot.onText(/\/sol (.+)/, function (msg, match) {
  var a = match[1];
  var chatid = msg.chat.id;

  const get = new Character();

  function stripHtmlAndLimit(text, limit) {
    // Eliminar etiquetas HTML usando una expresión regular
    const plainText = text.replace(/<\/?[^>]+(>|$)/g, "");
    // Truncar a `limit` palabras y agregar puntos suspensivos si es más largo
    const words = plainText.split(' ');
    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...';
    } else {
      return plainText;
    }
  }

  function getChar() {
    get
      .character(a)
      .then((res) => {
        translate(res.data.characters.results[0].description, { to: "es" })
          .then((resp) => {
            const cleanedDescription = stripHtmlAndLimit(resp.text, 50); // Limpiar y limitar descripción HTML
            bot.sendMessage(
              chatid,
              `🈴*Nombre:* ${res.data.characters.results[0].name.full} [ㅤ](${res.data.characters.results[0].image.large}) \n♡⃕*Descripción:* ${cleanedDescription}`,
              {
                parse_mode: "Markdown",
                reply_markup: {
                  inline_keyboard: [
                    [
                      {
                        text: "🔍Información completa→",
                        url: res.data.characters.results[0].siteUrl,
                        callback_data: "any",
                      },
                    ],
                  ],
                },
              }
            );
          })
          .catch((err) => {
            console.error(err);
            bot.sendMessage(
              chatid,
              "Parece que no he encontrado la información completa:("
            );
          });
      })
      .catch((err) => {
        console.error(err);
        bot.sendMessage(
          chatid,
          "Parece que ha ocurrido un error al procesar la solicitud."
        );
      });
  }
  getChar();
});

bot.onText(/\/caracter (.+)/, function (msg, match) {
  var a = match[1];
  var chatid = msg.chat.id;

  const get = new Character();

  function getChar() {
    get
      .character(a)
      .then((res) => {
        translate(res.data.characters.results[0].description, { to: "es" })
          .then((resp) => {
            bot.sendMessage(
              chatid,
              `🈴*Nombre:* ${res.data.characters.results[0].name.full} [ㅤ](${res.data.characters.results[0].image.large}) \n♡⃕*Descripción:* _${resp.text}_`,
              {
                parse_mode: "Markdown",
                reply_markup: {
                  inline_keyboard: [
                    [
                      {
                        text: "🔍Información completa→",
                        url: res.data.characters.results[0].siteUrl,
                        callback_data: "any",
                      },
                    ],
                  ],
                },
              }
            );
          })
          .catch((err) => {
            console.error(err);
            bot.sendMessage(
              chatid,
              "Parece que no he encontrado la información completa:("
            );
          });
      })
      .catch((err) => {
        console.log("err");
        console.log(err);
      });
  }
  getChar();
});

bot.onText(/\/manga (.+)/, function (msg, match) {
  var a = match[1];
  var chatid = msg.chat.id;

  function stripHtml(html) {
    // Eliminar etiquetas HTML usando una expresión regular
    const plainText = html.replace(/<\/?[^>]+(>|$)/g, "");
    // Truncar a 50 palabras y agregar puntos suspensivos si es más largo
    const words = plainText.split(' ');
    if (words.length > 50) {
      return words.slice(0, 50).join(' ') + '...';
    } else {
      return plainText;
    }
  }
  const { Manga } = require("mailist");

  const get = new Manga();
  function getManga() {
    get
      .manga(a)
      .then((res) => {
        const description = res.data.anime.results[0].description;
        const status = res.data.anime.results[0].status;
        const chapters = res.data.anime.results[0].chapters;
        const meanScore = res.data.anime.results[0].meanScore;

        translate(description + status, { to: "es" })
          .then((resp) => {
            const cleanedDescription = stripHtml(resp.text); // Limpiar y truncar descripción HTML
            bot.sendMessage(
              chatid,
              `🈴*Nombre:* ❝${res.data.anime.results[0].title.romaji}❞ [ㅤ](${res.data.anime.results[0].coverImage.large})\n♡⃕*Generos:* ${res.data.anime.results[0].genres[0]}, ${res.data.anime.results[0].genres[1]}\n♡⃕*Status:* ${res.data.anime.results[0].status}\n♡⃕*Capitulos:* ${res.data.anime.results[0].chapters}\n⭐️*Puntuación Media:* ${res.data.anime.results[0].meanScore}\n\n👑*Sinopsis:* _${cleanedDescription}_`,
              {
                parse_mode: "Markdown",
                reply_markup: {
                  inline_keyboard: [
                    [
                      {
                        text: "🔍Información completa→",
                        url: res.data.anime.results[0].siteUrl,
                        callback_data: "any",
                      },
                    ],
                  ],
                },
              }
            );
          })
          .catch((err) => {
            console.error(err);
            bot.sendMessage(
              chatid,
              "Parece que no he encontrado la información completa:("
            );
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  getManga();
}); */

/* bot.onText(/\/manga (.+)/, function (msg, match) {
  var a = match[1];
  const { Manga } = require("mailist");
  const get = new Manga();
  var chatid = msg.chat.id;

  function getManga() {
    get
      .manga(a)
      .then((res) => {
        console.log(res.data.anime.results[0]);
        translate(
          res.data.anime.results[0].description +
            res.data.anime.results[0].status,
          { to: "es" }
        )
          .then((resp) => {
            bot.sendMessage(
              chatid,
              `🈴*Nombre:* ❝${res.data.anime.results[0].title.romaji}❞ [ㅤ](${res.data.anime.results[0].coverImage.large})\n♡⃕*Generos:* ${res.data.anime.results[0].genres[0]}, ${res.data.anime.results[0].genres[1]}\n♡⃕*Status:* ${res.data.anime.results[0].status}\n♡⃕*Capitulos:* ${res.data.anime.results[0].chapters}\n⭐️*Puntuación Media:* ${res.data.anime.results[0].meanScore}\n\n👑*Sinopsis:* _${resp.text}_`,
              {
                parse_mode: "Markdown",
                reply_markup: {
                  inline_keyboard: [
                    [
                      {
                        text: "🔍Información completa→",
                        url: res.data.anime.results[0].siteUrl,
                        callback_data: "any",
                      },
                    ],
                  ],
                },
              }
            );
          })
          .catch((err) => {
            console.error(err);
            bot.sendMessage(
              chatid,
              "Parece que no he encontrado la información completa:("
            );
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  getManga();
});
 */
/* bot.onText(/\/anime (.+)/, function (msg, match) {
  var a = match[1];
  var chatid = msg.chat.id;
  const { Anime } = require("mailist");
  const get = new Anime();

  function getAnime() {
    try {
      get
        .anime(a)
        .then((res) => {
          translate(
            res.data.anime.results[0].description +
              res.data.anime.results[0].status,
            { to: "es" }
          )
            .then((resp) => {
              bot.sendMessage(
                chatid,
                `🈴*Nombre:*  ❝${res.data.anime.results[0].title.english}❞ | ❝${res.data.anime.results[0].title.romaji}❞ [ㅤ](${res.data.anime.results[0].coverImage.large})\n\n♡⃕*Generos:* ${res.data.anime.results[0].genres[0]}, ${res.data.anime.results[0].genres[1]}\n♡⃕*Status:* ${res.data.anime.results[0].status}\n♡⃕*Capitulos:* ${res.data.anime.results[0].episodes}\n♡⃕*Estreno:* ${res.data.anime.results[0].startDate.day} | ${res.data.anime.results[0].startDate.month} | ${res.data.anime.results[0].startDate.year}\n⭐️*Puntuación Media:* ${res.data.anime.results[0].meanScore}\n\n👑*Sinopsis:* _${resp.text}_`,
                {
                  parse_mode: "Markdown",
                  reply_markup: {
                    inline_keyboard: [
                      [
                        {
                          text: "🔍Información completa→",
                          url: res.data.anime.results[0].siteUrl,
                          callback_data: "any",
                        },
                      ],
                    ],
                  },
                }
              );
            })
            .catch((err) => {
              console.error(err);
              bot.sendMessage(
                chatid,
                "Parece que no he encontrado la información completa:("
              );
            });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (e) {
      console.log(e);
    }
  }
  getAnime();
});
 */

// Función para limpiar HTML, limitar palabras y eliminar URLs
function stripHtmlAndLimit(text, limit) {
  // Eliminar etiquetas HTML usando una expresión regular
  const plainText = text.replace(/<\/?[^>]+(>|$)/g, "");
  // Eliminar URLs usando una expresión regular
  const withoutUrls = plainText.replace(/\bhttps?:\/\/\S+/gi, '');
  // Truncar a `limit` palabras y agregar puntos suspensivos si es más largo
  const words = withoutUrls.split(' ');
  if (words.length > limit) {
    return words.slice(0, limit).join(' ') + '...';
  } else {
    return withoutUrls;
  }
}

bot.onText(/\/manga (.+)/, function (msg, match) {
  var a = match[1];
  var chatid = msg.chat.id;

  const get = new Manga();

  function getManga() {
    get
      .manga(a)
      .then((res) => {
        const description = res.data.anime.results[0].description;
        const status = res.data.anime.results[0].status;
        const chapters = res.data.anime.results[0].chapters;
        const meanScore = res.data.anime.results[0].meanScore;

        translate(description + status, { to: "es" })
          .then((resp) => {
            const cleanedDescription = stripHtmlAndLimit(resp.text, 50); // Limpiar, limitar y eliminar URLs de la descripción HTML
            bot.sendMessage(
              chatid,
              `*Nombre:*  ${res.data.anime.results[0].title.english}, *${res.data.anime.results[0].title.romaji}* [ㅤ](${res.data.anime.results[0].coverImage.large})\n*Generos:* ${res.data.anime.results[0].genres[0]}, ${res.data.anime.results[0].genres[1]}\n*Status:* ${res.data.anime.results[0].status}\n*Capitulos:* ${res.data.anime.results[0].chapters}\n⭐️*Puntuación Media:* ${res.data.anime.results[0].meanScore}\n\n*Sinopsis:* _${cleanedDescription}_`,
              {
                parse_mode: "Markdown",
                reply_markup: {
                  inline_keyboard: [
                    [
                      {
                        text: "🔍Información completa→",
                        url: res.data.anime.results[0].siteUrl,
                        callback_data: "any",
                      },
                    ],
                  ],
                },
              }
            );
          })
          .catch((err) => {
            console.error(err);
            bot.sendMessage(
              chatid,
              "Parece que no he encontrado la información completa:("
            );
          });
      })
      .catch((err) => {
        console.log(err);
        bot.sendMessage(
          chatid,
          "Parece que ha ocurrido un error al procesar la solicitud."
        );
      });
  }
  getManga();
});

// Comando para buscar personaje
bot.onText(/\/character (.+)/, function (msg, match) {
  var a = match[1];
  var chatid = msg.chat.id;

  const get = new Character();

  function getChar() {
    get
      .character(a)
      .then((res) => {
        translate(res.data.characters.results[0].description, { to: "es" })
          .then((resp) => {
            const cleanedDescription = stripHtmlAndLimit(resp.text, 100); // Limpiar, limitar y eliminar URLs de la descripción HTML
            bot.sendMessage(
              chatid,
              `*Nombre:* ${res.data.characters.results[0].name.first}, *${res.data.characters.results[0].name.full}*  [ㅤ](${res.data.characters.results[0].image.large}) \n*Descripción:* _${cleanedDescription}_`,
              {
                parse_mode: "Markdown",
                reply_markup: {
                  inline_keyboard: [
                    [
                      {
                        text: "🔍Información completa→",
                        url: res.data.characters.results[0].siteUrl,
                        callback_data: "any",
                      },
                    ],
                  ],
                },
              }
            );
          })
          .catch((err) => {
            console.error(err);
            bot.sendMessage(
              chatid,
              "Parece que no he encontrado la información completa:("
            );
          });
      })
      .catch((err) => {
        console.error(err);
        bot.sendMessage(
          chatid,
          "Parece que ha ocurrido un error al procesar la solicitud."
        );
      });
  }
  getChar();
});




bot.onText(/^\/tts (.+)/, function (msg, match) {
  var a = match[1];
  var chatId = msg.chat.id;
  const url = googleTTS.getAudioUrl(a, {
    lang: "es",
    slow: false,
    host: "https://translate.google.com",
  });
  console.log(url);
  bot.sendVoice(chatId, url);
});




bot.onText(/\/tr (.+)/, function (msg, match) {
  var trad = match[1];
  var trs = msg.reply_to_message.text;
  var chatid = msg.chat.id;
  if (trad === "es") {
    //español
    translate(trs, { to: "es" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al es:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "en") {
    //ingles
    translate(trs, { to: "en" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al en:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "ar") {
    //arabe
    translate(trs, { to: "ar" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al ar:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "fr") {
    //frances
    translate(trs, { to: "fr" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al fr:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "ko") {
    //koreano
    translate(trs, { to: "ko" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al ko:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "ja") {
    //japones
    translate(trs, { to: "ja" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al ja:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "ru") {
    //ruso
    translate(trs, { to: "ru" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al ru:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "af") {
    //africano
    translate(trs, { to: "af" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al af:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "sq") {
    //albanes
    translate(trs, { to: "sq" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al sq:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "am") {
    //amárico
    translate(trs, { to: "am" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al am:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "hy") {
    //armenian
    translate(trs, { to: "hy" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al hy:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "az") {
    //azerbaijani
    translate(trs, { to: "az" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al az:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "eu") {
    //basque
    translate(trs, { to: "eu" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al eu:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "be") {
    //belarusian
    translate(trs, { to: "be" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al be:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "bn") {
    //bengali
    translate(trs, { to: "bn" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al bn:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "bs") {
    //bosnian
    translate(trs, { to: "bs" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al bs:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "ca") {
    //catalan
    translate(trs, { to: "ca" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al ca:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "ceb") {
    //cebuano
    translate(trs, { to: "ceb" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al ceb:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "ny") {
    //chichewa
    translate(trs, { to: "ny" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al ny:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "zn-CN") {
    //chino simplificado
    translate(trs, { to: "zn-CN" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al zn-CN:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "zn-TW") {
    //chino tradicional
    translate(trs, { to: "zn-TW" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al zn-TW:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "co") {
    //corsican
    translate(trs, { to: "co" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al co:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "hr") {
    //croata
    translate(trs, { to: "hr" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al hr:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "cs") {
    //czech
    translate(trs, { to: "cs" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al cs:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "da") {
    //danish
    translate(trs, { to: "da" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al da:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "nl") {
    //dutch
    translate(trs, { to: "nl" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al nl:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "eo") {
    //esperanto
    translate(trs, { to: "eo" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al eo:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "et") {
    //estonian
    translate(trs, { to: "et" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al et:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "tl") {
    //filipino
    translate(trs, { to: "tl" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al tl:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "fi") {
    //finish
    translate(trs, { to: "fi" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al fi:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "fy") {
    //frisian
    translate(trs, { to: "fy" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al fy:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "gl") {
    //galiciano
    translate(trs, { to: "gl" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al gl:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "ka") {
    //georgian
    translate(trs, { to: "ka" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al ka:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "de") {
    //aleman
    translate(trs, { to: "de" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al de:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "el") {
    //greek
    translate(trs, { to: "el" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al el:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "gu") {
    //gujarati
    translate(trs, { to: "gu" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al gu:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "ht") {
    //haitian
    translate(trs, { to: "ht" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al ht:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "ha") {
    //hausa
    translate(trs, { to: "ha" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al ha:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "haw") {
    //hawaian
    translate(trs, { to: "haw" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al haw:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "he") {
    //hebreo
    translate(trs, { to: "he" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al he:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "hi") {
    //hindi
    translate(trs, { to: "hi" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al hi:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "hmn") {
    //hmong
    translate(trs, { to: "hmn" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al hmn:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "hu") {
    //hungariano
    translate(trs, { to: "hu" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al hu:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "is") {
    //iscelandic
    translate(trs, { to: "is" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al is:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "ig") {
    //igbo
    translate(trs, { to: "ig" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al ig:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "id") {
    //indonesio
    translate(trs, { to: "id" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al id:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "ga") {
    //irish
    translate(trs, { to: "ga" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al ga:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "it") {
    //italiano
    translate(trs, { to: "it" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al it:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "jw") {
    //javanese
    translate(trs, { to: "jw" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al jw:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "kn") {
    //kannada
    translate(trs, { to: "kn" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al kn:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "kk") {
    //kazakh
    translate(trs, { to: "kk" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al kk:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "km") {
    //khmer
    translate(trs, { to: "km" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al km:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "ku") {
    //kurdich
    translate(trs, { to: "ku" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al ku:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "ky") {
    //kyrgyz
    translate(trs, { to: "ky" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al ky:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "lo") {
    //lao
    translate(trs, { to: "lo" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al lo:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "la") {
    //latin
    translate(trs, { to: "la" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al la:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "lv") {
    //latvian
    translate(trs, { to: "lv" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al lv:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "lt") {
    //lithuan
    translate(trs, { to: "lt" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al lt:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "lb") {
    //lex
    translate(trs, { to: "lb" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al lb:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "mk") {
    //mcaedocia
    translate(trs, { to: "mk" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al mk:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "mg") {
    //malagasi
    translate(trs, { to: "mg" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al mg:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "ms") {
    //malay
    translate(trs, { to: "ms" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al ms:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "ml") {
    //malayam
    translate(trs, { to: "ml" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al ml:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "mt") {
    //maltese
    translate(trs, { to: "mt" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al mt:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "mi") {
    //maori
    translate(trs, { to: "mi" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al mi:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "mr") {
    //marathi
    translate(trs, { to: "mr" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al mr:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "mn") {
    //mongolo
    translate(trs, { to: "mn" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al mn:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "my") {
    //burmese
    translate(trs, { to: "my" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al my</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "ne") {
    //nepali
    translate(trs, { to: "ne" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al ne:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "no") {
    //norgew
    translate(trs, { to: "no" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al no:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "ps") {
    //pashto
    translate(trs, { to: "ps" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al ps:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "fa") {
    //persa
    translate(trs, { to: "fa" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al fa:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "pl") {
    //polish
    translate(trs, { to: "pl" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al pl:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "pt") {
    //portugues
    translate(trs, { to: "pt" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al pt:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "pa") {
    //punjabi
    translate(trs, { to: "pa" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al pa:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "ro") {
    //romano
    translate(trs, { to: "ro" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al ro:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "sm") {
    //samoan
    translate(trs, { to: "sm" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al sm:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "gd") {
    //scots
    translate(trs, { to: "gd" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al gd:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "sr") {
    //serbian
    translate(trs, { to: "sr" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al sr:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "st") {
    //sesoto
    translate(trs, { to: "st" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al st:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "sn") {
    //shona
    translate(trs, { to: "sn" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al sn:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "sd") {
    //sindhi
    translate(trs, { to: "sd" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al sd:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "sl") {
    //sinhala
    translate(trs, { to: "sl" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al sl:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "so") {
    //somali
    translate(trs, { to: "so" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al so:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "su") {
    //sundanese
    translate(trs, { to: "su" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al su:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "sw") {
    //swhali
    translate(trs, { to: "sw" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al sw:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "sv") {
    //swedish
    translate(trs, { to: "sv" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al sv:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "tg") {
    //tajik
    translate(trs, { to: "tg" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al tg:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "ta") {
    //tamil
    translate(trs, { to: "ta" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al ta:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "te") {
    //telugu
    translate(trs, { to: "te" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al te:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "th") {
    //thai
    translate(trs, { to: "th" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al th:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "tr") {
    //turkish
    translate(trs, { to: "tr" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al tr:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "uk") {
    //ukrania
    translate(trs, { to: "uk" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al uk:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "ur") {
    //urdu
    translate(trs, { to: "ur" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al ur:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "uz") {
    //uzbek
    translate(trs, { to: "uz" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al uz:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "vi") {
    //vietnamita
    translate(trs, { to: "vi" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al vi:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "cy") {
    //welsh
    translate(trs, { to: "cy" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al cy:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "xh") {
    //xhosa
    translate(trs, { to: "xh" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al xh:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "yi") {
    //yidish
    translate(trs, { to: "yi" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al yi:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "yo") {
    //yoruba
    translate(trs, { to: "yo" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al yo:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (trad === "zu") {
    //zulu
    translate(trs, { to: "zu" })
      .then((res) => {
        bot.sendMessage(
          chatid,
          `🌐<i>Texto traducido del ${res.from.language.iso} al zu:</i> \n\n<code>${res.text}</code>`,
          { parse_mode: "HTML" }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
});

bot.onText(/^\/lenguajes/, (msg) => {
  bot.sendAnimation(msg.chat.id, "https://i.redd.it/tfk4b2gsf0d61.gif", {
    caption: `_Haz click en el botón para conocer los códigos y lenguajes disponibles para ser usados en el traductor kamisama_.`,
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Códigos de lenguaje→",
            url: "https://telegra.ph/Lenguajes--Traductor-07-18-2",
          },
        ],
      ],
    },
  });
});
/*********************************************************************************************************************** */

/*********************************************************************************************************************/


bot.onText(/\/qtcompatibles/, (msg) => {
  const chatId = msg.chat.id;
 
  // Verifica si el mensaje es una respuesta a otro mensaje
  if (msg.reply_to_message) {
    const usuario = msg.from.first_name;
    const usersId = msg.reply_to_message.from.first_name;
    var animacion = [
      "https://acegif.com/wp-content/uploads/anime-love-53.gif",
      "https://i.pinimg.com/originals/49/7a/55/497a5523d9b1ca23db84ecc3f5d8b1b3.gif",
      "https://64.media.tumblr.com/99691e08eecade2f575b272eda7c2d2a/tumblr_muad2kgj1F1rjonbao1_500.gif",
      "https://i.pinimg.com/originals/16/a2/5a/16a25ac1cc0b39ea3e6cd0aae72deeee.gif",
      "https://acegif.com/wp-content/gif/anime-hug-59.gif",
      "http://1.bp.blogspot.com/-WFNuVqC8aPw/Ue_mZ_FwL9I/AAAAAAAAA_Y/xTJgO3OsM7A/s1600/anime-gif-kimi-ni-todoke-Favim.com-375462_large.gif",
      "http://1.bp.blogspot.com/-3k48PNxzdqQ/U5MXmRQMKuI/AAAAAAAAE2M/XScspSBcJJY/s1600/tumblr_n6iqk7WhUt1ts5lkuo1_500.gif",
      "https://pa1.narvii.com/6427/269e2793b9c165850e522a3dba69b82c07ac16c2_hq.gif",
      "https://media1.tenor.com/images/e61a14a6bd233279eb78c9c40c4f7feb/tenor.gif",
      "http://25.media.tumblr.com/tumblr_ma95gdLpsf1raf3v8o1_500.gif",
      "https://media1.tenor.com/images/aecb71388c86293437d8836910e4323a/tenor.gif",
      "https://media1.tenor.com/images/be8c571dabed34840c4a0f3da4f7f88f/tenor.gif?itemid=4394528",
      "https://pa1.narvii.com/6529/558f56a06e539d3a9a14129a8525146b7ec411de_hq.gif",
      "http://pa1.narvii.com/6435/d6ddcd3b7e9af5b966727e2f783b846f3f041af9_00.gif",
      "https://media1.tenor.com/images/8cd2606b19c041b95e447963f81ed3ae/tenor.gif",
      "https://media1.tenor.com/images/482dda90417c697910d48165b064b363/tenor.gif",
      "http://pa1.narvii.com/6358/f33d62bca49f76a9950b6ce43f56ca0ba251d4b9_00.gif",
      "http://3.bp.blogspot.com/-iimlV6tyAt8/Ue_n86uJ64I/AAAAAAAABAU/cjnjJkCGpD4/s1600/tumblr_mla04dsokc1qd7h1xo2_500.gif",
      "https://i.pinimg.com/originals/f5/58/d7/f558d776f20c0ec86cd02c7edd87ae13.gif",
      "https://i.pinimg.com/originals/c8/69/7a/c8697a9a6804d0a53d8d2fb0fa31ae8f.gif",
      "https://acegif.com/wp-content/uploads/anime-love-29.gif",
      "https://media1.tenor.com/images/110dbddfd3d662479c214cacb754995d/tenor.gif",
      "https://pa1.narvii.com/6143/a002ce6a73a8e0c3fc56de262bf987872806c83f_hq.gif",
      "https://static.vix.com/es/sites/default/files/btg/sailormoon-enamorada.gif",
    ];
    var ma = Math.random();
    var amorani = Math.floor(ma * animacion.length);
  
    var compatibles = [
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *1%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *2%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *3%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *4%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *5%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *6%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *7%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *8%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *9%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *10%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *11%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *12%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *13%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *14%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *15%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *16%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *17%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *18%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *19%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *20%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *21%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *22%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *23%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *24%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *25%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *26%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *27%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *28%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *29%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *30%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *31%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *32%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *33%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *34%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *35%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *36%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *37%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *38%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *39%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *40%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *41%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *42%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *43%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *44%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *45%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *46%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *47%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *48%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *49%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *50%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *51%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *52%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *53%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *54%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *55%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *56%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *57%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *58%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *59%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *60%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *61%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *62%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *63%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *64%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *65%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *66%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *67%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *68%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *69%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *70%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *71%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *72%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *73%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *74%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *75%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *76%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *77%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *78%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *79%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *80%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *89%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *90%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *91%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *92%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *93%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *94%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *95%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *96%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *97%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *98%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *99%*`,
      `❤Compatibilidad de relación entre: [${usuario}](tg://user?id=${msg.from.id}) + [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) = *100%*`,
    ];
    var ma = Math.random();
    var amorcompatibles = Math.floor(ma * compatibles.length);
    bot.sendAnimation(chatId, animacion[amorani], {
      caption: compatibles[amorcompatibles],
      parse_mode: "Markdown",
    });

  } else {
    bot.sendMessage(chatId,`<i>¡Por favor, responde al mensaje de un usuario para verificar su compatibilidad💘!</i>.`, {parse_mode:"HTML"});
  }
});


bot.onText(/\/reverse/, (msg) => {
  const chatId = msg.chat.id;
  // Verifica si el mensaje es una respuesta a otro mensaje
  if (msg.reply_to_message) {
    var chatid = msg.chat.id;
    try {
      if (msg.reply_to_message.photo) {
        // Get the photo file_id
        var photoId = msg.reply_to_message.photo[msg.reply_to_message.photo.length - 1].file_id;
       bot.downloadFile(photoId, "./download").then(function (path) {
          console.log("hecho " + path);
          async function start() { //C:\Users\Usuario PC\Documents\01 Gura\01 GURA\download\file_37.jpg
            try {
          const imageBuffer = fs.readFileSync(path);
          const test = await GOOGLE_IMG_INVERSE_ENGINE_UPLOAD(imageBuffer, {
            limit: 5,
          });
              bot.sendMessage(chatid, `<code>${test.result[0].title}</code>`, { //${reverse.results[0].title}
                reply_markup: {
                  inline_keyboard: [
                    [
                      {
                        text: "🔍Resultado de búsqueda→",
                        url: test.result[0].url,
                        callback_data: "any",
                      },
                    ],
                  ],
                },
                parse_mode: "HTML",
              });
              fs.unlinkSync(path);
              console.log("!borrado...")
            } catch (error) {
              console.log(error);
              bot.sendMessage(chatid, "Parece que hubo un error en la búsqueda:(");
            }
           }
           start();
        });
    }
  } catch (error) {
      console.log(error);
      bot.sendMessage(chatid, "Parece que hubo un error:(");
    }
  } else {
    bot.sendMessage(chatId, `<i>¡Por favor, responde a una imagen para usar este comando!</i>`, {parse_mode: "HTML"});
  }
});


bot.onText(/^\/donar/, (msg) => {
  bot.sendPhoto(msg.chat.id, "https://i.imgur.com/gOogtf8.jpg", {
    caption: `[${msg.from.first_name}](tg://user?id=${msg.from.id}), _Mantener nuestro bot activo no es una tarea fácil, tampoco desarrollarlo, te agradeceriamos mucho si realizaras una pequeña donación si te ha gustado el bot para ayudarla a mantenerla viva mucho tiempo, en el futuro iremos implementando mejoras y si realizas una pequeña donación avisa en el grupo de soporte (@GawrGuraSoporte), Te tomaremos en cuenta para beneficios, y ¡Muchas gracias!, esto lo hicimos con mucho esfuerzo._`,
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "➕¡Quiero hacer una donación!",
            url: "https://www.paypal.me/noheligtt",
          },
        ],
      ],
    },
  });
});


/* bot.onText(/\/img (.+)/, function (msg, match) {
  var d = match[1];
  try{
    (async () => {
      const test = await GOOGLE_IMG_SCRAP({
        search: d,
        limit: 5,
      });
      console.log(test);
      try {
        bot.sendPhoto(msg.chat.id, `${test.result[0].url}`);
      } catch (error) {
        console.log(error);
        bot.sendMessage(msg.chat.id, "Parece que hubo un error en la búsqueda:(",);
      }
    })();
  }catch(e){
    console.log(e);
  }
}); */

bot.onText(/\/img (.+)/, function (msg, match) {
  var d = match[1];
  try{
    async function main(){
      const data = await search(d);
      try {
        bot.sendMediaGroup(msg.chat.id, [
          {
            type: "photo",
            media: data[0]
          },
          {
            type: "photo",
            media: data[1]
          },
          {
            type: "photo",
            media: data[2]
          }
        ]);
      } catch (error) {
        console.log(error);
        bot.sendMessage(msg.chat.id, "Parece que hubo un error en la búsqueda:(",);
      }
    }
    main()
  }catch(e){
    console.log(e);
  }
});



/* bot.onText(/\/lola (.+)/, function (msg, match) {

    var d = match[1];
    try{
      async function start() {
        // Image Search
        const images = await google.image(d, { safe: false });
        bot.sendMediaGroup(msg.chat.id, [
          {
            type: "photo",
            media: images[2].url
          },
          {
            type: "photo",
            media: images[3].url
          }
        ]);
       }
       
       start();
    }catch(e){
      console.log(e);
    }
}); */



bot.on("message", (msg) => {
  const userFrom = msg.from.first_name;
  var userId = msg.from.id;
  const chatId = msg.chat.id;
  var chatype = msg.chat.type;
  const admins = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "✅Resuelto",
            callback_data: "Resuelto",
          },
        ],
      ],
    },
    parse_mode: "HTML",
  };

  if (msg.text == "@admin") {
    bot.getChatAdministrators(chatId).then(function (users) {
      if (chatype == "supergroup") {
        string = "";
        idadmin = "";
        var creador = "";
        var titlecr = "";
        var idcreador = "";
        users.forEach((data) => {
          if (data.status == "creator") {
            creador += data.user.first_name;
            titlecr += data.custom_title;
            idcreador += data.user.id;
            if (titlecr == "undefined") {
              titlecr = "No establecido:(";
            }
          } else {
            idadmin = data.user.id;
            string +=
              `<a href="tg://user?id=${idadmin}">${data.user.first_name}</a>` +
              "  ";
          }
        });
        bot.sendMessage(
          chatId,
          `📵<b>¡ALERTA!</b> el usuario: <a href="tg://user?id=${userId}">${userFrom}</a>, <code>esta solicitando una intervención en el grupo:</code> <a href="tg://user?id=${idcreador}">${creador}</a>, ${string}`,
          admins
        );
      }
    });
  }
});
bot.on("callback_query", function onCallbackQuery(callbackQuery) {
  const action = callbackQuery.data;
  const msg = callbackQuery.message;
  const from = callbackQuery.from.id;
  const nombre = callbackQuery.from.first_name;
  const adminsi = {
    chat_id: msg.chat.id,
    message_id: msg.message_id,
  };
  let text;

  if (action === "Resuelto") {
    bot.getChatMember(msg.chat.id, from).then(function (data) {
      if (data.status == "creator" || data.status == "administrator") {
        text = `✅Intervención resuelta por ${nombre} en ${msg.chat.title}.`;
        bot.editMessageText(text, adminsi);
      } else {
        bot.sendMessage(
          msg.chat.id,
          `${nombre}, No tienes permiso para realizar esta acción:(`
        );
      }
    });
  }
});

/* bot.on("message", function (msg) {
  try {
    var chatId = msg.chat.id;
    var chatitle = msg.chat.title;
    var ma = Math.random();
    if( chatId != -1001476318529 &&
        chatId != -1001746624372
      ){

      if (msg.new_chat_members != undefined) {
        var nameNewMember = msg.new_chat_member.first_name;

        var frases = [
          `¡E-mail recibido: [${nameNewMember}](tg://user?id=${msg.from.id}) en el chat!`,
          `Bienvenido [${nameNewMember}](tg://user?id=${msg.from.id}), ahora tenemos una cita en el Genshin Impact.`,
          `¡Felicidades [${nameNewMember}](tg://user?id=${msg.from.id})!, Entraste al grupo VIP!`,
          `[${nameNewMember}](tg://user?id=${msg.from.id}), Bienvenido, ¿Te gusta el pan?`,
          `¡Bienvenido al chat [${nameNewMember}](tg://user?id=${msg.from.id})!, mi Casa, ahora es tú Casa.`,
          `En este grupo vivirás momentos divertidos [${nameNewMember}](tg://user?id=${msg.from.id}), ¡Bienvenido!`,
          `¿Qué hace una persona tan atractiva, divertida y original como [${nameNewMember}](tg://user?id=${msg.from.id}) aquí?`,
          `Estoy buscando dioses para una nueva religión y lo siento mucho, pero acabo de escogerte [${nameNewMember}](tg://user?id=${msg.from.id}).`,
          `Bienvenido [${nameNewMember}](tg://user?id=${msg.from.id}), puedes estar seguro que prefiero besar a mi perro que besarte a tí:(`,
          `¿Alguien podría presentarme a [${nameNewMember}](tg://user?id=${msg.from.id})?, todos dicen que es la unica persona que me quiere.`,
          `No tengo miedo de ir al infierno pues todos mis amigos estarán ahí, excepto [${nameNewMember}](tg://user?id=${msg.from.id}), él es un ángel.`,
          `Cuando ryuk muera para siempre, hasta ese día durará mi amor por ti [${nameNewMember}](tg://user?id=${msg.from.id}). ¡Bienvenido!`,
          `Los ojos sharingan sirven para predecir los movimientos y mis ojos para ver tú entrada al chat [${nameNewMember}](tg://user?id=${msg.from.id}).`,
          `Bienvenido [${nameNewMember}](tg://user?id=${msg.from.id}), espero que permanezcas en el chat hasta el final de One Piece.`,
          `Probablemente no eres de ningún anime pero eres mi favorito [${nameNewMember}](tg://user?id=${msg.from.id}), *Lo abraza*.`,
          `Si fueras un Pokémon, usaría mi única Pokébola para estar segura de que no escapes del chat [${nameNewMember}](tg://user?id=${msg.from.id}).`,
          `Ni todos los artículos de Wikipedia podrán definir lo felíz que me siento que estés aquí [${nameNewMember}](tg://user?id=${msg.from.id}).`,
          `[${nameNewMember}](tg://user?id=${msg.from.id}) Tú software es bueno... Pero tu hardware mejor.`,
          `¡[${nameNewMember}](tg://user?id=${msg.from.id}) tu llegada hizó, que digievolucionará mi corazón!`,
          `No somos calcetines, pero creó que haríamos un gran par [${nameNewMember}](tg://user?id=${msg.from.id}).`,
          `Bienvenido al chat [${nameNewMember}](tg://user?id=${msg.from.id}), ahora tenemos una cita en el Minecraft.`,
          `¿Es este el cielo?, porque se siente como si [${nameNewMember}](tg://user?id=${msg.from.id}) y yo nos dirigiéramos a un lugar mágico.`,
          `Bueno aquí estoy [${nameNewMember}](tg://user?id=${msg.from.id}). ¿Cuáles son tus otros dos deceos?.`,
          `Bienvenido majestad [${nameNewMember}](tg://user?id=${msg.from.id}). Por tí respetaría los semáforos del GTA.`,
          `[${nameNewMember}](tg://user?id=${msg.from.id}) eres seno al cuadrado y yo coseno al cuadrado, nos sumamos y ahora somos uno solo en este chat.`,
          `Estamos en presencia de una especia extinta: [${nameNewMember}](tg://user?id=${msg.from.id}).`,
          `¡Bienvenido a nuestras tierras [${nameNewMember}](tg://user?id=${msg.from.id})!`,
          `El es [${msg.from.first_name}](tg://user?id=${msg.from.id}): un otaku virgen que no se baña. Todos: ¡Bienvenido [${msg.from.first_name}](tg://user?id=${msg.from.id})!`,
          `¡Feliz cumpleaños [${nameNewMember}](tg://user?id=${msg.from.id})!`,
          `*Aplaude*, llegó el famoso [${nameNewMember}](tg://user?id=${msg.from.id}) al chat.`,
          `Cuenta la leyenda que [${nameNewMember}](tg://user?id=${msg.from.id}) y yo estaríamos en este chat hoy...`,
          `¿Sabías que acabas de unirte al mejor grupo de todos [${nameNewMember}](tg://user?id=${msg.from.id})?`,
          `Bienvenido [${nameNewMember}](tg://user?id=${msg.from.id}), ¿Te gusta la pizza?`,
          `El amor será ciego, pero hay que ver lo mucho que me alegra tu llegada [${nameNewMember}](tg://user?id=${msg.from.id}).`,
          `¿De que panaderia te escapaste biscochito [${nameNewMember}](tg://user?id=${msg.from.id})?`,
          `¡Estoy segura que en este chat harás grandes amigos [${nameNewMember}](tg://user?id=${msg.from.id})!`,
          `¿[${nameNewMember}](tg://user?id=${msg.from.id}) eres una pokébola?, ¡Porque capturaste mi atención en tú llegada a este Chat!`,
          `Uf, [${nameNewMember}](tg://user?id=${msg.from.id}) hizó entrada épica al chat.`,
          `[${nameNewMember}](tg://user?id=${msg.from.id}), el siguiente nombre para la Death Note.`,
          `¡[${nameNewMember}](tg://user?id=${msg.from.id}), te he esperado en el chat más que a la segunda temporada de High School Of The Dead!`,
          `Al fin nos encontramos [${nameNewMember}](tg://user?id=${msg.from.id}), te he buscado más que a las Esferas del Dragón.`,
          `No hay más Ki poderoso que la entrada de [${nameNewMember}](tg://user?id=${msg.from.id}) al Chat.`,
          `[${nameNewMember}](tg://user?id=${msg.from.id}) vamos a un lugar donde no haya nadie para que toques mi calva.`,
          `Bienvenido [${nameNewMember}](tg://user?id=${msg.from.id}) pórtate bien o te atacaré con mi tiburón, sólo advierto.`,
          `Entró [${nameNewMember}](tg://user?id=${msg.from.id}) al Chat como Naruto al Ramen.`,
        ];
        var flor = Math.floor(ma * frases.length);
        bot
          .sendMessage(chatId, frases[flor], {
            reply_to_message_id: msg.message_id,
            parse_mode: "Markdown",
          })
          .then((result) => {
            setTimeout(() => {
              bot.deleteMessage(chatId, result.message_id);
            }, 100 * 10000);
          })
          .catch((err) => console.log(err));
      } else if (msg.left_chat_member != undefined) {
        var nameLeftMembers = msg.left_chat_member.first_name;

        bot.sendMessage(
          chatId,
          `<a href="tg://user?id=${msg.from.id}">${nameLeftMembers}</a> abandonó la partida.`,
          {
            reply_to_message_id: msg.message_id,
            parse_mode: "HTML",
          }
        );
      }
    }
  } catch (e) {
    console.log(e);
  }
}); */

/*bot.onText(/\/nanime/, function (msg) {
  try {
    request(
      `https://api.jikan.moe/v3/season/later`,
      function (error, response, body) {
        try {
          if (!error && response.statusCode == 200) {
            var res = JSON.parse(body);
            for (var i = 0; i < res.anime.length; i++) {
              console.log(res.anime[i].title);
              /*fs.writeFile("animes.txt", `${res.anime[i].title}`, function(err) {
                if (err) {
                  return console.log(err);
                }
                console.log("El archivo fue creado correctamente");
              });
            }
          }
        } catch (err) {
          console.log(err);
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
});*/

/*bot.onText(/^\/test/, function (msg) {
  var chatId = msg.chat.id;
  var replyId = msg.reply_to_message.from.id;
  var userId = msg.from.id;
  var replyName = msg.reply_to_message.from.first_name;
  var fromName = msg.from.first_name;
  var messageId = msg.message_id;
  if (msg.reply_to_message == undefined) {
    return;
  }
  const banadmins = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "✅Desbanear",
            callback_data: "desbaneo",
          },
          {
            text: "❌Eliminar",
            callback_data: "eliminar",
          },
        ],
      ],
    },
    parse_mode: "HTML",
  };

  bot.getChatMember(chatId, userId).then(function (data) {
    if (data.status == "creator" || data.status == "administrator") {
      bot
        .kickChatMember(msg.chat.id, msg.reply_to_message.from.id)
        .then(function (result) {
          bot.sendMessage(
            chatId,
            `🔪<i>El usuario</i> <a href="tg://user?id=${replyId}">${replyName}</a> <i>ha sido eliminado del grupo, ¡Hasta la proxima!</i> \n\n🐬<b>ID:</b> (<code>${replyId}</code>)`,
            banadmins
          );
        });
    } else {
      bot.sendMessage(
        chatId,
        "Solo el creador y administradores pueden usar este comando:("
      );
    }
  });
});
bot.on("callback_query", function onCallbackQuery(callbackQuery) {
  const action = callbackQuery.data;
  const msg = callbackQuery.message;
  const from = callbackQuery.from.id;
  const nombre = callbackQuery.from.first_name;
  const hola = callbackQuery.message.reply_to_message.from.id;
  const banadmins = {
    chat_id: msg.chat.id,
    message_id: msg.message_id,
  };
  let text;

  if (action === "desbaneo") {
    console.log(callbackQuery.message);
    bot.getChatMember(msg.chat.id, from).then(function (data) {
      if (data.status == "creator" || data.status == "administrator") {
        bot.unbanChatMember(msg.chat.id, hola).then(function (result) {
          text = `✅Usuario desbaneado por ${nombre} en ${msg.chat.title}.`;
          bot.editMessageText(text, banadmins);
        });
      } else {
        bot.sendMessage(
          msg.chat.id,
          `${nombre}, No tienes permiso para realizar esta acción:(`
        );
      }
    });
  }
  if (action === "eliminar") {
    bot.getChatMember(msg.chat.id, from).then(function (data) {
      if (data.status == "creator" || data.status == "administrator") {
        text = "De acuerdo, este usuario no tiene posibilidad de regreso:(";
        bot.editMessageText(text, banadmins);
      } else {
        bot.sendMessage(
          msg.chat.id,
          `${nombre}, No tienes permiso para realizar esta acción:(`
        );
      }
    });
  }
});*/

/* ***************************************/
/* let nombresArray = [];
let enlaces = [];

bot.onText(/\/stickers (.+)/, function (msg, match) {
  const buscar = match[1];
  (async () => {
    try{
      const response = await requestPromise(
        `https://combot.org/telegram/stickers?q=${buscar}`
      );
      const $ = cheerio.load(response);
      nombresArray = [];
      $(`div[class="sticker-pack__title"]`).each(function () {
        nombresArray.push($(this).text());
      });
      console.log(nombresArray);
      enlaces = [];
      $(`a[class="sticker-pack__btn"]`).each(function () {
        var link = $(this).attr("href");
        enlaces.push(link);
      });
    let cad = "";
      let i = 0;
      i++;
      for (let item of nombresArray) {
        cad += `${item}`;
      }
      bot.sendMessage(msg.chat.id, `Resultados de stickers: \n${cad} `, {
        parse_mode: "Markdown",
      });
      bot.sendMessage(
        msg.chat.id,
        `🐋<i>Resultados de stickers para ${buscar}:</i>\n\n▫<a href="${enlaces[0]}">${nombresArray[0]}</a>\n▫<a href="${enlaces[1]}">${nombresArray[1]}</a> \n▫<a href="${enlaces[2]}">${nombresArray[2]}</a> \n▫<a href="${enlaces[3]}">${nombresArray[3]}</a> \n▫<a href="${enlaces[4]}">${nombresArray[4]}</a>\n▫<a href="${enlaces[5]}">${nombresArray[5]}</a>\n▫<a href="${enlaces[6]}">${nombresArray[6]}</a>\n▫<a href="${enlaces[7]}">${nombresArray[7]}</a>\n▫<a href="${enlaces[8]}">${nombresArray[8]}</a>\n▫<a href="${enlaces[9]}">${nombresArray[9]}</a>\n▫<a href="${enlaces[10]}">${nombresArray[10]}</a>\n▫<a href="${enlaces[11]}">${nombresArray[11]}</a>`,
        { parse_mode: "HTML" }
      );
    }catch(e){
      console.log(e)
    }
  })();
}); */
/* bot.onText(/\/stickers (.+)/, async function (msg, match) {
  const buscar = match[1];

  try {
    const response = await requestPromise({
      uri: `https://combot.org/telegram/stickers?q=${buscar}`,
      transform: function (body) {
        return cheerio.load(body);
      }
    });

    const nombresArray = [];
    const enlaces = [];

    $('div[class="sticker-pack__title"]').each(function () {
      nombresArray.push($(this).text());
    });

    $('a[class="sticker-pack__btn"]').each(function () {
      var link = $(this).attr("href");
      enlaces.push(link);
    });

    let cad = "";
    for (let item of nombresArray) {
      cad += `${item}\n`;
    }

    bot.sendMessage(msg.chat.id, `Resultados de stickers para ${buscar}:\n${cad}`, {
      parse_mode: "Markdown",
    });

    let mensajeHTML = `🐋<i>Resultados de stickers para ${buscar}:</i>\n\n`;
    for (let i = 0; i < Math.min(12, enlaces.length); i++) {
      mensajeHTML += `▫<a href="${enlaces[i]}">${nombresArray[i]}</a>\n`;
    }

    bot.sendMessage(msg.chat.id, mensajeHTML, { parse_mode: "HTML" });

  } catch (e) {
    console.error(e); // Imprime el error detallado en la consola
    bot.sendMessage(msg.chat.id, 'Ocurrió un error al procesar la solicitud');
  }
}); */

bot.onText(/^\/getsticker/, function (msg) {
  var chatId = msg.chat.id;
  if (msg.reply_to_message == undefined) {
    return;
  }
  var photo = msg.reply_to_message.sticker.file_id;
  bot.getFileLink(photo).then(function (enlace) {
    convertapi
      .convert(
        "png",
        {
          File: `${enlace}`,
        },
        "webp"
      )
      .then(function (result) {
        bot.sendDocument(chatId, `${result.response.Files[0].Url}`, {
          caption: `🐋<i>Hecho por:</i> @gawrgurahelperbot.`,
          parse_mode: "HTML",
        });
      });
  });
});

bot.onText(/^\/idsticker/, function (msg) {
  var chatId = msg.chat.id;
  if (msg.reply_to_message == undefined) {
    return;
  }
  var idSticker = msg.reply_to_message.sticker.file_id;
  var nombreSticker = msg.reply_to_message.sticker.set_name;

  bot.sendMessage(
    chatId,
    `<b>🔓ID del sticker:</b> <code>${idSticker}</code>`,
    {
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Pack de Stickers Origen→",
              url: `https://t.me/addstickers/${nombreSticker}`,
            },
          ],
        ],
      },
    }
  );
});


bot.onText(/\/ping/, function onEditableText(msg) {
  var chatId = msg.chat.id;
  bot
    .sendMessage(chatId, "<code>¡Ping!</code>", {
      parse_mode: "HTML",
    })
    .then(result => {
      tcpp.ping({ address: 'gurabotnohe.herokuapp.com', port: 80 }, function(err, data) {
        bot.editMessageText(`🏓 <code>¡Pong!</code> \n<code>${data.min}</code> <code>ms.</code>`, {
          chat_id: chatId,
          message_id: result.message_id, parse_mode: "HTML"
        });
    });
  
    });
});



bot.onText(/\/notificacion (on|off)/, (msg, match) => {
  const chatId = msg.chat.id;
  const chatType = msg.chat.type;
  const command = match[1];

  if (chatType === 'group' || chatType === 'supergroup') {
    // Verificar si el remitente del mensaje es un administrador o el creador del grupo
    bot.getChatAdministrators(chatId)
      .then((administrators) => {
        const isAdmin = administrators.some(admin => admin.user.id === msg.from.id);
        const isCreator = msg.chat.owner && msg.from.id === msg.chat.owner.id;

        if (isAdmin || isCreator) {
          if (command === 'on') {
            // Verificar si el grupo ya está registrado en la base de datos
            db.collection('grupos').doc(chatId.toString()).get()
              .then((doc) => {
                if (doc.exists) {
                  // El grupo ya está registrado
                  bot.sendMessage(chatId, '_¡El grupo ya está registrado para recibir notificaciones!_', {parse_mode:"Markdown"});
                } else {
                  // Guardar la ID del grupo en la base de datos
                  db.collection('grupos').doc(chatId.toString()).set({ chatId })
                    .then(() => {
                      bot.sendAnimation(
                        msg.chat.id,
                        "https://img1.picmix.com/output/stamp/normal/5/9/2/2/2062295_fcbed.gif",
                        {
                          caption:
                            "🦈_¡Perfecto, NOTIFICACIONES HABILITADAS!, ¡Pronto recibiras todas mis actualizaciones y noticias!_",
                          parse_mode: "Markdown",
                        }
                      );
                    })
                    .catch((error) => {
                      console.error('Error al guardar la ID del grupo:', error);
                      bot.sendMessage(chatId, '_¡Ocurrió un error al activar las notificaciones!_', {parse_mode: "Markdown"});
                    });
                }
              })
              .catch((error) => {
                console.error('Error al verificar el grupo en la base de datos:', error);
                bot.sendMessage(chatId, '_¡Ocurrió un error al verificar el grupo en la base de datos!_', {parse_mode: "Markdown"});
              });
          } else if (command === 'off') {
            // Eliminar la ID del grupo de la base de datos
            db.collection('grupos').doc(chatId.toString()).delete()
              .then(() => {
                bot.sendAnimation(
                  msg.chat.id,
                  "https://i.pinimg.com/originals/16/2e/fe/162efe70b89e4c9fb4e8e55ee559f351.gif",
                  {
                    caption:
                      "🦈_¡Perfecto, NOTIFICACIONES DESHABILITADAS!, ¡Vuelve pronto si quieres recibir todas mis actualizaciones y noticias!_",
                    parse_mode: "Markdown",
                  }
                );
              })
              .catch((error) => {
                console.error('Error al eliminar la ID del grupo:', error);
                bot.sendMessage(chatId, '¡Ocurrió un error al desactivar las notificaciones!');
              });
          }
        } else {
          bot.sendMessage(chatId, 'Solo los administradores y el creador del grupo pueden usar este comando:(');
        }
      })
      .catch((error) => {
        console.error('Error al obtener los administradores del grupo:', error);
        bot.sendMessage(chatId, '¡Ocurrió un error al obtener los administradores del grupo!');
      });
  } else {
    bot.sendMessage(chatId, 'Este comando solo se puede utilizar en grupos:(');
  }
});
const usuariosPermitidos = ['1701653200', '1702852475'];
// Comando /lanzar
bot.onText(/\/anunciar/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  // Verificar si el usuario tiene permiso para usar el comando /lanzar
  if (usuariosPermitidos.includes(userId.toString())) {
    if (msg.reply_to_message) {
      const message = msg.reply_to_message;

      // Obtener todas las IDs de los grupos desde la base de datos
      db.collection('grupos').get()
        .then((querySnapshot) => {
          const promises = [];

          querySnapshot.forEach((doc) => {
            const group = doc.data();
            const groupId = group.chatId;

            // Enviar el mensaje al grupo y agregar la promesa a un arreglo
            promises.push(bot.copyMessage(groupId, chatId, message.message_id));
          });

          // Esperar a que se completen todas las promesas
          Promise.all(promises)
            .then(() => {
              bot.sendMessage(msg.chat.id, "*🐋¡Mensaje enviado a los grupos!*", {parse_mode: "Markdown"})
            })
            .catch((error) => {
              console.error('Error al enviar el mensaje a los grupos:', error);
            });
        })
        .catch((error) => {
          console.error('Error al obtener los grupos:', error);
        });
    } else {
      bot.sendMessage(chatId, '*¡Por favor, responde a un mensaje al que deseas enviar a los grupos!*', {parse_mode: "Markdown"});
    }
  } else {
    bot.sendMessage(chatId, 'No tienes permiso para usar este comando:(');
  }
});

//COMANDO GBAN
const gbanFile = 'gban.json';

let gbanList = [];
const allowedAdmins = [1701653200]; // Agrega los IDs de otros administradores permitidos


// Cargar la lista de usuarios gban al iniciar el bot
if (fs.existsSync(gbanFile)) {
  const data = fs.readFileSync(gbanFile, 'utf8');
  if (data.trim() !== '') {
    gbanList = JSON.parse(data);
  }
}

// Función para guardar la lista de usuarios gban
function saveGbanList() {
  fs.writeFileSync(gbanFile, JSON.stringify(gbanList, null, 2));
}

// Comando /gban
bot.onText(/\/gban (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = match[1];

  if (allowedAdmins.includes(msg.from.id)) {
    // Expulsar al usuario inmediatamente
    try {
      await bot.kickChatMember(chatId, userId);
      // Agregar el usuario a la lista de gban
      gbanList.push(userId);
      saveGbanList();
      bot.sendMessage(chatId, `Usuario con ID ${userId} baneado globalmente.`);
    } catch (error) {
      console.error(`Error al expulsar al usuario ${userId}:`, error.message);
    }
  } else {
    bot.sendMessage(chatId, 'No tienes permisos para utilizar este comando.');
  }
});

// Manejar eventos de nuevos usuarios en grupos
bot.on('new_chat_members', (msg) => {
  const chatId = msg.chat.id;
  const newMembers = msg.new_chat_members;

  newMembers.forEach(async (member) => {
    const userId = member.id.toString();

    if (gbanList.includes(userId)) {
      // Usuario en lista negra, expulsarlo
      try {
        await bot.kickChatMember(chatId, userId);
        console.log(`Usuario con ID ${userId} expulsado automáticamente del grupo.`);
      } catch (error) {
        console.error(`Error al expulsar automáticamente al usuario ${userId}:`, error.message);
      }
    } else {
      console.log(`...`);
    }
  });
});

console.log('Bot is running...');


// Comando /ungban
bot.onText(/\/ungban (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const userId = match[1];

  if (allowedAdmins.includes(msg.from.id)) {
    gbanList = gbanList.filter(id => id !== userId);
    saveGbanList();
    bot.sendMessage(chatId, `*¡Segunda oportunidad!* \nEl usuario con la ID: ${userId} ha sido desbaneado globalmente.🐋`, {parse_mode: "Markdown"});
  } else {
    bot.sendMessage(chatId, 'No tienes permisos para utilizar este comando.');
  }
});

// Comando /listgban
bot.onText(/\/listgban/, (msg) => {
  const chatId = msg.chat.id;

  if (allowedAdmins.includes(msg.from.id)) {
    const userList = gbanList.join('\n');
    bot.sendMessage(chatId, `*🐋Usuarios baneados globalmente:* \n🐋 ${userList}`, {parse_mode: "Markdown"});
  } else {
    bot.sendMessage(chatId, '*No tienes permisos para utilizar este comando titán🐋.*', {parse_mode: "Markdown"});
  }
});

// Manejar eventos de nuevos usuarios en grupos
bot.on('new_chat_members', (msg) => {
  const chatId = msg.chat.id;
  const newMembers = msg.new_chat_members;

  newMembers.forEach(member => {
    if (gbanList.includes(member.id.toString())) {
      // Expulsar al usuario
      bot.kickChatMember(chatId, member.id).catch(error => {
        bot.sendMessage(chatId, '*¡Oh no este usuario es peligroso! ha sido baneado globalmente.* \n🐋*Acción:* eliminado. \n🐋*Apelación:* @Gawrguranoticias.', {parse_mode: "Markdown"});
        console.error(`Error al expulsar al usuario ${member.id}:`, error.message);
      });
    }
  });
});



/* const DATA_FILE = 'afk_data.json';

// Cargar datos almacenados
let afkData = {};
if (fs.existsSync(DATA_FILE)) {
  const data = fs.readFileSync(DATA_FILE, 'utf8');
  if (data.trim() !== '') {
    afkData = JSON.parse(data);
  }
} */
/* 
// Comando /afk
bot.onText(/\/afk (.+)/, (msg, match) => {
  const userId = msg.from.id;
  const reason = match[1];

  afkData[userId] = {
    active: true,
    reason: reason,
    timestamp: moment().unix()
  };

  // Guardar datos actualizados
  fs.writeFileSync(DATA_FILE, JSON.stringify(afkData), 'utf8');

  bot.sendMessage(msg.chat.id, `¡Modo AFK activado! Razón: ${reason}`);
});

// Manejar respuestas a mensajes
bot.on('message', (msg) => {
  const userId = msg.from.id;
  const chatId = msg.chat.id;

  // Verificar si el usuario está en modo AFK
  if (afkData[userId] && afkData[userId].active) {
    const afkTime = moment.unix(afkData[userId].timestamp);
    const duration = moment.duration(moment().diff(afkTime));
    const formattedDuration = moment.utc(duration.asMilliseconds()).format("HH:mm:ss");

    bot.sendMessage(chatId, `El usuario está AFK (${formattedDuration}). Razón: ${afkData[userId].reason}`);
  }

  // Desactivar modo AFK al escribir nuevamente
  if (afkData[userId] && afkData[userId].active && msg.text && !msg.reply_to_message) {
    // Solo enviar el mensaje si el usuario original escribe nuevamente
    delete afkData[userId];
    // Guardar datos actualizados
    fs.writeFileSync(DATA_FILE, JSON.stringify(afkData), 'utf8');

    setTimeout(() => {
      if (!Object.keys(afkData).some(key => afkData[key].active)) {
        bot.sendMessage(chatId, 'Modo AFK desactivado. ¡Bienvenido de vuelta!');
      }
    }, 1000);
  }
}); */


bot.onText(/\/setrules/, (msg) => {
  handleCommandWithAdminCheck(msg, (chatId) => {
    bot.sendMessage(chatId, 'Titán, por favor envía las reglas del grupo en el siguiente mensaje🐋. *(¡Solo admito texto!)*', {parse_mode: "Markdown"});

    bot.once('text', (rulesMsg) => {
      const rules = rulesMsg.text;

      // Guardar reglas en Firestore
      db.collection('rules').doc(chatId.toString()).set({ rules })
        .then(() => {
          bot.sendMessage(chatId, '¡Reglas guardadas correctamente capitán🐋! *Recuerda consultarlas con el comando /rules.*', {parse_mode: "Markdown"});
        })
        .catch((error) => {
          console.error(error);
          bot.sendMessage(chatId, 'Ha ocurrido un error al guardar las reglas.');
        });
    });
  });
});

// Comando para obtener reglas
bot.onText(/\/rules/, (msg) => {
  handleCommandWithAdminCheck(msg, (chatId) => {
    // Obtener reglas desde Firestore
    db.collection('rules').doc(chatId.toString()).get()
      .then(doc => {
        const rules = doc.exists ? doc.data().rules : null;
        if (rules) {
          bot.sendMessage(chatId, `🐋_Reglas del grupito:_ \n${rules}`, {parse_mode: "Markdown"});
        } else {
          bot.sendMessage(chatId, '*¡No hay reglas establecidas para este grupito titán🐋!*', {parse_mode: "Markdown"});
        }
      })
      .catch(err => {
        console.error(err);
        bot.sendMessage(chatId, 'Ha ocurrido un error al obtener las reglas.');
      });
  });
});

// Comando para limpiar reglas
bot.onText(/\/clearrules/, (msg) => {
  handleCommandWithAdminChecks(msg, (chatId) => {
    // Eliminar reglas desde Firestore
    db.collection('rules').doc(chatId.toString()).delete()
      .then(() => {
        bot.sendMessage(chatId, '*Reglas eliminadas correctamente capitán🐋.*', {parse_mode:"Markdown"});
      })
      .catch((error) => {
        console.error(error);
        bot.sendMessage(chatId, 'Ha ocurrido un error al eliminar las reglas.');
      });
  });
});

// Función para manejar comandos con verificación de administrador
function handleCommandWithAdminChecks(msg, callback) {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  bot.getChatMember(chatId, userId).then((chatMember) => {
    if (chatMember.status === 'administrator' || chatMember.status === 'creator') {
      callback(chatId);
    } else {
      bot.sendMessage(chatId, '*¡Solo los administradores pueden utilizar este comando titán🐋!*', {parse_mode: "Markdown"});
    }
  }).catch((err) => {
    console.error(err);
  });
}


// Manejador de comando /welcome on
bot.onText(/\/welcome on/, (msg) => {
  handleCommandWithAdminCheck(msg, (chatId) => {
    // Obtiene la configuración actual
    getWelcomeConfig(chatId).then((currentConfig) => {
      currentConfig = currentConfig || {};

      // Activa la funcionalidad de bienvenida aleatoria
      currentConfig.isActive = true;

      // Actualiza la configuración en Firestore
      db.collection('welcomeConfig').doc(chatId.toString()).set(currentConfig)
        .then(() => {
          bot.sendMessage(chatId, '*Funcionalidad de bienvenida activada titán ahora todos serán saludados🐋. ¡Bienvenidos!*', {parse_mode: "Markdown"});
        })
        .catch((error) => {
          console.error(error);
          bot.sendMessage(chatId, 'Ha ocurrido un error al activar la funcionalidad de bienvenida.');
        });
    }).catch((error) => {
      console.error(error);
      bot.sendMessage(chatId, 'Ha ocurrido un error al activar la funcionalidad de bienvenida.');
    });
  });
});

// Manejador de comando /welcome off
bot.onText(/\/welcome off/, (msg) => {
  handleCommandWithAdminCheck(msg, (chatId) => {
    // Obtiene la configuración actual
    getWelcomeConfig(chatId).then((currentConfig) => {
      currentConfig = currentConfig || {};

      // Desactiva la funcionalidad de bienvenida aleatoria
      currentConfig.isActive = false;

      // Actualiza la configuración en Firestore
      db.collection('welcomeConfig').doc(chatId.toString()).set(currentConfig)
        .then(() => {
          bot.sendMessage(chatId, '*Funcionalidad de bienvenida desactivada titán🐋.*', {parse_mode: "Markdown"});
        })
        .catch((error) => {
          console.error(error);
          bot.sendMessage(chatId, 'Ha ocurrido un error al desactivar la funcionalidad de bienvenida.');
        });
    }).catch((error) => {
      console.error(error);
      bot.sendMessage(chatId, 'Ha ocurrido un error al desactivar la funcionalidad de bienvenida.');
    });
  });
});

// Manejador de nuevo miembro en el grupo
bot.on('new_chat_members', (msg) => {
  const chatId = msg.chat.id;

  // Obtiene la configuración actual
  getWelcomeConfig(chatId).then((currentConfig) => {
    // Verifica si la funcionalidad de bienvenida está activada para el grupo
    if (currentConfig && currentConfig.isActive) {
      // Obtiene 5 mensajes de bienvenida aleatorios
      const welcomeMessages = getRandomWelcomeMessages(5);

      // Envía los mensajes de bienvenida al grupo por cada nuevo miembro
      msg.new_chat_members.forEach((member, index) => {
        // Envía el mensaje de bienvenida
        bot.sendMessage(chatId, `${welcomeMessages[index]}\n\n¡Bienvenido, [${member.first_name}](tg://user?id=${msg.from.id})!`, {parse_mode: "Markdown"}).then((sentMsg) => {
          // Establece un temporizador para borrar el mensaje después de 5 minutos (300,000 ms)
          setTimeout(() => {
            bot.deleteMessage(chatId, sentMsg.message_id);
          }, 300000);
        });
      });
    }
  }).catch((error) => {
    console.error(error);
  });
});

// Función para obtener la configuración de bienvenida desde Firestore
function getWelcomeConfig(chatId) {
  return db.collection('welcomeConfig').doc(chatId.toString()).get()
    .then(doc => doc.exists ? doc.data() : null)
    .catch(err => null);
}

// Función para verificar si el usuario es administrador
function isUserAdmin(msg) {
  const userId = msg.from.id;
  const chatId = msg.chat.id;

  return new Promise((resolve, reject) => {
    bot.getChatMember(chatId, userId).then((chatMember) => {
      if (chatMember.status === 'administrator' || chatMember.status === 'creator') {
        resolve(true);
      } else {
        resolve(false);
      }
    }).catch((err) => {
      reject(err);
    });
  });
}

// Función para manejar los comandos con verificación de administrador
function handleCommandWithAdminCheck(msg, callback) {
  isUserAdmin(msg).then((isAdmin) => {
    if (isAdmin) {
      const chatId = msg.chat.id;
      callback(chatId);
    } else {
      bot.sendMessage(msg.chat.id, '*Solo los administradores pueden utilizar este comando titán🐋.*', {parse_mode: "Markdown"});
    }
  }).catch((err) => {
    console.error(err);
  });
}

// Función para obtener mensajes de bienvenida aleatorios
function getRandomWelcomeMessages(count) {
  const welcomeMessages = [
    '¡Bienvenido al grupo!',
    'Es un placer tenerte con nosotros.',
    '¡Hola! Bienvenido a la comunidad.',
    '¡Saludos! Estamos felices de que te hayas unido.',
    '¡Bienvenido! Esperamos que disfrutes tu estancia aquí.',
    `¿Es este el cielo?, porque se siente como si tu y yo nos dirigiéramos a un lugar mágico.`,
    `¡E-mail recibido: un nuevo usuario en el chat!`,
    `Hola nuevo usuario, ahora tenemos una cita en el Minecraftt.`,
    `¡Atención, ninja recién llegado! es tu dojo para compartir y disfrutar del mundo ninja.`,
    `¿Te gusta el pan?`,
    `¡Bienvenido al viaje isekai! Donde cada mensaje es una nueva dimensión. ¡Disfruta tu estancia!`,
    `¿Qué hace una persona tan atractiva, divertida y original como tú aquí?`,
    `Estoy buscando dioses para una nueva religión y lo siento mucho, pero acabo de escogerte.`,
    `Los ojos sharingan sirven para predecir los movimientos y mis ojos para ver tú entrada al chat.`,
    `Excelente nueva parada para charlar sobre anime. ¡Listo para comenzar la aventura!.`,
    `Ni todos los artículos de Wikipedia podrán definir lo felíz que me siento que estés aquí.`,
    `¡Tu llegada hizó, que digievolucionará mi corazón!`,
    `No somos calcetines, pero creó que haríamos un gran par.`,
    `Bueno aquí estoy. ¿Cuáles son tus otros dos deceos?.`,
    `Estamos en presencia de una especia extinta:`,
    `¡Saludos, otaku valiente! es tu nueva guarida para hablar de anime y hacer nuevos amigos.`,
    `¿Sabías que acabas de unirte al mejor grupo de todos?`,
    `¡Has entrado al gremio de hechiceros! Aquí cada miembro tiene su propio hechizo mágico. ¡Que empiece la magia!`,
    `¡Hola, ingresaste al rincón más kawaii de Telegram. ¡Prepárate para derretirte de ternura!`,
    `¡Estoy segura que en este chat harás grandes amigos!`,
  ];

  const randomMessages = [];

  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * welcomeMessages.length);
    randomMessages.push(welcomeMessages[randomIndex]);
  }

  return randomMessages;
}


////
/* // Manejar el estado de la pregunta activa
let preguntaActiva = false;

// Manejar el comando /quiz
bot.onText(/\/quiz/, async (msg) => {
  // Consultar el estado de la pregunta activa en Firebase
  const estadoPreguntaDoc = await db.collection('estado').doc('pregunta').get();
  const estadoPregunta = estadoPreguntaDoc.exists ? estadoPreguntaDoc.data().activa : false;

  if (estadoPregunta) {
    // Hay una pregunta en curso, informar al usuario
    bot.sendMessage(msg.chat.id, 'Ya hay una pregunta activa. Espera a que alguien la responda.');
  } else {
    // Obtener una pregunta aleatoria (aquí debes implementar tu lógica)
    const preguntaAleatoria = obtenerPreguntaAleatoria();

    // Enviar la pregunta al chat
    bot.sendMessage(msg.chat.id, preguntaAleatoria);

    // Cambiar el estado de la pregunta activa en Firebase
    await db.collection('estado').doc('pregunta').set({ activa: true });
  }
});

// Manejar las respuestas a la pregunta
bot.on('message', async (msg) => {
  if (preguntaActiva && msg.text) {
    // Obtener la respuesta correcta de la pregunta (aquí debes implementar tu lógica)
    const respuestaCorrecta = obtenerRespuestaCorrecta();

    if (msg.text.toLowerCase() === respuestaCorrecta.toLowerCase()) {
      // Otorgar un punto al usuario y almacenar en Firebase
      await otorgarPunto(msg.from.id);

      // Informar al usuario que la respuesta es correcta y ha ganado un punto
      bot.sendMessage(msg.chat.id, `¡Respuesta correcta! Ganaste un punto.`);
    } else {
      // Informar al usuario que la respuesta es incorrecta
      bot.sendMessage(msg.chat.id, `Respuesta incorrecta. Inténtalo de nuevo.`);
    }

    // Cambiar el estado de la pregunta activa
    preguntaActiva = false;

    // Actualizar el estado de la pregunta activa en Firebase
    await db.collection('estado').doc('pregunta').set({ activa: false });
  }
});

// Array de preguntas y respuestas
const preguntas = [
  { pregunta: '¿Cuál es la capital de Francia?', respuesta: 'París' },
  { pregunta: '¿Cuál es el río más largo del mundo?', respuesta: 'Amazonas' },
  { pregunta: '¿Cuál es el planeta más grande del sistema solar?', respuesta: 'Júpiter' },
  // Agrega más preguntas según sea necesario
];

// Función para obtener una pregunta aleatoria
function obtenerPreguntaAleatoria() {
  const preguntaIndex = Math.floor(Math.random() * preguntas.length);
  return preguntas[preguntaIndex].pregunta;
}

// Función para obtener la respuesta correcta de la pregunta
function obtenerRespuestaCorrecta() {
  const preguntaIndex = Math.floor(Math.random() * preguntas.length);
  return preguntas[preguntaIndex].respuesta;
} */


/* bot.onText(/\/reaccion/, async (msg) => {
  const chatId = msg.chat.id;

  // Verificar si el mensaje original es un texto
  if (msg.reply_to_message && msg.reply_to_message.text) {
      const originalMessage = msg.reply_to_message.text;

      // Crear la imagen con el texto original utilizando node-canvas
      const canvas = createCanvas(400, 200);
      const ctx = canvas.getContext('2d');

      // Configurar el diseño de la imagen (ajusta según tus necesidades)
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = '20px Arial';
      ctx.fillStyle = 'black';
      ctx.fillText(originalMessage, 10, 70);

      // Guardar la imagen en un buffer
      const buffer = canvas.toBuffer('image/png');

      // Guardar el buffer en un archivo temporal en el servidor
      const tempFilePath = './download/temp.png';
      fs.writeFileSync(tempFilePath, buffer);

      // Enviar la imagen como sticker con los botones de reacción en un solo mensaje
      bot.sendSticker(chatId, tempFilePath, {
          reply_markup: {
              inline_keyboard: [
                  [{ text: 'Me gusta', callback_data: 'like' }],
                  [{ text: 'No me gusta', callback_data: 'dislike' }]
              ]
          }
      });

      // Eliminar el archivo temporal después de enviarlo
      fs.unlinkSync(tempFilePath);
  } else {
      // Enviar un mensaje indicando que el comando debe ser respondido a un mensaje de texto
      bot.sendMessage(chatId, 'El comando /reaccion debe ser respondido a un mensaje de texto.');
  }
});

// Manejar las respuestas a los botones de reacción
bot.on('callback_query', (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const userId = callbackQuery.from.id;
  const data = callbackQuery.data;

  // Aquí puedes implementar la lógica para contabilizar las reacciones (guardar en una base de datos, por ejemplo)
  if (data === 'like') {
      // Incrementar el contador de me gusta
      console.log(`Usuario ${userId} le dio Me gusta.`);
  } else if (data === 'dislike') {
      // Incrementar el contador de no me gusta
      console.log(`Usuario ${userId} le dio No me gusta.`);
  }

  // Responder al botón presionado
  bot.answerCallbackQuery(callbackQuery.id, `Has seleccionado ${data}`);
}); */
//const allowedUserIds = ['1701653200', '5271375405']; // Agrega las IDs autorizadas aquí.


/* 
bot.onText(/\/anonimo (.+) (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const targetUserId = match[1];
    const message = match[2];

    // Verificar si la ID del remitente está en la lista de IDs permitidas.
    if (allowedUserIds.includes(msg.from.id.toString())) {
      try {
        // Enviar mensaje anónimo al usuario especificado.
        bot.sendMessage(targetUserId, `*¡Tienes un mensaje anónimo titan🐋!*\n\n\n*Mensaje*: ${message}`,{parse_mode: "Markdown"});
        // Confirmar al remitente del comando que el mensaje ha sido enviado.
        bot.sendMessage(chatId, '*Mensaje anónimo enviado con éxito 🐋.*', {parse_mode: "Markdown"});
    } catch (error) {
        if (error.response && error.response.statusCode === 403) {
            // El bot fue bloqueado por el usuario.
            bot.sendMessage(chatId, 'No puedes enviar mensajes a este usuario porque ha bloqueado al bot.');
        } else {
            // Otro error al enviar el mensaje.
            console.error('Error al enviar el mensaje:', error.message);
            bot.sendMessage(senderUserId, 'Hubo un error al enviar el mensaje anónimo.');
        }
    }
    } else {
        bot.sendMessage(chatId, '*No estás autorizado para usar este comando titán 🐋.*' ,{parse_mode: "Markdown"});
    }
});
 */

/* const allowedUserIds = ['1701653200', '5271375405']; // Agrega las IDs autorizadas aquí.

bot.onText(/\/anonimo (.+) (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const senderUserId = msg.from.id; // Obtener la ID del usuario que envió el comando.
    const targetUserId = match[1];
    const message = match[2];

    // Verificar si la ID del remitente está en la lista de IDs permitidas.
    if (allowedUserIds.includes(senderUserId.toString())) {
        try {
            // Enviar mensaje anónimo al usuario especificado.
            await bot.sendMessage(targetUserId, `*¡Tienes un mensaje anónimo titan🐋!*\n\n\n*Mensaje*: ${message}`,{parse_mode: "Markdown"});

            // Confirmar al remitente del comando que el mensaje ha sido enviado.
            bot.sendMessage(chatId, '*Mensaje anónimo enviado con éxito 🐋.*', {parse_mode: "Markdown"});
        } catch (error) {
            if (error.response && error.response.statusCode === 403) {
                // El bot fue bloqueado por el usuario.
                bot.sendMessage(chatId, '*No puedes enviar mensajes a este usuario porque ha bloqueado al bot titán 🐋.*', {parse_mode: "Markdown"});
            } else {
                // Otro error al enviar el mensaje.
                console.error('Error al enviar el mensaje:', error.message);
                bot.sendMessage(senderUserId, 'Hubo un error al enviar el mensaje anónimo.');
            }
        }
    } else {
        bot.sendMessage(chatId, '*No estás autorizado para usar este comando titán 🐋.*' ,{parse_mode: "Markdown"});
    }
}); */


const allowedUserIds = ['1701653200', '5271375405', '5802106297', '1187188121', '5843858713', '5512177961', '5591717437', '5544977908', '959658757', '6394321121', "1873607826", "1271825317"]; // Agrega las IDs autorizadas aquí.

const anonymousMessages = {};

bot.onText(/\/anonimo (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const senderUserId = msg.from.id; // Obtener la ID del usuario que envió el comando.
    const [targetUserId, ...messageArray] = match[1].split(' ');
    const message = messageArray.join(' ');

    // Verificar si la ID del remitente está en la lista de IDs permitidas.
    if (allowedUserIds.includes(senderUserId.toString())) {
        try {
            // Enviar mensaje anónimo al usuario especificado.
            await bot.sendMessage(targetUserId, `*¡Tienes un mensaje anónimo titan🐋!*\n\n\n*Mensaje*: ${message}`,{parse_mode: "Markdown"});
            anonymousMessages[targetUserId] = { senderUserId, chatId, message };

            // Solicitar al usuario que envíe una respuesta.
            bot.sendMessage(targetUserId, '🚨En el siguiente mensaje *(SIN RESPONDER A ESTE)*, envía tu respuesta *(SOLO TEXTO)*.', {parse_mode: "Markdown"});
            
            // Confirmar al remitente del comando que el mensaje ha sido enviado.
            bot.sendMessage(chatId, '*¡Mensaje anónimo enviado con éxito🐋!*', {parse_mode: "Markdown"});
        } catch (error) {
            if (error.response && error.response.statusCode === 403) {
                // El bot fue bloqueado por el usuario.
                bot.sendMessage(senderUserId, '*¡No puedes enviar mensajes a este usuario porque ha bloqueado al bot 🐋!*', {parse_mode: "Markdown"});
            } else {
                // Otro error al enviar el mensaje.
                console.error('Error al enviar el mensaje:', error.message);
                bot.sendMessage(senderUserId, '*Hubo un error al enviar el mensaje anónimo titán 🐋.', {parse_mode: "Markdown"});
            }
        }
    } else {
        bot.sendMessage(senderUserId, '*No estás autorizado para usar este comando titán 🐋.*' ,{parse_mode: "Markdown"});
    }
});

bot.on('message', (msg) => {
  const userId = msg.from.id.toString();

  if (anonymousMessages[userId]) {
      const { senderUserId, chatId, message } = anonymousMessages[userId];
      const senderName = msg.from.first_name || '';
      const senderUsername = msg.from.username ? `(${msg.from.id})` : '';

      // Enviar la respuesta al chat donde se usó el comando.
      bot.sendMessage(chatId, `*Respuesta anónima recibida de ${senderName} ${senderUsername}🐋:* \n\n\n${msg.text}`, { parse_mode: "Markdown" });

      // Enviar un mensaje de confirmación solo al remitente original del mensaje anónimo.
      bot.sendMessage(msg.from.id, `*Respuesta anónima enviada con éxito a titán🐋.*`, { parse_mode: "Markdown" });

      // Eliminar la información del mensaje anónimo una vez recibida la respuesta.
      delete anonymousMessages[userId];
  }
});

const combotStickersUrl = "https://combot.org/telegram/stickers?q=";


/* bot.onText(/\/stickers (.+)/, async (msg, match) => {
  try {
      const searchText = match[1];
      const response = await fetch(combotStickersUrl + searchText);
      const text = await response.text();

      console.log("HTML de la página:", text);  // Imprime el HTML completo

      const $ = cheerio.load(text);

      const results = $('.sticker-pack__btn');
      const titles = $('.sticker-pack__title');

      if (results.length === 0) {
          bot.sendMessage(msg.chat.id, 'No se han encontrado resultados :(');
          return;
      }

      let reply = `Stickers de: *${searchText}*:\n`;
      results.each((index, result) => {
          const link = $(result).attr('href');
          const title = titles.eq(index).text();
          reply += `\n• [${title}](${link})`;
      });

      bot.sendMessage(msg.chat.id, reply, { parse_mode: 'MarkdownV2' });
  } catch (error) {
      console.error(error);
      bot.sendMessage(msg.chat.id, 'Ocurrió un error al buscar stickers. Por favor, inténtalo de nuevo más tarde.');
  }
}); */

/* const groupIds = ['-1002086241823', '-1001805661483', '-1001533363591', '-1001533363591']; // Agrega aquí los IDs de los grupos

// Función para enviar sticker y botón a todos los grupos en el array
function sendStickerWithButtonToGroups() {
    groupIds.forEach(groupId => {
        sendStickerWithButton(groupId);
    });
}

// Función para enviar sticker y botón a un grupo específico
function sendStickerWithButton(chatId) {
    const stickerId = 'CAACAgEAAx0CfFmGHwACFb5mGa2Bd8jqK6dXF0X9cNYcbMYIHAACmAEAAsp4eUQcq-pOSN9pxDQE'; // Reemplaza con el ID de tu sticker
    const buttonLabel = '🎁';
    const keyboard = {
        reply_markup: {
            inline_keyboard: [[{ text: buttonLabel, callback_data: 'catch_points' }]]
        }
    };

    bot.sendSticker(chatId, stickerId);
    bot.sendMessage(chatId, "¡Atrapa puntos titán!", keyboard);
}

// Manejar la interacción del usuario con el botón
bot.on('callback_query', async (callbackQuery) => {
    const chatId = callbackQuery.message.chat.id;
    const userId = callbackQuery.from.id;

    // Obtener el tiempo actual en milisegundos
    const currentTime = Date.now();

    // Verificar si algún usuario ha atrapado puntos recientemente (dentro de los últimos 2 minutos)
    const recentPicksSnapshot = await db.collection('recent_picks').get();
    let hasRecentPick = false;
    recentPicksSnapshot.forEach(doc => {
        const lastPickedTime = doc.data().time;
        if (currentTime - lastPickedTime < 120000) {
            hasRecentPick = true;
            return;
        }
    });

    if (hasRecentPick) {
        bot.answerCallbackQuery(callbackQuery.id, { text: "¡Oportunidad perdida titán!" });
        return;
    }

    // Atrapar puntos y registrar el tiempo
    const points = Math.floor(Math.random() * 50) + 1;
    const userRef = db.collection('players').doc(userId.toString());
    await db.runTransaction(async (transaction) => {
        const userDoc = await transaction.get(userRef);
        let userPoints = 0;
        if (userDoc.exists) {
            userPoints = userDoc.data().points;
        }
        userPoints += points;
        transaction.set(userRef, { points: userPoints }, { merge: true });
        transaction.set(db.collection('recent_picks').doc(userId.toString()), { time: currentTime });
    });
    bot.answerCallbackQuery(callbackQuery.id, { text: `¡Has ganado ${points} puntos!` });
});

// Función para obtener el top de usuarios con más puntos
async function getTopPlayers(chatId) {
    const querySnapshot = await db.collection('players').orderBy('points', 'desc').limit(5).get();
    const topPlayers = [];
    querySnapshot.forEach(doc => {
        const userId = doc.id;
        const points = doc.data().points;
        topPlayers.push({ userId: userId, points: points });
    });
    return topPlayers;
}

// Función para mostrar el top de usuarios en un chat
async function sendTopPlayers(chatId) {
    const topPlayers = await getTopPlayers(chatId);
    let message = '🏅Top 5 usuarios global con más puntos en sorteo:\n';
    const promises = [];
    topPlayers.forEach((player, index) => {
        const promise = bot.getChatMember(chatId, player.userId).then(user => {
            const firstName = user.user.first_name;
            message += `🏅${index + 1}. Usuario: ${firstName}, Puntos: ${player.points}\n`;
        }).catch(error => {
            console.error(error);
        });
        promises.push(promise);
    });
    await Promise.all(promises);
    bot.sendMessage(chatId, message);
}

// Comando para solicitar el top de usuarios
bot.onText(/\/puntostop/, (msg) => {
    const chatId = msg.chat.id;
    sendTopPlayers(chatId);
});

// Programar el envío de stickers con botón
function scheduleStickerSending() {
    // Envío inicial después de 2 minutos
    setTimeout(() => {
        sendStickerWithButtonToGroups();
        // Programar envío cada 3 horas después del envío inicial
        setInterval(() => {
            sendStickerWithButtonToGroups();
        }, 3 * 60 * 60 * 1000); // 3 horas en milisegundos
    }, 2 * 60 * 1000); // 2 minutos en milisegundos
}

// Llamada a la función para programar el envío
scheduleStickerSending(); */

/* bot.onText(/\/q/, async (msg, match) => {
  const chatId = msg.chat.id;

  // Objeto para almacenar el recuento de reacciones por usuario
  const reactionCount = {};

  // Define la ruta a la imagen local que deseas utilizar
  const defaultProfilePhotoPath = path.join(__dirname, 'icono.png');

  // Función para crear el sticker
  async function createSticker(chatId, messageText, repliedUserAlias, userProfilePhoto) {
      const canvas = createCanvas(1150, 500); // Tamaño del lienzo
      const ctx = canvas.getContext('2d');

      // Cargar la imagen de fondo de la burbuja de chat
      const backgroundImage = await loadImage('bubble.png'); // Cambia 'bubble.png' por la imagen de tu burbuja de chat

      // Dibujar la imagen de fondo en el canvas
      ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

      // Log para verificar el mensaje recuperado
      console.log('Mensaje del usuario:', messageText);

      // Cargar y dibujar la imagen de perfil del usuario (circular) o la imagen local
      let profileImage;
      if (userProfilePhoto) {
          profileImage = await loadImage(userProfilePhoto);
      } else {
          profileImage = await loadImage(defaultProfilePhotoPath);
      }

      const imageSize = 200; // Tamaño de la imagen de perfil
      ctx.save();
      ctx.beginPath();
      ctx.arc(110, 180, 100, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(profileImage, 10, 50, imageSize, imageSize); // Dibuja la imagen de perfil como un círculo
      ctx.restore();

      // Configurar el texto del mensaje
      ctx.font = 'bold 62px Arial';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';

      // Dividir el mensaje en líneas para que se ajuste correctamente en el sticker
      const lines = breakLines(ctx, messageText, canvas.width - 20);

      // Calcular la posición vertical inicial del texto
      const initialY = canvas.height / 2 - (lines.length * 30) / 2;

      // Dibujar cada línea de texto en el lienzo
      lines.forEach((line, index) => {
          ctx.fillText(line, canvas.width / 2, initialY + (index + 1) * 40);
      });

      // Agregar el alias del usuario en la esquina superior del sticker
      ctx.font = 'bold 60px Arial';
      ctx.fillStyle = '#24B7F7'; // Rojo
      ctx.fillText('@' + repliedUserAlias, 550, 170);

      // Convertir el canvas a una imagen en formato PNG
      const stickerBuffer = canvas.toBuffer('image/png');

      // Enviar el sticker al chat
      bot.sendSticker(chatId, stickerBuffer, {
          reply_markup: generateKeyboard()
      });
  }

  // Función para dividir el texto en líneas que quepan dentro del ancho del lienzo
  function breakLines(ctx, text, maxWidth) {
      const words = text.split(' ');
      const lines = [];
      let currentLine = '';

      words.forEach(word => {
          const width = ctx.measureText(currentLine + ' ' + word).width;
          if (width < maxWidth) {
              currentLine += (currentLine === '' ? '' : ' ') + word;
          } else {
              lines.push(currentLine);
              currentLine = word;
          }
      });

      if (currentLine !== '') {
          lines.push(currentLine);
      }

      return lines;
  }

  // Función para generar el teclado de respuesta con los botones emoji
  function generateKeyboard() {
      return {
          inline_keyboard: [
              [
                  { text: `😆 ${reactionCount?.happy || 0}`, callback_data: 'happy' },
                  { text: `🙂 ${reactionCount?.sad || 0}`, callback_data: 'sad' },
                  { text: `😡 ${reactionCount?.like || 0}`, callback_data: 'like' }
              ]
          ]
      };
  }

  // Manejador para las respuestas de los botones emoji
  bot.on('callback_query', async (callbackQuery) => {
      const data = callbackQuery.data;

      // Incrementar el contador de reacciones según el emoji seleccionado
      if (!reactionCount[data]) {
          reactionCount[data] = 1;
      } else {
          reactionCount[data]++;
      }

      // Obtener el mensaje y actualizar los botones emoji
      const messageId = callbackQuery.message.message_id;
      const keyboard = generateKeyboard();
      await bot.editMessageReplyMarkup(keyboard, {
          chat_id: chatId,
          message_id: messageId
      });
  });

  // Verificar si el mensaje es una respuesta a otro mensaje
  if (msg.reply_to_message && msg.reply_to_message.text) {
      console.log('Mensaje del usuario:', msg.reply_to_message);
      const repliedUserAlias = msg.reply_to_message.from.username;
      const messageText = msg.reply_to_message.text;
      const userProfilePhoto = await getUserProfilePhoto(msg.reply_to_message.from.id);

      // Crear y enviar el sticker
      await createSticker(chatId, messageText, repliedUserAlias, userProfilePhoto);
  } else {
      bot.sendMessage(chatId, 'Por favor responde a un mensaje con texto utilizando /q titán.');
  }
});

// Función para obtener la foto de perfil del usuario
async function getUserProfilePhoto(userId) {
  try {
      // Obtener información del usuario para obtener la foto de perfil
      const userProfilePhotos = await bot.getUserProfilePhotos(userId, 0, 1);
      if (userProfilePhotos.total_count > 0) {
          const photo = userProfilePhotos.photos[0][0];
          return bot.getFileLink(photo.file_id);
      } else {
          console.log('El usuario no tiene foto de perfil.');
          return null;
      }
  } catch (error) {
      console.error('Error al obtener la foto de perfil del usuario:', error);
      return null;
  }
} */

const suspenseGifUrl = 'https://pa1.aminoapps.com/7638/63bf10e1e0ff8ee20e43b2e088d266a5b49feafbr1-600-375_00.gif';
const winnerGifUrl = 'https://media.tenor.com/LaA1hLLemjAAAAAM/gold-winner.gif';

// Crea un nuevo bot usando el token proporcionado

// Manejador del comando /random
bot.onText(/\/random (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const options = match[1].split(',').map(option => option.trim());
  
  if (options.length < 2 || options.length > 10) {
    bot.sendMessage(chatId, 'Debes ingresar entre 2 y 10 opciones separadas por coma.');
    return;
  }
  
  // Simulación de espera de 5-10 segundos para generar suspenso
  const suspenseTime = Math.floor(Math.random() * 6) + 5; // Genera un número aleatorio entre 5 y 10
  
  // Envía el mensaje de suspense con el GIF
  bot.sendAnimation(chatId, suspenseGifUrl, { caption: `_🎲Generando resultado en ${suspenseTime} segundos..._`, parse_mode:"Markdown"});
  
  setTimeout(() => {
    // Selecciona una opción aleatoria
    const randomIndex = Math.floor(Math.random() * options.length);
    const randomOption = options[randomIndex];
    
    // Envía el GIF de ganador junto con el resultado
    bot.sendAnimation(chatId, winnerGifUrl, { caption: `🎯¡El resultado es: *${randomOption}!*`, parse_mode:"Markdown"});
  }, suspenseTime * 1000); // Multiplica por 1000 para convertir segundos a milisegundos
});



function obtenerNombreMes(mes) {
  const nombresMeses = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ];
  return nombresMeses[mes];
}

// Función para obtener el nombre del día de la semana en español
function obtenerNombreDia(dia) {
  const nombresDias = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  return nombresDias[dia];
}

// Manejador del comando /calendario
bot.onText(/\/calendario/, (msg) => {
  const chatId = msg.chat.id;
  const date = new Date();
  const diaSemana = obtenerNombreDia(date.getDay());
  const dia = date.getDate();
  const mes = obtenerNombreMes(date.getMonth());
  const anio = date.getFullYear();

  const fechaActual = `${diaSemana}, ${dia} de ${mes} de ${anio}`;

  const options = {
      reply_markup: JSON.stringify({
          inline_keyboard: [
              [
                  { text: 'Día', callback_data: 'day' },
                  { text: 'Mes', callback_data: 'month' },
                  { text: 'Año', callback_data: 'year' }
              ]
          ]
      })
  };

  // Enviamos el mensaje inicial con los botones
  bot.sendMessage(chatId, `⏰Fecha actual: ${fechaActual}.`, options);

  // Manejador de callbacks de los botones dentro del mismo comando
  const callbackHandler = (callbackQuery) => {
      const action = callbackQuery.data;
      const msg = callbackQuery.message;
      let text;

      switch (action) {
          case 'day':
              text = `Día: ${dia}`;
              break;
          case 'month':
              text = `Mes: ${date.getMonth() + 1}`;
              break;
          case 'year':
              text = `Año: ${anio}`;
              break;
          default:
              text = 'Error';
              break;
      }

      // Enviamos la respuesta al callback query
      bot.sendMessage(msg.chat.id, text);
  };

  // Registramos el manejador de callbacks
  bot.on('callback_query', callbackHandler);

  // Eliminamos el manejador después de 5 segundos para evitar interferencia
  setTimeout(() => {
      bot.removeListener('callback_query', callbackHandler);
  }, 5000); // Eliminamos el manejador después de 5 segundos
});


const allowedUserIdss = ['1701653200', '1271825317']; // IDs permitidas para usar comandos



/* // Comando para añadir a la lista negra
bot.onText(/\/addblacklist/, async (msg) => {
  const userId = msg.from.id.toString(); // Convertir a string

  // Verificar si el usuario tiene permisos
  console.log('Mensaje recibido:', msg);
  console.log('User ID:', userId);
  console.log('Allowed User IDs:', allowedUserIdss);

  if (!allowedUserIdss.includes(userId)) {
    bot.sendMessage(userId, 'No tienes permiso para usar este comando.');
    return;
  }

  const chatId = msg.chat.id.toString(); // Convertir a string
  try {
    const docRef = db.collection('blacklist').doc(chatId);
    await docRef.set({ id: chatId });
    bot.sendMessage(chatId, '¡Este grupo ha sido añadido a la lista negra!');
    bot.leaveChat(chatId);
  } catch (error) {
    console.error('Error al añadir a la lista negra:', error);
    bot.sendMessage(chatId, 'Ocurrió un error al procesar tu solicitud.');
  }
});

// Comando para sacar de la lista negra
bot.onText(/\/removeblacklist (.+)/, async (msg, match) => {
  const userId = msg.from.id.toString(); // Convertir a string

  // Verificar si el usuario tiene permisos
  if (!allowedUserIds.includes(userId)) {
    bot.sendMessage(userId, 'No tienes permiso para usar este comando.');
    return;
  }

  const groupId = match[1]; // Obtener el ID del grupo desde el comando
  try {
    const docRef = db.collection('blacklist').doc(groupId);
    const doc = await docRef.get();

    if (!doc.exists) {
      bot.sendMessage(msg.chat.id, `El grupo con ID ${groupId} no está en la lista negra.`);
      return;
    }

    await docRef.delete();
    bot.sendMessage(msg.chat.id, `El grupo con la ID: ${groupId} ha sido removido de la lista negra.`);
  } catch (error) {
    console.error('Error al remover de la lista negra:', error);
    bot.sendMessage(msg.chat.id, 'Ocurrió un error al procesar tu solicitud.');
  }
});

// Listener para manejar mensajes entrantes
bot.on('message', async (msg) => {
  const chatId = msg.chat.id.toString(); // Convertir a string

  // Verificar si el grupo está en la lista negra y sacarlo automáticamente
  try {
    const docRef = await db.collection('blacklist').doc(chatId).get();
    if (docRef.exists) {
      bot.leaveChat(chatId);
    }
  } catch (error) {
    console.error('Error al verificar la lista negra:', error);
  }
}); */

const authorizedUserIds = [1701653200, 1271825317]; // IDs de usuarios autorizados

bot.onText(/\/promoverme/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  // Verificar si el usuario tiene permiso
  if (authorizedUserIds.includes(userId)) {
    // Llamar al método promoteChatMember para promover al usuario que envió el comando
    bot.promoteChatMember(chatId, userId, { can_change_info: true, can_delete_messages: true, can_invite_users: true, can_restrict_members: true, can_pin_messages: true })
      .then(() => {
        bot.sendMessage(chatId, `¡@${msg.from.username} ha sido promovido como administrador del grupo!`);
      })
      .catch((error) => {
        bot.sendMessage(chatId, `Ocurrió un error al intentar promover a @${msg.from.username} como administrador.`);
        console.error('Error:', error.response.body);
      });
  } else {
    bot.sendMessage(chatId, `Lo siento, @${msg.from.username}, no tienes permiso para usar este comando.`);
  }
});


bot.on('message', async (msg) => {
  if (msg.hasOwnProperty('delete_chat_photo') || msg.hasOwnProperty('delete_chat_photo')) {
      const chatId = msg.chat.id;
      const messageText = `Mensaje eliminado en el chat: ${msg.date}\n${msg.text || msg.caption || ''}`;

      // Guardar el mensaje eliminado en un archivo de texto
      const filename = 'mensajes_eliminados.txt';
      fs.appendFile(filename, messageText + '\n\n', (err) => {
          if (err) {
              console.error('Error al escribir el archivo:', err);
          }
      });
  }
});

/* // Manejar el comando '/ultimos_eliminados'
bot.onText(/\/ultimos_eliminados/, (msg) => {
  const chatId = msg.chat.id;
  const filename = 'mensajes_eliminados.txt';

  fs.readFile(filename, 'utf8', (err, data) => {
      if (err) {
          console.error('Error al leer el archivo:', err);
          bot.sendMessage(chatId, 'No se encontraron mensajes eliminados.');
      } else {
          bot.sendDocument(chatId, Buffer.from(data), { caption: 'Últimos mensajes eliminados' });
      }
  });
}); */

