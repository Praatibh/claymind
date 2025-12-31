/**
 * AI Basics Module - Complete Lesson Content
 * Production-ready educational content for kids aged 8-16
 */

export interface LessonSlide {
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
  activity?: InteractiveActivity;
  tips?: string[];
  funFact?: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  hint?: string;
}

export interface InteractiveActivity {
  type: 'drag-drop' | 'matching' | 'fill-blank' | 'click-to-reveal';
  instruction: string;
  content: any;
}

export interface LessonMetadata {
  lessonId: string;
  moduleId: string;
  title: string;
  description: string;
  duration: string;
  learningObjectives: string[];
  prerequisites?: string[];
}

// ==================== LESSON 1: What is AI? ====================
export const lesson1: { metadata: LessonMetadata; slides: LessonSlide[] } = {
  metadata: {
    lessonId: '1',
    moduleId: 'ai-basics',
    title: 'What is AI?',
    description: 'Discover what Artificial Intelligence is and how it affects our daily lives',
    duration: '15 min',
    learningObjectives: [
      'Understand what Artificial Intelligence means',
      'Identify AI in everyday life',
      'Learn the difference between AI and regular programs',
    ],
  },
  slides: [
    {
      id: '1-intro',
      type: 'intro',
      title: '🤖 Welcome to AI Basics!',
      subtitle: 'Lesson 1: What is AI?',
      text: "Hey there, future AI expert! Ready to learn something super cool? Today we're going to discover what AI actually is and find it all around us! 🚀",
      tips: [
        'Keep an open mind - AI is everywhere!',
        'Think about technology you use daily',
        'Ask questions as you learn!',
      ],
    },
    {
      id: '1-content-1',
      type: 'content',
      title: '🧠 What Does AI Mean?',
      text: "AI stands for Artificial Intelligence. But what does that really mean?",
      bulletPoints: [
        '🤖 **Artificial** = Made by humans (not natural)',
        '🧠 **Intelligence** = Being smart and learning',
        '✨ **Together** = Smart computer programs that can learn!',
      ],
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop',
      funFact: '💡 Fun Fact: The term "Artificial Intelligence" was first used in 1956 - that\'s almost 70 years ago!',
    },
    {
      id: '1-content-2',
      type: 'content',
      title: '🎮 AI vs Regular Programs',
      text: "What makes AI different from a regular computer program?",
      bulletPoints: [
        '📱 **Regular Program**: Does exactly what it\'s told (like a calculator)',
        '🧠 **AI Program**: Can learn and improve (like a smart helper)',
        '🎯 **Example**: A calculator can\'t learn, but AI can learn your handwriting!',
      ],
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=500&fit=crop',
    },
    {
      id: '1-video-1',
      type: 'video',
      title: '📹 How AI Works - Simple Explanation',
      videoTitle: 'What is Artificial Intelligence?',
      videoUrl: 'https://www.youtube.com/embed/2ePf9rue1Ao',
      videoDuration: '5:23',
      text: 'Watch this awesome video to see AI explained in a fun way!',
    },
    {
      id: '1-quiz-1',
      type: 'quiz',
      quiz: {
        question: '🤔 What does the "I" in AI stand for?',
        options: [
          'Internet',
          'Intelligence',
          'Information',
          'Incredible',
        ],
        correctAnswer: 1,
        explanation: '🎯 Perfect! The "I" stands for Intelligence! AI is all about making computers smart and able to learn, just like we do!',
        hint: 'Think about being smart and learning new things...',
      },
    },
    {
      id: '1-content-3',
      type: 'content',
      title: '🌟 AI in Your Daily Life',
      text: "You probably use AI every single day without even realizing it! Let's find where:",
      bulletPoints: [
        '📱 **Your Phone**: Voice assistants like Siri or Google Assistant',
        '🎮 **Video Games**: Characters that play against you',
        '🎬 **Netflix/YouTube**: Recommendations for what to watch next',
        '📸 **Camera**: Face detection and filters on Snapchat/Instagram',
        '🎵 **Spotify**: Music suggestions based on what you like',
        '🚗 **GPS**: Finding the best route and avoiding traffic',
      ],
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=500&fit=crop',
    },
    {
      id: '1-quiz-2',
      type: 'quiz',
      quiz: {
        question: '🎯 Which of these uses AI?',
        options: [
          'A pencil',
          'A paper notebook',
          'Netflix movie recommendations',
          'A wooden table',
        ],
        correctAnswer: 2,
        explanation: '🌟 Awesome! Netflix uses AI to learn what movies you like and suggest new ones you might enjoy. That\'s AI learning about your preferences!',
        hint: 'Which one can learn what you like?',
      },
    },
    {
      id: '1-content-4',
      type: 'content',
      title: '🎯 The Three Types of AI',
      text: "There are different types of AI. Let's learn about them:",
      bulletPoints: [
        '👶 **Narrow AI** (Weak AI): Good at ONE specific task (like Siri answering questions)',
        '🧠 **General AI** (Strong AI): Smart like humans at MANY tasks (doesn\'t exist yet!)',
        '🚀 **Super AI**: Smarter than humans (only in movies for now!)',
      ],
      funFact: '🎬 The AI you see in movies like WALL-E or Iron Man\'s JARVIS is General or Super AI - we\'re not there yet!',
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=500&fit=crop',
    },
    {
      id: '1-quiz-3',
      type: 'quiz',
      quiz: {
        question: '💭 What type of AI exists in the real world today?',
        options: [
          'Super AI (smarter than humans)',
          'General AI (smart at everything)',
          'Narrow AI (good at one task)',
          'None - AI doesn\'t exist',
        ],
        correctAnswer: 2,
        explanation: '🎉 Exactly right! We have Narrow AI today - programs that are really good at specific tasks like recognizing faces or playing chess. General and Super AI don\'t exist yet!',
        hint: 'Think about what we actually have today, not in movies!',
      },
    },
    {
      id: '1-recap',
      type: 'recap',
      title: '📚 What We Learned Today',
      subtitle: 'Quick Recap',
      bulletPoints: [
        '✅ AI = Artificial Intelligence (smart computer programs)',
        '✅ AI can learn and improve, unlike regular programs',
        '✅ AI is everywhere in our daily lives (phones, games, apps)',
        '✅ Today we have Narrow AI (good at specific tasks)',
        '✅ General and Super AI don\'t exist yet',
      ],
      funFact: '🎊 Great job! You now know more about AI than most adults!',
    },
    {
      id: '1-completion',
      type: 'completion',
      title: '🎉 Lesson 1 Complete!',
      text: "Amazing work, AI Explorer! You've learned what AI is and where to find it in your daily life. You're officially on your way to becoming an AI expert! 🚀",
      bulletPoints: [
        '⭐ You earned +50 XP',
        '🏆 Unlocked: "AI Basics Beginner" badge',
        '📖 Next: Learn how AI actually learns!',
      ],
    },
  ],
};

