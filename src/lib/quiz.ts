export type QuizTier = 'foundation' | 'growth_ready' | 'scale_potential' | 'strategic_scaling';

export type SingleChoiceQuestionId = 'q1' | 'q2' | 'q4' | 'q5' | 'q6';
export type QuizQuestionId = SingleChoiceQuestionId | 'q3';

export interface QuizContact {
  name: string;
  business: string;
  email: string;
  phone: string;
}

export interface QuizAnswers {
  q1: number;
  q2: number;
  q3: string[];
  q4: number;
  q5: number;
  q6: number;
}

export interface SingleChoiceQuestion {
  id: SingleChoiceQuestionId;
  type: 'single';
  question: string;
  options: {
    text: string;
    points: number;
  }[];
}

export interface MultiSelectQuestion {
  id: 'q3';
  type: 'multi';
  question: string;
  options: string[];
}

export type QuizQuestion = SingleChoiceQuestion | MultiSelectQuestion;

export interface QuizTierContent {
  name: string;
  headline: string;
  summary: string;
  meaning: string[];
  opportunity: string;
  opportunityPoints: string[];
  nextStep: string;
}

export const emptyQuizAnswers: QuizAnswers = {
  q1: 0,
  q2: 0,
  q3: [],
  q4: 0,
  q5: 0,
  q6: 0,
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    type: 'single',
    question: 'How would you describe how your marketing is performing right now?',
    options: [
      { text: "We're spending, but it's hard to tell what's actually working.", points: 1 },
      { text: "We've tried ads or agencies, but nothing has been reliably consistent.", points: 2 },
      { text: "We're getting some results, but we're not sure what to focus on next.", points: 3 },
      { text: "We're growing, but we don't know where the next profitable lever is.", points: 4 },
    ],
  },
  {
    id: 'q2',
    type: 'single',
    question: 'How confident do you feel about what your marketing needs in the next 3-6 months?',
    options: [
      { text: "Honestly, we're guessing. We don't have a clear plan.", points: 1 },
      { text: "We have ideas, but we're not sure what will actually work.", points: 2 },
      { text: 'We know some of the right moves, but need clarity on priority.', points: 3 },
      { text: "We're confident, but want to validate our next growth steps.", points: 4 },
    ],
  },
  {
    id: 'q3',
    type: 'multi',
    question: 'What marketing activity are you currently running?',
    options: [
      'We post a bit on social media.',
      'We run paid ads (Meta / Google).',
      'We send emails or run automations.',
      'We work with an agency or freelancer.',
      "We're not doing much right now.",
    ],
  },
  {
    id: 'q4',
    type: 'single',
    question: 'How clear are you on what your next growth move should be?',
    options: [
      { text: 'Not clear at all - everything feels like a guess.', points: 1 },
      { text: 'We have ideas, but not sure what will actually work.', points: 2 },
      { text: "We're fairly clear, but unsure about priority or order.", points: 3 },
      { text: "We're clear, but want validation that we're choosing right.", points: 4 },
    ],
  },
  {
    id: 'q5',
    type: 'single',
    question: 'How well do you understand which parts of your marketing make money?',
    options: [
      { text: "We're unsure - we don't really know what's driving results.", points: 1 },
      { text: 'We know some of it, but there are big blind spots.', points: 2 },
      { text: 'We understand the basics but need clearer data to scale confidently.', points: 3 },
      { text: 'We have solid tracking and want to optimise further.', points: 4 },
    ],
  },
  {
    id: 'q6',
    type: 'single',
    question: 'What best describes your growth plans for the next 6 months?',
    options: [
      { text: 'We want stable, predictable performance before investing more.', points: 1 },
      { text: 'We want to fix our foundation so we can start scaling.', points: 2 },
      { text: "We're ready to scale but need clarity on the right strategy.", points: 3 },
      { text: 'We are pushing for aggressive growth and want a proven roadmap.', points: 4 },
    ],
  },
];

