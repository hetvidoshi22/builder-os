import type { Goal, Interest, Skill } from '@/store/onboardingStore';

// ─── Types ────────────────────────────────────────────────────────────────────

export type Opportunity = {
  title: string;
  match: string;
  reason: string;
  company: string;
  type: string;
  deadline: string;
  description: string;
  requirements: string[];
};

export type ActionItem = {
  title: string;
  reason: string;
  time: string;
};

export type Builder = {
  name: string;
  match: string;
  sameGoal: string;
  sameInterest: string;
  sharedSkills: string;
  emoji: string;
  bio: string;
  location: string;
  projects: string[];
};

export type PulseItem = {
  iconKey: 'users' | 'calendar' | 'handshake' | 'message';
  title: string;
  author: string;
  time: string;
  desc: string;
  actionLabel: string;
  discussion: string;
};

// ─── Skill Gaps ───────────────────────────────────────────────────────────────

const SKILL_GAPS_BY_GOAL: Record<Goal, string[]> = {
  'Get my first internship': ['Resume', 'Portfolio Projects', 'Interview Prep', 'Git/GitHub'],
  'Become an ML Engineer': ['PyTorch', 'MLOps', 'Deployment', 'Deep Learning'],
  'Become a Data Scientist': ['Statistics', 'SQL', 'Visualization', 'ML'],
  'Win Hackathons': ['Rapid Prototyping', 'Presentation', 'Team Collaboration', 'APIs'],
  'Build a Startup': ['Product Thinking', 'MVP Building', 'Growth', 'Fundraising', 'Sales'],
  'Freelance Projects': [
    'Client Communication',
    'Pricing',
    'Proposal Writing',
    'Personal Branding',
  ],
  'Improve My Portfolio': ['Documentation', 'Case Studies', 'Project Deployment'],
};

const INTEREST_SKILL_ADDITIONS: Record<Interest, string[]> = {
  'AI/ML': ['Prompt Engineering', 'Model Fine-tuning'],
  'Data Science': ['EDA', 'Feature Engineering'],
  'Web Development': ['TypeScript', 'REST APIs'],
  Cybersecurity: ['Pentesting', 'OWASP Basics'],
  'App Development': ['React Native', 'App Store Submission'],
  'Open Source': ['Git Workflow', 'Code Review'],
};

export function getSkillGaps(goal: Goal | null, interests: Interest[]): string[] {
  const base = goal ? SKILL_GAPS_BY_GOAL[goal] : ['Resume', 'Git/GitHub', 'Portfolio Projects'];
  const extras = interests.flatMap((i) => INTEREST_SKILL_ADDITIONS[i] ?? []);
  return [...new Set([...base, ...extras])].slice(0, 6);
}

// ─── Recommended Actions ──────────────────────────────────────────────────────

const ACTIONS_BY_GOAL: Record<Goal, ActionItem[]> = {
  'Get my first internship': [
    {
      title: 'Polish your resume with a strong project section',
      reason: 'Goal: Get First Internship',
      time: '2-3 Hours',
    },
    {
      title: 'Apply to 5 internship openings today',
      reason: 'Missing: Internship Applications',
      time: '1-2 Hours',
    },
    {
      title: 'Connect with 3 students who got internships recently',
      reason: 'Missing: Industry Network',
      time: '30 Min',
    },
  ],
  'Become an ML Engineer': [
    {
      title: 'Build a portfolio-grade ML project with PyTorch',
      reason: 'Goal: Become ML Engineer',
      time: '4-6 Hours',
    },
    {
      title: 'Join a live AI hackathon this weekend',
      reason: 'Skill: Rapid Prototyping',
      time: 'Weekend',
    },
    {
      title: 'Connect with 3 ML engineers on the platform',
      reason: 'Missing: Industry Network',
      time: '30 Min',
    },
  ],
  'Become a Data Scientist': [
    {
      title: 'Complete a Kaggle competition for real DS experience',
      reason: 'Goal: Become Data Scientist',
      time: '4-8 Hours',
    },
    {
      title: 'Build an end-to-end analytics dashboard project',
      reason: 'Skill: Visualization',
      time: '3-4 Hours',
    },
    {
      title: 'Connect with data scientists and analysts',
      reason: 'Missing: Industry Network',
      time: '30 Min',
    },
  ],
  'Win Hackathons': [
    {
      title: 'Register for the next upcoming hackathon',
      reason: 'Goal: Win Hackathons',
      time: '15 Min',
    },
    {
      title: 'Find a teammate with complementary skills',
      reason: 'Skill: Team Collaboration',
      time: '1 Hour',
    },
    {
      title: 'Practice a rapid prototyping sprint this week',
      reason: 'Skill: Rapid Prototyping',
      time: '2-3 Hours',
    },
  ],
  'Build a Startup': [
    {
      title: 'Define your MVP scope and core user problem',
      reason: 'Goal: Build a Startup',
      time: '2 Hours',
    },
    {
      title: 'Apply to a founder program or incubator',
      reason: 'Skill: Fundraising',
      time: '1 Hour',
    },
    {
      title: 'Connect with co-founders and indie hackers',
      reason: 'Missing: Co-founder Network',
      time: '45 Min',
    },
  ],
  'Freelance Projects': [
    {
      title: 'Build a one-page portfolio with 3 case studies',
      reason: 'Goal: Freelance Projects',
      time: '3 Hours',
    },
    {
      title: 'Write a client proposal template and pricing guide',
      reason: 'Skill: Proposal Writing',
      time: '1.5 Hours',
    },
    {
      title: 'Connect with active freelancers for mentorship',
      reason: 'Missing: Freelance Network',
      time: '30 Min',
    },
  ],
  'Improve My Portfolio': [
    {
      title: 'Write a detailed case study for your best project',
      reason: 'Goal: Improve Portfolio',
      time: '2 Hours',
    },
    {
      title: 'Deploy all undeployed projects and add live links',
      reason: 'Skill: Project Deployment',
      time: '3 Hours',
    },
    {
      title: 'Submit your portfolio to a showcase event',
      reason: 'Opportunity: Visibility',
      time: '30 Min',
    },
  ],
};

export function getRecommendedActions(
  goal: Goal | null,
  skills: Skill[],
  _interests: Interest[]
): ActionItem[] {
  const base = goal
    ? ACTIONS_BY_GOAL[goal]
    : [
        {
          title: 'Set your goal to unlock a personalized path',
          reason: 'Missing: Goal',
          time: '2 Min',
        },
        { title: 'Complete your skill profile', reason: 'Missing: Skills', time: '5 Min' },
        { title: 'Add your interests to get matched', reason: 'Missing: Interests', time: '3 Min' },
      ];

  return base.map((action) => ({
    ...action,
    reason:
      action.reason.includes('Missing:') || action.reason.includes('Goal:')
        ? action.reason
        : skills[0]
          ? `${action.reason} · Skills: ${skills.slice(0, 2).join(', ')}`
          : action.reason,
  }));
}

