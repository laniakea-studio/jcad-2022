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

export const contact = {
  fi: { title: "Kaikki yhteystiedot", slug: "yhteystiedot" },
  en: { title: "All contacts", slug: "contact" },
  sv: { title: "Alla kontakter", slug: "kontakter" },
};

// On home page after video
export const ctaProduct = {
  fi: {
    title: "Tutustu määrälaskentaohjelmiston hyötyihin",
    slug: "maaralaskentaohjelmisto",
  },
  en: { title: "Read more", slug: "product" },
  sv: { title: "Läs mera", slug: "produkten" },
};

// Todo: use this as source for gatsby node
export const webinar = {
  fi: "webinaarit",
  en: "webinars",
  sv: "webinarer",
};
export const references = {
  fi: "referenssit/",
  en: "references/",
  sv: "referenser/",
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
    //{ title: "Webinars", slug: "webinars" },
    { title: "Contact", slug: "contact" },
  ],
  sv: [
    { title: "Produkten", slug: "produkten" },
    { title: "Prislista", slug: "pris" },
    //{ title: "Webinarer", slug: "webinarer" },
    { title: "Kontakter", slug: "kontakter" },
  ],
};

export const homeMenu = {
  fi: [
    {
      title: "Määrälaskenta",
      slug: "maaralaskentaohjelmisto",
      animation: "product",
    },
    { title: "Hinnoittelu", slug: "hinta", animation: "crosshair" },
    { title: "Referenssit", slug: "referenssit", animation: "columns" },
    { title: "Webinaarit", slug: "webinaarit", animation: "video" },
    { title: "Tutoriaalit", slug: "tutoriaalit", animation: "bullseye" },
    { title: "Yhteystiedot", slug: "yhteystiedot", animation: "jcad" },
    //{ title: "Tilaa JCAD", slug: "tilaa", animation: "columns" },
  ],
  en: [
    { title: "Product", slug: "product", animation: "product" },
    { title: "Pricing", slug: "pricing", animation: "crosshair" },
    { title: "Contact", slug: "contact", animation: "jcad" },
  ],
  sv: [
    { title: "Produkten", slug: "produkten", animation: "product" },
    { title: "Prislista", slug: "pris", animation: "crosshair" },
    { title: "Kontakter", slug: "kontakter", animation: "jcad" },
  ],
};

export const fullMenu = {
  fi: [
    { title: "Määrälaskenta", slug: "maaralaskentaohjelmisto" },
    { title: "Hinnoittelu", slug: "hinta" },
    { title: "Referenssit", slug: "referenssit" },
    { title: "Webinaarit", slug: "webinaarit" },
    { title: "Tutoriaalit", slug: "tutoriaalit" },
    { title: "Yhteystiedot", slug: "yhteystiedot" },
    { title: "Meistä", slug: "meista" },
    { title: "Tilaa JCAD", slug: "tilaa" },
    { title: "Rekry", slug: "rekry" },
  ],
  en: [
    { title: "Product", slug: "product" },
    { title: "Pricing", slug: "pricing" },
    //{ title: "Webinars", slug: "webinars" },
    { title: "Contact", slug: "contact" },
    //{ title: "About us", slug: "about" },
    //{ title: "Jobs", slug: "jobs" },
  ],
  sv: [
    { title: "Produkten", slug: "produkten" },
    { title: "Prislista", slug: "pris" },
    //{ title: "Webinarer", slug: "webinarer" },
    { title: "Kontakter", slug: "kontakter" },
    //{ title: "Om oss", slug: "om-oss" },
    //{ title: "Jobb", slug: "jobb" },
  ],
};
