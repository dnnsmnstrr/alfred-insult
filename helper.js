export const getDateString = (date = new Date()) => new Date(date).toISOString().slice(0, 16).replace('T', ' ');

export const getKeys = obj => JSON.stringify(Object.keys(obj));
