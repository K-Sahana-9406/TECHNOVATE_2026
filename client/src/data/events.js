export const events = {
  technical: [
    {
      id: 'codextreme',
      name: 'Codextreme',
      type: 'technical',
      description: 'CodeXtreme evaluates participants programming knowledge through technical aptitude, problem-solving skills, logo identification of programming languages, and logical challenges.',
      shortDescription: 'Programming, aptitude, problem-solving challenge',
      date: 'March 13, 2026',
      time: '11:00 AM - 12:00 PM',
      venue: 'Rudra Block, IT- III year',
      teamSize: '2-3 members',
      icon: '💻',
      rounds: [
        'Round 1: Logo identification - Participants identify programming language logos shown in a slideshow and answer.',
        'Round 2: Technical Aptitude - Solve technical aptitude questions based on logical and programming concepts.',
        'Round 3: Problem Solving - Participants solve given technical or logical problems within the time limit.'
      ],
      coordinators: [
        { name: 'Gokila S', phone: '+91 9344682707' },
        { name: 'Reshmi R', phone: '+91 9677636575' }
      ],
      whatsappLink: 'https://chat.whatsapp.com/code-sprint-group'
    },
    {
      id: 'Paper Ignite',
      name: 'Paper Ignite',
      type: 'technical',
      description: 'PaperIgnite is a paper presentation event where participants present innovative ideas, research findings, and creative concepts. The event encourages knowledge sharing, critical thinking, and presentation skills, allowing teams to showcase their unique perspectives and shine with groundbreaking ideas.',
      shortDescription: 'Present on innovative ideas, research findings, and creative concepts',
      date: 'March 13, 2026',
      time: '09:00 AM - 10:30 AM',
      venue: 'Rudra block',
      teamSize: '3-4 members',
      icon: '🐛',
      rounds: [
      ],
      coordinators: [
        { name: 'Kalaiselvi', phone: '+91 9360459483' },
        { name: 'Ranjani S', phone: '+91 9894461422' }
      ],
      whatsappLink: 'https://chat.whatsapp.com/debug-master-group'
    },
    {
      id: 'Tech Trace',
      name: 'Tech Trace',
      type: 'technical',
      description: 'TechTrace is an exciting technical treasure hunt that challenges participants to explore databases, debug errors, write SQL queries, and decode hidden clues. The event tests analytical thinking, SQL knowledge, and problem-solving skills in a fast-paced competitive environment.',
      shortDescription: 'Technical treasure hunt with multiple rounds',
      date: 'March 13, 2026',
      time: '9:00 AM - 10:30 AM',
      venue: 'Seminar Hall, Rudra Block',
      teamSize: '3-4 members',
      icon: '🧠',
      coordinators: [
        { name: 'Mohammed Riyaz A', phone: '+91 7010559916' },
        { name: 'Sahana K', phone: '+91 9025639476' }
      ],
      whatsappLink: 'https://chat.whatsapp.com/tech-quiz-group'
    }
  ],
  nonTechnical: [
    {
      id: 'EyeSpy',
      name: 'EyeSpy',
      type: 'non-technical',
      description: 'Eyespy is a detective challenge that tests participants’ observation, memory, and analytical skills through crime scene analysis and interrogation-based problem solving.',
      shortDescription: 'Test observation, memory, and analytical skills',
      date: 'March 13, 2026',
      time: '11:00 AM - 12:00 PM',
      venue: 'Seminar Hall, Rudra Block',
      teamSize: '2-3 members',
      icon: '📊',
      rounds: [
        'Round 1: Observation Challenge - Participants observe a scene or image for 30 seconds and answer questions based on details and clues.',
        'Round 2: Interrogation Room - Teams analyze a crime story, interrogate characters, and use clues to identify the murderer through logical reasoning and teamwork.',
      ],
      coordinators: [
        { name: 'Venmani M R', phone: '+91 93422 66960' },
        { name: 'Karthiga T', phone: '+91 9894946624' }
      ],
      whatsappLink: 'https://chat.whatsapp.com/tech-presentation-group'
    },
    {
      id: 'Cinemania',
      name: 'Cinemania',
      type: 'non-technical',
      description: 'CineMania is an exciting movie-based quiz that tests participants’ knowledge of films through background music identification, movie acting, and image-based guessing challenges.',
      shortDescription: 'Test knowledge of films through background music identification, movie acting, and image-based guessing challenges',
      date: 'March 13, 2026',
      time: '1:30 PM - 2:30 PM',
      venue: 'Seminar Hall, Rudra Block',
      venue: 'Seminar, Rudra Block',
      teamSize: '2 members',
      icon: '🗣️',
      rounds: [
        'Round 1: BGM Finding - Participants listen to background music and identify the movie.',
        'Round 2: Dumb Charades (Movie Edition) - Teams act out movie names without speaking while teammates guess.',
        'Round 3: Connection Round - Participants connect given image clues to identify the movie.'
       
      ],
      coordinators: [
        { name: 'Madhumitha M', phone: '+91 8124430294' },
        { name: 'Infant Athina J', phone: '+91 8610673937' }
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
      { role: 'General Secretary', name: 'Santhosh Kumar S', phone: '+91 9025490023' },
      { role: 'Joint Secretary', name: 'Nithya R', phone: '+91 9082167338' }
    ]
  },
  treasurers: {
    title: 'Treasurers',
    members: [
      { role: 'Treasurer', name: 'Aravindh R', phone: '+91 7418070889' },
      { role: 'Joint Treasurer', name: 'Karthiga T', phone: '+91 9894946624' }
    ]
  },
  eventCoordinators: {
    title: 'Event Coordinators',
    members: [
      { role: 'Technical Lead', name: 'Madhan Kumar M', phone: '+91 9677068776' },
      { role: 'Technical Co-Lead', name: 'Madhumitha M', phone: '+91 8124430294' }
    ]
  }
 
};

export const eventDate = new Date('2026-03-13T09:00:00');