// ==================== LESSON 2: How Does AI Learn? ====================
export const lesson2: { metadata: LessonMetadata; slides: LessonSlide[] } = {
  metadata: {
    lessonId: '2',
    moduleId: 'ai-basics',
    title: 'How Does AI Learn?',
    description: 'Discover how AI learns from examples and gets smarter over time',
    duration: '20 min',
    learningObjectives: [
      'Understand machine learning basics',
      'Learn about training data',
      'See real examples of AI learning',
    ],
    prerequisites: ['Lesson 1: What is AI?'],
  },
  slides: [
    {
      id: '2-intro',
      type: 'intro',
      title: '🎓 How Does AI Learn?',
      subtitle: 'Lesson 2: Machine Learning',
      text: "Welcome back, AI Explorer! Today we're going to discover the coolest part about AI - how it actually learns! It's kind of like how you learn, but different. Let's dive in! 🌊",
    },
    {
      id: '2-content-1',
      type: 'content',
      title: '🧠 Learning Like You!',
      text: "Think about how YOU learned to recognize a cat:",
      bulletPoints: [
        '👀 Someone showed you pictures of cats',
        '🐱 You learned: pointy ears, whiskers, tail, says "meow"',
        '🎯 Now you can spot a cat anywhere!',
        '✨ AI learns the same way - from examples!',
      ],
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&h=500&fit=crop',
      funFact: '🐱 Fun Fact: An AI called "Cat Recognition" was trained with 10 MILLION YouTube videos to learn what cats look like!',
    },
    {
      id: '2-content-2',
      type: 'content',
      title: '📊 What is Machine Learning?',
      text: "Machine Learning (ML) is how AI gets smart:",
      bulletPoints: [
        '📚 **Step 1**: Show AI lots of examples (training data)',
        '🧠 **Step 2**: AI finds patterns in the examples',
        '🎯 **Step 3**: AI uses patterns to make predictions',
        '✅ **Step 4**: AI gets better with more examples!',
      ],
      image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&h=500&fit=crop',
    },
    {
      id: '2-video-1',
      type: 'video',
      title: '📹 Machine Learning Explained',
      videoTitle: 'How Machines Learn',
      videoUrl: 'https://www.youtube.com/embed/f_uwKZIAeM0',
      videoDuration: '7:35',
      text: 'Watch this cool video to see how machines actually learn!',
    },
    {
      id: '2-quiz-1',
      type: 'quiz',
      quiz: {
        question: '🎯 How does AI learn to recognize things?',
        options: [
          'Someone programs every single detail',
          'It learns from looking at many examples',
          'It guesses randomly',
          'It asks other computers',
        ],
        correctAnswer: 1,
        explanation: '🌟 Perfect! AI learns by looking at MANY examples and finding patterns, just like how you learned to recognize things when you were little!',
        hint: 'Think about how you learned to recognize cats or dogs...',
      },
    },
    {
      id: '2-content-3',
      type: 'content',
      title: '📦 Training Data is the Secret!',
      text: "Training data is like AI's textbook. The more and better the data, the smarter the AI!",
      bulletPoints: [
        '📸 **For Face Recognition**: Thousands of face photos',
        '🎵 **For Music Recommendations**: Millions of song plays',
        '🗣️ **For Voice Assistants**: Hours of people talking',
        '🎮 **For Game AI**: Thousands of game matches',
      ],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
      funFact: '📊 Fun Fact: Modern AI needs MILLIONS of examples to get really good at something!',
    },
    {
      id: '2-quiz-2',
      type: 'quiz',
      quiz: {
        question: '💭 What do we call the examples AI learns from?',
        options: [
          'Learning books',
          'Training data',
          'Smart files',
          'Example pages',
        ],
        correctAnswer: 1,
        explanation: '🎊 Excellent! We call them "training data" - they\'re like textbooks for AI. The AI studies these examples to learn patterns!',
      },
    },
    {
      id: '2-content-4',
      type: 'content',
      title: '🎯 Types of Machine Learning',
      text: "There are three main ways AI can learn:",
      bulletPoints: [
        '📝 **Supervised Learning**: Learning with a teacher (labeled examples)',
        '🔍 **Unsupervised Learning**: Finding patterns on its own (no labels)',
        '🎮 **Reinforcement Learning**: Learning by trial and error (like games)',
      ],
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=500&fit=crop',
    },
    {
      id: '2-quiz-3',
      type: 'quiz',
      quiz: {
        question: '🤔 When AI learns by playing a game over and over, getting better each time, what type of learning is that?',
        options: [
          'Supervised Learning',
          'Unsupervised Learning',
          'Reinforcement Learning',
          'Video Game Learning',
        ],
        correctAnswer: 2,
        explanation: '🎮 Awesome! That\'s Reinforcement Learning! The AI plays the game, makes mistakes, learns from them, and gets better - just like you do when practicing a video game!',
      },
    },
    {
      id: '2-recap',
      type: 'recap',
      title: '📚 What We Learned Today',
      bulletPoints: [
        '✅ AI learns from examples (training data)',
        '✅ Machine Learning = how AI gets smarter',
        '✅ More good examples = smarter AI',
        '✅ Three types: Supervised, Unsupervised, Reinforcement',
        '✅ AI improves with practice, like you!',
      ],
    },
    {
      id: '2-completion',
      type: 'completion',
      title: '🎉 Lesson 2 Complete!',
      text: "Incredible work! You now understand how AI learns - that's a pretty advanced topic! You're becoming a real AI expert! 🌟",
      bulletPoints: [
        '⭐ You earned +50 XP',
        '🏆 Unlocked: "Machine Learning Master" badge',
        '📖 Next: Discover different types of AI!',
      ],
    },
  ],
};

