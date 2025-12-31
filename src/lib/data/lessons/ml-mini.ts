/**
 * Mini Machine Learning Module - Complete Lesson Content
 * Production-ready lessons for kids ages 8-16
 *
 * Module: ml-mini
 * Total Lessons: 8
 * Duration: ~3 hours
 * Difficulty: Beginner to Intermediate (⭐⭐)
 */

// ==================== TYPES ====================

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number; // Index of correct option
  explanation: string;
  hint?: string;
}

export interface MLMiniLessonSlide {
  id: string;
  type: 'intro' | 'content' | 'video' | 'quiz' | 'activity' | 'recap' | 'completion';
  title?: string;
  subtitle?: string;
  text?: string;
  bulletPoints?: string[];
  image?: string;
  videoUrl?: string;
  videoTitle?: string;
  videoDuration?: string;
  quiz?: QuizQuestion;
  tips?: string[];
  funFact?: string;
}

export interface MLMiniLessonMetadata {
  lessonId: string;
  moduleId: string;
  title: string;
  description: string;
  duration: string;
  learningObjectives: string[];
  prerequisites?: string[];
}

export interface MLMiniLesson {
  metadata: MLMiniLessonMetadata;
  slides: MLMiniLessonSlide[];
}

// ==================== LESSON 1: What is Machine Learning? ====================

const lesson1: MLMiniLesson = {
  metadata: {
    lessonId: '1',
    moduleId: 'ml-mini',
    title: 'What is Machine Learning?',
    description: 'Discover what machine learning is and how it powers amazing technologies',
    duration: '15 min',
    learningObjectives: [
      'Understand what machine learning means',
      'Learn the difference between AI and ML',
      'Discover real-world ML applications',
      'Recognize ML in everyday life',
    ],
  },
  slides: [
    {
      id: 'intro',
      type: 'intro',
      title: 'What is Machine Learning?',
      subtitle: 'Let\'s discover how computers learn from examples!',
      text: 'Get ready to explore one of the coolest topics in technology - teaching computers to learn on their own!',
    },
    {
      id: 'ml-definition',
      type: 'content',
      title: 'What is Machine Learning? 🤖',
      text: 'Machine Learning (ML) is a way to teach computers to learn from examples, just like you learn from experience!',
      bulletPoints: [
        '**Traditional Programming**: You tell the computer exactly what to do',
        '**Machine Learning**: The computer figures out what to do by looking at examples',
        '**Example**: Instead of programming every cat picture, the computer learns what cats look like from thousands of cat photos',
      ],
      funFact: 'The first machine learning program was created in 1952 - it learned to play checkers better than its creator!',
    },
    {
      id: 'ai-vs-ml',
      type: 'content',
      title: 'AI vs Machine Learning 🧠',
      text: 'AI and ML are related but different - let\'s understand how!',
      bulletPoints: [
        '**Artificial Intelligence (AI)**: Making computers smart like humans',
        '**Machine Learning (ML)**: A way to achieve AI by learning from data',
        '**Simple Analogy**: AI is like being good at sports, ML is one way to practice and get better',
        '**All ML is AI, but not all AI is ML!**',
      ],
    },
    {
      id: 'quiz-1',
      type: 'quiz',
      quiz: {
        question: 'Which best describes Machine Learning?',
        options: [
          'Telling computers exactly what to do step-by-step',
          'Teaching computers to learn from examples and improve',
          'Making computers look like humans',
          'Programming robots to walk and talk',
        ],
        correctAnswer: 1,
        explanation: 'Machine Learning is about teaching computers to learn from examples and data, rather than following exact instructions. The computer improves its performance as it sees more examples!',
        hint: 'Think about how you learn - by practicing and seeing examples!',
      },
    },
    {
      id: 'how-ml-works',
      type: 'content',
      title: 'How Does ML Work? 🎯',
      text: 'Machine Learning has three main steps - let\'s break them down!',
      bulletPoints: [
        '**1. Collect Data**: Gather lots of examples (like photos, sounds, or text)',
        '**2. Train the Model**: Let the computer find patterns in the data',
        '**3. Make Predictions**: Use what it learned to make decisions on new data',
        '**Example**: Collect cat photos → Computer learns cat features → Recognizes new cats!',
      ],
    },
    {
      id: 'ml-video',
      type: 'video',
      title: 'Machine Learning Explained',
      videoUrl: 'https://www.youtube.com/embed/f_uwKZIAeM0',
      videoTitle: 'What is Machine Learning?',
      videoDuration: '5 min',
      text: 'Watch this fun video to see machine learning in action!',
    },
    {
      id: 'ml-examples',
      type: 'content',
      title: 'ML in Your Daily Life 🌟',
      text: 'You use machine learning every day without even knowing it!',
      bulletPoints: [
        '**YouTube/Netflix**: Recommends videos you might like based on what you watch',
        '**Voice Assistants**: Siri and Alexa understand your voice using ML',
        '**Photo Apps**: Automatically organize your photos by recognizing faces',
        '**Email**: Filters out spam messages automatically',
        '**Games**: Computer opponents that learn from how you play',
      ],
      funFact: 'Spotify uses ML to create your "Discover Weekly" playlist by learning what music you like!',
    },
    {
      id: 'quiz-2',
      type: 'quiz',
      quiz: {
        question: 'Which is an example of machine learning in everyday life?',
        options: [
          'Using a calculator to add numbers',
          'Netflix recommending shows you might enjoy',
          'Typing on a keyboard',
          'Saving a file on your computer',
        ],
        correctAnswer: 1,
        explanation: 'Netflix uses machine learning to analyze what shows you watch and recommend similar content you might enjoy. It learns from your viewing patterns to make better suggestions!',
        hint: 'Think about something that gets better at predicting what you like over time!',
      },
    },
    {
      id: 'types-preview',
      type: 'content',
      title: 'Types of Machine Learning 📚',
      text: 'There are different ways computers can learn - we\'ll explore them in upcoming lessons!',
      bulletPoints: [
        '**Supervised Learning**: Learning with a teacher (labeled examples)',
        '**Unsupervised Learning**: Finding patterns on its own (no labels)',
        '**Reinforcement Learning**: Learning by trial and error (like playing games)',
      ],
    },
    {
      id: 'quiz-3',
      type: 'quiz',
      quiz: {
        question: 'What are the three main steps in machine learning?',
        options: [
          'Write code, test code, fix bugs',
          'Collect data, train model, make predictions',
          'Buy computer, install software, run program',
          'Design interface, add colors, publish app',
        ],
        correctAnswer: 1,
        explanation: 'The three main steps in ML are: (1) Collect data/examples, (2) Train the model to find patterns, and (3) Use the trained model to make predictions on new data!',
        hint: 'Think about the process: gather examples, learn from them, then use what you learned!',
      },
    },
    {
      id: 'recap',
      type: 'recap',
      title: 'What We Learned! 🎉',
      bulletPoints: [
        'Machine Learning teaches computers to learn from examples',
        'ML is a way to achieve AI by learning from data',
        'ML has 3 steps: Collect data, Train model, Make predictions',
        'You use ML every day: Netflix, Siri, photo apps, spam filters',
        'There are different types of ML we\'ll explore soon!',
      ],
    },
    {
      id: 'completion',
      type: 'completion',
      title: 'Lesson Complete! 🌟',
      text: 'Amazing work! You now understand what machine learning is and how it powers the technology around you. Ready to dive deeper?',
    },
  ],
};

