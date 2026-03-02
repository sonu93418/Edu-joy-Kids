// ─────────────────────────────────────────────────────────────────────────────
// EduJoy Kids — Full Lesson Content Library
// Covers: English, Math, Science, Islamiat, Social Studies
// Grades: Play Group, KG, Class 1–5
// ─────────────────────────────────────────────────────────────────────────────

export type SlideType = "content" | "quiz" | "result";

export interface Slide {
  type: SlideType;
  title?: string;
  content?: string;
  image?: string;
  question?: string;
  options?: string[];
  correct?: number;
  explanation?: string;
}

export interface Lesson {
  id: string;
  subjectId: string;
  grade: string;
  title: string;
  duration: string;
  xpReward: number;
  coinReward: number;
  type: "animated" | "interactive" | "quiz" | "game" | "story";
  difficulty: "easy" | "medium" | "hard";
  status: "completed" | "available" | "locked";
  stars?: number;
  slides: Slide[];
}

export interface Subject {
  id: string;
  label: string;
  color: string;
  bgColor: string;
}

// ── Subjects ──────────────────────────────────────────────────────────────────
export const SUBJECTS: Subject[] = [
  {
    id: "english",
    label: "English",
    color: "from-fun-blue to-edujoy-primary-600",
    bgColor: "bg-edujoy-primary-50",
  },
  {
    id: "math",
    label: "Mathematics",
    color: "from-edujoy-primary-400 to-edujoy-primary-600",
    bgColor: "bg-edujoy-primary-50",
  },
  {
    id: "science",
    label: "Science",
    color: "from-emerald-400 to-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    id: "islamiat",
    label: "Islamiat",
    color: "from-amber-400 to-amber-600",
    bgColor: "bg-amber-50",
  },
  {
    id: "social",
    label: "Social Studies",
    color: "from-teal-400 to-teal-600",
    bgColor: "bg-teal-50",
  },
];

export const GRADES = [
  "Play Group",
  "KG",
  "Class 1",
  "Class 2",
  "Class 3",
  "Class 4",
  "Class 5",
];

