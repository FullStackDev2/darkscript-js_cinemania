const KEY = 'favorites';

export function getLibrary() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('localStorage read error', err);
    return [];
  }
}

export function saveLibrary(arr) {
  try {
    localStorage.setItem(KEY, JSON.stringify(arr));
  } catch (err) {
    console.error('localStorage write error', err);
  }
}

export function isInLibrary(id) {
  const lib = getLibrary();
  return lib.some(m => Number(m.id) === Number(id));
}

export function addMovie(movie) {
  const lib = getLibrary();
  if (!lib.some(m => Number(m.id) === Number(movie.id))) {
    lib.push(movie);
    saveLibrary(lib);
  }
}

export function removeMovie(id) {
  let lib = getLibrary();
  lib = lib.filter(m => Number(m.id) !== Number(id));
  saveLibrary(lib);
}

export default { getLibrary, saveLibrary, isInLibrary, addMovie, removeMovie };