// ==================== LESSON 2: Training Data & Patterns ====================

const lesson2: MLMiniLesson = {
  metadata: {
    lessonId: '2',
    moduleId: 'ml-mini',
    title: 'Training Data & Patterns',
    description: 'Learn how computers find patterns in data to make smart decisions',
    duration: '20 min',
    learningObjectives: [
      'Understand what training data is',
      'Learn how computers find patterns',
      'Discover why data quality matters',
      'See pattern recognition in action',
    ],
    prerequisites: ['Lesson 1: What is Machine Learning?'],
  },
  slides: [
    {
      id: 'intro',
      type: 'intro',
      title: 'Training Data & Patterns',
      subtitle: 'How do computers learn to recognize things?',
      text: 'Just like you need practice to get better at a skill, computers need data to learn patterns!',
    },
    {
      id: 'what-is-data',
      type: 'content',
      title: 'What is Training Data? 📊',
      text: 'Training data is like the textbook computers use to study and learn!',
      bulletPoints: [
        '**Training Data**: Examples used to teach the computer',
        '**Can be**: Images, text, sounds, numbers, videos - anything!',
        '**More data = Better learning**: Just like more practice makes you better',
        '**Example**: To teach a computer what dogs look like, show it 10,000 dog photos',
      ],
      funFact: 'Some ML models train on billions of examples - that\'s like reading every book in 100 libraries!',
    },
    {
      id: 'finding-patterns',
      type: 'content',
      title: 'Finding Patterns 🔍',
      text: 'Computers are amazing at finding patterns humans might miss!',
      bulletPoints: [
        '**Pattern**: Something that happens repeatedly in data',
        '**Dog Pattern**: Four legs, fur, tail, pointy ears, wet nose',
        '**Spam Pattern**: Words like "free money", "click here", lots of capitals',
        '**Weather Pattern**: Dark clouds usually mean rain is coming',
      ],
    },
    {
      id: 'quiz-1',
      type: 'quiz',
      quiz: {
        question: 'Why do we need lots of training data?',
        options: [
          'To make the computer work faster',
          'To help the computer find better patterns and learn more accurately',
          'To fill up the computer\'s storage',
          'To make the program look more impressive',
        ],
        correctAnswer: 1,
        explanation: 'More training data helps computers find more accurate patterns and make better predictions. Just like you learn better from more practice and examples!',
        hint: 'Think about learning a new skill - does more practice help you improve?',
      },
    },
    {
      id: 'data-quality',
      type: 'content',
      title: 'Quality Over Quantity 💎',
      text: 'Good data is more important than just having lots of data!',
      bulletPoints: [
        '**Good Data**: Clear, accurate, and diverse examples',
        '**Bad Data**: Blurry, mislabeled, or all too similar',
        '**Example**: Teaching cats with only orange cat photos → Won\'t recognize black cats!',
        '**Garbage In, Garbage Out**: Bad training data = Bad results',
      ],
    },
    {
      id: 'data-video',
      type: 'video',
      title: 'How Computers Find Patterns',
      videoUrl: 'https://www.youtube.com/embed/aircAruvnKk',
      videoTitle: 'But what is a neural network?',
      videoDuration: '6 min',
      text: 'See how computers break down images to find patterns!',
    },
    {
      id: 'features',
      type: 'content',
      title: 'Features: What Computers Look At 👀',
      text: 'Features are the specific things computers pay attention to in data!',
      bulletPoints: [
        '**Feature**: A measurable characteristic or property',
        '**Image Features**: Colors, shapes, edges, textures',
        '**Text Features**: Words used, sentence length, punctuation',
        '**Sound Features**: Pitch, volume, rhythm, tone',
        '**Example**: To identify fruits, look at color, size, shape, texture',
      ],
      funFact: 'Face recognition systems look at over 80 facial features - like distance between eyes, nose shape, and jaw line!',
    },
    {
      id: 'quiz-2',
      type: 'quiz',
      quiz: {
        question: 'What is a "feature" in machine learning?',
        options: [
          'A cool capability of the app',
          'A measurable characteristic the computer looks at',
          'A type of programming language',
          'A button in the user interface',
        ],
        correctAnswer: 1,
        explanation: 'A feature is a measurable characteristic or property that the computer examines in data - like colors in an image, or words in text. These features help the computer find patterns!',
        hint: 'Think about what you notice when identifying something - those are features!',
      },
    },
    {
      id: 'real-examples',
      type: 'content',
      title: 'Pattern Recognition Examples 🎯',
      text: 'Let\'s see how pattern recognition works in real applications!',
      bulletPoints: [
        '**Spam Detection**: Patterns in spam emails (suspicious words, bad grammar)',
        '**Face Recognition**: Unique patterns in your face to unlock your phone',
        '**Music Recognition**: Shazam finds songs by matching sound patterns',
        '**Handwriting**: Converts your handwriting to text by recognizing letter patterns',
      ],
    },
    {
      id: 'quiz-3',
      type: 'quiz',
      quiz: {
        question: 'If you want to train a computer to recognize different types of weather, what features might it look for?',
        options: [
          'The day of the week and time',
          'Cloud patterns, temperature, humidity, and wind speed',
          'The color of people\'s clothing',
          'How many cars are on the road',
        ],
        correctAnswer: 1,
        explanation: 'Weather patterns are best identified by features like cloud formations, temperature, humidity, and wind speed. These directly relate to weather conditions and help predict what\'s happening!',
        hint: 'What things in nature actually tell us about the weather?',
      },
    },
    {
      id: 'recap',
      type: 'recap',
      title: 'What We Learned! 🎉',
      bulletPoints: [
        'Training data is the examples computers learn from',
        'More quality data helps computers find better patterns',
        'Patterns are things that repeat in the data',
        'Features are specific characteristics computers examine',
        'Good data is diverse and accurate - not just lots of it!',
      ],
    },
    {
      id: 'completion',
      type: 'completion',
      title: 'Lesson Complete! 🌟',
      text: 'Excellent! You now understand how computers learn from data and find patterns. Next, we\'ll explore different learning methods!',
    },
  ],
};

// ==================== LESSON 3: Supervised Learning ====================

