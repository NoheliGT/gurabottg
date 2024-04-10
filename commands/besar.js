module.exports = function(bot) {
    bot.onText(/^\/besar|^\/kiss/, (msg) => {
        var chatid = msg.chat.id;
        var messageId = msg.reply_to_message.from.first_name;
        const usuario = msg.from.first_name;
        const usersId = msg.reply_to_message.from.first_name;
        var admins = [
            "https://i.pinimg.com/originals/49/7a/55/497a5523d9b1ca23db84ecc3f5d8b1b3.gif",
            "https://acegif.com/wp-content/uploads/anime-kissin-5.gif",
            "https://i.pinimg.com/originals/6e/4f/fe/6e4ffe54a38656cda96ba3eec67c84b4.gif",
            "https://pa1.narvii.com/6173/714eeee74086a0adc1bdb93dd4a08ae4220bbec2_hq.gif",
            "https://i.pinimg.com/originals/ed/32/69/ed32698a1bb485b468cc99ddee945262.gif",
            "http://24.media.tumblr.com/tumblr_mb8trrExBk1ri3gxjo1_500.gif",
            "https://i.pinimg.com/originals/51/ee/1d/51ee1d94c47ac1174faf0d96d235e230.gif",
            "https://pa1.narvii.com/6115/78610e720cfec15460c020944b82fa28039d7ccc_hq.gif",
            "http://media.tumblr.com/57bd69c651a73ebe9cc340a46c706071/tumblr_inline_msdi2rHe7K1qz4rgp.gif",
            "https://i.pinimg.com/originals/68/a3/7a/68a37a5a1b86f227b8e1169f33a6a6bb.gif",
            "https://pa1.narvii.com/6529/558f56a06e539d3a9a14129a8525146b7ec411de_hq.gif",
            "https://33.media.tumblr.com/e5765dd579dc350a7990fe4cf164dc03/tumblr_nov5rzKtlq1qcsnnso1_r1_500.gif",
            "https://i.pinimg.com/originals/1a/28/fc/1a28fcd6dd85f4ed3e1ed7f5a434be1a.gif",
            "https://i.pinimg.com/originals/b3/4e/9a/b34e9ad3669ba1fa5245bcf6df83d381.gif",
            "https://i.pinimg.com/originals/b4/5c/16/b45c168535287ee83608afddff5a5d4a.gif",
            "https://i2.wp.com/pa1.narvii.com/6161/a30a112603de88b1bc10225e64fa90335b37c60a_hq.gif",
            "https://acegif.com/wp-content/uploads/anime-kissin-2.gif",
            "https://i.pinimg.com/originals/84/77/59/84775946c793c41c1f873b3bc442a21a.gif",
            "https://64.media.tumblr.com/eff1418550734e09a8691f70e60b53d5/tumblr_ptrig5k7YM1yr7bp2o1_500.gif",
            "https://pa1.narvii.com/6384/3da5de57dfa30c037359a70a4b978aba113b50ac_hq.gif",
            "https://cutewallpaper.org/21/wallpapers-anime-besos/5-Personajes-del-Anime-que-tuvieron-sus-peores-besos-A-.gif",
            "https://64.media.tumblr.com/081c59db42ca7a95b07d54120bcccb1f/fdb324f2f23a9e00-07/s500x750/64ba0f54531721dcf0096ebd51321f4126d8d7f2.gif",
            "https://giffiles.alphacoders.com/172/172283.gif",
            "https://thumbs.gfycat.com/SoreUnitedAfricanmolesnake-max-1mb.gif",
            "https://i.pinimg.com/originals/86/d4/a0/86d4a046c8a32a28341353fc95bedc82.gif",
            "https://pa1.narvii.com/6173/d3da59e3ac5fd46d87b5f818cf171f48edc7560a_hq.gif",
            "https://d.wattpad.com/story_parts/464139748/images/14e03fe32d86cef5351472269315.gif",
            "https://pa1.narvii.com/6301/4d0f88089b1647834d6c508f7aee854417f8df98_hq.gif",
            "https://aniyuki.com/wp-content/uploads/2021/07/aniyuki-anime-gif-kiss-10.gif",
            "https://c.tenor.com/ali-zPMJvRsAAAAC/kiss-anime.gif",
            "https://c.tenor.com/dJU8aKmPKAgAAAAd/anime-kiss.gif",
            "https://pa1.narvii.com/6185/596ee732de1e5492dad5e241768d63a540965013_hq.gif",
            "https://c.tenor.com/hc2ZCXLcH5AAAAAC/hakuoki-hakuouki.gif",
          ];        
        var ma = Math.random();
        var margarita = Math.floor(ma * admins.length);
        var frases = [
            `_Aw_ [${usuario}](tg://user?id=${msg.from.id}) _le ha dado un beso a_ [${usersId}](tg://user?id=${msg.reply_to_message.from.id}).`,
            `[${usuario}](tg://user?id=${msg.from.id}) _le ha lanzado un beso a_ [${usersId}](tg://user?id=${msg.reply_to_message.from.id}), _¡Qué tierno!_`,
            `[${usuario}](tg://user?id=${msg.from.id}) _le ha dado un beso a_ [${usersId}](tg://user?id=${msg.reply_to_message.from.id}), _¿Que esperas?, ¡Corresponde!._`,
            `¡[${usuario}](tg://user?id=${msg.from.id}) _te ha dado un beso!_ \n_Me dió diabetes de tanta dulzura 🥺🍫._`,
          ];
          var ma = Math.random();
          var flor = Math.floor(ma * frases.length);
        bot.sendAnimation(chatid, admins[margarita], {
            caption: frases[flor],
            parse_mode: "Markdown",
        });
    });
};