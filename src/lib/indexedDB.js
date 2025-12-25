/**
 * IndexedDB utility for storing user data locally
 * Stores uploaded content, file data, and anonymous quiz data
 */

const DB_NAME = 'quizforge';
const DB_VERSION = 1;
const STORES = {
  CONTENT: 'content',
  ANONYMOUS_QUIZZES: 'anonymousQuizzes',
  UPLOADED_FILES: 'uploadedFiles'
};

let db = null;

/**
 * Initialize IndexedDB
 */
export const initDB = () => {
  return new Promise((resolve, reject) => {
    if (db) {
      resolve(db);
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      reject(new Error('Failed to open IndexedDB'));
    };

    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const database = event.target.result;

      // Create object stores if they don't exist
      if (!database.objectStoreNames.contains(STORES.CONTENT)) {
        database.createObjectStore(STORES.CONTENT, { keyPath: 'id', autoIncrement: true });
      }

      if (!database.objectStoreNames.contains(STORES.ANONYMOUS_QUIZZES)) {
        database.createObjectStore(STORES.ANONYMOUS_QUIZZES, { keyPath: 'id', autoIncrement: true });
      }

      if (!database.objectStoreNames.contains(STORES.UPLOADED_FILES)) {
        database.createObjectStore(STORES.UPLOADED_FILES, { keyPath: 'id', autoIncrement: true });
      }
    };
  });
};

/**
 * Store uploaded content
 */
export const storeContent = async (content, metadata = {}) => {
  await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORES.CONTENT], 'readwrite');
    const store = transaction.objectStore(STORES.CONTENT);
    
    const data = {
      content,
      metadata,
      timestamp: new Date().toISOString()
    };

    const request = store.add(data);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

/**
 * Get stored content
 */
export const getContent = async (id) => {
  await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORES.CONTENT], 'readonly');
    const store = transaction.objectStore(STORES.CONTENT);
    const request = store.get(id);
    
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

/**
 * Store anonymous quiz
 */
export const storeAnonymousQuiz = async (quiz) => {
  await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORES.ANONYMOUS_QUIZZES], 'readwrite');
    const store = transaction.objectStore(STORES.ANONYMOUS_QUIZZES);
    
    const data = {
      ...quiz,
      timestamp: new Date().toISOString()
    };

    const request = store.add(data);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

/**
 * Get all anonymous quizzes
 */
export const getAnonymousQuizzes = async () => {
  await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORES.ANONYMOUS_QUIZZES], 'readonly');
    const store = transaction.objectStore(STORES.ANONYMOUS_QUIZZES);
    const request = store.getAll();
    
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

/**
 * Delete anonymous quiz
 */
export const deleteAnonymousQuiz = async (id) => {
  await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORES.ANONYMOUS_QUIZZES], 'readwrite');
    const store = transaction.objectStore(STORES.ANONYMOUS_QUIZZES);
    const request = store.delete(id);
    
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

/**
 * Check if user has already generated an anonymous quiz
 */
export const hasAnonymousQuiz = async () => {
  const quizzes = await getAnonymousQuizzes();
  return quizzes.length > 0;
};

/**
 * Store uploaded file data
 */
export const storeFile = async (file, metadata = {}) => {
  await initDB();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const transaction = db.transaction([STORES.UPLOADED_FILES], 'readwrite');
      const store = transaction.objectStore(STORES.UPLOADED_FILES);
      
      const data = {
        name: file.name,
        type: file.type,
        size: file.size,
        data: e.target.result,
        metadata,
        timestamp: new Date().toISOString()
      };

      const request = store.add(data);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsArrayBuffer(file);
  });
};

/**
 * Get stored file
 */
export const getFile = async (id) => {
  await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORES.UPLOADED_FILES], 'readonly');
    const store = transaction.objectStore(STORES.UPLOADED_FILES);
    const request = store.get(id);
    
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

/**
 * Clear all stored data (useful for logout or cleanup)
 */
export const clearAllData = async () => {
  await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([
      STORES.CONTENT,
      STORES.ANONYMOUS_QUIZZES,
      STORES.UPLOADED_FILES
    ], 'readwrite');
    
    let completed = 0;
    const total = 3;
    
    const checkComplete = () => {
      completed++;
      if (completed === total) resolve();
    };
    
    transaction.objectStore(STORES.CONTENT).clear().onsuccess = checkComplete;
    transaction.objectStore(STORES.ANONYMOUS_QUIZZES).clear().onsuccess = checkComplete;
    transaction.objectStore(STORES.UPLOADED_FILES).clear().onsuccess = checkComplete;
    
    transaction.onerror = () => reject(transaction.error);
  });
};