const lesson3: MLMiniLesson = {
  metadata: {
    lessonId: '3',
    moduleId: 'ml-mini',
    title: 'Supervised Learning',
    description: 'Discover how computers learn with labeled examples, like having a teacher',
    duration: '18 min',
    learningObjectives: [
      'Understand supervised learning',
      'Learn about classification vs regression',
      'See supervised learning in action',
      'Understand labels and their importance',
    ],
    prerequisites: ['Lesson 1', 'Lesson 2'],
  },
  slides: [
    {
      id: 'intro',
      type: 'intro',
      title: 'Supervised Learning',
      subtitle: 'Learning with a teacher!',
      text: 'Imagine learning with a teacher who shows you the right answers - that\'s supervised learning!',
    },
    {
      id: 'what-is-supervised',
      type: 'content',
      title: 'What is Supervised Learning? 👨‍🏫',
      text: 'Supervised learning is when we teach computers using labeled examples - like flashcards!',
      bulletPoints: [
        '**Supervised**: Learning with labeled examples (the answers are given)',
        '**Label**: The correct answer for each training example',
        '**Example**: Show cat pictures labeled "cat" and dog pictures labeled "dog"',
        '**The computer learns**: "These features mean cat, those features mean dog"',
      ],
      funFact: 'Most of the AI you use daily - like email spam filters and voice assistants - uses supervised learning!',
    },
    {
      id: 'labels-explained',
      type: 'content',
      title: 'What Are Labels? 🏷️',
      text: 'Labels are like answer keys that tell the computer what each example is!',
      bulletPoints: [
        '**Label**: The correct answer or category for training data',
        '**Example**: Email labeled "spam" or "not spam"',
        '**Example**: Picture labeled "cat", "dog", or "bird"',
        '**Example**: House data labeled with its selling price',
      ],
    },
    {
      id: 'quiz-1',
      type: 'quiz',
      quiz: {
        question: 'What makes learning "supervised"?',
        options: [
          'The computer is watched by a human the entire time',
          'The training data includes labels (correct answers)',
          'The computer can only learn during school hours',
          'Someone supervises the computer with a camera',
        ],
        correctAnswer: 1,
        explanation: 'Supervised learning means the training data includes labels - the correct answers. This is like learning with a teacher who tells you if you\'re right or wrong!',
        hint: 'Think about how having the answers to practice problems helps you learn!',
      },
    },
    {
      id: 'classification',
      type: 'content',
      title: 'Classification: Sorting into Groups 📦',
      text: 'Classification is putting things into categories - like sorting toys into boxes!',
      bulletPoints: [
        '**Classification**: Predicting which category something belongs to',
        '**Example**: Is this email spam or not spam?',
        '**Example**: Is this animal a cat, dog, or bird?',
        '**Example**: Is this movie review positive or negative?',
        '**Output**: A category or class label',
      ],
    },
    {
      id: 'sl-video',
      type: 'video',
      title: 'Supervised Learning Explained',
      videoUrl: 'https://www.youtube.com/embed/cfj6yaYE86U',
      videoTitle: 'Supervised vs Unsupervised Learning',
      videoDuration: '5 min',
      text: 'Watch this video to see supervised learning in action!',
    },
    {
      id: 'regression',
      type: 'content',
      title: 'Regression: Predicting Numbers 🔢',
      text: 'Regression predicts numerical values instead of categories!',
      bulletPoints: [
        '**Regression**: Predicting a number value',
        '**Example**: Predict house price based on size, location, bedrooms',
        '**Example**: Predict tomorrow\'s temperature from weather patterns',
        '**Example**: Predict how many views a video will get',
        '**Output**: A number (not a category)',
      ],
      funFact: 'Zillow uses regression to estimate house prices - they look at over 100 features about each home!',
    },
    {
      id: 'quiz-2',
      type: 'quiz',
      quiz: {
        question: 'Which is an example of CLASSIFICATION?',
        options: [
          'Predicting tomorrow\'s temperature',
          'Estimating how tall someone will grow',
          'Sorting fruits into apples, oranges, and bananas',
          'Guessing how many people will attend a concert',
        ],
        correctAnswer: 2,
        explanation: 'Classification means sorting into categories. Sorting fruits into types (apples, oranges, bananas) is classification. The other options predict numbers, which is regression!',
        hint: 'Look for the one that sorts things into groups or categories!',
      },
    },
    {
      id: 'real-world-sl',
      type: 'content',
      title: 'Supervised Learning Everywhere! 🌍',
      text: 'Supervised learning powers many technologies you use every day!',
      bulletPoints: [
        '**Email Spam Filter**: Trained on millions of emails labeled spam/not spam',
        '**Voice Assistants**: Trained on thousands of voice commands with labels',
        '**Medical Diagnosis**: Trained on X-rays labeled with diseases',
        '**Credit Card Fraud**: Trained on transactions labeled fraud/legitimate',
      ],
    },
    {
      id: 'quiz-3',
      type: 'quiz',
      quiz: {
        question: 'Which is an example of REGRESSION?',
        options: [
          'Identifying if a photo contains a cat or dog',
          'Sorting movies into comedy, action, or drama',
          'Predicting a student\'s test score based on study hours',
          'Detecting if an email is spam',
        ],
        correctAnswer: 2,
        explanation: 'Regression predicts numerical values. Predicting a test score (a number) based on study hours is regression. The other options predict categories (cat/dog, genres, spam/not spam) which is classification!',
        hint: 'Which one predicts an actual number rather than a category?',
      },
    },
    {
      id: 'recap',
      type: 'recap',
      title: 'What We Learned! 🎉',
      bulletPoints: [
        'Supervised learning uses labeled training data',
        'Labels are the correct answers for each example',
        'Classification sorts things into categories',
        'Regression predicts numerical values',
        'Most everyday AI uses supervised learning!',
      ],
    },
    {
      id: 'completion',
      type: 'completion',
      title: 'Lesson Complete! 🌟',
      text: 'Fantastic work! You now understand supervised learning - the most common type of machine learning. Next up: unsupervised learning!',
    },
  ],
};

// ==================== LESSON 4: Unsupervised Learning ====================