// ─── Opportunities ────────────────────────────────────────────────────────────

const OPPORTUNITIES_BY_GOAL: Record<Goal, Opportunity[]> = {
  'Get my first internship': [
    {
      title: 'Software Engineering Intern',
      match: '94%',
      reason: 'Goal: Get First Internship · Resume match',
      company: 'TechCorp',
      type: 'Internship · Hybrid',
      deadline: 'Apply by June 20',
      description:
        'A hands-on internship for students looking to gain real-world engineering experience. You will work alongside senior engineers on production features, write tests, and participate in code reviews.',
      requirements: [
        'Git/GitHub',
        'Basic programming skills',
        'Communication',
        'Eagerness to learn',
      ],
    },
    {
      title: 'Portfolio Review Workshop',
      match: '90%',
      reason: 'Goal: First Internship · Skill: Portfolio Projects',
      company: 'DevHub',
      type: 'Event · Online',
      deadline: 'Starts July 5',
      description:
        'Get direct feedback on your portfolio from hiring managers and senior engineers. Learn what makes a project stand out and how to present it during interviews.',
      requirements: ['Existing portfolio project', 'GitHub account', 'Open to feedback'],
    },
    {
      title: 'Internship Prep Hackathon',
      match: '87%',
      reason: 'Goal: First Internship · Team building',
      company: 'BuilderOS Events',
      type: 'Hackathon · 24 Hours',
      deadline: 'Starts July 12',
      description:
        'A beginner-friendly hackathon designed to simulate the internship project experience. Build a real feature, get reviewed, and win internship referrals from sponsors.',
      requirements: ['Any coding language', 'Team of 2-4', 'GitHub account'],
    },
  ],
  'Become an ML Engineer': [
    {
      title: 'ML Research Intern',
      match: '93%',
      reason: 'Goal: ML Engineer · Skills: Python, ML',
      company: 'DeepMind Labs',
      type: 'Internship · Remote',
      deadline: 'Apply by June 15',
      description:
        'Join our AI research team to work on cutting-edge machine learning models. You will design experiments, analyze results, and co-author research papers.',
      requirements: ['Python', 'ML fundamentals', 'PyTorch or TensorFlow', 'Research mindset'],
    },
    {
      title: 'AI Builders Hackathon',
      match: '89%',
      reason: 'Goal: ML Engineer · Interest: AI/ML',
      company: 'DevHub',
      type: 'Hackathon · 48 Hours',
      deadline: 'Starts July 1',
      description:
        'Build an AI-powered product in 48 hours. Win cash prizes, mentorship, and get visibility from top ML hiring companies.',
      requirements: ['Python', 'ML/DL basics', 'Team of 2-4', 'GitHub account'],
    },
    {
      title: 'End-to-End ML Project Challenge',
      match: '85%',
      reason: 'Skill gap: MLOps and Deployment',
      company: 'BuilderOS',
      type: 'Project · Self-paced',
      deadline: 'Open enrollment',
      description:
        'A structured challenge to build, train, deploy, and monitor an ML model end-to-end. Completing this puts a strong project on your resume.',
      requirements: ['Python', 'Scikit-learn or PyTorch', 'Cloud basics', 'GitHub'],
    },
  ],
  'Become a Data Scientist': [
    {
      title: 'Data Analyst Intern',
      match: '92%',
      reason: 'Goal: Data Scientist · Skills: SQL, Python',
      company: 'AnalyticsHub',
      type: 'Internship · Remote',
      deadline: 'Apply by June 25',
      description:
        'Work with a data team to clean, explore, and visualize datasets. You will build dashboards and present findings to stakeholders.',
      requirements: ['SQL', 'Python or R', 'Data visualization', 'Communication'],
    },
    {
      title: 'Kaggle Data Science Competition',
      match: '88%',
      reason: 'Goal: Data Scientist · Skill: ML',
      company: 'Kaggle',
      type: 'Competition · Ongoing',
      deadline: 'Closes Aug 1',
      description:
        'Compete globally on a real-world dataset problem. Top 10% finishes are resume gold for aspiring data scientists.',
      requirements: ['Python or R', 'Statistics basics', 'ML knowledge'],
    },
    {
      title: 'Analytics Dashboard Project',
      match: '84%',
      reason: 'Skill gap: Visualization',
      company: 'BuilderOS',
      type: 'Project · Self-paced',
      deadline: 'Open enrollment',
      description:
        'Build a full analytics dashboard from raw CSV data to interactive visualizations. Covers pandas, SQL, and chart libraries.',
      requirements: ['Python', 'SQL basics', 'Pandas', 'Matplotlib or Plotly'],
    },
  ],
  'Win Hackathons': [
    {
      title: 'Global AI Hackathon',
      match: '95%',
      reason: 'Goal: Win Hackathons · Interest: AI/ML',
      company: 'HackGlobal',
      type: 'Hackathon · 48 Hours',
      deadline: 'Starts July 8',
      description:
        'One of the largest online AI hackathons with over 5,000 participants. Win up to $10,000 in prizes and get recruited by sponsors.',
      requirements: ['Any AI/ML stack', 'Team of 2-5', 'GitHub', 'Demo video'],
    },
    {
      title: 'Team Formation Network Event',
      match: '88%',
      reason: 'Goal: Win Hackathons · Team collaboration',
      company: 'DevHub',
      type: 'Event · Online',
      deadline: 'Starts June 28',
      description:
        'Find your perfect hackathon team before the competition starts. Match with builders based on skills and time availability.',
      requirements: ['GitHub profile', 'Skill description', 'Availability commitment'],
    },
    {
      title: 'BuildSprint Challenge Program',
      match: '84%',
      reason: 'Skill: Rapid Prototyping',
      company: 'BuilderOS',
      type: 'Challenge · 72 Hours',
      deadline: 'Starts July 15',
      description:
        'A time-boxed challenge designed to sharpen your rapid prototyping and presentation skills. Win badges and leaderboard recognition.',
      requirements: ['Any tech stack', 'Solo or team', 'GitHub account'],
    },
  ],
  'Build a Startup': [
    {
      title: 'YC-Style Founder Fellowship',
      match: '94%',
      reason: 'Goal: Build a Startup · Fundraising',
      company: 'StartupOS',
      type: 'Fellowship · 3 Months',
      deadline: 'Apply by June 30',
      description:
        'An intensive 12-week founder program with mentorship, funding, and a cohort of other early-stage builders. Build your MVP and pitch to investors at Demo Day.',
      requirements: ['Early-stage idea or MVP', 'Coachability', 'Full-time commitment'],
    },
    {
      title: 'MVP Challenge Sprint',
      match: '90%',
      reason: 'Goal: Build a Startup · MVP Building',
      company: 'DevHub',
      type: 'Challenge · 1 Week',
      deadline: 'Starts July 1',
      description:
        'Ship a working MVP in 7 days. Get feedback from real users and investors. Winner gets $2,500 and an intro to a top VC firm.',
      requirements: ['Product idea', 'Technical skills', 'Any tech stack'],
    },
    {
      title: 'Co-Founder Matching Event',
      match: '86%',
      reason: 'Goal: Build a Startup · Co-founder network',
      company: 'BuilderOS',
      type: 'Event · Online',
      deadline: 'Starts June 22',
      description:
        'Get matched with potential co-founders based on complementary skills, goals, and startup ideas. Structured 1:1s with follow-up sessions.',
      requirements: ['Startup idea or skills', 'Commitment to build'],
    },
  ],
  'Freelance Projects': [
    {
      title: 'Python Automation Freelance Gig',
      match: '91%',
      reason: 'Goal: Freelance Projects · Skills: Python',
      company: 'RemoteWork.io',
      type: 'Freelance · Part-time',
      deadline: 'Apply by June 28',
      description:
        'Build a data scraping and automation pipeline for a SaaS startup. Flexible hours, strong pay, great portfolio piece.',
      requirements: ['Python', 'Selenium or BeautifulSoup', 'API basics', 'Communication'],
    },
    {
      title: 'Web Dashboard Client Project',
      match: '87%',
      reason: 'Goal: Freelance · Skill: Web Development',
      company: 'ClientHub',
      type: 'Contract · 4 Weeks',
      deadline: 'Apply by July 2',
      description:
        'A small business needs a reporting dashboard built from scratch. React frontend plus REST API backend. Full autonomy on tech choices.',
      requirements: ['React or Vue', 'REST API', 'Basic design sense'],
    },
    {
      title: 'Freelance Proposal Writing Workshop',
      match: '83%',
      reason: 'Skill gap: Proposal Writing',
      company: 'DevHub',
      type: 'Workshop · Online',
      deadline: 'Starts July 10',
      description:
        'Learn how to write winning client proposals, set rates, and close your first freelance project. Includes templates and live Q&A.',
      requirements: ['Interest in freelancing', 'Any skill level'],
    },
  ],
  'Improve My Portfolio': [
    {
      title: 'Portfolio Review Session',
      match: '93%',
      reason: 'Goal: Improve Portfolio · Feedback',
      company: 'DevHub',
      type: 'Event · Online',
      deadline: 'Starts July 5',
      description:
        'Get direct feedback from senior engineers and designers on your portfolio projects. Learn what companies actually want to see.',
      requirements: ['At least 1 project', 'GitHub account', 'Open to feedback'],
    },
    {
      title: 'Open Source Contribution Drive',
      match: '89%',
      reason: 'Goal: Improve Portfolio · Interest: Open Source',
      company: 'BuilderOS OSS',
      type: 'Project · Ongoing',
      deadline: 'Rolling basis',
      description:
        'Contribute to curated open-source projects with mentorship. Real commits on real codebases make your GitHub profile shine.',
      requirements: ['Git basics', 'Any programming language', 'Patience'],
    },
    {
      title: 'Showcase and Demo Day',
      match: '85%',
      reason: 'Goal: Improve Portfolio · Visibility',
      company: 'BuilderOS Events',
      type: 'Event · Live',
      deadline: 'Starts July 20',
      description:
        'Present your best project to a live audience of builders, investors, and recruiters. Win visibility badges and mentorship connections.',
      requirements: ['1 deployed project', '5-min demo prepared', 'GitHub repo'],
    },
  ],
};

