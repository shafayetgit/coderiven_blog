import CryptoJS from 'crypto-js';

const secretKey = import.meta.env.VITE_LOCAL_STORAGE_ENCRYPTION_KEY;

if (!secretKey) {
  console.error('Encryption key is missing. Check your environment configuration.');
}

/**
 * Encrypts the given data and stores it in localStorage.
 * @param {string} key - The key under which to store the encrypted data in localStorage.
 * @param {Object} data - The data to encrypt and store.
 */
export const storeData = (key, data) => {
  try {
    if (!secretKey) {
      throw new Error('Encryption key is missing.');
    }

    const cipherText = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      secretKey
    ).toString();
    localStorage.setItem(key, cipherText);
  } catch (error) {
    console.error('Error encrypting data:', error);
  }
};

/**
 * Retrieves and decrypts the data stored in localStorage.
 * @param {string} key - The key under which the encrypted data is stored in localStorage.
 * @returns {Object|null} - The decrypted data, or null if decryption fails.
 */
export const retrieveData = (key) => {
  try {
    if (!secretKey) {
      throw new Error('Encryption key is missing.');
    }

    const cipherText = localStorage.getItem(key);
    if (!cipherText) {
      console.warn('No data found for key:', key);
      return null;
    }

    const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
    const decryptedString = bytes.toString(CryptoJS.enc.Utf8);

    if (!decryptedString) {
      console.error('Decryption failed. Check secretKey or cipherText.');
      return null;
    }

    return JSON.parse(decryptedString);
  } catch (error) {
    console.error('Error decrypting data:', error);
    return null;
  }
};

/**
 * Removes the data stored in localStorage.
 * @param {string} key - The key under which the data is stored in localStorage.
 */
export const removeData = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing data from localStorage:', error);
  }
};