const lesson4: MLMiniLesson = {
  metadata: {
    lessonId: '4',
    moduleId: 'ml-mini',
    title: 'Unsupervised Learning',
    description: 'Learn how computers find patterns without being told the answers',
    duration: '18 min',
    learningObjectives: [
      'Understand unsupervised learning',
      'Learn about clustering and grouping',
      'See the difference from supervised learning',
      'Discover real-world applications',
    ],
    prerequisites: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
  },
  slides: [
    {
      id: 'intro',
      type: 'intro',
      title: 'Unsupervised Learning',
      subtitle: 'Learning without a teacher!',
      text: 'What if the computer could find patterns on its own, without any labels? That\'s unsupervised learning!',
    },
    {
      id: 'what-is-unsupervised',
      type: 'content',
      title: 'What is Unsupervised Learning? 🔍',
      text: 'Unsupervised learning is when computers find patterns in data without being given the answers!',
      bulletPoints: [
        '**No Labels**: The data doesn\'t have answers or categories',
        '**Find Patterns**: Computer discovers patterns and structure on its own',
        '**Example**: Given animal photos, group similar-looking animals together',
        '**The computer decides**: What patterns are interesting or useful',
      ],
      funFact: 'YouTube uses unsupervised learning to group similar videos together - nobody labeled billions of videos!',
    },
    {
      id: 'supervised-vs-unsupervised',
      type: 'content',
      title: 'Supervised vs Unsupervised 🆚',
      text: 'Let\'s compare these two learning approaches!',
      bulletPoints: [
        '**Supervised**: Like studying with answer keys - you know the correct answers',
        '**Unsupervised**: Like exploring a new city - you find interesting places yourself',
        '**Supervised**: "Here are cats and dogs, learn to tell them apart"',
        '**Unsupervised**: "Here are animals, find groups of similar ones"',
      ],
    },
    {
      id: 'quiz-1',
      type: 'quiz',
      quiz: {
        question: 'What\'s the main difference between supervised and unsupervised learning?',
        options: [
          'Supervised learning is faster than unsupervised',
          'Supervised learning has labels (answers), unsupervised doesn\'t',
          'Unsupervised learning is always more accurate',
          'Supervised learning uses more data',
        ],
        correctAnswer: 1,
        explanation: 'The key difference is that supervised learning has labeled data (correct answers), while unsupervised learning finds patterns in unlabeled data without being told what to look for!',
        hint: 'Think about whether you have the answers beforehand or not!',
      },
    },
    {
      id: 'clustering',
      type: 'content',
      title: 'Clustering: Grouping Similar Things 🎯',
      text: 'Clustering is the most common type of unsupervised learning - finding natural groups!',
      bulletPoints: [
        '**Clustering**: Grouping similar items together automatically',
        '**Example**: Group customers by shopping behavior',
        '**Example**: Group news articles by topic',
        '**Example**: Group songs by musical style',
        '**The computer decides**: How many groups and what makes things similar',
      ],
    },
    {
      id: 'clustering-examples',
      type: 'content',
      title: 'Clustering in Real Life 🌟',
      text: 'Clustering helps organize huge amounts of data automatically!',
      bulletPoints: [
        '**Netflix**: Groups movies into micro-genres (like "Quirky Teen Comedies")',
        '**Google Photos**: Groups your photos by events, places, or people',
        '**Spotify**: Creates playlists by grouping similar songs',
        '**Amazon**: "Customers who bought X also bought Y" from purchase patterns',
      ],
      funFact: 'Spotify has over 5,000 micro-genres created by clustering algorithms - like "Hypnagogic Pop" and "Math Rock"!',
    },
    {
      id: 'quiz-2',
      type: 'quiz',
      quiz: {
        question: 'Which is an example of unsupervised learning?',
        options: [
          'Teaching a computer to identify spam by showing labeled spam emails',
          'Grouping customers into segments based on their shopping patterns',
          'Training face recognition with labeled photos of people',
          'Predicting house prices using labeled sale data',
        ],
        correctAnswer: 1,
        explanation: 'Grouping customers by shopping patterns is unsupervised - the computer finds natural groups without being told what those groups should be. The other options all use labeled data (supervised learning)!',
        hint: 'Look for the one where nobody provides labels or categories!',
      },
    },
    {
      id: 'other-unsupervised',
      type: 'content',
      title: 'Other Unsupervised Learning Tasks 🎨',
      text: 'Beyond clustering, unsupervised learning can do other cool things!',
      bulletPoints: [
        '**Anomaly Detection**: Finding unusual or weird patterns (like fraud)',
        '**Dimensionality Reduction**: Simplifying complex data while keeping important info',
        '**Association Rules**: Finding things that often happen together',
        '**Example**: People who buy peanut butter also buy jelly',
      ],
    },
    {
      id: 'when-to-use',
      type: 'content',
      title: 'When to Use Unsupervised Learning? 🤔',
      text: 'Unsupervised learning shines in these situations!',
      bulletPoints: [
        '**No Labels Available**: You have lots of data but no answers',
        '**Exploratory Analysis**: You want to discover unknown patterns',
        '**Too Much Data to Label**: Labeling millions of items would take forever',
        '**Example**: Analyzing customer behavior to discover new market segments',
      ],
    },
    {
      id: 'quiz-3',
      type: 'quiz',
      quiz: {
        question: 'Why might you choose unsupervised learning over supervised learning?',
        options: [
          'When you need the most accurate predictions possible',
          'When you don\'t have labeled data and want to discover patterns',
          'When you have lots of labeled training examples',
          'When you know exactly what you\'re looking for',
        ],
        correctAnswer: 1,
        explanation: 'Unsupervised learning is perfect when you don\'t have labels and want to explore data to discover hidden patterns or groups. It helps you find things you might not have even known to look for!',
        hint: 'When would learning without labels be useful?',
      },
    },
    {
      id: 'recap',
      type: 'recap',
      title: 'What We Learned! 🎉',
      bulletPoints: [
        'Unsupervised learning finds patterns without labels',
        'Clustering groups similar items together automatically',
        'Used when you don\'t have labeled data',
        'Powers recommendations, photo organization, and more',
        'Great for discovering unknown patterns in data!',
      ],
    },
    {
      id: 'completion',
      type: 'completion',
      title: 'Lesson Complete! 🌟',
      text: 'Awesome job! You now understand both supervised and unsupervised learning. Time to build your first ML project!',
    },
  ],
};

// ==================== LESSON 5: Hands-On Image Classifier ====================

