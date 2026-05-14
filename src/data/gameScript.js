export const SCENES = [
  {
    id: 'course_registration',
    week: 'Before It Begins',
    icon: 'notebook',
    prompt: 'Course registration glows on your laptop at 11pm. The page asks you to build your schedule for the year. Your stomach tightens a little. How much are you willing to carry?',
    choices: [
      {
        label: '6 AP Classes',
        effects: { social: -1, mental: -2, physical: -1 },
        nextScene: 'first_week',
        reflection: "You told yourself you could handle it. You're not sure you believe that yet.",
      },
      {
        label: '3 AP Classes',
        effects: { social: 0, mental: -1, physical: 0 },
        nextScene: 'first_week',
        reflection: 'A reasonable load. Still, the list of things you want to do is longer than the hours in a day.',
      },
      {
        label: 'No AP Classes',
        effects: { social: 0, mental: 0, physical: 0 },
        nextScene: 'first_week',
        reflection: 'Your counselor looked surprised. You tried not to let that bother you.',
      },
    ],
  },
  {
    id: 'first_week',
    week: 'Week 1',
    icon: 'pencil',
    prompt: "Someone from your old friend group texts about a get-together Friday night. You have a reading due Monday that you haven't started. It's the first week — it probably won't matter either way.",
    choices: [
      {
        label: 'Go to the get-together',
        effects: { social: 2, mental: 1, physical: -1 },
        nextScene: 'club_decision',
        reflection: "You laughed more than you have in weeks. Monday felt far away, until it wasn't.",
      },
      {
        label: 'Stay in and get ahead',
        effects: { social: -1, mental: -1, physical: 1 },
        nextScene: 'club_decision',
        reflection: 'You finished the reading. You also stared at the ceiling for an hour wondering if this was worth it.',
      },
      {
        label: 'Say maybe, do neither',
        effects: { social: -1, mental: 0, physical: 0 },
        nextScene: 'club_decision',
        reflection: 'You kept the option open until it closed on its own. A quiet kind of loneliness.',
      },
    ],
  },
  {
    id: 'club_decision',
    week: 'Week 2',
    icon: 'scissors',
    prompt: "Club sign-ups are posted. You see three things you genuinely care about. You know you can't do all of them well. Or maybe you can. You've done more before. Haven't you?",
    choices: [
      {
        label: 'Join all three',
        effects: { social: 1, mental: -2, physical: -1 },
        nextScene: 'first_test',
        reflection: 'Your calendar is colorful and full. You feel important and exhausted at the same time.',
      },
      {
        label: 'Join one intentionally',
        effects: { social: 1, mental: 0, physical: 0 },
        nextScene: 'first_test',
        reflection: "One thing done well. It turns out that's harder than it sounds.",
      },
      {
        label: 'Skip clubs this semester',
        effects: { social: -1, mental: 1, physical: 0 },
        nextScene: 'first_test',
        reflection: "More time. Less to show for it. You're still figuring out which matters more.",
      },
    ],
  },
  {
    id: 'first_test',
    week: 'Week 4',
    icon: 'pencil',
    prompt: 'Your first big test is in two days. A friend asks if you want to study together. You work faster alone but the silence of your room has been loud lately.',
    choices: [
      {
        label: 'Study with your friend',
        effects: { social: 1, mental: 1, physical: 0 },
        nextScene: 'midterm_crunch',
        reflection: "You didn't finish all your notes. You also remembered why you like this person.",
      },
      {
        label: 'Study alone, no distractions',
        effects: { social: 0, mental: -1, physical: -1 },
        nextScene: 'midterm_crunch',
        reflection: 'You covered everything. You also forgot to eat dinner.',
      },
      {
        label: 'Ask the teacher for help instead',
        effects: { social: 0, mental: 2, physical: 0 },
        nextScene: 'midterm_crunch',
        reflection: 'It felt strange to ask. It helped more than you expected.',
      },
    ],
  },
  {
    id: 'midterm_crunch',
    week: 'Week 7 — Midterms',
    icon: 'notebook',
    prompt: "It's midnight before midterms. You're behind on two subjects. Your body is asking you to sleep. Your brain is running threat assessments. One of them is going to win.",
    choices: [
      {
        label: 'Pull an all-nighter',
        effects: { social: 0, mental: -2, physical: -2 },
        nextScene: 'after_midterms',
        reflection: "You made it through the test. You spent the next three days recovering in ways no one could see.",
      },
      {
        label: 'Sleep at a reasonable hour',
        effects: { social: 0, mental: 1, physical: 1 },
        nextScene: 'after_midterms',
        reflection: 'You left some questions blank. You also woke up feeling like a person.',
      },
      {
        label: 'Text a friend to panic together',
        effects: { social: 1, mental: 0, physical: -1 },
        nextScene: 'after_midterms',
        reflection: "Shared panic is still panic. But somehow it was easier to breathe.",
      },
    ],
  },
  {
    id: 'after_midterms',
    week: 'Week 8',
    icon: 'glue',
    prompt: "Midterms are done. You got your grade back. It's not what you wanted. Maybe it's fine. Maybe it means something. You sit with it for longer than you planned.",
    choices: [
      {
        label: 'Reach out to someone',
        effects: { social: 2, mental: 1, physical: 0 },
        nextScene: 'late_semester',
        reflection: "They said the right thing without knowing it. Some things still land.",
      },
      {
        label: 'Process it alone',
        effects: { social: 0, mental: 0, physical: 0 },
        nextScene: 'late_semester',
        reflection: 'You closed the tab. You opened it again. You closed it one more time.',
      },
      {
        label: 'Throw yourself back into work',
        effects: { social: -1, mental: -1, physical: -1 },
        nextScene: 'late_semester',
        reflection: 'Staying busy felt like a solution. It mostly just postponed the feeling.',
      },
    ],
  },
  {
    id: 'late_semester',
    week: 'Week 10',
    icon: 'scissors',
    prompt: "A college representative is visiting campus. Everyone around you seems to know exactly what they want to say about themselves. You're not sure what your story is right now. Or if it's good enough.",
    choices: [
      {
        label: 'Talk to the representative',
        effects: { social: 1, mental: -1, physical: 0 },
        nextScene: 'finals_week',
        reflection: "You said words that sounded right. You're not sure they were true.",
      },
      {
        label: 'Observe from a distance',
        effects: { social: 0, mental: 0, physical: 0 },
        nextScene: 'finals_week',
        reflection: 'You watched other people perform their futures. You felt tired and strangely relieved.',
      },
      {
        label: 'Leave early to work on your essay',
        effects: { social: -1, mental: -1, physical: 0 },
        nextScene: 'finals_week',
        reflection: 'You got two paragraphs done. The rest of the night you stared at the blinking cursor.',
      },
    ],
  },
  {
    id: 'finals_week',
    week: 'Finals Week',
    icon: 'notebook',
    prompt: "It's here. Finals week. The semester is almost a memory. You can feel everything you've been carrying — the choices, the late nights, the things you wish you'd done differently. One last push.",
    choices: [
      {
        label: 'Power through alone',
        effects: { social: -1, mental: -2, physical: -2 },
        nextScene: 'semester_end',
        reflection: 'You finished. No one saw how close you were to not finishing.',
      },
      {
        label: 'Ask for an extension',
        effects: { social: 0, mental: 1, physical: 1 },
        nextScene: 'semester_end',
        reflection: 'It felt like failing. It was actually just asking for what you needed.',
      },
      {
        label: 'Do what you can and let go',
        effects: { social: 0, mental: 2, physical: 1 },
        nextScene: 'semester_end',
        reflection: "Not everything got done. You are still here. That matters more than the grade.",
      },
    ],
  },
  {
    id: 'semester_end',
    week: 'End of Semester',
    icon: 'logo',
    prompt: "The semester is over. Your room is quiet. You look back at everything — the choices that felt small and weren't, the nights that cost more than you planned, the moments that held you together when nothing else did. You made it through. That's not nothing.",
    choices: [],
  },
];

export const SCENES_BY_ID = Object.fromEntries(SCENES.map(s => [s.id, s]));
