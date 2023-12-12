// getRoutesConnexion takes an array and return
//all possible combinations of two items

const getRoutesConnexion = (array: string[]) => {
  const _array = array;
  let r: string[][] = [];

  array.forEach((item, i) => {
    let connexions: string[][] = [];
    _array.forEach((element, j) => {
      if (i > j) return;
      let connexion = [item, element];
      item !== element && connexions.push(connexion);
    });

    r = [...r, ...connexions];
  });

  return r;
};

let routes = {
  HOME: "/",
  WHOWEARE: "/qui-sommes-nous",
  CGU: "/cgu",
  CGUEDITOR: "/cgu-monteurs",
  CGUCLIENTS: "/cgu-clients",
  ML: "/mentions-legales",
  PC: "/politique-de-cookies",
  CP: "/politique-de-confidentialite",

  CATALOGUE: "/catalogue",
  SEARCH_KEYWORD: "/catalogue/mot-cle",

  SIGNIN: "/signin",

  SIGNUP: "/signup",

  QUOTE_STEP1: "/quote/",
  QUOTE_STEP2: "/quote/model",
  QUOTE_STEP3: "/quote/files",
  QUOTE_STEP4: "/quote/payment",

  MENTOR_CATALOGUE: "/monteur/profile",

  BLOG: "/blog",
  BLOG_DETAIL: "/blog/[slug]",
  BLOG_CATEGORY: "/blog/categorie/[slug]",

  DASHBOARD_EDITOR: "/dashboard/monteur/accueil",
  DASHBOARD_EDITOR_HOME: "/dashboard/monteur/accueil",
  DASHBOARD_EDITOR_SCHEDULE: "/dashboard/monteur/agenda",
  DASHBOARD_EDITOR_ORDERS: "/dashboard/monteur/commandes",
  DASHBOARD_EDITOR_STUDIO: "/dashboard/monteur/studio",
  DASHBOARD_EDITOR_DOCUMENTS: "/dashboard/monteur/documents",
  DASHBOARD_EDITOR_PROFIL: "/dashboard/monteur/profil",
  DASHBOARD_EDITOR_SETTINGS: "/dashboard/monteur/settings",

  DASHBOARD_CLIENT: '/dashboard/client/accueil',
  DASHBOARD_CLIENT_HOME: '/dashboard/client/accueil',
  DASHBOARD_CLIENT_PROFIL: '/dashboard/client/profil',
  DASHBOARD_CLIENT_ORDERS: '/dashboard/client/orders',
  DASHBOARD_CLIENT_STUDIO: '/dashboard/client/studio',
  DASHBOARD_CLIENT_FILES: '/dashboard/client/files',
  DASHBOARD_CLIENT_SETTINGS: '/dashboard/client/settings',

};

export default routes;

const landings = [routes.HOME, routes.WHOWEARE, routes.BLOG];

export { landings };

const quote = [routes.QUOTE_STEP1, routes.QUOTE_STEP2, routes.QUOTE_STEP3];

const navWithoutTransition = [
  [routes.BLOG_DETAIL, routes.BLOG_DETAIL],
  ...getRoutesConnexion([routes.SIGNIN]),
  ...getRoutesConnexion([routes.SIGNUP]),
  ...getRoutesConnexion(quote),
];

export { navWithoutTransition };