const lesson5: MLMiniLesson = {
  metadata: {
    lessonId: '5',
    moduleId: 'ml-mini',
    title: 'Hands-On: Image Classifier',
    description: 'Build your first machine learning model using Teachable Machine',
    duration: '25 min',
    learningObjectives: [
      'Build a real image classifier',
      'Understand the training process',
      'Test and improve your model',
      'Share your creation with others',
    ],
    prerequisites: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
  },
  slides: [
    {
      id: 'intro',
      type: 'intro',
      title: 'Build Your Image Classifier!',
      subtitle: 'Create a real ML model in minutes!',
      text: 'Ready to build your very first machine learning model? Let\'s use Google\'s Teachable Machine!',
    },
    {
      id: 'what-youll-build',
      type: 'content',
      title: 'What You\'ll Build 🎨',
      text: 'You\'re going to train a computer to recognize different objects using your webcam!',
      bulletPoints: [
        '**Your Project**: An image classifier that recognizes objects',
        '**Example Ideas**: Rock-Paper-Scissors detector, Pet classifier, Emotion detector',
        '**How**: Use your webcam to collect training images',
        '**Result**: A working ML model you can test and share!',
      ],
      funFact: 'Teachable Machine makes ML so easy, even elementary school kids have built amazing projects with it!',
    },
    {
      id: 'teachable-machine-intro',
      type: 'content',
      title: 'Meet Teachable Machine 🤖',
      text: 'Teachable Machine is a free, kid-friendly tool from Google for building ML models!',
      bulletPoints: [
        '**No Coding Required**: Build ML models with just your webcam',
        '**Free Forever**: No sign-up needed, use it right in your browser',
        '**Export Your Model**: Download and use in your own projects',
        '**Website**: teachablemachine.withgoogle.com',
      ],
    },
    {
      id: 'tm-video',
      type: 'video',
      title: 'Teachable Machine Tutorial',
      videoUrl: 'https://www.youtube.com/embed/DFBbSTvtpy4',
      videoTitle: 'Getting Started with Teachable Machine',
      videoDuration: '4 min',
      text: 'Watch this quick tutorial before we begin!',
    },
    {
      id: 'step-1',
      type: 'content',
      title: 'Step 1: Choose Your Project 🎯',
      text: 'First, decide what you want your model to recognize!',
      bulletPoints: [
        '**Easy Ideas for Beginners**:',
        'Rock, Paper, Scissors game',
        'Different facial expressions (happy, sad, surprised)',
        'Thumbs up vs thumbs down',
        'Different objects around your room',
      ],
      tips: [
        'Start simple with 2-3 classes',
        'Choose things that look different from each other',
        'Make sure you have good lighting',
      ],
    },
    {
      id: 'step-2',
      type: 'content',
      title: 'Step 2: Collect Training Data 📸',
      text: 'Now capture lots of examples for each class!',
      bulletPoints: [
        '**1. Create Classes**: Add a class for each thing you want to recognize',
        '**2. Record Samples**: Hold up the object and click "Hold to Record"',
        '**3. Vary Your Examples**: Different angles, distances, backgrounds',
        '**4. Aim for**: At least 50-100 samples per class',
      ],
      tips: [
        'Move the object around while recording',
        'Try different lighting and angles',
        'More diverse examples = better model!',
      ],
    },
    {
      id: 'quiz-1',
      type: 'quiz',
      quiz: {
        question: 'Why should you take photos from different angles and distances?',
        options: [
          'To make the training take longer',
          'To help the model recognize the object in more situations',
          'Because the computer likes variety',
          'It doesn\'t matter - one photo is enough',
        ],
        correctAnswer: 1,
        explanation: 'Taking diverse photos from different angles, distances, and lighting helps your model learn to recognize the object in many situations - not just one specific way!',
        hint: 'Think about how you need to practice skills in different ways to master them!',
      },
    },
    {
      id: 'step-3',
      type: 'content',
      title: 'Step 3: Train Your Model 🎓',
      text: 'Click "Train Model" and watch the magic happen!',
      bulletPoints: [
        '**Training**: The computer finds patterns in your images',
        '**Takes**: Usually 10-30 seconds',
        '**What Happens**: Computer learns features that distinguish each class',
        '**Progress Bar**: Shows training progress',
      ],
      funFact: 'Your model is training on Google\'s powerful computers in the cloud - for free!',
    },
    {
      id: 'step-4',
      type: 'content',
      title: 'Step 4: Test Your Model 🧪',
      text: 'Time to see if your model works!',
      bulletPoints: [
        '**Preview Pane**: Shows real-time predictions from your webcam',
        '**Test Each Class**: Hold up each object and see if it\'s recognized',
        '**Confidence Score**: Shows how sure the model is (0-100%)',
        '**If Wrong**: Add more training examples and retrain!',
      ],
    },
    {
      id: 'quiz-2',
      type: 'quiz',
      quiz: {
        question: 'If your model keeps making mistakes on one object, what should you do?',
        options: [
          'Give up and start over with a different project',
          'Add more varied training examples of that object and retrain',
          'Delete that class from your model',
          'The model can\'t be improved once trained',
        ],
        correctAnswer: 1,
        explanation: 'If your model struggles with an object, add more diverse training examples of that specific object from different angles and lighting, then retrain. This helps the model learn better!',
        hint: 'How would you improve if you kept getting a question wrong?',
      },
    },
    {
      id: 'step-5',
      type: 'content',
      title: 'Step 5: Export & Share 🚀',
      text: 'Save your model and share it with friends!',
      bulletPoints: [
        '**Export Model**: Click "Export Model" button',
        '**Options**: Download as file or get a shareable link',
        '**Use It**: In Scratch, websites, or mobile apps',
        '**Share**: Send the link to friends to try your model!',
      ],
    },
    {
      id: 'improve-model',
      type: 'content',
      title: 'Making Your Model Better 📈',
      text: 'Here are pro tips to improve your model\'s accuracy!',
      bulletPoints: [
        '**More Examples**: 100+ samples per class is even better',
        '**Balanced Data**: Same number of examples for each class',
        '**Diverse Examples**: Different backgrounds, lighting, positions',
        '**Clear Differences**: Choose classes that look different',
        '**Test Thoroughly**: Try tricky cases and edge situations',
      ],
    },
    {
      id: 'quiz-3',
      type: 'quiz',
      quiz: {
        question: 'What makes training data "balanced"?',
        options: [
          'All photos are taken from the center of the screen',
          'Each class has roughly the same number of examples',
          'The model is equally good at all predictions',
          'Photos are taken from a balanced stance',
        ],
        correctAnswer: 1,
        explanation: 'Balanced training data means each class has a similar number of examples. This prevents the model from being biased toward classes with more examples!',
        hint: 'Think about fairness - each class should get equal attention!',
      },
    },
    {
      id: 'recap',
      type: 'recap',
      title: 'What We Learned! 🎉',
      bulletPoints: [
        'Built a real ML image classifier with Teachable Machine',
        'Collected diverse training data from different angles',
        'Trained a model to recognize objects',
        'Tested and improved model accuracy',
        'Exported and shared your creation!',
      ],
    },
    {
      id: 'completion',
      type: 'completion',
      title: 'Lesson Complete! 🌟',
      text: 'Congratulations! You just built your first machine learning model! This is a huge milestone in your AI journey!',
    },
  ],
};

// ==================== LESSON 6: How Models Get Smarter ====================

