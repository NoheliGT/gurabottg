module.exports = function(bot){
    bot.onText(/^\/abrazar|^\/hug/, (msg) => {
        var chatid = msg.chat.id;
        var messageId = msg.reply_to_message.from.first_name;
        const usuario = msg.from.first_name;
        const usersId = msg.reply_to_message.from.first_name;
        var admins = [
          "https://pa1.narvii.com/6736/f96e469b50b5d2fe42e984428ed52f3ba52c1049_hq.gif",
          "https://i.pinimg.com/originals/b5/1d/f1/b51df18c3a0ebe6ddff723cf3103e174.gif",
          "https://i.pinimg.com/originals/a4/13/4f/a4134f06e210a7540ca20ae165dc457f.gif",
          "https://pa1.narvii.com/6218/15e0de4c19e4c435cb4b006db90c589d49d3e85b_hq.gif",
          "https://acegif.com/wp-content/gif/anime-hug-25.gif",
          "https://acegif.com/wp-content/gif/anime-hug-6.gif",
          "https://www.animesk.net/wp-content/uploads/2021/02/1464713222_tumblr_nzcjk5Wv0t1u9ia8fo1_500.gif",
          "https://pa1.narvii.com/6187/4470c2d3a9b3b188d1ef78618a4e1d441a97b2dd_hq.gif",
          "https://pa1.narvii.com/6341/c5468efca250c5f539513e127acf1c44b6b3f95a_hq.gif",
          "https://gifimage.net/wp-content/uploads/2017/10/cuddle-anime-gif-8.gif",
          "https://acegif.com/wp-content/gif/anime-hug-43.gif",
          "https://acegif.com/wp-content/gif/anime-hug-68.gif",
          "https://i.gifer.com/8Hox.gif",
          "https://pa1.narvii.com/6567/2bc345f9d4cd3201a7369325b59dca951dcec28f_hq.gif",
          "https://64.media.tumblr.com/14f5e0c6ef88280f75017987302a7dad/tumblr_o0kiehTtWq1tlmyzco1_500.gif",
          "https://media1.tenor.com/images/3b1453b46de9c6eee1af9247f750a695/tenor.gif",
          "https://acegif.com/wp-content/gif/anime-hug-65.gif",
          "https://i.pinimg.com/originals/42/92/2e/42922e87b3ec288b11f59ba7f3cc6393.gif",
          "https://i.pinimg.com/originals/51/2a/f3/512af31e377153959dbad5b888d22af1.gif",
          "https://c.tenor.com/By2107f9T-sAAAAC/anime-hearts.gif",
          "https://64.media.tumblr.com/81efe5844e27093f80e1cd687f8ee6d0/tumblr_prpcsjl5iw1x82plio1_500.gif",
          "https://c.tenor.com/N2stzDlUrxAAAAAM/loli-hug.gif",
          "https://i.pinimg.com/originals/93/2c/2f/932c2f0c043797342f40c6892ffc93eb.gif",
          "https://i.pinimg.com/originals/31/d2/3c/31d23cb7e7f199a0524eb2a95eeb6397.gif",
          "http://pa1.narvii.com/6692/c98bb1cdbf23892b06fab54fb22c54ddcffb5e4e_00.gif",
          "http://pa1.narvii.com/6730/f762bcac2bec625ef27e6f88547a6c960bce34c2_00.gif",
          "https://i.pinimg.com/originals/3b/b6/f7/3bb6f7a7e8562391c1bbe068c6923d1b.gif",
          "https://c.tenor.com/MroXMbycbZwAAAAC/violet-evergarden-evergarden.gif",
          "https://c.tenor.com/WMJBDcjhvU4AAAAC/anime-hug.gif",
          "http://24.media.tumblr.com/e4f64bd03f3dc50b8ac8bb10a9280b04/tumblr_mqdzqi7HBG1rhls6ro7_500.gif",
          "https://c.tenor.com/2VVGNLi-EV4AAAAC/anime-cute.gif",
          "https://c.tenor.com/gowinK__PvAAAAAC/anime-cuddle.gif",
          "https://c.tenor.com/ZkVri7cjx9IAAAAC/anime-cuddle.gif",
          "https://c.tenor.com/wwd7R-pi7DIAAAAC/anime-cuddle.gif",
          "https://c.tenor.com/OaSQqWO4-YUAAAAC/snuggle-anime.gif",
          "https://c.tenor.com/qr-CxJEClOAAAAAd/anime-anime-hug.gif",
          "https://c.tenor.com/kzNBbQZZfkAAAAAC/anime-girl-hug.gif",
          "https://c.tenor.com/cFhjNVecNGcAAAAC/anime-hug.gif",
          "https://c.tenor.com/SIw6C9wrgPUAAAAC/anime-hug.gif",
          "https://c.tenor.com/1GDpumaCq_4AAAAC/anime-hug.gif",
          "https://data.whicdn.com/images/209340466/original.gif",
          "https://64.media.tumblr.com/f5d8a821d7f22d988067858aa3dd8723/8835470572022f29-d9/s640x960/5277fd92c9c575b590cb1fcf3f84259c25a9cc5b.gif",
          "https://c.tenor.com/owaI_7iiqLMAAAAC/anime-cuddle.gif",
          "https://i.gifer.com/9mvj.gif",
          "https://c.tenor.com/IQSTvUuYTNIAAAAC/anime-hug.gif",
          "https://c.tenor.com/qmdvnU8_D6EAAAAC/anime-yuri-yuri.gif",
        ];
        var ma = Math.random();
        var margarita = Math.floor(ma * admins.length);
      
        var frases = [
          `[${usuario}](tg://user?id=${msg.from.id}) _ha abrazado a_ [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) _¡Ay que lindo es el amor! :3_`,
          `_Un abrazo es un poema escrito en la piel._ \n[${usuario}](tg://user?id=${msg.from.id}) _te ha dado un abrazo.🥺_`,
          `[${usersId}](tg://user?id=${msg.reply_to_message.from.id}) _por estas razones y por muchas más..._ \n_Hoy te envío mi más cálido abrazo._\n\n*Atte:* [${usuario}](tg://user?id=${msg.from.id})`,
          `[${usuario}](tg://user?id=${msg.from.id}) _abrazó a_ [${usersId}](tg://user?id=${msg.reply_to_message.from.id}), _Tierno abrazo de enamorados OwO✨_`,
          `¡[${usuario}](tg://user?id=${msg.from.id}) _ha envuelto en el viento..._ _y ha hecho tocar las nubes a_ [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) _con un abrazo_🥺.`,
          `[${usuario}](tg://user?id=${msg.from.id}) _ha tomado por sorpresa a_ [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) _para darle un abrazo_😳 _¡Abraza y déjate abrazar!_😘`,
          `[${usuario}](tg://user?id=${msg.from.id}) _guardó su abrazo en una caja, la ha regalado a_ [${usersId}](tg://user?id=${msg.reply_to_message.from.id}) _y encontró un tierno abrazó_🥰, _Aw_💞`,
          `_🙇🏻‍♀Siente la presencia de mi afecto envuelta en este abrazo_👊 [${usersId}](tg://user?id=${msg.reply_to_message.from.id})🤍`,
          `[${usuario}](tg://user?id=${msg.from.id}) _Ha depositado un abrazo_👩‍❤️‍👨 _en Fedex_🚍 _con destino a_ [${usersId}](tg://user?id=${msg.reply_to_message.from.id})... \n\n✈️_En Camino..._ \n\n_...Recibido_💌\n\n🧸_Abrazo recibido a_ [${usersId}](tg://user?id=${msg.reply_to_message.from.id})📩`,
        ];
        var ma = Math.random();
        var flor = Math.floor(ma * frases.length);
        bot.sendAnimation(chatid, admins[margarita], {
          caption: frases[flor],
          parse_mode: "Markdown",
        });
      });
      
}