const INTEREST_OPPORTUNITY_BOOSTS: Record<Interest, Opportunity> = {
  'AI/ML': {
    title: 'AI/ML Study Group Sprint',
    match: '86%',
    reason: 'Interest: AI/ML · Community learning',
    company: 'BuilderOS',
    type: 'Event · Weekly',
    deadline: 'Every Sunday',
    description:
      'Weekly group sessions to study AI/ML concepts, share projects, and tackle coding challenges together. Hosted by ML engineers from top companies.',
    requirements: ['Interest in AI/ML', 'Any level'],
  },
  'Data Science': {
    title: 'Data Science Reading Club',
    match: '82%',
    reason: 'Interest: Data Science · Community',
    company: 'BuilderOS',
    type: 'Event · Weekly',
    deadline: 'Every Saturday',
    description:
      'A weekly group that reads and discusses DS papers, Kaggle notebooks, and real-world analytics case studies.',
    requirements: ['Interest in data science', 'Any level'],
  },
  'Web Development': {
    title: 'Frontend and Backend Build Week',
    match: '84%',
    reason: 'Interest: Web Development · Project building',
    company: 'DevHub',
    type: 'Challenge · 1 Week',
    deadline: 'Starts July 7',
    description:
      'Build a full-stack web app in one week with daily milestones, code reviews, and peer feedback. Frontend and backend tracks available.',
    requirements: ['HTML/CSS/JS basics', 'Any framework'],
  },
  Cybersecurity: {
    title: 'Capture The Flag (CTF) Competition',
    match: '88%',
    reason: 'Interest: Cybersecurity · Hands-on practice',
    company: 'HackTheBox',
    type: 'Competition · Ongoing',
    deadline: 'Open enrollment',
    description:
      'Practice ethical hacking in a safe environment. CTF challenges cover web vulnerabilities, cryptography, reverse engineering, and more.',
    requirements: ['Basic networking knowledge', 'Linux basics', 'Curiosity'],
  },
  'App Development': {
    title: 'Mobile App Build Challenge',
    match: '87%',
    reason: 'Interest: App Development · Shipping practice',
    company: 'BuilderOS',
    type: 'Challenge · 2 Weeks',
    deadline: 'Starts July 3',
    description:
      'Build and ship a mobile app to the App Store or Play Store in 2 weeks with mentorship, daily check-ins, and peer reviews.',
    requirements: ['React Native or Flutter basics', 'Developer account'],
  },
  'Open Source': {
    title: 'Hacktoberfest Early Challenge',
    match: '85%',
    reason: 'Interest: Open Source · Real contributions',
    company: 'OSS Community',
    type: 'Project · Ongoing',
    deadline: 'Rolling basis',
    description:
      'Get curated beginner-friendly open-source issues to tackle. Merged PRs go on your resume and GitHub profile.',
    requirements: ['Git basics', 'Any language', 'GitHub account'],
  },
};

export function getOpportunities(goal: Goal | null, interests: Interest[]): Opportunity[] {
  const base = goal ? OPPORTUNITIES_BY_GOAL[goal] : [];
  const interestBoosts = interests
    .map((i) => INTEREST_OPPORTUNITY_BOOSTS[i])
    .filter(Boolean)
    .slice(0, 1);
  return [...base, ...interestBoosts].slice(0, 4);
}

// ─── Builders (Circle) ────────────────────────────────────────────────────────

