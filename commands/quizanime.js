module.exports = function (bot){

  bot.onText(/^\.quiz|^\/quiz/, (msg) => {
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
        [
          "¿En qué anime un joven llamado Luffy busca el One Piece?",
          [
            "One piece",
            "Naruto",
            "Dragón Ball Z",
            "Bleach",
          ],
          {
            type: "quiz",
            correct_option_id: 0,
            open_period: 2,
            explanation:
              "El protagonista tiene una habilidad elástica debido a que comió una fruta del diablo.",
            is_anonymous: "false",
          }
        ],
        [
          "¿Qué tipo de criatura es Pikachu en Pokémon?",
          [
            "Dragón",
            "Ratón eléctrico",
            "Fantasma",
            "Planta",
          ],
          {
            type: "quiz",
            correct_option_id: 1,
            open_period: 2,
            explanation:
              "Es conocido por su color amarillo y sus poderes eléctricos.",
            is_anonymous: "false",
          }
        ],
        [
          "¿Cuál es el verdadero nombre del protagonista en Sword Art Online?",
          [
            "Mikasa",
            "Eren",
            "Kirito",
            "Asuna",
          ],
          {
            type: "quiz",
            correct_option_id: 2,
            open_period: 2,
            explanation:
              "Su nombre real es Kazuto Kirigaya",
            is_anonymous: "false",
          }
        ],
        [
          "¿En qué serie de anime los personajes luchan contra criaturas conocidas como Angels?",
          [
            "Code Geass",
            "Neon Genesis Evangelion",
            "Gurren Lagann",
            "Steins Gate",
          ],
          {
            type: "quiz",
            correct_option_id: 1,
            open_period: 2,
            explanation:
              "Los pilotos de Evas son jóvenes con habilidades especiales.",
            is_anonymous: "false",
          }
        ],
        [
          "¿En qué serie de anime los personajes enfrentan desafíos psicológicos y de supervivencia en un juego mortal?",
          [
            "Mirai Nikki (Future Diary)",
            "Btooom!",
            "Sword Art Online",
            "Steins Gate",
          ],
          {
            type: "quiz",
            correct_option_id: 2,
            open_period: 2,
            explanation:
              "Los jugadores quedan atrapados en un mundo virtual y deben luchar por sus vidas.",
            is_anonymous: "false",
          }
        ],
        [
          "¿En qué serie de anime los personajes enfrentan desafíos psicológicos y de supervivencia en un juego mortal?",
          [
            "Mirai Nikki (Future Diary)",
            "Btooom!",
            "Sword Art Online",
            "Steins Gate",
          ],
          {
            type: "quiz",
            correct_option_id: 2,
            open_period: 2,
            explanation:
              "Los jugadores quedan atrapados en un mundo virtual y deben luchar por sus vidas.",
            is_anonymous: "false",
          }
        ],
        [
          "¿Cuál es el nombre del personaje principal en Death Parade, quien gestiona un bar donde se juegan juegos mortales para decidir el destino de las almas?",
          [
            "Chiyuki",
            "Decim",
            "Nona",
            "Ginti",
          ],
          {
            type: "quiz",
            correct_option_id: 1,
            open_period: 2,
            explanation:
              "Tiene la habilidad de juzgar a las almas de los difuntos en base a sus acciones en los juegos.",
            is_anonymous: "false",
          }
        ],
        [
          "¿Cuál es el nombre del protagonista en The Promised Neverland, donde los niños intentan escapar de un orfanato lleno de secretos oscuros?",
          [
          "Emma",
          "Norman",
          "Ray",
          "Isabella",
          ],
          {
          type: "quiz",
          correct_option_id: 0,
          open_period: 2,
          explanation:
          "Es la líder de los niños en su intento por escapar.",
          is_anonymous: "false",
          }
          ],
          
          [
          "¿En qué serie de anime los personajes deben sobrevivir en un mundo post-apocalíptico lleno de criaturas llamadas Kabane?",
          [
          "Kabaneri of the Iron Fortress",
          "Dr. Stone",
          "Made in Abyss",
          "Darling in the Franxx",
          ],
          {
          type: "quiz",
          correct_option_id: 0,
          open_period: 2,
          explanation:
          "Los humanos viven en ciudades fortificadas y viajan en trenes blindados.",
          is_anonymous: "false",
          }
          ],
          [
            "¿Cuál es el nombre del protagonista en Demon Slayer, cuya hermana se convierte en un demonio y busca una cura para ella?",
            [
            "Tanjiro Kamado",
            "Zenitsu Agatsuma",
            "Inosuke Hashibira",
            "Giyu Tomioka",
            ],
            {
            type: "quiz",
            correct_option_id: 0,
            open_period: 2,
            explanation:
            "Es un hábil espadachín y utiliza una técnica de respiración especial.",
            is_anonymous: "false",
            }
            ],
            
            [
            "¿En qué serie de anime los personajes se enfrentan a criaturas conocidas como Titans en un mundo rodeado por enormes murallas?",
            [
            "Attack on Titan",
            "Vinland Saga",
            "The Rising of the Shield Hero",
            "Black Clover",
            ],
            {
            type: "quiz",
            correct_option_id: 0,
            open_period: 2,
            explanation:
            "Los humanos luchan por su supervivencia dentro de los muros contra los titanes.",
            is_anonymous: "false",
            }
            ],
            
            [
            "¿Cuál es el nombre del protagonista en Jujutsu Kaisen, un estudiante que se involucra en un mundo de maldiciones y artes marciales sobrenaturales?",
            [
            "Yuji Itadori",
            "Megumi Fushiguro",
            "Nobara Kugisaki",
            "Satoru Gojo",
            ],
            {
            type: "quiz",
            correct_option_id: 0,
            open_period: 2,
            explanation:
            "Es poseedor de una maldición poderosa y se une a una escuela de hechiceros.",
            is_anonymous: "false",
            }
            ],
            [
              "¿En qué serie de anime los personajes deben sobrevivir en un mundo virtual donde la muerte en el juego significa la muerte en la vida real?",
              [
              "Sword Art Online",
              "Log Horizon",
              "Overlord",
              "Accel World",
              ],
              {
              type: "quiz",
              correct_option_id: 0,
              open_period: 2,
              explanation:
              "Los jugadores luchan por completar niveles y desafíos para escapar del juego.",
              is_anonymous: "false",
              }
              ],
              
              [
              "¿Cuál es el nombre del protagonista en Vinland Saga, una historia épica de vikingos y conquista?",
              [
              "Thorfinn",
              "Askeladd",
              "Canute",
              "Leif Erikson",
              ],
              {
              type: "quiz",
              correct_option_id: 0,
              open_period: 2,
              explanation:
              "Busca venganza contra el asesino de su padre y viaja por el mundo vikingo.",
              is_anonymous: "false",
              }
              ],
              
              [
              "¿En qué serie de anime los personajes deben enfrentar pruebas y desafíos en una escuela de magia para convertirse en hechiceros reconocidos?",
              [
              "The Irregular at Magic High School",
              "Little Witch Academia",
              "The Misfit of Demon King Academy",
              "Mairimashita! Iruma-kun",
              ],
              {
              type: "quiz",
              correct_option_id: 1,
              open_period: 2,
              explanation:
              "La protagonista, Akko Kagari, sueña con convertirse en una bruja como su ídolo.",
              is_anonymous: "false",
              }
              ],
              [
                "¿Cuál es el nombre del protagonista en Beastars, una serie que explora las relaciones entre herbívoros y carnívoros en una escuela secundaria?",
                [
                "Legoshi",
                "Haru",
                "Louis",
                "Juno",
                ],
                {
                type: "quiz",
                correct_option_id: 0,
                open_period: 2,
                explanation:
                "Es un lobo gris con un lado gentil pero también lucha con su naturaleza predadora.",
                is_anonymous: "false",
                }
                ],
                
                [
                "¿En qué serie de anime los personajes deben luchar contra criaturas conocidas como 'Angels'?",
                [
                "Code Geass",
                "Neon Genesis Evangelion",
                "Gurren Lagann",
                "Steins;Gate",
                ],
                {
                type: "quiz",
                correct_option_id: 1,
                open_period: 2,
                explanation:
                "Los pilotos de Evas son jóvenes con habilidades especiales.",
                is_anonymous: "false",
                }
                ],
                
                [
                "¿Cuál es el nombre del protagonista en Serial Experiments Lain, quien se adentra en el mundo de la realidad virtual y la conciencia colectiva?",
                [
                "Lain Iwakura",
                "Tetsuo Shima",
                "Motoko Kusanagi",
                "Koyomi Araragi",
                ],
                {
                type: "quiz",
                correct_option_id: 0,
                open_period: 2,
                explanation:
                "Tiene dificultades para distinguir entre la realidad y la realidad virtual.",
                is_anonymous: "false",
                }
                ],
                [
                  "¿En qué serie de anime los personajes deben resolver misterios sobrenaturales relacionados con un videojuego llamado 'Elder Tale'?",
                  [
                  "Log Horizon",
                  "No Game No Life",
                  "Overlord",
                  "Sword Art Online",
                  ],
                  {
                  type: "quiz",
                  correct_option_id: 0,
                  open_period: 2,
                  explanation:
                  "Los jugadores se encuentran atrapados dentro del juego después de una actualización.",
                  is_anonymous: "false",
                  }
                  ],
                  
                  [
                  "¿Cuál es el nombre del protagonista en Psycho-Pass, una serie donde el crimen es predecido por un sistema de vigilancia?",
                  [
                  "Shinya Kogami",
                  "Akane Tsunemori",
                  "Makishima Shogo",
                  "Nobuchika Ginoza",
                  ],
                  {
                  type: "quiz",
                  correct_option_id: 1,
                  open_period: 2,
                  explanation:
                  "Ella comienza como una inspector novata en la División de Criminología.",
                  is_anonymous: "false",
                  }
                  ],
                  
                  [
                  "¿Cuál es el nombre del protagonista en Ghost in the Shell: Stand Alone Complex, una serie de ciberpunk sobre operativos especiales?",
                  [
                  "Batou",
                  "Motoko Kusanagi",
                  "Togusa",
                  "Aramaki",
                  ],
                  {
                  type: "quiz",
                  correct_option_id: 1,
                  open_period: 2,
                  explanation:
                  "Es mayormente cíborg y líder de la Sección 9.",
                  is_anonymous: "false",
                  }
                  ],
                  [
                    "En el anime 'Attack on Titan', ¿cuál es el nombre del protagonista principal que jura vengarse de los titanes tras un devastador ataque?",
                    [
                    "Eren Yeager",
                    "Armin Arlert",
                    "Mikasa Ackerman",
                    "Levi Ackerman",
                    ],
                    {
                    type: "quiz",
                    correct_option_id: 0,
                    open_period: 2,
                    explanation:
                    "Eren Yeager es el protagonista principal que jura vengarse de los titanes.",
                    is_anonymous: "false",
                    }
                    ],
                    
                    [
                    "En el anime 'One Punch Man', ¿cuál es el nombre del protagonista que es conocido por derrotar a sus oponentes con un solo golpe?",
                    [
                    "Saitama",
                    "Genos",
                    "King",
                    "Bang",
                    ],
                    {
                    type: "quiz",
                    correct_option_id: 0,
                    open_period: 2,
                    explanation:
                    "Saitama es el protagonista conocido por derrotar a sus oponentes con un solo golpe.",
                    is_anonymous: "false",
                    }
                    ],
                    
                    [
                    "En el anime 'Tokyo Ghoul', ¿cuál es el nombre del protagonista que se convierte en mitad ghoul después de un encuentro fatal?",
                    [
                    "Ken Kaneki",
                    "Touka Kirishima",
                    "Rize Kamishiro",
                    "Hideyoshi Nagachika",
                    ],
                    {
                    type: "quiz",
                    correct_option_id: 0,
                    open_period: 2,
                    explanation:
                    "Ken Kaneki es el protagonista que se convierte en mitad ghoul después de un encuentro fatal.",
                    is_anonymous: "false",
                    }
                    ],
                    [
                      "En el anime 'Naruto', ¿cuál es el nombre del sensei de Naruto, Sasuke y Sakura en el Equipo 7?",
                      [
                      "Kakashi Hatake",
                      "Jiraiya",
                      "Orochimaru",
                      "Hiruzen Sarutobi",
                      ],
                      {
                      type: "quiz",
                      correct_option_id: 0,
                      open_period: 2,
                      explanation:
                      "Kakashi Hatake es el sensei de Naruto, Sasuke y Sakura en el Equipo 7.",
                      is_anonymous: "false",
                      }
                      ],
                      
                      [
                      "En el anime 'My Hero Academia', ¿cuál es el nombre del protagonista que nace sin superpoderes pero sueña con convertirse en un héroe?",
                      [
                      "Izuku Midoriya",
                      "Katsuki Bakugo",
                      "Shoto Todoroki",
                      "Ochaco Uraraka",
                      ],
                      {
                      type: "quiz",
                      correct_option_id: 0,
                      open_period: 2,
                      explanation:
                      "Izuku Midoriya es el protagonista que nace sin superpoderes pero sueña con convertirse en un héroe.",
                      is_anonymous: "false",
                      }
                      ],
                      [
                        "En el anime 'Steins;Gate', ¿cuál es el nombre del protagonista que descubre la posibilidad de enviar mensajes al pasado?",
                        [
                        "Rintarou Okabe",
                        "Kurisu Makise",
                        "Mayuri Shiina",
                        "Itaru Hashida",
                        ],
                        {
                        type: "quiz",
                        correct_option_id: 0,
                        open_period: 2,
                        explanation:
                        "Rintarou Okabe es el protagonista que descubre la posibilidad de enviar mensajes al pasado.",
                        is_anonymous: "false",
                        }
                        ],
                        
                        [
                        "En el anime 'Hunter x Hunter', ¿cuál es el nombre del protagonista que busca encontrar a su padre, un legendario cazador?",
                        [
                        "Gon Freecss",
                        "Killua Zoldyck",
                        "Kurapika",
                        "Leorio Paradinight",
                        ],
                        {
                        type: "quiz",
                        correct_option_id: 0,
                        open_period: 2,
                        explanation:
                        "Gon Freecss es el protagonista que busca encontrar a su padre, un legendario cazador.",
                        is_anonymous: "false",
                        }
                        ],
                        
                        [
                        "En el anime 'Death Note', ¿cuál es el nombre del protagonista que encuentra un cuaderno que puede matar a cualquier persona cuyo nombre sea escrito en él?",
                        [
                        "Light Yagami",
                        "L Lawliet",
                        "Misa Amane",
                        "Ryuk",
                        ],
                        {
                        type: "quiz",
                        correct_option_id: 0,
                        open_period: 2,
                        explanation:
                        "Light Yagami es el protagonista que encuentra el Death Note y comienza a usarlo para imponer su propia justicia.",
                        is_anonymous: "false",
                        }
                        ],
                        [
                          "En el anime 'Attack on Titan', ¿cuál es el nombre del líder carismático del Escuadrón de Exploración?",
                          [
                          "Erwin Smith",
                          "Levi Ackerman",
                          "Hange Zoë",
                          "Jean Kirstein",
                          ],
                          {
                          type: "quiz",
                          correct_option_id: 1,
                          open_period: 2,
                          explanation:
                          "Levi Ackerman es el líder carismático del Escuadrón de Exploración.",
                          is_anonymous: "false",
                          }
                          ],
                          
                          [
                          "En el anime 'One Piece', ¿cuál es el nombre del pirata que busca convertirse en el Rey de los Piratas?",
                          [
                          "Monkey D. Luffy",
                          "Roronoa Zoro",
                          "Nami",
                          "Sanji",
                          ],
                          {
                          type: "quiz",
                          correct_option_id: 0,
                          open_period: 2,
                          explanation:
                          "Monkey D. Luffy es el pirata que busca convertirse en el Rey de los Piratas.",
                          is_anonymous: "false",
                          }
                          ],
                          
                          [
                          "En el anime 'Fate/Stay Night', ¿cuál es el nombre del protagonista que participa en la Guerra del Santo Grial?",
                          [
                          "Shirou Emiya",
                          "Rin Tohsaka",
                          "Saber",
                          "Archer",
                          ],
                          {
                          type: "quiz",
                          correct_option_id: 2,
                          open_period: 2,
                          explanation:
                          "Saber es uno de los personajes principales que participa en la Guerra del Santo Grial.",
                          is_anonymous: "false",
                          }
                          ],
                          [
                            "En el anime 'Tokyo Ghoul', ¿cuál es el nombre del investigador de la CCG que se convierte en un Ghoul?",
                            [
                            "Koutarou Amon",
                            "Juuzou Suzuya",
                            "Akira Mado",
                            "Kishou Arima",
                            ],
                            {
                            type: "quiz",
                            correct_option_id: 0,
                            open_period: 2,
                            explanation:
                            "Koutarou Amon es el investigador de la CCG que se convierte en un Ghoul.",
                            is_anonymous: "false",
                            }
                            ],
                            
                            [
                            "En el anime 'Attack on Titan', ¿cuál es el nombre del amigo cercano de Eren que se une al Escuadrón de Exploración?",
                            [
                            "Armin Arlert",
                            "Jean Kirstein",
                            "Connie Springer",
                            "Sasha Blouse",
                            ],
                            {
                            type: "quiz",
                            correct_option_id: 1,
                            open_period: 2,
                            explanation:
                            "Jean Kirstein es el amigo cercano de Eren que se une al Escuadrón de Exploración.",
                            is_anonymous: "false",
                            }
                            ],
                            
                            [
                            "En el anime 'My Hero Academia', ¿cuál es el nombre del profesor de la Clase 1-A conocido como 'Eraserhead'?",
                            [
                            "Shota Aizawa",
                            "Toshinori Yagi",
                            "Hizashi Yamada",
                            "Tenya Iida",
                            ],
                            {
                            type: "quiz",
                            correct_option_id: 0,
                            open_period: 2,
                            explanation:
                            "Shota Aizawa es el profesor de la Clase 1-A conocido como 'Eraserhead'.",
                            is_anonymous: "false",
                            }
                            ],
                            [
                              "En el anime 'Cowboy Bebop', ¿cuál es el nombre del protagonista cazarrecompensas que viaja por el espacio en la nave Bebop?",
                              [
                              "Spike Spiegel",
                              "Jet Black",
                              "Faye Valentine",
                              "Edward Wong Hau Pepelu Tivrusky IV",
                              ],
                              {
                              type: "quiz",
                              correct_option_id: 0,
                              open_period: 2,
                              explanation:
                              "Spike Spiegel es el protagonista cazarrecompensas de 'Cowboy Bebop'.",
                              is_anonymous: "false",
                              }
                              ],
                              
                              [
                              "En el anime 'Shouwa Genroku Rakugo Shinjuu', ¿cuál es el nombre del personaje principal que busca convertirse en un maestro de rakugo?",
                              [
                              "Yotaro",
                              "Yakumo Yuurakutei",
                              "Sukeroku",
                              "Konatsu",
                              ],
                              {
                              type: "quiz",
                              correct_option_id: 1,
                              open_period: 2,
                              explanation:
                              "Yakumo Yuurakutei es el personaje principal que busca convertirse en un maestro de rakugo.",
                              is_anonymous: "false",
                              }
                              ],
                              
                              [
                              "En el anime 'Made in Abyss', ¿cuál es el nombre de la protagonista que desea seguir los pasos de su madre explorando el abismo?",
                              [
                              "Riko",
                              "Reg",
                              "Nanachi",
                              "Ozen",
                              ],
                              {
                              type: "quiz",
                              correct_option_id: 0,
                              open_period: 2,
                              explanation:
                              "Riko es la protagonista que desea seguir los pasos de su madre explorando el abismo en 'Made in Abyss'.",
                              is_anonymous: "false",
                              }
                              ],
                              [
                                "En el anime 'Bakemonogatari', ¿cuál es el nombre del protagonista que se ve envuelto en situaciones sobrenaturales con chicas afectadas por maldiciones?",
                                [
                                "Koyomi Araragi",
                                "Hitagi Senjougahara",
                                "Shinobu Oshino",
                                "Tsubasa Hanekawa",
                                ],
                                {
                                type: "quiz",
                                correct_option_id: 0,
                                open_period: 2,
                                explanation:
                                "Koyomi Araragi es el protagonista de 'Bakemonogatari' involucrado en situaciones sobrenaturales.",
                                is_anonymous: "false",
                                }
                                ],
                                
                                [
                                "En el anime 'Planetes', ¿cuál es el nombre del protagonista que trabaja en una empresa de eliminación de basura espacial en el futuro?",
                                [
                                "Hachirota Hoshino",
                                "Ai Tanabe",
                                "Fee Carmichael",
                                "Yuri Mihairokov",
                                ],
                                {
                                type: "quiz",
                                correct_option_id: 0,
                                open_period: 2,
                                explanation:
                                "Hachirota Hoshino es el protagonista de 'Planetes' que trabaja en la eliminación de basura espacial.",
                                is_anonymous: "false",
                                }
                                ],
                                
                                [
                                "En el anime 'Mushishi', ¿cuál es el nombre del protagonista que viaja por el Japón feudal resolviendo problemas causados por criaturas místicas llamadas 'Mushi'?",
                                [
                                "Ginko",
                                "Adashino",
                                "Nui",
                                "Renzu",
                                ],
                                {
                                type: "quiz",
                                correct_option_id: 0,
                                open_period: 2,
                                explanation:
                                "Ginko es el protagonista de 'Mushishi' que viaja resolviendo problemas relacionados con 'Mushi'.",
                                is_anonymous: "false",
                                }
                                ],
                                [
                                  "En el anime 'Hyouka', ¿cuál es el nombre del protagonista que se une al club de literatura clásica y descubre misterios en su escuela?",
                                  [
                                  "Houtarou Oreki",
                                  "Eru Chitanda",
                                  "Satoshi Fukube",
                                  "Mayaka Ibara",
                                  ],
                                  {
                                  type: "quiz",
                                  correct_option_id: 0,
                                  open_period: 2,
                                  explanation:
                                  "Houtarou Oreki es el protagonista de 'Hyouka' que se une al club de literatura clásica.",
                                  is_anonymous: "false",
                                  }
                                  ],
                                  
                                  [
                                  "En el anime 'Serial Experiments Lain', ¿cuál es el nombre de la protagonista que se sumerge en un mundo virtual y experimenta cambios en la realidad?",
                                  [
                                  "Lain Iwakura",
                                  "Alice Mizuki",
                                  "Mika",
                                  "Reika Yamamoto",
                                  ],
                                  {
                                  type: "quiz",
                                  correct_option_id: 0,
                                  open_period: 2,
                                  explanation:
                                  "Lain Iwakura es la protagonista de 'Serial Experiments Lain' que se sumerge en un mundo virtual.",
                                  is_anonymous: "false",
                                  }
                                  ],
                                  
                                  [
                                  "En el anime 'Psycho-Pass', ¿cuál es el nombre de la inspectora novata que se une a la División de Criminología para cazar criminales?",
                                  [
                                  "Akane Tsunemori",
                                  "Shinya Kogami",
                                  "Makishima Shogo",
                                  "Nobuchika Ginoza",
                                  ],
                                  {
                                  type: "quiz",
                                  correct_option_id: 0,
                                  open_period: 2,
                                  explanation:
                                  "Akane Tsunemori es la inspectora novata de 'Psycho-Pass' que se une a la División de Criminología.",
                                  is_anonymous: "false",
                                  }
                                  ],
                                  [
                                    "En el anime 'Shingeki no Bahamut: Genesis', ¿cuál es el nombre del protagonista que se encuentra con una misteriosa chica con poderes inusuales?",
                                    [
                                    "Favaro Leone",
                                    "Kaisar Lidfard",
                                    "Rita",
                                    "Amira",
                                    ],
                                    {
                                    type: "quiz",
                                    correct_option_id: 3,
                                    open_period: 2,
                                    explanation:
                                    "Amira es la misteriosa chica con poderes inusuales en 'Shingeki no Bahamut: Genesis'.",
                                    is_anonymous: "false",
                                    }
                                    ],
                                    
                                    [
                                    "En el anime 'Baccano!', ¿cuál es el nombre del grupo de personajes inmortales que se ven envueltos en historias de mafia y misterio en la década de 1930?",
                                    [
                                    "Isaac y Miria",
                                    "Ladd Russo y Graham Specter",
                                    "Claire Stanfield y Chane Laforet",
                                    "Szilard Quates y Maiza Avaro",
                                    ],
                                    {
                                    type: "quiz",
                                    correct_option_id: 0,
                                    open_period: 2,
                                    explanation:
                                    "Isaac y Miria son el grupo de personajes inmortales en 'Baccano!' que se ven envueltos en historias de mafia y misterio.",
                                    is_anonymous: "false",
                                    }
                                    ],
                                    
                                    [
                                    "En el anime 'Durarara!!', ¿cuál es el nombre del protagonista que se muda a Ikebukuro y se ve envuelto en conflictos entre pandillas urbanas?",
                                    [
                                    "Mikado Ryuugamine",
                                    "Celty Sturluson",
                                    "Shizuo Heiwajima",
                                    "Izaya Orihara",
                                    ],
                                    {
                                    type: "quiz",
                                    correct_option_id: 0,
                                    open_period: 2,
                                    explanation:
                                    "Mikado Ryuugamine es el protagonista de 'Durarara!!' que se muda a Ikebukuro y se ve envuelto en conflictos entre pandillas urbanas.",
                                    is_anonymous: "false",
                                    }
                                    ],
                                    [
                                      "En el anime 'Paranoia Agent', ¿cuál es el nombre del misterioso joven que ataca a la gente con una porra dorada?",
                                      [
                                      "Shounen Bat",
                                      "Tsukiko Sagi",
                                      "Detective Keiichi Ikari",
                                      "Maromi",
                                      ],
                                      {
                                      type: "quiz",
                                      correct_option_id: 0,
                                      open_period: 2,
                                      explanation:
                                      "'Shounen Bat' es el nombre del misterioso joven en 'Paranoia Agent' que ataca a la gente con una porra dorada.",
                                      is_anonymous: "false",
                                      }
                                      ],
                                      
                                      [
                                      "En el anime 'Trigun', ¿cuál es el nombre del protagonista buscado por destruir varias ciudades pero que en realidad intenta evitar el conflicto?",
                                      [
                                      "Vash the Stampede",
                                      "Nicholas D. Wolfwood",
                                      "Meryl Stryfe",
                                      "Millie Thompson",
                                      ],
                                      {
                                      type: "quiz",
                                      correct_option_id: 0,
                                      open_period: 2,
                                      explanation:
                                      "'Vash the Stampede' es el protagonista de 'Trigun' buscado por destruir varias ciudades pero que en realidad intenta evitar el conflicto.",
                                      is_anonymous: "false",
                                      }
                                      ],
                                      
                                      [
                                      "En el anime 'Neon Genesis Evangelion', ¿cuál es el nombre del piloto del Evangelion Unidad-01, conocido por su actitud reservada y problemas emocionales?",
                                      [
                                      "Shinji Ikari",
                                      "Asuka Langley Soryu",
                                      "Rei Ayanami",
                                      "Kaworu Nagisa",
                                      ],
                                      {
                                      type: "quiz",
                                      correct_option_id: 0,
                                      open_period: 2,
                                      explanation:
                                      "'Shinji Ikari' es el piloto del Evangelion Unidad-01 en 'Neon Genesis Evangelion', conocido por su actitud reservada y problemas emocionales.",
                                      is_anonymous: "false",
                                      }
                                      ],
                                      [
                                        "En el anime 'Elfen Lied', ¿cuál es el nombre de la protagonista con cuernos y poderes telequinéticos que escapa de un laboratorio?",
                                        [
                                        "Lucy",
                                        "Nana",
                                        "Kouta",
                                        "Yuka",
                                        ],
                                        {
                                        type: "quiz",
                                        correct_option_id: 0,
                                        open_period: 2,
                                        explanation:
                                        "Lucy es la protagonista de 'Elfen Lied' con cuernos y poderes telequinéticos que escapa de un laboratorio.",
                                        is_anonymous: "false",
                                        }
                                        ],
                                        
                                        [
                                        "En el anime 'Another', ¿cuál es el nombre del personaje principal que descubre secretos macabros relacionados con una maldición en su clase?",
                                        [
                                        "Kouichi Sakakibara",
                                        "Misaki Mei",
                                        "Reiko Mikami",
                                        "Izumi Akazawa",
                                        ],
                                        {
                                        type: "quiz",
                                        correct_option_id: 0,
                                        open_period: 2,
                                        explanation:
                                        "Kouichi Sakakibara es el personaje principal de 'Another' que descubre secretos macabros en su clase.",
                                        is_anonymous: "false",
                                        }
                                        ],
                                        
                                        [
                                        "En el anime 'Clannad', ¿cuál es el nombre del protagonista que intenta ayudar a diversas personas en su escuela mientras lidia con su propio dolor?",
                                        [
                                        "Tomoya Okazaki",
                                        "Nagisa Furukawa",
                                        "Kotomi Ichinose",
                                        "Fuko Ibuki",
                                        ],
                                        {
                                        type: "quiz",
                                        correct_option_id: 0,
                                        open_period: 2,
                                        explanation:
                                        "Tomoya Okazaki es el protagonista de 'Clannad' que intenta ayudar a diversas personas en su escuela mientras lidia con su propio dolor.",
                                        is_anonymous: "false",
                                        }
                                        ],
                                        [
                                          "En el anime 'Puella Magi Madoka Magica', ¿cuál es el nombre de la protagonista que se ve envuelta en un contrato para convertirse en una chica mágica?",
                                          [
                                          "Madoka Kaname",
                                          "Homura Akemi",
                                          "Sayaka Miki",
                                          "Mami Tomoe",
                                          ],
                                          {
                                          type: "quiz",
                                          correct_option_id: 1,
                                          open_period: 2,
                                          explanation:
                                          "Homura Akemi es una de las protagonistas de 'Puella Magi Madoka Magica' que se ve envuelta en un contrato para convertirse en una chica mágica.",
                                          is_anonymous: "false",
                                          }
                                          ],
                                          
                                          [
                                          "En el anime 'Higurashi no Naku Koro ni', ¿cuál es el nombre de la protagonista que se muda a un pueblo donde ocurren eventos misteriosos y violentos?",
                                          [
                                          "Keiichi Maebara",
                                          "Rika Furude",
                                          "Mion Sonozaki",
                                          "Satoko Houjou",
                                          ],
                                          {
                                          type: "quiz",
                                          correct_option_id: 3,
                                          open_period: 2,
                                          explanation:
                                          "Satoko Houjou es una de las protagonistas de 'Higurashi no Naku Koro ni' que se muda a un pueblo con eventos misteriosos y violentos.",
                                          is_anonymous: "false",
                                          }
                                          ],
                                          
                                          [
                                          "En el anime 'Shiki', ¿cuál es el nombre del médico que investiga una serie de muertes inexplicables en su pueblo?",
                                          [
                                          "Toshio Ozaki",
                                          "Seishin Muroi",
                                          "Natsuno Yuuki",
                                          "Megumi Shimizu",
                                          ],
                                          {
                                          type: "quiz",
                                          correct_option_id: 0,
                                          open_period: 2,
                                          explanation:
                                          "Toshio Ozaki es el médico protagonista de 'Shiki' que investiga una serie de muertes inexplicables en su pueblo.",
                                          is_anonymous: "false",
                                          }
                                          ],
                                          [
                                            "En el anime 'Paranoia Agent', ¿cuál es el nombre del detective que investiga los ataques de Shounen Bat?",
                                            [
                                            "Keiichi Ikari",
                                            "Mitsuhiro Maniwa",
                                            "Masami Hirukawa",
                                            "Ikari",
                                            ],
                                            {
                                            type: "quiz",
                                            correct_option_id: 1,
                                            open_period: 2,
                                            explanation:
                                            "Mitsuhiro Maniwa es el detective que investiga los ataques de Shounen Bat en 'Paranoia Agent'.",
                                            is_anonymous: "false",
                                            }
                                            ],
                                            
                                            [
                                            "En el anime 'Gankutsuou: El Conde de Montecristo', ¿cuál es el nombre del noble que planea su venganza bajo la identidad de 'Gankutsuou'?",
                                            [
                                            "Albert de Morcerf",
                                            "Franz d'Epinay",
                                            "Edmond Dantes",
                                            "Viscount Albert de Morcerf",
                                            ],
                                            {
                                            type: "quiz",
                                            correct_option_id: 3,
                                            open_period: 2,
                                            explanation:
                                            "'Gankutsuou' es la identidad bajo la cual el Conde de Montecristo planea su venganza en el anime.",
                                            is_anonymous: "false",
                                            }
                                            ],
                                            
                                            [
                                            "En el anime 'Shinsekai Yori', ¿cuál es el nombre de la protagonista que descubre los oscuros secretos de su sociedad distópica?",
                                            [
                                            "Saki Watanabe",
                                            "Satoru Asahina",
                                            "Shun Aonuma",
                                            "Maria Akizuki",
                                            ],
                                            {
                                            type: "quiz",
                                            correct_option_id: 0,
                                            open_period: 2,
                                            explanation:
                                            "Saki Watanabe es la protagonista de 'Shinsekai Yori' que descubre los oscuros secretos de su sociedad distópica.",
                                            is_anonymous: "false",
                                            }
                                            ],
                                            [
                                              "En el anime 'Clannad: After Story', ¿cuál es el nombre del personaje principal masculino que enfrenta diversas tragedias mientras intenta encontrar significado en su vida?",
                                              [
                                              "Tomoya Okazaki",
                                              "Nagisa Furukawa",
                                              "Kotomi Ichinose",
                                              "Fuko Ibuki",
                                              ],
                                              {
                                              type: "quiz",
                                              correct_option_id: 0,
                                              open_period: 2,
                                              explanation:
                                              "Tomoya Okazaki es el personaje principal masculino de 'Clannad: After Story' que enfrenta diversas tragedias en su vida.",
                                              is_anonymous: "false",
                                              }
                                              ],
                                              
                                              [
                                              "En el anime 'Rainbow: Nisha Rokubou no Shichinin', ¿cuál es el nombre del personaje que lidera a un grupo de jóvenes en una prisión juvenil, enfrentando condiciones extremas?",
                                              [
                                              "Mario Minakami",
                                              "Joe Sakuragi",
                                              "Noboru Maeda",
                                              "Rokurouta Sakuragi",
                                              ],
                                              {
                                              type: "quiz",
                                              correct_option_id: 3,
                                              open_period: 2,
                                              explanation:
                                              "Rokurouta Sakuragi es el personaje de 'Rainbow' que lidera a un grupo de jóvenes en una prisión juvenil, enfrentando condiciones extremas.",
                                              is_anonymous: "false",
                                              }
                                              ],
                                              
                                              [
                                              "En el anime 'A Silent Voice', ¿cuál es el nombre de la protagonista femenina que intenta reconciliarse con un compañero de clase que acosó en la escuela primaria?",
                                              [
                                              "Shouko Nishimiya",
                                              "Shouya Ishida",
                                              "Yuzuru Nishimiya",
                                              "Miki Kawai",
                                              ],
                                              {
                                              type: "quiz",
                                              correct_option_id: 0,
                                              open_period: 2,
                                              explanation:
                                              "Shouko Nishimiya es la protagonista femenina de 'A Silent Voice' que intenta reconciliarse con un compañero de clase que acosó en la escuela primaria.",
                                              is_anonymous: "false",
                                              }
                                              ],
                                              [
                                                "En el anime 'Welcome to the NHK', ¿cuál es el nombre del protagonista que lucha contra su reclusión social y paranoia?",
                                                [
                                                "Satou Tatsuhiro",
                                                "Misaki Nakahara",
                                                "Kaoru Yamazaki",
                                                "Hitomi Kashiwa",
                                                ],
                                                {
                                                type: "quiz",
                                                correct_option_id: 0,
                                                open_period: 2,
                                                explanation:
                                                "Satou Tatsuhiro es el protagonista de 'Welcome to the NHK' que lucha contra su reclusión social y paranoia.",
                                                is_anonymous: "false",
                                                }
                                                ],
                                                
                                                [
                                                "En el anime 'Grave of the Fireflies', ¿cuál es el nombre del protagonista que lucha por sobrevivir junto a su hermana menor en Japón durante la Segunda Guerra Mundial?",
                                                [
                                                "Seita Yokokawa",
                                                "Setsuko Yokokawa",
                                                "Natsu Yasumi",
                                                "Keiko Ogino",
                                                ],
                                                {
                                                type: "quiz",
                                                correct_option_id: 0,
                                                open_period: 2,
                                                explanation:
                                                "Seita Yokokawa es el protagonista de 'Grave of the Fireflies' que lucha por sobrevivir junto a su hermana menor durante la Segunda Guerra Mundial.",
                                                is_anonymous: "false",
                                                }
                                                ],
                                                
                                                [
                                                "En el anime 'Violet Evergarden', ¿cuál es el nombre de la protagonista que busca comprender el significado de las emociones humanas después de la guerra?",
                                                [
                                                "Violet Evergarden",
                                                "Gilbert Bougainvillea",
                                                "Claudia Hodgins",
                                                "Cattleya Baudelaire",
                                                ],
                                                {
                                                type: "quiz",
                                                correct_option_id: 0,
                                                open_period: 2,
                                                explanation:
                                                "Violet Evergarden es la protagonista de 'Violet Evergarden' que busca comprender el significado de las emociones humanas después de la guerra.",
                                                is_anonymous: "false",
                                                }
                                                ],
                                                [
                                                  "En el anime 'Shouwa Genroku Rakugo Shinjuu', ¿cuál es el nombre del protagonista que busca convertirse en un maestro de rakugo, un tipo de narración cómica tradicional japonesa?",
                                                  [
                                                  "Yotarou",
                                                  "Yakumo Yuurakutei",
                                                  "Konatsu",
                                                  "Sukeroku",
                                                  ],
                                                  {
                                                  type: "quiz",
                                                  correct_option_id: 1,
                                                  open_period: 2,
                                                  explanation:
                                                  "Yakumo Yuurakutei es el protagonista de 'Shouwa Genroku Rakugo Shinjuu' que busca convertirse en un maestro de rakugo.",
                                                  is_anonymous: "false",
                                                  }
                                                  ],
                                                  
                                                  [
                                                  "En el anime 'Ping Pong the Animation', ¿cuál es el nombre del personaje que enfrenta dilemas personales mientras se dedica al tenis de mesa?",
                                                  [
                                                  "Makoto Tsukimoto",
                                                  "Yutaka Hoshino",
                                                  "Ryuichi Kazama",
                                                  "Kong Wenge",
                                                  ],
                                                  {
                                                  type: "quiz",
                                                  correct_option_id: 0,
                                                  open_period: 2,
                                                  explanation:
                                                  "Makoto Tsukimoto es el personaje de 'Ping Pong the Animation' que enfrenta dilemas personales mientras se dedica al tenis de mesa.",
                                                  is_anonymous: "false",
                                                  }
                                                  ],
                                                  
                                                  [
                                                  "En el anime 'Natsume Yuujinchou', ¿cuál es el nombre del protagonista que hereda el Libro de Amigos de su abuela y se relaciona con espíritus?",
                                                  [
                                                  "Takashi Natsume",
                                                  "Madara",
                                                  "Touko Fujiwara",
                                                  "Shuuichi Natori",
                                                  ],
                                                  {
                                                  type: "quiz",
                                                  correct_option_id: 0,
                                                  open_period: 2,
                                                  explanation:
                                                  "Takashi Natsume es el protagonista de 'Natsume Yuujinchou' que hereda el Libro de Amigos y se relaciona con espíritus.",
                                                  is_anonymous: "false",
                                                  }
                                                ],
                                                [
                                                  "En el anime 'Fruits Basket', ¿cuál es el nombre del protagonista masculino que se ve envuelto con la familia Sohma y su maldición zodiacal?",
                                                  [
                                                  "Tohru Honda",
                                                  "Yuki Sohma",
                                                  "Kyo Sohma",
                                                  "Shigure Sohma",
                                                  ],
                                                  {
                                                  type: "quiz",
                                                  correct_option_id: 2,
                                                  open_period: 2,
                                                  explanation:
                                                  "Kyo Sohma es el protagonista masculino de 'Fruits Basket' que se ve envuelto con la familia Sohma y su maldición zodiacal.",
                                                  is_anonymous: "false",
                                                  }
                                                  ],
                                                  
                                                  [
                                                  "En el anime 'Honey and Clover', ¿cuál es el nombre del personaje que enfrenta sus sentimientos no correspondidos hacia su amiga de la infancia?",
                                                  [
                                                  "Takumi Mayama",
                                                  "Yuta Takemoto",
                                                  "Shinobu Morita",
                                                  "Ayumi Yamada",
                                                  ],
                                                  {
                                                  type: "quiz",
                                                  correct_option_id: 0,
                                                  open_period: 2,
                                                  explanation:
                                                  "Takumi Mayama es el personaje de 'Honey and Clover' que enfrenta sus sentimientos no correspondidos hacia su amiga de la infancia.",
                                                  is_anonymous: "false",
                                                  }
                                                  ],
                                                  
                                                  [
                                                  "En el anime 'Nana', ¿cuál es el nombre de la protagonista que busca cumplir su sueño musical en Tokio mientras enfrenta las complejidades de la vida adulta?",
                                                  [
                                                  "Nana Osaki",
                                                  "Nana Komatsu",
                                                  "Ren Honjo",
                                                  "Takumi Ichinose",
                                                  ],
                                                  {
                                                  type: "quiz",
                                                  correct_option_id: 1,
                                                  open_period: 2,
                                                  explanation:
                                                  "Nana Komatsu es la protagonista de 'Nana' que busca cumplir su sueño musical en Tokio mientras enfrenta las complejidades de la vida adulta.",
                                                  is_anonymous: "false",
                                                  }
                                                  ],
                                                  [
                                                    "En el anime 'Monster', ¿cuál es el nombre del protagonista que se enfrenta al dilema moral de salvar a un niño que podría convertirse en un monstruo?",
                                                    [
                                                    "Kenzo Tenma",
                                                    "Johan Liebert",
                                                    "Nina Fortner",
                                                    "Inspector Lunge",
                                                    ],
                                                    {
                                                    type: "quiz",
                                                    correct_option_id: 0,
                                                    open_period: 2,
                                                    explanation:
                                                    "Kenzo Tenma es el protagonista de 'Monster' que se enfrenta al dilema moral de salvar a un niño que podría convertirse en un monstruo.",
                                                    is_anonymous: "false",
                                                    }
                                                    ],
                                                    
                                                    [
                                                    "En el anime 'Erased', ¿cuál es el nombre del protagonista que tiene la habilidad de retroceder en el tiempo para prevenir tragedias?",
                                                    [
                                                    "Satoru Fujinuma",
                                                    "Kayo Hinazuki",
                                                    "Airis Michima",
                                                    "Kenya Kobayashi",
                                                    ],
                                                    {
                                                    type: "quiz",
                                                    correct_option_id: 0,
                                                    open_period: 2,
                                                    explanation:
                                                    "Satoru Fujinuma es el protagonista de 'Erased' que tiene la habilidad de retroceder en el tiempo para prevenir tragedias.",
                                                    is_anonymous: "false",
                                                    }
                                                    ],
                                                    
                                                    [
                                                    "En el anime 'Texhnolyze', ¿cuál es el nombre del protagonista que se ve envuelto en un conflicto entre facciones en una ciudad subterránea?",
                                                    [
                                                    "Ichise",
                                                    "Ran",
                                                    "Doc",
                                                    "Onishi",
                                                    ],
                                                    {
                                                    type: "quiz",
                                                    correct_option_id: 0,
                                                    open_period: 2,
                                                    explanation:
                                                    "Ichise es el protagonista de 'Texhnolyze' que se ve envuelto en un conflicto entre facciones en una ciudad subterránea.",
                                                    is_anonymous: "false",
                                                    }
                                                    ],
                                                    [
                                                      "¿Cuál es el nombre del personaje principal en 'Death Note' que obtiene un cuaderno capaz de matar a cualquier persona cuyo nombre se escriba en él?",
                                                      [
                                                      "L Lawliet",
                                                      "Near",
                                                      "Light Yagami",
                                                      "Misa Amane",
                                                      ],
                                                      {
                                                      type: "quiz",
                                                      correct_option_id: 2,
                                                      open_period: 2,
                                                      explanation:
                                                      "Light Yagami es el personaje principal de 'Death Note' que obtiene un cuaderno capaz de matar a cualquier persona cuyo nombre se escriba en él.",
                                                      is_anonymous: "false",
                                                      }
                                                      ],
                                                      
                                                      [
                                                      "En la serie de anime 'Cowboy Bebop', ¿cuál es el nombre del cazarrecompensas protagonista que viaja por el espacio con su equipo?",
                                                      [
                                                      "Spike Spiegel",
                                                      "Jet Black",
                                                      "Faye Valentine",
                                                      "Edward Wong",
                                                      ],
                                                      {
                                                      type: "quiz",
                                                      correct_option_id: 0,
                                                      open_period: 2,
                                                      explanation:
                                                      "Spike Spiegel es el cazarrecompensas protagonista de 'Cowboy Bebop' que viaja por el espacio con su equipo.",
                                                      is_anonymous: "false",
                                                      }
                                                      ],
                                                      
                                                      [
                                                      "En el anime 'Ghost in the Shell: Stand Alone Complex', ¿cuál es el nombre de la mayor cyborg protagonista que lidera la unidad de operaciones especiales?",
                                                      [
                                                      "Batou",
                                                      "Togusa",
                                                      "Motoko Kusanagi",
                                                      "Ishikawa",
                                                      ],
                                                      {
                                                      type: "quiz",
                                                      correct_option_id: 2,
                                                      open_period: 2,
                                                      explanation:
                                                      "Motoko Kusanagi es la mayor cyborg protagonista de 'Ghost in the Shell: Stand Alone Complex' que lidera la unidad de operaciones especiales.",
                                                      is_anonymous: "false",
                                                      }
                                                      ],
                                                      [
                                                        "En el anime 'Your Lie in April', ¿cuál es el nombre del protagonista pianista que busca redescubrir su amor por la música?",
                                                        [
                                                        "Kaori Miyazono",
                                                        "Tsubaki Sawabe",
                                                        "Ryota Watari",
                                                        "Kousei Arima",
                                                        ],
                                                        {
                                                        type: "quiz",
                                                        correct_option_id: 3,
                                                        open_period: 2,
                                                        explanation:
                                                        "Kousei Arima es el protagonista de 'Your Lie in April' que busca redescubrir su amor por la música.",
                                                        is_anonymous: "false",
                                                        }
                                                        ],
                                                        
                                                        [
                                                        "En el anime 'Anohana: The Flower We Saw That Day', ¿cuál es el nombre del personaje que regresa como un espíritu para cumplir los deseos de su amiga de la infancia?",
                                                        [
                                                        "Naruko Anjou",
                                                        "Atsumu Matsuyuki",
                                                        "Tetsudou Hisakawa",
                                                        "Menma",
                                                        ],
                                                        {
                                                        type: "quiz",
                                                        correct_option_id: 3,
                                                        open_period: 2,
                                                        explanation:
                                                        "Menma es el personaje de 'Anohana: The Flower We Saw That Day' que regresa como un espíritu para cumplir los deseos de su amiga de la infancia.",
                                                        is_anonymous: "false",
                                                        }
                                                        ],
                                                        
                                                        [
                                                        "En el anime 'Clannad', ¿cuál es el nombre del protagonista que ayuda a diversas personas en su escuela secundaria mientras enfrenta sus propios problemas familiares?",
                                                        [
                                                        "Nagisa Furukawa",
                                                        "Tomoyo Sakagami",
                                                        "Kyou Fujibayashi",
                                                        "Tomoya Okazaki",
                                                        ],
                                                        {
                                                        type: "quiz",
                                                        correct_option_id: 3,
                                                        open_period: 2,
                                                        explanation:
                                                        "Tomoya Okazaki es el protagonista de 'Clannad' que ayuda a diversas personas en su escuela secundaria mientras enfrenta sus propios problemas familiares.",
                                                        is_anonymous: "false",
                                                        }
                                                        ],
                                                        [
                                                          "En el anime 'Violet Evergarden', ¿cuál es el nombre del protagonista que busca comprender el significado de las palabras 'Te amo'?",
                                                          [
                                                          "Gilbert Bougainvillea",
                                                          "Claudia Hodgins",
                                                          "Cattleya Baudelaire",
                                                          "Violet Evergarden",
                                                          ],
                                                          {
                                                          type: "quiz",
                                                          correct_option_id: 3,
                                                          open_period: 2,
                                                          explanation:
                                                          "Violet Evergarden es la protagonista de 'Violet Evergarden' que busca comprender el significado de las palabras 'Te amo'.",
                                                          is_anonymous: "false",
                                                          }
                                                          ],
                                                          
                                                          [
                                                          "En el anime 'March Comes in Like a Lion', ¿cuál es el nombre del protagonista que es un jugador de shogi que lucha contra la depresión y encuentra apoyo en una familia acogedora?",
                                                          [
                                                          "Harunobu Nikaidou",
                                                          "Kyouko Kouda",
                                                          "Akari Kawamoto",
                                                          "Rei Kiriyama",
                                                          ],
                                                          {
                                                          type: "quiz",
                                                          correct_option_id: 3,
                                                          open_period: 2,
                                                          explanation:
                                                          "Rei Kiriyama es el protagonista de 'March Comes in Like a Lion' que es un jugador de shogi que lucha contra la depresión y encuentra apoyo en una familia acogedora.",
                                                          is_anonymous: "false",
                                                          }
                                                          ],
                                                          
                                                          [
                                                          "En el anime 'A Silent Voice', ¿cuál es el nombre del personaje principal que intenta redimirse por su pasado acosando a una compañera de clase sorda?",
                                                          [
                                                          "Naoka Ueno",
                                                          "Yuzuru Nishimiya",
                                                          "Shouya Ishida",
                                                          "Tomohiro Nagatsuka",
                                                          ],
                                                          {
                                                          type: "quiz",
                                                          correct_option_id: 2,
                                                          open_period: 2,
                                                          explanation:
                                                          "Shouya Ishida es el personaje principal de 'A Silent Voice' que intenta redimirse por su pasado acosando a una compañera de clase sorda.",
                                                          is_anonymous: "false",
                                                          }
                                                          ],
                                                          [
                                                            "En el anime 'Demon Slayer: Kimetsu no Yaiba', ¿cuál es el nombre del protagonista que busca vengar la muerte de su familia y salvar a su hermana convertida en demonio?",
                                                            [
                                                            "Zenitsu Agatsuma",
                                                            "Inosuke Hashibira",
                                                            "Giyuu Tomioka",
                                                            "Tanjiro Kamado",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 3,
                                                            open_period: 2,
                                                            explanation:
                                                            "Tanjiro Kamado es el protagonista de 'Demon Slayer: Kimetsu no Yaiba' que busca vengar la muerte de su familia y salvar a su hermana convertida en demonio.",
                                                            is_anonymous: "false",
                                                            }
                                                            ],
                                                            
                                                            [
                                                            "En el anime 'My Hero Academia', ¿cuál es el nombre del protagonista que nace sin poderes en un mundo donde casi todos tienen superpoderes?",
                                                            [
                                                            "Shoto Todoroki",
                                                            "Katsuki Bakugo",
                                                            "Ochaco Uraraka",
                                                            "Izuku Midoriya",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 3,
                                                            open_period: 2,
                                                            explanation:
                                                            "Izuku Midoriya es el protagonista de 'My Hero Academia' que nace sin poderes en un mundo donde casi todos tienen superpoderes.",
                                                            is_anonymous: "false",
                                                            }
                                                            ],
                                                            
                                                            [
                                                            "En el anime 'Attack on Titan', ¿cuál es el nombre del mejor amigo del protagonista que es conocido por su conocimiento en el combate contra los titanes?",
                                                            [
                                                            "Mikasa Ackerman",
                                                            "Levi Ackerman",
                                                            "Erwin Smith",
                                                            "Armin Arlert",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 3,
                                                            open_period: 2,
                                                            explanation:
                                                            "Armin Arlert es el mejor amigo del protagonista en 'Attack on Titan' y es conocido por su destreza en el combate contra los titanes.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],
                                                            
                                                            [
                                                            "En el anime 'K-ON', ¿cuál es el nombre de la baterista?",
                                                            [
                                                            "Yui Hirasawa",
                                                            "Ikuyo Kita",
                                                            "Subaru Awa",
                                                            "Ritsu Tainaka",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 3,
                                                            open_period: 2,
                                                            explanation:
                                                            "Ritsu Tainaka es la baterista del anime 'K-ON'.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],
                                                            
                                                            [
                                                            "En el anime 'HunterXHunter' , ¿Que tipo de Usuario NEN es Gon?",
                                                            [
                                                            "Emisor",
                                                            "Especialista",
                                                            "Intensificador",
                                                            "Materializador",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 2,
                                                            open_period: 2,
                                                            explanation:
                                                            "Gon es un Usuario NEN tipo Intensificador.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],
                                                            
                                                            [
                                                            "En el anime 'Bleach' , ¿Byakuya es el Cápitan de la?",
                                                            [
                                                            "Sexta Division",
                                                            "Septima Division",
                                                            "Quinta Division",
                                                            "Octava Division",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 0,
                                                            open_period: 2,
                                                            explanation:
                                                            "Byakuya es el Cápitan de la Sexta Division.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],

                                                            [
                                                            "En el anime 'Jujutsu Kaisen' , ¿Qué tecnica utiliza Toge Inumaki?",
                                                            [
                                                            "Corrosion Extrema",
                                                            "Maldicion Ilimitada",
                                                            "Discurso Maldito",
                                                            "Necromancia",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 2,
                                                            open_period: 2,
                                                            explanation:
                                                            "La tecnica de Toge Inumaki es el Discurso Maldito.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],

                                                            [
                                                            "Los Kinjutsu del anime 'Naruto' son técnicas...",
                                                            [
                                                            "Prohibidas",
                                                            "Ilusorias",
                                                            "Medicas",
                                                            "Sellado",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 0,
                                                            open_period: 2,
                                                            explanation:
                                                            "Los Kinjutsu son técnicas prohibidas.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],

                                                            [
                                                            "En el anime 'Blue Lock' ¿Cuál de estos personajes NO formo parte del equipo Z?",
                                                            [
                                                            "Chigiri",
                                                            "Kuon",
                                                            "Bachira",
                                                            "Nagi",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 3,
                                                            open_period: 2,
                                                            explanation:
                                                            "Nagi formaba parte del equipo V.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],

                                                            [
                                                            "En el anime 'Slam Dunk' ¿En qué posición juega Sakuragi? ",
                                                            [
                                                            "Ala-pivot",
                                                            "Pivot",
                                                            "Escolta",
                                                            "Base",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 0,
                                                            open_period: 2,
                                                            explanation:
                                                            "Sakuragi juega de Ala-pivot.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],

                                                            [
                                                            "En el anime 'Jujutsu Kaisen' ¿Cuántos Dedos de Sukuna existen?",
                                                            [
                                                            "20 Dedos",
                                                            "10 Dedos",
                                                            "30 Dedos",
                                                            "18 Dedos",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 0,
                                                            open_period: 2,
                                                            explanation:
                                                            "Existen 20 Dedos de Sukuna.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],

                                                            [
                                                            "En el anime 'Naruto' ¿Cuál fue el Primer Jutsu que desarrollo Naruto? ",
                                                            [
                                                            "Jutsu Sexy",
                                                            "Jutsu Replica",
                                                            "Jutsu Clones de Sombra",
                                                            "Jutsu de Invacion",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 3,
                                                            open_period: 2,
                                                            explanation:
                                                            "El primer jutsu que desarrollo Naruto fue el Jutsu sexy.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],

                                                            [
                                                            "En el anime 'Spy x Family' ¿Cómo se llama la agencia para la que trabaja Twilight?",
                                                            [
                                                            "Sern",
                                                            "Wise",
                                                            "Rox",
                                                            "Knows",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 1,
                                                            open_period: 2,
                                                            explanation:
                                                            "Twilight trabaja para la agencia Wise.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],

                                                            [
                                                            "¿Cómo se llama el mundo de 'No Game No Life'?",
                                                            [
                                                            "Exceed",
                                                            "Imanity",
                                                            "Aschente",
                                                            "Disboard",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 3,
                                                            open_period: 2,
                                                            explanation:
                                                            "El mundo del anime No Game No Life se llama Disboard.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],

                                                            [
                                                            "En el anime 'Kimetsu no Yaiba' ¿Cuál de estas respiraciones NO pertenece a un pilar?",
                                                            [
                                                            "Respiracion Amor",
                                                            "Respiracion Roca",
                                                            "Respiracion Veneno",
                                                            "Respiracion Viento",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 2,
                                                            open_period: 2,
                                                            explanation:
                                                            "La Respiracion de Veneno no pertece a ningun Pilar.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],

                                                            [
                                                            "En el anime 'Fairy Tail' ¿A qué gremio pertenecia Wendy antes de Fairy Tail",
                                                            [
                                                            "Cait Shelter",
                                                            "Sylph Labyrinth",
                                                            "Fuurinkazan",
                                                            "Sleeping Knights",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 0,
                                                            open_period: 2,
                                                            explanation:
                                                            "Antes de unirse a Fairy Tail pertenecia al gremio Cait Shelter.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],

                                                            [
                                                            "En el anime 'Dragon Ball' ¿Qué esfera le dejo el abuelo Gohan a Goku?",
                                                            [
                                                            "1 Estrella",
                                                            "3 Estrellas",
                                                            "4 Estrellas",
                                                            "Ninguna",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 2,
                                                            open_period: 2,
                                                            explanation:
                                                            "El aubelo Gohan le dejo a Goku la esfera de 4 estrellas.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],

                                                            [
                                                            "En Konosuba ¿Cuál es el nombre de la espada de Kazuma?",
                                                            [
                                                            "Ryunoske",
                                                            "Nekobasu",
                                                            "Chunchunmaru",
                                                            "Chomusuke",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 2,
                                                            open_period: 2,
                                                            explanation:
                                                            "Kazuma poseia la espada Chunchunmaru.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],

                                                            [
                                                            "¿Cuántos eran los niños elegidos en 'Digimon Tamers'",
                                                            [
                                                            "4 niños",
                                                            "3 niños",
                                                            "6 niños",
                                                            "Ninguno",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 3,
                                                            open_period: 2,
                                                            explanation:
                                                            "No hay niños elegidos, son TAMERS.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],

                                                            [
                                                            "En el anime 'Boku no hero academia' ¿Quién obtuvo el puntaje maximo en el examen de ingreso de la U.A?",
                                                            [
                                                            "Momo",
                                                            "Todoroki",
                                                            "Lida",
                                                            "Bakugo",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 3,
                                                            open_period: 2,
                                                            explanation:
                                                            "Bakugo obtuvo el puntaje maximo durante el examen de ingreso.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],

                                                            [
                                                            "¿Qué carrera estudia el Protagonista de'Golden Time'?",
                                                            [
                                                            "Ingieneria",
                                                            "Economia",
                                                            "Derecho",
                                                            "Medicina",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 2,
                                                            open_period: 2,
                                                            explanation:
                                                            "Banri Tada protagonista de Golden Time estudia Derecho.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],

                                                            [
                                                            "¿Con qué pecado se asocia a Merlin del anime'Nanatsu no Taizai'?",
                                                            [
                                                            "Envidia",
                                                            "Ira",
                                                            "Lujuria",
                                                            "Gula",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 3,
                                                            open_period: 2,
                                                            explanation:
                                                            "Merlin del anime nanatsu no taizai representa la Gula.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],

                                                            [
                                                            "¿Cuál es la Hermana menor en el anime de las 'Quintillizas'?",
                                                            [
                                                            "Miku",
                                                            "Itsuki",
                                                            "Ichika",
                                                            "Yotsuba",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 1,
                                                            open_period: 2,
                                                            explanation:
                                                            "Itsuki es la hermana menor.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],

                                                            [
                                                            "En el anime 'One Piece'¿Cómo se llamaba la antigua tripulación de Brook?",
                                                            [
                                                            "Piratas Hex",
                                                            "Piratas Rocks",
                                                            "Piratas Rumbar",
                                                            "Piratas Musicales",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 2,
                                                            open_period: 2,
                                                            explanation:
                                                            "Brook pertenecia a los Piratas Rumbar.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],

                                                            [
                                                            "¿Cuál de estos ingredientes NO es necesario para una transmutación humana en 'Fullmetal alchemist'?",
                                                            [
                                                            "35 Litros Agua",
                                                            "20KG Carbono",
                                                            "8 Gramos Azufre",
                                                            "10 Gramos Potasio",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 3,
                                                            open_period: 2,
                                                            explanation:
                                                            "El potasio no es necesario para realizar una trasmutación humana.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],

                                                            [
                                                            "¿Qué alimento usan en 'Steins Gate' para experimentar en el microondas?",
                                                            [
                                                            "Sandias",
                                                            "Bananas",
                                                            "Peras",
                                                            "Manzanas",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 1,
                                                            open_period: 2,
                                                            explanation:
                                                            "Para experimentar usan Bananas.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],

                                                            [
                                                            "¿Qué día quemaron su casa los hermanos Elric en 'Fullmetal alchemist'?",
                                                            [
                                                            "23 de octubre",
                                                            "11 de octubre",
                                                            "20 de octubre",
                                                            "3 de octubre",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 3,
                                                            open_period: 2,
                                                            explanation:
                                                            "El dia que quemaron su casa fue el 3 de octubre.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],

                                                            [
                                                            "¿Quién Empuja a Takemichi para matarlo en 'Tokyo Revengers'?",
                                                            [
                                                            "Akkun",
                                                            "Kisaki",
                                                            "Mikey",
                                                            "Naoto",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 0,
                                                            open_period: 2,
                                                            explanation:
                                                            "Akkun fue el que intentó matar a Takemichi.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],

                                                            [
                                                            "¿En qué año comienzan los acontecimientos de 'Sword Art Online'?",
                                                            [
                                                            "2023",
                                                            "2022",
                                                            "2020",
                                                            "2028",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 1,
                                                            open_period: 2,
                                                            explanation:
                                                            "Comienzan en el año 2022.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],

                                                            [
                                                            "Trunks de 'Dragon Ball' es hijo de..",
                                                            [
                                                            "Vegeta",
                                                            "Goku",
                                                            "Broly",
                                                            "Gohan",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 0,
                                                            open_period: 2,
                                                            explanation:
                                                            "Trunks es hijo de Vegeta.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],

                                                            [
                                                            "La preparatoria Jujutsu de Itadori está en?",
                                                            [
                                                            "Tokio",
                                                            "Kioto",
                                                            "Hokkaido",
                                                            "Osaka",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 0,
                                                            open_period: 2,
                                                            explanation:
                                                            "Se encuentra en Tokio.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],

                                                            [
                                                            "Las maldiciones en 'Jujutsu Kaisen' nacen a partir de..? ",
                                                            [
                                                            "Odio",
                                                            "Emociones negativas",
                                                            "Desastres naturales",
                                                            "Deseos negativos",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 1,
                                                            open_period: 2,
                                                            explanation:
                                                            "Nacen a partir de Emociones negativas.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],

                                                            [
                                                            "¿Cuál es la comida favorita de 'Doraemon'?",
                                                            [
                                                            "Dorayaki",
                                                            "Dangos",
                                                            "Pizza",
                                                            "Hamburguesas",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 0,
                                                            open_period: 2,
                                                            explanation:
                                                            "La comida favorita de Doraemon es el Dorayaki.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],

                                                            [
                                                            "¿Qué le regala Ishigami a Shirogane para su cumpleaños en el anime 'Kaguya Sama'?",
                                                            [
                                                            "Un manga",
                                                            "Una camiseta",
                                                            "Un boligrafo",
                                                            "Un abanico",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 2,
                                                            open_period: 2,
                                                            explanation:
                                                            "Ishigami le regala un boligrafo.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],

                                                            [
                                                            "¿Cual era el nombre de la madre de Kosei en 'Your lie in april'?",
                                                            [
                                                            "Saki",
                                                            "Hiroko",
                                                            "Tsubaki",
                                                            "Lara",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 0,
                                                            open_period: 2,
                                                            explanation:
                                                            "El nombre de la madre de Kosei era Saki.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],

                                                            [
                                                            "En 'Yugi-oh' ¿Cual era el nombre del Faraon?",
                                                            [
                                                            "Atem",
                                                            "Mahad",
                                                            "Yami",
                                                            "Johan",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 0,
                                                            open_period: 2,
                                                            explanation:
                                                            "El Faraon se llamaba Atem.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],

                                                            [
                                                            "¿Cual es el Pokemon mas pesado de la primera generacion?",
                                                            [
                                                            "Gengar",
                                                            "Snorlax",
                                                            "Onix",
                                                            "Golem",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 1,
                                                            open_period: 2,
                                                            explanation:
                                                            "Snorlax pesa 460KG y es el pokemon mas pesado de la primera generacion.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],

                                                            [
                                                            "¿Que significa 'Nisekoi'?",
                                                            [
                                                            "Amor falso",
                                                            "Amor prohibido",
                                                            "Amor no correspondido",
                                                            "Amor en cadena",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 0,
                                                            open_period: 2,
                                                            explanation:
                                                            "Nisekoi significa Amor falso.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],

                                                            [
                                                            "¿Cuantas razas existen en 'No Game no Life'?",
                                                            [
                                                            "8",
                                                            "12",
                                                            "14",
                                                            "16",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 3,
                                                            open_period: 2,
                                                            explanation:
                                                            "Existen 16 razas en No Game no Life.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],

                                                            [
                                                            "¿Cual de estos personajes NO pertenecia a la Generacion de Milagros en 'Kuroko no basket'?",
                                                            [
                                                            "Kuroko",
                                                            "Akashi",
                                                            "Kise",
                                                            "Kagami",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 3,
                                                            open_period: 2,
                                                            explanation:
                                                            "Kagami no pertenecia a la Generacion de Milagros.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],

                                                            [
                                                            "¿Como se llama el primer Opening de 'Shingeki no Kyojin'?",
                                                            [
                                                            "Guren no Yumiya",
                                                            "Guren no Taimiya",
                                                            "Guren no Tsubasa",
                                                            "Guren no Tori",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 0,
                                                            open_period: 2,
                                                            explanation:
                                                            "Guren no Yumiya es el primer opening de Shingeki no Kyojin.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],

                                                            [
                                                            "En 'One Piece'¿Cual era la recompensa de Crocodile?",
                                                            [
                                                            "116.000.000",
                                                            "152.000.000",
                                                            "94.000.000",
                                                            "81.000.000",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 3,
                                                            open_period: 2,
                                                            explanation:
                                                            "La recompensa de Crocodile era 81.000.000.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],

                                                            [
                                                            "¿Contra quien usa Asta de 'Black clover' por primera vez su Black Form?",
                                                            [
                                                            "Licht",
                                                            "Vetto",
                                                            "Langris",
                                                            "Ladros",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 3,
                                                            open_period: 2,
                                                            explanation:
                                                            "La usa contra Ladros.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],

                                                            [
                                                            "¿Como se llama la espada de 'Ichigo'?",
                                                            [
                                                            "Zangetsu",
                                                            "Excalibur",
                                                            "Tessaiga",
                                                            "Samehada",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 0,
                                                            open_period: 2,
                                                            explanation:
                                                            "La espada de Ichigo se llama Zangetsu.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],

                                                            [
                                                            "¿Cual es el apellido de Maka personaje de 'Soul eater'?",
                                                            [
                                                            "Alberona",
                                                            "Thompson",
                                                            "Rebian",
                                                            "Albarn",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 3,
                                                            open_period: 2,
                                                            explanation:
                                                            "El apellido de Maka es Albarn.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],

                                                            [
                                                            "¿Cual es el Eva que pilotea Shinji?",
                                                            [
                                                            "Unidad 00",
                                                            "Unidad XX",
                                                            "Unidad 02",
                                                            "Unidad 01",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 3,
                                                            open_period: 2,
                                                            explanation:
                                                            "Shinji pilotea el Eva 01.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],

                                                            [
                                                            "¿En que club estaban las chicas de K-on?",
                                                            [
                                                            "Musica Clasica",
                                                            "Ceremonia del te",
                                                            "Musica Ligera",
                                                            "No estaban en un Club",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 2,
                                                            open_period: 2,
                                                            explanation:
                                                            "Las chicas de K-on pertenecian al club de Musica Ligera.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],

                                                            [
                                                            "¿Cómo se llama  el angel del universo 7 en Dragon Ball?",
                                                            [
                                                            "Whis",
                                                            "Bills",
                                                            "Champa",
                                                            "Vados",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 0,
                                                            open_period: 2,
                                                            explanation:
                                                            "Whis es el angel del universo 7.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],

                                                            [
                                                            "¿Quién es el master de Berserk en 'Fate Stay Night'?",
                                                            [
                                                            "Sakura",
                                                            "Illyasviel",
                                                            "Shinji",
                                                            "Kotomine",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 1,
                                                            open_period: 2,
                                                            explanation:
                                                            "Illyasviel es el master de Berserk.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],

                                                            [
                                                            "¿Cuánto tiempo tienen para matar a Koro-sensei en 'Assasination Classromom'?",
                                                            [
                                                            "3 años",
                                                            "1 año",
                                                            "2 años",
                                                            "6 meses",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 1,
                                                            open_period: 2,
                                                            explanation:
                                                            "Para matar a Koro-sensei tenian 1 año.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],

                                                            [
                                                            "¿En qué animal se convierte Momiji Soma de 'Fruits Basket'?",
                                                            [
                                                            "Conejo",
                                                            "Cabra",
                                                            "Tigre",
                                                            "Serpiente",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 0,
                                                            open_period: 2,
                                                            explanation:
                                                            "Momiji Soma se puede convertir en un conejo.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],

                                                            [
                                                            "¿Qué habilidad tiene C.C de 'Code Geass'?",
                                                            [
                                                            "Modificar memorias",
                                                            "Obedencia absoluta",
                                                            "Detener el tiempo",
                                                            "Inmortalidad",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 3,
                                                            open_period: 2,
                                                            explanation:
                                                            "C.C de code geass posee la inmortalidad.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],

                                                            [
                                                            "¿Cuántos miembros tiene el laboratorio en 'Steins;Gate'?",
                                                            [
                                                            "10",
                                                            "8",
                                                            "5",
                                                            "3",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 1,
                                                            open_period: 2,
                                                            explanation:
                                                            "8 miembros tiene el labortario.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],

                                                            [
                                                            "¿Cuántos segundos puede usar su poder Yuu de 'Charlotte'?",
                                                            [
                                                            "10",
                                                            "1",
                                                            "3",
                                                            "5",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 3,
                                                            open_period: 2,
                                                            explanation:
                                                            "Yuu puede usar su poder por 5 segundos.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],

                                                            [
                                                            "¿En qué equipo estaban Hinata-Kiba-Shino de 'Naruto'?",
                                                            [
                                                            "7",
                                                            "10",
                                                            "8",
                                                            "1",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 2,
                                                            open_period: 2,
                                                            explanation:
                                                            "Hinata Kiba y Shino pertenecian al equipo 8.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],

                                                            [
                                                            "¿Cuál fue la primera arma de Yato de 'Noragami'?",
                                                            [
                                                            "Tomone",
                                                            "Daikoku",
                                                            "Yukine",
                                                            "Hiro",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 3,
                                                            open_period: 2,
                                                            explanation:
                                                            "Su primera arma fue Hiro.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],

                                                            [
                                                            "¿Cuantas Valkyrias hay en 'Record of Ragnarok'?",
                                                            [
                                                            "13",
                                                            "9",
                                                            "15",
                                                            "7",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 0,
                                                            open_period: 2,
                                                            explanation:
                                                            "Hay 13 Valkyrias.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],

                                                            [
                                                            "¿Cuanto tiempo viven los Giftias de 'Plastic Memories'?",
                                                            [
                                                            "37 años",
                                                            "100 años",
                                                            "24 años",
                                                            "9 años",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 3,
                                                            open_period: 2,
                                                            explanation:
                                                            "Los Giftias viven 9 años.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],

                                                            [
                                                            "¿Cuál fué el primer Pokémon ATRAPADO por Ash en 'Pokémon'?",
                                                            [
                                                            "Pikachu",
                                                            "Caterpie",
                                                            "Charmander",
                                                            "Squirtle",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 1,
                                                            open_period: 2,
                                                            explanation:
                                                            "El primer Pokémon que atrapo Ash fue Caterpie.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],

                                                            [
                                                            "¿Cuál es el valor mínimo de un criminal latente en 'Psycho-Pass'?",
                                                            [
                                                            "100",
                                                            "300",
                                                            "150",
                                                            "200",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 0,
                                                            open_period: 2,
                                                            explanation:
                                                            "El valor mínimo de un criminal latente es 100.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],

                                                            [
                                                            "¿Cuántos alumnos asistian a la escuela en 'Non Non Biyori'?",
                                                            [
                                                            "7",
                                                            "3",
                                                            "10",
                                                            "5",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 3,
                                                            open_period: 2,
                                                            explanation:
                                                            "5 alumnos eran los que asistian.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],

                                                            [
                                                            "¿Qué rol cumple Kaho Hinata de 'Blend S'?",
                                                            [
                                                            "Sadistic",
                                                            "Oneesan",
                                                            "Tsundere",
                                                            "Imouto",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 2,
                                                            open_period: 2,
                                                            explanation:
                                                            "Cumple el rol de Tsundere.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],

                                                            [
                                                            "¿Cuántos años estuvo petrificado Senku de 'Dr.Stone'?",
                                                            [
                                                            "3.715",
                                                            "2.825",
                                                            "5.330",
                                                            "7.515",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 0,
                                                            open_period: 2,
                                                            explanation:
                                                            "Estuvo petrificado 3.715 años.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],

                                                            [
                                                            "¿Como se llama la mascota de Ryuji en 'Toradora'?",
                                                            [
                                                            "Midori",
                                                            "Tori",
                                                            "Chiyo",
                                                            "Inko",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 3,
                                                            open_period: 2,
                                                            explanation:
                                                            "Inko es el nombre de la mascota.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],

                                                            [
                                                            "¿Qué regalaba Fuko a la gente en 'Clannad'?",
                                                            [
                                                            "Dango",
                                                            "Estrella de mar",
                                                            "Cartas",
                                                            "Flores",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 1,
                                                            open_period: 2,
                                                            explanation:
                                                            "Regalaba estrellas de mar.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],

                                                            [
                                                            "¿Como se llama el dios de 'Higurashi'?",
                                                            [
                                                            "Hinamizawa",
                                                            "Kami",
                                                            "Hanyuu",
                                                            "Watanagashi",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 2,
                                                            open_period: 2,
                                                            explanation:
                                                            "El dios de Higurashi se llama Hanyuu.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],

                                                            [
                                                            "¿Qué animal es el guardia de seguridad en 'Beastars'?",
                                                            [
                                                            "Perro",
                                                            "Gorila",
                                                            "Serpiente",
                                                            "Oso",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 2,
                                                            open_period: 2,
                                                            explanation:
                                                            "Es una Serpiente.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],

                                                            [
                                                            "¿La final regional es Karasuno vs...  'Haikyuu!!'?",
                                                            [
                                                            "Nekoma",
                                                            "Shiratorizawa",
                                                            "Aoba Josai",
                                                            "Fukurodani",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 1,
                                                            open_period: 2,
                                                            explanation:
                                                            "Es Karasuno vs Shiratorizawa.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],

                                                            [
                                                            "¿Quién muere primero de los Night Raid en 'Akame ga kill'?",
                                                            [
                                                            "Sheele",
                                                            "Mine",
                                                            "Bulat",
                                                            "Lubbock",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 	0,
                                                            open_period: 2,
                                                            explanation:
                                                            "Sheele es la primera en morir.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],

                                                            [
                                                            "¿Cuantos años tiene Gojo de 'Jujutsu Kaisen'?",
                                                            [
                                                            "24",
                                                            "20",
                                                            "35",
                                                            "28",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 3,
                                                            open_period: 2,
                                                            explanation:
                                                            "Gojo tiene 28 años.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],

                                                            [
                                                            "¿Qué nacionalidad es Laurent Thierry de 'Great Pretender'?",
                                                            [
                                                            "Japones",
                                                            "Frances",
                                                            "Belga",
                                                            "Ingles",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 2,
                                                            open_period: 2,
                                                            explanation:
                                                            "Laurent Thierry es de Belgica.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],

                                                            [
                                                            "¿De qué planeta es Lala de 'To love Ru'?",
                                                            [
                                                            "Deviluke",
                                                            "Memorze",
                                                            "Tierra",
                                                            "Mistletoe",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 0,
                                                            open_period: 2,
                                                            explanation:
                                                            "Proviene del planeta Deviluke.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],

                                                            [
                                                            "¿Que idioma habla Alya aparte del japones en 'Roshidere'?",
                                                            [
                                                            "Ingles",
                                                            "Ruso",
                                                            "Chino",
                                                            "Español",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 1,
                                                            open_period: 2,
                                                            explanation:
                                                            "Habla Ruso.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],

                                                            [
                                                            "¿Por qué se casan Yukari y Ririna en 'Koi to Uso'?",
                                                            [
                                                            "Amor",
                                                            "Dinero",
                                                            "Obligacion",
                                                            "Religion",
                                                            ],
                                                            {
                                                            type: "quiz",
                                                            correct_option_id: 2,
                                                            open_period: 2,
                                                            explanation:
                                                            "Se casan por Obligacion.",
                                                            is_anonymous: "false",
                                                            }
                                                          ],




// Otras preguntas aquí...
    ];
  
    var ma = Math.random();
    var rosa = Math.floor(ma * quises.length);
    bot.sendPoll(msg.chat.id, quises[rosa][0], quises[rosa][1], quises[rosa][2]);
  });
}