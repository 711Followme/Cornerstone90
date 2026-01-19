import { DailyReading } from './journeyData';

/**
 * FORGE Content Generation System
 * Generates remaining Nehemiah readings (Days 28-90) based on established patterns
 */

// Week themes and focus areas
const weeklyThemes = [
  { week: 5, days: [29, 30, 31, 32, 33, 34], theme: "Confession and Repentance", focus: "Deep Heart Work" },
  { week: 6, days: [36, 37, 38, 39, 40, 41], theme: "Covenant Renewal", focus: "Making Binding Commitments" },
  { week: 7, days: [43, 44, 45, 46, 47, 48], theme: "Dedication and Celebration", focus: "Celebrating Progress" },
  { week: 8, days: [50, 51, 52, 53, 54, 55], theme: "Organizing for Success", focus: "Systems and Structure" },
  { week: 9, days: [57, 58, 59, 60, 61, 62], theme: "Maintaining the Work", focus: "Vigilance and Consistency" },
  { week: 10, days: [64, 65, 66, 67, 68, 69], theme: "Dealing with Compromise", focus: "Confronting Drift" },
  { week: 11, days: [71, 72, 73, 74, 75, 76], theme: "Purification and Holiness", focus: "Final Refinement" },
  { week: 12, days: [78, 79, 80, 81, 82, 83], theme: "Final Reforms", focus: "Finishing Strong" },
  { week: 13, days: [85, 86, 87, 88, 89, 90], theme: "Completion and Legacy", focus: "Finishing and Looking Forward" }
];

// Scripture references for remaining days
const scriptureMap: { [key: number]: { chapter: number; verses: string; title: string } } = {
  29: { chapter: 9, verses: "1-3", title: "Standing to Confess" },
  30: { chapter: 9, verses: "4-8", title: "Remembering God's Faithfulness" },
  31: { chapter: 9, verses: "9-15", title: "The Pattern of Rebellion" },
  32: { chapter: 9, verses: "16-21", title: "God's Patience and Mercy" },
  33: { chapter: 9, verses: "22-31", title: "Consequences of Disobedience" },
  34: { chapter: 9, verses: "32-37", title: "In Spite of All This" },
  36: { chapter: 9, verses: "38", title: "Making a Binding Agreement" },
  37: { chapter: 10, verses: "1-27", title: "Who's Signing the Covenant?" },
  38: { chapter: 10, verses: "28-31", title: "Specific Commitments" },
  39: { chapter: 10, verses: "32-36", title: "Supporting God's House" },
  40: { chapter: 10, verses: "37-39", title: "First Fruits" },
  41: { chapter: 10, verses: "39", title: "We Will Not Neglect" },
  43: { chapter: 11, verses: "1-2", title: "Settling In" },
  44: { chapter: 11, verses: "3-19", title: "Leaders Who Lead" },
  45: { chapter: 11, verses: "20-36", title: "The Rest of the People" },
  46: { chapter: 12, verses: "1-26", title: "Priests and Levites" },
  47: { chapter: 12, verses: "27-43", title: "Dedication of the Wall" },
  48: { chapter: 12, verses: "43", title: "Joy Heard Far Away" },
  50: { chapter: 12, verses: "44-47", title: "Appointing Treasurers" },
  51: { chapter: 13, verses: "1-3", title: "Reading the Law" },
  52: { chapter: 13, verses: "3", title: "Separation from Evil" },
  53: { chapter: 13, verses: "1-3", title: "The Halfway Point Check-In" },
  54: { chapter: 13, verses: "1-3", title: "Renewed Commitment" },
  55: { chapter: 13, verses: "1-3", title: "Pressing Forward" },
  57: { chapter: 13, verses: "4-7", title: "Nehemiah Returns" },
  58: { chapter: 13, verses: "8-9", title: "Throwing Out the Trash" },
  59: { chapter: 13, verses: "10-14", title: "Restoring What Was Neglected" },
  60: { chapter: 13, verses: "15-18", title: "Sabbath Violations" },
  61: { chapter: 13, verses: "19-22", title: "Closing the Gates" },
  62: { chapter: 13, verses: "19-22", title: "Two-Thirds Complete" },
  64: { chapter: 13, verses: "23-27", title: "Mixed Marriages" },
  65: { chapter: 13, verses: "26", title: "Remember Solomon" },
  66: { chapter: 13, verses: "28-30", title: "Purifying the Priests" },
  67: { chapter: 13, verses: "30", title: "Assigning Duties" },
  68: { chapter: 13, verses: "31", title: "Remember Me, O God" },
  69: { chapter: 13, verses: "31", title: "The Final Push Begins" },
  71: { chapter: 13, verses: "1-31", title: "Holiness Matters" },
  72: { chapter: 13, verses: "1-31", title: "The Cost of Holiness" },
  73: { chapter: 13, verses: "23-27", title: "Holiness in Marriage" },
  74: { chapter: 13, verses: "1-31", title: "Holiness in Work" },
  75: { chapter: 13, verses: "1-31", title: "Holiness in Speech" },
  76: { chapter: 13, verses: "1-31", title: "Holiness in Thought" },
  78: { chapter: 13, verses: "1-31", title: "No Turning Back" },
  79: { chapter: 13, verses: "1-31", title: "The Man in the Mirror" },
  80: { chapter: 13, verses: "1-31", title: "Legacy Building" },
  81: { chapter: 13, verses: "1-31", title: "Teaching Your Sons" },
  82: { chapter: 13, verses: "1-31", title: "The Brotherhood" },
  83: { chapter: 13, verses: "1-31", title: "One Week Left" },
  85: { chapter: 13, verses: "1-31", title: "The Wall Still Stands" },
  86: { chapter: 13, verses: "1-31", title: "Nehemiah's Legacy" },
  87: { chapter: 13, verses: "1-31", title: "The Next Generation" },
  88: { chapter: 13, verses: "1-31", title: "Remembering the Journey" },
  89: { chapter: 13, verses: "1-31", title: "The Man You've Become" },
  90: { chapter: 13, verses: "1-31", title: "What's Next?" }
};