// ==================== LESSON 3: Types of AI ====================
export const lesson3: { metadata: LessonMetadata; slides: LessonSlide[] } = {
  metadata: {
    lessonId: '3',
    moduleId: 'ai-basics',
    title: 'Types of AI',
    description: 'Explore different types of AI and what they can do',
    duration: '18 min',
    learningObjectives: [
      'Learn about different AI categories',
      'Understand computer vision and NLP',
      'Discover real-world AI applications',
    ],
  },
  slides: [
    {
      id: '3-intro',
      type: 'intro',
      title: '🎨 Types of AI',
      subtitle: 'Lesson 3: Different AI Superpowers',
      text: 'Hey AI Explorer! Just like superheroes have different powers, AI has different abilities too! Let\'s discover what kinds of AI exist! 🦸',
    },
    {
      id: '3-content-1',
      type: 'content',
      title: '👁️ Computer Vision AI',
      text: 'AI that can "see" and understand images and videos:',
      bulletPoints: [
        '📸 **Face Recognition**: Unlocking your phone with your face',
        '🚗 **Self-Driving Cars**: Seeing roads, signs, and pedestrians',
        '📱 **Snapchat Filters**: Detecting your face to add effects',
        '🏥 **Medical Imaging**: Helping doctors spot diseases in X-rays',
      ],
      image: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=800&h=500&fit=crop',
      funFact: '👀 Computer Vision AI can now recognize faces better than humans!',
    },
    {
      id: '3-quiz-1',
      type: 'quiz',
      quiz: {
        question: '🎯 What type of AI helps your phone unlock with your face?',
        options: ['Voice AI', 'Computer Vision AI', 'Text AI', 'Music AI'],
        correctAnswer: 1,
        explanation: '📸 Perfect! Computer Vision AI can "see" your face and recognize it\'s you!',
      },
    },
    {
      id: '3-content-2',
      type: 'content',
      title: '🗣️ Natural Language Processing (NLP)',
      text: 'AI that understands and creates human language:',
      bulletPoints: [
        '🎤 **Voice Assistants**: Siri, Alexa, Google Assistant',
        '🌍 **Translation**: Google Translate converting languages',
        '📝 **Auto-complete**: Gmail suggesting how to finish your sentences',
        '💬 **Chatbots**: Helpful bots answering questions on websites',
      ],
      image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=800&h=500&fit=crop',
    },
    {
      id: '3-quiz-2',
      type: 'quiz',
      quiz: {
        question: '💭 Which AI type helps Siri understand what you say?',
        options: ['Computer Vision', 'Natural Language Processing', 'Robotics AI', 'Game AI'],
        correctAnswer: 1,
        explanation: '🗣️ Yes! Natural Language Processing (NLP) helps AI understand human speech and text!',
      },
    },
    {
      id: '3-recap',
      type: 'recap',
      title: '📚 Quick Recap',
      bulletPoints: [
        '✅ Computer Vision AI can "see" images and videos',
        '✅ NLP AI understands and creates language',
        '✅ Different AIs have different superpowers',
        '✅ AI is used in phones, cars, games, and more!',
      ],
    },
    {
      id: '3-completion',
      type: 'completion',
      title: '🎉 Lesson 3 Complete!',
      text: 'Fantastic! You can now identify different types of AI! 🌟',
      bulletPoints: ['⭐ +50 XP earned', '🏆 Badge: "AI Type Expert"'],
    },
  ],
};

// ==================== LESSON 4: AI Ethics & Safety ====================
export const lesson4: { metadata: LessonMetadata; slides: LessonSlide[] } = {
  metadata: {
    lessonId: '4',
    moduleId: 'ai-basics',
    title: 'AI Ethics & Safety',
    description: 'Learn about responsible AI use and important safety concepts',
    duration: '16 min',
    learningObjectives: [
      'Understand AI bias and fairness',
      'Learn about privacy in AI',
      'Discover responsible AI use',
    ],
  },
  slides: [
    {
      id: '4-intro',
      type: 'intro',
      title: '🛡️ AI Ethics & Safety',
      subtitle: 'Lesson 4: Using AI Responsibly',
      text: 'Welcome back! Today we\'re learning something super important - how to use AI responsibly and safely! 🌟',
    },
    {
      id: '4-content-1',
      type: 'content',
      title: '⚖️ What is AI Bias?',
      text: 'AI can sometimes be unfair without meaning to be:',
      bulletPoints: [
        '📊 **Training Data**: If AI learns from biased examples, it becomes biased',
        '👥 **Example**: Face recognition working better for some people than others',
        '🎯 **Solution**: Use diverse, fair training data',
        '✅ **Your Role**: Notice and report unfair AI',
      ],
      image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&h=500&fit=crop',
    },
    {
      id: '4-quiz-1',
      type: 'quiz',
      quiz: {
        question: '🤔 What causes AI bias?',
        options: [
          'AI being mean on purpose',
          'Learning from biased training data',
          'Having too much data',
          'Being too smart',
        ],
        correctAnswer: 1,
        explanation: '⚖️ Exactly! AI learns from its training data, so if that data is biased, the AI becomes biased too!',
      },
    },
    {
      id: '4-content-2',
      type: 'content',
      title: '🔒 Privacy Matters!',
      text: 'AI often uses personal data, so privacy is important:',
      bulletPoints: [
        '🔐 **Your Data**: Photos, voice, location, preferences',
        '👀 **Who Sees It**: Know what data AI collects',
        '⚙️ **Settings**: Check privacy settings on apps',
        '✋ **Say No**: You can refuse to share data!',
      ],
      funFact: '🔒 Always ask an adult before sharing personal information online!',
    },
    {
      id: '4-recap',
      type: 'recap',
      title: '📚 Remember',
      bulletPoints: [
        '✅ AI can have bias from training data',
        '✅ Privacy is important - protect your data',
        '✅ Always use AI responsibly',
        '✅ Ask adults when unsure about AI safety',
      ],
    },
    {
      id: '4-completion',
      type: 'completion',
      title: '🎉 Lesson 4 Complete!',
      text: 'Great job learning about AI responsibility! 🛡️',
      bulletPoints: ['⭐ +50 XP', '🏆 Badge: "Responsible AI User"'],
    },
  ],
};

