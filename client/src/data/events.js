export const events = {
  technical: [
    {
      id: 'code-sprint',
      name: 'Code Sprint Challenge',
      type: 'technical',
      description: 'A high-intensity coding competition where participants solve complex algorithmic problems under time pressure. Test your programming skills, logical thinking, and ability to perform under pressure.',
      shortDescription: 'High-intensity coding competition with algorithmic challenges',
      date: 'March 15, 2026',
      time: '10:00 AM - 2:00 PM',
      venue: 'Computer Lab A, IT Block',
      prizePool: '₹15,000',
      prizes: [
        { position: '1st Prize', amount: '₹8,000', icon: '🥇' },
        { position: '2nd Prize', amount: '₹5,000', icon: '🥈' },
        { position: '3rd Prize', amount: '₹2,000', icon: '🥉' }
      ],
      teamSize: '2-3 members',
      contact: '+91 98765 43210',
      icon: '💻',
      rounds: [
        'Round 1: MCQ Challenge - 30 minutes, 50 questions on DSA basics',
        'Round 2: Coding Problems - Solve 3 algorithmic challenges in 90 minutes',
        'Round 3: Debug & Optimize - Fix bugs and optimize code for efficiency'
      ],
      coordinators: [
        { name: 'Arun Kumar', phone: '+91 98765 43210' },
        { name: 'Priya Sharma', phone: '+91 98765 43211' }
      ],
      whatsappLink: 'https://chat.whatsapp.com/code-sprint-group'
    },
    {
      id: 'debug-master',
      name: 'Debug Masterclass',
      type: 'technical',
      description: 'Put your debugging skills to the test! Identify and fix bugs in complex code snippets across multiple programming languages. Speed and accuracy are key to winning this challenge.',
      shortDescription: 'Find and fix bugs in complex code snippets',
      date: 'March 15, 2026',
      time: '11:00 AM - 1:00 PM',
      venue: 'Computer Lab B, IT Block',
      prizePool: '₹10,000',
      prizes: [
        { position: '1st Prize', amount: '₹5,000', icon: '🥇' },
        { position: '2nd Prize', amount: '₹3,000', icon: '🥈' },
        { position: '3rd Prize', amount: '₹2,000', icon: '🥉' }
      ],
      teamSize: 'Individual',
      contact: '+91 98765 43211',
      icon: '🐛',
      rounds: [
        'Round 1: Syntax Errors - Find and fix syntax errors in 10 code snippets',
        'Round 2: Logical Errors - Debug programs with logical flaws',
        'Round 3: Optimization - Improve code efficiency and fix hidden bugs'
      ],
      coordinators: [
        { name: 'Kavin A K', phone: '+91 98765 43212' },
        { name: 'Sneha R', phone: '+91 98765 43213' }
      ],
      whatsappLink: 'https://chat.whatsapp.com/debug-master-group'
    },
    {
      id: 'tech-quiz',
      name: 'Tech Quiz Bowl',
      type: 'technical',
      description: 'Battle it out in this comprehensive technology quiz covering programming, emerging tech, IT history, and current industry trends. Multiple rounds with increasing difficulty await!',
      shortDescription: 'Comprehensive tech quiz with multiple rounds',
      date: 'March 15, 2026',
      time: '2:00 PM - 4:00 PM',
      venue: 'Seminar Hall, Main Block',
      prizePool: '₹12,000',
      prizes: [
        { position: '1st Prize', amount: '₹6,000', icon: '🥇' },
        { position: '2nd Prize', amount: '₹4,000', icon: '🥈' },
        { position: '3rd Prize', amount: '₹2,000', icon: '🥉' }
      ],
      teamSize: '2 members',
      contact: '+91 98765 43212',
      icon: '🧠',
      rounds: [
        'Round 1: Rapid Fire - 50 quick questions in 15 minutes',
        'Round 2: Visual Round - Identify tech logos, UI elements, and code outputs',
        'Round 3: Buzzer Round - Fastest finger first on advanced topics'
      ],
      coordinators: [
        { name: 'Rahul Menon', phone: '+91 98765 43214' },
        { name: 'Divya N', phone: '+91 98765 43215' }
      ],
      whatsappLink: 'https://chat.whatsapp.com/tech-quiz-group'
    }
  ],
  nonTechnical: [
    {
      id: 'tech-presentation',
      name: 'Tech Innovation Presentation',
      type: 'non-technical',
      description: 'Present your innovative tech ideas and solutions to a panel of judges. Showcase your creativity, research skills, and ability to communicate complex concepts effectively.',
      shortDescription: 'Present innovative tech ideas and solutions',
      date: 'March 15, 2026',
      time: '10:30 AM - 12:30 PM',
      venue: 'Conference Hall, Admin Block',
      prizePool: '₹15,000',
      prizes: [
        { position: '1st Prize', amount: '₹8,000', icon: '🥇' },
        { position: '2nd Prize', amount: '₹5,000', icon: '🥈' },
        { position: '3rd Prize', amount: '₹2,000', icon: '🥉' }
      ],
      teamSize: '1-2 members',
      contact: '+91 98765 43213',
      icon: '📊',
      rounds: [
        'Round 1: Abstract Submission - Submit your idea summary (pre-event)',
        'Round 2: Presentation - 10-minute presentation + 5-minute Q&A',
        'Round 3: Demo Round - Live demonstration of prototype/MVP'
      ],
      coordinators: [
        { name: 'Vikram S', phone: '+91 98765 43216' },
        { name: 'Ananya P', phone: '+91 98765 43217' }
      ],
      whatsappLink: 'https://chat.whatsapp.com/tech-presentation-group'
    },
    {
      id: 'group-discussion',
      name: 'Group Discussion Challenge',
      type: 'non-technical',
      description: 'Engage in thought-provoking discussions on technology trends, ethical dilemmas, and future innovations. Test your communication skills, critical thinking, and ability to work in a team.',
      shortDescription: 'Discuss tech trends and ethical dilemmas',
      date: 'March 15, 2026',
      time: '3:00 PM - 5:00 PM',
      venue: 'Discussion Room, Library Block',
      prizePool: '₹8,000',
      prizes: [
        { position: '1st Prize', amount: '₹4,000', icon: '🥇' },
        { position: '2nd Prize', amount: '₹2,500', icon: '🥈' },
        { position: '3rd Prize', amount: '₹1,500', icon: '🥉' }
      ],
      teamSize: '6-8 members per group',
      contact: '+91 98765 43214',
      icon: '🗣️',
      rounds: [
        'Round 1: Topic Introduction - 2-minute individual opening statement',
        'Round 2: Group Discussion - 15-minute moderated discussion',
        'Round 3: Conclusion - Summarize key points and reach consensus'
      ],
      coordinators: [
        { name: 'Sanjay K', phone: '+91 98765 43218' },
        { name: 'Meera T', phone: '+91 98765 43219' }
      ],
      whatsappLink: 'https://chat.whatsapp.com/group-discussion-group'
    }
  ]
};