const lesson6: MLMiniLesson = {
  metadata: {
    lessonId: '6',
    moduleId: 'ml-mini',
    title: 'How Models Get Smarter',
    description: 'Learn how machine learning models improve through training and testing',
    duration: '20 min',
    learningObjectives: [
      'Understand the training process',
      'Learn about accuracy and testing',
      'Discover overfitting and underfitting',
      'Know how to improve models',
    ],
    prerequisites: ['Lesson 1-5'],
  },
  slides: [
    {
      id: 'intro',
      type: 'intro',
      title: 'How Models Get Smarter',
      subtitle: 'The journey from beginner to expert!',
      text: 'Just like you improve with practice, ML models get smarter through training. Let\'s see how!',
    },
    {
      id: 'training-process',
      type: 'content',
      title: 'The Training Process 🎓',
      text: 'Training is how models learn from data - it\'s like studying for a test!',
      bulletPoints: [
        '**Step 1**: Model makes a prediction (a guess)',
        '**Step 2**: Compare to the correct answer (the label)',
        '**Step 3**: Calculate how wrong it was (the error)',
        '**Step 4**: Adjust to be more accurate next time',
        '**Repeat**: Thousands or millions of times!',
      ],
      funFact: 'Some advanced ML models train on millions of examples for weeks, using supercomputers!',
    },
    {
      id: 'learning-curve',
      type: 'content',
      title: 'The Learning Curve 📈',
      text: 'Models start bad and get better - just like learning anything new!',
      bulletPoints: [
        '**Beginning**: Random guesses, very inaccurate',
        '**Early Training**: Learns obvious patterns, improves quickly',
        '**Middle Training**: Finds subtle patterns, slower improvement',
        '**Late Training**: Fine-tuning details, tiny improvements',
        '**Eventually**: Reaches peak performance',
      ],
    },
    {
      id: 'train-test-split',
      type: 'content',
      title: 'Training vs Testing Data 🎯',
      text: 'We split data into two parts - why?',
      bulletPoints: [
        '**Training Data (80%)**: Used to teach the model',
        '**Testing Data (20%)**: Used to check if it really learned',
        '**Why Split?**: Tests if model works on NEW examples, not just memorized ones',
        '**Like School**: Practice homework (training) vs Final exam (testing)',
      ],
    },
    {
      id: 'quiz-1',
      type: 'quiz',
      quiz: {
        question: 'Why do we need separate training and testing data?',
        options: [
          'To make the process take longer',
          'To see if the model works on new examples it hasn\'t seen before',
          'Because we have too much data',
          'To make the computer work harder',
        ],
        correctAnswer: 1,
        explanation: 'We use separate test data to verify the model actually learned patterns, not just memorized training examples. It\'s like taking a final exam with new questions to prove you understand!',
        hint: 'Think about why teachers give you new problems on tests, not the exact same practice problems!',
      },
    },
    {
      id: 'accuracy-explained',
      type: 'content',
      title: 'Measuring Accuracy 🎯',
      text: 'Accuracy tells us how often the model is correct!',
      bulletPoints: [
        '**Accuracy**: Percentage of correct predictions',
        '**Formula**: (Correct Predictions / Total Predictions) × 100',
        '**Example**: 90 right out of 100 = 90% accurate',
        '**Good Accuracy**: Depends on the problem (95%+ is often excellent)',
      ],
    },
    {
      id: 'accuracy-video',
      type: 'video',
      title: 'Training and Testing Explained',
      videoUrl: 'https://www.youtube.com/embed/Rjr0xGpfOkU',
      videoTitle: 'Training and Testing ML Models',
      videoDuration: '5 min',
      text: 'Watch how models improve through training!',
    },
    {
      id: 'overfitting',
      type: 'content',
      title: 'Overfitting: Memorizing vs Learning 🤓',
      text: 'Overfitting is when a model memorizes instead of learning patterns - like memorizing answers without understanding!',
      bulletPoints: [
        '**Overfitting**: Works great on training data, fails on new data',
        '**Cause**: Model learned training data TOO well, including noise',
        '**Example**: Memorizing exact practice problems but failing the test',
        '**Sign**: High training accuracy, low testing accuracy',
      ],
      funFact: 'Overfitting is like studying by memorizing your practice test answers - you\'ll fail when questions change slightly!',
    },
    {
      id: 'underfitting',
      type: 'content',
      title: 'Underfitting: Not Learning Enough 😴',
      text: 'Underfitting is when a model hasn\'t learned enough - like barely studying!',
      bulletPoints: [
        '**Underfitting**: Poor performance on both training and test data',
        '**Cause**: Model is too simple or didn\'t train long enough',
        '**Example**: Only studying 10 minutes for a big test',
        '**Sign**: Low accuracy on both training and testing',
      ],
    },
    {
      id: 'quiz-2',
      type: 'quiz',
      quiz: {
        question: 'What is overfitting?',
        options: [
          'When the model is too large for the computer',
          'When the model memorizes training data instead of learning patterns',
          'When the model trains too slowly',
          'When there\'s too much training data',
        ],
        correctAnswer: 1,
        explanation: 'Overfitting happens when a model memorizes training data (including noise and oddities) instead of learning general patterns. It does great on training data but fails on new examples!',
        hint: 'Think about the difference between memorizing vs understanding!',
      },
    },
    {
      id: 'preventing-overfitting',
      type: 'content',
      title: 'Preventing Overfitting 🛡️',
      text: 'Here are ways to keep your model from just memorizing!',
      bulletPoints: [
        '**More Training Data**: Harder to memorize, forces learning patterns',
        '**Simpler Models**: Less capacity to memorize',
        '**Stop Early**: Don\'t train for too long',
        '**Regularization**: Technical tricks that prevent memorization',
        '**Data Augmentation**: Create variations of training examples',
      ],
    },
    {
      id: 'improving-models',
      type: 'content',
      title: 'Making Models Better 📈',
      text: 'Proven strategies to improve your ML models!',
      bulletPoints: [
        '**Get More Data**: Usually the #1 way to improve',
        '**Better Quality Data**: Clean, diverse, balanced examples',
        '**Try Different Models**: Some models work better for certain problems',
        '**Tune Settings**: Adjust learning rate, training time, etc.',
        '**Feature Engineering**: Choose the right features to look at',
      ],
    },
    {
      id: 'quiz-3',
      type: 'quiz',
      quiz: {
        question: 'What\'s usually the best way to improve a model\'s accuracy?',
        options: [
          'Make the model bigger and more complex',
          'Train for much longer',
          'Get more high-quality, diverse training data',
          'Use a faster computer',
        ],
        correctAnswer: 2,
        explanation: 'More high-quality, diverse training data is usually the most effective way to improve model accuracy. More examples help the model learn better patterns!',
        hint: 'What helps you learn best - more varied practice problems or just doing the same ones over?',
      },
    },
    {
      id: 'recap',
      type: 'recap',
      title: 'What We Learned! 🎉',
      bulletPoints: [
        'Models improve through iterative training',
        'We split data into training and testing sets',
        'Accuracy measures how often the model is correct',
        'Overfitting = memorizing, Underfitting = not learning enough',
        'More quality data is usually the best improvement!',
      ],
    },
    {
      id: 'completion',
      type: 'completion',
      title: 'Lesson Complete! 🌟',
      text: 'Excellent work! You now understand how to train and improve ML models. Next, we\'ll explore ML in the real world!',
    },
  ],
};

// ==================== LESSON 7: ML in the Real World ====================