// Reflection templates by theme
const reflectionTemplates = {
  confession: [
    "Confession isn't weakness - it's strength. It takes courage to admit where you've failed. But confession without change is just words. Today is about owning your sin and committing to transformation.",
    "You can't move forward while dragging the past behind you. Confession releases the weight. It clears the path. It opens the door to freedom.",
    "God already knows your sin. Confession isn't informing Him - it's agreeing with Him. It's saying, 'You're right. I was wrong. Help me change.'"
  ],
  covenant: [
    "A covenant is more than a promise - it's a binding agreement. It's putting your word on the line. It's saying, 'I will do this, no matter what.'",
    "Commitments made in private are tested in public. What you promise today will be challenged tomorrow. But a man's word is his bond.",
    "Specific commitments produce specific results. Vague promises produce vague outcomes. Be clear. Be specific. Be committed."
  ],
  celebration: [
    "Celebration isn't optional - it's essential. You need to mark progress. You need to acknowledge wins. You need to celebrate what God has done.",
    "Joy is contagious. When you celebrate, others are encouraged. Your victory gives them hope for their own.",
    "Don't wait until everything is perfect to celebrate. Celebrate progress. Celebrate showing up. Celebrate small wins."
  ],
  maintenance: [
    "Building is hard. Maintaining is harder. Anyone can start strong. Few finish strong. Maintenance requires vigilance.",
    "What you don't protect, you will lose. The enemy wants to steal what you've built. Guard it. Protect it. Maintain it.",
    "Consistency beats intensity. Daily disciplines maintained over time produce lasting transformation."
  ],
  holiness: [
    "Holiness isn't about being perfect - it's about being set apart. It's about living differently. It's about being distinct.",
    "The world will pressure you to conform. Holiness is the courage to be different. To stand out. To stand firm.",
    "Holiness costs something. It requires sacrifice. It demands discipline. But the reward is worth the cost."
  ],
  legacy: [
    "Legacy isn't what you leave behind - it's who you leave behind. It's the men you've raised. The brothers you've strengthened.",
    "You're not building for yourself. You're building for the next generation. Your sons are watching. Your brothers are following.",
    "A life well-lived leaves a mark. Not for your glory, but for God's. Not for recognition, but for impact."
  ]
};

// Application templates
const applicationTemplates = {
  confession: "What specific sin do you need to confess today? Don't be vague. Name it. Own it. Confess it to God and to a brother. Then commit to change.",
  covenant: "Write down one specific commitment you're making today. Make it measurable. Make it clear. Then share it with someone who will hold you accountable.",
  celebration: "What progress have you made that deserves celebration? Don't minimize it. Acknowledge it. Thank God for it. Share it with your brothers.",
  maintenance: "What discipline have you established that needs protecting? What guard do you need to post? What boundary do you need to enforce?",
  holiness: "Where is God calling you to be different? Where do you need to stand out? Where do you need to stand firm? Do it today.",
  legacy: "Who are you investing in? Who are you raising up? Who are you leaving behind? Take one action today to build into someone else."
};

