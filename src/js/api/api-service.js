import axios from 'axios';

// API Ayarları
const API_KEY = '98ff2d6267ceea8e039422b0f46fb813';
const BASE_URL = 'https://api.themoviedb.org/3';

// Merkezi Axios Yapılandırması
const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US', // Varsayılan dil
  },
});

/**
 * Günlük veya Haftalık Trend Filmleri Getirir
 * @param {string} period - 'day' veya 'week' (Varsayılan: 'day')
 * @returns {Promise<Array>} Film listesi
 */
export const getTrending = async (period = 'day') => {
  try {
    const { data } = await api.get(`/trending/movie/${period}`);
    return data.results; //
  } catch (error) {
    console.error(`Trend filmler (${period}) alınamadı:`, error);
    throw error;
  }
};

/**
 * Anahtar kelime ve yıla göre film araması yapar (Katalog Sayfası için)
 * @param {string} query - Arama terimi
 * @param {number} page - Sayfa numarası
 * @param {string} year - Yayın yılı (Opsiyonel)
 */
export const searchMovies = async (query, page = 1, year = '') => {
  try {
    const { data } = await api.get('/search/movie', {
      params: { query, page, year },
    });
    return data; // Sayfalama (pagination) için tüm objeyi döndürüyoruz
  } catch (error) {
    console.error('Film araması başarısız:', error);
    throw error;
  }
};

/**
 * Film detaylarını getirir (Modal penceresi için)
 * @param {number} movieId - Filmin ID'si
 */
export const getMovieDetails = async (movieId) => {
  try {
    const { data } = await api.get(`/movie/${movieId}`);
    return data; //
  } catch (error) {
    console.error('Film detayları alınamadı:', error);
    throw error;
  }
};

/**
 * Filmin videolarını (Fragman/Trailer) getirir
 * @param {number} movieId - Filmin ID'si
 */
export const getMovieVideos = async (movieId) => {
  try {
    const { data } = await api.get(`/movie/${movieId}/videos`);
    // Genellikle 'YouTube' ve 'Trailer' olan ilk videoyu seçmek için filtreleme yapıyoruz
    return data.results.filter(video => video.site === 'YouTube' && video.type === 'Trailer'); //
  } catch (error) {
    console.error('Film fragmanı bulunamadı:', error);
    throw error;
  }
};

/**
 * Gelecek (Upcoming) filmleri getirir
 * @param {number} page - Sayfa numarası
 */
export const getUpcoming = async (page = 1) => {
  try {
    const { data } = await api.get('/movie/upcoming', { params: { page } });
    return data; //
  } catch (error) {
    console.error('Gelecek filmler alınamadı:', error);
    throw error;
  }
};

/**
 * Tüm film türlerini (Genres) getirir (Filtreleme için)
 */
export const getGenres = async () => {
  try {
    const { data } = await api.get('/genre/movie/list');
    return data.genres; //
  } catch (error) {
    console.error('Tür listesi alınamadı:', error);
    throw error;
  }
};

export default {
  getTrending,
  searchMovies,
  getMovieDetails,
  getMovieVideos,
  getUpcoming,
  getGenres,
};