import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Final batch of subjects to reach 50+ (adding 20 more)
const finalSubjects = [
  {
    "slug": "organic-chemistry",
    "name": "Organic Chemistry",
    "description": "Organic chemistry quiz generator for creating assessments on organic compounds, reactions, mechanisms, and synthesis. Perfect for organic chemistry courses, MCAT preparation, and chemistry majors.",
    "targetAudience": "organic chemistry teachers, chemistry professors, MCAT prep instructors, and organic chemistry tutors",
    "specificChallenges": [
      "Creating questions that test understanding of reaction mechanisms, not just memorization",
      "Covering functional groups, reactions, and synthesis strategies",
      "Aligning with organic chemistry curriculum and MCAT requirements",
      "Generating questions that require understanding of electron flow and stereochemistry"
    ],
    "useCases": [
      "Organic chemistry professors creating exam questions on reaction mechanisms",
      "MCAT prep instructors generating practice questions for organic chemistry",
      "Chemistry majors creating study questions for organic chemistry courses",
      "Organic chemistry tutors helping students master synthesis problems"
    ],
    "exampleQuestions": [
      {
        "question": "What is the IUPAC name for CH₃CH₂CH₂OH?",
        "options": ["1-propanol", "2-propanol", "propanal", "propanoic acid"],
        "correctAnswer": "1-propanol",
        "type": "multiple-choice",
        "difficulty": "medium"
      },
      {
        "question": "Draw the mechanism for the SN2 reaction between bromoethane and hydroxide ion.",
        "type": "short-answer",
        "difficulty": "hard",
        "bloomsLevel": "synthesis"
      },
      {
        "question": "Which functional group is present in a ketone?",
        "options": ["-OH", "-CHO", "-CO-", "-COOH"],
        "correctAnswer": "-CO-",
        "type": "multiple-choice",
        "difficulty": "easy"
      }
    ],
    "relatedSubjects": ["chemistry", "biochemistry", "mcat-biology", "ap-chemistry", "pharmacology"],
    "certifications": ["MCAT", "Chemistry Major"],
    "gradeLevel": "college",
    "faqs": [
      {
        "question": "Can QuizForge generate questions about organic reaction mechanisms?",
        "answer": "Yes! QuizForge can create questions covering reaction mechanisms, functional groups, stereochemistry, synthesis strategies, and organic transformations as required for organic chemistry courses."
      },
      {
        "question": "Does it cover all major functional groups?",
        "answer": "QuizForge generates questions covering all major functional groups including alkanes, alkenes, alkynes, alcohols, ethers, aldehydes, ketones, carboxylic acids, esters, and amines."
      },
      {
        "question": "Can I generate questions from organic chemistry textbook chapters?",
        "answer": "Absolutely. Upload PDF chapters from organic chemistry textbooks, and QuizForge will extract key concepts, reactions, and mechanisms to create questions aligned with your curriculum."
      }
    ],
    "keyTopics": [
      "Functional groups",
      "Reaction mechanisms",
      "Stereochemistry",
      "Synthesis strategies",
      "Spectroscopy",
      "Aromatic compounds",
      "Biomolecules"
    ]
  },
  {
    "slug": "biochemistry",
    "name": "Biochemistry",
    "description": "Biochemistry quiz generator for creating assessments on biomolecules, metabolic pathways, enzyme kinetics, and biochemical processes. Perfect for biochemistry courses, medical school, and MCAT preparation.",
    "targetAudience": "biochemistry teachers, medical school instructors, MCAT prep instructors, and biochemistry tutors",
    "specificChallenges": [
      "Creating questions that test understanding of metabolic pathways and enzyme mechanisms",
      "Covering biomolecules, metabolism, and biochemical processes",
      "Aligning with biochemistry curriculum and MCAT requirements",
      "Generating questions that require understanding of biochemical pathways and regulation"
    ],
    "useCases": [
      "Biochemistry professors creating exam questions on metabolic pathways",
      "Medical school instructors generating quizzes on enzyme kinetics",
      "MCAT prep instructors creating practice questions for biochemistry",
      "Biochemistry tutors helping students master complex pathways"
    ],
    "exampleQuestions": [
      {
        "question": "Which enzyme catalyzes the first step of glycolysis?",
        "options": ["Hexokinase", "Phosphofructokinase", "Pyruvate kinase", "Aldolase"],
        "correctAnswer": "Hexokinase",
        "type": "multiple-choice",
        "difficulty": "medium"
      },
      {
        "question": "Explain how ATP is produced in the electron transport chain.",
        "type": "short-answer",
        "difficulty": "hard",
        "bloomsLevel": "analysis"
      },
      {
        "question": "What is the primary function of DNA polymerase?",
        "options": [
          "Transcription",
          "Translation",
          "DNA replication",
          "RNA synthesis"
        ],
        "correctAnswer": "DNA replication",
        "type": "multiple-choice",
        "difficulty": "easy"
      }
    ],
    "relatedSubjects": ["biology", "chemistry", "organic-chemistry", "mcat-biology", "medical-school"],
    "certifications": ["MCAT", "Medical School"],
    "gradeLevel": "college-professional",
    "faqs": [
      {
        "question": "Can QuizForge generate questions about metabolic pathways?",
        "answer": "Yes! QuizForge can create questions covering all major metabolic pathways including glycolysis, Krebs cycle, electron transport chain, fatty acid metabolism, and amino acid metabolism."
      },
      {
        "question": "Does it cover enzyme kinetics and mechanisms?",
        "answer": "QuizForge generates questions covering enzyme kinetics, enzyme mechanisms, regulation of enzyme activity, and how enzymes function in metabolic pathways."
      },
      {
        "question": "Can I generate questions from biochemistry textbook chapters?",
        "answer": "Absolutely. Upload PDF chapters from biochemistry textbooks, and QuizForge will extract key concepts, pathways, and mechanisms to create questions aligned with your curriculum."
      }
    ],
    "keyTopics": [
      "Biomolecules",
      "Enzyme kinetics",
      "Metabolic pathways",
      "Cellular respiration",
      "Photosynthesis",
      "DNA and RNA",
      "Protein synthesis"
    ]
  },
  {
    "slug": "english",
    "name": "English",
    "description": "English quiz generator for creating assessments on grammar, vocabulary, writing, and language skills. Perfect for English teachers, ESL instructors, and language arts educators.",
    "targetAudience": "English teachers, ESL instructors, language arts educators, and English tutors",
    "specificChallenges": [
      "Creating questions that test language skills, not just grammar rules",
      "Covering grammar, vocabulary, writing, and reading comprehension",
      "Aligning with English language arts standards",
      "Generating questions that require understanding of context and usage"
    ],
    "useCases": [
      "English teachers creating grammar quizzes for their classes",
      "ESL instructors generating vocabulary and comprehension questions",
      "Language arts educators preparing assessments on writing skills",
      "English tutors helping students improve language proficiency"
    ],
    "exampleQuestions": [
      {
        "question": "Which sentence is grammatically correct?",
        "options": [
          "The team are playing well.",
          "The team is playing well.",
          "The team were playing well.",
          "The team be playing well."
        ],
        "correctAnswer": "The team is playing well.",
        "type": "multiple-choice",
        "difficulty": "easy"
      },
      {
        "question": "Identify the type of sentence: 'Although it was raining, we decided to go for a walk.'",
        "type": "short-answer",
        "difficulty": "medium",
        "bloomsLevel": "application"
      },
      {
        "question": "Explain the difference between 'affect' and 'effect' and provide examples of each.",
        "type": "short-answer",
        "difficulty": "medium",
        "bloomsLevel": "analysis"
      }
    ],
    "relatedSubjects": ["english-literature", "writing", "grammar", "vocabulary", "esl"],
    "certifications": ["Common Core"],
    "gradeLevel": "all-levels",
    "faqs": [
      {
        "question": "Can QuizForge generate questions about grammar and language?",
        "answer": "Yes! QuizForge can create questions covering grammar rules, sentence structure, punctuation, vocabulary, and language usage as required for English language arts education."
      },
      {
        "question": "Does it support ESL and language learning?",
        "answer": "QuizForge generates questions suitable for ESL learners, covering grammar, vocabulary, reading comprehension, and language skills at various proficiency levels."
      },
      {
        "question": "Can I generate questions from English textbook chapters?",
        "answer": "Absolutely. Upload PDF chapters from English textbooks or language learning materials, and QuizForge will extract key concepts to create questions aligned with your curriculum."
      }
    ],
    "keyTopics": [
      "Grammar and syntax",
      "Vocabulary",
      "Reading comprehension",
      "Writing skills",
      "Punctuation",
      "Sentence structure",
      "Language usage"
    ]
  },
  {
    "slug": "writing",
    "name": "Writing",
    "description": "Writing quiz generator for creating assessments on writing skills, composition, essay structure, and writing techniques. Perfect for English teachers, writing instructors, and composition courses.",
    "targetAudience": "writing teachers, English teachers, composition instructors, and writing tutors",
    "specificChallenges": [
      "Creating questions that test writing skills and techniques",
      "Covering essay structure, grammar, and composition",
      "Aligning with writing standards and curriculum",
      "Generating questions that require understanding of writing process and style"
    ],
    "useCases": [
      "Writing teachers creating quizzes on essay structure and organization",
      "English teachers generating questions on writing techniques and style",
      "Composition instructors preparing assessments on the writing process",
      "Writing tutors helping students improve their writing skills"
    ],
    "exampleQuestions": [
      {
        "question": "What is the purpose of a thesis statement in an essay?",
        "options": [
          "To provide evidence",
          "To state the main argument",
          "To conclude the essay",
          "To introduce sources"
        ],
        "correctAnswer": "To state the main argument",
        "type": "multiple-choice",
        "difficulty": "easy"
      },
      {
        "question": "Explain the difference between expository and persuasive writing.",
        "type": "short-answer",
        "difficulty": "medium",
        "bloomsLevel": "analysis"
      },
      {
        "question": "What are the key components of a well-structured paragraph?",
        "type": "short-answer",
        "difficulty": "medium",
        "bloomsLevel": "application"
      }
    ],
    "relatedSubjects": ["english", "english-literature", "grammar", "composition", "essay-writing"],
    "certifications": ["Common Core"],
    "gradeLevel": "all-levels",
    "faqs": [
      {
        "question": "Can QuizForge generate questions about writing skills?",
        "answer": "Yes! QuizForge can create questions covering essay structure, writing techniques, grammar, style, organization, and the writing process as required for writing education."
      },
      {
        "question": "Does it cover different types of writing?",
        "answer": "QuizForge generates questions covering various types of writing including narrative, expository, persuasive, descriptive, and argumentative writing."
      },
      {
        "question": "Can I generate questions from writing textbook chapters?",
        "answer": "Absolutely. Upload PDF chapters from writing textbooks or composition guides, and QuizForge will extract key concepts to create questions aligned with your curriculum."
      }
    ],
    "keyTopics": [
      "Essay structure",
      "Writing process",
      "Grammar and style",
      "Organization and coherence",
      "Research and citation",
      "Revision and editing",
      "Writing techniques"
    ]
  },
  {
    "slug": "pre-calculus",
    "name": "Pre-Calculus",
    "description": "Pre-calculus quiz generator for creating assessments on functions, trigonometry, and advanced algebra. Perfect for pre-calculus courses and students preparing for calculus.",
    "targetAudience": "pre-calculus teachers, high school math instructors, pre-calculus tutors, and math educators",
    "specificChallenges": [
      "Creating questions that test understanding of functions and advanced algebra",
      "Covering trigonometry, functions, and mathematical modeling",
      "Aligning with pre-calculus curriculum and Common Core standards",
      "Generating questions that prepare students for calculus"
    ],
    "useCases": [
      "Pre-calculus teachers creating unit tests on functions and trigonometry",
      "Math tutors generating practice problems for pre-calculus exams",
      "High school teachers preparing students for calculus courses",
      "Math educators creating assessments on mathematical modeling"
    ],
    "exampleQuestions": [
      {
        "question": "What is the domain of the function f(x) = √(x - 3)?",
        "options": ["x ≥ 0", "x ≥ 3", "x > 3", "All real numbers"],
        "correctAnswer": "x ≥ 3",
        "type": "multiple-choice",
        "difficulty": "medium"
      },
      {
        "question": "Graph the function f(x) = 2sin(x) and identify its amplitude and period.",
        "type": "short-answer",
        "difficulty": "medium",
        "bloomsLevel": "application"
      },
      {
        "question": "Solve the logarithmic equation: log₂(x + 3) = 4",
        "type": "short-answer",
        "difficulty": "medium",
        "bloomsLevel": "application"
      }
    ],
    "relatedSubjects": ["mathematics", "algebra", "trigonometry", "calculus", "functions"],
    "certifications": ["Common Core", "Pre-Calculus"],
    "gradeLevel": "high-school",
    "faqs": [
      {
        "question": "Can QuizForge generate pre-calculus problems?",
        "answer": "Yes! QuizForge generates questions covering functions, trigonometry, logarithms, exponential functions, and mathematical modeling as required for pre-calculus courses."
      },
      {
        "question": "Does it prepare students for calculus?",
        "answer": "QuizForge generates questions that build foundational skills needed for calculus, including function analysis, limits concepts, and advanced algebraic manipulation."
      },
      {
        "question": "Can I generate questions from pre-calculus textbook chapters?",
        "answer": "Absolutely. Upload PDF chapters from pre-calculus textbooks, and QuizForge will extract key concepts and problem-solving strategies to create questions aligned with your curriculum."
      }
    ],
    "keyTopics": [
      "Functions and graphs",
      "Trigonometric functions",
      "Exponential and logarithmic functions",
      "Polynomial and rational functions",
      "Sequences and series",
      "Conic sections",
      "Mathematical modeling"
    ]
  },
  {
    "slug": "european-history",
    "name": "European History",
    "description": "European History quiz generator for creating assessments on European history from ancient times to the present. Perfect for AP European History, high school European history, and college European history courses.",
    "targetAudience": "European history teachers, AP European History instructors, college history professors, and history tutors",
    "specificChallenges": [
      "Creating questions that test understanding of European historical developments",
      "Covering diverse periods and regions across European history",
      "Aligning with AP European History curriculum and historical thinking skills",
      "Generating questions that require analysis of European historical documents"
    ],
    "useCases": [
      "AP European History teachers creating unit tests on the Renaissance and Reformation",
      "European history professors generating exam questions on the French Revolution",
      "High school teachers preparing students for European history standardized tests",
      "History tutors helping students understand European historical connections"
    ],
    "exampleQuestions": [
      {
        "question": "The Renaissance began in which Italian city?",
        "options": ["Rome", "Venice", "Florence", "Milan"],
        "correctAnswer": "Florence",
        "type": "multiple-choice",
        "difficulty": "easy"
      },
      {
        "question": "Analyze the causes of the French Revolution. Which factor was most significant?",
        "type": "short-answer",
        "difficulty": "hard",
        "bloomsLevel": "analysis"
      },
      {
        "question": "Compare the Industrial Revolution in Britain and Germany. What were the key differences?",
        "type": "short-answer",
        "difficulty": "hard",
        "bloomsLevel": "synthesis"
      }
    ],
    "relatedSubjects": ["history", "world-history", "ap-european-history", "renaissance", "enlightenment"],
    "certifications": ["AP European History"],
    "gradeLevel": "high-school-college",
    "faqs": [
      {
        "question": "Can QuizForge generate questions about European historical analysis?",
        "answer": "Yes! QuizForge generates questions that test historical thinking skills including sourcing, contextualization, and argumentation. It can create questions about analyzing European primary sources and historical documents."
      },
      {
        "question": "Does it align with AP European History curriculum?",
        "answer": "QuizForge generates questions aligned with AP European History curriculum, covering all required time periods and historical thinking skills as specified by the College Board."
      },
      {
        "question": "Can I generate questions from European history textbook chapters?",
        "answer": "Absolutely. Upload PDF chapters from European history textbooks, and QuizForge will extract key events and concepts to create questions that test both factual knowledge and analytical thinking."
      }
    ],
    "keyTopics": [
      "Renaissance and Reformation",
      "Age of Exploration",
      "Scientific Revolution",
      "Enlightenment",
      "French Revolution",
      "Industrial Revolution",
      "World Wars"
    ]
  },
  {
    "slug": "environmental-science",
    "name": "Environmental Science",
    "description": "Environmental science quiz generator for creating assessments on ecosystems, environmental issues, sustainability, and environmental concepts. Perfect for AP Environmental Science, high school environmental science, and college environmental courses.",
    "targetAudience": "environmental science teachers, AP Environmental Science instructors, college environmental professors, and environmental science tutors",
    "specificChallenges": [
      "Creating questions that test understanding of environmental systems and interactions",
      "Covering ecosystems, environmental issues, and sustainability",
      "Aligning with AP Environmental Science curriculum",
      "Generating questions that require analysis of environmental data and case studies"
    ],
    "useCases": [
      "AP Environmental Science teachers creating unit tests on ecosystems",
      "Environmental science professors generating exam questions on climate change",
      "High school teachers preparing students for environmental science standardized tests",
      "Environmental science tutors helping students understand environmental systems"
    ],
    "exampleQuestions": [
      {
        "question": "What is the primary cause of the greenhouse effect?",
        "options": [
          "Ozone depletion",
          "Carbon dioxide in the atmosphere",
          "Ocean acidification",
          "Deforestation"
        ],
        "correctAnswer": "Carbon dioxide in the atmosphere",
        "type": "multiple-choice",
        "difficulty": "medium"
      },
      {
        "question": "Explain how deforestation affects the carbon cycle.",
        "type": "short-answer",
        "difficulty": "hard",
        "bloomsLevel": "analysis"
      },
      {
        "question": "Compare renewable and non-renewable energy sources. What are the advantages and disadvantages of each?",
        "type": "short-answer",
        "difficulty": "hard",
        "bloomsLevel": "synthesis"
      }
    ],
    "relatedSubjects": ["biology", "geography", "ap-environmental-science", "ecology", "sustainability"],
    "certifications": ["AP Environmental Science"],
    "gradeLevel": "high-school-college",
    "faqs": [
      {
        "question": "Can QuizForge generate questions about environmental systems?",
        "answer": "Yes! QuizForge can create questions covering ecosystems, environmental issues, sustainability, climate change, pollution, and conservation as required for environmental science courses."
      },
      {
        "question": "Does it align with AP Environmental Science curriculum?",
        "answer": "QuizForge generates questions aligned with AP Environmental Science curriculum, covering all units including ecosystems, biodiversity, populations, earth systems, and global change as required by the College Board."
      },
      {
        "question": "Can I generate questions from environmental science textbook chapters?",
        "answer": "Absolutely. Upload PDF chapters from environmental science textbooks, and QuizForge will extract key concepts about ecosystems, environmental issues, and sustainability to create aligned questions."
      }
    ],
    "keyTopics": [
      "Ecosystems and biodiversity",
      "Climate change",
      "Pollution and waste",
      "Energy resources",
      "Water resources",
      "Land use",
      "Sustainability"
    ]
  },
  {
    "slug": "psychology",
    "name": "Psychology",
    "description": "Psychology quiz generator for creating assessments on psychological concepts, theories, research methods, and human behavior. Perfect for AP Psychology, high school psychology, and college psychology courses.",
    "targetAudience": "psychology teachers, AP Psychology instructors, college psychology professors, and psychology tutors",
    "specificChallenges": [
      "Creating questions that test understanding of psychological theories and concepts",
      "Covering all major areas of psychology including cognitive, social, and clinical",
      "Aligning with AP Psychology curriculum and psychological research methods",
      "Generating questions that require understanding of research design and data interpretation"
    ],
    "useCases": [
      "AP Psychology teachers creating unit tests on cognitive psychology",
      "Psychology professors generating exam questions on research methods",
      "High school teachers preparing students for psychology standardized tests",
      "Psychology tutors helping students understand psychological theories"
    ],
    "exampleQuestions": [
      {
        "question": "Which psychological perspective emphasizes the role of unconscious conflicts?",
        "options": ["Behavioral", "Psychoanalytic", "Cognitive", "Humanistic"],
        "correctAnswer": "Psychoanalytic",
        "type": "multiple-choice",
        "difficulty": "medium"
      },
      {
        "question": "Explain the difference between classical and operant conditioning.",
        "type": "short-answer",
        "difficulty": "medium",
        "bloomsLevel": "analysis"
      },
      {
        "question": "Design an experiment to test the effect of sleep deprivation on memory.",
        "type": "short-answer",
        "difficulty": "hard",
        "bloomsLevel": "synthesis"
      }
    ],
    "relatedSubjects": ["ap-psychology", "social-studies", "biology", "research-methods", "cognitive-science"],
    "certifications": ["AP Psychology"],
    "gradeLevel": "high-school-college",
    "faqs": [
      {
        "question": "Can QuizForge generate questions about psychological theories?",
        "answer": "Yes! QuizForge can create questions covering all major areas of psychology including biological, cognitive, developmental, social, and clinical psychology as required for psychology courses."
      },
      {
        "question": "Does it cover research methods?",
        "answer": "QuizForge generates questions covering psychological research methods including experiments, surveys, case studies, and observational studies, as well as data analysis and interpretation."
      },
      {
        "question": "Can I generate questions from psychology textbook chapters?",
        "answer": "Absolutely. Upload PDF chapters from psychology textbooks, and QuizForge will extract key concepts, theories, and research findings to create questions aligned with your curriculum."
      }
    ],
    "keyTopics": [
      "Biological psychology",
      "Cognitive psychology",
      "Developmental psychology",
      "Social psychology",
      "Clinical psychology",
      "Research methods",
      "Psychological disorders"
    ]
  },
  {
    "slug": "economics",
    "name": "Economics",
    "description": "Economics quiz generator for creating assessments on economic principles, microeconomics, macroeconomics, and economic analysis. Perfect for AP Economics, high school economics, and college economics courses.",
    "targetAudience": "economics teachers, AP Economics instructors, college economics professors, and economics tutors",
    "specificChallenges": [
      "Creating questions that test understanding of economic principles and analysis",
      "Covering both microeconomics and macroeconomics",
      "Aligning with AP Economics curriculum and economic thinking",
      "Generating questions that require analysis of economic data and graphs"
    ],
    "useCases": [
      "AP Economics teachers creating unit tests on supply and demand",
      "Economics professors generating exam questions on market structures",
      "High school teachers preparing students for economics standardized tests",
      "Economics tutors helping students understand economic principles"
    ],
    "exampleQuestions": [
      {
        "question": "What happens to the equilibrium price when demand increases and supply remains constant?",
        "options": ["Price increases", "Price decreases", "Price stays the same", "Cannot be determined"],
        "correctAnswer": "Price increases",
        "type": "multiple-choice",
        "difficulty": "medium"
      },
      {
        "question": "Explain the difference between fiscal and monetary policy.",
        "type": "short-answer",
        "difficulty": "hard",
        "bloomsLevel": "analysis"
      },
      {
        "question": "Analyze the impact of a minimum wage increase on employment levels.",
        "type": "short-answer",
        "difficulty": "hard",
        "bloomsLevel": "synthesis"
      }
    ],
    "relatedSubjects": ["ap-economics", "microeconomics", "macroeconomics", "business", "social-studies"],
    "certifications": ["AP Microeconomics", "AP Macroeconomics"],
    "gradeLevel": "high-school-college",
    "faqs": [
      {
        "question": "Can QuizForge generate questions about economic principles?",
        "answer": "Yes! QuizForge can create questions covering microeconomics, macroeconomics, market structures, economic policy, and economic analysis as required for economics courses."
      },
      {
        "question": "Does it cover both micro and macroeconomics?",
        "answer": "QuizForge generates questions covering both microeconomics (individual markets, consumer behavior) and macroeconomics (national economy, inflation, unemployment) as required for economics education."
      },
      {
        "question": "Can I generate questions from economics textbook chapters?",
        "answer": "Absolutely. Upload PDF chapters from economics textbooks, and QuizForge will extract key concepts, principles, and economic models to create questions aligned with your curriculum."
      }
    ],
    "keyTopics": [
      "Supply and demand",
      "Market structures",
      "Consumer behavior",
      "National income",
      "Inflation and unemployment",
      "Fiscal policy",
      "Monetary policy"
    ]
  },
  {
    "slug": "government",
    "name": "Government",
    "description": "Government quiz generator for creating assessments on government systems, political processes, civics, and political science. Perfect for AP Government, high school government, and college political science courses.",
    "targetAudience": "government teachers, AP Government instructors, political science professors, and government tutors",
    "specificChallenges": [
      "Creating questions that test understanding of government systems and processes",
      "Covering political institutions, processes, and civic engagement",
      "Aligning with AP Government curriculum and political thinking skills",
      "Generating questions that require analysis of political documents and data"
    ],
    "useCases": [
      "AP Government teachers creating unit tests on the Constitution",
      "Government professors generating exam questions on political processes",
      "High school teachers preparing students for government standardized tests",
      "Government tutors helping students understand political systems"
    ],
    "exampleQuestions": [
      {
        "question": "How many members are in the US House of Representatives?",
        "options": ["100", "435", "538", "50"],
        "correctAnswer": "435",
        "type": "multiple-choice",
        "difficulty": "easy"
      },
      {
        "question": "Explain the system of checks and balances in the US government.",
        "type": "short-answer",
        "difficulty": "medium",
        "bloomsLevel": "analysis"
      },
      {
        "question": "Compare the powers of the federal government and state governments in the US system.",
        "type": "short-answer",
        "difficulty": "hard",
        "bloomsLevel": "synthesis"
      }
    ],
    "relatedSubjects": ["us-history", "civics", "ap-government", "political-science", "social-studies"],
    "certifications": ["AP US Government", "AP Comparative Government"],
    "gradeLevel": "high-school-college",
    "faqs": [
      {
        "question": "Can QuizForge generate questions about government systems?",
        "answer": "Yes! QuizForge can create questions covering government institutions, political processes, constitutional principles, and civic engagement as required for government courses."
      },
      {
        "question": "Does it align with AP Government curriculum?",
        "answer": "QuizForge generates questions aligned with AP US Government and AP Comparative Government curricula, covering all required units and political thinking skills as specified by the College Board."
      },
      {
        "question": "Can I generate questions from government textbook chapters?",
        "answer": "Absolutely. Upload PDF chapters from government textbooks, and QuizForge will extract key concepts about political systems, institutions, and processes to create questions aligned with your curriculum."
      }
    ],
    "keyTopics": [
      "Constitutional principles",
      "Federalism",
      "Political institutions",
      "Political processes",
      "Civil rights and liberties",
      "Public policy",
      "Civic engagement"
    ]
  }
];

async function addFinalSubjects() {
  try {
    const subjectsPath = path.join(rootDir, 'data', 'subjects.json');
    const existingSubjects = await fs.readJson(subjectsPath);
    
    console.log(`Current subjects: ${existingSubjects.length}`);
    console.log(`Adding ${finalSubjects.length} more subjects...`);
    
    const allSubjects = [...existingSubjects, ...finalSubjects];
    
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

addFinalSubjects();

