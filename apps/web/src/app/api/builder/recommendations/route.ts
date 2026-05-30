import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const goal = searchParams.get('goal');
  const skills = searchParams.get('skills')?.split(',') || [];
  const interests = searchParams.get('interests')?.split(',') || [];

  // This is a mock AI recommendation engine
  // In a real app, this would query a database or call an LLM

  const recommendations = {
    actions: [
      {
        id: '1',
        title:
          goal === 'Get my first internship'
            ? 'Build a Resume Analyzer'
            : 'Complete a core project',
        reason: `Based on your goal: ${goal}`,
        time: '4-6 Hours',
      },
      {
        id: '2',
        title: 'Join DevHub AI Hackathon',
        reason: interests.includes('AI/ML')
          ? 'High match with your interests'
          : 'Great for momentum',
        time: 'Next Weekend',
      },
    ],
    opportunities: [
      {
        id: 'o1',
        title: interests.includes('AI/ML') ? 'AI Research Intern' : 'Product Developer Intern',
        match: '92%',
        reason: `Matches your skills: ${skills.slice(0, 2).join(', ')}`,
      },
    ],
    builders: [
      {
        id: 'b1',
        name: 'Priya Shah',
        match: '92%',
        reason: `Same Goal: ${goal}`,
        skills: 'Python, PyTorch',
      },
    ],
  };

  return NextResponse.json(recommendations);
}