// ==================== LESSON 5: Neural Networks Basics ====================
export const lesson5: { metadata: LessonMetadata; slides: LessonSlide[] } = {
  metadata: {
    lessonId: '5',
    moduleId: 'ai-basics',
    title: 'Neural Networks Basics',
    description: 'Learn how AI brains work with neural networks',
    duration: '20 min',
    learningObjectives: [
      'Understand what neural networks are',
      'Learn how layers and connections work',
      'See real-world neural network examples',
      'Discover how your brain and AI are similar',
    ],
    prerequisites: ['Lesson 2: How Does AI Learn?'],
  },
  slides: [
    {
      id: '5-intro',
      type: 'intro',
      title: '🧠 Neural Networks',
      subtitle: 'Lesson 5: AI\'s Brain Power',
      text: 'Welcome back, AI Expert! Today we\'re going to peek inside AI\'s "brain" - neural networks! Get ready to discover how AI thinks! 🚀',
      tips: [
        'Think about how your own brain works',
        'Neural networks are inspired by real brains!',
        'Don\'t worry if it seems complex - we\'ll make it fun!',
      ],
    },
    {
      id: '5-content-1',
      type: 'content',
      title: '🧠 What is a Neural Network?',
      text: 'A neural network is like an artificial brain made for computers!',
      bulletPoints: [
        '🧑 **Your Brain**: Has billions of connected nerve cells (neurons)',
        '🤖 **AI Brain**: Has artificial "neurons" connected in layers',
        '⚡ **How They Work**: Information flows through connections',
        '🎯 **The Goal**: Process information and make smart decisions',
      ],
      image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&h=500&fit=crop',
      funFact: '🧠 Fun Fact: Your brain has about 86 BILLION neurons! AI neural networks usually have thousands to millions.',
    },
    {
      id: '5-content-2',
      type: 'content',
      title: '🔗 Neurons and Connections',
      text: 'Let\'s understand the building blocks of neural networks:',
      bulletPoints: [
        '🔵 **Neuron**: Like a tiny calculator that processes information',
        '➡️ **Connection**: Links neurons together (like wires)',
        '⚖️ **Weight**: How strong each connection is (important or not)',
        '🎯 **Signal**: Information traveling through the network',
      ],
      image: 'https://images.unsplash.com/photo-1620825937374-87fc7d6bddc2?w=800&h=500&fit=crop',
      funFact: '💡 Each connection has a "weight" - the network learns by adjusting these weights!',
    },
    {
      id: '5-video-1',
      type: 'video',
      title: '📹 See a Neural Network in Action',
      videoTitle: 'Neural Networks Explained',
      videoUrl: 'https://www.youtube.com/embed/aircAruvnKk',
      videoDuration: '7:12',
      text: 'Watch this awesome visualization of how neural networks work!',
    },
    {
      id: '5-quiz-1',
      type: 'quiz',
      quiz: {
        question: '🤔 What inspired the creation of neural networks?',
        options: [
          'Computer chips',
          'The human brain',
          'Video games',
          'The internet',
        ],
        correctAnswer: 1,
        explanation: '🧠 Perfect! Neural networks are inspired by how our brains work with billions of connected neurons!',
        hint: 'Think about what has neurons...',
      },
    },
    {
      id: '5-content-3',
      type: 'content',
      title: '📊 Layers: The Network Structure',
      text: 'Neural networks are organized in layers, like a sandwich!',
      bulletPoints: [
        '🎯 **Input Layer**: Where data enters (like your eyes seeing)',
        '🔀 **Hidden Layers**: Where the magic happens (thinking)',
        '🎁 **Output Layer**: The final answer (decision)',
        '🔄 **Deep Learning**: Many hidden layers = "deep" neural network',
      ],
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop',
    },
    {
      id: '5-quiz-2',
      type: 'quiz',
      quiz: {
        question: '🎯 What do we call a neural network with many hidden layers?',
        options: [
          'Tall Network',
          'Big Network',
          'Deep Learning',
          'Strong Network',
        ],
        correctAnswer: 2,
        explanation: '🌟 Awesome! When a neural network has many hidden layers, we call it "Deep Learning" - that\'s where the term comes from!',
        hint: 'Think about going deeper...',
      },
    },
    {
      id: '5-content-4',
      type: 'content',
      title: '🎨 How Information Flows',
      text: 'Let\'s follow information through a neural network:',
      bulletPoints: [
        '1️⃣ **Input**: Data goes in (like a picture of a cat)',
        '2️⃣ **Processing**: Each layer transforms the data',
        '3️⃣ **Learning**: Network adjusts its connections',
        '4️⃣ **Output**: Final answer comes out ("It\'s a cat!")',
      ],
      funFact: '⚡ All this happens in milliseconds - faster than you can blink!',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop',
    },
    {
      id: '5-content-5',
      type: 'content',
      title: '🌟 Real-World Neural Networks',
      text: 'Neural networks power amazing things you use every day:',
      bulletPoints: [
        '📸 **Face Recognition**: Your phone unlocking with your face',
        '🗣️ **Voice Assistants**: Siri and Alexa understanding you',
        '🚗 **Self-Driving Cars**: Seeing and navigating roads',
        '🎮 **Game AI**: Characters that act smart in games',
        '🎨 **Art Creation**: AI making pictures from text descriptions',
        '🌐 **Translation**: Converting languages instantly',
      ],
      image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=500&fit=crop',
    },
    {
      id: '5-quiz-3',
      type: 'quiz',
      quiz: {
        question: '💭 Which part of a neural network receives the input data first?',
        options: [
          'Output Layer',
          'Hidden Layer',
          'Input Layer',
          'Middle Layer',
        ],
        correctAnswer: 2,
        explanation: '🎯 Exactly! The Input Layer is like the front door - it\'s where data enters the neural network!',
        hint: 'Where does something enter first?',
      },
    },
    {
      id: '5-content-6',
      type: 'content',
      title: '🎓 Training a Neural Network',
      text: 'How does a neural network learn to be smart?',
      bulletPoints: [
        '📚 **Show Examples**: Give it thousands of labeled examples',
        '🎯 **Make Predictions**: Network tries to guess the answer',
        '❌ **Check Mistakes**: Compare guess to correct answer',
        '🔧 **Adjust Weights**: Change connections to do better',
        '🔄 **Repeat**: Do this millions of times to get really good!',
      ],
      funFact: '🎮 It\'s like practicing a video game - you get better by trying, failing, and learning!',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=500&fit=crop',
    },
    {
      id: '5-recap',
      type: 'recap',
      title: '📚 What We Learned About Neural Networks',
      subtitle: 'Quick Recap',
      bulletPoints: [
        '✅ Neural networks are inspired by the human brain',
        '✅ Made of connected neurons organized in layers',
        '✅ Input Layer → Hidden Layers → Output Layer',
        '✅ Learn by adjusting connection weights',
        '✅ Power face recognition, voice assistants, and more!',
        '✅ Deep Learning = many hidden layers',
      ],
      funFact: '🎊 You now understand the "brain" behind modern AI!',
    },
    {
      id: '5-completion',
      type: 'completion',
      title: '🎉 Lesson 5 Complete!',
      text: 'WOW! You just learned about neural networks - that\'s advanced AI knowledge! You\'re becoming a true AI expert! 🌟',
      bulletPoints: [
        '⭐ You earned +50 XP',
        '🏆 Unlocked: "Neural Network Ninja" badge',
        '🧠 You understand how AI "thinks"!',
        '📖 Next: Discover AI in games and entertainment!',
      ],
    },
  ],
};

