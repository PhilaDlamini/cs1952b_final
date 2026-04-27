/**
 * Brain De-rotter — Question Engine
 * Rotates through five general-knowledge categories with short-answer prompts.
 */

const CATEGORY_BANK = [
  {
    name: "History",
    promptLabel: "History checkpoint",
    questions: [
      {
        question: "Which wall fell in 1989, becoming a symbol of the Cold War ending?",
        answers: ["berlin wall"]
      },
      {
        question: "Who was the first woman to fly solo across the Atlantic Ocean?",
        answers: ["amelia earhart", "earhart"]
      },
      {
        question: "What ship famously sank on its maiden voyage in 1912?",
        answers: ["titanic", "the titanic"]
      },
      {
        question: "Which empire built Machu Picchu?",
        answers: ["inca", "inca empire", "the inca"]
      },
      {
        question: "Who delivered the 'I Have a Dream' speech in 1963?",
        answers: ["martin luther king jr", "martin luther king", "mlk", "mlk jr"]
      },
      {
        question: "Which city hosted the signing of the U.S. Constitution?",
        answers: ["philadelphia"]
      },
      {
        question: "What ancient wonder was located in Alexandria?",
        answers: ["lighthouse of alexandria", "the lighthouse of alexandria", "pharos of alexandria", "pharos"]
      },
      {
        question: "Who was the first emperor of Rome?",
        answers: ["augustus", "caesar augustus"]
      }
    ]
  },
  {
    name: "Science",
    promptLabel: "Science checkpoint",
    questions: [
      {
        question: "What gas do plants absorb from the atmosphere for photosynthesis?",
        answers: ["carbon dioxide", "co2"]
      },
      {
        question: "What is the hardest natural substance on Earth?",
        answers: ["diamond", "a diamond"]
      },
      {
        question: "What part of the cell contains most of its genetic material?",
        answers: ["nucleus", "the nucleus"]
      },
      {
        question: "What force keeps planets in orbit around the sun?",
        answers: ["gravity"]
      },
      {
        question: "What is the chemical symbol for gold?",
        answers: ["au"]
      },
      {
        question: "What blood cells help your body fight infection?",
        answers: ["white blood cells", "white cells", "leukocytes"]
      },
      {
        question: "What scale is used to measure earthquake magnitude?",
        answers: ["richter scale", "richter"]
      },
      {
        question: "What vitamin do humans naturally make from sunlight exposure?",
        answers: ["vitamin d", "d"]
      }
    ]
  },
  {
    name: "Geography",
    promptLabel: "Geography checkpoint",
    questions: [
      {
        question: "What is the longest river in South America?",
        answers: ["amazon", "amazon river", "the amazon", "the amazon river"]
      },
      {
        question: "What country has the city of Marrakesh?",
        answers: ["morocco"]
      },
      {
        question: "What desert covers much of northern Africa?",
        answers: ["sahara", "sahara desert", "the sahara", "the sahara desert"]
      },
      {
        question: "Which country is home to Mount Fuji?",
        answers: ["japan"]
      },
      {
        question: "What ocean lies on the west coast of the United States?",
        answers: ["pacific", "pacific ocean", "the pacific", "the pacific ocean"]
      },
      {
        question: "What river runs through Cairo?",
        answers: ["nile", "nile river", "the nile", "the nile river"]
      },
      {
        question: "What is the capital city of Canada?",
        answers: ["ottawa"]
      },
      {
        question: "Which continent contains the most countries?",
        answers: ["africa"]
      }
    ]
  },
  {
    name: "Arts & Culture",
    promptLabel: "Culture checkpoint",
    questions: [
      {
        question: "Who painted 'The Starry Night'?",
        answers: ["vincent van gogh", "van gogh"]
      },
      {
        question: "Which instrument has 88 keys on a standard version?",
        answers: ["piano", "the piano"]
      },
      {
        question: "What language is primarily spoken in Brazil?",
        answers: ["portuguese"]
      },
      {
        question: "Who wrote the play 'Hamlet'?",
        answers: ["william shakespeare", "shakespeare"]
      },
      {
        question: "What dance style originated in the Bronx in the 1970s alongside hip-hop culture?",
        answers: ["breakdancing", "breaking", "break dancing"]
      },
      {
        question: "Which artist is known as the 'Queen of Soul'?",
        answers: ["aretha franklin", "franklin"]
      },
      {
        question: "Which studio created the film 'Spirited Away'?",
        answers: ["studio ghibli", "ghibli"]
      },
      {
        question: "What is the Japanese word for comic books and graphic novels?",
        answers: ["manga"]
      }
    ]
  },
  {
    name: "Technology",
    promptLabel: "Technology checkpoint",
    questions: [
      {
        question: "What does 'HTTP' stand for?",
        answers: ["hypertext transfer protocol"]
      },
      {
        question: "What company created the iPhone?",
        answers: ["apple", "apple inc", "apple inc."]
      },
      {
        question: "In computing, what does 'CPU' stand for?",
        answers: ["central processing unit"]
      },
      {
        question: "What does 'GPS' stand for?",
        answers: ["global positioning system"]
      },
      {
        question: "What symbol is commonly used to tag topics on social media?",
        answers: ["hashtag", "#"]
      },
      {
        question: "What video platform are you probably avoiding right now?",
        answers: ["youtube", "youtube shorts", "shorts"]
      },
      {
        question: "What does 'Wi-Fi' allow devices to do without cables?",
        answers: ["connect to the internet", "connect wirelessly", "connect to a network wirelessly", "connect to the internet wirelessly"]
      },
      {
        question: "What company developed the Chrome browser?",
        answers: ["google"]
      }
    ]
  }
];

function normalizeAnswer(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9#\s]/g, "")
    .replace(/\s+/g, " ");
}

export function createQuestionEngine(startIndex = 0) {
  let categoryIndex = Math.max(0, Math.min(startIndex, CATEGORY_BANK.length - 1));

  function getCategory() {
    return CATEGORY_BANK[categoryIndex];
  }

  function generateQuestion() {
    const category = getCategory();
    const questionIndex = Math.floor(Math.random() * category.questions.length);
    const prompt = category.questions[questionIndex];

    return {
      category: category.name,
      promptLabel: category.promptLabel,
      question: prompt.question,
      answers: prompt.answers
    };
  }

  function validate(input, acceptedAnswers) {
    const normalizedInput = normalizeAnswer(input);

    return acceptedAnswers.some((answer) => normalizeAnswer(answer) === normalizedInput);
  }

  function levelUp() {
    categoryIndex = (categoryIndex + 1) % CATEGORY_BANK.length;
    console.log("[Brain De-rotter] Category advanced ->", getCategory().name);
    return categoryIndex;
  }

  function getLevel() {
    return categoryIndex;
  }

  return {
    generateQuestion,
    validate,
    levelUp,
    getLevel,
    getCategory
  };
}
