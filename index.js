const alfy = require('alfy');
const {getDateString, getKeys} = require('./helper')
const API_URL='https://evilinsult.com/generate_insult.php?lang=en&type=json'
const data = await alfy.fetch(API_URL);

const shouldClear = alfy.input.includes('cache-clear')

const insult = data.insult.replace(/&quot;/g, '"').replace(/&amp;/g, '&')
const newInsult = {
  title: insult,
  subtitle: '🔵 new',
}

const insults = []

for (var cachedInsult of alfy.cache) {
  insults.unshift(cachedInsult[1].data)
}

const clear = insults.length >= 1 ? {
  title: 'Cache-clear',
  autocomplete: 'cache-clear',
  valid: false,
} : {
  title: 'Cache-cleared',
  autocomplete: '',
  valid: false,
}

insults.push(clear)
insults.unshift(newInsult)

let items = alfy.inputMatches(insults.sort((a, b) => new Date(b.created) - new Date(a.created)), 'title').map((item) => ({
  ...item,
  arg: item.title,
  text: {copy: item.title, largetype: item.title},
  quicklookurl: "https://www.evilinsult.com/"
}))

if (!alfy.cache.has(data.number) && !shouldClear) {
  alfy.cache.set(data.number, {title: insult, subtitle: getDateString(data.created), ...data});
}

if (shouldClear) {
  alfy.cache.clear()
}

alfy.output(items, shouldClear ? {
		rerunInterval: 0.1
	} : {});
