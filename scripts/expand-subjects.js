import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Additional subjects to add (45 more to reach 50 total)
const additionalSubjects = [
  {
    "slug": "spanish",
    "name": "Spanish",
    "description": "Spanish quiz generator for creating assessments on vocabulary, grammar, verb conjugations, and cultural knowledge. Perfect for Spanish language teachers, AP Spanish instructors, and language tutors.",
    "targetAudience": "Spanish language teachers, AP Spanish instructors, language tutors, and Spanish professors",
    "specificChallenges": [
      "Creating questions that test language proficiency, not just translation",
      "Covering verb conjugations across different tenses and moods",
      "Testing cultural knowledge alongside linguistic skills",
      "Generating questions that require understanding context and nuance"
    ],
    "useCases": [
      "AP Spanish teachers creating practice exams for the AP test",
      "Spanish professors generating vocabulary quizzes for intermediate students",
      "Language tutors creating conjugation practice for irregular verbs",
      "High school teachers preparing students for Spanish proficiency exams"
    ],
    "exampleQuestions": [
      {
        "question": "Conjugate the verb 'hablar' in the present subjunctive for 'nosotros'.",
        "type": "short-answer",
        "difficulty": "medium",
        "bloomsLevel": "application"
      },
      {
        "question": "Which of the following means 'library' in Spanish?",
        "options": ["libro", "biblioteca", "librería", "libreta"],
        "correctAnswer": "biblioteca",
        "type": "multiple-choice",
        "difficulty": "easy"
      },
      {
        "question": "Explain the difference between 'ser' and 'estar' and provide examples of when to use each.",
        "type": "short-answer",
        "difficulty": "hard",
        "bloomsLevel": "analysis"
      }
    ],
    "relatedSubjects": ["french", "languages", "ap-spanish", "spanish-literature", "latin"],
    "certifications": ["AP Spanish Language", "AP Spanish Literature", "DELE"],
    "gradeLevel": "middle-school-college",
    "faqs": [
      {
        "question": "Can QuizForge generate questions about Spanish verb conjugations?",
        "answer": "Yes! QuizForge can create questions covering all verb tenses including present, preterite, imperfect, future, conditional, subjunctive, and imperative moods. It generates questions for regular and irregular verbs."
      },
      {
        "question": "Does it support AP Spanish curriculum?",
        "answer": "QuizForge generates questions aligned with AP Spanish Language and AP Spanish Literature curricula, covering grammar, vocabulary, reading comprehension, and cultural knowledge as required by the College Board."
      },
      {
        "question": "Can I generate questions from Spanish textbook chapters?",
        "answer": "Absolutely. Upload PDF chapters from your Spanish textbook, and QuizForge will extract vocabulary, grammar concepts, and cultural information to create questions that test both linguistic skills and cultural understanding."
      }
    ],
    "keyTopics": [
      "Verb conjugations and tenses",
      "Vocabulary and expressions",
      "Grammar and syntax",
      "Reading comprehension",
      "Cultural knowledge",
      "Writing and composition",
      "Listening comprehension"
    ]
  },
  {
    "slug": "english-literature",
    "name": "English Literature",
    "description": "English literature quiz generator for creating assessments on literary analysis, themes, character development, and literary devices. Ideal for high school English teachers, AP Literature instructors, and college professors.",
    "targetAudience": "English literature teachers, AP Literature instructors, college English professors, and literature tutors",
    "specificChallenges": [
      "Creating questions that test literary analysis, not just plot recall",
      "Covering themes, symbolism, and author's craft",
      "Aligning with AP Literature curriculum and literary analysis skills",
      "Generating questions that require textual evidence and interpretation"
    ],
    "useCases": [
      "AP Literature teachers creating unit tests on Shakespeare and poetry",
      "English professors generating exam questions on American literature",
      "High school teachers preparing students for literature standardized tests",
      "Tutors helping students analyze complex literary works"
    ],
    "exampleQuestions": [
      {
        "question": "Analyze the symbolism of the green light in 'The Great Gatsby'. What does it represent and how does it develop throughout the novel?",
        "type": "short-answer",
        "difficulty": "hard",
        "bloomsLevel": "analysis"
      },
      {
        "question": "Which literary device is used in the phrase 'the wind whispered through the trees'?",
        "options": ["Metaphor", "Personification", "Simile", "Alliteration"],
        "correctAnswer": "Personification",
        "type": "multiple-choice",
        "difficulty": "easy"
      },
      {
        "question": "Compare the themes of isolation in 'Frankenstein' and 'The Metamorphosis'. How do the authors use different literary techniques to explore this theme?",
        "type": "short-answer",
        "difficulty": "hard",
        "bloomsLevel": "synthesis"
      }
    ],
    "relatedSubjects": ["english", "writing", "ap-literature", "poetry", "drama"],
    "certifications": ["AP English Literature", "IB English Literature"],
    "gradeLevel": "high-school-college",
    "faqs": [
      {
        "question": "Can QuizForge generate questions about literary analysis and themes?",
        "answer": "Yes! QuizForge generates questions that test literary analysis skills including theme identification, character development, symbolism, figurative language, and author's craft. It creates questions requiring textual evidence and interpretation."
      },
      {
        "question": "Does it align with AP Literature curriculum?",
        "answer": "QuizForge generates questions aligned with AP English Literature curriculum, covering poetry, prose, and drama analysis as required by the College Board. Questions test skills in reading, analyzing, and writing about literature."
      },
      {
        "question": "Can I generate questions from literary texts and novels?",
        "answer": "Absolutely. Upload PDFs of novels, short stories, poems, or plays, and QuizForge will extract key themes, literary devices, and character developments to create questions that test deep understanding of the text."
      }
    ],
    "keyTopics": [
      "Literary analysis and interpretation",
      "Theme identification and development",
      "Character analysis and development",
      "Literary devices and figurative language",
      "Poetry analysis and meter",
      "Drama and theatrical elements",
      "Historical and cultural context"
    ]
  },
  {
    "slug": "nclex",
    "name": "NCLEX",
    "description": "NCLEX quiz generator for creating practice questions for the National Council Licensure Examination. Perfect for nursing students preparing for the NCLEX-RN or NCLEX-PN exams.",
    "targetAudience": "nursing students, NCLEX test prep instructors, nursing tutors, and nursing school faculty",
    "specificChallenges": [
      "Creating questions that mirror NCLEX format and difficulty",
      "Covering all NCLEX content areas including safety, pharmacology, and patient care",
      "Aligning with NCLEX test plan and content areas",
      "Generating questions that test clinical judgment and prioritization"
    ],
    "useCases": [
      "Nursing students creating practice question sets for NCLEX-RN preparation",
      "NCLEX prep instructors generating mock exams for their classes",
      "Nursing tutors creating focused practice on weak areas",
      "Nursing school faculty preparing students for the licensing exam"
    ],
    "exampleQuestions": [
      {
        "question": "A patient with type 1 diabetes is experiencing hypoglycemia. What is the nurse's priority action?",
        "type": "multiple-choice",
        "difficulty": "medium",
        "bloomsLevel": "application",
        "options": ["Administer insulin", "Give oral glucose", "Check blood pressure", "Obtain EKG"],
        "correctAnswer": "Give oral glucose"
      },
      {
        "question": "Which medication requires monitoring of therapeutic drug levels?",
        "options": ["Aspirin", "Digoxin", "Ibuprofen", "Acetaminophen"],
        "correctAnswer": "Digoxin",
        "type": "multiple-choice",
        "difficulty": "easy"
      },
      {
        "question": "A patient is scheduled for surgery. The nurse knows that informed consent must be obtained. Who is legally responsible for obtaining this consent?",
        "type": "multiple-choice",
        "difficulty": "medium",
        "bloomsLevel": "application",
        "options": ["The nurse", "The surgeon", "The anesthesiologist", "The patient's family"],
        "correctAnswer": "The surgeon"
      }
    ],
    "relatedSubjects": ["nursing", "pharmacology", "medical-terminology", "anatomy", "physiology"],
    "certifications": ["NCLEX-RN", "NCLEX-PN"],
    "gradeLevel": "professional",
    "faqs": [
      {
        "question": "Can QuizForge generate NCLEX-style questions?",
        "answer": "Yes! QuizForge can create questions in NCLEX format covering all content areas including safe and effective care environment, health promotion and maintenance, psychosocial integrity, and physiological integrity. Questions test clinical judgment and prioritization skills."
      },
      {
        "question": "Does it cover all NCLEX test plan areas?",
        "answer": "QuizForge generates questions across all NCLEX content areas including management of care, safety and infection control, health promotion, basic care and comfort, pharmacological therapies, reduction of risk potential, and physiological adaptation."
      },
      {
        "question": "Can I generate questions from nursing textbooks and study guides?",
        "answer": "Absolutely. Upload PDFs from Saunders, Lippincott, or any NCLEX prep materials, and QuizForge will extract key nursing concepts, medications, procedures, and patient care scenarios to create practice questions aligned with NCLEX format."
      }
    ],
    "keyTopics": [
      "Safe and effective care environment",
      "Health promotion and maintenance",
      "Psychosocial integrity",
      "Physiological integrity",
      "Pharmacological and parenteral therapies",
      "Reduction of risk potential",
      "Basic care and comfort"
    ]
  },
  {
    "slug": "pdf-to-quiz",
    "name": "PDF to Quiz",
    "description": "Convert PDF documents into quiz questions instantly. Upload any PDF document and generate comprehensive quiz questions from the content. Perfect for educators, trainers, and content creators.",
    "targetAudience": "educators, corporate trainers, content creators, and anyone who needs to create quizzes from PDF documents",
    "specificChallenges": [
      "Extracting meaningful content from PDF documents with various formats",
      "Identifying key concepts and important information in dense text",
      "Creating questions that test understanding, not just information extraction",
      "Handling PDFs with images, tables, and complex layouts"
    ],
    "useCases": [
      "Teachers converting textbook PDF chapters into quiz questions",
      "Corporate trainers creating assessments from training materials",
      "Professors generating exam questions from research papers",
      "Content creators building quizzes from educational PDFs"
    ],
    "exampleQuestions": [
      {
        "question": "Based on the PDF content, what is the main argument presented in the document?",
        "type": "short-answer",
        "difficulty": "medium",
        "bloomsLevel": "analysis"
      },
      {
        "question": "According to the PDF, which of the following statements is true?",
        "options": ["Option A from PDF", "Option B from PDF", "Option C from PDF", "Option D from PDF"],
        "correctAnswer": "Option B from PDF",
        "type": "multiple-choice",
        "difficulty": "easy"
      },
      {
        "question": "Analyze the data presented in the PDF and explain its significance.",
        "type": "short-answer",
        "difficulty": "hard",
        "bloomsLevel": "synthesis"
      }
    ],
    "relatedSubjects": ["youtube-to-quiz", "text-to-quiz", "document-to-quiz", "powerpoint-to-quiz", "word-to-quiz"],
    "certifications": [],
    "gradeLevel": "all-levels",
    "faqs": [
      {
        "question": "What types of PDFs can QuizForge process?",
        "answer": "QuizForge can process PDFs containing text, including textbooks, research papers, training manuals, lecture notes, and study guides. The system extracts text content and generates questions based on the key concepts and information found in the document."
      },
      {
        "question": "Can it handle PDFs with images and tables?",
        "answer": "QuizForge extracts text content from PDFs. While it can process text within tables, it currently focuses on textual content. For best results, use PDFs with substantial text content rather than image-heavy documents."
      },
      {
        "question": "How accurate are the questions generated from PDFs?",
        "answer": "QuizForge uses advanced AI to analyze PDF content and identify key concepts, important facts, and relationships. The questions are designed to test understanding of the material, and you can review and edit them before using them in assessments."
      }
    ],
    "keyTopics": [
      "Text extraction and analysis",
      "Key concept identification",
      "Question generation from documents",
      "Content summarization",
      "Multi-document processing",
      "Format preservation",
      "Quality assessment"
    ]
  }
];

async function expandSubjects() {
  try {
    const subjectsPath = path.join(rootDir, 'data', 'subjects.json');
    const existingSubjects = await fs.readJson(subjectsPath);
    
    console.log(`Current subjects: ${existingSubjects.length}`);
    console.log(`Adding ${additionalSubjects.length} more subjects...`);
    
    const allSubjects = [...existingSubjects, ...additionalSubjects];
    
    await fs.writeJson(subjectsPath, allSubjects, { spaces: 2 });
    
    console.log(`✅ Total subjects: ${allSubjects.length}`);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

expandSubjects();