export const passTypes = [
  { id: 'individual', name: 'Individual Pass', price: 200, members: 1 },
  { id: 'duo', name: '2 Members Pass', price: 350, members: 2 },
  { id: 'trio', name: '3 Members Pass', price: 500, members: 3 },
  { id: 'quad', name: '4 Members Pass', price: 600, members: 4 }
];

export const contactInfo = {
  college: {
    name: 'Government College of Technology',
    address: 'Thadagam Road, Coimbatore - 641013',
    website: 'https://gct.ac.in',
    linkedin: 'https://linkedin.com/school/gct-coimbatore',
    instagram: 'https://instagram.com/technovate.gct',
    whatsapp: 'https://wa.me/919876543210'
  },
  secretaries: {
    title: 'Secretaries',
    members: [
      { role: 'General Secretary', name: 'Rahesh Kumar', phone: '+91 98765 43210' },
      { role: 'Joint Secretary', name: 'Priya Sharma', phone: '+91 98765 43211' }
    ]
  },
  treasurers: {
    title: 'Treasurers',
    members: [
      { role: 'Treasurer', name: 'Arun Venkatesh', phone: '+91 98765 43212' },
      { role: 'Joint Treasurer', name: 'Divya Menon', phone: '+91 98765 43213' }
    ]
  },
  techCoordinators: {
    title: 'Tech Coordinators',
    members: [
      { role: 'Technical Lead', name: 'Kavin A K', phone: '+91 98765 43214' },
      { role: 'Technical Co-Lead', name: 'Sneha R', phone: '+91 98765 43215' }
    ]
  },
  nonTechCoordinators: {
    title: 'Non-Tech Coordinators',
    members: [
      { role: 'Non-Tech Lead', name: 'Vikram S', phone: '+91 98765 43216' },
      { role: 'Non-Tech Co-Lead', name: 'Ananya P', phone: '+91 98765 43217' }
    ]
  }
};

export const eventDate = new Date('2026-03-15T09:00:00');