// ==================== LESSON 6: AI in Games & Entertainment ====================
export const lesson6: { metadata: LessonMetadata; slides: LessonSlide[] } = {
  metadata: {
    lessonId: '6',
    moduleId: 'ai-basics',
    title: 'AI in Games & Entertainment',
    description: 'Discover how AI makes games fun and creates amazing art and music',
    duration: '18 min',
    learningObjectives: [
      'Learn how AI powers video games',
      'Discover AI-generated art and music',
      'Understand recommendation systems',
      'See fun AI projects you can try',
    ],
  },
  slides: [
    {
      id: '6-intro',
      type: 'intro',
      title: '🎮 AI in Games & Entertainment',
      subtitle: 'Lesson 6: Where AI Gets Fun!',
      text: 'Hey there, Gaming Genius! Ready to discover how AI makes games awesome and creates cool art and music? This is going to be FUN! 🎨🎵',
      tips: [
        'Think about your favorite games and shows',
        'AI makes entertainment smarter and more fun!',
        'You might be using AI without knowing it!',
      ],
    },
    {
      id: '6-content-1',
      type: 'content',
      title: '🎮 AI in Video Games',
      text: 'AI makes video games exciting and challenging! Here\'s how:',
      bulletPoints: [
        '🤖 **NPC Behavior**: Non-player characters that act smart and realistic',
        '⚔️ **Enemy AI**: Opponents that learn your strategy and adapt',
        '🎯 **Difficulty Adjustment**: Game gets easier or harder based on your skill',
        '🗺️ **Procedural Generation**: AI creates unique levels and worlds',
        '🎭 **Realistic Characters**: NPCs with emotions and personalities',
      ],
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=500&fit=crop',
      funFact: '🎮 Fun Fact: In racing games, the AI "rubber-banding" keeps races exciting by making opponents faster when you\'re ahead!',
    },
    {
      id: '6-quiz-1',
      type: 'quiz',
      quiz: {
        question: '🤔 What does NPC stand for in games?',
        options: [
          'New Player Character',
          'Non-Player Character',
          'Never Play Cool',
          'Next Player Comes',
        ],
        correctAnswer: 1,
        explanation: '🎯 Perfect! NPC means Non-Player Character - these are characters controlled by AI, not by human players!',
        hint: 'Think about characters you don\'t control...',
      },
    },
    {
      id: '6-content-2',
      type: 'content',
      title: '🎬 Recommendation Systems',
      text: 'AI helps you discover content you\'ll love:',
      bulletPoints: [
        '📺 **Netflix/YouTube**: Suggests shows and videos you might like',
        '🎵 **Spotify/Apple Music**: Creates playlists based on your taste',
        '🎮 **Steam/Epic Games**: Recommends games similar to ones you enjoy',
        '📱 **TikTok/Instagram**: Shows content matched to your interests',
        '🤖 **How It Works**: AI learns what you like and finds similar content',
      ],
      image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&h=500&fit=crop',
      funFact: '📊 Netflix saves $1 BILLION per year thanks to AI recommendations keeping viewers happy!',
    },
    {
      id: '6-video-1',
      type: 'video',
      title: '📹 How Game AI Works',
      videoTitle: 'AI in Video Games',
      videoUrl: 'https://www.youtube.com/embed/6ijCjfwZvkA',
      videoDuration: '6:45',
      text: 'Watch how AI creates smart enemies and exciting gameplay!',
    },
    {
      id: '6-content-3',
      type: 'content',
      title: '🎨 AI Creates Art!',
      text: 'AI can now create stunning artwork and images:',
      bulletPoints: [
        '🖼️ **AI Art Generators**: DALL-E, Midjourney, Stable Diffusion',
        '✍️ **Text to Image**: Type a description, AI draws it!',
        '🎭 **Art Styles**: AI can mimic famous artists or create new styles',
        '🌈 **Endless Creativity**: Generate thousands of unique images',
        '🎨 **Example**: "A cat astronaut on Mars" → AI creates it!',
      ],
      image: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&h=500&fit=crop',
      funFact: '🏆 AI-generated art has won art competitions - some people didn\'t even know it was made by AI!',
    },
    {
      id: '6-quiz-2',
      type: 'quiz',
      quiz: {
        question: '🎨 How do AI art generators like DALL-E work?',
        options: [
          'They copy images from the internet',
          'Artists draw everything manually',
          'They generate images from text descriptions',
          'They use magic',
        ],
        correctAnswer: 2,
        explanation: '🎨 Awesome! AI art generators create brand new images based on text descriptions you give them - it\'s like having an instant artist!',
        hint: 'Think about what you give the AI...',
      },
    },
    {
      id: '6-content-4',
      type: 'content',
      title: '🎵 AI Makes Music Too!',
      text: 'AI is getting creative with music and sound:',
      bulletPoints: [
        '🎹 **AI Composers**: Create original music in any style',
        '🎤 **Voice Synthesis**: Make realistic singing voices',
        '🎧 **Beat Matching**: DJ apps that mix songs perfectly',
        '🎼 **Music Generation**: Tools like Amper, AIVA, Boomy',
        '🎵 **Example**: Ask AI for "upbeat pop music" → instant song!',
      ],
      image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=500&fit=crop',
      funFact: '🎼 AI has composed music for commercials, games, and even movies!',
    },
    {
      id: '6-content-5',
      type: 'content',
      title: '🚀 Fun AI Projects You Can Try!',
      text: 'Here are awesome AI projects perfect for kids:',
      bulletPoints: [
        '🎨 **Draw with AI**: Try Google Quick Draw or AutoDraw',
        '🎵 **Make Music**: Use Chrome Music Lab experiments',
        '🗣️ **Talk to AI**: Chat with AI assistants and learn',
        '📸 **AI Filters**: Create fun effects on photos',
        '🎮 **Teachable Machine**: Train AI to recognize images/sounds',
        '🤖 **Scratch AI**: Make AI games with Scratch programming',
      ],
      funFact: '💡 You can start learning AI with free tools right now - no coding required!',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=500&fit=crop',
    },
    {
      id: '6-content-6',
      type: 'content',
      title: '🎯 AI in Movies & Shows',
      text: 'Hollywood uses AI in amazing ways:',
      bulletPoints: [
        '🎬 **Special Effects**: Creating realistic CGI characters',
        '🎭 **Face Replacement**: De-aging actors or digital stunt doubles',
        '📝 **Script Analysis**: AI predicts if a movie will be successful',
        '🎞️ **Video Editing**: AI helps edit footage faster',
        '🌟 **Animation**: AI makes character movements more realistic',
      ],
      image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=500&fit=crop',
      funFact: '🎥 Marvel uses AI to de-age actors in movies - that\'s how they made young versions of characters!',
    },
    {
      id: '6-recap',
      type: 'recap',
      title: '📚 What We Learned',
      subtitle: 'Entertainment & AI Recap',
      bulletPoints: [
        '✅ AI makes game NPCs smart and adaptive',
        '✅ Recommendation AI suggests content you\'ll like',
        '✅ AI generates art from text descriptions',
        '✅ AI composes original music and songs',
        '✅ Lots of fun AI tools you can try yourself!',
        '✅ Hollywood uses AI for effects and editing',
      ],
      funFact: '🎊 AI is making entertainment more personalized and creative than ever!',
    },
    {
      id: '6-completion',
      type: 'completion',
      title: '🎉 Lesson 6 Complete!',
      text: 'Amazing! You now know how AI powers your favorite games, music, and shows! Ready to try some AI projects yourself? 🚀',
      bulletPoints: [
        '⭐ You earned +50 XP',
        '🏆 Unlocked: "Entertainment AI Expert" badge',
        '🎮 You understand AI in gaming!',
        '🎨 You know about AI creativity!',
        '📖 Next: Explore AI careers and the future!',
      ],
    },
  ],
};

