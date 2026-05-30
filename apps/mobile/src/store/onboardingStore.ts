import { create } from 'zustand';

export type Goal =
  | 'Get my first internship'
  | 'Become an ML Engineer'
  | 'Become a Data Scientist'
  | 'Win Hackathons'
  | 'Build a Startup'
  | 'Freelance Projects'
  | 'Improve My Portfolio';

export type Skill =
  | 'Python'
  | 'Machine Learning'
  | 'Data Analysis'
  | 'SQL'
  | 'Pandas'
  | 'NumPy'
  | 'NLP'
  | 'Java'
  | 'React'
  | 'JavaScript'
  | 'Git'
  | 'FastAPI';

export type Interest =
  | 'AI/ML'
  | 'Data Science'
  | 'Web Development'
  | 'Cybersecurity'
  | 'App Development'
  | 'Open Source';

interface OnboardingState {
  profile: {
    fullName: string;
    username: string;
    educationLevel: string;
    location: string;
  };
  goal: Goal | null;
  skills: Skill[];
  interests: Interest[];
  isComplete: boolean;
  setProfile: (profile: Partial<OnboardingState['profile']>) => void;
  setGoal: (goal: Goal) => void;
  toggleSkill: (skill: Skill) => void;
  toggleInterest: (interest: Interest) => void;
  completeOnboarding: () => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  profile: {
    fullName: '',
    username: '',
    educationLevel: '',
    location: '',
  },
  goal: null,
  skills: [],
  interests: [],
  isComplete: false,
  setProfile: (profile) => set((state) => ({ profile: { ...state.profile, ...profile } })),
  setGoal: (goal) => set({ goal }),
  toggleSkill: (skill) =>
    set((state) => ({
      skills: state.skills.includes(skill)
        ? state.skills.filter((s) => s !== skill)
        : [...state.skills, skill],
    })),
  toggleInterest: (interest) =>
    set((state) => ({
      interests: state.interests.includes(interest)
        ? state.interests.filter((i) => i !== interest)
        : [...state.interests, interest],
    })),
  completeOnboarding: () => set({ isComplete: true }),
}));
