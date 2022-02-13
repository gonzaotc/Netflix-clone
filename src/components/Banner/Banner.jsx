import React from "react";
import { Autoplay, EffectFade } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import "./Banner.scss";

const medalIcon = require("../../assets/icons/medal2.png");

const slides = [
  {
    title: "Infinity War",
    type: "PELÍCULA",
    image: "https://fondosmil.com/fondo/12733.jpg",
    description:
      "Después de haber adquirido la Gema del Poder que había quedado bajo custodia de los Nova Corps en el planeta Xandar,7​8​9​10​ el malvado titán intergaláctico Thanos, intercepta la nave espacial que transportaba a los sobrevivientes de la destrucción de Asgard y la ataca.11​ Durante el asalto a la nave, Thanos y sus lugartenientes, Ebony Maw, Cull Obsidian, Próxima Midnight y Corvus Glaive, exterminan a la mitad de la tripulación.10​ Thanos somete a Thor y amenaza a Loki con matar a su hermano adoptivo si no le entrega el Teseracto,9​ al principio Loki finge que no le importa la vida de su hermano, pero al ver la determinación de Thanos, cede ante la presión y le muestra el Teseracto para ganar tiempo hasta que llega Hulk y comienza a pelear contra el guerrero extraterrestre, no obstante, el titán demostró tener más habilidad en la lucha mano a mano y derrota rápidamente a Hulk.12​13​ Al ver esto, Heimdall quien yacía malherido en el suelo, usa lo que le queda de energía oscura para enviar a Bruce Banner / Hulk de regreso a la Tierra invocando el Bifröst,11​ eso enfadó a Thanos y en represalia asesina a Heimdall.11​ Luego extrae la Gema del Espacio del Teseracto y mata a Loki.7​11​ Una vez que cumple su cometido, Thanos se va con sus lugartenientes y destruye la nave espacial.14​",
  },
  {
    title: "The Witcher",
    type: "SERIE",
    image: "https://wallpaperaccess.com/full/2052703.jpg",
    description:
      "La historia se centra en el personaje Geralt de Rivia, quien recibe una carta de su amante Yennefer de Vengerberg diciendo que necesita localizarlo lo antes posible. Geralt, después de encontrar a su amante, aprende que Ciri, nieta de Calenthe y exalumna del mismo personaje, es buscada por La Cacería Salvaje, un grupo antiguo de espectros que están liderados por el Rey de La Cacería Salvaje. Tras varios sucesos que llevan al personaje principal a buscar a Ciri en la gran ciudad de Novigrado, en las Islas Skellige y en las tierras de Velen, Geralt, aprende que La Cacería Salvaje, busca una manera de que se cumpla la Profecía de Ithlinne, la cual dice que el universo será destruido por el Frío Blanco. Ciri, debido a que es hija de la sangre vieja, es la única que puede destruir esta profecía y salvar al mundo.",
  },
  {
    title: "The Queen's Gambit",
    type: "SERIE",
    image: "https://www.xtrafondos.com/en/descargar.php?id=6546&resolucion=2048x1152",
    description:
      "Gambito de dama es una historia ficticia que sigue la vida de una huérfana prodigio del ajedrez, Beth Harmon (Anya Taylor-Joy), durante su búsqueda para convertirse en la mejor jugadora de ajedrez del mundo mientras lucha con problemas emocionales y dependencia de las drogas y el alcohol. La historia comienza a mediados de la década de 1950 y continúa hasta la de 1960.5​La serie comienza en un orfanato de niñas donde Beth conoce a Jolene (Moses Ingram), una niña vibrante y amigable unos años mayor que ella; Helen Deardorff (Christiane Seidel), la mujer que dirige el orfanato; y el Señor Shaibel (Bill Camp), el conserje que enseña a Beth sus primeras lecciones de ajedrez.",
  },
];

const truncate = string => {
  return string.length > 200 ? string.slice(0, 200) + "..." : string;
};

for (let slide of slides) {
  slide.description = truncate(slide.description);
}

const Banner = () => {
  return (
    <div className="banner">
      <Swiper
        modules={[Autoplay, EffectFade]}
        slidesPerView={1}
        autoplay={{ delay: 7000, disableOnInteraction: false }}
        speed={2500}
        loop={true}
        effect="fade"
        fadeEffect={{ crossFade: true }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <img className="slide__image" src={slide.image} alt={`slider ${index + 1}`} />
            <div className="slide__content__container">
              <div className="slide__content">
                <div className="slide__info">
                  <span className="slide__info__type">
                    <img
                      src="https://icones.pro/wp-content/uploads/2021/04/icone-netflix-symbole-logo-original.png"
                      alt="netflix N"
                    />
                    <span>{slide.type}</span>
                  </span>
                  <span className="slide__info__title">{slide.title}</span>
                  <span className="slide__info__rank">
                    <img src={medalIcon} alt="top movie" />
                    <p>{`N.º ${index + 1} en ${slide.type.toLowerCase()}s hoy`}</p>
                  </span>
                  <span className="slide__info__description">{slide.description}</span>
                  <span className="slide__info__buttons">
                    <button>Reproducir</button>
                    <button>Más Información</button>
                  </span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="banner__fadeout"></div>
    </div>
  );
};

export default Banner;
