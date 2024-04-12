module.exports = function (bot){
    bot.onText(/^\.aquiz|^\/aquiz/, (msg) => {
        var quises = [
          [
            "¿Cuál es el apellido de Edward en Fullmetal Alchemist?",
            ["Elmac", "Elnon", "Elric", "Edmond"],
            {
              type: "quiz",
              correct_option_id: 3,
              open_period: 20,
              explanation:
                "Comúnmente llamado Ed, es un personaje y protagonista del manga y anime Fullmetal Alchemist creado por Hiromu Arakawa.",
              is_anonymous: "false",
            },
          ],
          [
            "¿Quien es el Creador de One Piece? ",
            [" EichiroOda", " HayaoMiyasaki", " MasashiKishimoto", "Akiratoriyama"],
            {
              type: "quiz",
              correct_option_id: 0,
              open_period: 1,
              explanation:
                " Eichiro Oda es el creador del famoso manga Shonen One Piece Que gracias a su popularidad se convirtió en unos de los mangas Mas mencionados de los últimos tiempos.",
              is_anonymous: "false",
            },
          ],
          [
            "¿Cuantos usuarios han tenido el One For All?",
            [" 11", " 6", " 4", " 9"],
            {
              type: "quiz",
              correct_option_id: 3,
              open_period: 1,
              explanation:
                "Se Conoce que han sido 9 portadores Del One For All Incluyendo el Hermano de All For One.",
              is_anonymous: "false",
            },
          ],
          [
            "¿Como se llama El estudio de Animación que Creo Neo Génesis Evangelion?",
            [" Bones", " Pierrot", " Gainax", " Toei"],
            {
              type: "quiz",
              correct_option_id: 2,
              open_period: 1,
              explanation:
                "también conocida simplemente como Evangelion, o Eva, es una serie de anime creada por el estudió Gainax y dirigida por Hideaki Anno.",
              is_anonymous: "false",
            },
          ],
          [
            "¿Como se cataloga el género De Romance en el Anime?",
            [" Shonen", " Shoujo", " Ecchi", "Gore "],
            {
              type: "quiz",
              correct_option_id: 1,
              open_period: 1,
              explanation:
                "El Género de Romance es catálogado como (Shoujo) Que va dirijido a Un público Femenino.",
              is_anonymous: "false",
            },
          ],
          [
            "¿Cual es la fuente de energía de los ninjas en Naruto?",
            [" Ki", " Cosmos", " Bankai", " Chakra"],
            {
              type: "quiz",
              correct_option_id: 3,
              open_period: 1,
              explanation:
                "Chakra (チャクラ chakura) es la fuente de energía básica necesaria para que un ninja genere un jutsu en Naruto.",
              is_anonymous: "false",
            },
          ],
          [
            "¿Como se llama la aldea donde se criaron Asta y Yuno en Black Clover?",
            [" Aldea Henge", " Aldea Hage", " Aldea Sosshy", " Aldea Ega"],
            {
              type: "quiz",
              correct_option_id: 1,
              open_period: 1,
              explanation:
                "Asta Y Yuno Fueron Criados juntos desde su nacimiento después de ser abandonados en un orfanato de la iglesia en la aldea de Hage.",
              is_anonymous: "false",
            },
          ],
          [
            "¿En que era Japonesa Tiene lugar la Historia de Demon Slayer?",
            [" Período Taisho", " Período Edo", " Período Meiji", " Período Showa"],
            {
              type: "quiz",
              correct_option_id: 0,
              open_period: 1,
              explanation:
                "La serie se desarrolla en un Japón de comienzos del siglo XX en plenitud de la era Taishō.",
              is_anonymous: "false",
            },
          ],
          [
            "En Naruto, el personaje principal Naruto Uzumaki, es el anfitrión de los poderosos Nine-Tales. ¿Qué criatura es el Nueve Colas?",
            ["Lobo", "Zorro", "Perro", "Gato"],
            {
              type: "quiz",
              correct_option_id: 1,
              open_period: 1,
              explanation:
                "Kurama, también conocido como el Nueve Colas (九尾, Kyūbi) fue una Bestia con Cola que se encontraba sellada dentro de Naruto Uzumaki.",
              is_anonymous: "false",
            },
          ],
          [
            "¿Qué poder tiene desde su nacimiento Izuku Midoriya en My Hero Academia?",
            ["One for all", "All for one", "Invisibilidad", "Ninguna"],
            {
              type: "quiz",
              correct_option_id: 3,
              open_period: 20,
              explanation:
                "El joven estudió tanto los poderes de los héroes profesionales como las habilidades de los villanos que podría enfrentar algún día.",
              is_anonymous: "false",
            },
          ],
          [
            "¿Cuántos distritos podemos encontrar en total en Shingeki no kyojin?",
            ["25", "8", "13", "17"],
            {
              type: "quiz",
              correct_option_id: 3,
              open_period: 20,
              explanation:
                "Aquí se reúnen todos los distritos alrededor de las Murallas de los humanos.",
              is_anonymous: "false",
            },
          ],
          [
            "¿Quién es lider y fundador de SSS Shinda Sekai Sensen en Angel Beats?",
            ["Yuri Nakamura", "Eri Shiina", "Miyuki Irie", "Ninguna"],
            {
              type: "quiz",
              correct_option_id: 0,
              open_period: 20,
              explanation:
                "Ella dirige la campaña de un número de estudiantes que luchan contra Dios, a quienes culpan de sus destinos crueles.",
              is_anonymous: "false",
            },
          ],
          [
            "¿Cómo se llaman los ojos de un Ghoul, en Tokyo Ghoul?",
            ["Kakugan", "Bakugan", "Bokugan", "Shokugan"],
            {
              type: "quiz",
              correct_option_id: 0,
              open_period: 20,
              explanation:
                "Es la denominación que se le da a los ojos de un ghoul, cuando las pupilas y el iris de estos se tornan rojas y la esclerótica negra.",
              is_anonymous: "false",
            },
          ],
          [
            "¿Cuál de estos personajes fue el primero en conseguir una victoria en el torneo de Fairy Tail?",
            ["Elfam Strauss", "Erza Scarlet", "Zeref Dragneel", "Todos"],
            {
              type: "quiz",
              correct_option_id: 0,
              open_period: 20,
              explanation:
                "Los Grandes Juegos Mágicos es un concurso realizado para determinar cual es el mayor gremio de Fiore.",
              is_anonymous: "false",
            },
          ],
          [
            "En Sailor Moon, ¿Quién es el Guardián de los Sueños?",
            ["Serena Tsukino", "Pegasus", "Seiya Kou", "Aya Hisakawa"],
            {
              type: "quiz",
              correct_option_id: 1,
              open_period: 20,
              explanation:
                "Es la forma que Helios tomó cuando él se desprendió de su cuerpo humano al ver el resplandor del hermoso sueño de Chibiusa.",
              is_anonymous: "false",
            },
          ],
          [
            "¿Dónde vive Naruto?",
            ["Konoha", "Alabasta", "Namek", "Aldea Oculta del Ghoul"],
            {
              type: "quiz",
              correct_option_id: 0,
              open_period: 20,
              explanation:
                "Se encuentra en el País del Fuego, y su líder es Naruto Uzumaki, el séptimo Hokage.",
              is_anonymous: "false",
            },
          ],
          [
            "¿Cuál es el nombre de la espada de Meliodas en The Seven Deadly Sins?",
            [
              "Espada rota",
              "Espada de dragón verde",
              "Espada de luz",
              "Espada de del guerrero dragón",
            ],
            {
              type: "quiz",
              correct_option_id: 0,
              open_period: 20,
              explanation:
                "Fue su arma principal hasta que le fue arrebatada por Helbram.",
              is_anonymous: "false",
            },
          ],
          [
            "En Haikyuu, ¿de quién es el apodo: El rey de la pista?",
            ["Hinata Shoyo", "Toro Aikawa", "Tobio Kageyama", "Hinata Shikamaru"],
            {
              type: "quiz",
              correct_option_id: 2,
              open_period: 20,
              explanation:
                "Es considerado como un prodigio y ser conocido por el apodo de « El Rey de la pista ».",
              is_anonymous: "false",
            },
          ],
          [
            "En Dansu Wizu Debirusu ¿qué raza es el personaje de Shiki Natsumezaka?",
            ["Demonio", "Ángel", "Un semi dios", "Un vampiro"],
            {
              type: "quiz",
              correct_option_id: 1,
              open_period: 20,
              explanation: "Tiene cuatro alas en total, dos en cada lado.",
              is_anonymous: "false",
            },
          ],
          [
            "¿A quién pertenece esta frase?: ¡Quiero ser más fuerte! ¡Y más fuerte! ¡Y luego más fuerte que eso! Entonces podré proteger todo… Y nunca más tendré que perder nada.",
            ["Itachi Uchiha", "Edward Elric", "Monkey D. Luffy", "Levi Ackerman"],
            {
              type: "quiz",
              correct_option_id: 2,
              open_period: 20,
              explanation:
                "Es el alquimista estatal más joven en la historia del país ficticio Amestris.",
              is_anonymous: "false",
            },
          ],
          [
            "¿Qué significa la palabra Shinigami?",
            [
              "Devorador de almas",
              "Protector del death note",
              "Dios de la death note",
              "Dios de la muerte",
            ],
            {
              type: "quiz",
              correct_option_id: 3,
              open_period: 20,
              explanation:
                "Son dioses o seres sobrenaturales que invitan a los seres humanos hacia la muerte.",
              is_anonymous: "false",
            },
          ],
          [
            "¿Cuál ha sido la única película de animación japonesa en ganar un Oscar?",
            [
              "El viaje de Chihiro",
              "Your name",
              "El amor esta en el agua",
              "El bosque de las luciernagas",
            ],
            {
              type: "quiz",
              correct_option_id: 0,
              open_period: 20,
              explanation:
                "Hasta la fecha, es la primera y única película de animación japonesa que ha ganado este premio.",
              is_anonymous: "false",
            },
          ],
          [
            "¿Cuál es el anime más largo a día de hoy?",
            ["Black Clover", "Sazae-san", "Ranma 1/2", "One piece"],
            {
              type: "quiz",
              correct_option_id: 1,
              open_period: 20,
              explanation:
                "Un anime creado por Machiko Hasegawa, y que actualmente cuenta con más de 7 mil 500 episodios.",
              is_anonymous: "false",
            },
          ],
          [
            "Hoy en día el término Otaku se utiliza para hacer referencia a las personas que son muy fans del anime. ¿Tiene esta palabra el mismo significado aquí que en Japón?",
            [
              "Sí, tiene el mismo significado",
              "No, allí Otaku no se utiliza",
              "No, en japon se utiliza para referirise a personas que se quedan en casa y no tienen vida social.",
              "Ninguna de las anteriores.",
            ],
            {
              type: "quiz",
              correct_option_id: 1,
              open_period: 20,
              explanation:
                "El término otaku se refiere a un fan de cualquier tema en particular.",
              is_anonymous: "false",
            },
          ],
          [
            "¿Quién fue el creador de Dragon Ball?", //PREGUNTA
            [
              "Hayao Miyasaki", //OPCION 0
              "Takeshi Kitano", //OPCION 1
              "Akira Toriyama.", //OPCION 2
              "Naoko Takeuchi.", //OPCION 3
            ],
            {
              type: "quiz",
              correct_option_id: 2,
              open_period: 1, //LA RESPUESTA CORRECTA
              explanation:
                "Es un mangaka y diseñador de personajes japonés. Es conocido por sus obras Dr. Slump y Dragon Ball", //PISTA
              is_anonymous: "false",
            },
          ],
          [
            "¿Cuantas temporadas tiene no game no life?",
            ["1", "2", "3", "10"],
            {
              type: "quiz",
              correct_option_id: 1,
              open_period: 1,
              explanation: "Falta de segunda temporada.",
              is_anonymous: "false",
            },
          ],
          [
            "¿En que serie de anime es Ash Ketchum el personaje principal?",
            ["Escudo de ojos 21", "Pokémon", "Cowboy Bebop", "Macross"],
            {
              type: "quiz",
              correct_option_id: 1,
              open_period: 2,
              explanation:
                "Es un entrenador originario de la región Kanto. Tiene un carácter perseverante, distraído, y su máxima ambición es llegar a ser el mejor Maestro.",
              is_anonymous: "false",
            },
          ],
          [
            "¿Dragón Ball fué creado por quién en 1984?",
            ["Akira Toriyama", "Satoshi Tajiri", "Hirohiko Araki", "Hayao Miyasaki"],
            {
              type: "quiz",
              correct_option_id: 0,
              open_period: 1,
              explanation: "Fue el creador de series como Dragon Ball y Dr. Slump.",
              is_anonymous: "false",
            },
          ],
          [
            "¿Como se llama la famosa mascota de Studio Ghibli?",
            ["Kiki", "Bakura", "Ponyo", "Totoro"],
            {
              type: "quiz",
              correct_option_id: 3,
              open_period: 1,
              explanation:
                "Un personaje de Mi vecino Totoro, es la mascota del estudio",
              is_anonymous: "false",
            },
          ],
          [
            "¿Cuál es la primera película de Studio Ghibli?",
            [
              "El bosque de las luciernagas",
              "Your Name",
              "Nausicaä del valle del viento",
              "Totoro",
            ],
            {
              type: "quiz",
              correct_option_id: 2,
              open_period: 1,
              explanation:
                "Es considerada la primera película del Studio Ghibli. Supuso su primer gran éxito en Japón y la creación de dicho estudio.",
              is_anonymous: "false",
            },
          ],
          [
            "En Sailor Moon, el personaje de anime Makoto Kino se transforma en: ",
            [
              "Marinero Mercurio",
              "Marinero Venus",
              "Marinero Jupiter",
              "Marinero Marte",
            ],
            {
              type: "quiz",
              correct_option_id: 2,
              open_period: 2,
              explanation:
                "Es presentada como una adolescente fuerte y sentimental que puede transformarse en una justiciera con el poder de manipular el trueno y el relámpago.",
              is_anonymous: "false",
            },
          ],
          [
            "En Sailor Moon, el personaje de anime Makoto Kino se transforma en: ",
            [
              "Marinero Mercurio",
              "Marinero Venus",
              "Marinero Jupiter",
              "Marinero Marte",
            ],
            {
              type: "quiz",
              correct_option_id: 2,
              open_period: 2,
              explanation:
                "Es presentada como una adolescente fuerte y sentimental que puede transformarse en una justiciera con el poder de manipular el trueno y el relámpago.",
              is_anonymous: "false",
            }
          ],
          [
            "¿En qué serie de anime el personaje principal es conocido como Hokage?",
            [
              "One piece",
              "Naruto",
              "Dragón Ball Z",
              "Bleach",
            ],
            {
              type: "quiz",
              correct_option_id: 1,
              open_period: 2,
              explanation:
                "El protagonista lleva una banda ninja en la frente.",
              is_anonymous: "false",
            }
          ],
        ];
        var ma = Math.random();
        var rosa = Math.floor(ma * quises.length);
        bot.sendPoll(msg.chat.id, quises[rosa][0], quises[rosa][1], quises[rosa][2]);
      });
}