import { Code, Search, Settings, ShieldCheck, Zap, BarChart3, TrendingUp, Users } from 'lucide-react';

export const SERVICES = [
  {
    id: 'audit',
    title: 'AI Readiness Quiz',
    description: 'Find out exactly where your business is leaking time with a 2-minute diagnostic.',
    iconName: 'Search',
  },
  {
    id: 'plan',
    title: 'Personalized Action Plan',
    description: 'Get a list of "Quick Wins" you can set up in 30-60 minutes to reclaim your week.',
    iconName: 'Zap',
  },
  {
    id: 'assessment',
    title: 'Expert Tools Assessment',
    description: 'A deep-dive 1-on-1 session to build your full custom automation roadmap.',
    iconName: 'ShieldCheck',
  },
];

export const HOW_IT_WORKS = [
  {
    id: '1',
    title: 'The Audit',
    description: 'Take our quick AI quiz to identify where manual tasks are slowing you down.',
  },
  {
    id: '2',
    title: 'The Action Plan',
    description: 'Received a personalized plan via email with immediate "quick win" setups.',
  },
  {
    id: '3',
    title: 'The Assessment',
    description: 'Book a 1-on-1 call for a full workflow optimization and custom tool roadmap.',
  },
];

export const BENEFITS = [
  {
    id: 'time-leaks',
    title: 'Fix Time Leaks',
    description: 'Stop wasting hours on tasks that simple AI tools can do in seconds.',
    iconName: 'BarChart3',
  },
  {
    id: 'practical',
    title: 'Practical Results',
    description: 'No fluff. No complex tutorials. Just simple tools that work for service businesses.',
    iconName: 'TrendingUp',
  },
  {
    id: 'beginner-friendly',
    title: 'Beginner Optimized',
    description: 'Perfect for solo operators who want to use AI without becoming a tech expert.',
    iconName: 'Users',
  },
];

export const TESTIMONIALS = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    role: 'Virtual Assistant',
    company: 'Sarah Helps',
    content: 'I was overwhelmed by AI talk. Ai My Business gave me 3 tools that saved me 5 hours a week immediately. The personalized plan was so easy to follow.',
    avatar: 'https://picsum.photos/seed/sarah/100/100',
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Copywriter',
    company: 'Chen Creative',
    content: 'The assessment call was worth every cent. I stopped guessing which tools to use and now have a system that handles my lead gen automatically.',
    avatar: 'https://picsum.photos/seed/michael/100/100',
  },
];