// ── Full Lesson Catalog ────────────────────────────────────────────────────────
export const ALL_LESSONS: Lesson[] = [
  // ══════════════════════════════════════════════════════════════════
  //  ENGLISH LESSONS
  // ══════════════════════════════════════════════════════════════════

  // --- Class 1 ---
  {
    id: "en_c1_01",
    subjectId: "english",
    grade: "Class 1",
    title: "The Alphabet Adventure",
    duration: "10 min",
    xpReward: 40,
    coinReward: 10,
    type: "animated",
    difficulty: "easy",
    status: "available",
    slides: [
      {
        type: "content",
        title: "Capital & Small Letters",
        content:
          "The English alphabet has 26 letters.\n\nCapital (BIG) letters:\nA B C D E F G H I J K L M\nN O P Q R S T U V W X Y Z\n\nSmall letters:\na b c d e f g h i j k l m\nn o p q r s t u v w x y z\n\n💡 Tip: Every sentence starts with a CAPITAL letter!",
      },
      {
        type: "content",
        title: "Vowels & Consonants",
        content:
          "There are 5 VOWELS in English:\n🔴 A E I O U\n\nAll other letters are called CONSONANTS.\n\nExamples:\n🔵 B, C, D, F, G, H — consonants\n🔴 A, E, I, O, U — vowels\n\nEvery word needs at least one vowel! 📚",
      },
      {
        type: "quiz",
        question: "How many letters are in the English alphabet?",
        options: ["24", "25", "26", "27"],
        correct: 2,
        explanation:
          "The English alphabet has exactly 26 letters — 5 vowels and 21 consonants!",
      },
      {
        type: "quiz",
        question: "Which of these is a VOWEL?",
        options: ["B", "C", "O", "D"],
        correct: 2,
        explanation:
          "O is a vowel! Remember: A, E, I, O, U are the five vowels.",
      },
      {
        type: "quiz",
        question: "Which letter comes AFTER 'M' in the alphabet?",
        options: ["L", "N", "O", "K"],
        correct: 1,
        explanation: "...L M N O... — N comes right after M in the alphabet!",
      },
      {
        type: "quiz",
        question: "Which word starts with a VOWEL?",
        options: ["Cat", "Dog", "Apple", "Ball"],
        correct: 2,
        explanation: "Apple starts with 'A' which is a vowel. Great job!",
      },
      { type: "result" },
    ],
  },
  {
    id: "en_c1_02",
    subjectId: "english",
    grade: "Class 1",
    title: "Word Families: CVC Words",
    duration: "12 min",
    xpReward: 45,
    coinReward: 12,
    type: "game",
    difficulty: "easy",
    status: "available",
    slides: [
      {
        type: "content",
        title: "What are CVC Words?",
        content:
          "CVC words follow the pattern:\nConsonant + Vowel + Consonant\n\n📌 Examples:\n• C-A-T → CAT\n• D-O-G → DOG\n• B-O-X → BOX\n• S-I-T → SIT\n• H-E-N → HEN\n• C-U-P → CUP\n\nThese are some of the first words we learn to read! 🌟",
      },
      {
        type: "content",
        title: "-AT Family Words",
        content:
          "Words that rhyme with 'AT' form a family!\n\n-AT family:\n🐱 CAT   🦇 BAT   🎩 HAT\n🐀 RAT   💬 CHAT  🏏 MAT\n\nCan you think of more words that end in -AT? Try: FAT, PAT, SAT, VAT\n\nReading tip: Once you know one -AT word, you know them ALL! 🎉",
      },
      {
        type: "quiz",
        question: "Which word follows the CVC pattern?",
        options: ["Street", "Mat", "Train", "School"],
        correct: 1,
        explanation:
          "MAT = M-A-T: consonant-vowel-consonant. Perfect CVC word!",
      },
      {
        type: "quiz",
        question: "What vowel fills the blank? D _ G",
        options: ["A", "O", "U", "E"],
        correct: 1,
        explanation: "D-O-G spells DOG! The vowel O comes in the middle.",
      },
      {
        type: "quiz",
        question: "Which word rhymes with CAT?",
        options: ["Cup", "Sit", "Bat", "Hop"],
        correct: 2,
        explanation: "CAT and BAT both end in -AT so they rhyme!",
      },
      {
        type: "quiz",
        question: "How many letters does a CVC word have?",
        options: ["2", "3", "4", "5"],
        correct: 1,
        explanation: "CVC = Consonant + Vowel + Consonant = exactly 3 letters!",
      },
      { type: "result" },
    ],
  },
  {
    id: "en_c1_03",
    subjectId: "english",
    grade: "Class 1",
    title: "Sight Words Practice",
    duration: "10 min",
    xpReward: 40,
    coinReward: 10,
    type: "interactive",
    difficulty: "easy",
    status: "available",
    slides: [
      {
        type: "content",
        title: "What are Sight Words?",
        content:
          "Sight words are common English words we should know WITHOUT sounding them out!\n\n⭐ Level 1 Sight Words:\nthe • a • I • is • am • are\nwas • he • she • it • we • they\nhave • do • did • for • not\nyou • and • but • or • in • on",
      },
      {
        type: "content",
        title: "Sight Words in Sentences",
        content:
          "Let's see sight words in action:\n\n📌 'THE' — The cat is big.\n📌 'AND' — Tom and Jerry are friends.\n📌 'IS' — She is happy.\n📌 'ARE' — They are playing.\n📌 'HAVE' — I have a book.\n📌 'WAS' — It was raining.\n\nRead these sentences out loud! 🗣️",
      },
      {
        type: "quiz",
        question: "Which is a SIGHT word?",
        options: ["Elephant", "the", "Crocodile", "Beautiful"],
        correct: 1,
        explanation: "'the' is one of the most common sight words in English!",
      },
      {
        type: "quiz",
        question: "Complete: 'Tom ___ Jerry are friends.'",
        options: ["or", "but", "and", "with"],
        correct: 2,
        explanation: "'and' connects two things together: Tom AND Jerry.",
      },
      {
        type: "quiz",
        question: "Which sentence is CORRECT?",
        options: [
          "She am happy",
          "She is happy",
          "She be happy",
          "She are happy",
        ],
        correct: 1,
        explanation: "We use 'is' with she/he/it. 'She is happy' is correct!",
      },
      {
        type: "quiz",
        question: "Fill in: 'I ___ a book.'",
        options: ["possess", "have", "owns", "holding"],
        correct: 1,
        explanation: "'have' is the correct sight word. 'I have a book.'",
      },
      { type: "result" },
    ],
  },
  {
    id: "en_c1_04",
    subjectId: "english",
    grade: "Class 1",
    title: "Simple Sentences",
    duration: "15 min",
    xpReward: 55,
    coinReward: 14,
    type: "interactive",
    difficulty: "medium",
    status: "available",
    slides: [
      {
        type: "content",
        title: "What is a Sentence?",
        content:
          "A sentence is a group of words that makes complete sense.\n\n📌 A sentence:\n✅ Starts with a CAPITAL letter\n✅ Ends with a full stop (.)\n✅ Has a subject + verb\n\nExamples:\n🌟 The dog runs fast.\n🌟 She reads a book.\n🌟 Birds can fly.\n\nNot a sentence: 'the dog fast' ❌ (missing verb)",
      },
      {
        type: "content",
        title: "Subject & Predicate",
        content:
          "Every sentence has two parts:\n\n1️⃣ SUBJECT (who/what the sentence is about)\n2️⃣ PREDICATE (what the subject does)\n\nExample:\n  'The cat   |   drinks milk.'\n   SUBJECT   |   PREDICATE\n\nMore examples:\n🐕 The dog  →  barks loudly.\n☀️ The sun   →  shines bright.\n🧒 Ali       →  plays cricket.",
      },
      {
        type: "quiz",
        question: "Which is a COMPLETE sentence?",
        options: [
          "The big dog",
          "Runs very fast",
          "The dog runs.",
          "Dog fast run",
        ],
        correct: 2,
        explanation:
          "'The dog runs.' has a subject (The dog) + verb (runs) + full stop. Perfect!",
      },
      {
        type: "quiz",
        question: "What does a sentence always start with?",
        options: [
          "A small letter",
          "A number",
          "A capital letter",
          "A full stop",
        ],
        correct: 2,
        explanation: "Every sentence MUST start with a capital letter!",
      },
      {
        type: "quiz",
        question: "Find the SUBJECT in: 'The bird sings sweetly.'",
        options: ["sings", "sweetly", "The bird", "The"],
        correct: 2,
        explanation: "'The bird' is the subject — it tells us WHO is singing!",
      },
      {
        type: "quiz",
        question: "Which punctuation ends a sentence?",
        options: [
          "Comma (,)",
          "Full stop (.)",
          "Question mark (?)",
          "Exclamation (!)",
        ],
        correct: 1,
        explanation: "A full stop (.) ends a normal statement sentence!",
      },
      { type: "result" },
    ],
  },

  // --- Class 2 ---
  {
    id: "en_c2_01",
    subjectId: "english",
    grade: "Class 2",
    title: "Nouns & Naming Words",
    duration: "14 min",
    xpReward: 55,
    coinReward: 14,
    type: "animated",
    difficulty: "easy",
    status: "available",
    slides: [
      {
        type: "content",
        title: "What is a Noun?",
        content:
          "A NOUN is a naming word.\nIt names a person, place, animal, or thing.\n\n👤 Person: boy, girl, teacher, doctor, Ali\n🏙️ Place: school, park, Karachi, home\n🐦 Animal: cat, bird, elephant, fish\n📦 Thing: book, bag, table, pen\n\nEvery person, place, or thing around you has a NOUN name! 🌟",
      },
      {
        type: "content",
        title: "Types of Nouns",
        content:
          "PROPER NOUNS — specific names, always capitalized:\n👤 Ali, Sara, Pakistan, London, Monday\n\nCOMMON NOUNS — general names:\n👤 boy, city, country, day\n\nCOLLECTIVE NOUNS — names for groups:\n🐟 A school of fish\n🦁 A pride of lions\n🐦 A flock of birds\n📚 A library of books",
      },
      {
        type: "quiz",
        question: "Which word is a NOUN?",
        options: ["Run", "Happy", "School", "Quickly"],
        correct: 2,
        explanation:
          "'School' is a noun — it names a place where children learn!",
      },
      {
        type: "quiz",
        question: "Which is a PROPER noun?",
        options: ["city", "boy", "Pakistan", "table"],
        correct: 2,
        explanation:
          "'Pakistan' is a proper noun — it's a specific place name and always starts with a capital letter!",
      },
      {
        type: "quiz",
        question: "What is a 'flock' of?",
        options: ["Fish", "Lions", "Birds", "Bees"],
        correct: 2,
        explanation:
          "A FLOCK is a group of birds! 'A flock of birds flew over the house.'",
      },
      {
        type: "quiz",
        question: "Which sentence has a noun?",
        options: [
          "She runs fast",
          "The book is red",
          "They sleep well",
          "He is tall",
        ],
        correct: 1,
        explanation:
          "'book' is a noun in 'The book is red.' — it names a thing!",
      },
      { type: "result" },
    ],
  },
  {
    id: "en_c2_02",
    subjectId: "english",
    grade: "Class 2",
    title: "Action Words: Verbs",
    duration: "15 min",
    xpReward: 60,
    coinReward: 15,
    type: "game",
    difficulty: "easy",
    status: "available",
    slides: [
      {
        type: "content",
        title: "What is a Verb?",
        content:
          "A VERB is an action word.\nIt tells us what someone or something DOES.\n\n💪 Action verbs:\nrun • jump • eat • sleep • read\nwrite • swim • sing • dance • play\n\nExamples in sentences:\n🏃 The boy RUNS fast.\n📚 Sara READS a book.\n🐕 The dog EATS food.\n\n💡 Tip: Ask 'what is happening?' to find the verb!",
      },
      {
        type: "content",
        title: "Verb Tenses",
        content:
          "Verbs change to show WHEN something happens:\n\n⏮️ PAST (already happened):\nI played. She ran. He ate.\n\n▶️ PRESENT (happening now):\nI play. She runs. He eats.\n\n⏭️ FUTURE (will happen):\nI will play. She will run. He will eat.\n\nChanging the tense changes the meaning! 🕐",
      },
      {
        type: "quiz",
        question: "Which word is a VERB (action word)?",
        options: ["Table", "Jump", "Blue", "Big"],
        correct: 1,
        explanation: "'Jump' is a verb — it shows an action! You can jump!",
      },
      {
        type: "quiz",
        question: "Find the verb: 'The bird sings a song.'",
        options: ["bird", "The", "sings", "song"],
        correct: 2,
        explanation:
          "'Sings' is the verb — it tells us what the bird is DOING!",
      },
      {
        type: "quiz",
        question: "Change to PAST tense: 'She PLAYS cricket.'",
        options: [
          "She playing cricket",
          "She play cricket",
          "She played cricket",
          "She will play cricket",
        ],
        correct: 2,
        explanation:
          "'Played' is the past tense of 'play'. She PLAYED cricket (yesterday, for example).",
      },
      {
        type: "quiz",
        question: "Which is the FUTURE tense of 'eat'?",
        options: ["eats", "ate", "eating", "will eat"],
        correct: 3,
        explanation:
          "'Will eat' is future tense — it means something that WILL happen later!",
      },
      { type: "result" },
    ],
  },

  // --- Class 3 ---
  {
    id: "en_c3_01",
    subjectId: "english",
    grade: "Class 3",
    title: "Adjectives — Describing Words",
    duration: "16 min",
    xpReward: 65,
    coinReward: 16,
    type: "interactive",
    difficulty: "medium",
    status: "available",
    slides: [
      {
        type: "content",
        title: "What is an Adjective?",
        content:
          "An ADJECTIVE describes a noun. It tells us:\n\n🔢 How many: three cats, many birds\n📏 What size: big dog, small ant\n🎨 What colour: red rose, blue sky\n😊 What kind: happy child, tall tree, sweet mango\n\nAdjectives make our sentences more interesting and clear!\n\nBasic: 'The cat sat on a mat.'\nBetter: 'The fluffy white cat sat on a soft mat.'",
      },
      {
        type: "content",
        title: "Degrees of Adjectives",
        content:
          "Adjectives have 3 degrees of comparison:\n\n1️⃣ POSITIVE (describing one thing):\n   Ali is tall.\n\n2️⃣ COMPARATIVE (comparing two):\n   Ali is taller than Umar.\n\n3️⃣ SUPERLATIVE (the most among all):\n   Ali is the tallest in the class.\n\n📌 Pattern: tall → taller → tallest\n📌 good → better → best (irregular!)\n📌 bad → worse → worst (irregular!)",
      },
      {
        type: "quiz",
        question: "Which word is an ADJECTIVE?",
        options: ["quickly", "beautiful", "run", "school"],
        correct: 1,
        explanation:
          "'Beautiful' is an adjective — it describes how something looks or feels!",
      },
      {
        type: "quiz",
        question: "Find the adjective: 'She wore a red dress.'",
        options: ["wore", "She", "red", "dress"],
        correct: 2,
        explanation:
          "'Red' is the adjective — it describes the colour of the dress!",
      },
      {
        type: "quiz",
        question: "Comparative form of 'big' is:",
        options: ["biggest", "more big", "bigger", "most big"],
        correct: 2,
        explanation:
          "'Bigger' is the comparative form. 'An elephant is bigger than a cat.'",
      },
      {
        type: "quiz",
        question: "Superlative form of 'good' is:",
        options: ["gooder", "more good", "better", "best"],
        correct: 3,
        explanation:
          "'Best' is the superlative of 'good'. It's an irregular adjective!",
      },
      { type: "result" },
    ],
  },
  {
    id: "en_c3_02",
    subjectId: "english",
    grade: "Class 3",
    title: "Punctuation Marks",
    duration: "18 min",
    xpReward: 70,
    coinReward: 18,
    type: "quiz",
    difficulty: "medium",
    status: "available",
    slides: [
      {
        type: "content",
        title: "Important Punctuation",
        content:
          'Punctuation marks help us read with the right meaning!\n\n. Full Stop — ends a statement.\n? Question Mark — ends a question?\n! Exclamation Mark — shows strong feeling!\n, Comma — pauses in a sentence,\n" " Inverted Commas — shows speech\n\nExamples:\n📌 Ali is a student.\n📌 Where are you going?\n📌 What a beautiful day!\n📌 I like apples, mangoes, and bananas.',
      },
      {
        type: "content",
        title: "Capital Letters — When to Use",
        content:
          "Use a CAPITAL LETTER:\n\n1️⃣ At the start of every sentence\n   The sun rises in the east.\n\n2️⃣ For the word 'I'\n   She and I are friends.\n\n3️⃣ For proper nouns (names)\n   Ali lives in Karachi, Pakistan.\n\n4️⃣ For days and months\n   Monday, January, Eid\n\n5️⃣ For titles\n   Mr. Ahmed, Dr. Fatima",
      },
      {
        type: "quiz",
        question: "Which punctuation ends a question?",
        options: [
          "Full stop (.)",
          "Exclamation (!)",
          "Question mark (?)",
          "Comma (,)",
        ],
        correct: 2,
        explanation:
          "A question mark (?) always ends a question. 'What is your name?'",
      },
      {
        type: "quiz",
        question: "Which sentence needs an EXCLAMATION mark?",
        options: [
          "The sky is blue",
          "What is your name",
          "How wonderful that is",
          "She went home",
        ],
        correct: 2,
        explanation:
          "'How wonderful that is!' shows strong excitement — needs an exclamation mark!",
      },
      {
        type: "quiz",
        question: "When do we use a COMMA?",
        options: [
          "To end a sentence",
          "To ask a question",
          "To separate items in a list",
          "To show strong feeling",
        ],
        correct: 2,
        explanation:
          "Commas separate items in a list: 'I need a pen, a ruler, and a book.'",
      },
      {
        type: "quiz",
        question: "Which word needs a capital letter?",
        options: ["monday", "big", "red", "fast"],
        correct: 0,
        explanation:
          "Days of the week like 'Monday' are always written with a capital M!",
      },
      { type: "result" },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  //  MATHEMATICS LESSONS
  // ══════════════════════════════════════════════════════════════════

  // --- Class 1 ---
  {
    id: "ma_c1_01",
    subjectId: "math",
    grade: "Class 1",
    title: "Counting 1 to 20",
    duration: "8 min",
    xpReward: 35,
    coinReward: 9,
    type: "game",
    difficulty: "easy",
    status: "available",
    slides: [
      {
        type: "content",
        title: "Numbers 1–10",
        content:
          "Let's count together! 🎉\n\n1️⃣ one    2️⃣ two    3️⃣ three\n4️⃣ four   5️⃣ five   6️⃣ six\n7️⃣ seven  8️⃣ eight  9️⃣ nine  🔟 ten\n\n💡 Remember:\n• 1, 3, 5, 7, 9 are ODD numbers (can't be split evenly)\n• 2, 4, 6, 8, 10 are EVEN numbers (can be split evenly)",
      },
      {
        type: "content",
        title: "Numbers 11–20",
        content:
          "Can you count to 20?\n\n11 — eleven\n12 — twelve\n13 — thirteen\n14 — fourteen\n15 — fifteen\n16 — sixteen\n17 — seventeen\n18 — eighteen\n19 — nineteen\n20 — twenty\n\n🌟 Fun fact: 11 and 12 have special names — they don't follow the 'teen' pattern!",
      },
      {
        type: "quiz",
        question: "What number comes AFTER 7?",
        options: ["5", "6", "8", "9"],
        correct: 2,
        explanation: "7, 8, 9... 8 comes right after 7!",
      },
      {
        type: "quiz",
        question: "Count the stars: ⭐⭐⭐⭐⭐ How many?",
        options: ["3", "4", "5", "6"],
        correct: 2,
        explanation: "Count carefully: 1, 2, 3, 4, 5 — there are five stars!",
      },
      {
        type: "quiz",
        question: "Which number is EVEN?",
        options: ["7", "9", "11", "12"],
        correct: 3,
        explanation: "12 is even! Even numbers: 2, 4, 6, 8, 10, 12...",
      },
      {
        type: "quiz",
        question: "What number comes BEFORE 15?",
        options: ["13", "14", "16", "12"],
        correct: 1,
        explanation: "13, 14, 15 — 14 comes before 15!",
      },
      { type: "result" },
    ],
  },
  {
    id: "ma_c1_02",
    subjectId: "math",
    grade: "Class 1",
    title: "Addition Fun! ➕",
    duration: "12 min",
    xpReward: 50,
    coinReward: 13,
    type: "game",
    difficulty: "easy",
    status: "available",
    slides: [
      {
        type: "content",
        title: "What is Addition?",
        content:
          "Addition means ADDING things together to find the total!\n\nThe symbol for addition is PLUS (+)\n\n🍎🍎 + 🍎🍎🍎 = 🍎🍎🍎🍎🍎\n  2   +   3   = 5\n\n📌 Key words that mean 'add':\n• plus, and, total, sum, altogether, more\n\n💡 Tip: Always start counting from the BIGGER number!",
      },
      {
        type: "content",
        title: "Addition Table (1–5)",
        content:
          "Let's practise adding small numbers:\n\n1 + 1 = 2   🌟\n2 + 1 = 3   🌟\n2 + 2 = 4   🌟\n3 + 2 = 5   🌟\n4 + 1 = 5   🌟\n3 + 3 = 6   🌟\n4 + 2 = 6   🌟\n5 + 2 = 7   🌟\n4 + 4 = 8   🌟\n5 + 5 = 10  🌟\n\nPractise these every day until you know them by heart!",
      },
      {
        type: "quiz",
        question: "What is 3 + 4?",
        options: ["5", "6", "7", "8"],
        correct: 2,
        explanation: "3 + 4 = 7. Count on: 3, 4, 5, 6, 7 — that's seven!",
      },
      {
        type: "quiz",
        question:
          "Ali has 5 apples. Sara gives him 3 more. How many does he have?",
        options: ["7", "8", "9", "6"],
        correct: 1,
        explanation: "5 + 3 = 8. Ali now has 8 apples! 🍎",
      },
      {
        type: "quiz",
        question: "What is 6 + 6?",
        options: ["10", "11", "12", "13"],
        correct: 2,
        explanation:
          "6 + 6 = 12. This is called a doubles fact — very useful to remember!",
      },
      {
        type: "quiz",
        question: "Fill in: 4 + ___ = 9",
        options: ["4", "5", "6", "3"],
        correct: 1,
        explanation:
          "4 + 5 = 9. Count up from 4: ...5, 6, 7, 8, 9 — that's 5 steps!",
      },
      { type: "result" },
    ],
  },
  {
    id: "ma_c1_03",
    subjectId: "math",
    grade: "Class 1",
    title: "Subtraction Stories ➖",
    duration: "12 min",
    xpReward: 50,
    coinReward: 13,
    type: "animated",
    difficulty: "easy",
    status: "available",
    slides: [
      {
        type: "content",
        title: "What is Subtraction?",
        content:
          "Subtraction means TAKING AWAY!\n\nThe symbol is MINUS (-)\n\n🍌🍌🍌🍌🍌\n   5 - 2 = 3\n(Start with 5, take away 2, 3 remain)\n\n📌 Key words for subtraction:\n• minus, take away, less, fewer, remain, left, difference\n\n💡 Think of it as: 'If I eat 2 of my 5 bananas, how many are left?'",
      },
      {
        type: "content",
        title: "Subtraction on a Number Line",
        content:
          "Use a number line to subtract!\n\nTo find 8 - 3:\n👉 Start at 8\n👈 Jump BACK 3 steps\n✅ You land on 5!\n\n0—1—2—3—4—5—6—7—8—9—10\n               ←←← ^\n(jump back 3)   5   8\n\nSo 8 - 3 = 5\n\nPractise: 10 - 4 = ?\nStart at 10, jump back 4... you land on 6! ✅",
      },
      {
        type: "quiz",
        question: "What is 9 - 4?",
        options: ["4", "5", "6", "7"],
        correct: 1,
        explanation:
          "9 - 4 = 5. Jump back 4 from 9: 8, 7, 6, 5 — you land on 5!",
      },
      {
        type: "quiz",
        question: "There are 10 birds on a tree. 6 fly away. How many remain?",
        options: ["3", "4", "5", "6"],
        correct: 1,
        explanation: "10 - 6 = 4. Four birds remain on the tree! 🐦",
      },
      {
        type: "quiz",
        question: "What is 7 - 7?",
        options: ["1", "0", "7", "14"],
        correct: 1,
        explanation: "Any number minus ITSELF equals 0. 7 - 7 = 0!",
      },
      {
        type: "quiz",
        question: "Fill in: 10 - ___ = 6",
        options: ["3", "4", "5", "6"],
        correct: 1,
        explanation:
          "10 - 4 = 6. Count back from 10: 9, 8, 7, 6 — that's 4 steps!",
      },
      { type: "result" },
    ],
  },

  // --- Class 2 ---
  {
    id: "ma_c2_01",
    subjectId: "math",
    grade: "Class 2",
    title: "Shapes & Geometry 🔷",
    duration: "12 min",
    xpReward: 50,
    coinReward: 13,
    type: "interactive",
    difficulty: "easy",
    status: "available",
    slides: [
      {
        type: "content",
        title: "2D Flat Shapes",
        content:
          "2D shapes are FLAT — they have length and width.\n\n🔴 Circle — 0 sides, 0 corners, perfectly round\n🟦 Square — 4 equal sides, 4 corners, all right angles\n🟩 Rectangle — 4 sides (opposite sides equal), 4 corners\n🔺 Triangle — 3 sides, 3 corners\n⬠ Pentagon — 5 sides, 5 corners\n⬡ Hexagon — 6 sides, 6 corners\n\nA circle has no sides AND no corners!",
      },
      {
        type: "content",
        title: "3D Solid Shapes",
        content:
          "3D shapes take up SPACE — they have length, width, and height.\n\n📦 Cube — 6 equal square faces (dice)\n🧱 Cuboid — 6 rectangular faces (box)\n⚽ Sphere — perfectly round (ball)\n🔰 Cylinder — 2 circular faces + 1 curved surface (tin can)\n🍦 Cone — 1 circular base + point on top (ice cream)\n🔷 Pyramid — square base + 4 triangular sides",
      },
      {
        type: "quiz",
        question: "How many sides does a TRIANGLE have?",
        options: ["2", "3", "4", "5"],
        correct: 1,
        explanation: "A triangle has 3 sides and 3 corners. 'Tri' means 3!",
      },
      {
        type: "quiz",
        question: "Which shape has NO corners?",
        options: ["Square", "Triangle", "Rectangle", "Circle"],
        correct: 3,
        explanation:
          "A circle is completely round — it has no corners and no straight sides!",
      },
      {
        type: "quiz",
        question: "A CUBE has how many faces?",
        options: ["4", "5", "6", "8"],
        correct: 2,
        explanation:
          "A cube has 6 faces — top, bottom, front, back, left, right!",
      },
      {
        type: "quiz",
        question: "Which 3D shape looks like a ball?",
        options: ["Cube", "Cylinder", "Sphere", "Cone"],
        correct: 2,
        explanation: "A Sphere is perfectly round like a ball or orange! ⚽",
      },
      { type: "result" },
    ],
  },
  {
    id: "ma_c2_02",
    subjectId: "math",
    grade: "Class 2",
    title: "Multiplication Basics ✖️",
    duration: "16 min",
    xpReward: 65,
    coinReward: 17,
    type: "game",
    difficulty: "medium",
    status: "available",
    slides: [
      {
        type: "content",
        title: "What is Multiplication?",
        content:
          "Multiplication is FAST ADDITION! 🚀\n\nInstead of 3 + 3 + 3 = 9...\nWe write 3 × 3 = 9\n\n3 groups of 3 apples = 9 apples total\n\n📌 The × symbol means 'times' or 'multiplied by'\n📌 The answer is called the PRODUCT\n📌 The numbers being multiplied are FACTORS\n\nExample: 4 × 5 = 20\n(4 groups of 5 OR 5 groups of 4 — same answer!)",
      },
      {
        type: "content",
        title: "Times Tables 2 & 5",
        content:
          "2 TIMES TABLE:\n2×1=2   2×2=4   2×3=6\n2×4=8   2×5=10  2×6=12\n2×7=14  2×8=16  2×9=18  2×10=20\n💡 Pattern: always even numbers!\n\n5 TIMES TABLE:\n5×1=5   5×2=10  5×3=15\n5×4=20  5×5=25  5×6=30\n5×7=35  5×8=40  5×9=45  5×10=50\n💡 Pattern: always ends in 0 or 5!",
      },
      {
        type: "quiz",
        question: "What is 3 × 4?",
        options: ["7", "10", "12", "14"],
        correct: 2,
        explanation: "3 × 4 = 12. Think: 3 groups of 4 = 4 + 4 + 4 = 12!",
      },
      {
        type: "quiz",
        question: "What is 5 × 6?",
        options: ["25", "30", "35", "11"],
        correct: 1,
        explanation: "5 × 6 = 30. In the 5 times table, 5×6 always gives 30!",
      },
      {
        type: "quiz",
        question:
          "Sara has 4 bags. Each bag has 3 books. How many books in total?",
        options: ["7", "10", "12", "15"],
        correct: 2,
        explanation: "4 × 3 = 12. Sara has 12 books in total! 📚",
      },
      {
        type: "quiz",
        question: "What is 2 × 9?",
        options: ["16", "17", "18", "19"],
        correct: 2,
        explanation:
          "2 × 9 = 18. From the 2 times table: 2, 4, 6, 8, 10, 12, 14, 16, 18!",
      },
      { type: "result" },
    ],
  },

  // --- Class 3 ---
  {
    id: "ma_c3_01",
    subjectId: "math",
    grade: "Class 3",
    title: "Fractions Made Easy 🍕",
    duration: "20 min",
    xpReward: 75,
    coinReward: 20,
    type: "animated",
    difficulty: "medium",
    status: "available",
    slides: [
      {
        type: "content",
        title: "What is a Fraction?",
        content:
          "A FRACTION shows a PART of a whole.\n\nImagine cutting a pizza into equal slices:\n🍕 If you cut it into 4 equal slices...\n   Each slice = 1/4 (one quarter)\n\nA fraction has two parts:\n📌 NUMERATOR (top) — how many parts you HAVE\n📌 DENOMINATOR (bottom) — total number of EQUAL parts\n\n   1  ← numerator\n  ─── ← fraction bar\n   4  ← denominator\n\nSo 1/4 means 'one out of four equal parts'!",
      },
      {
        type: "content",
        title: "Common Fractions",
        content:
          "The most common fractions to know:\n\n1/2 — One half (cut in 2 equal parts)\n1/3 — One third (cut in 3 equal parts)\n1/4 — One quarter (cut in 4 equal parts)\n3/4 — Three quarters (3 out of 4 parts)\n\n🍎 Half an apple:\n[ ●● | ●● ] 1/2 = 2 out of 4 parts\n\n🎯 Key fact:\n1/2 > 1/3 > 1/4\nThe MORE parts you divide into, the SMALLER each part gets!",
      },
      {
        type: "quiz",
        question: "What fraction is SHADED? [■■□□] (2 out of 4 squares shaded)",
        options: ["1/4", "1/2", "3/4", "2/3"],
        correct: 1,
        explanation:
          "2 out of 4 = 2/4 = 1/2. Two shaded squares is one half of the total!",
      },
      {
        type: "quiz",
        question:
          "A pizza is cut into 8 equal slices. You eat 3. What fraction did you eat?",
        options: ["3/5", "5/8", "3/8", "8/3"],
        correct: 2,
        explanation:
          "You ate 3 out of 8 slices = 3/8. Numerator 3, denominator 8!",
      },
      {
        type: "quiz",
        question: "Which fraction is BIGGER?",
        options: ["1/4", "1/3", "1/2", "1/6"],
        correct: 2,
        explanation:
          "1/2 is the biggest! When the denominator is smaller, the fraction is larger.",
      },
      {
        type: "quiz",
        question: "What is the DENOMINATOR in the fraction 5/8?",
        options: ["5", "8", "3", "13"],
        correct: 1,
        explanation:
          "The denominator is the BOTTOM number — 8. It shows the total number of equal parts!",
      },
      { type: "result" },
    ],
  },
  {
    id: "ma_c3_02",
    subjectId: "math",
    grade: "Class 3",
    title: "Telling Time 🕐",
    duration: "18 min",
    xpReward: 70,
    coinReward: 18,
    type: "interactive",
    difficulty: "medium",
    status: "available",
    slides: [
      {
        type: "content",
        title: "Parts of a Clock",
        content:
          "A clock shows us the TIME!\n\n🕐 A clock has:\n• 12 NUMBERS (1 to 12 around the face)\n• SHORT HAND (hour hand) — moves slowly\n• LONG HAND (minute hand) — moves faster\n• Sometimes a SECOND HAND (very thin)\n\n📌 The short hand shows HOURS\n📌 The long hand shows MINUTES\n\nWhen the long hand points to 12 → it is 'O'CLOCK'\nExample: Short on 3, Long on 12 → 3 o'clock = 3:00",
      },
      {
        type: "content",
        title: "Half Past & Quarter Past",
        content:
          "Special times to know:\n\n🕐 O'CLOCK (minute hand on 12)\n   Example: 5:00 = five o'clock\n\n🕧 HALF PAST (minute hand on 6 — 30 minutes)\n   Example: 5:30 = half past five\n\n🕐 QUARTER PAST (minute hand on 3 — 15 minutes)\n   Example: 5:15 = quarter past five\n\n🕤 QUARTER TO (minute hand on 9 — 45 minutes)\n   Example: 5:45 = quarter to six\n\n💡 There are 60 minutes in one hour!",
      },
      {
        type: "quiz",
        question:
          "The SHORT hand points to HOURS. What does the LONG hand show?",
        options: ["Seconds", "Hours", "Minutes", "Days"],
        correct: 2,
        explanation:
          "The long hand (minute hand) shows MINUTES. It goes all the way around in 60 minutes!",
      },
      {
        type: "quiz",
        question: "It is 3:00. Where is the minute hand?",
        options: ["On 3", "On 6", "On 9", "On 12"],
        correct: 3,
        explanation: "At any o'clock time, the minute hand points to 12!",
      },
      {
        type: "quiz",
        question: "What time is 'half past 7'?",
        options: ["7:00", "7:15", "7:30", "7:45"],
        correct: 2,
        explanation:
          "Half past 7 = 7:30. The minute hand is on 6 (30 minutes past).",
      },
      {
        type: "quiz",
        question: "How many minutes in ONE hour?",
        options: ["30", "45", "60", "100"],
        correct: 2,
        explanation:
          "There are 60 minutes in 1 hour. The minute hand goes all the way round!",
      },
      { type: "result" },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  //  SCIENCE LESSONS
  // ══════════════════════════════════════════════════════════════════

  // --- Class 1 ---
  {
    id: "sc_c1_01",
    subjectId: "science",
    grade: "Class 1",
    title: "Living & Non-Living Things",
    duration: "10 min",
    xpReward: 40,
    coinReward: 10,
    type: "animated",
    difficulty: "easy",
    status: "available",
    slides: [
      {
        type: "content",
        title: "What are Living Things?",
        content:
          "LIVING things are ALIVE! They:\n\n✅ Grow and change\n✅ Need food, water, air\n✅ Breathe (respire)\n✅ Move (in some way)\n✅ Reproduce (have babies)\n✅ Feel and respond\n\n🌿 Examples:\nHumans 👤 Animals 🐕 Plants 🌻\nBacteria, Fungi, Birds, Fish...\n\nAll these things are ALIVE!",
      },
      {
        type: "content",
        title: "Non-Living Things",
        content:
          "NON-LIVING things are NOT alive. They:\n\n❌ Do NOT grow\n❌ Do NOT need food\n❌ Do NOT breathe\n❌ Do NOT reproduce\n\n🪨 Examples:\nStone, Water, Air, Car, Book\nChair, Table, Pen, Cloud\n\n💡 Tricky ones!\n🔥 Fire seems alive but is NOT living\n⚗️ Crystals GROW but are NOT living\n💧 Water is essential for life but is NOT living itself!",
      },
      {
        type: "quiz",
        question: "Which of these is a LIVING thing?",
        options: ["A stone", "A table", "A tree", "A cloud"],
        correct: 2,
        explanation:
          "A TREE is living — it grows, needs water, makes oxygen, and reproduces!",
      },
      {
        type: "quiz",
        question: "Which feature do ALL living things share?",
        options: [
          "They can run",
          "They need food and water",
          "They are green",
          "They live in water",
        ],
        correct: 1,
        explanation:
          "All living things need food and water to survive and grow!",
      },
      {
        type: "quiz",
        question: "A rock is a non-living thing because it does NOT:",
        options: [
          "Have colour",
          "Grow or reproduce",
          "Stay still",
          "Occupy space",
        ],
        correct: 1,
        explanation:
          "Rocks don't grow, reproduce, or breathe — so they are non-living!",
      },
      {
        type: "quiz",
        question: "Which of these CAN reproduce (have offspring)?",
        options: ["A chair", "A stone", "A car", "A fish"],
        correct: 3,
        explanation:
          "A fish is living and can reproduce (lay eggs)! Chairs, stones, and cars cannot!",
      },
      { type: "result" },
    ],
  },
  {
    id: "sc_c1_02",
    subjectId: "science",
    grade: "Class 1",
    title: "Our Five Senses",
    duration: "12 min",
    xpReward: 45,
    coinReward: 12,
    type: "interactive",
    difficulty: "easy",
    status: "available",
    slides: [
      {
        type: "content",
        title: "The Five Senses",
        content:
          "We use our FIVE SENSES to learn about the world!\n\n👁️ SIGHT — Eyes (see colour, shape, size)\n👂 HEARING — Ears (hear sounds, music, speech)\n👃 SMELL — Nose (smell flowers, food, smoke)\n👅 TASTE — Tongue (taste sweet, sour, salty, bitter)\n🖐️ TOUCH — Skin (feel hot, cold, rough, smooth)\n\n🌟 Together, our senses help us:\n• Stay safe (smell smoke)\n• Enjoy life (taste food)\n• Learn about everything!",
      },
      {
        type: "content",
        title: "Protecting Our Senses",
        content:
          "We must PROTECT our precious senses!\n\n👁️ Eyes — Don't look at the sun directly; don't rub; wear glasses if needed\n👂 Ears — Avoid very loud sounds; clean gently; don't put objects inside\n👃 Nose — Breathe clean air; blow gently\n👅 Tongue — Don't eat very hot food; don't taste unknown substances\n🖐️ Skin — Use sunscreen; wash hands; avoid sharp objects\n\n💧 Keep all sense organs CLEAN!",
      },
      {
        type: "quiz",
        question: "Which sense organ do we use to SEE?",
        options: ["Nose", "Tongue", "Eyes", "Ears"],
        correct: 2,
        explanation:
          "We use our EYES to see colours, shapes, and sizes. They are amazing!",
      },
      {
        type: "quiz",
        question: "What sense helps you know if your food is sweet or salty?",
        options: ["Sight", "Taste", "Smell", "Touch"],
        correct: 1,
        explanation:
          "Our sense of TASTE (using the tongue) tells us if food is sweet, sour, salty, or bitter!",
      },
      {
        type: "quiz",
        question: "Sara smells something burning. Which sense is she using?",
        options: ["Touch", "Sight", "Smell", "Taste"],
        correct: 2,
        explanation:
          "Sara is using her sense of SMELL through her nose. It's also helping her stay safe!",
      },
      {
        type: "quiz",
        question: "How many senses do humans have?",
        options: ["3", "4", "5", "6"],
        correct: 2,
        explanation:
          "Humans have 5 basic senses: sight, hearing, smell, taste, and touch!",
      },
      { type: "result" },
    ],
  },

  // --- Class 2 ---
  {
    id: "sc_c2_01",
    subjectId: "science",
    grade: "Class 2",
    title: "Plants & Photosynthesis",
    duration: "15 min",
    xpReward: 55,
    coinReward: 14,
    type: "animated",
    difficulty: "easy",
    status: "available",
    slides: [
      {
        type: "content",
        title: "Parts of a Plant",
        content:
          "A plant has several important parts:\n\n🌱 ROOTS — absorb water and minerals from soil; anchor the plant\n🪵 STEM — carries water and food; supports the plant; stands it upright\n🍃 LEAVES — make food using sunlight (photosynthesis); breathe through tiny holes\n🌸 FLOWER — attracts bees; produces seeds for reproduction\n🍎 FRUIT — protects seeds; is eaten by animals who spread seeds\n🌰 SEED — grows into a new plant",
      },
      {
        type: "content",
        title: "How Plants Make Food",
        content:
          "Plants make their own food through PHOTOSYNTHESIS!\n\n☀️ + 💧 + 🌬️ = 🍃 food + O₂\n\nSunlight + Water + Carbon dioxide (CO₂)\n    ↓\nGlucose (sugar food) + Oxygen\n\n📌 This entire process happens in the GREEN LEAVES!\n📌 The green colour is from CHLOROPHYLL\n📌 Plants release OXYGEN — the air we breathe! 🙏\n\nWithout plants — no oxygen — no life on Earth!",
      },
      {
        type: "quiz",
        question: "Which part of the plant absorbs water from the soil?",
        options: ["Stem", "Leaves", "Roots", "Flower"],
        correct: 2,
        explanation:
          "ROOTS absorb water and minerals from the soil. They also anchor the plant!",
      },
      {
        type: "quiz",
        question: "Where does photosynthesis take place?",
        options: ["Roots", "Stem", "Flower", "Leaves"],
        correct: 3,
        explanation:
          "Photosynthesis happens in the LEAVES, which contain the green chlorophyll!",
      },
      {
        type: "quiz",
        question:
          "What do plants release during photosynthesis that we breathe?",
        options: ["Carbon dioxide", "Nitrogen", "Oxygen", "Steam"],
        correct: 2,
        explanation:
          "Plants release OXYGEN during photosynthesis. We need this oxygen to live!",
      },
      {
        type: "quiz",
        question:
          "What is the green substance in leaves that captures sunlight?",
        options: ["Glucose", "Chlorophyll", "Carbon dioxide", "Sap"],
        correct: 1,
        explanation:
          "CHLOROPHYLL is the green pigment in leaves that captures sunlight for photosynthesis!",
      },
      { type: "result" },
    ],
  },

  // --- Class 3 ---
  {
    id: "sc_c3_01",
    subjectId: "science",
    grade: "Class 3",
    title: "The Water Cycle 💧",
    duration: "14 min",
    xpReward: 65,
    coinReward: 17,
    type: "animated",
    difficulty: "medium",
    status: "available",
    slides: [
      {
        type: "content",
        title: "What is the Water Cycle?",
        content:
          "The WATER CYCLE is the continuous journey of water on Earth!\n\nWater is NEVER created or destroyed — it just changes form and moves around. This is called a CYCLE because it goes round and round forever!\n\n4 Main Stages:\n1️⃣ EVAPORATION — water heats up and rises\n2️⃣ CONDENSATION — water vapour cools into clouds\n3️⃣ PRECIPITATION — rain, snow, or hail falls\n4️⃣ COLLECTION — water gathers in rivers, lakes, sea",
      },
      {
        type: "content",
        title: "Stages in Detail",
        content:
          "1️⃣ EVAPORATION ☀️\nThe sun heats oceans and lakes. Water turns into invisible water vapour and rises UP.\n\n2️⃣ CONDENSATION ☁️\nAs water vapour rises, it cools and turns into tiny water droplets forming CLOUDS.\n\n3️⃣ PRECIPITATION 🌧️\nWhen clouds get heavy enough, water falls as rain, snow, hail, or sleet.\n\n4️⃣ COLLECTION 🌊\nWater flows into rivers, lakes, and oceans — and the cycle BEGINS AGAIN! ♻️\n\n💡 The water you drink today may be millions of years old!",
      },
      {
        type: "quiz",
        question: "What happens to water when the sun heats it?",
        options: [
          "It freezes",
          "It evaporates into vapour",
          "It becomes clouds directly",
          "It disappears",
        ],
        correct: 1,
        explanation:
          "The sun causes EVAPORATION — water turns into water vapour and rises into the atmosphere!",
      },
      {
        type: "quiz",
        question: "CONDENSATION forms when water vapour:",
        options: [
          "Gets warmer",
          "Cools down and becomes water droplets",
          "Falls as rain",
          "Freezes into ice",
        ],
        correct: 1,
        explanation:
          "CONDENSATION happens when warm water vapour cools and turns back into tiny liquid water droplets, forming clouds!",
      },
      {
        type: "quiz",
        question: "What is PRECIPITATION?",
        options: [
          "Water vapour rising up",
          "Cloud formation",
          "Rain, snow, or hail falling",
          "Sea water absorbing heat",
        ],
        correct: 2,
        explanation:
          "PRECIPITATION is any form of water falling from clouds — rain, snow, sleet or hail!",
      },
      {
        type: "quiz",
        question: "Which stage comes FIRST in the water cycle?",
        options: ["Precipitation", "Collection", "Condensation", "Evaporation"],
        correct: 3,
        explanation:
          "EVAPORATION is the start — the sun heats water, turning it to vapour that rises up!",
      },
      { type: "result" },
    ],
  },
  {
    id: "sc_c3_02",
    subjectId: "science",
    grade: "Class 3",
    title: "The Solar System 🪐",
    duration: "18 min",
    xpReward: 80,
    coinReward: 20,
    type: "interactive",
    difficulty: "medium",
    status: "available",
    slides: [
      {
        type: "content",
        title: "Our Solar System",
        content:
          "The SOLAR SYSTEM is our Sun and everything that orbits (goes around) it!\n\n☀️ SUN — the star at the centre; gives us light and heat\n🌍 EARTH — the 3rd planet; our home; only planet with known life\n🌙 MOON — Earth's natural satellite; not a planet\n\nOrder of the 8 planets from the Sun:\n1⃣ Mercury    2⃣ Venus\n3⃣ Earth 🌍  4⃣ Mars\n5⃣ Jupiter    6⃣ Saturn 💫\n7⃣ Uranus     8⃣ Neptune\n\nMemory trick: My Very Educated Mother Just Served Us Nachos!",
      },
      {
        type: "content",
        title: "Interesting Planet Facts",
        content:
          "☀️ SUN: So large that 1 MILLION Earths could fit inside it!\n\nMERCURY 🪨 — smallest, closest to Sun, very hot in day, freezing at night\n\nVENUS 🔥 — hottest planet (thick cloud atmosphere traps heat)\n\nMARS 🔴 — Red Planet; has the tallest volcano in the solar system\n\nJUPITER 🌀 — largest; has a huge storm (Great Red Spot) for 350+ years!\n\nSATURN 💫 — famous for beautiful RINGS made of ice and rock\n\nURANUS 🔵 — spins on its SIDE!\n\nNEPTUNE 🌊 — farthest; strongest winds in the solar system!",
      },
      {
        type: "quiz",
        question: "Which planet is Earth in order from the Sun?",
        options: ["1st", "2nd", "3rd", "4th"],
        correct: 2,
        explanation:
          "Earth is the 3rd planet from the Sun, between Venus and Mars!",
      },
      {
        type: "quiz",
        question: "Which planet is known as the RED planet?",
        options: ["Venus", "Jupiter", "Mars", "Saturn"],
        correct: 2,
        explanation:
          "Mars is called the Red Planet because its surface is covered in red iron oxide (rust)!",
      },
      {
        type: "quiz",
        question: "Which planet has beautiful RINGS around it?",
        options: ["Jupiter", "Saturn", "Neptune", "Mars"],
        correct: 1,
        explanation:
          "SATURN is famous for its stunning rings made of ice and rocks!",
      },
      {
        type: "quiz",
        question: "How many planets are in our solar system?",
        options: ["7", "8", "9", "10"],
        correct: 1,
        explanation:
          "There are 8 planets: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune. (Pluto is a dwarf planet!)",
      },
      { type: "result" },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  //  ISLAMIAT LESSONS
  // ══════════════════════════════════════════════════════════════════

  {
    id: "is_c1_01",
    subjectId: "islamiat",
    grade: "Class 1",
    title: "The Five Pillars of Islam",
    duration: "14 min",
    xpReward: 50,
    coinReward: 13,
    type: "animated",
    difficulty: "easy",
    status: "available",
    slides: [
      {
        type: "content",
        title: "Pillars of Islam — ارکانِ اسلام",
        content:
          "The FIVE PILLARS are the most important duties of a Muslim:\n\n1️⃣ SHAHADAH — Declaration of Faith\n   'There is no God but Allah, and Muhammad ﷺ is His Messenger'\n\n2️⃣ SALAH — Prayer 5 times a day\n   Fajr, Dhuhr, Asr, Maghrib, Isha\n\n3️⃣ ZAKAH — Charity for the poor\n   Giving 2.5% of savings to those in need\n\n4️⃣ SAWM — Fasting during Ramadan\n   No food or drink from dawn to sunset\n\n5️⃣ HAJJ — Pilgrimage to Makkah\n   Once in a lifetime for those who are able",
      },
      {
        type: "content",
        title: "Salah — Our Daily Prayers",
        content:
          "Muslims pray FIVE TIMES every day:\n\n🌅 FAJR — before sunrise (2 rakats)\n☀️ DHUHR — midday (4 rakats)\n🌤️ ASR — afternoon (4 rakats)\n🌆 MAGHRIB — after sunset (3 rakats)\n🌙 ISHA — night (4 rakats)\n\nWe face the direction of MAKKAH (Qibla) when we pray.\n\nSalah keeps us connected to Allah ﷻ throughout the day.\n\n💡 Wudu (ablution) must be done before Salah!",
      },
      {
        type: "quiz",
        question: "How many pillars does Islam have?",
        options: ["3", "4", "5", "6"],
        correct: 2,
        explanation:
          "Islam has FIVE pillars: Shahadah, Salah, Zakah, Sawm, and Hajj!",
      },
      {
        type: "quiz",
        question: "How many times do Muslims pray every day?",
        options: ["3", "4", "5", "6"],
        correct: 2,
        explanation:
          "Muslims pray FIVE times a day: Fajr, Dhuhr, Asr, Maghrib, and Isha!",
      },
      {
        type: "quiz",
        question: "Which pillar involves fasting during Ramadan?",
        options: ["Salah", "Zakah", "Hajj", "Sawm"],
        correct: 3,
        explanation:
          "SAWM is the pillar of fasting. Muslims fast from dawn to sunset during the holy month of Ramadan!",
      },
      {
        type: "quiz",
        question: "Zakah means:",
        options: [
          "Prayer",
          "Fasting",
          "Giving charity to the poor",
          "Pilgrimage",
        ],
        correct: 2,
        explanation:
          "ZAKAH is giving a portion (2.5%) of one's savings to those in need. It purifies wealth!",
      },
      { type: "result" },
    ],
  },
  {
    id: "is_c2_01",
    subjectId: "islamiat",
    grade: "Class 2",
    title: "Prophet Muhammad ﷺ — His Life",
    duration: "16 min",
    xpReward: 60,
    coinReward: 15,
    type: "story",
    difficulty: "easy",
    status: "available",
    slides: [
      {
        type: "content",
        title: "The Prophet Muhammad ﷺ",
        content:
          "Prophet Muhammad ﷺ is the last and final prophet of Islam.\n\n📌 Born: 570 CE in MAKKAH\n📌 He was known as 'Al-Amin' (The Trustworthy)\n📌 Received first revelation at age 40 in Cave Hira\n📌 Migrated to MADINAH (Hijra) in 622 CE\n📌 Passed away at age 63 in Madinah\n\n🌟 His character was:\n✅ Honest and truthful\n✅ Kind to all — people and animals\n✅ Simple in lifestyle\n✅ Forgiving (even to his enemies)\n\nWe say 'ﷺ' (Sallallahu Alaihi Wasallam) after his name as a blessing.",
      },
      {
        type: "content",
        title: "Important Events in His Life",
        content:
          "Key events from the Prophet's ﷺ life:\n\n📌 Born on 12 Rabi ul Awwal (Eid Milaad-un-Nabi)\n📌 Lost his father before birth, mother at age 6\n📌 Raised by grandfather, then uncle Abu Talib\n📌 Married Khadijah (RA) at age 25 — first Muslim woman\n📌 First Revelation: Iqra (Read!) - age 40\n📌 Night Journey: Isra and Miraj — visited Heavens\n📌 Conquest of Makkah — forgave all enemies\n📌 Last sermon at Hajj — equality of all humans\n\nHis whole life is a guide for us — called SUNNAH!",
      },
      {
        type: "quiz",
        question: "In which city was Prophet Muhammad ﷺ born?",
        options: ["Madinah", "Jerusalem", "Makkah", "Taif"],
        correct: 2,
        explanation:
          "Prophet Muhammad ﷺ was born in MAKKAH in the year 570 CE!",
      },
      {
        type: "quiz",
        question: "What was Prophet Muhammad ﷺ called before prophethood?",
        options: [
          "Al-Ghazali",
          "Al-Amin (The Trustworthy)",
          "Al-Hakim",
          "Al-Farooq",
        ],
        correct: 1,
        explanation:
          "He was called 'AL-AMIN' meaning The Trustworthy — because of his honest character!",
      },
      {
        type: "quiz",
        question: "At what age did he receive the first revelation?",
        options: ["25", "30", "40", "50"],
        correct: 2,
        explanation:
          "At the age of 40, in Cave Hira, Prophet Muhammad ﷺ received the first revelation from Allah through Jibreel (AS).",
      },
      {
        type: "quiz",
        question: "The migration from Makkah to Madinah is called:",
        options: ["Hajj", "Jihad", "Hijra", "Salah"],
        correct: 2,
        explanation:
          "The migration (Hijra) in 622 CE marks the Islamic calendar's beginning!",
      },
      { type: "result" },
    ],
  },
  {
    id: "is_c3_01",
    subjectId: "islamiat",
    grade: "Class 3",
    title: "Islamic Manners — Akhlaq",
    duration: "15 min",
    xpReward: 60,
    coinReward: 15,
    type: "interactive",
    difficulty: "easy",
    status: "available",
    slides: [
      {
        type: "content",
        title: "Islamic Greetings & Manners",
        content:
          "Islam teaches beautiful manners (AKHLAQ)!\n\n🤝 GREETINGS:\nAs-salamu Alaykum (السلام علیکم)\n= 'Peace be upon you'\n\nResponse: Wa alaykum as-Salam\n= 'And peace upon you too'\n\n📌 Other important phrases:\n• Bismillah — Say before starting any task\n• Alhamdulillah — Thanks to Allah (used after sneezing)\n• Inshallah — If Allah wills (for future plans)\n• Mashallah — What Allah has willed (praising something)\n• Astaghfirullah — Asking Allah's forgiveness",
      },
      {
        type: "content",
        title: "Good Islamic Character",
        content:
          "The Prophet ﷺ said: 'The best among you is the one with the best character.'\n\n✅ HONESTY — Always tell the truth\n✅ RESPECT — Respect parents, teachers, elders\n✅ KINDNESS — Be kind to people and animals\n✅ GENEROSITY — Share with others\n✅ PATIENCE — Stay calm in difficulties\n✅ CLEANLINESS — Keep your body, clothes, and surroundings clean\n✅ GRATITUDE — Always thank Allah and people who help you\n\n💡 Islam says: 'Cleanliness is half of faith!' (Hadith)",
      },
      {
        type: "quiz",
        question: "What does 'As-salamu Alaykum' mean?",
        options: [
          "Good morning",
          "Thank you",
          "Peace be upon you",
          "Forgive me",
        ],
        correct: 2,
        explanation:
          "'As-salamu Alaykum' means 'PEACE BE UPON YOU' — the beautiful Islamic greeting!",
      },
      {
        type: "quiz",
        question: "What do we say BEFORE starting any task in Islam?",
        options: ["Alhamdulillah", "Bismillah", "Mashallah", "Inshallah"],
        correct: 1,
        explanation:
          "BISMILLAH (بسم اللہ) means 'In the name of Allah' — we say it before starting any good task!",
      },
      {
        type: "quiz",
        question: "What does 'Alhamdulillah' mean?",
        options: [
          "Allah is great",
          "Peace be upon you",
          "All praise and thanks to Allah",
          "If Allah wills",
        ],
        correct: 2,
        explanation:
          "Alhamdulillah means 'All praise and thanks to Allah' — we say it to show gratitude!",
      },
      {
        type: "quiz",
        question: "According to Hadith, cleanliness is _ of faith.",
        options: ["All", "One quarter", "Half", "One third"],
        correct: 2,
        explanation:
          "The Prophet ﷺ said 'Cleanliness is HALF of faith' — showing how important hygiene is in Islam!",
      },
      { type: "result" },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  //  SOCIAL STUDIES LESSONS
  // ══════════════════════════════════════════════════════════════════

  {
    id: "ss_c1_01",
    subjectId: "social",
    grade: "Class 1",
    title: "My Family",
    duration: "10 min",
    xpReward: 35,
    coinReward: 9,
    type: "story",
    difficulty: "easy",
    status: "available",
    slides: [
      {
        type: "content",
        title: "My Family Members",
        content:
          "A FAMILY is a group of people who love and care for each other!\n\n👴 Dada (Paternal Grandfather)\n👵 Dadi (Paternal Grandmother)\n👴 Nana (Maternal Grandfather)\n👵 Nani (Maternal Grandmother)\n👨 Baba/Abu (Father)\n👩 Ammi/Amma (Mother)\n👦 Bhai (Brother)\n👧 Behen (Sister)\n🧒 'I am a child in my family'\n\nNuclear Family = Parents + Children\nJoint/Extended Family = Also includes grandparents, aunts, uncles, cousins",
      },
      {
        type: "content",
        title: "Family Roles & Responsibilities",
        content:
          "Everyone in a family has a role:\n\n👨 FATHER — provides for the family, protects, guides\n👩 MOTHER — nurtures, cooks, teaches, loves unconditionally\n🧓 GRANDPARENTS — wisdom, stories, love, blessings\n👦👧 SIBLINGS — play together, help each other, learn together\n🧒 CHILDREN — study hard, obey parents, help with chores\n\nIMPORTANT VALUES in a family:\n❤️ Love and respect\n🙏 Honesty\n🤝 Helping each other\n😊 Forgiveness\n\nIn Islam, respecting parents is VERY important!",
      },
      {
        type: "quiz",
        question: "What is a NUCLEAR family?",
        options: [
          "Grandparents only",
          "Parents and children",
          "All relatives together",
          "Brothers and sisters only",
        ],
        correct: 1,
        explanation:
          "A nuclear family consists of PARENTS and their CHILDREN living together!",
      },
      {
        type: "quiz",
        question: "'Dadi' refers to:",
        options: [
          "Maternal grandmother",
          "Maternal grandfather",
          "Paternal grandmother",
          "Father's sister",
        ],
        correct: 2,
        explanation:
          "DADI (دادی) is your father's mother — paternal grandmother!",
      },
      {
        type: "quiz",
        question: "What should children do to show respect for their family?",
        options: [
          "Only play games",
          "Obey parents and help with chores",
          "Stay away from family",
          "Never speak",
        ],
        correct: 1,
        explanation:
          "Children show respect by obeying their parents, helping at home, and studying well!",
      },
      {
        type: "quiz",
        question: "How many parents does a nuclear family have?",
        options: ["1", "2", "3", "4"],
        correct: 1,
        explanation:
          "A nuclear family has 2 parents (mother and father) and their children.",
      },
      { type: "result" },
    ],
  },
  {
    id: "ss_c2_01",
    subjectId: "social",
    grade: "Class 2",
    title: "Our Country Pakistan 🇵🇰",
    duration: "16 min",
    xpReward: 60,
    coinReward: 15,
    type: "interactive",
    difficulty: "easy",
    status: "available",
    slides: [
      {
        type: "content",
        title: "Facts About Pakistan",
        content:
          "PAKISTAN — our beloved home!\n\n📅 Independence: 14 August 1947\n📍 Location: South Asia (bordered by India, Afghanistan, Iran, China)\n🏙️ Capital: Islamabad\n🏙️ Largest City: Karachi\n🌍 Population: Over 220 million people\n🗣️ National Language: Urdu\n🕌 Religion: Islam (96%+)\n💚 National Colour: Green (with white)\n\n🦅 National Animal: Markhor\n🦅 National Bird: Chakor\n🌸 National Flower: Jasmine (Chambeli)\n🌲 National Tree: Deodar Cedar",
      },
      {
        type: "content",
        title: "Provinces of Pakistan",
        content:
          "Pakistan has 4 PROVINCES and 2 territories:\n\n🗺️ Provinces:\n1️⃣ Punjab (largest population) 🌾\n2️⃣ Sindh (Karachi, Mohenjo-daro) 🏙️\n3️⃣ Khyber Pakhtunkhwa (KPK) (mountains) 🏔️\n4️⃣ Balochistan (largest area) 🏜️\n\n📍 Territories:\n5️⃣ Gilgit-Baltistan (K2, highest peaks) 🏔️\n6️⃣ Azad Kashmir\n\n🏙️ Major Cities:\nIslamabad (Capital), Karachi, Lahore, Faisalabad, Rawalpindi, Peshawar, Quetta",
      },
      {
        type: "quiz",
        question: "When did Pakistan gain independence?",
        options: [
          "14 August 1947",
          "23 March 1940",
          "14 August 1940",
          "1 January 1948",
        ],
        correct: 0,
        explanation:
          "Pakistan achieved independence on 14 AUGUST 1947 — we celebrate it every year as Independence Day!",
      },
      {
        type: "quiz",
        question: "What is the capital city of Pakistan?",
        options: ["Karachi", "Lahore", "Islamabad", "Peshawar"],
        correct: 2,
        explanation:
          "ISLAMABAD is the capital of Pakistan, built in the 1960s as a planned city!",
      },
      {
        type: "quiz",
        question: "What is Pakistan's national language?",
        options: ["Punjabi", "English", "Sindhi", "Urdu"],
        correct: 3,
        explanation:
          "URDU is Pakistan's national language, even though English is also widely used!",
      },
      {
        type: "quiz",
        question: "How many provinces does Pakistan have?",
        options: ["2", "3", "4", "5"],
        correct: 2,
        explanation:
          "Pakistan has 4 provinces: Punjab, Sindh, KPK, and Balochistan!",
      },
      { type: "result" },
    ],
  },
  {
    id: "ss_c3_01",
    subjectId: "social",
    grade: "Class 3",
    title: "Community Helpers",
    duration: "14 min",
    xpReward: 60,
    coinReward: 15,
    type: "interactive",
    difficulty: "easy",
    status: "available",
    slides: [
      {
        type: "content",
        title: "People Who Help Our Community",
        content:
          "COMMUNITY HELPERS are people who do important jobs that help everyone!\n\n👮 POLICE OFFICER — keeps the community safe, enforces laws\n👨‍⚕️ DOCTOR/NURSE — treats sick people, keeps us healthy\n👩‍🏫 TEACHER — educates children, builds the future\n👨‍🚒 FIREFIGHTER — puts out fires, rescues people\n🏗️ BUILDER/ENGINEER — constructs roads, bridges, buildings\n🚜 FARMER — grows our food\n🧹 SANITATION WORKER — keeps streets clean\n📬 POSTMAN — delivers letters and packages\n💈 BARBER/TAILOR — personal care and clothing",
      },
      {
        type: "content",
        title: "Why Community Helpers Are Important",
        content:
          "We CANNOT live without community helpers!\n\nWithout farmers 🚜 — no food\nWithout doctors 👨‍⚕️ — no healthcare\nWithout teachers 👩‍🏫 — no education\nWithout police 👮 — no safety\nWithout engineers 🏗️ — no buildings or roads\nWithout sanitation workers 🧹 — dirty, unhealthy environment\n\n🌟 How can WE help our community?\n✅ Keep public places clean\n✅ Be kind to neighbours\n✅ Respect community helpers\n✅ Obey traffic rules\n✅ Study hard to become a community helper!",
      },
      {
        type: "quiz",
        question: "Who do you call if there is a FIRE?",
        options: ["Doctor", "Firefighter", "Teacher", "Postman"],
        correct: 1,
        explanation:
          "A FIREFIGHTER is trained to put out fires and rescue people — call them in emergencies!",
      },
      {
        type: "quiz",
        question: "Which community helper GROWS our food?",
        options: ["Doctor", "Barber", "Farmer", "Police"],
        correct: 2,
        explanation:
          "A FARMER works hard to grow the crops and food we eat every day! 🌾",
      },
      {
        type: "quiz",
        question: "What does a SANITATION WORKER do?",
        options: [
          "Teaches children",
          "Keeps streets and areas clean",
          "Delivers letters",
          "Builds roads",
        ],
        correct: 1,
        explanation:
          "Sanitation/garbage workers keep our streets clean — they do a very important and respected job!",
      },
      {
        type: "quiz",
        question: "Which helper do you see if you feel sick?",
        options: ["Police officer", "Teacher", "Doctor/Nurse", "Firefighter"],
        correct: 2,
        explanation:
          "A DOCTOR or NURSE provides medical care when you are sick or injured!",
      },
      { type: "result" },
    ],
  },

  // --- Class 4 & 5 bonus lessons ---
  {
    id: "sc_c4_01",
    subjectId: "science",
    grade: "Class 4",
    title: "Human Body Systems",
    duration: "20 min",
    xpReward: 85,
    coinReward: 22,
    type: "animated",
    difficulty: "hard",
    status: "available",
    slides: [
      {
        type: "content",
        title: "Major Body Systems",
        content:
          "Our body has SYSTEMS — groups of organs working together!\n\n🫀 CIRCULATORY SYSTEM\nHeart + Blood Vessels + Blood\nPumps blood + oxygen to all body parts\n\n🫁 RESPIRATORY SYSTEM\nNose + Trachea + Lungs\nBrings oxygen in, takes carbon dioxide out\n\n🦷 DIGESTIVE SYSTEM\nMouth → Stomach → Intestines → …\nBreaks down food into nutrients\n\n🧠 NERVOUS SYSTEM\nBrain + Spinal Cord + Nerves\nControls all body functions and senses\n\n🦴 SKELETAL SYSTEM\n206 bones that support and protect the body",
      },
      {
        type: "content",
        title: "Heart & Circulatory System",
        content:
          "The HEART is the most important muscle!\n\n❤️ Size: about the size of your FIST\n❤️ Location: slightly left of centre in chest\n❤️ Function: pumps blood around the body\n❤️ Beats: 60–100 times per minute (~100,000 times/day!)\n\nBlood journey:\n🫀 Heart → Arteries → Tiny capillaries → Body cells\n🫀 Cells → Veins → Heart → Lungs (to get oxygen)\n🫀 Lungs → Heart → Back to body\n\nRed Blood Cells carry OXYGEN\nWhite Blood Cells fight GERMS/diseases\nPlatelets help blood to CLOT (stop bleeding)",
      },
      {
        type: "quiz",
        question: "How many bones does an adult human body have?",
        options: ["186", "196", "206", "216"],
        correct: 2,
        explanation:
          "An adult human body has 206 bones! Babies are born with ~270 which fuse together as we grow.",
      },
      {
        type: "quiz",
        question: "Which system is responsible for BREATHING?",
        options: ["Circulatory", "Digestive", "Respiratory", "Nervous"],
        correct: 2,
        explanation:
          "The RESPIRATORY system (lungs, nose, trachea) controls breathing!",
      },
      {
        type: "quiz",
        question: "How many times does the heart beat per day (approximately)?",
        options: ["10,000", "50,000", "100,000", "1,000,000"],
        correct: 2,
        explanation:
          "Your heart beats about 100,000 times per day — without stopping!",
      },
      {
        type: "quiz",
        question: "What do WHITE blood cells do?",
        options: [
          "Carry oxygen",
          "Fight germs and diseases",
          "Help with digestion",
          "Control movement",
        ],
        correct: 1,
        explanation:
          "White blood cells are our body's IMMUNE DEFENCE — they fight germs, viruses, and bacteria!",
      },
      { type: "result" },
    ],
  },
  {
    id: "ma_c4_01",
    subjectId: "math",
    grade: "Class 4",
    title: "Long Division ÷",
    duration: "22 min",
    xpReward: 90,
    coinReward: 23,
    type: "interactive",
    difficulty: "hard",
    status: "available",
    slides: [
      {
        type: "content",
        title: "What is Division?",
        content:
          "DIVISION is sharing equally OR grouping!\n\nSymbol: ÷ or /\n\n🍎 12 apples ÷ 4 children = 3 apples each\n\nVocabulary:\n📌 DIVIDEND — the number being divided (12)\n📌 DIVISOR — the number dividing (4)\n📌 QUOTIENT — the answer (3)\n📌 REMAINDER — what's left over\n\n12 ÷ 4 = 3 (exact — no remainder)\n13 ÷ 4 = 3 remainder 1 (13 = 4×3 + 1)\n\nKey fact: Division is the OPPOSITE of multiplication!\n4 × 3 = 12 ↔ 12 ÷ 4 = 3",
      },
      {
        type: "content",
        title: "Long Division Method",
        content:
          "Steps for LONG DIVISION:\n\nExample: 96 ÷ 4\n\nStep 1: How many times does 4 go into 9?\n  → 4 × 2 = 8 (2 times)\n  Write 2 above, subtract: 9 - 8 = 1\n\nStep 2: Bring down next digit (6)\n  → Now we have 16\n\nStep 3: How many times does 4 go into 16?\n  → 4 × 4 = 16 (4 times)\n  Write 4, subtract: 16 - 16 = 0\n\nAnswer: 96 ÷ 4 = 24 ✅\n\nCheck: 24 × 4 = 96 ✅",
      },
      {
        type: "quiz",
        question: "What is 48 ÷ 6?",
        options: ["6", "7", "8", "9"],
        correct: 2,
        explanation: "48 ÷ 6 = 8. Check: 8 × 6 = 48 ✓",
      },
      {
        type: "quiz",
        question: "In 72 ÷ 8 = 9, what is the QUOTIENT?",
        options: ["72", "8", "9", "64"],
        correct: 2,
        explanation:
          "The QUOTIENT is the ANSWER to a division. 72 ÷ 8 = 9, so 9 is the quotient!",
      },
      {
        type: "quiz",
        question: "What is the REMAINDER of 25 ÷ 4?",
        options: ["0", "1", "2", "3"],
        correct: 1,
        explanation: "25 ÷ 4: 4×6=24, then 25-24=1. So the remainder is 1!",
      },
      {
        type: "quiz",
        question:
          "If 35 students are divided into groups of 5, how many groups?",
        options: ["5", "6", "7", "8"],
        correct: 2,
        explanation: "35 ÷ 5 = 7. There will be 7 equal groups!",
      },
      { type: "result" },
    ],
  },
  {
    id: "en_c5_01",
    subjectId: "english",
    grade: "Class 5",
    title: "Essay Writing Skills",
    duration: "25 min",
    xpReward: 100,
    coinReward: 25,
    type: "interactive",
    difficulty: "hard",
    status: "available",
    slides: [
      {
        type: "content",
        title: "Structure of an Essay",
        content:
          "A good ESSAY has THREE parts:\n\n1️⃣ INTRODUCTION (1 paragraph)\n• Hook — grab the reader's attention!\n• Background info about the topic\n• Thesis statement — your main idea\n\n2️⃣ BODY PARAGRAPHS (2-3 paragraphs)\n• Each paragraph = one main idea\n• Topic sentence + supporting details + example\n• Use linking words: 'Furthermore', 'However', 'In addition'\n\n3️⃣ CONCLUSION (1 paragraph)\n• Restate the main idea (don't copy!)\n• Summarise key points\n• Closing thought or recommendation",
      },
      {
        type: "content",
        title: "Types of Essays",
        content:
          "Different TYPES of essays:\n\n📖 DESCRIPTIVE — describes a person, place, or thing\n'Describe your school'\nUse vivid adjectives and sensory details!\n\n💭 NARRATIVE — tells a story from your life\n'An unforgettable day of my life'\nUse first person (I, me, my) and past tense\n\n📊 EXPOSITORY — explains or informs\n'How photosynthesis works'\nUse facts, definitions, examples\n\n🗣️ PERSUASIVE — convinces the reader\n'Students should study outdoors'\nUse strong arguments and evidence",
      },
      {
        type: "quiz",
        question: "What are the THREE parts of an essay?",
        options: [
          "Title, story, ending",
          "Introduction, body, conclusion",
          "Heading, paragraphs, bibliography",
          "Topic, details, summary",
        ],
        correct: 1,
        explanation:
          "Every essay must have: Introduction → Body paragraphs → Conclusion!",
      },
      {
        type: "quiz",
        question: "A 'thesis statement' is:",
        options: [
          "The last sentence of the essay",
          "The title of the essay",
          "The main idea stated in the introduction",
          "A supporting example",
        ],
        correct: 2,
        explanation:
          "The THESIS STATEMENT in the introduction states the MAIN IDEA of the entire essay!",
      },
      {
        type: "quiz",
        question: "Which type of essay CONVINCES the reader?",
        options: ["Descriptive", "Narrative", "Expository", "Persuasive"],
        correct: 3,
        explanation:
          "PERSUASIVE essays use arguments and evidence to convince the reader to agree with a viewpoint!",
      },
      {
        type: "quiz",
        question: "Which linking word shows CONTRAST?",
        options: ["Furthermore", "In addition", "However", "Therefore"],
        correct: 2,
        explanation:
          "'HOWEVER' shows contrast — it introduces an opposing or different idea!",
      },
      { type: "result" },
    ],
  },
];

// ── Helper functions ──────────────────────────────────────────────────────────

export function getLessonById(id: string): Lesson | undefined {
  return ALL_LESSONS.find((l) => l.id === id);
}

export function getLessonsBySubject(subjectId: string): Lesson[] {
  return ALL_LESSONS.filter((l) => l.subjectId === subjectId);
}

export function getLessonsByGrade(grade: string): Lesson[] {
  return ALL_LESSONS.filter((l) => l.grade === grade);
}

export function getLessonsBySubjectAndGrade(
  subjectId: string,
  grade: string,
): Lesson[] {
  return ALL_LESSONS.filter(
    (l) => l.subjectId === subjectId && l.grade === grade,
  );
}

export function getAvailableGradesForSubject(subjectId: string): string[] {
  const grades = new Set(
    ALL_LESSONS.filter((l) => l.subjectId === subjectId).map((l) => l.grade),
  );
  return GRADES.filter((g) => grades.has(g));
}

export const SUBJECT_STATS: Record<
  string,
  { totalLessons: number; completedLessons: number }
> = Object.fromEntries(
  SUBJECTS.map((s) => {
    const lessons = getLessonsBySubject(s.id);
    return [
      s.id,
      {
        totalLessons: lessons.length,
        completedLessons: lessons.filter((l) => l.status === "completed")
          .length,
      },
    ];
  }),
);
