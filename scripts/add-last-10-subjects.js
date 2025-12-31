import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Last 10 subjects to reach 50
const lastSubjects = [
  {
    "slug": "computer-science",
    "name": "Computer Science",
    "description": "Computer science quiz generator for creating assessments on programming, algorithms, data structures, and computer science concepts. Perfect for computer science courses, AP Computer Science, and coding bootcamps.",
    "targetAudience": "computer science teachers, AP Computer Science instructors, coding bootcamp instructors, and computer science tutors",
    "specificChallenges": [
      "Creating questions that test programming logic and problem-solving",
      "Covering algorithms, data structures, and software engineering",
      "Aligning with computer science curriculum and AP standards",
      "Generating questions that require understanding of code and algorithms"
    ],
    "useCases": [
      "AP Computer Science teachers creating unit tests on algorithms",
      "Computer science professors generating exam questions on data structures",
      "Coding bootcamp instructors preparing assessments on programming concepts",
      "Computer science tutors helping students master coding skills"
    ],
    "exampleQuestions": [
      {
        "question": "What is the time complexity of binary search?",
        "options": ["O(n)", "O(log n)", "O(n²)", "O(1)"],
        "correctAnswer": "O(log n)",
        "type": "multiple-choice",
        "difficulty": "medium"
      },
      {
        "question": "Explain the difference between a stack and a queue data structure.",
        "type": "short-answer",
        "difficulty": "medium",
        "bloomsLevel": "analysis"
      },
      {
        "question": "Write pseudocode for a function that finds the maximum value in an array.",
        "type": "short-answer",
        "difficulty": "medium",
        "bloomsLevel": "application"
      }
    ],
    "relatedSubjects": ["programming", "ap-computer-science", "algorithms", "data-structures", "coding"],
    "certifications": ["AP Computer Science A", "AP Computer Science Principles"],
    "gradeLevel": "high-school-college",
    "faqs": [
      {
        "question": "Can QuizForge generate questions about programming and algorithms?",
        "answer": "Yes! QuizForge can create questions covering programming concepts, algorithms, data structures, software engineering, and computer science theory as required for computer science courses."
      },
      {
        "question": "Does it align with AP Computer Science curriculum?",
        "answer": "QuizForge generates questions aligned with AP Computer Science A and AP Computer Science Principles curricula, covering programming, algorithms, and computer science concepts as required by the College Board."
      },
      {
        "question": "Can I generate questions from computer science textbook chapters?",
        "answer": "Absolutely. Upload PDF chapters from computer science textbooks, and QuizForge will extract key concepts, algorithms, and programming principles to create questions aligned with your curriculum."
      }
    ],
    "keyTopics": [
      "Programming fundamentals",
      "Algorithms and complexity",
      "Data structures",
      "Object-oriented programming",
      "Software engineering",
      "Computer systems",
      "Networking and security"
    ]
  },
  {
    "slug": "art-history",
    "name": "Art History",
    "description": "Art history quiz generator for creating assessments on art movements, artists, artworks, and art historical analysis. Perfect for AP Art History, college art history, and art appreciation courses.",
    "targetAudience": "art history teachers, AP Art History instructors, college art history professors, and art history tutors",
    "specificChallenges": [
      "Creating questions that test art historical analysis, not just memorization",
      "Covering diverse art movements, periods, and cultures",
      "Aligning with AP Art History curriculum and art historical thinking",
      "Generating questions that require analysis of artworks and artistic techniques"
    ],
    "useCases": [
      "AP Art History teachers creating unit tests on Renaissance art",
      "Art history professors generating exam questions on modern art movements",
      "Art appreciation instructors preparing assessments on art analysis",
      "Art history tutors helping students understand art historical context"
    ],
    "exampleQuestions": [
      {
        "question": "Which art movement is characterized by bold colors and expressive brushstrokes?",
        "options": ["Impressionism", "Expressionism", "Realism", "Neoclassicism"],
        "correctAnswer": "Expressionism",
        "type": "multiple-choice",
        "difficulty": "medium"
      },
      {
        "question": "Analyze how the use of perspective in Renaissance art differs from medieval art.",
        "type": "short-answer",
        "difficulty": "hard",
        "bloomsLevel": "analysis"
      },
      {
        "question": "Compare the artistic techniques used in Impressionism and Post-Impressionism.",
        "type": "short-answer",
        "difficulty": "hard",
        "bloomsLevel": "synthesis"
      }
    ],
    "relatedSubjects": ["ap-art-history", "art", "history", "culture", "humanities"],
    "certifications": ["AP Art History"],
    "gradeLevel": "high-school-college",
    "faqs": [
      {
        "question": "Can QuizForge generate questions about art historical analysis?",
        "answer": "Yes! QuizForge can create questions covering art movements, artists, artworks, artistic techniques, and art historical analysis as required for art history courses."
      },
      {
        "question": "Does it align with AP Art History curriculum?",
        "answer": "QuizForge generates questions aligned with AP Art History curriculum, covering all required art historical periods and cultures as specified by the College Board."
      },
      {
        "question": "Can I generate questions from art history textbook chapters?",
        "answer": "Absolutely. Upload PDF chapters from art history textbooks, and QuizForge will extract key concepts about art movements, artists, and artworks to create questions aligned with your curriculum."
      }
    ],
    "keyTopics": [
      "Ancient art",
      "Medieval art",
      "Renaissance art",
      "Baroque and Rococo",
      "Modern art movements",
      "Contemporary art",
      "Non-Western art"
    ]
  },
  {
    "slug": "world-cultures",
    "name": "World Cultures",
    "description": "World cultures quiz generator for creating assessments on global cultures, traditions, customs, and cultural diversity. Perfect for social studies, anthropology, and cultural studies courses.",
    "targetAudience": "social studies teachers, anthropology instructors, cultural studies professors, and world cultures tutors",
    "specificChallenges": [
      "Creating questions that test understanding of cultural diversity and global perspectives",
      "Covering diverse cultures, traditions, and customs from around the world",
      "Aligning with social studies and anthropology curriculum",
      "Generating questions that require cultural sensitivity and understanding"
    ],
    "useCases": [
      "Social studies teachers creating quizzes on world cultures",
      "Anthropology instructors generating exam questions on cultural practices",
      "Cultural studies professors preparing assessments on global diversity",
      "World cultures tutors helping students understand cultural perspectives"
    ],
    "exampleQuestions": [
      {
        "question": "Which cultural practice is common in many Asian countries?",
        "options": [
          "Removing shoes indoors",
          "Eating with hands only",
          "No greeting customs",
          "Same traditions everywhere"
        ],
        "correctAnswer": "Removing shoes indoors",
        "type": "multiple-choice",
        "difficulty": "easy"
      },
      {
        "question": "Explain how cultural values influence social behavior in different societies.",
        "type": "short-answer",
        "difficulty": "hard",
        "bloomsLevel": "analysis"
      },
      {
        "question": "Compare the role of family in collectivist versus individualist cultures.",
        "type": "short-answer",
        "difficulty": "hard",
        "bloomsLevel": "synthesis"
      }
    ],
    "relatedSubjects": ["geography", "anthropology", "social-studies", "world-history", "sociology"],
    "certifications": [],
    "gradeLevel": "middle-school-college",
    "faqs": [
      {
        "question": "Can QuizForge generate questions about world cultures?",
        "answer": "Yes! QuizForge can create questions covering cultural traditions, customs, values, social practices, and cultural diversity from around the world as required for cultural studies courses."
      },
      {
        "question": "Does it cover diverse cultural perspectives?",
        "answer": "QuizForge generates questions covering diverse cultures, traditions, and perspectives from different regions and societies, promoting understanding of global cultural diversity."
      },
      {
        "question": "Can I generate questions from cultural studies textbook chapters?",
        "answer": "Absolutely. Upload PDF chapters from cultural studies or anthropology textbooks, and QuizForge will extract key concepts about cultures, traditions, and social practices to create questions."
      }
    ],
    "keyTopics": [
      "Cultural traditions",
      "Social customs",
      "Religious practices",
      "Language and communication",
      "Family structures",
      "Economic systems",
      "Political systems"
    ]
  },
  {
    "slug": "earth-science",
    "name": "Earth Science",
    "description": "Earth science quiz generator for creating assessments on geology, meteorology, oceanography, and astronomy. Perfect for earth science courses, environmental science, and geology programs.",
    "targetAudience": "earth science teachers, geology instructors, environmental science professors, and earth science tutors",
    "specificChallenges": [
      "Creating questions that test understanding of earth processes and systems",
      "Covering geology, meteorology, oceanography, and astronomy",
      "Aligning with earth science curriculum and NGSS standards",
      "Generating questions that require understanding of earth systems interactions"
    ],
    "useCases": [
      "Earth science teachers creating unit tests on plate tectonics",
      "Geology professors generating exam questions on rock formations",
      "Environmental science instructors preparing assessments on weather patterns",
      "Earth science tutors helping students understand earth processes"
    ],
    "exampleQuestions": [
      {
        "question": "What type of rock is formed from cooled magma?",
        "options": ["Sedimentary", "Metamorphic", "Igneous", "Limestone"],
        "correctAnswer": "Igneous",
        "type": "multiple-choice",
        "difficulty": "easy"
      },
      {
        "question": "Explain how plate tectonics causes earthquakes.",
        "type": "short-answer",
        "difficulty": "hard",
        "bloomsLevel": "analysis"
      },
      {
        "question": "Describe the water cycle and explain how it connects different earth systems.",
        "type": "short-answer",
        "difficulty": "hard",
        "bloomsLevel": "synthesis"
      }
    ],
    "relatedSubjects": ["geography", "environmental-science", "geology", "meteorology", "astronomy"],
    "certifications": ["NGSS Standards"],
    "gradeLevel": "middle-school-college",
    "faqs": [
      {
        "question": "Can QuizForge generate questions about earth processes?",
        "answer": "Yes! QuizForge can create questions covering geology, meteorology, oceanography, astronomy, and earth systems as required for earth science courses."
      },
      {
        "question": "Does it align with NGSS standards?",
        "answer": "QuizForge generates questions aligned with Next Generation Science Standards for earth science, covering earth systems, processes, and interactions."
      },
      {
        "question": "Can I generate questions from earth science textbook chapters?",
        "answer": "Absolutely. Upload PDF chapters from earth science textbooks, and QuizForge will extract key concepts about earth processes, systems, and phenomena to create aligned questions."
      }
    ],
    "keyTopics": [
      "Geology and rocks",
      "Plate tectonics",
      "Weather and climate",
      "Oceanography",
      "Astronomy",
      "Earth systems",
      "Natural resources"
    ]
  },
  {
    "slug": "ap-physics",
    "name": "AP Physics",
    "description": "AP Physics quiz generator for creating practice questions aligned with the AP Physics curriculum. Perfect for AP Physics teachers, students preparing for the AP exam, and AP Physics tutors.",
    "targetAudience": "AP Physics teachers, high school students preparing for AP Physics, AP Physics tutors, and AP Physics instructors",
    "specificChallenges": [
      "Creating questions aligned with AP Physics curriculum and learning objectives",
      "Covering all AP Physics units and required content",
      "Testing both conceptual understanding and mathematical problem-solving",
      "Generating questions that mirror AP exam format and difficulty"
    ],
    "useCases": [
      "AP Physics teachers creating unit tests aligned with AP curriculum",
      "Students generating practice questions for AP Physics exam preparation",
      "AP Physics tutors creating focused practice on specific units",
      "AP Physics instructors preparing students for the AP exam"
    ],
    "exampleQuestions": [
      {
        "question": "What is the acceleration due to gravity on Earth?",
        "options": ["9.8 m/s²", "10 m/s²", "8.9 m/s²", "11 m/s²"],
        "correctAnswer": "9.8 m/s²",
        "type": "multiple-choice",
        "difficulty": "easy"
      },
      {
        "question": "A 5 kg object is pushed with a force of 20 N. What is its acceleration?",
        "type": "short-answer",
        "difficulty": "medium",
        "bloomsLevel": "application"
      },
      {
        "question": "Explain how conservation of energy applies to a pendulum system.",
        "type": "short-answer",
        "difficulty": "hard",
        "bloomsLevel": "analysis"
      }
    ],
    "relatedSubjects": ["physics", "ap-exams", "test-prep", "science", "college-prep"],
    "certifications": ["AP Physics 1", "AP Physics 2", "AP Physics C"],
    "gradeLevel": "high-school",
    "faqs": [
      {
        "question": "Can QuizForge generate AP Physics practice questions?",
        "answer": "Yes! QuizForge can create questions aligned with AP Physics 1, AP Physics 2, and AP Physics C curricula, covering mechanics, electricity, magnetism, waves, and modern physics as required by the College Board."
      },
      {
        "question": "Does it cover all AP Physics content areas?",
        "answer": "QuizForge generates questions covering all AP Physics content areas including kinematics, dynamics, energy, momentum, rotation, oscillations, electricity, magnetism, and waves."
      },
      {
        "question": "Can I generate questions from AP Physics textbook chapters?",
        "answer": "Absolutely. Upload PDF chapters from AP Physics textbooks or other AP-aligned resources, and QuizForge will extract key concepts to create questions aligned with AP curriculum."
      }
    ],
    "keyTopics": [
      "Mechanics",
      "Electricity and magnetism",
      "Waves and oscillations",
      "Thermodynamics",
      "Modern physics",
      "Rotational motion",
      "Oscillations"
    ]
  },
  {
    "slug": "ap-world-history",
    "name": "AP World History",
    "description": "AP World History quiz generator for creating practice questions aligned with the AP World History curriculum. Perfect for AP World History teachers, students preparing for the AP exam, and AP World History tutors.",
    "targetAudience": "AP World History teachers, high school students preparing for AP World History, AP World History tutors, and AP World History instructors",
    "specificChallenges": [
      "Creating questions aligned with AP World History curriculum and historical thinking skills",
      "Covering all six AP World History time periods and all geographic regions",
      "Testing historical thinking skills including comparison and causation",
      "Generating questions that mirror AP exam format and difficulty"
    ],
    "useCases": [
      "AP World History teachers creating unit tests aligned with AP curriculum",
      "Students generating practice questions for AP World History exam preparation",
      "AP World History tutors creating focused practice on specific time periods",
      "AP World History instructors preparing students for the AP exam"
    ],
    "exampleQuestions": [
      {
        "question": "Which ancient civilization developed the first system of writing?",
        "options": ["Egyptians", "Sumerians", "Greeks", "Chinese"],
        "correctAnswer": "Sumerians",
        "type": "multiple-choice",
        "difficulty": "easy"
      },
      {
        "question": "Compare the political systems of ancient Athens and ancient Rome.",
        "type": "short-answer",
        "difficulty": "hard",
        "bloomsLevel": "analysis"
      },
      {
        "question": "Analyze the causes and effects of the Industrial Revolution on global societies.",
        "type": "short-answer",
        "difficulty": "hard",
        "bloomsLevel": "synthesis"
      }
    ],
    "relatedSubjects": ["world-history", "history", "ap-exams", "test-prep", "college-prep"],
    "certifications": ["AP World History"],
    "gradeLevel": "high-school",
    "faqs": [
      {
        "question": "Can QuizForge generate AP World History practice questions?",
        "answer": "Yes! QuizForge can create questions aligned with AP World History curriculum, covering all six time periods from 1200 BCE to the present and all geographic regions as required by the College Board."
      },
      {
        "question": "Does it test historical thinking skills?",
        "answer": "QuizForge generates questions that test historical thinking skills including comparison, causation, continuity and change over time, and periodization, as well as the ability to analyze primary and secondary sources."
      },
      {
        "question": "Can I generate questions from AP World History textbook chapters?",
        "answer": "Absolutely. Upload PDF chapters from AP World History textbooks or other AP-aligned resources, and QuizForge will extract key events and concepts to create questions aligned with AP curriculum."
      }
    ],
    "keyTopics": [
      "Period 1: 1200-1450",
      "Period 2: 1450-1750",
      "Period 3: 1750-1900",
      "Period 4: 1900-present",
      "Global interactions",
      "Cultural developments",
      "Economic systems"
    ]
  },
  {
    "slug": "ap-calculus",
    "name": "AP Calculus",
    "description": "AP Calculus quiz generator for creating practice questions aligned with the AP Calculus curriculum. Perfect for AP Calculus teachers, students preparing for the AP exam, and AP Calculus tutors.",
    "targetAudience": "AP Calculus teachers, high school students preparing for AP Calculus, AP Calculus tutors, and AP Calculus instructors",
    "specificChallenges": [
      "Creating questions aligned with AP Calculus curriculum and learning objectives",
      "Covering both AP Calculus AB and BC content",
      "Testing both computational skills and conceptual understanding",
      "Generating questions that mirror AP exam format and difficulty"
    ],
    "useCases": [
      "AP Calculus teachers creating unit tests aligned with AP curriculum",
      "Students generating practice questions for AP Calculus exam preparation",
      "AP Calculus tutors creating focused practice on specific topics",
      "AP Calculus instructors preparing students for the AP exam"
    ],
    "exampleQuestions": [
      {
        "question": "What is the derivative of f(x) = x³ + 2x² - 5x?",
        "options": ["3x² + 4x - 5", "x² + 2x - 5", "3x² + 2x", "x³ + 2x²"],
        "correctAnswer": "3x² + 4x - 5",
        "type": "multiple-choice",
        "difficulty": "medium"
      },
      {
        "question": "Evaluate the definite integral: ∫₀² (3x² + 2x) dx",
        "type": "short-answer",
        "difficulty": "medium",
        "bloomsLevel": "application"
      },
      {
        "question": "Use the Mean Value Theorem to show that there exists a point c where f'(c) = 0 for the function f(x) = x² - 4x + 3 on [1, 3].",
        "type": "short-answer",
        "difficulty": "hard",
        "bloomsLevel": "synthesis"
      }
    ],
    "relatedSubjects": ["calculus", "mathematics", "ap-exams", "test-prep", "college-prep"],
    "certifications": ["AP Calculus AB", "AP Calculus BC"],
    "gradeLevel": "high-school",
    "faqs": [
      {
        "question": "Can QuizForge generate AP Calculus practice questions?",
        "answer": "Yes! QuizForge can create questions aligned with AP Calculus AB and AP Calculus BC curricula, covering limits, derivatives, integrals, and applications as required by the College Board."
      },
      {
        "question": "Does it cover both AB and BC content?",
        "answer": "QuizForge generates questions covering AP Calculus AB content (limits, derivatives, integrals) and can also create BC-specific questions (sequences, series, parametric equations) as needed."
      },
      {
        "question": "Can I generate questions from AP Calculus textbook chapters?",
        "answer": "Absolutely. Upload PDF chapters from AP Calculus textbooks or other AP-aligned resources, and QuizForge will extract key concepts to create questions aligned with AP curriculum."
      }
    ],
    "keyTopics": [
      "Limits and continuity",
      "Derivatives",
      "Applications of derivatives",
      "Integrals",
      "Applications of integrals",
      "Differential equations",
      "Sequences and series"
    ]
  },
  {
    "slug": "5th-grade-math",
    "name": "5th Grade Math",
    "description": "5th grade math quiz generator for creating assessments on fractions, decimals, geometry, and basic algebra. Perfect for 5th grade math teachers, elementary math educators, and math tutors.",
    "targetAudience": "5th grade math teachers, elementary math educators, math tutors, and 5th grade math instructors",
    "specificChallenges": [
      "Creating questions appropriate for 5th grade level and Common Core standards",
      "Covering fractions, decimals, geometry, and basic operations",
      "Aligning with 5th grade math curriculum and learning objectives",
      "Generating questions that are engaging and age-appropriate"
    ],
    "useCases": [
      "5th grade math teachers creating quizzes on fractions and decimals",
      "Elementary math educators generating practice problems for 5th grade students",
      "Math tutors helping 5th grade students master math concepts",
      "5th grade math instructors preparing assessments aligned with curriculum"
    ],
    "exampleQuestions": [
      {
        "question": "What is 3/4 + 1/4?",
        "options": ["4/8", "1", "2/4", "4/4"],
        "correctAnswer": "1",
        "type": "multiple-choice",
        "difficulty": "easy"
      },
      {
        "question": "Convert 0.75 to a fraction in simplest form.",
        "type": "short-answer",
        "difficulty": "medium",
        "bloomsLevel": "application"
      },
      {
        "question": "A rectangle has a length of 8 cm and a width of 5 cm. What is its area?",
        "type": "short-answer",
        "difficulty": "medium",
        "bloomsLevel": "application"
      }
    ],
    "relatedSubjects": ["mathematics", "elementary-math", "4th-grade-math", "6th-grade-math", "fractions"],
    "certifications": ["Common Core"],
    "gradeLevel": "elementary",
    "faqs": [
      {
        "question": "Can QuizForge generate 5th grade math questions?",
        "answer": "Yes! QuizForge can create questions appropriate for 5th grade level, covering fractions, decimals, geometry, measurement, and basic operations as required for 5th grade math curriculum."
      },
      {
        "question": "Does it align with Common Core standards?",
        "answer": "QuizForge generates questions aligned with Common Core math standards for 5th grade, focusing on number operations, fractions, decimals, geometry, and measurement."
      },
      {
        "question": "Can I generate questions from 5th grade math textbook chapters?",
        "answer": "Absolutely. Upload PDF chapters from 5th grade math textbooks, and QuizForge will extract key concepts appropriate for 5th grade level to create questions aligned with your curriculum."
      }
    ],
    "keyTopics": [
      "Fractions and decimals",
      "Operations with whole numbers",
      "Geometry and measurement",
      "Data and graphs",
      "Problem solving",
      "Number patterns",
      "Basic algebra concepts"
    ]
  },
  {
    "slug": "8th-grade-science",
    "name": "8th Grade Science",
    "description": "8th grade science quiz generator for creating assessments on physical science, life science, and earth science. Perfect for 8th grade science teachers, middle school science educators, and science tutors.",
    "targetAudience": "8th grade science teachers, middle school science educators, science tutors, and 8th grade science instructors",
    "specificChallenges": [
      "Creating questions appropriate for 8th grade level and NGSS standards",
      "Covering physical science, life science, and earth science concepts",
      "Aligning with 8th grade science curriculum and learning objectives",
      "Generating questions that are engaging and age-appropriate"
    ],
    "useCases": [
      "8th grade science teachers creating quizzes on physical science",
      "Middle school science educators generating practice problems for 8th grade students",
      "Science tutors helping 8th grade students master science concepts",
      "8th grade science instructors preparing assessments aligned with curriculum"
    ],
    "exampleQuestions": [
      {
        "question": "What is the process by which plants make their own food?",
        "options": ["Respiration", "Photosynthesis", "Digestion", "Transpiration"],
        "correctAnswer": "Photosynthesis",
        "type": "multiple-choice",
        "difficulty": "easy"
      },
      {
        "question": "Explain the difference between a physical change and a chemical change.",
        "type": "short-answer",
        "difficulty": "medium",
        "bloomsLevel": "analysis"
      },
      {
        "question": "Describe how the water cycle works.",
        "type": "short-answer",
        "difficulty": "medium",
        "bloomsLevel": "application"
      }
    ],
    "relatedSubjects": ["science", "middle-school-science", "7th-grade-science", "9th-grade-science", "physical-science"],
    "certifications": ["NGSS Standards"],
    "gradeLevel": "middle-school",
    "faqs": [
      {
        "question": "Can QuizForge generate 8th grade science questions?",
        "answer": "Yes! QuizForge can create questions appropriate for 8th grade level, covering physical science, life science, and earth science concepts as required for 8th grade science curriculum."
      },
      {
        "question": "Does it align with NGSS standards?",
        "answer": "QuizForge generates questions aligned with Next Generation Science Standards for 8th grade, covering physical science, life science, and earth science as specified in the standards."
      },
      {
        "question": "Can I generate questions from 8th grade science textbook chapters?",
        "answer": "Absolutely. Upload PDF chapters from 8th grade science textbooks, and QuizForge will extract key concepts appropriate for 8th grade level to create questions aligned with your curriculum."
      }
    ],
    "keyTopics": [
      "Physical science",
      "Life science",
      "Earth science",
      "Scientific method",
      "Energy and matter",
      "Ecosystems",
      "Earth systems"
    ]
  },
  {
    "slug": "high-school-chemistry",
    "name": "High School Chemistry",
    "description": "High school chemistry quiz generator for creating assessments on chemical principles, reactions, and chemistry concepts. Perfect for high school chemistry teachers, chemistry educators, and chemistry tutors.",
    "targetAudience": "high school chemistry teachers, chemistry educators, chemistry tutors, and high school chemistry instructors",
    "specificChallenges": [
      "Creating questions appropriate for high school level and NGSS standards",
      "Covering chemical principles, reactions, and laboratory concepts",
      "Aligning with high school chemistry curriculum and learning objectives",
      "Generating questions that test both conceptual understanding and problem-solving"
    ],
    "useCases": [
      "High school chemistry teachers creating quizzes on chemical reactions",
      "Chemistry educators generating practice problems for high school students",
      "Chemistry tutors helping high school students master chemistry concepts",
      "High school chemistry instructors preparing assessments aligned with curriculum"
    ],
    "exampleQuestions": [
      {
        "question": "What is the chemical formula for water?",
        "options": ["H₂O", "CO₂", "NaCl", "O₂"],
        "correctAnswer": "H₂O",
        "type": "multiple-choice",
        "difficulty": "easy"
      },
      {
        "question": "Balance the following equation: H₂ + O₂ → H₂O",
        "type": "short-answer",
        "difficulty": "medium",
        "bloomsLevel": "application"
      },
      {
        "question": "Explain the difference between an element and a compound.",
        "type": "short-answer",
        "difficulty": "medium",
        "bloomsLevel": "analysis"
      }
    ],
    "relatedSubjects": ["chemistry", "ap-chemistry", "science", "high-school-science", "chemical-reactions"],
    "certifications": ["NGSS Standards"],
    "gradeLevel": "high-school",
    "faqs": [
      {
        "question": "Can QuizForge generate high school chemistry questions?",
        "answer": "Yes! QuizForge can create questions appropriate for high school level, covering chemical principles, reactions, stoichiometry, and laboratory concepts as required for high school chemistry curriculum."
      },
      {
        "question": "Does it align with NGSS standards?",
        "answer": "QuizForge generates questions aligned with Next Generation Science Standards for chemistry, covering chemical principles, reactions, and matter as specified in the standards."
      },
      {
        "question": "Can I generate questions from high school chemistry textbook chapters?",
        "answer": "Absolutely. Upload PDF chapters from high school chemistry textbooks, and QuizForge will extract key concepts appropriate for high school level to create questions aligned with your curriculum."
      }
    ],
    "keyTopics": [
      "Atomic structure",
      "Chemical bonding",
      "Chemical reactions",
      "Stoichiometry",
      "Acids and bases",
      "Thermodynamics",
      "Laboratory safety"
    ]
  }
];

async function addLastSubjects() {
  try {
    const subjectsPath = path.join(rootDir, 'data', 'subjects.json');
    const existingSubjects = await fs.readJson(subjectsPath);
    
    console.log(`Current subjects: ${existingSubjects.length}`);
    console.log(`Adding ${lastSubjects.length} more subjects...`);
    
    const allSubjects = [...existingSubjects, ...lastSubjects];
    
    await fs.writeJson(subjectsPath, allSubjects, { spaces: 2 });
    
    console.log(`✅ Total subjects: ${allSubjects.length}`);
    if (allSubjects.length >= 50) {
      console.log(`🎉 Reached 50+ subjects!`);
    } else {
      console.log(`📝 Need ${50 - allSubjects.length} more to reach 50`);
    }
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

addLastSubjects();

