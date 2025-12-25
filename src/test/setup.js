import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import * as matchers from '@testing-library/jest-dom/matchers';

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers);

// Cleanup after each test
afterEach(() => {
  cleanup();
  // Restore body styles
  document.body.style.overflow = 'unset';
  // Reset viewport
  if (window.innerWidth) {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
  }
  if (window.innerHeight) {
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 768,
    });
  }
  // Clear IndexedDB mock data between tests
  mockStoreData = {
    content: [],
    anonymousQuizzes: [],
    uploadedFiles: [],
  };
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
};

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock IndexedDB with functional callbacks
// Simplified to prevent memory leaks and Firebase compatibility issues
let requestCounter = 0;
const createMockRequest = (result = null) => {
  const requestId = ++requestCounter;
  const request = {
    onerror: null,
    onsuccess: null,
    result: result,
    error: null,
    _triggered: false,
    _id: requestId,
  };
  // Use setTimeout with 0 delay to avoid immediate execution and prevent infinite loops
  setTimeout(() => {
    if (request.onsuccess && !request._triggered) {
      request._triggered = true;
      try {
        request.onsuccess({ target: request });
      } catch (error) {
        // Silently catch errors from Firebase trying to call .close() etc.
        if (!error.message?.includes('close')) {
          console.error('IndexedDB mock error:', error);
        }
      }
    }
  }, 0);
  return request;
};

// Store data across test runs - reset between tests
let mockStoreData = {
  content: [],
  anonymousQuizzes: [],
  uploadedFiles: [],
};

const createMockStore = (storeName = 'content') => {
  const store = storeName === 'anonymousQuizzes' ? mockStoreData.anonymousQuizzes : 
                storeName === 'uploadedFiles' ? mockStoreData.uploadedFiles : 
                mockStoreData.content;
  
  return {
    add: vi.fn((data) => {
      const id = Date.now() + Math.random();
      const item = { id, ...data };
      store.push(item);
      const request = createMockRequest(id);
      return request;
    }),
    get: vi.fn((id) => {
      const item = store.find(d => d.id === id) || null;
      const request = createMockRequest(item);
      return request;
    }),
    getAll: vi.fn(() => {
      const request = createMockRequest([...store]);
      return request;
    }),
    delete: vi.fn((id) => {
      const index = store.findIndex(d => d.id === id);
      if (index > -1) store.splice(index, 1);
      return createMockRequest();
    }),
    clear: vi.fn(() => {
      store.length = 0;
      return createMockRequest();
    }),
  };
};

const createMockDB = () => {
  const db = {
    objectStoreNames: {
      contains: vi.fn((name) => {
        // Return true for stores we know about
        return ['content', 'anonymousQuizzes', 'uploadedFiles'].includes(name);
      }),
    },
    createObjectStore: vi.fn((name) => createMockStore(name)),
    transaction: vi.fn((stores, mode) => {
      const storeName = Array.isArray(stores) ? stores[0] : stores;
      return {
        objectStore: vi.fn(() => createMockStore(storeName)),
        onerror: null,
        oncomplete: null,
      };
    }),
    close: vi.fn(), // Add close method for Firebase compatibility
    // Add other methods Firebase might call
    version: 1,
    name: 'quizforge',
  };
  return db;
};

const mockIndexedDB = {
  open: vi.fn((dbName, version) => {
    const db = createMockDB();
    const request = createMockRequest(db);
    request.onupgradeneeded = null;
    
    // Trigger onupgradeneeded first if provided (for store creation)
    setTimeout(() => {
      if (request.onupgradeneeded) {
        try {
          request.onupgradeneeded({ target: { result: db } });
        } catch (error) {
          // Ignore errors during upgrade
        }
      }
      // Then trigger onsuccess
      if (request.onsuccess && !request._triggered) {
        request._triggered = true;
        request.onsuccess({ target: request });
      }
    }, 0);
    
    return request;
  }),
};

global.indexedDB = mockIndexedDB;

// Mock FileReader for IndexedDB file operations
global.FileReader = class FileReader {
  constructor() {
    this.onload = null;
    this.onerror = null;
    this.result = null;
  }
  readAsArrayBuffer(file) {
    // Simulate successful read
    Promise.resolve().then(() => {
      this.result = new ArrayBuffer(8);
      if (this.onload) {
        this.onload({ target: this });
      }
    });
  }
};
