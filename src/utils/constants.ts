export const ARTICLE_PER_PAGE = 6;

const DEVELOPMENT_DOMAIN = "http://localhost:3000";
const PRODUCTION_DOMAIN = "https://next-js-final-train-deploy-z2vz.vercel.app";

export const DOMAIN = process.env.NODE_ENV === 'production' ? PRODUCTION_DOMAIN  : DEVELOPMENT_DOMAIN; 