const lesson7: MLMiniLesson = {
  metadata: {
    lessonId: '7',
    moduleId: 'ml-mini',
    title: 'ML in the Real World',
    description: 'Discover amazing machine learning applications changing our world',
    duration: '18 min',
    learningObjectives: [
      'See ML in voice assistants',
      'Understand recommendation systems',
      'Learn about self-driving cars',
      'Discover ML in healthcare and more',
    ],
    prerequisites: ['Lesson 1-6'],
  },
  slides: [
    {
      id: 'intro',
      type: 'intro',
      title: 'ML in the Real World',
      subtitle: 'Machine learning is everywhere!',
      text: 'From your phone to hospitals to space exploration - ML is transforming our world. Let\'s explore!',
    },
    {
      id: 'voice-assistants',
      type: 'content',
      title: 'Voice Assistants 🎙️',
      text: 'Siri, Alexa, and Google Assistant use ML to understand and respond to you!',
      bulletPoints: [
        '**Speech Recognition**: Converts your voice to text using ML',
        '**Natural Language Understanding**: Figures out what you mean',
        '**Voice Synthesis**: Generates natural-sounding responses',
        '**Gets Smarter**: Learns from millions of user interactions',
      ],
      funFact: 'Alexa answers over 100 million questions daily, learning from each interaction!',
    },
    {
      id: 'recommendations',
      type: 'content',
      title: 'Recommendation Systems 🎬',
      text: 'Netflix, YouTube, and Spotify know what you\'ll like next - thanks to ML!',
      bulletPoints: [
        '**Learns Your Taste**: Watches what you like and don\'t like',
        '**Finds Patterns**: "People who liked X also enjoyed Y"',
        '**Personalized**: Your recommendations are unique to you',
        '**Examples**: YouTube suggestions, Netflix shows, Spotify playlists',
      ],
      funFact: '75% of what people watch on Netflix comes from recommendations - that\'s the power of ML!',
    },
    {
      id: 'quiz-1',
      type: 'quiz',
      quiz: {
        question: 'How do recommendation systems like Netflix know what you might enjoy?',
        options: [
          'Random guessing',
          'They show the same things to everyone',
          'ML learns from your watching patterns and similar users',
          'Employees manually pick shows for each person',
        ],
        correctAnswer: 2,
        explanation: 'Recommendation systems use ML to learn from what you watch, rate, and skip. They also find patterns from similar users to predict what you\'ll enjoy next!',
        hint: 'Think about how recommendations get better the more you use the service!',
      },
    },
    {
      id: 'self-driving-cars',
      type: 'content',
      title: 'Self-Driving Cars 🚗',
      text: 'ML helps cars see, understand, and navigate the world safely!',
      bulletPoints: [
        '**Computer Vision**: Recognizes roads, cars, pedestrians, signs',
        '**Prediction**: Anticipates what other cars and people will do',
        '**Decision Making**: Decides when to turn, stop, speed up',
        '**Trained On**: Millions of miles of driving data',
      ],
    },
    {
      id: 'ml-video',
      type: 'video',
      title: 'Amazing ML Applications',
      videoUrl: 'https://www.youtube.com/embed/iy5d51hZObc',
      videoTitle: 'Real-World Machine Learning Applications',
      videoDuration: '6 min',
      text: 'See incredible ML applications in action!',
    },
    {
      id: 'healthcare',
      type: 'content',
      title: 'Healthcare & Medicine 🏥',
      text: 'ML is helping doctors save lives and discover new treatments!',
      bulletPoints: [
        '**Disease Detection**: Spots cancer and diseases in X-rays and scans',
        '**Drug Discovery**: Finds new medicines faster',
        '**Personalized Treatment**: Recommends best treatments for each patient',
        '**Prediction**: Predicts disease outbreaks and health risks',
      ],
      funFact: 'ML can detect some types of cancer from medical images more accurately than human doctors!',
    },
    {
      id: 'more-applications',
      type: 'content',
      title: 'More ML Applications 🌍',
      text: 'ML is transforming almost every industry!',
      bulletPoints: [
        '**Translation**: Google Translate uses ML to understand 100+ languages',
        '**Finance**: Detects credit card fraud in real-time',
        '**Weather**: Predicts weather and climate changes',
        '**Agriculture**: Helps farmers grow more food with less waste',
        '**Space**: NASA uses ML to discover new planets',
      ],
    },
    {
      id: 'quiz-2',
      type: 'quiz',
      quiz: {
        question: 'In healthcare, how does ML help detect diseases?',
        options: [
          'It replaces all doctors',
          'It randomly checks patients',
          'It analyzes medical images to spot patterns doctors might miss',
          'It only works with blood tests',
        ],
        correctAnswer: 2,
        explanation: 'ML analyzes medical images (X-rays, MRIs, etc.) to detect patterns and signs of disease. It helps doctors by spotting things that might be missed and providing second opinions!',
        hint: 'Think about ML\'s strength in pattern recognition!',
      },
    },
    {
      id: 'creative-ml',
      type: 'content',
      title: 'Creative ML 🎨',
      text: 'ML isn\'t just for science - it\'s making art, music, and stories too!',
      bulletPoints: [
        '**Art Generation**: DALL-E and Midjourney create images from text',
        '**Music Composition**: AI generates original songs and beats',
        '**Writing**: ChatGPT and similar tools help write stories and code',
        '**Game Development**: Creates game levels and NPC behaviors',
      ],
    },
    {
      id: 'future-ml',
      type: 'content',
      title: 'The Future of ML 🚀',
      text: 'ML will continue transforming our world in exciting ways!',
      bulletPoints: [
        '**Climate Solutions**: Helping solve climate change',
        '**Education**: Personalized learning for every student',
        '**Accessibility**: Helping people with disabilities',
        '**Scientific Discovery**: Accelerating research in all fields',
        '**Your Ideas**: What will YOU build with ML?',
      ],
      funFact: 'By 2030, experts predict ML will contribute $15.7 trillion to the global economy!',
    },
    {
      id: 'quiz-3',
      type: 'quiz',
      quiz: {
        question: 'Which statement about ML in the real world is TRUE?',
        options: [
          'ML only works in technology companies',
          'ML is being used in almost every industry from healthcare to agriculture',
          'ML has peaked and won\'t improve anymore',
          'Only adults can work with ML',
        ],
        correctAnswer: 1,
        explanation: 'ML is transforming virtually every industry - healthcare, agriculture, education, entertainment, finance, and more. It\'s one of the most widely-applicable technologies ever created!',
        hint: 'Think about all the different applications we\'ve discussed!',
      },
    },
    {
      id: 'recap',
      type: 'recap',
      title: 'What We Learned! 🎉',
      bulletPoints: [
        'Voice assistants use ML to understand speech',
        'Recommendation systems personalize content for you',
        'Self-driving cars navigate using computer vision',
        'ML helps doctors detect diseases and discover treatments',
        'ML is transforming every industry and creating new possibilities!',
      ],
    },
    {
      id: 'completion',
      type: 'completion',
      title: 'Lesson Complete! 🌟',
      text: 'Amazing work! You\'ve seen how ML is changing our world. Ready for your final project? Let\'s build something incredible!',
    },
  ],
};

// ==================== LESSON 8: Build Your ML Project ====================