const BUILDERS_BY_GOAL: Record<Goal, Builder[]> = {
  'Get my first internship': [
    {
      name: 'Riya Kapoor',
      match: '94%',
      sameGoal: 'Get my first internship',
      sameInterest: 'Web Development',
      sharedSkills: 'Git, JavaScript, React',
      emoji: '👩‍💻',
      bio: 'CS junior actively applying for SWE internships. Just cracked my first technical interview and happy to share tips!',
      location: 'Chennai, India',
      projects: ['Portfolio Website', 'Todo App with Auth', 'GitHub Stats Dashboard'],
    },
    {
      name: 'Dev Patel',
      match: '91%',
      sameGoal: 'Get my first internship',
      sameInterest: 'App Development',
      sharedSkills: 'React, JavaScript, Git',
      emoji: '🧑‍🎓',
      bio: 'Got my first internship at a startup last month after 3 months of focused grinding. Building in public now.',
      location: 'Pune, India',
      projects: ['Expense Tracker App', 'Weather App', 'Resume Builder Tool'],
    },
    {
      name: 'Mia Chen',
      match: '87%',
      sameGoal: 'Get my first internship',
      sameInterest: 'Open Source',
      sharedSkills: 'Python, Git, SQL',
      emoji: '🌟',
      bio: 'Turning open-source contributions into internship referrals. Portfolio beats GPA every time.',
      location: 'Singapore',
      projects: ['CLI Weather Tool', 'Python Scraper', 'OSS Contribution: pandas'],
    },
  ],
  'Become an ML Engineer': [
    {
      name: 'Priya Shah',
      match: '93%',
      sameGoal: 'Become an ML Engineer',
      sameInterest: 'AI/ML',
      sharedSkills: 'Python, PyTorch, NLP',
      emoji: '🤖',
      bio: 'CS grad student building LLM-powered tools. Passionate about NLP research and deploying models at scale.',
      location: 'Bangalore, India',
      projects: ['Sentiment Analyzer', 'Image Classifier', 'Custom LLM Fine-tuning'],
    },
    {
      name: 'Aryan Gupta',
      match: '88%',
      sameGoal: 'Become an ML Engineer',
      sameInterest: 'AI/ML',
      sharedSkills: 'Python, Machine Learning, Pandas',
      emoji: '🧠',
      bio: 'Self-taught ML engineer who transitioned from software dev. Currently building MLOps pipelines for a Series B startup.',
      location: 'Hyderabad, India',
      projects: ['AutoML Pipeline', 'Stock Prediction Bot', 'NLP Summarizer API'],
    },
    {
      name: 'Li Wei',
      match: '84%',
      sameGoal: 'Become an ML Engineer',
      sameInterest: 'Data Science',
      sharedSkills: 'Python, NLP, SQL',
      emoji: '🔬',
      bio: 'NLP researcher building transformer-based tools. Looking for ML engineers to collaborate with on open-source projects.',
      location: 'Beijing, China',
      projects: ['BERT Fine-tuner', 'Text Classification API', 'Research Summarizer'],
    },
  ],
  'Become a Data Scientist': [
    {
      name: 'Anya Singh',
      match: '92%',
      sameGoal: 'Become a Data Scientist',
      sameInterest: 'Data Science',
      sharedSkills: 'Python, SQL, Pandas',
      emoji: '📊',
      bio: 'Data science enthusiast with a love for turning raw data into meaningful insights. Kaggle Competitions Master.',
      location: 'Delhi, India',
      projects: ['Stock Dashboard', 'Kaggle Top 10%', 'Customer Churn Predictor'],
    },
    {
      name: 'Sam Torres',
      match: '87%',
      sameGoal: 'Become a Data Scientist',
      sameInterest: 'AI/ML',
      sharedSkills: 'Python, SQL, NumPy',
      emoji: '🎯',
      bio: 'Analytics engineer at a mid-size startup. Built the entire data stack from scratch. Open to mentoring new DS folks.',
      location: 'Sao Paulo, Brazil',
      projects: ['Data Pipeline API', 'BI Dashboard', 'Fraud Detection Model'],
    },
    {
      name: 'Fatima Al-Hassan',
      match: '83%',
      sameGoal: 'Become a Data Scientist',
      sameInterest: 'Open Source',
      sharedSkills: 'Python, Pandas, SQL',
      emoji: '🌍',
      bio: 'Open-source contributor to scikit-learn. Passionate about making data science tools accessible worldwide.',
      location: 'Lagos, Nigeria',
      projects: ['OSS: scikit-learn', 'EDA Toolkit', 'Visualization Library'],
    },
  ],
  'Win Hackathons': [
    {
      name: 'Rahul Mehta',
      match: '95%',
      sameGoal: 'Win Hackathons',
      sameInterest: 'Web Development',
      sharedSkills: 'React, JavaScript, APIs',
      emoji: '🏆',
      bio: 'Full-stack builder who loves hackathons. 3x winner in 2024. Always looking for a strong teammate for the next one.',
      location: 'Mumbai, India',
      projects: ['DevFlow App', 'HackTrack', 'AI Scheduling Tool'],
    },
    {
      name: 'Jordan Blake',
      match: '89%',
      sameGoal: 'Win Hackathons',
      sameInterest: 'App Development',
      sharedSkills: 'React, JavaScript, Git',
      emoji: '⚡',
      bio: 'Hackathon veteran with 12 participations and 2 wins. Strongest in rapid prototyping and pitching. Let us team up.',
      location: 'Austin, TX',
      projects: ['Health Tracker App', 'Team Sync Tool', 'Hackathon Timer PWA'],
    },
    {
      name: 'Yuki Tanaka',
      match: '85%',
      sameGoal: 'Win Hackathons',
      sameInterest: 'AI/ML',
      sharedSkills: 'Python, Machine Learning, APIs',
      emoji: '🎮',
      bio: 'ML plus design combo — I build the model AND make it look good. Looking for backend-strong teammates.',
      location: 'Tokyo, Japan',
      projects: ['AI Receipt Scanner', 'Pose Detector App', 'Style Transfer Tool'],
    },
  ],
  'Build a Startup': [
    {
      name: 'Alex Rivera',
      match: '93%',
      sameGoal: 'Build a Startup',
      sameInterest: 'Web Development',
      sharedSkills: 'React, JavaScript, FastAPI',
      emoji: '🚀',
      bio: 'Indie hacker who shipped 3 products last year. One hit $1k MRR. Looking for a co-founder for my next SaaS idea.',
      location: 'Mexico City, Mexico',
      projects: ['LinkSnap (SaaS)', 'HabitOS', 'AI Cover Letter Tool'],
    },
    {
      name: 'Nikhil Joshi',
      match: '89%',
      sameGoal: 'Build a Startup',
      sameInterest: 'AI/ML',
      sharedSkills: 'Python, Machine Learning, FastAPI',
      emoji: '💡',
      bio: 'Ex-consultant turned startup founder. Building an AI tool for small businesses. Looking for a technical co-founder.',
      location: 'Bangalore, India',
      projects: ['SmartBiz AI (MVP)', 'CRM Automation Tool', 'Sales Funnel Analyzer'],
    },
    {
      name: 'Chloe Kim',
      match: '86%',
      sameGoal: 'Build a Startup',
      sameInterest: 'App Development',
      sharedSkills: 'React, JavaScript, Git',
      emoji: '🦄',
      bio: 'Bootstrapped founder. Shipped a mobile app with 500+ users in 3 months. Building the next one now. Let us build together.',
      location: 'Seoul, South Korea',
      projects: ['FocusPal App', 'Budget Buddy', 'Startup Landing Page Kit'],
    },
  ],
  'Freelance Projects': [
    {
      name: 'Marco Rossi',
      match: '91%',
      sameGoal: 'Freelance Projects',
      sameInterest: 'Web Development',
      sharedSkills: 'React, JavaScript, Git',
      emoji: '💼',
      bio: 'Freelance dev with 4 years of client work. Made my first $10k freelancing while in university. Happy to share my playbook.',
      location: 'Milan, Italy',
      projects: ['E-commerce Store', 'Agency Website', 'SaaS Dashboard'],
    },
    {
      name: 'Aisha Okonkwo',
      match: '87%',
      sameGoal: 'Freelance Projects',
      sameInterest: 'App Development',
      sharedSkills: 'React, Python, FastAPI',
      emoji: '🌺',
      bio: 'Freelance app developer earning from client work while building my own products. DM me if you want freelance advice.',
      location: 'Nairobi, Kenya',
      projects: ['Delivery Tracking App', 'HR Portal', 'E-learning Platform'],
    },
    {
      name: 'Tom Walsh',
      match: '83%',
      sameGoal: 'Freelance Projects',
      sameInterest: 'Web Development',
      sharedSkills: 'React, JavaScript, SQL',
      emoji: '🎯',
      bio: 'Agency owner who started as a freelancer. I mentor new freelancers on finding clients, pricing, and staying sane.',
      location: 'Dublin, Ireland',
      projects: ['Client Portal System', 'Proposal Template Kit', 'Dev Agency Site'],
    },
  ],
  'Improve My Portfolio': [
    {
      name: 'Lena Park',
      match: '92%',
      sameGoal: 'Improve My Portfolio',
      sameInterest: 'Open Source',
      sharedSkills: 'React, Git, JavaScript',
      emoji: '🎨',
      bio: 'Portfolio-first builder. I obsess over project presentation, case studies, and GitHub READMEs. Happy to review yours.',
      location: 'Seoul, South Korea',
      projects: ['Personal Portfolio v3', 'Open Source UI Kit', 'Design System Starter'],
    },
    {
      name: 'Omar Abdullah',
      match: '88%',
      sameGoal: 'Improve My Portfolio',
      sameInterest: 'Web Development',
      sharedSkills: 'React, JavaScript, Git',
      emoji: '🛠',
      bio: 'Building in public and documenting every project. My portfolio went from 0 to 3 interview callbacks in 6 weeks.',
      location: 'Dubai, UAE',
      projects: ['Job Tracker App', 'Link Shortener', 'Portfolio CMS'],
    },
    {
      name: 'Sara Lee',
      match: '84%',
      sameGoal: 'Improve My Portfolio',
      sameInterest: 'Open Source',
      sharedSkills: 'Python, Git, SQL',
      emoji: '🌟',
      bio: 'Open-source contributor. My OSS work got me 2 job offers. I will help you find the right projects to contribute to.',
      location: 'Toronto, Canada',
      projects: ['AutoForge OSS', 'Data Cleaning Library', 'Portfolio README Kit'],
    },
  ],
};