// ==================== LESSON 7: AI Careers & Future ====================
export const lesson7: { metadata: LessonMetadata; slides: LessonSlide[] } = {
  metadata: {
    lessonId: '7',
    moduleId: 'ai-basics',
    title: 'AI Careers & Future',
    description: 'Explore exciting AI career paths and what the future holds',
    duration: '16 min',
    learningObjectives: [
      'Discover different AI career opportunities',
      'Learn skills needed for AI jobs',
      'Understand the future of AI',
      'Get inspired by young AI innovators',
    ],
  },
  slides: [
    {
      id: '7-intro',
      type: 'intro',
      title: '🚀 AI Careers & Future',
      subtitle: 'Lesson 7: Your Future in AI',
      text: 'Hey Future AI Leader! Ever wonder what job you might have when you grow up? AI is creating amazing new careers - let\'s explore them! 🌟',
      tips: [
        'AI jobs are some of the fastest-growing careers!',
        'You can start learning AI skills right now',
        'The future is full of AI opportunities!',
      ],
    },
    {
      id: '7-content-1',
      type: 'content',
      title: '💼 Cool Jobs in AI',
      text: 'Check out these awesome AI careers:',
      bulletPoints: [
        '🤖 **Machine Learning Engineer**: Build and train AI models',
        '📊 **Data Scientist**: Find patterns in huge amounts of data',
        '🎨 **AI Designer**: Create AI products people love to use',
        '🔬 **AI Researcher**: Discover new AI technologies',
        '⚖️ **AI Ethics Specialist**: Make sure AI is fair and safe',
        '🎮 **AI Game Developer**: Create smart game characters',
      ],
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=500&fit=crop',
      funFact: '💰 AI jobs are among the highest-paying careers in the world!',
    },
    {
      id: '7-quiz-1',
      type: 'quiz',
      quiz: {
        question: '🤔 What does a Machine Learning Engineer do?',
        options: [
          'Fix broken machines',
          'Build and train AI models',
          'Drive trains',
          'Make video games',
        ],
        correctAnswer: 1,
        explanation: '🎯 Perfect! Machine Learning Engineers build and train AI models - they teach computers to be smart!',
        hint: 'Think about what machine learning is...',
      },
    },
    {
      id: '7-content-2',
      type: 'content',
      title: '🎯 Skills You Need for AI',
      text: 'Here are the superpowers that help in AI careers:',
      bulletPoints: [
        '💻 **Programming**: Python, JavaScript (you can start learning now!)',
        '🧮 **Math & Logic**: Understanding patterns and problem-solving',
        '🧠 **Critical Thinking**: Asking questions and finding solutions',
        '🎨 **Creativity**: Thinking of new ways to use AI',
        '🤝 **Teamwork**: Working with others on big projects',
        '📚 **Curiosity**: Always wanting to learn new things!',
      ],
      funFact: '📖 Good news: You don\'t need to be perfect at math to work in AI!',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=500&fit=crop',
    },
    {
      id: '7-content-3',
      type: 'content',
      title: '🌟 Young AI Innovators',
      text: 'Kids like you are already making a difference in AI!',
      bulletPoints: [
        '👧 **Gitanjali Rao** (15): Used AI to detect lead in water - named TIME Kid of the Year',
        '👦 **Tanmay Bakshi** (14): IBM\'s youngest AI developer, taught AI worldwide',
        '👧 **Samaira Mehta** (10): Created board game to teach coding, spoke at Google',
        '👦 **Rishab Jain** (13): Used AI to improve pancreatic cancer treatment',
        '💡 **You Can Too**: Age is just a number in tech!',
      ],
      funFact: '🏆 Many successful AI developers started coding between ages 8-12!',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=500&fit=crop',
    },
    {
      id: '7-video-1',
      type: 'video',
      title: '📹 Future of AI',
      videoTitle: 'What Will AI Look Like in the Future?',
      videoUrl: 'https://www.youtube.com/embed/uDl90oQ-ts8',
      videoDuration: '5:30',
      text: 'Watch this inspiring video about the future of AI!',
    },
    {
      id: '7-quiz-2',
      type: 'quiz',
      quiz: {
        question: '💭 Which skill is MOST important for AI careers?',
        options: [
          'Being good at every subject',
          'Curiosity and love of learning',
          'Having expensive equipment',
          'Being the smartest person',
        ],
        correctAnswer: 1,
        explanation: '🌟 Yes! Curiosity and loving to learn are the most important! AI changes fast, so being excited to keep learning is key!',
        hint: 'Think about what helps you learn anything...',
      },
    },
    {
      id: '7-content-4',
      type: 'content',
      title: '🔮 The Future of AI',
      text: 'What will AI look like in the future? Here are predictions:',
      bulletPoints: [
        '🏥 **Healthcare**: AI diagnosing diseases earlier and more accurately',
        '🌍 **Climate Change**: AI helping solve environmental problems',
        '🚗 **Transportation**: Self-driving cars and flying taxis',
        '🎓 **Education**: AI tutors personalized to how YOU learn',
        '🏠 **Smart Homes**: Houses that understand and help you',
        '🚀 **Space**: AI helping us explore other planets!',
      ],
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=500&fit=crop',
      funFact: '🌌 NASA uses AI to search for planets that might have life!',
    },
    {
      id: '7-content-5',
      type: 'content',
      title: '🎓 How to Prepare NOW',
      text: 'You can start your AI journey today! Here\'s how:',
      bulletPoints: [
        '💻 **Start Coding**: Try Scratch, Python, or block-based coding',
        '📚 **Take Courses**: Free resources like Code.org, Khan Academy',
        '🎮 **Build Projects**: Make simple games or apps',
        '🤖 **Experiment**: Use tools like Teachable Machine, AI Dungeon',
        '📖 **Read & Watch**: Learn about AI through videos and articles',
        '🌟 **Stay Curious**: Ask questions and never stop learning!',
      ],
      funFact: '💡 This course you\'re taking right now is your first step into AI!',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=500&fit=crop',
    },
    {
      id: '7-recap',
      type: 'recap',
      title: '📚 Career & Future Recap',
      bulletPoints: [
        '✅ AI offers exciting, high-paying career opportunities',
        '✅ Key skills: Programming, math, creativity, curiosity',
        '✅ Kids are already making big impacts in AI',
        '✅ Future AI will help solve global challenges',
        '✅ You can start learning AI right now!',
        '✅ Stay curious and keep learning!',
      ],
    },
    {
      id: '7-completion',
      type: 'completion',
      title: '🎉 Lesson 7 Complete!',
      text: 'Incredible! You now know about the amazing opportunities waiting for you in AI! The future is yours to create! 🚀',
      bulletPoints: [
        '⭐ You earned +50 XP',
        '🏆 Unlocked: "Future AI Leader" badge',
        '💼 You know about AI careers!',
        '🔮 You understand AI\'s future!',
        '📖 Final lesson next: Build your first AI project!',
      ],
    },
  ],
};

