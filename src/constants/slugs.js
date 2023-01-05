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

export const bookDemo = {
  fi: { title: "Varaa demo", slug: "varaa-demo" },
  en: { title: "Free trial", slug: "free-trial" },
  sv: { title: "Boka demo", slug: "boka-demo" },
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

export const tutorials = {
  fi: "tutoriaalit/",
  en: "tutorials/",
  sv: "tutorialer/",
};

export const mainMenu = {
  fi: [
    { title: "Määrälaskenta", slug: "maaralaskentaohjelmisto" },
    { title: "Hinnoittelu", slug: "hinta" },
    { title: "Referenssit", slug: "referenssit" },
    { title: "Yhteystiedot", slug: "yhteystiedot" },
  ],
  en: [
    { title: "Product", slug: "product" },
    { title: "Pricing", slug: "pricing" },
    { title: "Tutorials", slug: "tutorials" },
    { title: "Contact", slug: "contact" },
  ],
  sv: [
    { title: "Produkten", slug: "produkten" },
    { title: "Prislista", slug: "pris" },
    { title: "Kontakter", slug: "kontakter" },
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
    { title: "Tutorials", slug: "tutorials" },
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
