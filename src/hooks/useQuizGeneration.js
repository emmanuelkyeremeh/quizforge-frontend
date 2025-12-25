import { useState } from 'react';
import { api } from '../lib/api.js';
import { storeAnonymousQuiz, hasAnonymousQuiz, storeFile } from '../lib/indexedDB.js';
import toast from 'react-hot-toast';

export const useQuizGeneration = () => {
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState('');

  const generateQuiz = async (content, config, files = null) => {
    setGenerating(true);
    setProgress('Analyzing content...');

    try {
      let result;
      
      // Handle both single file (backward compatibility) and multiple files
      const filesArray = files ? (Array.isArray(files) ? files : [files]) : [];
      
      if (filesArray.length > 0) {
        // Store files in IndexedDB
        setProgress('Storing files...');
        for (const file of filesArray) {
          await storeFile(file, {
            questionCount: config.questionCount,
            types: config.types,
            difficulty: config.difficulty,
            subject: config.subject,
            title: config.title,
          });
        }
        
        setProgress(`Processing ${filesArray.length} file${filesArray.length > 1 ? 's' : ''}...`);
        result = await api.generateQuizFromFile(filesArray, {
          questionCount: config.questionCount,
          types: config.types,
          difficulty: config.difficulty,
          subject: config.subject,
          title: config.title,
        });
      } else {
        setProgress('Generating questions...');
        result = await api.generateQuiz({
          content,
          questionCount: config.questionCount,
          types: config.types,
          difficulty: config.difficulty,
          subject: config.subject,
          title: config.title,
        });
      }

      setProgress('Finalizing your quiz...');

      // If anonymous quiz, store in IndexedDB
      if (result.isAnonymous) {
        await storeAnonymousQuiz(result);
        toast.success('Quiz generated! Sign up to save and generate more.');
      } else {
        toast.success('Quiz generated successfully!');
      }

      return result;
    } catch (error) {
      toast.error(error.message || 'Failed to generate quiz');
      throw error;
    } finally {
      setGenerating(false);
      setProgress('');
    }
  };

  const checkAnonymousLimit = async () => {
    const hasQuiz = await hasAnonymousQuiz();
    return hasQuiz;
  };

  return {
    generateQuiz,
    generating,
    progress,
    checkAnonymousLimit,
  };
};