const INTEREST_BUILDER_ADDITIONS: Record<Interest, Builder> = {
  'AI/ML': {
    name: 'Kevin Wu',
    match: '82%',
    sameGoal: 'Shared Interest',
    sameInterest: 'AI/ML',
    sharedSkills: 'Python, Machine Learning, NLP',
    emoji: '🤖',
    bio: 'AI enthusiast building side projects with LLMs. Always looking for builders who love AI/ML as much as I do.',
    location: 'San Francisco, CA',
    projects: ['GPT Wrapper App', 'AI Resume Screener', 'Chatbot Framework'],
  },
  'Data Science': {
    name: 'Priya Nair',
    match: '80%',
    sameGoal: 'Shared Interest',
    sameInterest: 'Data Science',
    sharedSkills: 'Python, SQL, Pandas',
    emoji: '📈',
    bio: 'Data-first builder. I turn datasets into stories. Kaggle competitor and analytics dashboard enthusiast.',
    location: 'Mumbai, India',
    projects: ['Finance Dashboard', 'Sports Analytics Tool', 'Kaggle Notebook'],
  },
  'Web Development': {
    name: 'Chris Martin',
    match: '81%',
    sameGoal: 'Shared Interest',
    sameInterest: 'Web Development',
    sharedSkills: 'React, JavaScript, Git',
    emoji: '🌐',
    bio: 'Full-stack web dev building SaaS products and open-source tools. Always up for a collab or code review.',
    location: 'London, UK',
    projects: ['SaaS Boilerplate', 'UI Components Library', 'Full-stack Blog Engine'],
  },
  Cybersecurity: {
    name: 'Elena Petrov',
    match: '80%',
    sameGoal: 'Shared Interest',
    sameInterest: 'Cybersecurity',
    sharedSkills: 'Python, Git, SQL',
    emoji: '🔐',
    bio: 'Security researcher and CTF player. I help developers write more secure code and think like an attacker.',
    location: 'Berlin, Germany',
    projects: ['CTF Write-ups Repo', 'Vulnerability Scanner', 'Security Checklist App'],
  },
  'App Development': {
    name: 'Raj Sharma',
    match: '81%',
    sameGoal: 'Shared Interest',
    sameInterest: 'App Development',
    sharedSkills: 'React, JavaScript, Git',
    emoji: '📱',
    bio: 'Mobile app developer with 5 apps published. I love shipping fast and iterating based on user feedback.',
    location: 'Jaipur, India',
    projects: ['Habit Tracker App', 'Food Log App', 'Expense Manager'],
  },
  'Open Source': {
    name: 'Emma Johansson',
    match: '80%',
    sameGoal: 'Shared Interest',
    sameInterest: 'Open Source',
    sharedSkills: 'Python, Git, SQL',
    emoji: '🌍',
    bio: 'OSS maintainer and contributor. I run a curated list of beginner-friendly repos and love helping new contributors.',
    location: 'Stockholm, Sweden',
    projects: ['OSS Contribution Guide', 'Developer Toolkit', 'GitHub Wrapped Clone'],
  },
};

