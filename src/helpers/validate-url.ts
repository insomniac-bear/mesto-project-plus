// eslint-disable-next-line no-useless-escape
const isUrlValid = (url: string): Boolean => /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/.test(url);

export default isUrlValid;