const lesson8: MLMiniLesson = {
  metadata: {
    lessonId: '8',
    moduleId: 'ml-mini',
    title: 'Build Your ML Project',
    description: 'Create your own sound classifier and celebrate everything you\'ve learned',
    duration: '26 min',
    learningObjectives: [
      'Build a sound classifier from scratch',
      'Apply everything you\'ve learned',
      'Share your creation with others',
      'Plan your ML learning journey',
    ],
    prerequisites: ['Lesson 1-7'],
  },
  slides: [
    {
      id: 'intro',
      type: 'intro',
      title: 'Build Your ML Project!',
      subtitle: 'Your final challenge!',
      text: 'Time to build an amazing sound classifier and show off everything you\'ve learned about machine learning!',
    },
    {
      id: 'journey-recap',
      type: 'content',
      title: 'Your ML Journey So Far 🎉',
      text: 'Look how much you\'ve learned! You\'re now an ML explorer!',
      bulletPoints: [
        '**Lesson 1**: Discovered what machine learning is',
        '**Lesson 2**: Learned about training data and patterns',
        '**Lesson 3**: Mastered supervised learning',
        '**Lesson 4**: Understood unsupervised learning',
        '**Lesson 5**: Built your first image classifier',
        '**Lesson 6**: Learned how models get smarter',
        '**Lesson 7**: Explored ML in the real world',
      ],
    },
    {
      id: 'final-project',
      type: 'content',
      title: 'Your Final Project: Sound Classifier 🎵',
      text: 'Build a machine learning model that recognizes different sounds!',
      bulletPoints: [
        '**Project**: Train a model to classify different sounds',
        '**Ideas**: Clap vs snap, different musical instruments, animal sounds',
        '**Tool**: Teachable Machine (audio mode)',
        '**Challenge**: Make it 90%+ accurate!',
      ],
      funFact: 'Sound classification is used in apps like Shazam, voice assistants, and even wildlife monitoring!',
    },
    {
      id: 'project-video',
      type: 'video',
      title: 'Sound Classifier Tutorial',
      videoUrl: 'https://www.youtube.com/embed/TOrVsLklltM',
      videoTitle: 'Building a Sound Classifier with Teachable Machine',
      videoDuration: '5 min',
      text: 'Watch this guide to build your sound classifier!',
    },
    {
      id: 'step-1-setup',
      type: 'content',
      title: 'Step 1: Setup Your Project 🎯',
      text: 'Let\'s get started with Teachable Machine\'s audio mode!',
      bulletPoints: [
        '**1. Go to**: teachablemachine.withgoogle.com',
        '**2. Click**: "Get Started"',
        '**3. Select**: "Audio Project"',
        '**4. Choose**: What sounds you want to classify',
      ],
      tips: [
        'Pick sounds that are clearly different',
        'Start with 2-3 sound classes',
        'Make sure your microphone works',
      ],
    },
    {
      id: 'step-2-record',
      type: 'content',
      title: 'Step 2: Record Sound Samples 🎙️',
      text: 'Capture lots of examples of each sound!',
      bulletPoints: [
        '**Create Classes**: Add a class for each sound type',
        '**Record Samples**: Click and hold "Record" while making the sound',
        '**Vary Examples**: Different volumes, speeds, slight variations',
        '**Background Noise Class**: Record silence/room noise as one class',
        '**Aim For**: 20-30 second samples per class',
      ],
      tips: [
        'Record in a quiet place',
        'Try making the sound in different ways',
        'Include a "background noise" class for better accuracy',
      ],
    },
    {
      id: 'quiz-1',
      type: 'quiz',
      quiz: {
        question: 'Why should you include a "background noise" class in your sound classifier?',
        options: [
          'To make training take longer',
          'So the model knows what NOT to classify as your target sounds',
          'Because Teachable Machine requires it',
          'It doesn\'t matter',
        ],
        correctAnswer: 1,
        explanation: 'A background noise class teaches your model what silence or ambient sound is, so it doesn\'t mistakenly classify random noises as your target sounds. This improves accuracy!',
        hint: 'Think about what should happen when there\'s no sound!',
      },
    },
    {
      id: 'step-3-train',
      type: 'content',
      title: 'Step 3: Train Your Model 🎓',
      text: 'Let the computer learn to recognize your sounds!',
      bulletPoints: [
        '**Click**: "Train Model" button',
        '**Wait**: Usually takes 30-60 seconds for audio models',
        '**What Happens**: Computer finds patterns in sound frequencies',
        '**Advanced Settings**: Can adjust epochs (training rounds) if needed',
      ],
    },
    {
      id: 'step-4-test',
      type: 'content',
      title: 'Step 4: Test Thoroughly 🧪',
      text: 'Make sure your model really works!',
      bulletPoints: [
        '**Live Testing**: Make each sound and watch predictions',
        '**Check Accuracy**: Should be 90%+ for each class',
        '**Try Edge Cases**: Quiet sounds, loud sounds, variations',
        '**If Wrong**: Add more examples of problematic sounds and retrain',
      ],
    },
    {
      id: 'quiz-2',
      type: 'quiz',
      quiz: {
        question: 'Your model confuses clapping with snapping. What should you do?',
        options: [
          'Accept that the model can\'t tell them apart',
          'Start completely over with a new project',
          'Record more varied examples of both clapping and snapping, then retrain',
          'Only use one of the sounds',
        ],
        correctAnswer: 2,
        explanation: 'When your model confuses similar sounds, record more diverse examples of both sounds from different volumes and styles. Then retrain - the model will learn the subtle differences!',
        hint: 'Remember: more quality data usually fixes accuracy problems!',
      },
    },
    {
      id: 'step-5-export',
      type: 'content',
      title: 'Step 5: Export & Share 🚀',
      text: 'Save your model and show it off!',
      bulletPoints: [
        '**Export Model**: Click "Export Model"',
        '**Choose Format**: Shareable link, download file, or embed code',
        '**Test Link**: Share with friends to try your classifier',
        '**Use In Projects**: Can integrate into Scratch, websites, or apps',
      ],
    },
    {
      id: 'challenge-ideas',
      type: 'content',
      title: 'Challenge Ideas 🏆',
      text: 'Want to level up? Try these advanced challenges!',
      bulletPoints: [
        '**Multi-Instrument Classifier**: Recognize 5+ different instruments',
        '**Voice Command Controller**: Control something with voice commands',
        '**Animal Sound Quiz**: Classify different animal sounds',
        '**Beat Detector**: Recognize different drum patterns',
        '**Language Detector**: Identify different spoken languages',
      ],
    },
    {
      id: 'quiz-3',
      type: 'quiz',
      quiz: {
        question: 'What have you learned about machine learning in this module?',
        options: [
          'It\'s only for professional programmers',
          'It requires expensive equipment',
          'Anyone can build ML models with the right tools and knowledge',
          'ML can\'t be used for creative projects',
        ],
        correctAnswer: 2,
        explanation: 'You\'ve proven that anyone - including kids - can build real ML models! With free tools like Teachable Machine and the knowledge you\'ve gained, you can create amazing projects!',
        hint: 'Think about what YOU just accomplished!',
      },
    },
    {
      id: 'next-steps',
      type: 'content',
      title: 'Your ML Learning Journey 🛤️',
      text: 'This is just the beginning! Here\'s how to continue learning:',
      bulletPoints: [
        '**Keep Experimenting**: Build more models with Teachable Machine',
        '**Learn Scratch ML**: ml4kids.net teaches ML with Scratch',
        '**Try Python**: Learn to code ML models from scratch',
        '**Join Communities**: Share projects and learn from others',
        '**Stay Curious**: ML is constantly evolving - keep exploring!',
      ],
    },
    {
      id: 'resources',
      type: 'content',
      title: 'Awesome Resources 📚',
      text: 'Continue your ML journey with these free resources!',
      bulletPoints: [
        '**Teachable Machine**: teachablemachine.withgoogle.com',
        '**ML for Kids**: machinelearningforkids.co.uk',
        '**Google AI Experiments**: experiments.withgoogle.com/collection/ai',
        '**YouTube Channels**: Crash Course AI, Code.org',
        '**Books**: "Hello World" by Hannah Fry, "AI for Kids" by Dale Lane',
      ],
    },
    {
      id: 'congratulations',
      type: 'content',
      title: 'You\'re an ML Builder! 🎓',
      text: 'You\'ve completed the Mini Machine Learning module!',
      bulletPoints: [
        '✅ Built real ML models (image + sound classifiers)',
        '✅ Understand how computers learn from data',
        '✅ Know supervised and unsupervised learning',
        '✅ Can improve model accuracy',
        '✅ Discovered ML applications everywhere',
        '✅ Ready to build your own ML projects!',
      ],
      funFact: 'You now know more about ML than 99% of people on Earth - use this power to create amazing things!',
    },
    {
      id: 'recap',
      type: 'recap',
      title: 'Module Complete! 🎉',
      bulletPoints: [
        'Built a sound classifier with Teachable Machine',
        'Applied all ML concepts: data, training, testing, improvement',
        'Learned about real-world ML applications',
        'Discovered resources for continued learning',
        'You\'re now an ML builder ready to create!',
      ],
    },
    {
      id: 'completion',
      type: 'completion',
      title: 'Module Complete! 🏆',
      text: 'Congratulations! You\'ve mastered the fundamentals of machine learning and built real working projects. The future of AI is in your hands - go build something amazing!',
    },
  ],
};

// ==================== EXPORTS ====================

export const mlMiniLessons = {
  '1': lesson1,
  '2': lesson2,
  '3': lesson3,
  '4': lesson4,
  '5': lesson5,
  '6': lesson6,
  '7': lesson7,
  '8': lesson8,
};

export function getMLMiniLesson(lessonId: string): MLMiniLesson | undefined {
  return mlMiniLessons[lessonId as keyof typeof mlMiniLessons];
}

// Export all lessons for module overview
export const getAllMLMiniLessons = (): MLMiniLesson[] => {
  return Object.values(mlMiniLessons);
};
