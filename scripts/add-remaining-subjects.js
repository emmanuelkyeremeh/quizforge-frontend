import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Remaining subjects to reach 50+ (adding 30 more)
const remainingSubjects = [
  {
    "slug": "trigonometry",
    "name": "Trigonometry",
    "description": "Trigonometry quiz generator for creating assessments on angles, triangles, trigonometric functions, and identities. Perfect for high school trigonometry and pre-calculus courses.",
    "targetAudience": "trigonometry teachers, pre-calculus instructors, math tutors, and high school math educators",
    "specificChallenges": [
      "Creating questions that test understanding of trigonometric relationships",
      "Covering unit circle, identities, and applications",
      "Aligning with Common Core trigonometry standards",
      "Generating questions that require visualization of angles and triangles"
    ],
    "useCases": [
      "Trigonometry teachers creating unit tests on trigonometric functions",
      "Pre-calculus instructors generating quizzes on identities and equations",
      "Math tutors helping students master the unit circle",
      "High school teachers preparing assessments on right triangle trigonometry"
    ],
    "exampleQuestions": [
      {
        "question": "What is sin(30°)?",
        "options": ["1/2", "√3/2", "1", "0"],
        "correctAnswer": "1/2",
        "type": "multiple-choice",
        "difficulty": "easy"
      },
      {
        "question": "Prove the Pythagorean identity: sin²θ + cos²θ = 1",
        "type": "short-answer",
        "difficulty": "medium",
        "bloomsLevel": "synthesis"
      },
      {
        "question": "A ladder leans against a wall at a 60° angle. If the ladder is 10 feet long, how high up the wall does it reach?",
        "type": "short-answer",
        "difficulty": "medium",
        "bloomsLevel": "application"
      }
    ],
    "relatedSubjects": ["mathematics", "algebra", "geometry", "pre-calculus", "calculus"],
    "certifications": ["Common Core", "Pre-Calculus"],
    "gradeLevel": "high-school",
    "faqs": [
      {
        "question": "Can QuizForge generate trigonometry problems with applications?",
        "answer": "Yes! QuizForge generates questions covering trigonometric functions, identities, equations, and real-world applications including right triangle problems, periodic functions, and wave analysis."
      },
      {
        "question": "Does it cover the unit circle?",
        "answer": "QuizForge generates questions covering the unit circle, special angles, trigonometric values, and how to use the unit circle to find sine, cosine, and tangent values."
      },
      {
        "question": "Can I generate questions from trigonometry textbook chapters?",
        "answer": "Absolutely. Upload PDF chapters from your trigonometry textbook, and QuizForge will extract key concepts, formulas, and problem-solving strategies to create questions aligned with your curriculum."
      }
    ],
    "keyTopics": [
      "Right triangle trigonometry",
      "Unit circle",
      "Trigonometric functions",
      "Trigonometric identities",
      "Trigonometric equations",
      "Graphs of trigonometric functions",
      "Applications of trigonometry"
    ]
  },
  {
    "slug": "physiology",
    "name": "Physiology",
    "description": "Physiology quiz generator for creating assessments on body systems, organ function, and physiological processes. Perfect for anatomy and physiology courses, medical students, and nursing programs.",
    "targetAudience": "physiology teachers, medical school instructors, nursing professors, and physiology tutors",
    "specificChallenges": [
      "Creating questions that test understanding of physiological mechanisms",
      "Covering all body systems and their interactions",
      "Aligning with medical and nursing curriculum requirements",
      "Generating questions that require understanding of homeostasis and feedback loops"
    ],
    "useCases": [
      "Medical school professors creating exam questions on cardiovascular physiology",
      "Nursing instructors generating quizzes on respiratory and renal systems",
      "Physiology teachers preparing students for standardized physiology exams",
      "Tutors helping students master complex physiological concepts"
    ],
    "exampleQuestions": [
      {
        "question": "What is the primary function of the kidneys?",
        "options": [
          "Digestion",
          "Filtration and waste removal",
          "Oxygen transport",
          "Hormone production"
        ],
        "correctAnswer": "Filtration and waste removal",
        "type": "multiple-choice",
        "difficulty": "easy"
      },
      {
        "question": "Explain how the body maintains blood glucose homeostasis through negative feedback.",
        "type": "short-answer",
        "difficulty": "hard",
        "bloomsLevel": "synthesis"
      },
      {
        "question": "Describe the process of action potential generation in a neuron.",
        "type": "short-answer",
        "difficulty": "hard",
        "bloomsLevel": "analysis"
      }
    ],
    "relatedSubjects": ["anatomy", "biology", "medical-terminology", "nursing", "nclex"],
    "certifications": ["Medical School", "Nursing Programs"],
    "gradeLevel": "college-professional",
    "faqs": [
      {
        "question": "Can QuizForge generate questions about all body systems?",
        "answer": "Yes! QuizForge can create questions covering all major body systems including cardiovascular, respiratory, digestive, nervous, endocrine, renal, and reproductive systems. Questions test understanding of functions, mechanisms, and interactions."
      },
      {
        "question": "Does it cover physiological mechanisms and processes?",
        "answer": "QuizForge generates questions covering physiological mechanisms including homeostasis, feedback loops, cellular processes, organ function, and system interactions as required for physiology education programs."
      },
      {
        "question": "Can I generate questions from physiology textbook chapters?",
        "answer": "Absolutely. Upload PDF chapters from physiology textbooks, and QuizForge will extract key concepts, mechanisms, and processes to create questions that test comprehensive understanding of physiological principles."
      }
    ],
    "keyTopics": [
      "Cardiovascular physiology",
      "Respiratory physiology",
      "Renal physiology",
      "Nervous system physiology",
      "Endocrine physiology",
      "Digestive physiology",
      "Homeostasis and feedback"
    ]
  },
  {
    "slug": "medical-terminology",
    "name": "Medical Terminology",
    "description": "Medical terminology quiz generator for creating assessments on medical terms, prefixes, suffixes, and root words. Perfect for medical students, nursing students, and healthcare professionals.",
    "targetAudience": "medical students, nursing students, healthcare professionals, and medical terminology instructors",
    "specificChallenges": [
      "Creating questions that test understanding of word construction, not just memorization",
      "Covering prefixes, suffixes, and root words across body systems",
      "Aligning with medical and nursing curriculum requirements",
      "Generating questions that require breaking down and building medical terms"
    ],
    "useCases": [
      "Medical terminology instructors creating quizzes on prefixes and suffixes",
      "Nursing students generating study questions for medical terminology exams",
      "Healthcare professionals preparing for certification exams",
      "Medical students creating practice questions on body system terminology"
    ],
    "exampleQuestions": [
      {
        "question": "What does the prefix 'cardio-' mean?",
        "options": ["Heart", "Lung", "Brain", "Liver"],
        "correctAnswer": "Heart",
        "type": "multiple-choice",
        "difficulty": "easy"
      },
      {
        "question": "Break down the medical term 'cardiomyopathy' and explain its meaning.",
        "type": "short-answer",
        "difficulty": "medium",
        "bloomsLevel": "analysis"
      },
      {
        "question": "What is the medical term for 'inflammation of the liver'?",
        "options": ["Hepatitis", "Hepatomegaly", "Hepatectomy", "Hepatology"],
        "correctAnswer": "Hepatitis",
        "type": "multiple-choice",
        "difficulty": "medium"
      }
    ],
    "relatedSubjects": ["anatomy", "physiology", "nursing", "nclex", "pharmacology"],
    "certifications": ["Medical School", "Nursing Programs"],
    "gradeLevel": "college-professional",
    "faqs": [
      {
        "question": "Can QuizForge generate questions about medical word construction?",
        "answer": "Yes! QuizForge can create questions covering prefixes, suffixes, root words, combining forms, and how to build and break down medical terms. Questions test understanding of word construction and meaning."
      },
      {
        "question": "Does it cover terminology for all body systems?",
        "answer": "QuizForge generates questions covering medical terminology for all body systems including cardiovascular, respiratory, digestive, nervous, musculoskeletal, and integumentary systems."
      },
      {
        "question": "Can I generate questions from medical terminology textbook chapters?",
        "answer": "Absolutely. Upload PDF chapters from medical terminology textbooks, and QuizForge will extract key terms, prefixes, suffixes, and root words to create questions that test comprehensive understanding."
      }
    ],
    "keyTopics": [
      "Prefixes and suffixes",
      "Root words",
      "Combining forms",
      "Body system terminology",
      "Anatomical terminology",
      "Pathological terminology",
      "Word construction and analysis"
    ]
  },
  {
    "slug": "sat-math",
    "name": "SAT Math",
    "description": "SAT Math quiz generator for creating practice questions for the SAT Math section. Perfect for SAT test prep, high school students, and SAT tutors.",
    "targetAudience": "SAT test prep instructors, high school students, SAT tutors, and college counselors",
    "specificChallenges": [
      "Creating questions that mirror SAT Math format and difficulty",
      "Covering all SAT Math content areas including algebra, geometry, and data analysis",
      "Aligning with SAT Math test specifications",
      "Generating questions that test problem-solving and reasoning skills"
    ],
    "useCases": [
      "SAT prep instructors creating practice tests for the Math section",
      "High school students generating study questions for SAT preparation",
      "SAT tutors creating focused practice on weak areas",
      "College counselors preparing students for the SAT exam"
    ],
    "exampleQuestions": [
      {
        "question": "If 3x + 5 = 20, what is the value of x?",
        "options": ["3", "5", "15", "25"],
        "correctAnswer": "5",
        "type": "multiple-choice",
        "difficulty": "easy"
      },
      {
        "question": "A circle has a radius of 5. What is its area?",
        "type": "short-answer",
        "difficulty": "medium",
        "bloomsLevel": "application"
      },
      {
        "question": "The function f(x) = 2x² - 3x + 1. What is f(3)?",
        "options": ["10", "12", "14", "16"],
        "correctAnswer": "10",
        "type": "multiple-choice",
        "difficulty": "medium"
      }
    ],
    "relatedSubjects": ["mathematics", "algebra", "geometry", "sat", "test-prep"],
    "certifications": ["SAT"],
    "gradeLevel": "high-school",
    "faqs": [
      {
        "question": "Can QuizForge generate SAT Math practice questions?",
        "answer": "Yes! QuizForge can create questions in SAT Math format covering algebra, problem solving and data analysis, advanced math, and geometry and trigonometry as specified in the SAT test specifications."
      },
      {
        "question": "Does it cover all SAT Math content areas?",
        "answer": "QuizForge generates questions covering all SAT Math content areas including heart of algebra, problem solving and data analysis, passport to advanced math, and additional topics in math as required for SAT preparation."
      },
      {
        "question": "Can I generate questions from SAT prep materials?",
        "answer": "Absolutely. Upload PDF chapters from SAT prep books or study guides, and QuizForge will extract key concepts and problem types to create practice questions aligned with SAT Math format."
      }
    ],
    "keyTopics": [
      "Heart of algebra",
      "Problem solving and data analysis",
      "Passport to advanced math",
      "Additional topics in math",
      "Geometry and trigonometry",
      "Functions and equations",
      "Statistics and probability"
    ]
  },
  {
    "slug": "gre-verbal",
    "name": "GRE Verbal",
    "description": "GRE Verbal quiz generator for creating practice questions for the GRE Verbal Reasoning section. Perfect for GRE test prep, graduate school applicants, and GRE tutors.",
    "targetAudience": "GRE test prep instructors, graduate school applicants, GRE tutors, and college counselors",
    "specificChallenges": [
      "Creating questions that mirror GRE Verbal format and difficulty",
      "Covering reading comprehension, text completion, and sentence equivalence",
      "Aligning with GRE Verbal test specifications",
      "Generating questions that test vocabulary and critical reasoning"
    ],
    "useCases": [
      "GRE prep instructors creating practice tests for the Verbal section",
      "Graduate school applicants generating study questions for GRE preparation",
      "GRE tutors creating focused practice on vocabulary and reading comprehension",
      "College counselors preparing students for the GRE exam"
    ],
    "exampleQuestions": [
      {
        "question": "The author's tone in the passage can best be described as:",
        "options": ["Skeptical", "Enthusiastic", "Neutral", "Critical"],
        "correctAnswer": "Skeptical",
        "type": "multiple-choice",
        "difficulty": "medium"
      },
      {
        "question": "Select the two words that best complete the sentence: The scientist's findings were _____, challenging long-held assumptions about the phenomenon.",
        "options": ["revolutionary", "mundane", "groundbreaking", "conventional"],
        "correctAnswer": "revolutionary, groundbreaking",
        "type": "multiple-choice",
        "difficulty": "hard"
      },
      {
        "question": "What is the main idea of the passage?",
        "type": "short-answer",
        "difficulty": "medium",
        "bloomsLevel": "analysis"
      }
    ],
    "relatedSubjects": ["gre", "test-prep", "reading-comprehension", "vocabulary", "english"],
    "certifications": ["GRE"],
    "gradeLevel": "college-graduate",
    "faqs": [
      {
        "question": "Can QuizForge generate GRE Verbal practice questions?",
        "answer": "Yes! QuizForge can create questions in GRE Verbal format covering reading comprehension, text completion, and sentence equivalence questions as specified in the GRE test specifications."
      },
      {
        "question": "Does it cover vocabulary and critical reasoning?",
        "answer": "QuizForge generates questions that test vocabulary knowledge, reading comprehension skills, critical reasoning, and ability to understand complex texts as required for GRE Verbal preparation."
      },
      {
        "question": "Can I generate questions from GRE prep materials?",
        "answer": "Absolutely. Upload PDF chapters from GRE prep books or study guides, and QuizForge will extract key concepts, vocabulary, and question types to create practice questions aligned with GRE Verbal format."
      }
    ],
    "keyTopics": [
      "Reading comprehension",
      "Text completion",
      "Sentence equivalence",
      "Vocabulary",
      "Critical reasoning",
      "Argument analysis",
      "Passage analysis"
    ]
  },
  {
    "slug": "mcat-biology",
    "name": "MCAT Biology",
    "description": "MCAT Biology quiz generator for creating practice questions for the MCAT Biological and Biochemical Foundations section. Perfect for MCAT test prep, pre-med students, and MCAT tutors.",
    "targetAudience": "MCAT test prep instructors, pre-med students, MCAT tutors, and medical school applicants",
    "specificChallenges": [
      "Creating questions that mirror MCAT Biology format and difficulty",
      "Covering biology, biochemistry, and organic chemistry concepts",
      "Aligning with MCAT test specifications and scientific reasoning",
      "Generating questions that test application of biological concepts"
    ],
    "useCases": [
      "MCAT prep instructors creating practice tests for the Biology section",
      "Pre-med students generating study questions for MCAT preparation",
      "MCAT tutors creating focused practice on weak areas",
      "Medical school applicants preparing for the MCAT exam"
    ],
    "exampleQuestions": [
      {
        "question": "Which organelle is responsible for protein synthesis?",
        "options": ["Mitochondria", "Ribosome", "Nucleus", "Golgi apparatus"],
        "correctAnswer": "Ribosome",
        "type": "multiple-choice",
        "difficulty": "easy"
      },
      {
        "question": "Explain how enzymes lower activation energy in biochemical reactions.",
        "type": "short-answer",
        "difficulty": "hard",
        "bloomsLevel": "analysis"
      },
      {
        "question": "A mutation in the DNA sequence results in a premature stop codon. What type of mutation is this?",
        "options": ["Silent", "Missense", "Nonsense", "Frameshift"],
        "correctAnswer": "Nonsense",
        "type": "multiple-choice",
        "difficulty": "medium"
      }
    ],
    "relatedSubjects": ["mcat", "biology", "biochemistry", "test-prep", "medical-school"],
    "certifications": ["MCAT"],
    "gradeLevel": "college-graduate",
    "faqs": [
      {
        "question": "Can QuizForge generate MCAT Biology practice questions?",
        "answer": "Yes! QuizForge can create questions in MCAT format covering biology, biochemistry, organic chemistry, and scientific reasoning as specified in the MCAT Biological and Biochemical Foundations section."
      },
      {
        "question": "Does it cover all MCAT Biology content areas?",
        "answer": "QuizForge generates questions covering all MCAT Biology content areas including biomolecules, cells, genetics, evolution, and organ systems as required for MCAT preparation."
      },
      {
        "question": "Can I generate questions from MCAT prep materials?",
        "answer": "Absolutely. Upload PDF chapters from MCAT prep books or study guides, and QuizForge will extract key concepts and question types to create practice questions aligned with MCAT format."
      }
    ],
    "keyTopics": [
      "Biomolecules",
      "Cells and organelles",
      "Genetics and heredity",
      "Evolution",
      "Organ systems",
      "Biochemistry",
      "Scientific reasoning"
    ]
  },
  {
    "slug": "youtube-to-quiz",
    "name": "YouTube to Quiz",
    "description": "Convert YouTube video transcripts into quiz questions instantly. Generate comprehensive quiz questions from educational YouTube videos and video content. Perfect for educators and content creators.",
    "targetAudience": "educators, content creators, trainers, and anyone who needs to create quizzes from YouTube video content",
    "specificChallenges": [
      "Extracting meaningful content from video transcripts",
      "Identifying key concepts and important information in spoken content",
      "Creating questions that test understanding, not just transcription",
      "Handling various video formats and transcript quality"
    ],
    "useCases": [
      "Teachers converting educational YouTube videos into quiz questions",
      "Content creators building quizzes from their video tutorials",
      "Trainers creating assessments from training videos",
      "Educators generating questions from lecture recordings"
    ],
    "exampleQuestions": [
      {
        "question": "According to the video, what is the main topic discussed?",
        "type": "short-answer",
        "difficulty": "medium",
        "bloomsLevel": "analysis"
      },
      {
        "question": "Which concept was emphasized most in the video?",
        "options": ["Concept A", "Concept B", "Concept C", "Concept D"],
        "correctAnswer": "Concept B",
        "type": "multiple-choice",
        "difficulty": "easy"
      },
      {
        "question": "Summarize the key points made in the video and explain their significance.",
        "type": "short-answer",
        "difficulty": "hard",
        "bloomsLevel": "synthesis"
      }
    ],
    "relatedSubjects": ["pdf-to-quiz", "text-to-quiz", "document-to-quiz", "video-to-quiz", "content-to-quiz"],
    "certifications": [],
    "gradeLevel": "all-levels",
    "faqs": [
      {
        "question": "What types of YouTube videos can QuizForge process?",
        "answer": "QuizForge can process YouTube videos with available transcripts, including educational videos, tutorials, lectures, and training content. The system extracts text from transcripts and generates questions based on key concepts."
      },
      {
        "question": "How do I get the transcript from a YouTube video?",
        "answer": "Many YouTube videos have automatic captions/transcripts available. You can copy the transcript text and paste it into QuizForge, or use the video URL if transcript extraction is supported."
      },
      {
        "question": "How accurate are the questions generated from video transcripts?",
        "answer": "QuizForge uses advanced AI to analyze transcript content and identify key concepts, important facts, and relationships. The questions are designed to test understanding of the material, and you can review and edit them before using."
      }
    ],
    "keyTopics": [
      "Transcript extraction",
      "Content analysis",
      "Key concept identification",
      "Question generation from video",
      "Educational video processing",
      "Tutorial content analysis",
      "Lecture content extraction"
    ]
  },
  {
    "slug": "ap-biology",
    "name": "AP Biology",
    "description": "AP Biology quiz generator for creating practice questions aligned with the AP Biology curriculum. Perfect for AP Biology teachers, students preparing for the AP exam, and AP Biology tutors.",
    "targetAudience": "AP Biology teachers, high school students preparing for AP Biology, AP Biology tutors, and AP Biology instructors",
    "specificChallenges": [
      "Creating questions aligned with AP Biology Big Ideas and scientific practices",
      "Covering all AP Biology units and required content",
      "Testing scientific practices like data analysis and experimental design",
      "Generating questions that mirror AP exam format and difficulty"
    ],
    "useCases": [
      "AP Biology teachers creating unit tests aligned with AP curriculum",
      "Students generating practice questions for AP Biology exam preparation",
      "AP Biology tutors creating focused practice on specific units",
      "AP Biology instructors preparing students for the AP exam"
    ],
    "exampleQuestions": [
      {
        "question": "Which of the following is a characteristic of all living organisms?",
        "options": [
          "Ability to photosynthesize",
          "Presence of a nucleus",
          "Ability to maintain homeostasis",
          "Multicellular structure"
        ],
        "correctAnswer": "Ability to maintain homeostasis",
        "type": "multiple-choice",
        "difficulty": "medium"
      },
      {
        "question": "Analyze the data from the experiment and explain what it suggests about the relationship between enzyme concentration and reaction rate.",
        "type": "short-answer",
        "difficulty": "hard",
        "bloomsLevel": "analysis"
      },
      {
        "question": "Design an experiment to test the effect of temperature on cellular respiration rate.",
        "type": "short-answer",
        "difficulty": "hard",
        "bloomsLevel": "synthesis"
      }
    ],
    "relatedSubjects": ["biology", "ap-exams", "test-prep", "science", "college-prep"],
    "certifications": ["AP Biology"],
    "gradeLevel": "high-school",
    "faqs": [
      {
        "question": "Can QuizForge generate AP Biology practice questions?",
        "answer": "Yes! QuizForge can create questions aligned with AP Biology curriculum, covering all eight units and testing scientific practices including data analysis, experimental design, and mathematical modeling as required by the College Board."
      },
      {
        "question": "Does it cover all AP Biology Big Ideas?",
        "answer": "QuizForge generates questions covering all four AP Biology Big Ideas: evolution, energy, information storage and transmission, and systems interactions, as well as all required scientific practices."
      },
      {
        "question": "Can I generate questions from AP Biology textbook chapters?",
        "answer": "Absolutely. Upload PDF chapters from AP Biology textbooks like Campbell Biology or other AP-aligned resources, and QuizForge will extract key concepts to create questions aligned with AP curriculum."
      }
    ],
    "keyTopics": [
      "Chemistry of life",
      "Cell structure and function",
      "Cellular energetics",
      "Cell communication and cell cycle",
      "Heredity",
      "Gene expression and regulation",
      "Natural selection"
    ]
  },
  {
    "slug": "ap-chemistry",
    "name": "AP Chemistry",
    "description": "AP Chemistry quiz generator for creating practice questions aligned with the AP Chemistry curriculum. Perfect for AP Chemistry teachers, students preparing for the AP exam, and AP Chemistry tutors.",
    "targetAudience": "AP Chemistry teachers, high school students preparing for AP Chemistry, AP Chemistry tutors, and AP Chemistry instructors",
    "specificChallenges": [
      "Creating questions aligned with AP Chemistry curriculum and learning objectives",
      "Covering all AP Chemistry units and required content",
      "Testing both conceptual understanding and calculation skills",
      "Generating questions that mirror AP exam format and difficulty"
    ],
    "useCases": [
      "AP Chemistry teachers creating unit tests aligned with AP curriculum",
      "Students generating practice questions for AP Chemistry exam preparation",
      "AP Chemistry tutors creating focused practice on specific units",
      "AP Chemistry instructors preparing students for the AP exam"
    ],
    "exampleQuestions": [
      {
        "question": "What is the electron configuration of iron (Fe)?",
        "options": [
          "[Ar] 4s² 3d⁶",
          "[Ar] 4s² 3d⁵",
          "[Ar] 4s¹ 3d⁷",
          "[Ar] 4s² 3d⁴"
        ],
        "correctAnswer": "[Ar] 4s² 3d⁶",
        "type": "multiple-choice",
        "difficulty": "medium"
      },
      {
        "question": "Calculate the pH of a 0.1 M solution of HCl.",
        "type": "short-answer",
        "difficulty": "medium",
        "bloomsLevel": "application"
      },
      {
        "question": "Explain how Le Chatelier's principle applies to the following equilibrium reaction when temperature is increased.",
        "type": "short-answer",
        "difficulty": "hard",
        "bloomsLevel": "analysis"
      }
    ],
    "relatedSubjects": ["chemistry", "ap-exams", "test-prep", "science", "college-prep"],
    "certifications": ["AP Chemistry"],
    "gradeLevel": "high-school",
    "faqs": [
      {
        "question": "Can QuizForge generate AP Chemistry practice questions?",
        "answer": "Yes! QuizForge can create questions aligned with AP Chemistry curriculum, covering all nine units and testing both conceptual understanding and calculation skills as required by the College Board."
      },
      {
        "question": "Does it cover all AP Chemistry content areas?",
        "answer": "QuizForge generates questions covering all AP Chemistry content areas including atomic structure, bonding, reactions, thermodynamics, kinetics, equilibrium, and acids and bases."
      },
      {
        "question": "Can I generate questions from AP Chemistry textbook chapters?",
        "answer": "Absolutely. Upload PDF chapters from AP Chemistry textbooks or other AP-aligned resources, and QuizForge will extract key concepts to create questions aligned with AP curriculum."
      }
    ],
    "keyTopics": [
      "Atomic structure and properties",
      "Molecular and ionic compound structure",
      "Intermolecular forces and properties",
      "Chemical reactions",
      "Kinetics",
      "Thermodynamics",
      "Equilibrium"
    ]
  },
  {
    "slug": "ap-us-history",
    "name": "AP US History",
    "description": "AP US History quiz generator for creating practice questions aligned with the AP US History curriculum. Perfect for AP US History teachers, students preparing for the AP exam, and AP US History tutors.",
    "targetAudience": "AP US History teachers, high school students preparing for AP US History, AP US History tutors, and AP US History instructors",
    "specificChallenges": [
      "Creating questions aligned with AP US History curriculum and historical thinking skills",
      "Covering all nine AP US History time periods",
      "Testing historical thinking skills including sourcing and argumentation",
      "Generating questions that mirror AP exam format and difficulty"
    ],
    "useCases": [
      "AP US History teachers creating unit tests aligned with AP curriculum",
      "Students generating practice questions for AP US History exam preparation",
      "AP US History tutors creating focused practice on specific time periods",
      "AP US History instructors preparing students for the AP exam"
    ],
    "exampleQuestions": [
      {
        "question": "The Declaration of Independence was primarily influenced by which Enlightenment philosopher?",
        "options": ["John Locke", "Thomas Hobbes", "Jean-Jacques Rousseau", "Voltaire"],
        "correctAnswer": "John Locke",
        "type": "multiple-choice",
        "difficulty": "medium"
      },
      {
        "question": "Analyze the causes of the American Civil War. Use specific historical evidence to support your argument.",
        "type": "short-answer",
        "difficulty": "hard",
        "bloomsLevel": "analysis"
      },
      {
        "question": "Compare the New Deal and Great Society programs. What were their goals and impacts?",
        "type": "short-answer",
        "difficulty": "hard",
        "bloomsLevel": "synthesis"
      }
    ],
    "relatedSubjects": ["us-history", "history", "ap-exams", "test-prep", "college-prep"],
    "certifications": ["AP US History"],
    "gradeLevel": "high-school",
    "faqs": [
      {
        "question": "Can QuizForge generate AP US History practice questions?",
        "answer": "Yes! QuizForge can create questions aligned with AP US History curriculum, covering all nine time periods from 1491 to the present and testing historical thinking skills as required by the College Board."
      },
      {
        "question": "Does it test historical thinking skills?",
        "answer": "QuizForge generates questions that test historical thinking skills including sourcing, contextualization, corroboration, and argumentation, as well as the ability to analyze primary and secondary sources."
      },
      {
        "question": "Can I generate questions from AP US History textbook chapters?",
        "answer": "Absolutely. Upload PDF chapters from AP US History textbooks or other AP-aligned resources, and QuizForge will extract key events and concepts to create questions aligned with AP curriculum."
      }
    ],
    "keyTopics": [
      "Period 1: 1491-1607",
      "Period 2: 1607-1754",
      "Period 3: 1754-1800",
      "Period 4: 1800-1848",
      "Period 5: 1844-1877",
      "Period 6: 1865-1898",
      "Period 7: 1890-1945"
    ]
  }
];

async function addRemainingSubjects() {
  try {
    const subjectsPath = path.join(rootDir, 'data', 'subjects.json');
    const existingSubjects = await fs.readJson(subjectsPath);
    
    console.log(`Current subjects: ${existingSubjects.length}`);
    console.log(`Adding ${remainingSubjects.length} more subjects...`);
    
    const allSubjects = [...existingSubjects, ...remainingSubjects];
    
    await fs.writeJson(subjectsPath, allSubjects, { spaces: 2 });
    
    console.log(`✅ Total subjects: ${allSubjects.length}`);
    console.log(`📝 Need ${50 - allSubjects.length} more to reach 50`);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

addRemainingSubjects();