export const tierContent: Record<QuizTier, QuizTierContent> = {
  foundation: {
    name: 'Foundation Stage',
    headline: "You're in the Foundation Stage - clarity comes before scaling.",
    summary:
      "You're doing some marketing, but the picture is not clear enough to make confident decisions. Growth is limited less by effort and more by uncertainty around what is working and what to do next.",
    meaning: [
      'You may be spending time or money without knowing the return.',
      'It is difficult to prioritise because nothing is clearly defined.',
      'You are relying on guesses or inconsistent advice.',
    ],
    opportunity: "You're closer to predictable performance than you think. With a clear roadmap, you can see:",
    opportunityPoints: ['what is driving results', 'what to fix first', 'what to invest in next'],
    nextStep:
      "Join the free training and we'll walk you through the roadmap for building profitable, predictable marketing.",
  },
  growth_ready: {
    name: 'Growth Ready',
    headline: "You're Growth Ready - you have momentum, but need direction.",
    summary:
      "You're doing the right things, but the next move is not obvious. You have outgrown trial-and-error marketing and need structure to scale.",
    meaning: [
      'Some channels work, but not consistently.',
      'You are missing prioritisation and sequencing.',
      'Small improvements could unlock meaningful growth.',
    ],
    opportunity: 'Your business will scale faster once you know:',
    opportunityPoints: ['what to stop', 'what to double down on', 'the exact order to implement changes'],
    nextStep:
      'Join the free training and you will walk away knowing what to focus on first, second, and third.',
  },
  scale_potential: {
    name: 'Scale Potential',
    headline: "You're in the Scale Potential Stage - one or two levers could unlock significant growth.",
    summary:
      "Your marketing works, but not at the level it could. You're hitting a ceiling because the system is not compounding yet.",
    meaning: [
      'You understand your channels, but growth is not predictable.',
      'Something in the strategy or execution is blocking scale.',
      'You need structure more than more activity.',
    ],
    opportunity:
      'Most brands at this stage scale faster once they identify the key bottleneck, usually messaging, channel inefficiency, sequencing, or tracking.',
    opportunityPoints: [],
    nextStep:
      'Join the free training and we will show you how to identify and fix your highest-leverage growth lever.',
  },
  strategic_scaling: {
    name: 'Strategic Scaling',
    headline: "You're in the Strategic Scaling Stage - ready for precision growth.",
    summary:
      'You are ahead of most brands. You have structure, momentum, and a clear view of your marketing. Now you need sharper strategy and validated direction.',
    meaning: [
      'You are executing, but want higher confidence in your next move.',
      'The wrong investment could slow momentum.',
      'Precision will multiply returns.',
    ],
    opportunity: 'At this level, growth comes from:',
    opportunityPoints: [
      'selecting the right high-leverage move',
      'eliminating inefficiencies',
      'sequencing the next 6-12 months with precision',
    ],
    nextStep:
      'Join the free training to validate the right direction and sharpen your next scale move.',
  },
};

export function calculateQ3Score(selectedOptions: string[]): number {
  if (selectedOptions.includes("We're not doing much right now.")) return 1;
  if (selectedOptions.length <= 1) return 2;
  if (selectedOptions.length <= 3) return 3;
  return 4;
}

export function calculateTotalScore(answers: QuizAnswers): number {
  return answers.q1 + answers.q2 + calculateQ3Score(answers.q3) + answers.q4 + answers.q5 + answers.q6;
}

export function getTierFromScore(score: number): QuizTier {
  if (score <= 9) return 'foundation';
  if (score <= 14) return 'growth_ready';
  if (score <= 19) return 'scale_potential';
  return 'strategic_scaling';
}

export function getSingleChoiceAnswerText(questionId: SingleChoiceQuestionId, points: number): string {
  const question = quizQuestions.find(
    (item): item is SingleChoiceQuestion => item.id === questionId && item.type === 'single'
  );

  const option = question?.options.find((item) => item.points === points);
  return option?.text ?? 'Not answered';
}
