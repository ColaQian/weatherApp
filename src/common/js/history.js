import storage from 'good-storage'

const HISTORY_KEY = '__HISTORY__'
const MAX_LENGTH = 8

export function saveHistory(city) {
  let cities = storage.get(HISTORY_KEY, [])

  let plIndex = cities.findIndex((item) => {
    return item === city
  })
  if (plIndex === 0) {
    return
  }
  if (plIndex > 0) {
    cities.splice(plIndex, 1)
  }
  cities.unshift(city)
  if (cities.length > MAX_LENGTH) {
    cities.pop()
  }

  storage.set(HISTORY_KEY, cities)

  return cities
}

export function loadCache() {
  return storage.get(HISTORY_KEY, [])
}