export function getBuilders(goal: Goal | null, interests: Interest[], _skills: Skill[]): Builder[] {
  const base = goal ? BUILDERS_BY_GOAL[goal] : [];
  const interestBuilder = interests[0] ? INTEREST_BUILDER_ADDITIONS[interests[0]] : null;
  const all = interestBuilder ? [...base, interestBuilder] : base;
  return all.slice(0, 4);
}

// ─── Pulse Items (Circle) ─────────────────────────────────────────────────────

const PULSE_BY_GOAL: Record<Goal, PulseItem[]> = {
  'Get my first internship': [
    {
      iconKey: 'users',
      title: 'Looking for internship study partner',
      author: 'Meera Iyer',
      time: '5m ago',
      desc: 'Prepping for SWE internship interviews — DSA, system design basics, and behavioral Qs. Anyone want to do mock interviews together?',
      actionLabel: 'Join Study Group',
      discussion:
        'Hey! I am Meera and I am deep in internship prep mode. I have been grinding LeetCode for 2 weeks and would love a study buddy or small group to do mock interviews with. Planning to do 1 session per week — 30 min mock, 30 min debrief. Comment below if you are in!',
    },
    {
      iconKey: 'calendar',
      title: 'Portfolio review session tonight',
      author: 'DevHub Team',
      time: '1h ago',
      desc: 'Get live feedback on your internship portfolio from engineers at Google, Amazon, and Atlassian. 8 PM IST.',
      actionLabel: 'Register Now',
      discussion:
        'Join us tonight for a live portfolio review session! Industry mentors from Google, Amazon, and Atlassian will give direct, honest feedback on your projects. This is exactly the kind of session that fast-tracks internship readiness. Spots are limited. Register now!',
    },
    {
      iconKey: 'handshake',
      title: 'Internship openings at Series A startup',
      author: 'TechCorp Recruiter',
      time: '3h ago',
      desc: 'We are hiring 3 software engineering interns for Q3. Strong Git skills, any language, and project experience required.',
      actionLabel: 'View Listing',
      discussion:
        'Hey builders! We are a Series A startup looking for 3 SWE interns for Q3 (July-September). You will build real features used by real customers. Requirements: 1+ project on GitHub, basic coding skills, communication. Apply and mention BuilderOS for priority review.',
    },
    {
      iconKey: 'message',
      title: 'How I landed my first internship — AMA',
      author: 'Dev Patel',
      time: '5h ago',
      desc: 'I got my first internship after 3 months of grinding. Ask me anything about what actually worked.',
      actionLabel: 'Join AMA',
      discussion:
        '3 months ago I had zero internship experience and was getting ghosted everywhere. Then I made 3 changes: fixed my resume format, added 2 real projects to GitHub, and started cold DMing engineers for 15-minute chats. Within 6 weeks I had 3 interviews and 1 offer. Ask me anything — I will answer everything.',
    },
  ],
  'Become an ML Engineer': [
    {
      iconKey: 'users',
      title: 'Looking for ML teammate for AI hackathon',
      author: 'Alex Chen',
      time: '2m ago',
      desc: 'Building a stock market prediction app with LSTM + sentiment analysis. Need someone strong in PyTorch or TensorFlow.',
      actionLabel: 'Join Team',
      discussion:
        'Hey! I am Alex and I am building a real-time stock market prediction model. Looking for someone who can help with model deployment and API integration. Great portfolio piece and we are aiming for top 3. DM me if you are in!',
    },
    {
      iconKey: 'calendar',
      title: 'MLOps workshop this Saturday',
      author: 'DevHub Team',
      time: '45m ago',
      desc: 'Learn how to deploy and monitor ML models in production. Covers Docker, FastAPI, and model drift detection. Free for builders.',
      actionLabel: 'Register Now',
      discussion:
        'We are running a free MLOps workshop this Saturday — 10 AM IST. The agenda: containerizing models with Docker, serving with FastAPI, setting up basic monitoring, and handling model drift. This is the gap most ML learners have. Bring your laptop. Registration closes Friday night.',
    },
    {
      iconKey: 'handshake',
      title: 'AI internship applications open',
      author: 'Company X',
      time: '4h ago',
      desc: 'Looking for 3 ML interns to join our research team this summer. Python and ML fundamentals required.',
      actionLabel: 'View Listing',
      discussion:
        'We are hiring 3 ML interns for this summer. You will work on LLM fine-tuning and RAG pipelines. Requirements: Python, basic ML/DL knowledge, curiosity. We are looking for builders, not just students.',
    },
    {
      iconKey: 'message',
      title: 'Open-source AutoML contribution drive',
      author: 'Sara Lee',
      time: '6h ago',
      desc: 'Looking for Python developers to contribute to an AutoML library. Good first issues available for all levels.',
      actionLabel: 'View Repo',
      discussion:
        'I have been building an open-source AutoML library called AutoForge. We have good first issues for beginners and larger features for experienced builders. Real OSS experience that recruiters love. Star the repo and drop a comment if you want to get involved!',
    },
  ],
  'Become a Data Scientist': [
    {
      iconKey: 'users',
      title: 'Kaggle study group forming',
      author: 'Anya Singh',
      time: '10m ago',
      desc: 'Starting a Kaggle study group — weekly competitions, shared notebooks, and peer reviews. All skill levels welcome.',
      actionLabel: 'Join Group',
      discussion:
        'Hey data builders! Forming a small Kaggle study group — we pick a competition each week, work on it independently, then share notebooks and discuss approaches on Sunday. Goal is to get everyone to a Top 20% finish by end of the month. Drop your Kaggle username below to join!',
    },
    {
      iconKey: 'calendar',
      title: 'Data visualization workshop',
      author: 'DevHub Team',
      time: '2h ago',
      desc: 'Hands-on workshop covering Plotly, Matplotlib, and storytelling with data. Build a portfolio-ready dashboard live.',
      actionLabel: 'Register Now',
      discussion:
        'We are running a free 2-hour visualization workshop this Saturday. Covers Plotly, Matplotlib, and Seaborn. You will leave with a portfolio-ready dashboard built from a real dataset. Hosted by a data engineer from a top analytics firm.',
    },
    {
      iconKey: 'handshake',
      title: 'Data analyst intern positions open',
      author: 'AnalyticsHub',
      time: '5h ago',
      desc: 'Hiring 2 data analyst interns for Q3. Must know SQL and Python. Experience with visualization tools is a plus.',
      actionLabel: 'View Listing',
      discussion:
        'We are AnalyticsHub — a data consultancy working with 20+ clients. Hiring 2 data analyst interns for Q3. Day-to-day: SQL queries, Python scripts, dashboard building, and client presentations. Mention BuilderOS in your application for priority review.',
    },
    {
      iconKey: 'message',
      title: 'How I got a DS job without a degree — AMA',
      author: 'Sam Torres',
      time: '8h ago',
      desc: 'I went from zero to DS job in 14 months using Kaggle, open-source, and one killer project. Sharing my exact path.',
      actionLabel: 'Join AMA',
      discussion:
        '14 months ago I had no CS degree and no data experience. Here is what worked: (1) I completed 3 Kaggle competitions and shared my notebooks publicly. (2) I built one really good end-to-end project with a live demo. (3) I cold-emailed 40 data team leads with my Kaggle profile. Got 6 replies, 3 interviews, 1 offer. Ask me anything.',
    },
  ],
  'Win Hackathons': [
    {
      iconKey: 'users',
      title: 'Team forming for Global AI Hackathon',
      author: 'Jordan Blake',
      time: '3m ago',
      desc: 'Need 2 more builders for the Global AI Hackathon — July 8. Looking for backend and design skills.',
      actionLabel: 'Join Team',
      discussion:
        'Hey! I am Jordan and I have won 2 hackathons in the past year. I am forming a team for the Global AI Hackathon (July 8-10). I handle frontend and pitching. Need: 1 backend/ML person and 1 designer or UI builder. We will plan 2 weeks in advance and have a solid strategy going in. DM me your GitHub.',
    },
    {
      iconKey: 'calendar',
      title: 'Rapid prototyping workshop',
      author: 'DevHub Team',
      time: '1h ago',
      desc: 'Learn how top hackathon teams build and ship in 24 hours. Covers scope definition, stack choices, and demo prep.',
      actionLabel: 'Register Now',
      discussion:
        'Running a free rapid prototyping workshop this Friday. Hosted by a 3x hackathon winner. Topics: how to scope a hackathon idea in 30 min, what stack to pick, building an MVP fast, and making your demo land. This is the stuff that separates winners from participants.',
    },
    {
      iconKey: 'handshake',
      title: 'BuildSprint Challenge starts next week',
      author: 'BuilderOS Events',
      time: '4h ago',
      desc: 'A 72-hour rapid prototyping challenge with a live leaderboard, badges, and prizes. Open to all builders.',
      actionLabel: 'Register Now',
      discussion:
        'BuildSprint is back! A 72-hour challenge to build and ship something that works. Rules: any stack, any idea, must be shipped and demoed live at the end. Leaderboard, badges, and $500 in prizes for top 3. Past participants have used it to prep for major hackathons. Registration closes July 14.',
    },
    {
      iconKey: 'message',
      title: 'My hackathon strategy — AMA',
      author: 'Rahul Mehta',
      time: '6h ago',
      desc: '3x hackathon winner. Sharing my exact playbook for scoping, building, and pitching winning projects.',
      actionLabel: 'Join AMA',
      discussion:
        'I have won 3 hackathons in the last 18 months. The secret? It is 30% code and 70% strategy. I spend the first hour ONLY on scoping and wireframing. I never build something I cannot demo in 3 minutes. And I always have a rehearsed pitch before the first line of code is written. AMA — I will share everything.',
    },
  ],
  'Build a Startup': [
    {
      iconKey: 'users',
      title: 'Co-founder matching event this week',
      author: 'BuilderOS Events',
      time: '5m ago',
      desc: 'Structured 1:1s with potential co-founders based on skills, ideas, and working style. 30 spots left.',
      actionLabel: 'Register Now',
      discussion:
        'This Friday we are running a co-founder matching event. Format: 5-minute intros, 15-minute 1:1s with 3 matched builders, optional follow-up sessions. We match based on skill complement, startup idea fit, and availability. 30 spots left — this sells out every time.',
    },
    {
      iconKey: 'calendar',
      title: 'MVP to $1k MRR workshop',
      author: 'Alex Rivera',
      time: '2h ago',
      desc: 'How I went from idea to $1k MRR in 3 months. Covering product, pricing, and first 10 customers. Live Q&A.',
      actionLabel: 'Register Now',
      discussion:
        'I will be sharing exactly how I got LinkSnap from idea to $1k MRR in 3 months. Agenda: (1) Finding a real problem in 1 week (2) Building an MVP in 2 weeks (3) Getting your first 10 paying customers (4) What NOT to do. Live Q&A at the end. Free for BuilderOS members.',
    },
    {
      iconKey: 'handshake',
      title: 'Founder fellowship applications open',
      author: 'StartupOS',
      time: '5h ago',
      desc: 'Apply for our 12-week founder fellowship. $5k stipend, weekly mentorship, and Demo Day with investors.',
      actionLabel: 'View Listing',
      discussion:
        'StartupOS Fellowship applications are open! 12-week program: $5k stipend, weekly 1:1 with a founder-mentor, cohort of 10 builders, and Demo Day with 15+ investors. Last cohort saw 4 teams raise pre-seed rounds within 3 months. Apply before June 30.',
    },
    {
      iconKey: 'message',
      title: 'I failed 2 startups — here is what I learned',
      author: 'Nikhil Joshi',
      time: '8h ago',
      desc: 'Two failed startups, one successful one. Sharing the 5 mistakes that killed my first two companies — so you do not repeat them.',
      actionLabel: 'Join Discussion',
      discussion:
        'My first startup failed because I built what I wanted, not what users needed. My second failed because I spent 6 months on a product before talking to a single customer. My third is growing because I did the opposite of both. The 5 mistakes: (1) No customer discovery, (2) Co-founder mismatch, (3) Feature creep, (4) Wrong pricing model, (5) Raising too early. AMA.',
    },
  ],
  'Freelance Projects': [
    {
      iconKey: 'users',
      title: 'Freelance accountability group forming',
      author: 'Marco Rossi',
      time: '8m ago',
      desc: 'Starting a small group for freelancers — share wins, review proposals, and keep each other accountable. Weekly check-ins.',
      actionLabel: 'Join Group',
      discussion:
        'Hey! I am starting a freelance accountability group — 5-8 people max. Every week we share: 1 win, 1 challenge, and 1 goal. We also review each other proposals and pricing. Freelancing alone is hard. This group makes it easier. Drop a comment if you want in.',
    },
    {
      iconKey: 'calendar',
      title: 'How to find your first freelance client',
      author: 'Aisha Okonkwo',
      time: '3h ago',
      desc: 'Workshop on landing your first client without cold emailing strangers. Covers platforms, portfolio, and outreach.',
      actionLabel: 'Register Now',
      discussion:
        'Finding your first client is the hardest part of freelancing. I am sharing the exact strategy I used to go from 0 to 3 paying clients in 6 weeks. Topics: building a micro-portfolio, which platforms actually work, how to write outreach messages that get replies, and how to price your first project. Free workshop, limited spots.',
    },
    {
      iconKey: 'handshake',
      title: 'Python automation gig available',
      author: 'RemoteWork.io',
      time: '5h ago',
      desc: 'Looking for a Python dev to build a data scraping and automation pipeline. Part-time, flexible hours, good pay.',
      actionLabel: 'View Listing',
      discussion:
        'We have a part-time Python automation gig available — 10-15 hrs/week, $30-50/hr depending on experience. Scope: build a scraping plus automation pipeline for our internal team. Duration: about 4 weeks. Requirements: Python, Selenium or BeautifulSoup, comfortable working async.',
    },
    {
      iconKey: 'message',
      title: 'My freelance pricing mistakes — AMA',
      author: 'Tom Walsh',
      time: '7h ago',
      desc: 'I undercharged for 2 years before I figured out pricing. Sharing what changed everything for me.',
      actionLabel: 'Join AMA',
      discussion:
        'I undercharged for 2 years. I once built a full e-commerce site for $500. The client sold it for $15k 6 months later. Here is what changed: I stopped pricing by hours and started pricing by value. I raised my rates 3x with a new framing. My close rate actually went UP. AMA about pricing, proposals, or client relationships.',
    },
  ],
  'Improve My Portfolio': [
    {
      iconKey: 'users',
      title: 'Portfolio review swap — 2 spots left',
      author: 'Lena Park',
      time: '12m ago',
      desc: 'Doing a portfolio review swap with 3 other builders. You review mine, I review yours. Honest, detailed feedback only.',
      actionLabel: 'Join Swap',
      discussion:
        'Portfolio review swap! Here is how it works: each person in the group reviews everyone else portfolio and leaves detailed written feedback. Focus on: project presentation, case study quality, README clarity, and overall vibe. 4 people max. 2 spots left. Comment with your portfolio link to join.',
    },
    {
      iconKey: 'calendar',
      title: 'Case study writing workshop',
      author: 'DevHub Team',
      time: '2h ago',
      desc: 'Learn how to write case studies that make recruiters and clients stop scrolling. Includes a live template walkthrough.',
      actionLabel: 'Register Now',
      discussion:
        'A strong case study is worth more than 5 extra projects. This workshop covers: what information to include, how to structure it, how to show your thinking process, and how to present impact with numbers. We will do a live walkthrough of a before/after case study. Free for BuilderOS members.',
    },
    {
      iconKey: 'handshake',
      title: 'Showcase and Demo Day — submit your project',
      author: 'BuilderOS Events',
      time: '4h ago',
      desc: 'Present your best project to builders, investors, and recruiters at our monthly showcase. Open to all.',
      actionLabel: 'Submit Project',
      discussion:
        'BuilderOS Showcase is back! Present your best project in a 5-minute demo to an audience of builders, investors, and recruiters. Past showcases have led to job offers, freelance clients, and co-founder connections. Requirements: 1 deployed project, 5-min demo, GitHub repo. Submit before July 18.',
    },
    {
      iconKey: 'message',
      title: 'My GitHub went from 0 to 200 stars — AMA',
      author: 'Omar Abdullah',
      time: '9h ago',
      desc: 'I rewrote my project READMEs and documented my process in public. Here is what happened next.',
      actionLabel: 'Join AMA',
      discussion:
        '6 weeks ago my GitHub was invisible. I had projects but no context, no READMEs, no screenshots. I spent one weekend rewriting everything: added demo GIFs, clear feature lists, tech stack badges, and a personal why-I-built-this section. Then I shared each project on Twitter and here. 200+ stars later and 3 DMs from recruiters. AMA.',
    },
  ],
};