// ==================== LESSON 8: Build Your First AI Project ====================
export const lesson8: { metadata: LessonMetadata; slides: LessonSlide[] } = {
  metadata: {
    lessonId: '8',
    moduleId: 'ai-basics',
    title: 'Build Your First AI Project',
    description: 'Apply everything you learned by building a real AI project',
    duration: '25 min',
    learningObjectives: [
      'Recap all AI concepts learned',
      'Build a simple AI classifier',
      'Understand the AI development process',
      'Learn next steps for AI learning',
    ],
  },
  slides: [
    {
      id: '8-intro',
      type: 'intro',
      title: '🚀 Build Your First AI Project!',
      subtitle: 'Lesson 8: Final Project',
      text: 'Congratulations, AI Expert! You\'ve learned so much about AI. Now it\'s time to BUILD something amazing! Let\'s create your first AI project together! 🎉',
      tips: [
        'You\'ve got all the knowledge you need!',
        'Building is the best way to learn',
        'Don\'t worry about mistakes - they\'re part of learning!',
      ],
    },
    {
      id: '8-content-1',
      type: 'content',
      title: '📚 What You\'ve Learned',
      text: 'Look at everything you\'ve mastered in this module:',
      bulletPoints: [
        '🤖 **Lesson 1**: What AI is and where to find it',
        '🧠 **Lesson 2**: How AI learns from data',
        '🎯 **Lesson 3**: Different types of AI (Vision, NLP)',
        '⚖️ **Lesson 4**: AI ethics and responsible use',
        '🔗 **Lesson 5**: Neural networks and how they work',
        '🎮 **Lesson 6**: AI in games and entertainment',
        '💼 **Lesson 7**: AI careers and the future',
      ],
      funFact: '🎊 You\'re now an official AI Basics Expert!',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=500&fit=crop',
    },
    {
      id: '8-content-2',
      type: 'content',
      title: '🎯 Your Project: Image Classifier',
      text: 'We\'re going to build an AI that recognizes different objects in images!',
      bulletPoints: [
        '📸 **What It Does**: Identifies objects in photos',
        '🧠 **How It Works**: Uses machine learning to classify images',
        '🎨 **What You\'ll Learn**: Training, testing, and using AI',
        '🛠️ **Tools We\'ll Use**: Google\'s Teachable Machine (free!)',
        '⚡ **Time Needed**: About 15 minutes',
      ],
      image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&h=500&fit=crop',
      funFact: '💡 This is the same technology used in self-driving cars and face recognition!',
    },
    {
      id: '8-video-1',
      type: 'video',
      title: '📹 Teachable Machine Tutorial',
      videoTitle: 'How to Use Teachable Machine',
      videoUrl: 'https://www.youtube.com/embed/DFBbSTvtpy4',
      videoDuration: '8:15',
      text: 'Watch this tutorial on using Teachable Machine to build your AI!',
    },
    {
      id: '8-content-3',
      type: 'content',
      title: '🛠️ Step 1: Gather Your Data',
      text: 'First, you need to collect images for your AI to learn from:',
      bulletPoints: [
        '📱 **Go to**: teachablemachine.withgoogle.com',
        '🎯 **Choose**: Image Project → Standard Image Model',
        '🖼️ **Create Classes**: Add 2-3 categories (like Cat, Dog, Bird)',
        '📸 **Add Images**: Use webcam or upload 20+ images per class',
        '✨ **Pro Tip**: Use different angles and lighting for better AI!',
      ],
      funFact: '📊 More diverse training data = smarter AI!',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
    },
    {
      id: '8-quiz-1',
      type: 'quiz',
      quiz: {
        question: '🤔 Why do we need many different images for each class?',
        options: [
          'To make the project look bigger',
          'So the AI can learn patterns from variety',
          'Because it\'s required by the tool',
          'To slow down the training',
        ],
        correctAnswer: 1,
        explanation: '🎯 Exactly! The AI needs to see lots of different examples to learn what makes a cat a cat, or a dog a dog. Variety helps it recognize objects in any situation!',
        hint: 'Think about how YOU learned to recognize things...',
      },
    },
    {
      id: '8-content-4',
      type: 'content',
      title: '🧠 Step 2: Train Your Model',
      text: 'Now let\'s teach your AI to recognize the images:',
      bulletPoints: [
        '▶️ **Click**: "Train Model" button',
        '⏱️ **Wait**: AI learns patterns (takes 1-2 minutes)',
        '🔍 **Watch**: The neural network training in action!',
        '✅ **Done**: When training completes, your AI is ready!',
        '🎯 **What Happened**: AI found patterns in your images',
      ],
      funFact: '⚡ Your computer just trained a real neural network!',
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=500&fit=crop',
    },
    {
      id: '8-content-5',
      type: 'content',
      title: '🎮 Step 3: Test Your AI',
      text: 'Time to see if your AI works! Let\'s test it:',
      bulletPoints: [
        '📸 **Use Webcam**: Show objects to your camera',
        '🤖 **Watch AI**: See predictions in real-time',
        '📊 **Check Confidence**: AI shows how sure it is (percentage)',
        '🎯 **Try Different Things**: Test with new images',
        '🔧 **Improve**: Add more images if AI gets confused',
      ],
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop',
      funFact: '🎨 You can even test with drawings or toys!',
    },
    {
      id: '8-quiz-2',
      type: 'quiz',
      quiz: {
        question: '💭 What does the confidence percentage mean?',
        options: [
          'How fast the AI is working',
          'How sure the AI is about its prediction',
          'How many images you used',
          'The AI\'s battery level',
        ],
        correctAnswer: 1,
        explanation: '🌟 Perfect! The confidence percentage shows how sure the AI is about its guess. 95% confidence means it\'s very sure, while 50% means it\'s unsure!',
        hint: 'Think about being confident in an answer...',
      },
    },
    {
      id: '8-content-6',
      type: 'content',
      title: '💾 Step 4: Save & Share',
      text: 'Your AI is ready! Now you can save and share it:',
      bulletPoints: [
        '💾 **Export**: Click "Export Model" to save your AI',
        '🌐 **Get Link**: Share a link so others can try it',
        '📱 **Use in Apps**: Download to use in your projects',
        '🎉 **Show Friends**: Let others test your AI!',
        '🚀 **Keep Learning**: Try more complex projects!',
      ],
      funFact: '🏆 You just built a real AI model - that\'s amazing!',
      image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=500&fit=crop',
    },
    {
      id: '8-content-7',
      type: 'content',
      title: '🎨 More Project Ideas',
      text: 'Ready for more? Try these awesome AI projects:',
      bulletPoints: [
        '🎵 **Sound Classifier**: Recognize different sounds or music',
        '✋ **Gesture Recognizer**: Train AI to recognize hand gestures',
        '😊 **Emotion Detector**: Classify facial expressions',
        '🎮 **Game Controller**: Use poses to control a game',
        '🌍 **Rock Paper Scissors**: Play against AI',
        '🎨 **Art Classifier**: Recognize different art styles',
      ],
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=500&fit=crop',
      funFact: '💡 Each project teaches you more about how AI works!',
    },
    {
      id: '8-content-8',
      type: 'content',
      title: '📖 Next Steps in Your AI Journey',
      text: 'Where do you go from here? So many options:',
      bulletPoints: [
        '💻 **Learn Coding**: Python for AI, JavaScript for web AI',
        '🎓 **Take More Courses**: Explore machine learning deeply',
        '🏆 **Join Competitions**: Kaggle for kids, AI challenges',
        '🤝 **Find Community**: AI clubs, coding groups, online forums',
        '🔬 **Build Projects**: The best way to learn is by doing!',
        '📱 **Use AI Tools**: Experiment with AI apps and websites',
      ],
      funFact: '🌟 Many AI experts started exactly where you are now!',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=500&fit=crop',
    },
    {
      id: '8-quiz-3',
      type: 'quiz',
      quiz: {
        question: '🎯 What\'s the BEST way to learn more about AI?',
        options: [
          'Just reading about it',
          'Watching videos only',
          'Building projects and experimenting',
          'Waiting until you\'re older',
        ],
        correctAnswer: 2,
        explanation: '🚀 Absolutely! Building projects and experimenting is the best way to learn AI. You learn by doing, making mistakes, and improving. Keep creating!',
        hint: 'Think about how you learn best...',
      },
    },
    {
      id: '8-recap',
      type: 'recap',
      title: '📚 Final Recap: Your AI Journey',
      subtitle: 'Everything You Accomplished',
      bulletPoints: [
        '✅ Learned what AI is and how it works',
        '✅ Understood machine learning and neural networks',
        '✅ Explored different types of AI applications',
        '✅ Discovered AI ethics and responsible use',
        '✅ Learned about AI careers and opportunities',
        '✅ Built your own working AI project!',
        '✅ Ready to continue your AI journey!',
      ],
      funFact: '🎊 You\'re now part of the AI revolution!',
    },
    {
      id: '8-completion',
      type: 'completion',
      title: '🎓 MODULE COMPLETE! 🎉',
      text: 'CONGRATULATIONS! You\'ve completed the entire AI Basics module! You went from AI beginner to AI builder. You should be incredibly proud! 🌟',
      bulletPoints: [
        '⭐ Final Reward: +100 XP',
        '🏆 UNLOCKED: "AI Basics Master" certificate',
        '🎨 UNLOCKED: "AI Project Builder" badge',
        '🚀 You built a real AI project!',
        '💡 You understand AI fundamentals!',
        '🌍 You\'re ready to change the world with AI!',
        '📖 Continue to the next module to learn more!',
      ],
    },
  ],
};

// Export all lessons for AI Basics module
export const aiBasicsLessons = {
  '1': lesson1,
  '2': lesson2,
  '3': lesson3,
  '4': lesson4,
  '5': lesson5,
  '6': lesson6,
  '7': lesson7,
  '8': lesson8,
};

// Helper function to get lesson by ID
export function getAIBasicsLesson(lessonId: string) {
  return aiBasicsLessons[lessonId as keyof typeof aiBasicsLessons];
}
