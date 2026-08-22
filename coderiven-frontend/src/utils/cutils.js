import { retrieveData } from "./localStorage";

export const isAuth = retrieveData('isAuth') || false;