// Prayer templates
const prayerTemplates = {
  confession: "Father, I confess [specific sin]. I own it. I'm done making excuses. Forgive me. Change me. Give me strength to walk in freedom. Amen.",
  covenant: "Lord, I commit to [specific commitment]. Hold me to it. Give me strength to keep my word. Make me a man of integrity. Amen.",
  celebration: "God, thank You for [specific progress]. I celebrate what You've done. I acknowledge Your faithfulness. Keep me going. Amen.",
  maintenance: "Father, help me protect what I've built. Give me vigilance. Give me consistency. Don't let me lose what You've helped me gain. Amen.",
  holiness: "Lord, set me apart. Make me different. Give me courage to stand out. Help me live holy in an unholy world. Amen.",
  legacy: "God, help me build a legacy that matters. Use my life to impact others. Let my transformation inspire transformation in others. Amen."
};

// Men's Alliance Values (cycle through)
const mensAllianceValues = [
  "Honor: Do not lie, cheat, steal, or laugh at sin.",
  "Encouragement: No matter what happens you can always say, \"Good\"",
  "Trust: Give others the benefit of the doubt.",
  "Feedback: Seek feedback from others, Become comfortable receiving feedback from others.",
  "Humility: It's better to under sell and over deliver.",
  "Perseverance: Whether in a workout, or in our lives, we strive to leave a legacy of never quitting, of getting back up every time"
];

/**
 * Generate a reading for a specific day
 */
export const generateReading = (day: number): DailyReading => {
  const scripture = scriptureMap[day];
  if (!scripture) {
    throw new Error(`No scripture mapping for day ${day}`);
  }

  // Determine theme based on day
  let theme = "maintenance";
  let weekTheme = "";
  
  for (const week of weeklyThemes) {
    if (week.days.includes(day)) {
      weekTheme = week.theme;
      if (week.theme.includes("Confession")) theme = "confession";
      else if (week.theme.includes("Covenant")) theme = "covenant";
      else if (week.theme.includes("Celebration") || week.theme.includes("Dedication")) theme = "celebration";
      else if (week.theme.includes("Holiness") || week.theme.includes("Purification")) theme = "holiness";
      else if (week.theme.includes("Legacy") || week.theme.includes("Completion")) theme = "legacy";
      break;
    }
  }

  // Select templates
  const reflectionOptions = reflectionTemplates[theme as keyof typeof reflectionTemplates] || reflectionTemplates.maintenance;
  const reflection = reflectionOptions[day % reflectionOptions.length];
  const application = applicationTemplates[theme as keyof typeof applicationTemplates] || applicationTemplates.maintenance;
  const prayer = prayerTemplates[theme as keyof typeof prayerTemplates] || prayerTemplates.maintenance;
  const mensAllianceValue = mensAllianceValues[(day - 1) % mensAllianceValues.length];

  return {
    day,
    book: 'Nehemiah',
    chapter: scripture.chapter,
    verses: scripture.verses,
    title: scripture.title,
    passage: `Nehemiah ${scripture.chapter}:${scripture.verses} - [Full passage text would be inserted here from Bible API or database]`,
    reflection: `Day ${day} - ${weekTheme}. ${reflection}`,
    application,
    prayer,
    mensAllianceValue
  };
};

/**
 * Generate all remaining readings (Days 28-90)
 */
export const generateAllRemainingReadings = (): DailyReading[] => {
  const readings: DailyReading[] = [];
  
  // Generate readings for all non-Sabbath days from 29-90
  for (let day = 29; day <= 90; day++) {
    // Skip Sabbath days (every 7th day)
    if (day % 7 === 0) continue;
    
    if (scriptureMap[day]) {
      readings.push(generateReading(day));
    }
  }
  
  return readings;
};

/**
 * Export function to download structure as text file
 */
export const downloadStructure = () => {
  const structureText = `
FORGE: 90-Day Nehemiah Reading Plan - Complete Structure

[Full structure content from the markdown file]
  `;
  
  const blob = new Blob([structureText], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Nehemiah-90-Day-Structure.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export default {
  generateReading,
  generateAllRemainingReadings,
  downloadStructure,
  weeklyThemes,
  scriptureMap
};