const INTEREST_PULSE_ADDITIONS: Record<Interest, PulseItem> = {
  'AI/ML': {
    iconKey: 'message',
    title: 'AI builders weekly show-and-tell',
    author: 'BuilderOS AI Club',
    time: '30m ago',
    desc: 'Share what you have been building with AI this week. All tools, models, and experiments welcome. No gatekeeping.',
    actionLabel: 'Share Your Build',
    discussion:
      'Every Friday we do a show-and-tell for AI builders. Share a demo, a notebook, a model, an experiment — anything you built with AI this week. No judgment, no gatekeeping. This is how we learn from each other and stay inspired. Drop your link or a short description below.',
  },
  'Data Science': {
    iconKey: 'message',
    title: 'Dataset of the week challenge',
    author: 'BuilderOS DS Club',
    time: '1h ago',
    desc: 'This week dataset: NYC taxi ride data. Build something interesting and share your notebook by Sunday.',
    actionLabel: 'Get Dataset',
    discussion:
      'Every week we drop a dataset and challenge the community to do something interesting with it. This week: NYC Taxi Ride data from 2023. Build a viz, find a pattern, train a model — anything goes. Share your Kaggle notebook or GitHub link by Sunday. Best submission gets featured in the next newsletter.',
  },
  'Web Development': {
    iconKey: 'message',
    title: 'Web dev weekly build challenge',
    author: 'BuilderOS Web Club',
    time: '45m ago',
    desc: 'This week challenge: build a URL shortener with a click analytics dashboard. Share your live link by Friday.',
    actionLabel: 'Join Challenge',
    discussion:
      'Weekly web build challenge! This week: build a URL shortener with click analytics. Must be live (not just code). Must track: total clicks, unique visitors, and click-over-time graph. Share your live URL by Friday. Best implementation gets featured and wins a 1:1 code review session.',
  },
  Cybersecurity: {
    iconKey: 'message',
    title: 'CTF writeup exchange',
    author: 'BuilderOS Security Club',
    time: '2h ago',
    desc: 'Share your CTF writeup and read others. Great way to learn new attack patterns and build your public profile.',
    actionLabel: 'Share Writeup',
    discussion:
      'Every week we exchange CTF writeups. Whether you solved it completely or got stuck halfway, sharing your approach helps everyone learn. Post your writeup on GitHub or a blog and share the link here. Best writeup of the week gets pinned to our resources page.',
  },
  'App Development': {
    iconKey: 'message',
    title: 'App builders weekly demo',
    author: 'BuilderOS App Club',
    time: '1h ago',
    desc: 'Share what you have been building on mobile. Share a screen recording or TestFlight link for feedback.',
    actionLabel: 'Share Your App',
    discussion:
      'Weekly app demo thread! Share a screen recording, TestFlight link, or APK of what you have been building. Even if it is just a feature or a flow — show it. The community will give feedback on UX, performance, and design. This is better than any code review for mobile builders.',
  },
  'Open Source': {
    iconKey: 'message',
    title: 'Good first issue roundup',
    author: 'BuilderOS OSS Club',
    time: '1h ago',
    desc: 'Curated list of good first issues from active repos this week. Perfect for getting your first OSS contribution merged.',
    actionLabel: 'Browse Issues',
    discussion:
      'Weekly roundup of good first issues from active open-source repos. This week picks span Python, JavaScript, and Go. Each issue has a difficulty rating and a rough time estimate. Contributing to these repos gets you real-world code review experience and a merged PR on your profile. Link in replies.',
  },
};

export function getPulseItems(goal: Goal | null, interests: Interest[]): PulseItem[] {
  const base = goal ? PULSE_BY_GOAL[goal] : [];
  const interestPulse = interests[0] ? INTEREST_PULSE_ADDITIONS[interests[0]] : null;
  const all = interestPulse ? [...base, interestPulse] : base;
  return all.slice(0, 4);
}
