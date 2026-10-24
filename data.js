/* Fluence — content. Each movement's name is also its illustration file name:
   assets/illustrations/<topic>/<name>.png */

const MOVEMENTS = [
  /* ---------- GYM BASICS ---------- */
  { id: 'squat', name: 'Squat', topic: 'gym', group: 'lower' },
  { id: 'lunge', name: 'Lunge', topic: 'gym', group: 'lower' },
  { id: 'hip-thrust', name: 'Hip Thrust', topic: 'gym', group: 'lower' },
  { id: 'rdl', name: 'Romanian Deadlift', topic: 'gym', group: 'lower' },
  { id: 'leg-press', name: 'Leg Press', topic: 'gym', group: 'lower' },
  { id: 'shoulder-press', name: 'Shoulder Press', topic: 'gym', group: 'arms' },
  { id: 'lateral-raise', name: 'Lateral Raise', topic: 'gym', group: 'arms' },
  { id: 'bicep-curl', name: 'Bicep Curl', topic: 'gym', group: 'arms' },
  { id: 'tricep-extension', name: 'Tricep Extension', topic: 'gym', group: 'arms' },
  { id: 'lat-pulldown', name: 'Lat Pulldown', topic: 'gym', group: 'machine' },
  { id: 'seated-row', name: 'Seated Row', topic: 'gym', group: 'machine' },
  { id: 'chest-press', name: 'Chest Press', topic: 'gym', group: 'machine' },
  { id: 'plank', name: 'Plank', topic: 'gym', group: 'core' },
  { id: 'glute-kickback', name: 'Glute Kickback', topic: 'gym', group: 'lower' },
  { id: 'russian-twist', name: 'Russian Twist', topic: 'gym', group: 'core' },
  { id: 'leg-extension', name: 'Leg Extension', topic: 'gym', group: 'lower' },

  /* ---------- MAT PILATES ---------- */
  { id: 'shoulder-bridge', name: 'Shoulder Bridge', topic: 'pilates', group: 'bridge' },
  { id: 'bicycle', name: 'Bicycle Crunch', topic: 'pilates', group: 'twist' },
  { id: 'side-kick', name: 'Side Kick', topic: 'pilates', group: 'seated' },
  { id: 'the-hundred', name: 'The Hundred', topic: 'pilates', group: 'ext' },
  { id: 'roll-up', name: 'Roll Up', topic: 'pilates', group: 'seated' },
  { id: 'table-top', name: 'Table Top', topic: 'pilates', group: 'quad' },
  { id: 'cat-cow', name: 'Cat & Cow', topic: 'pilates', group: 'quad' },
  { id: 'oblique-crunch', name: 'Oblique Crunch', topic: 'pilates', group: 'twist' },
  { id: 'bear-hold', name: 'Bear Hold', topic: 'pilates', group: 'quad' },
  { id: 'glute-bridge', name: 'Glute Bridge', topic: 'pilates', group: 'bridge' },
  { id: 'bird-dog', name: 'Bird Dog', topic: 'pilates', group: 'quad' },
  { id: 'single-leg-extension', name: 'Single-Leg Extension', topic: 'pilates', group: 'ext' },
  { id: 'side-bend', name: 'Side Bend with Reach', topic: 'pilates', group: 'seated' },
  { id: 'double-leg-stretch', name: 'Double-Leg Stretch', topic: 'pilates', group: 'ext' },
  { id: 'side-plank', name: 'Side Plank', topic: 'pilates', group: 'quad' },
  { id: 'toe-taps', name: 'Toe Taps', topic: 'pilates', group: 'ext' },
];

const TOPICS = {
  gym: { id: 'gym', title: 'Gym Basics', blurb: 'Squats, presses, machines and more' },
  pilates: { id: 'pilates', title: 'Mat Pilates', blurb: 'The Hundred, Bear Hold, Cat & Cow… yes, really' },
};

/* Illustration: the PNG named after the movement. */
function illo(m) {
  const src = `assets/illustrations/${m.topic}/${encodeURIComponent(m.name)}.png`;
  return `<img class="illo" src="${src}" alt="${m.name}" draggable="false">`;
}
