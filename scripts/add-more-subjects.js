import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Additional subjects to reach 50+ (adding 36 more)
const additionalSubjects = [
  {
    "slug": "geometry",
    "name": "Geometry",
    "description": "Geometry quiz generator for creating assessments on shapes, angles, proofs, and geometric concepts. Perfect for high school geometry courses and math teachers.",
    "targetAudience": "geometry teachers, math instructors, high school math educators, and geometry tutors",
    "specificChallenges": [
      "Creating questions that test geometric reasoning and proof skills",
      "Covering both plane and solid geometry concepts",
      "Aligning with Common Core geometry standards",
      "Generating questions that require spatial visualization"
    ],
    "useCases": [
      "Geometry teachers creating unit tests on triangles and quadrilaterals",
      "Math tutors generating practice problems for geometric proofs",
      "High school teachers preparing assessments on circles and polygons",
      "Educators creating quizzes on coordinate geometry and transformations"
    ],
    "exampleQuestions": [
      {
        "question": "What is the sum of interior angles in a pentagon?",
        "options": ["360°", "540°", "720°", "900°"],
        "correctAnswer": "540°",
        "type": "multiple-choice",
        "difficulty": "medium"
      },
      {
        "question": "Prove that the diagonals of a rectangle are congruent.",
        "type": "short-answer",
        "difficulty": "hard",
        "bloomsLevel": "synthesis"
      },
      {
        "question": "A triangle has sides of length 5, 12, and 13. Is this a right triangle?",
        "options": ["Yes", "No", "Cannot be determined", "Only if it's isosceles"],
        "correctAnswer": "Yes",
        "type": "multiple-choice",
        "difficulty": "medium"
      }
    ],
    "relatedSubjects": ["mathematics", "algebra", "trigonometry", "pre-calculus", "calculus"],
    "certifications": ["Common Core", "Geometry"],
    "gradeLevel": "high-school",
    "faqs": [
      {
        "question": "Can QuizForge generate geometry proof questions?",
        "answer": "Yes! QuizForge can create questions requiring geometric proofs, including two-column proofs, paragraph proofs, and coordinate proofs. Questions test logical reasoning and understanding of geometric theorems."
      },
      {
        "question": "Does it cover all geometry topics?",
        "answer": "QuizForge generates questions covering plane geometry, solid geometry, coordinate geometry, transformations, circles, polygons, and geometric constructions as specified in Common Core standards."
      },
      {
        "question": "Can I generate questions from geometry textbook chapters?",
        "answer": "Absolutely. Upload PDF chapters from your geometry textbook, and QuizForge will extract key theorems, postulates, and problem-solving strategies to create questions aligned with your curriculum."
      }
    ],
    "keyTopics": [
      "Triangles and congruence",
      "Quadrilaterals and polygons",
      "Circles and arcs",
      "Geometric proofs",
      "Coordinate geometry",
      "Transformations",
      "Solid geometry"
    ]
  },
  {
    "slug": "statistics",
    "name": "Statistics",
    "description": "Statistics quiz generator for creating assessments on probability, data analysis, hypothesis testing, and statistical concepts. Ideal for AP Statistics, college statistics, and data science courses.",
    "targetAudience": "statistics teachers, AP Statistics instructors, college statistics professors, and statistics tutors",
    "specificChallenges": [
      "Creating questions that test statistical reasoning, not just formula memorization",
      "Covering both descriptive and inferential statistics",
      "Aligning with AP Statistics curriculum and statistical practices",
      "Generating questions that require interpretation of data and results"
    ],
    "useCases": [
      "AP Statistics teachers creating practice exams for the AP test",
      "College statistics professors generating exam questions on hypothesis testing",
      "Data science instructors preparing assessments on probability distributions",
      "Tutors helping students master statistical analysis and interpretation"
    ],
    "exampleQuestions": [
      {
        "question": "What is the mean of the data set: 5, 8, 12, 15, 20?",
        "options": ["10", "12", "14", "15"],
        "correctAnswer": "12",
        "type": "multiple-choice",
        "difficulty": "easy"
      },
      {
        "question": "A researcher conducts a hypothesis test and obtains a p-value of 0.03. What conclusion should be drawn at α = 0.05?",
        "type": "short-answer",
        "difficulty": "medium",
        "bloomsLevel": "application"
      },
      {
        "question": "Explain the difference between correlation and causation, providing examples.",
        "type": "short-answer",
        "difficulty": "hard",
        "bloomsLevel": "analysis"
      }
    ],
    "relatedSubjects": ["mathematics", "probability", "data-science", "ap-statistics", "calculus"],
    "certifications": ["AP Statistics", "IB Statistics"],
    "gradeLevel": "high-school-college",
    "faqs": [
      {
        "question": "Can QuizForge generate questions about statistical analysis?",
        "answer": "Yes! QuizForge can create questions covering descriptive statistics, probability, hypothesis testing, confidence intervals, regression analysis, and interpretation of statistical results."
      },
      {
        "question": "Does it align with AP Statistics curriculum?",
        "answer": "QuizForge generates questions aligned with AP Statistics curriculum, covering all four units including exploring data, sampling and experimentation, anticipating patterns, and statistical inference as required by the College Board."
      },
      {
        "question": "Can I generate questions from statistics textbook chapters?",
        "answer": "Absolutely. Upload PDF chapters from your statistics textbook, and QuizForge will extract key concepts, formulas, and problem-solving strategies to create questions aligned with your curriculum."
      }
    ],
    "keyTopics": [
      "Descriptive statistics",
      "Probability and distributions",
      "Sampling and experimental design",
      "Hypothesis testing",
      "Confidence intervals",
      "Regression analysis",
      "Statistical inference"
    ]
  },
  {
    "slug": "us-history",
    "name": "US History",
    "description": "US History quiz generator for creating assessments on American history, from colonial times to the present. Perfect for AP US History, high school US history, and college American history courses.",
    "targetAudience": "US history teachers, AP US History instructors, college history professors, and history tutors",
    "specificChallenges": [
      "Creating questions that test historical thinking skills, not just date memorization",
      "Covering chronological periods while emphasizing cause and effect",
      "Aligning with AP US History curriculum and historical thinking skills",
      "Generating questions that require analysis of primary sources and historical documents"
    ],
    "useCases": [
      "AP US History teachers creating unit tests on the Civil War and Reconstruction",
      "College history professors generating exam questions on the American Revolution",
      "High school teachers preparing students for US history standardized tests",
      "Tutors helping students analyze historical documents and primary sources"
    ],
    "exampleQuestions": [
      {
        "question": "The Declaration of Independence was primarily written by which Founding Father?",
        "options": ["George Washington", "Thomas Jefferson", "Benjamin Franklin", "John Adams"],
        "correctAnswer": "Thomas Jefferson",
        "type": "multiple-choice",
        "difficulty": "easy"
      },
      {
        "question": "Analyze the causes of the American Civil War. Which factor do you think was most significant and why?",
        "type": "short-answer",
        "difficulty": "hard",
        "bloomsLevel": "analysis"
      },
      {
        "question": "Compare and contrast the New Deal and Great Society programs. What were their goals and impacts?",
        "type": "short-answer",
        "difficulty": "hard",
        "bloomsLevel": "synthesis"
      }
    ],
    "relatedSubjects": ["history", "world-history", "government", "ap-us-history", "civics"],
    "certifications": ["AP US History"],
    "gradeLevel": "high-school-college",
    "faqs": [
      {
        "question": "Can QuizForge generate questions about US historical analysis?",
        "answer": "Yes! QuizForge generates questions that test historical thinking skills including sourcing, contextualization, corroboration, and argumentation. It can create questions about analyzing primary sources and historical documents from US history."
      },
      {
        "question": "Does it align with AP US History curriculum?",
        "answer": "QuizForge generates questions aligned with AP US History curriculum, covering all nine time periods from 1491 to the present and historical thinking skills as specified by the College Board."
      },
      {
        "question": "Can I generate questions from US history textbook chapters?",
        "answer": "Absolutely. Upload PDF chapters from your US history textbook, and QuizForge will extract key events, themes, and historical concepts to create questions that test both factual knowledge and analytical thinking."
      }
    ],
    "keyTopics": [
      "Colonial America",
      "American Revolution",
      "Constitution and early republic",
      "Civil War and Reconstruction",
      "Industrialization and Gilded Age",
      "World Wars and Cold War",
      "Modern America"
    ]
  },
  {
    "slug": "world-history",
    "name": "World History",
    "description": "World History quiz generator for creating assessments on global history from ancient civilizations to the modern era. Perfect for AP World History, high school world history, and college world history courses.",
    "targetAudience": "world history teachers, AP World History instructors, college history professors, and history tutors",
    "specificChallenges": [
      "Creating questions that test global perspective and cross-cultural understanding",
      "Covering diverse civilizations and historical periods across continents",
      "Aligning with AP World History curriculum and historical thinking skills",
      "Generating questions that require comparison of different civilizations and time periods"
    ],
    "useCases": [
      "AP World History teachers creating unit tests on ancient civilizations",
      "World history professors generating exam questions on the Renaissance and Reformation",
      "High school teachers preparing students for world history standardized tests",
      "Tutors helping students understand global historical connections"
    ],
    "exampleQuestions": [
      {
        "question": "Which ancient civilization developed the first system of writing known as cuneiform?",
        "options": ["Egyptians", "Sumerians", "Greeks", "Chinese"],
        "correctAnswer": "Sumerians",
        "type": "multiple-choice",
        "difficulty": "easy"
      },
      {
        "question": "Compare the political systems of ancient Athens and ancient Rome. What were the key similarities and differences?",
        "type": "short-answer",
        "difficulty": "hard",
        "bloomsLevel": "analysis"
      },
      {
        "question": "Analyze the causes and effects of the Industrial Revolution. How did it transform societies globally?",
        "type": "short-answer",
        "difficulty": "hard",
        "bloomsLevel": "synthesis"
      }
    ],
    "relatedSubjects": ["history", "us-history", "european-history", "ap-world-history", "geography"],
    "certifications": ["AP World History", "IB History"],
    "gradeLevel": "high-school-college",
    "faqs": [
      {
        "question": "Can QuizForge generate questions about global historical analysis?",
        "answer": "Yes! QuizForge generates questions that test historical thinking skills including comparison, causation, continuity and change over time, and periodization. It can create questions about analyzing primary sources from different civilizations and time periods."
      },
      {
        "question": "Does it align with AP World History curriculum?",
        "answer": "QuizForge generates questions aligned with AP World History curriculum, covering all six time periods from 1200 BCE to the present and all geographic regions as specified by the College Board."
      },
      {
        "question": "Can I generate questions from world history textbook chapters?",
        "answer": "Absolutely. Upload PDF chapters from your world history textbook, and QuizForge will extract key events, themes, and historical concepts to create questions that test both factual knowledge and global historical thinking."
      }
    ],
    "keyTopics": [
      "Ancient civilizations",
      "Classical empires",
      "Post-classical era",
      "Early modern period",
      "Age of revolutions",
      "World Wars and global conflicts",
      "Contemporary world"
    ]
  },
  {
    "slug": "nursing",
    "name": "Nursing",
    "description": "Nursing quiz generator for creating assessments on nursing fundamentals, patient care, medical procedures, and nursing concepts. Perfect for nursing students, NCLEX preparation, and nursing education programs.",
    "targetAudience": "nursing students, nursing instructors, NCLEX prep instructors, and nursing tutors",
    "specificChallenges": [
      "Creating questions that test clinical judgment and critical thinking",
      "Covering all nursing fundamentals and specialty areas",
      "Aligning with NCLEX test plan and nursing curriculum",
      "Generating questions that require prioritization and decision-making"
    ],
    "useCases": [
      "Nursing instructors creating quizzes on patient care and safety",
      "NCLEX prep instructors generating practice questions for exam preparation",
      "Nursing students creating study guides for nursing fundamentals",
      "Nursing tutors helping students master medication administration and procedures"
    ],
    "exampleQuestions": [
      {
        "question": "What is the correct order of the nursing process?",
        "options": [
          "Assessment, Planning, Implementation, Evaluation, Diagnosis",
          "Assessment, Diagnosis, Planning, Implementation, Evaluation",
          "Diagnosis, Assessment, Planning, Implementation, Evaluation",
          "Planning, Assessment, Diagnosis, Implementation, Evaluation"
        ],
        "correctAnswer": "Assessment, Diagnosis, Planning, Implementation, Evaluation",
        "type": "multiple-choice",
        "difficulty": "easy"
      },
      {
        "question": "A patient is experiencing chest pain. What is the nurse's priority action?",
        "type": "short-answer",
        "difficulty": "medium",
        "bloomsLevel": "application"
      },
      {
        "question": "Explain the five rights of medication administration and why each is important for patient safety.",
        "type": "short-answer",
        "difficulty": "hard",
        "bloomsLevel": "analysis"
      }
    ],
    "relatedSubjects": ["nclex", "anatomy", "physiology", "pharmacology", "medical-terminology"],
    "certifications": ["NCLEX-RN", "NCLEX-PN"],
    "gradeLevel": "college-professional",
    "faqs": [
      {
        "question": "Can QuizForge generate NCLEX-style nursing questions?",
        "answer": "Yes! QuizForge can create questions in NCLEX format covering all content areas including safe and effective care environment, health promotion, psychosocial integrity, and physiological integrity. Questions test clinical judgment and prioritization."
      },
      {
        "question": "Does it cover all nursing fundamentals?",
        "answer": "QuizForge generates questions covering nursing fundamentals including patient care, safety, infection control, medication administration, documentation, and nursing procedures as required for nursing education programs."
      },
      {
        "question": "Can I generate questions from nursing textbook chapters?",
        "answer": "Absolutely. Upload PDF chapters from nursing textbooks like Fundamentals of Nursing or Medical-Surgical Nursing, and QuizForge will extract key nursing concepts, procedures, and patient care scenarios to create practice questions."
      }
    ],
    "keyTopics": [
      "Nursing fundamentals",
      "Patient care and safety",
      "Medication administration",
      "Infection control",
      "Documentation",
      "Nursing procedures",
      "Clinical judgment"
    ]
  },
  {
    "slug": "pharmacology",
    "name": "Pharmacology",
    "description": "Pharmacology quiz generator for creating assessments on medications, drug classifications, mechanisms of action, and pharmacotherapy. Perfect for nursing students, pharmacy students, and medical students.",
    "targetAudience": "pharmacology students, nursing students, pharmacy students, medical students, and pharmacology instructors",
    "specificChallenges": [
      "Creating questions that test understanding of drug mechanisms, not just memorization",
      "Covering drug classifications, interactions, and adverse effects",
      "Aligning with pharmacology curriculum and clinical applications",
      "Generating questions that require understanding of pharmacokinetics and pharmacodynamics"
    ],
    "useCases": [
      "Pharmacology instructors creating quizzes on drug classifications",
      "Nursing students generating study questions for pharmacology exams",
      "Pharmacy students preparing for medication knowledge assessments",
      "Medical students creating practice questions on drug mechanisms"
    ],
    "exampleQuestions": [
      {
        "question": "Which class of medications is used to treat hypertension by blocking angiotensin II receptors?",
        "options": ["ACE inhibitors", "ARBs", "Beta blockers", "Calcium channel blockers"],
        "correctAnswer": "ARBs",
        "type": "multiple-choice",
        "difficulty": "medium"
      },
      {
        "question": "Explain the difference between pharmacokinetics and pharmacodynamics.",
        "type": "short-answer",
        "difficulty": "medium",
        "bloomsLevel": "analysis"
      },
      {
        "question": "A patient is taking warfarin. Which medication interaction should the nurse be most concerned about?",
        "type": "short-answer",
        "difficulty": "hard",
        "bloomsLevel": "application"
      }
    ],
    "relatedSubjects": ["nursing", "nclex", "medical-terminology", "anatomy", "physiology"],
    "certifications": ["Nursing Programs", "Pharmacy Programs", "Medical School"],
    "gradeLevel": "college-professional",
    "faqs": [
      {
        "question": "Can QuizForge generate questions about drug mechanisms and classifications?",
        "answer": "Yes! QuizForge can create questions covering drug classifications, mechanisms of action, pharmacokinetics, pharmacodynamics, drug interactions, adverse effects, and clinical applications of medications."
      },
      {
        "question": "Does it cover all major drug classes?",
        "answer": "QuizForge generates questions covering all major drug classes including antibiotics, cardiovascular medications, CNS drugs, endocrine medications, and more as required for pharmacology education programs."
      },
      {
        "question": "Can I generate questions from pharmacology textbook chapters?",
        "answer": "Absolutely. Upload PDF chapters from pharmacology textbooks, and QuizForge will extract key drug information, mechanisms, and clinical applications to create questions that test comprehensive understanding."
      }
    ],
    "keyTopics": [
      "Drug classifications",
      "Mechanisms of action",
      "Pharmacokinetics",
      "Pharmacodynamics",
      "Drug interactions",
      "Adverse effects",
      "Clinical applications"
    ]
  }
];

async function addMoreSubjects() {
  try {
    const subjectsPath = path.join(rootDir, 'data', 'subjects.json');
    const existingSubjects = await fs.readJson(subjectsPath);
    
    console.log(`Current subjects: ${existingSubjects.length}`);
    console.log(`Adding ${additionalSubjects.length} more subjects...`);
    
    const allSubjects = [...existingSubjects, ...additionalSubjects];
    
    await fs.writeJson(subjectsPath, allSubjects, { spaces: 2 });
    
    console.log(`✅ Total subjects: ${allSubjects.length}`);
    console.log(`📝 Need ${50 - allSubjects.length} more to reach 50`);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

addMoreSubjects();
