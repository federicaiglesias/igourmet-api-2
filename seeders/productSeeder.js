const { nanoid } = require("@reduxjs/toolkit");
const { Product } = require("../models");
const slugify = require("slugify");

module.exports = async () => {
  const products = [
    {
      name: "Salame rústico",
      price: 300,
      stock: 18,
      description:
        "Los charcuteros de Parma poseen habilidades que van más allá de la elaboración de prosciutto, y su experiencia se refleja en el sencillo y delicioso Salame Rústico de Maestri. El cerdo se sazona con una mezcla tradicional de sal, pimienta y ajo, logrando un embutido versátil y perfecto para complacer a todos. Añade estas generosas rodajas a tu tabla junto a una selección italiana cremosa como Cossanella o Quattro Portoni Quadrello para una experiencia indulgente.",
      subdescription: "Ajo/ salado-dulce/ sustancial",
      image: "salamerustico.jpeg",
      subcategory: "Salames",
      featured: false,
      categoryId: 2,
    },
    {
      name: "Coppa",
      price: 400,
      stock: 28,
      description:
        "La capicola quizá no tenga la fama del prosciutto, pero es una elección italiana igualmente deliciosa para tablas y combinaciones de charcutería. Elaborada en la región de Piacenza, en el norte de Italia, Maestri prepara su Coppa con un adobo de sal, pimienta negra y nuez moscada. Cada rebanada, tierna y curada lentamente, tiene la cantidad justa de sal y un hermoso veteado de grasa. Es increíble en un sándwich con Provolone Buonatavola, pero también crea una sinfonía italiana en una tabla junto al Caciocavallo.",
      subdescription: "Tierno, sabroso, marmoleado",
      image: "coppa.jpeg",
      subcategory: "otros",
      featured: false,
      categoryId: 2,
    },
    {
      name: "Jamón crudo",
      price: 450,
      stock: 23,
      description:
        "El jamón crudo en rebanadas se elabora a partir de paleta de cerdo y se envejece durante unos nueve meses en la provincia de Alto Adige, en el noreste de Italia, donde el aire fresco de los Alpes se encuentra con la suave brisa mediterránea. Esta carne rica y aterciopelada se cubre con una corteza de hierbas hecha de enebro, pimienta y otras especias, y se ahuma antes de su curación. Sus sabores complejos y herbales exigen una combinación igualmente audaz, como Taleggio y una pasta de higos Divina.",
      subdescription: "Ahumado, Herbáceo, Dulce / Años: 6 meses",
      image: "jamoncrudo.jpeg",
      subcategory: "Jamones",
      featured: false,
      categoryId: 2,
    },
    {
      name: "Salame picante",
      price: 250,
      stock: 41,
      description:
        "La Spianata Piccante de Maestri puede tener una forma plana, pero su sabor es todo menos simple. Originaria de Calabria, en el sur de Italia, esta charcutería de cerdo picante equilibra el intenso sabor del chile y el ajo con ricos matices de grasa que se derrite en la boca. Una vez embutida, se prensa hasta obtener su distintiva forma ovalada. La longitud de estas rebanadas robustas las hace perfectas para envolver queso. Nos encanta acompañarlas con opciones cremosas como el Burratini y el Gorgonzola Cremificato.",
      subdescription: "Chile, Ajo, Intenso",
      image: "salamepicante.jpeg",
      subcategory: "Salames",
      featured: false,
      categoryId: 2,
    },
    {
      name: "Prosciutto cocido",
      price: 150,
      stock: 59,
      description:
        "Prosciutto significa jamón en italiano, e incluye una variAños de carnes más allá del Prosciutto di Parma, como el prosciutto cotto, el jamón cocido que es la especialidad de Rovagnati. La empresa familiar sazona, masajea y cocina al vapor los muslos de cerdo para crear estas rebanadas suculentas, ligeramente saladas y sutilmente dulces. Es la calidad del prosciutto italiano, con algo del sabor familiar del jamón estilo charcutería estadounidense. Haz un bocado inspirado en el Croque Monsieur con Gruyère y mostaza Dijon.",
      subdescription: "Jugoso, Ligeramente salado, Dulce",
      image: "prosciuttoitaliano.jpeg",
      subcategory: "Jamones",
      featured: false,
      categoryId: 2,
    },
    {
      name: "Tocino ahumado",
      price: 100,
      stock: 39,
      description:
        "La familia Nueske elabora este clásico tocino utilizando una receta familiar que data de 1882. Preparan su tocino ahumado con madera de cerezo salvaje ahumando la carne durante 24 horas sobre troncos de cerezo, lo que infunde a la carne una rica jugosidad, un sabor rústico y un toque dulce y ácido. Perfecto para el desayuno acompañado de huevos o encima de una hamburguesa, este tocino irresistible agrega un toque sabroso a cualquier platillo. Pruébalo con un chorrito de jarabe de arce Crown Maple o en un sándwich con una rebanada derretida de queso cheddar blanco de Nueva York.",
      subdescription: "Ahumado, Intenso, Dulce / Años: 1-2 días",
      image: "tocinoahumado.jpeg",
      subcategory: "Otros",
      featured: false,
      categoryId: 2,
    },
    {
      name: "Mortadella",
      price: 130,
      stock: 22,
      description:
        "La mortadela puede parecerse a la bologna (y es tradicionalmente de Bolonia, Italia), pero tiene mucho más que ofrecer que su prima de la lonchera. Especialmente estas rebanadas de Rovagnati, que son finas, jugosas y sabrosas, con los característicos círculos de grasa y un toque herbáceo de cilantro. Así que, dale a la mortadela el tratamiento adulto que se merece. Es un éxito total en una tabla junto con un funky Fontina Val d'Aosta o sobre pizza casera, coronada con Caciocavallo derretido y rodajas de Peppadews.",
      subdescription: "Intenso, Sabroso, Exquisito",
      image: "mortadella.jpeg",
      subcategory: "Otros",
      featured: true,
      categoryId: 2,
    },
    {
      name: "Jamón dulce",
      price: 1200,
      stock: 15,
      description:
        "Llamado el dulce, porque es justo la cantidad de jamón para dos, este jamón entero se elabora con lomo de cerdo sin hueso, se marina durante diez días con hierbas frescas y especias, y luego se ahuma lentamente sobre madera de manzano para darle una profundidad sabrosa de sabor. Perfecto para reuniones elegantes durante las fiestas o para un simple sándwich de jamón y queso, este versátil dulce es un éxito garantizado que combina bien con quesos suaves y nuez como el Point Reyes Toma y el Mango Chutney de Virginia Chutney Company.",
      subdescription: "Sabroso, Ahumado, Jugoso",
      image: "jamon dulce.jpeg",
      subcategory: "Jamones",
      featured: false,
      categoryId: 2,
    },
    {
      name: "Jamón crudo de pato",
      price: 1500,
      stock: 8,
      description:
        "No necesitas comer cerdo para disfrutar de la charcutería, gracias a alternativas tentadoras de expertos en carnes como Spotted Trotter. Aquí, la pechuga de pato se cura como el prosciutto y se frota con enebro, pimienta de Jamaica y cáscara de naranja. El sabor terroso y dulce del pato destaca en cada rebanada tierna, cada una coronada con una capa de grasa derretida. Una opción rica para una tabla de charcutería. Haz eco del tono rojo con Alisios® frotado con pimentón, o resalta la intensidad de la carne con un queso de oveja fuerte como el Roncal.",
      subdescription: "Intenso, Tierno, Agridulce Sabroso",
      image: "jamoncrudodepato.jpeg",
      subcategory: "Jamones",
      featured: true,
      categoryId: 2,
    },
    {
      name: "Jamón de Parma",
      price: 800,
      stock: 42,
      description:
        "Desde la antigua Roma, el Prosciutto di Parma se ha curado con solo unos pocos ingredientes simples: cerdo fresco, sal marina, aire y tiempo. La receta ha cambiado muy poco desde sus primeros días, lo que es un verdadero testimonio de esta tradición tan respetada de Parma, Italia. El Prosciutto di Parma se envejece durante al menos 20 meses, desarrollando un sabor rico y a nuez con fuertes notas de frutas de hueso. Pruébalo con otros clásicos de la región, como el vinagre balsámico o el Parmigiano Reggiano.",
      subdescription: "Sal marina, Intenso, Frutas de hueso / Años: 20 meses",
      image: "jamonparma.jpeg",
      subcategory: "Jamones",
      featured: true,
      categoryId: 2,
    },
    {
      name: "Jamón ibérico",
      price: 950,
      stock: 33,
      description:
        "Se pone mucho cuidado en la elaboración de estas rebanadas que combinan la tradición europea con el paisaje estadounidense. Texas Iberico cría cerdos de raza Ibérico española en Trail’s End Ranch, donde los animales se alimentan de bellotas, frijoles de mezquite y fruta de nopal. La carne se ahuma y se envejece durante un año, creando un jamón de textura maravillosamente suave y una complejidad que te hará querer más. Potencia el sabor sabroso sirviéndolo con Scharfe Maxx Extra, un queso con sabor a cebolla, y un toque de mostaza con miel.",
      subdescription: "Sal marina, Intenso, Frutas de hueso / Años: 20 meses",
      image: "jamoniberico.jpeg",
      subcategory: "Jamones",
      featured: false,
      categoryId: 2,
    },
    {
      name: "Salumi de vemont",
      price: 1000,
      stock: 16,
      description:
        "Vermont Salumi utiliza técnicas tradicionales italianas de curado en su sabrosa y suculenta Bresaola en rebanadas. El ojo de res, un corte magro pero lleno de sabor, se marina en vino tinto, enebro, pimienta y tomillo, luego se seca al aire y se envejece durante dos meses. Las rebanadas resultantes son más tiernas que la mayoría de las bresaolas, con un tono rojo intenso y un sabor carnoso y aromático. Las notas afrutadas del vino tinto combinan bien con pan crujiente y verduras amargas o acompañadas de Asiago d'Allevo.",
      subdescription: "Carne, Magro, Aromático",
      image: "salumivemont.jpeg",
      subcategory: "Otros",
      featured: false,
      categoryId: 2,
    },
    {
      name: "La francesa",
      price: 1500,
      stock: 16,
      description:
        "Explora Francia, sin necesidad de pasaporte. Esta colección cuidadosamente seleccionada está repleta de algunos de los mejores bocados franceses. Disfruta del sabor a nuez del Comté, la cremosidad del Bûcheron, el suave aroma del Morbier y la textura untuosa del Roquefort. Este elegante cuarteto se equilibra con la dulzura del confitado de cereza, la delicada terrosidad del Salami Tartufo de Creminelli y el sabor suave de las aceitunas Castelvetrano. Agrega un paquete de Mini Toasts Trois Petits Cochons y envía a tus papilas gustativas a un delicioso viaje. Regálalo para dar un toque de ese je ne sais quoi.",
      subdescription: "Queso y otros favoritos franceses",
      image: "tablafrancesa.jpeg",
      subcategory: "",
      featured: false,
      categoryId: 3,
    },
    {
      name: "La MVP",
      price: 3000,
      stock: 13,
      description:
        "Este festín de quesos y charcutería de primer nivel recibe el título de *Most Valuable Platter* por una buena razón. Reúne algunos de nuestros quesos y embutidos más populares, como el Cabot Clothbound Cheddar de Jasper Hill y el Point Reyes Original Blue, además del suave Prosciutto di San Daniele y el robusto Salami de Jabalí. Esta bandeja está lista para ser disfrutada, con aceitunas salinas, papas fritas con sal marina y más. O regálala a tu amante de la buena comida con gusto refinado.",
      subdescription: "Queso y Charcutería de primera categoría",
      image: "tablamvp.jpeg",
      subcategory: "",
      featured: true,
      categoryId: 3,
    },
    {
      name: "La italiana",
      price: 2000,
      stock: 10,
      description:
        "Es difícil no enamorarse de La Dolce Vita, nuestra colección definitiva de auténtica decadencia italiana. Con cuatro quesos clásicos seleccionados a mano, como la jugosa burrata, el afrutado Parmigiano Reggiano y un trozo de queso con trufas, junto con prosciutto rico, aceitunas salinas y otros sabrosos manjares, es lo más cercano a un billete de primera clase a Italia. Sirve una copa de tu prosecco favorito y disfruta, o envíalo a cualquier admirador de la ópera, el cine y la deliciosa comida italiana.",
      subdescription: "Decadencia italiana auténtica",
      image: "tablaitaliana.jpeg",
      subcategory: "",
      featured: false,
      categoryId: 3,
    },
    {
      name: "La célebre",
      price: 3300,
      stock: 10,
      description:
        "Cuantos más amantes del queso, ¡mejor! Esta abundante bandeja está hecha para reuniones festivas y para regalar lo mejor. Una selección central con siete quesos extraordinarios, desde un decadente triple crème hasta un elegante queso alpino y un clásico italiano con carácter, acompañados de charcutería popular como sopressata, chorizo y jamón italiano. Además, guarniciones picantes, dulces y salinas que harán que todos descubran nuevas combinaciones de sabores durante toda la noche. Así que, concéntrate en tus amigos y familiares, y deja los manjares extravagantes a los expertos.",
      subdescription: "Decadencia italiana auténtica",
      image: "tablacelebre.jpeg",
      subcategory: "",
      featured: false,
      categoryId: 3,
    },
    {
      name: "La de vacaciones",
      price: 2200,
      stock: 15,
      description:
        "La de vacaciones es una caja llena de un toque festivo, perfecta para servir como bandeja de fiesta o regalar como un obsequio comestible. Incluye seis quesos que van desde los clásicos y suaves hasta los audaces y vibrantes, con opciones populares como cheddar, camembert y gouda, y selecciones más atrevidas como el funky Jasper Hill Farm Harbison y un azul de California picante.",
      subdescription: "Favoritos festivos de queso",
      image: "tabladevacaciones.jpeg",
      subcategory: "",
      featured: false,
      categoryId: 3,
    },
    {
      name: "La de icónica",
      price: 3200,
      stock: 13,
      description:
        "Manchego, brie y cheddar, junto con bocados crujientes y una mermelada dulce y especiada. Con esta caja, puedes crear una selección perfectamente curada o un regalo que seguramente agradará a cualquier paladar. Prueba mejorar esta colección con algunos de nuestros otros grandes éxitos, como la charcutería, y disfruta con tu botella de vino favorita.",
      subdescription: "Una selección atemporal",
      image: "tablaiconica.avif",
      subcategory: "",
      featured: false,
      categoryId: 3,
    },
    {
      name: "La deluxe",
      price: 4200,
      stock: 17,
      description:
        "Esta colección equilibrada rebosa sabor, desde charcutería salada como prosciutto y salami, hasta delicias dulces como cerezas secas al sol y mermelada de arándano y naranja. Todo seleccionado para maridar con una variAños de quesos, incluidos los favoritos de la temporada como Stilton y Gruyère. Una de nuestras cajas de regalo más dinámicas, es un deleite tanto para anfitriones como para invitados, y es perfecta para regalar, con algo para todos los gustos.",
      subdescription: "Una fiesta navideña lista para disfrutar",
      image: "tabladeluxe.jpeg",
      subcategory: "",
      featured: true,
      categoryId: 3,
    },
    {
      name: "Hombre de las cavernas azul",
      price: 420,
      stock: 17,
      description:
        "No dejes que su nombre te engañe; el Caveman Blue de Rogue Creamery es un queso refinado. Este queso azul sedoso y elegante es uno de los favoritos de Rogue Creamery, con sede en Oregón, y ofrece una combinación de delicioso sabor umami y vetas azules con un toque mineral. Equilibrado, ácido y sutilmente dulce, tiene un ligero crujido que revela notas de tocino crujiente bañado en jarabe de arce. Resalta su lado más ligero con un vaso de Riesling semiseco o rocíalo con un poco de miel Red Bee Honey in a Jar para un  bocado dulce y fácil.",
      subdescription:
        "Picante, mantecoso, cremoso / Leche de vaca / Pasteurizado / Años: 2-6 meses",
      image: "quesocavernas.jpeg",
      subcategory: "Azul",
      featured: false,
      categoryId: 1,
    },
    {
      name: "Bleu d'Auvergne",
      price: 550,
      stock: 12,
      description:
        "Con raíces en la Francia del siglo XIX, el Bleu d'Auvergne es una versión más suave del clásico queso azul picante. En las colinas verdes de Auvergne, la leche pasteurizada de vaca se transforma en un queso salado y suave, con una sutil dulzura a galleta Graham y ricos sabores a setas. Sírvelo como postre con un poco de miel cruda de flor de azahar de Astor Apiaries y Piedras de Chocolate.",
      subdescription:
        "Mineralmente, ligeramente especiada, semifirme / Leche de vaca / Pasteurizada / Años: 6 semanas",
      image: "quesobleuauvergne.jpeg",
      subcategory: "Azul",
      featured: false,
      categoryId: 1,
    },
    {
      name: "Barnstrom Blue",
      price: 670,
      stock: 13,
      description:
        "Barnstorm Blue está lleno de deliciosas sorpresas. Tiene una corteza lavada de color rosado que oculta dramáticas vetas azules. ¿El sabor? Notarás brownies recién horneados, bien definidos, pero con un toque de umami salado. Es desmenuzable pero mantecoso al paladar. Los quesos azules con corteza lavada son difíciles de lograr, y este requirió la experiencia combinada de nuestras cuevas y Jasper Hill Farm (más la cerveza maltosa de Focal Point Beer Co.) para conseguir el equilibrio perfecto. Realza los sabores de cacao tostado y notas de café con *Rustic Bakery Cacao Nib Shortbread*.",
      subdescription:
        "Brownie de cacao, umami, mantequilla / leche de vaca / cruda / Años: 4-5 meses",
      image: "quesobarnstromazul.jpeg",
      subcategory: "Azul",
      featured: true,
      categoryId: 1,
    },
    {
      name: "Rouge River Blue",
      price: 620,
      stock: 3,
      description:
        "El otoño marca el comienzo de la producción del Rogue River Blue. Esta selección de edición limitada de Rogue Creamery se beneficia del clima más fresco y húmedo de la temporada, que hace que los pastos sean más exuberantes y la leche de vaca más rica. Es un queso complejo, con una pasta suave y rica. Cada rueda está envuelta en hojas de uva syrah empapadas en aguardiente de peras, lo que aporta un sabor maduro y brillante al queso. Notas de vainilla, trufa e higo se mezclan con la piquantez tradicional del queso azul. Corta en rodajas y acompaña con confitura de cereza negra para un toque dulce.",
      subdescription:
        "Brandy de pera, picante, vainilla / Leche de vaca / Pasteurizado / Años: 12 meses",
      image: "quesoriverazul.jpeg",
      subcategory: "Azul",
      featured: false,
      categoryId: 1,
    },
    {
      name: "Reserva Treeline",
      price: 660,
      stock: 8,
      description:
        "Treeline combina la elaboración de queso al estilo alpino con una bebida coreana centenaria; el terroir de Wisconsin con un toque de Nueva York. Lo hacemos junto a Roelli Cheese Haus, que originalmente se asoció con Crown Finish Caves para crear estas ruedas jóvenes al estilo alpino. Nuestro equipo de las cavernas le da un giro al lavar las ruedas con Makku makgeolli, un alcohol de arroz coreano turbio y efervescente. Cada bocado elástico está lleno de umami y sabor a carne con un toque de crema agria. Brilla cuando se acompaña de un toque picante—servido con salame Kosho de Short Creek Farm o sambal Boomz de Sibeiho.",
      subdescription:
        "Umami, Crema Agria, Esponjosa / Leche de Vaca / Pasteurizada / Años: 4 Meses",
      image: "quesoreservatreeline.jpeg",
      subcategory: "Alpino",
      featured: false,
      categoryId: 1,
    },
    {
      name: "Fontina Fontal",
      price: 430,
      stock: 28,
      description:
        "Fontina Fontal, un queso de mesa tradicional del norte de Italia, es flexible y se derrite fácilmente, lo que lo convierte en una opción perfecta para un clásico sándwich de queso a la parrilla. Tiene un sabor suave, mantecoso y a nuez que combina bien con casi todo. Resalta sus sutiles notas de frutas de hueso maduras y pan mantecoso al acompañarlo con mermelada de mora de Sidehill Farm y Prosciutto San Daniele—y, por supuesto, un vino blanco fresco de la misma región. También es una base perfecta para fondue o macarrones con queso al horno.",
      subdescription:
        "Mantecoso, afrutado, con sabor a hongos / Leche de vaca / Pasteurizado / Años: 3 meses",
      image: "quesofontinafontal.jpeg",
      subcategory: "Alpino",
      featured: false,
      categoryId: 1,
    },
    {
      name: "Vcherin Fribourgeois",
      price: 480,
      stock: 21,
      description:
        "Este queso que encanta a todos comienza con el Vacherin Fribourgeois Extra, una versión de formato pequeño de un sabroso favorito suizo. La creación, designada AOP, llega a nuestra cueva con poco más de tres meses de Años. Nuestro equipo de cavernas lo lava en salmuera y lo madura durante al menos cinco meses más, hasta que emerge con un aroma audaz y un perfil afrutado y fácil de disfrutar. Suave y tostado, con notas abundantes de caldo y castañas asadas, se complementa perfectamente con una capa de Mostaza Suave Fallot y pan fresco.",
      subdescription:
        "Tostado, Castañas, Caldo de Res / Leche de Vaca / Crudo / Años: 8-9 Meses",
      image: "quesovacherin.jpeg",
      subcategory: "Alpino",
      featured: false,
      categoryId: 1,
    },
    {
      name: "3 Years Comté",
      price: 500,
      stock: 29,
      description:
        "Comté, un queso protegido por la AOC que data de hace siglos, es uno de los quesos más famosos de Francia. Este Comté de 3 años tiene una textura suave y sabores ricos a avellanas tostadas y caldo caliente, con notas de frutas secas. Su inusualmente largo período de maduración es supervisado por el visionario affineur Jean-Charles Arnaud en el Fort des Rousses, una fortaleza convertida donde las habitaciones abovAñosas crean una circulación natural del aire y un ambiente de maduración ideal. Corta esta joya alpina junto con confitura de cereza negra para resaltar sus matices.",
      subdescription:
        "Avellanas, Caldo, Frutos Secos / Leche de Vaca / Cruda / Años: 3 Años",
      image: "quesocomte.jpeg",
      subcategory: "Alpino",
      featured: true,
      categoryId: 1,
    },
    {
      name: "Brie Fermier",
      price: 300,
      stock: 42,
      description:
        "Brie Fermier proviene de una granja ubicada justo fuera del pueblo de La Boissière-École en el norte de Francia. Este queso presenta notas de setas y ostras recién abiertas dentro de su suave pasta. Prueba este delicioso brie con algo de Jambon de Bayonne y galletas Raincoast Crisps para un tentempié sabroso.",
      subdescription:
        "Sedoso, untuoso, esponjoso / Leche de vaca / Pasteurizada / Años: 4 semanas",
      image: "quesobrie.jpeg",
      subcategory: "Cremoso",
      featured: false,
      categoryId: 1,
    },
    {
      name: "Moses Reaper",
      price: 260,
      stock: 22,
      description:
        "Moses Reaper es una divertida y espeluznante variación del clásico Moses Sleeper, creada por Jasper Hill. El queso se infunde con annatto, lo que le da un vibrante color naranja, mientras que su corteza está cubierta con ceniza vegetal, dándole un tono gris aterrador. A pesar de su apariencia juguetona, conserva los sabores clásicos del Moses Sleeper: champiñones terrosos, leche fresca y un toque de funk a huevo. Perfecto para una tabla otoñal, combínalo con las Carriots of Fire de Pacific Pickle Works y las galletas Cranberry Almond Crisps de Maine Crisp Co. para un bocado deliciosamente espantoso.",
      subdescription:
        "Espeluznante, festivo, decadente / Leche de vaca / Pasteurizado / Años: 3",
      image: "quesomosesreaper.jpeg",
      subcategory: "Cremoso",
      featured: false,
      categoryId: 1,
    },
    {
      name: "Fromager",
      price: 660,
      stock: 20,
      description:
        "Lujoso y mantecoso, el Fromager D'Affinois es una versión más decadente del Brie. Un verdadero favorito que siempre está entre los diez más vendidos de Murray’s, conquistando a los clientes con su textura espesa y sedosa, y su sabor dulce y lácteo. Extiéndelo sobre algunas galletas saladas Carr's Water Crackers o las Oatcakes de Effie's Homemade y acompáñalo con una cucharada de Divina Sour Cherry Spread para un bocado que recuerda a una tarta de queso de cereza.",
      subdescription:
        "Mantecoso, dulce, sedoso / Leche de vaca / Pasteurizado / Años: 14 días",
      image: "quesofromagere.jpeg",
      subcategory: "Cremoso",
      featured: true,
      categoryId: 1,
    },
    {
      name: "Nettle Meadow",
      price: 690,
      stock: 24,
      description:
        "La leche de cabra se combina con la crema de vaca Jersey en esta redonda sabrosa de queso triple crème. En las montañas Adirondack, las cabras de Nettle Meadow se alimentan de una variada selección de pastos y hierbas silvestres, lo que produce una leche de alta calidad y sabor. Se agrega crema fresca de vacas Jersey cercanas para aumentar el contenido de grasa. El resultado es Kunik, un queso decadentemente rico con notas de ralladura de limón y champiñones. Córtalo como si fuera fudge y acompáñalo con pepinillos de ajo y eneldo McClure’s y un rosado burbujeante y afrutado.",
      subdescription:
        "Picante, mantecoso, cremoso / Leche de vaca o de cabra / Pasteurizada / Años: 3 a 6 semanas",
      image: "quesomeadow.jpeg",
      subcategory: "Cremoso",
      featured: false,
      categoryId: 1,
    },
    {
      name: "Sartori Sarvecchio",
      price: 290,
      stock: 14,
      description:
        "Sartori SarVecchio es un queso de estilo italiano similar al Parmigiano Reggiano. Un poco más cremoso y menos salado, este queso fácil de picar tiene una textura firme y quebradiza con un dulce crujido, con notas de frutos secos tostados y caramelo. Acompáñalo con cualquiera de tus acompañamientos favoritos para parm, desde Prosciutto di San Daniele hasta un chorrito de vinagre balsámico de Módena.",
      subdescription:
        "Con sabor a nuez, desmenuzable, dulce / Leche de vaca / Pasteurizada / Años: 18-24 meses",
      image: "quesosartorisarvecchio.jpeg",
      subcategory: "Rallar",
      featured: false,
      categoryId: 1,
    },
    {
      name: "Mitica",
      price: 390,
      stock: 4,
      description:
        "Galicia, en el norte de España, es famosa por sus quesos suaves de leche de vaca, lo que convierte al KM 39, envejecido durante 18 meses, en un verdadero destaque. Las grandes ruedas maduran, desarrollando una textura granulada y deliciosos cristales crujientes. El interior de color amarillo dorado está lleno de complejidad, con una mezcla de notas de piña, caramelo y castaña tostada. Un queso español tan robusto como este merece una tabla inspirada en tapas, con Chorizo Ibérico Fermín, Aceitunas Aloreña Losada y un vino tinto español de cuerpo completo.",
      subdescription:
        "Frutas tropicales, castañas, crujiente cristalino / Leche de vaca / Pasteurizada / Años: 16 meses",
      image: "quesomitica.jpeg",
      subcategory: "Rallar",
      featured: false,
      categoryId: 1,
    },
    {
      name: "Grana Padano",
      price: 890,
      stock: 41,
      description:
        "Este primo del Parmigiano Reggiano merece su propio protagonismo sabroso. El Grana Padano comparte un perfil de sabor similar, seco con notas saladas y dulces. También se puede rallar, pero disfrutarlo en generosos trozos es igual de delicioso. Grana, que significa grano en italiano, es el descriptor perfecto para su pasta escamosa. La corteza de color amarillo paja es firme y gruesa, protegiendo al queso mientras madura durante al menos 20 meses. Prueba una combinación clásica italiana con Prosciutto di Parma o acompáñalo con una copa de Barolo audaz.",
      subdescription:
        "Descascarado, Dulce, Nuez / Leche De Vaca / Cruda / Años: 20 Meses",
      image: "quesogranapadano.jpeg",
      subcategory: "Rallar",
      featured: true,
      categoryId: 1,
    },
    {
      name: "Buonatavola Provolone",
      price: 290,
      stock: 32,
      description:
        "El picante y sabroso Buonatavola® Provolone proviene de las llanuras del norte de Italia. Es un clásico italiano, elaborado con leche fresca de vaca local de la lechería. Una vez formado el queso, se sumerge en salmuera, se ata con cuerda y se cuelga para madurar y desarrollar su profundo sabor especiado. Pruébalo en una tabla de antipasti, acompañado de Speck en rodajas de Murray's, Almendras Miel Tostadas de Murray's y Mini Croccantini de La Panzanella.",
      subdescription:
        "Picante, Lácteo, Salado / Leche de vaca / Cruda / Años: 10 meses",
      image: "quesoprovolone.jpeg",
      subcategory: "Rallar",
      featured: false,
      categoryId: 1,
    },
  ];

  for (const product of products) {
    product.slug = slugify(`${product.name}_${nanoid()}`, {
      replacement: "-",
      lower: true,
      strict: true,
      locale: "es",
      trim: true,
    });
  }

  await Product.bulkCreate(products);
  console.log("[Database] Se corrió el seeder de Products.");
};
