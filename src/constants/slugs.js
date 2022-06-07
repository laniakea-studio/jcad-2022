export const prefix = {
  fi: "/",
  en: "/en/",
  sv: "/sv/",
};

export const order = {
  fi: { title: "Tilaa JCAD", slug: "tilaa" },
  en: { title: "Tilaa JCAD", slug: "order" },
  sv: { title: "Tilaa JCAD", slug: "bestall" },
};

// Todo: use this as source for gatsby node
export const webinar = {
  fi: "webinaarit",
  en: "webinars",
  sv: "webinarer",
};

export const mainMenu = {
  fi: [
    { title: "Määrälaskenta", slug: "maaralaskentaohjelmisto" },
    { title: "Hinnoittelu", slug: "hinta" },
    { title: "Webinaarit", slug: "webinaarit" },
    { title: "Yhteystiedot", slug: "yhteystiedot" },
  ],
  en: [
    { title: "Product", slug: "product" },
    { title: "Pricing", slug: "pricing" },
    { title: "Webinars", slug: "webinars" },

    { title: "Contact", slug: "contact" },
  ],
  sv: [
    { title: "Produkten", slug: "produkten" },
    { title: "Prislista", slug: "pris" },
    { title: "Webinarer", slug: "webinarer" },

    { title: "Kontakter", slug: "kontakter" },
  ],
};

export const fullMenu = {
  fi: [
    { title: "Määrälaskenta", slug: "maaralaskentaohjelmisto" },
    { title: "Hinnoittelu", slug: "hinta" },
    { title: "Yhteystiedot", slug: "yhteystiedot" },
    { title: "Webinaarit", slug: "webinaarit" },
    { title: "Meistä", slug: "meista" },
    { title: "Rekry", slug: "rekry" },
  ],
  en: [
    { title: "Product", slug: "product" },
    { title: "Pricing", slug: "pricing" },
    { title: "Contact", slug: "contact" },
    { title: "Webinars", slug: "webinars" },
    { title: "About us", slug: "about" },
    { title: "Jobs", slug: "jobs" },
  ],
  sv: [
    { title: "Produkten", slug: "produkten" },
    { title: "Prislista", slug: "pris" },
    { title: "Kontakter", slug: "kontakter" },
    { title: "Webinarer", slug: "webinarer" },
    { title: "Om oss", slug: "om-oss" },
    { title: "Jobb", slug: "jobb" },
  ],
};
