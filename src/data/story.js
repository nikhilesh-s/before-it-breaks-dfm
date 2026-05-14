/**
 * Game script / story data for "Before It Breaks"
 *
 * Structure:
 *   scenes[]       — ordered list of scene descriptors
 *   scene.id       — unique string key, matches /scenes/<SceneName>.jsx
 *   scene.type     — 'dialogue' | 'choice' | 'transition' | 'ending'
 *   scene.statDelta — optional { social, mental, physical } ±values applied on enter
 *
 * Replace this stub with the full script when copy is ready.
 */

export const INITIAL_STATS = {
  social:   5,
  mental:   5,
  physical: 5,
};

export const scenes = [
  {
    id: 'intro',
    type: 'dialogue',
    speaker: null,
    lines: [
      'Story content goes here.',
      'Replace with final script.',
    ],
    next: 'scene-01',
  },
  {
    id: 'scene-01',
    type: 'choice',
    speaker: 'Character',
    prompt: 'What do you do?',
    choices: [
      { label: 'Option A', next: 'scene-02a', statDelta: { social: 1 } },
      { label: 'Option B', next: 'scene-02b', statDelta: { mental: -1 } },
    ],
  },
  {
    id: 'scene-02a',
    type: 'dialogue',
    lines: ['Placeholder scene 02a.'],
    next: 'ending-good',
  },
  {
    id: 'scene-02b',
    type: 'dialogue',
    lines: ['Placeholder scene 02b.'],
    next: 'ending-neutral',
  },
  {
    id: 'ending-good',
    type: 'ending',
    lines: ['Good ending placeholder.'],
  },
  {
    id: 'ending-neutral',
    type: 'ending',
    lines: ['Neutral ending placeholder.'],
  },
];

export const scenesById = Object.fromEntries(scenes.map(s => [s.id, s]));
