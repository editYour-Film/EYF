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
  CGUMENOTRS: "/cgu-monteurs",
  CGUCLIENTS: "/cgu-clients",
  ML: "/mentions-legales",
  PC: "/politique-de-cookies",
  CP: "/politique-de-confidentialite",

  CATALOGUE: "/catalogue",
  SEARCH_KEYWORD: "/catalogue/mot-cle",

  SIGNIN: "/signin",
  SIGNIN_TYPE: "/signin/type",
  SIGNIN_EMAIL: "/signin/email",
  SIGNIN_PASSWORD: "/signin/password",
  SIGNIN_RESET_PWD_P1: "/signin/reset/current",
  SIGNIN_RESET_PWD_P2: "/signin/reset/update",
  SIGNIN_RESET_PWD_P3: "/signin/reset/link",

  SIGNUP: "/signup",
  SIGNUP_EMAIL: "/signup/email",
  SIGNUP_ACCOUNT_TYPE: "/signup/type",
  SIGNUP_PASSWORD: "/signup/password",
  SIGNUP_CONFIRM_PASSWORD: "/signup/confirm-password",
  SIGNUP_CGU: "/signup/cgu",
  SIGNUP_INFO: "/signup/info",
  SIGNUP_SUCCESS: "/signup/success",

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
  DASHBOARD_EDITOR_MISSIONS: "/dashboard/monteur/missions",
  DASHBOARD_EDITOR_HISTORY: "/dashboard/monteur/historique",
  DASHBOARD_EDITOR_PROFIL: "/dashboard/monteur/profil",
};

export default routes;

const landings = [routes.HOME, routes.WHOWEARE, routes.BLOG];

export { landings };

const signin = [
  routes.SIGNIN_TYPE,
  routes.SIGNIN_EMAIL,
  routes.SIGNIN_PASSWORD,
  routes.SIGNIN_RESET_PWD_P1,
  routes.SIGNIN_RESET_PWD_P2,
  routes.SIGNIN_RESET_PWD_P3,
];

const signup = [
  routes.SIGNUP_EMAIL,
  routes.SIGNUP_ACCOUNT_TYPE,
  routes.SIGNUP_PASSWORD,
  routes.SIGNUP_CONFIRM_PASSWORD,
  routes.SIGNUP_CGU,
  routes.SIGNUP_INFO,
  routes.SIGNUP_SUCCESS,
];

const quote = [routes.QUOTE_STEP1, routes.QUOTE_STEP2, routes.QUOTE_STEP3];

const navWithoutTransition = [
  [routes.BLOG_DETAIL, routes.BLOG_DETAIL],
  ...getRoutesConnexion(signin),
  ...getRoutesConnexion(signup),
  ...getRoutesConnexion(quote),
];

export { navWithoutTransition };
