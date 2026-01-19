import { DailyReading } from './journeyData';

/**
 * NEHEMIAH 90-DAY READING PLAN
 * Complete template-based content generation from refined outline
 * Includes ALL 90 days with Sabbath readings
 * Source: public/nehemiah-90-day-outline.md
 */

interface ReadingTemplate {
  day: number;
  book: string;
  chapter: number;
  verses: string;
  title: string;
  theme: string;
  focus: string;
  applicationPrompt: string;
  keyVerse: string;
  isSabbath?: boolean;
  sabbathActivity?: string;
  mensAllianceValue: string;
}

// Men's Alliance Values (cycle through)
const values = [
  'Honor: Do not lie, cheat, steal, or laugh at sin.',
  'Humility: It\'s better to under sell and over deliver.',
  'Perseverance: Whether in a workout, or in our lives, we strive to leave a legacy of never quitting',
  'Feedback: Seek feedback from others, Become comfortable receiving feedback from others.',
  'Encouragement: No matter what happens you can always say, "Good"',
  'Trust: Give others the benefit of the doubt.'
];

// Complete 90-day template based on refined outline
const allDayTemplates: ReadingTemplate[] = [
  // WEEK 1: BROKEN WALLS AND BURDEN (Days 1-7)
  { day: 1, book: 'Nehemiah', chapter: 1, verses: '1-4', title: 'Broken Walls, Broken Men', theme: 'Grief over what\'s broken', focus: 'Face the reality of broken walls', applicationPrompt: 'What walls in your life have crumbled?', keyVerse: 'When I heard these things, I sat down and wept', mensAllianceValue: values[0] },
  { day: 2, book: 'Nehemiah', chapter: 1, verses: '5-11', title: 'Prayer Before Action', theme: 'Honest confession and petition', focus: 'Pray before you act', applicationPrompt: 'What do you need to confess before God today?', keyVerse: 'Give your servant success today', mensAllianceValue: values[1] },
  { day: 3, book: 'Nehemiah', chapter: 2, verses: '1-8', title: 'From Mourning to Mission', theme: 'Moving from grief to action', focus: 'Risk comfort for mission', applicationPrompt: 'What comfortable position do you need to risk?', keyVerse: 'The gracious hand of my God was on me', mensAllianceValue: values[2] },
  { day: 4, book: 'Nehemiah', chapter: 2, verses: '9-16', title: 'Surveying the Damage', theme: 'Honest assessment', focus: 'Face the full scope of destruction', applicationPrompt: 'What damage have you been avoiding looking at?', keyVerse: 'I examined the walls...which had been broken down', mensAllianceValue: values[3] },
  { day: 5, book: 'Nehemiah', chapter: 2, verses: '17-20', title: 'Let Us Start Rebuilding', theme: 'Calling others to the work', focus: 'You need brothers in this fight', applicationPrompt: 'Who are your brothers in this rebuilding journey?', keyVerse: 'Let us start rebuilding', mensAllianceValue: values[4] },
  { day: 6, book: 'Nehemiah', chapter: 3, verses: '1-5', title: 'Everyone Had a Section', theme: 'Individual responsibility', focus: 'What\'s your section?', applicationPrompt: 'What one area of life needs your focused attention?', keyVerse: 'Eliashib...and his fellow priests went to work', mensAllianceValue: values[5] },
  { day: 7, book: 'Nehemiah', chapter: 3, verses: '6-32', title: 'The Work Begins', theme: 'Sabbath reflection on unity in rebuilding', focus: 'Rest and reflect on community', applicationPrompt: 'What broken walls did you identify? What\'s your section?', keyVerse: 'Each made repairs opposite their house', isSabbath: true, sabbathActivity: 'Review Week 1 - Share progress with your brothers', mensAllianceValue: values[0] },

  // WEEK 2: OPPOSITION AND PERSEVERANCE (Days 8-14)
  { day: 8, book: 'Nehemiah', chapter: 4, verses: '1-3', title: 'Mockery and Opposition', theme: 'Expect ridicule when you rebuild', focus: 'Don\'t let mockers stop you', applicationPrompt: 'Who is mocking your commitment to change?', keyVerse: 'What are those feeble Jews doing?', mensAllianceValue: values[1] },
  { day: 9, book: 'Nehemiah', chapter: 4, verses: '4-9', title: 'Pray and Post a Guard', theme: 'Prayer plus action', focus: 'Faith without works is dead', applicationPrompt: 'What guard do you need to post today?', keyVerse: 'We prayed...and posted a guard', mensAllianceValue: values[2] },
  { day: 10, book: 'Nehemiah', chapter: 4, verses: '10-14', title: 'When Strength Gives Out', theme: 'Remember your why', focus: 'Fight for your family', applicationPrompt: 'Who are you fighting for when strength gives out?', keyVerse: 'Fight for your families, your sons and daughters', mensAllianceValue: values[3] },
  { day: 11, book: 'Nehemiah', chapter: 4, verses: '15-18', title: 'Work With One Hand, Fight With the Other', theme: 'Build and defend simultaneously', focus: 'Always ready, always building', applicationPrompt: 'What are you building and what are you fighting?', keyVerse: 'Each...did their work with one hand and held a weapon in the other', mensAllianceValue: values[4] },
  { day: 12, book: 'Nehemiah', chapter: 4, verses: '19-23', title: 'The Work Is Great and Spread Out', theme: 'Sustained effort and vigilance', focus: 'All-in commitment', applicationPrompt: 'Are you all-in or just trying?', keyVerse: 'Our God will fight for us', mensAllianceValue: values[5] },
  { day: 13, book: 'Nehemiah', chapter: 5, verses: '1-5', title: 'Internal Conflict', theme: 'Internal issues threaten external progress', focus: 'Deal with unforgiveness', applicationPrompt: 'What internal conflict are you avoiding?', keyVerse: 'Men and their wives raised a great outcry', mensAllianceValue: values[0] },
  { day: 14, book: 'Nehemiah', chapter: 5, verses: '6-19', title: 'Fighting and Building', theme: 'Sabbath reflection on perseverance', focus: 'Rest while remaining vigilant', applicationPrompt: 'What opposition have you faced? Who are your guards?', keyVerse: 'I was very angry when I heard their outcry', isSabbath: true, sabbathActivity: 'Review Week 2 - Rest but stay ready', mensAllianceValue: values[1] },

  // WEEK 3: JUSTICE AND LEADERSHIP (Days 15-21)
  { day: 15, book: 'Nehemiah', chapter: 5, verses: '6-13', title: 'Righteous Anger', theme: 'Holy anger leads to action', focus: 'Confront injustice', applicationPrompt: 'What injustice needs confronting?', keyVerse: 'I was very angry when I heard their outcry', mensAllianceValue: values[2] },
  { day: 16, book: 'Nehemiah', chapter: 5, verses: '14-19', title: 'Leading by Example', theme: 'Servant leadership', focus: 'Lead yourself first', applicationPrompt: 'How are you leading yourself before leading others?', keyVerse: 'I never demanded the food allotted to the governor', mensAllianceValue: values[3] },
  { day: 17, book: 'Nehemiah', chapter: 6, verses: '1-4', title: 'Distraction Tactics', theme: 'Protect your mission', focus: 'Learn to say no', applicationPrompt: 'What distractions are pulling you from your mission?', keyVerse: 'I am carrying on a great project and cannot go down', mensAllianceValue: values[4] },
  { day: 18, book: 'Nehemiah', chapter: 6, verses: '5-9', title: 'False Accusations', theme: 'Don\'t defend endlessly', focus: 'Let results speak', applicationPrompt: 'What accusations do you need to stop defending?', keyVerse: 'They were just trying to frighten us', mensAllianceValue: values[5] },
  { day: 19, book: 'Nehemiah', chapter: 6, verses: '10-14', title: 'Fear Tactics', theme: 'Refuse to live in fear', focus: 'Face your fears', applicationPrompt: 'What fear is stopping your progress?', keyVerse: 'Should a man like me run away?', mensAllianceValue: values[0] },
  { day: 20, book: 'Nehemiah', chapter: 6, verses: '15-16', title: 'The Wall Is Finished', theme: 'Celebrate milestones', focus: 'Acknowledge progress', applicationPrompt: 'What milestone should you celebrate?', keyVerse: 'The wall was completed in fifty-two days', mensAllianceValue: values[1] },
  { day: 21, book: 'Nehemiah', chapter: 6, verses: '17-19', title: 'Three Weeks Complete', theme: 'Sabbath reflection on spiritual warfare', focus: 'Rest and celebrate wall completion', applicationPrompt: 'What distractions did you resist? What can you celebrate?', keyVerse: 'The nobles of Judah were sending many letters', isSabbath: true, sabbathActivity: 'Review Week 3 - Celebrate milestone', mensAllianceValue: values[2] },

  // WEEK 4: ESTABLISHING ORDER (Days 22-28)
  { day: 22, book: 'Nehemiah', chapter: 7, verses: '1-4', title: 'Securing What You\'ve Built', theme: 'Maintenance and protection', focus: 'Set up accountability', applicationPrompt: 'What accountability systems do you need?', keyVerse: 'I put in charge...men of integrity who feared God', mensAllianceValue: values[3] },
  { day: 23, book: 'Nehemiah', chapter: 7, verses: '5-7', title: 'Remembering Your Roots', theme: 'Gratitude and humility', focus: 'Remember where you came from', applicationPrompt: 'What has God brought you through?', keyVerse: 'God put it into my heart to assemble', mensAllianceValue: values[4] },
  { day: 24, book: 'Nehemiah', chapter: 8, verses: '1-3', title: 'Hungry for the Word', theme: 'Desire for Scripture', focus: 'Read with hunger not duty', applicationPrompt: 'How hungry are you for God\'s Word?', keyVerse: 'All the people came together...and they listened attentively', mensAllianceValue: values[5] },
  { day: 25, book: 'Nehemiah', chapter: 8, verses: '4-8', title: 'Understanding What You Read', theme: 'Comprehension and application', focus: 'Study don\'t just read', applicationPrompt: 'Are you understanding what you read?', keyVerse: 'Making it clear and giving the meaning', mensAllianceValue: values[0] },
  { day: 26, book: 'Nehemiah', chapter: 8, verses: '9-12', title: 'The Joy of the Lord', theme: 'Move from conviction to joy', focus: 'Choose celebration', applicationPrompt: 'Where do you need to choose joy?', keyVerse: 'The joy of the LORD is your strength', mensAllianceValue: values[1] },
  { day: 27, book: 'Nehemiah', chapter: 8, verses: '13-18', title: 'Rediscovering Lost Practices', theme: 'Restore what\'s been lost', focus: 'Bring back life-giving practices', applicationPrompt: 'What life-giving practice do you need to restore?', keyVerse: 'They found written in the Law', mensAllianceValue: values[2] },
  { day: 28, book: 'Nehemiah', chapter: 9, verses: '1-3', title: 'One Month Complete', theme: 'Sabbath reflection on God\'s Word', focus: 'Extended rest and meditation', applicationPrompt: 'How have you grown? What have you learned?', keyVerse: 'Stood in their places and confessed their sins', isSabbath: true, sabbathActivity: 'Review Month 1 - Journal progress', mensAllianceValue: values[3] },

  // WEEK 5: CONFESSION AND REPENTANCE (Days 29-35)
  { day: 29, book: 'Nehemiah', chapter: 9, verses: '1-3', title: 'Standing to Confess', theme: 'Corporate and personal confession', focus: 'Confess specific sins', applicationPrompt: 'What specific sin needs confessing?', keyVerse: 'Stood in their places and confessed their sins', mensAllianceValue: values[4] },
  { day: 30, book: 'Nehemiah', chapter: 9, verses: '4-8', title: 'Remembering God\'s Faithfulness', theme: 'God\'s character in history', focus: 'List God\'s faithfulness', applicationPrompt: 'How has God been faithful to you?', keyVerse: 'You are the LORD God, who chose Abram', mensAllianceValue: values[5] },
  { day: 31, book: 'Nehemiah', chapter: 9, verses: '9-15', title: 'The Pattern of Rebellion', theme: 'Recognizing cycles', focus: 'Identify your patterns', applicationPrompt: 'What sinful patterns keep repeating?', keyVerse: 'You came down on Mount Sinai', mensAllianceValue: values[0] },
  { day: 32, book: 'Nehemiah', chapter: 9, verses: '16-21', title: 'God\'s Patience and Mercy', theme: 'God\'s long-suffering love', focus: 'Extend mercy to others', applicationPrompt: 'Who needs your patience and mercy?', keyVerse: 'You are a forgiving God, gracious and compassionate', mensAllianceValue: values[1] },
  { day: 33, book: 'Nehemiah', chapter: 9, verses: '22-31', title: 'Consequences of Disobedience', theme: 'Sin has consequences', focus: 'Count the cost', applicationPrompt: 'What is your sin costing you?', keyVerse: 'In your great mercy you did not put an end to them', mensAllianceValue: values[2] },
  { day: 34, book: 'Nehemiah', chapter: 9, verses: '32-37', title: 'In Spite of All This', theme: 'Honest assessment', focus: 'Where are you really at', applicationPrompt: 'Where are you really at spiritually?', keyVerse: 'In all that has happened to us, you have remained righteous', mensAllianceValue: values[3] },
  { day: 35, book: 'Nehemiah', chapter: 9, verses: '38', title: 'Confession and Covenant', theme: 'Sabbath reflection on repentance', focus: 'Rest in God\'s forgiveness', applicationPrompt: 'What patterns did you identify? Write confession', keyVerse: 'We are making a binding agreement', isSabbath: true, sabbathActivity: 'Review Week 5 - Rest in grace', mensAllianceValue: values[4] },

  // WEEK 6: COVENANT RENEWAL (Days 36-42)
  { day: 36, book: 'Nehemiah', chapter: 9, verses: '38', title: 'Making a Binding Agreement', theme: 'Written commitments', focus: 'Write down commitments', applicationPrompt: 'What commitment will you write and sign?', keyVerse: 'We are making a binding agreement, putting it in writing', mensAllianceValue: values[5] },
  { day: 37, book: 'Nehemiah', chapter: 10, verses: '1-27', title: 'Who\'s Signing the Covenant', theme: 'Public accountability', focus: 'Share your commitments', applicationPrompt: 'Who will you share commitments with?', keyVerse: 'The leaders of the people...sealed it', mensAllianceValue: values[0] },
  { day: 38, book: 'Nehemiah', chapter: 10, verses: '28-31', title: 'Specific Commitments', theme: 'Detailed promises', focus: 'Be specific about disciplines', applicationPrompt: 'What specific daily disciplines will you commit to?', keyVerse: 'All these...bind themselves with...an oath', mensAllianceValue: values[1] },
  { day: 39, book: 'Nehemiah', chapter: 10, verses: '32-36', title: 'Supporting God\'s House', theme: 'Generosity and worship', focus: 'Give sacrificially', applicationPrompt: 'Where is God calling you to be more generous?', keyVerse: 'We assume the responsibility', mensAllianceValue: values[2] },
  { day: 40, book: 'Nehemiah', chapter: 10, verses: '37-39', title: 'First Fruits', theme: 'Giving God your best', focus: 'Give God your first', applicationPrompt: 'Are you giving God your first and best?', keyVerse: 'We will bring...the firstfruits of our crops', mensAllianceValue: values[3] },
  { day: 41, book: 'Nehemiah', chapter: 10, verses: '39', title: 'We Will Not Neglect', theme: 'Commitment to consistency', focus: 'Recommit to daily disciplines', applicationPrompt: 'What daily discipline have you been neglecting?', keyVerse: 'We will not neglect the house of our God', mensAllianceValue: values[4] },
  { day: 42, book: 'Nehemiah', chapter: 11, verses: '1-2', title: 'Six Weeks Complete', theme: 'Sabbath reflection on covenant', focus: 'Rest and review commitments', applicationPrompt: 'What did you commit to? Share with accountability', keyVerse: 'The people commended all who volunteered', isSabbath: true, sabbathActivity: 'Review Week 6 - Share commitments', mensAllianceValue: values[5] },

  // Continue with remaining weeks...
  // WEEK 7: DEDICATION AND CELEBRATION (Days 43-49)
  { day: 43, book: 'Nehemiah', chapter: 11, verses: '1-2', title: 'Settling In', theme: 'Commitment to stay', focus: 'No more running', applicationPrompt: 'Where have you been running?', keyVerse: 'The people commended all who volunteered to live in Jerusalem', mensAllianceValue: values[0] },
  { day: 44, book: 'Nehemiah', chapter: 11, verses: '3-19', title: 'Leaders Who Lead', theme: 'Leadership in action', focus: 'Step up and lead', applicationPrompt: 'Where is God calling you to lead?', keyVerse: 'These are the provincial leaders who settled in Jerusalem', mensAllianceValue: values[1] },
  { day: 45, book: 'Nehemiah', chapter: 11, verses: '20-36', title: 'The Rest of the People', theme: 'Everyone matters', focus: 'Your role is important', applicationPrompt: 'How is your role in God\'s kingdom important?', keyVerse: 'The rest of the Israelites...were in all the towns', mensAllianceValue: values[2] },
  { day: 46, book: 'Nehemiah', chapter: 12, verses: '1-26', title: 'Priests and Levites', theme: 'Spiritual leadership', focus: 'Who are your spiritual leaders', applicationPrompt: 'Who are the spiritual leaders in your life?', keyVerse: 'These were the priests and Levites who returned', mensAllianceValue: values[3] },
  { day: 47, book: 'Nehemiah', chapter: 12, verses: '27-43', title: 'Dedication of the Wall', theme: 'Celebration and worship', focus: 'Celebrate what God has done', applicationPrompt: 'What has God done that you need to celebrate?', keyVerse: 'At the dedication of the wall...they sought out the Levites', mensAllianceValue: values[4] },
  { day: 48, book: 'Nehemiah', chapter: 12, verses: '43', title: 'Joy Heard Far Away', theme: 'Contagious joy', focus: 'Let your joy be visible', applicationPrompt: 'Is your joy in God visible to others?', keyVerse: 'The sound of rejoicing in Jerusalem could be heard far away', mensAllianceValue: values[5] },
  { day: 49, book: 'Nehemiah', chapter: 12, verses: '44-47', title: 'Halfway Point', theme: 'Sabbath celebration at halfway', focus: 'Major celebration and rest', applicationPrompt: 'Celebrate progress! What testimonies can you share?', keyVerse: 'Men were appointed to be in charge of the storerooms', isSabbath: true, sabbathActivity: 'Review 7 weeks - Celebrate! Plan next phase', mensAllianceValue: values[0] },

  // WEEK 8-13 templates (Days 50-90)...
  // I'll add the complete remaining days based on the outline
  
  { day: 50, book: 'Nehemiah', chapter: 12, verses: '44-47', title: 'Appointing Treasurers', theme: 'Financial stewardship', focus: 'Get finances in order', applicationPrompt: 'What financial area needs attention?', keyVerse: 'Men were appointed to be in charge of the storerooms', mensAllianceValue: values[1] },
  { day: 51, book: 'Nehemiah', chapter: 13, verses: '1-3', title: 'Reading the Law', theme: 'Obedience to Scripture', focus: 'What is God saying', applicationPrompt: 'What is God\'s Word saying to you today?', keyVerse: 'On that day the Book of Moses was read aloud', mensAllianceValue: values[2] },
  { day: 52, book: 'Nehemiah', chapter: 13, verses: '4-5', title: 'Separation from Evil', theme: 'Clear boundaries', focus: 'Separate from corruption', applicationPrompt: 'What corrupting influence needs separation?', keyVerse: 'Before this, Eliashib...had been put in charge', mensAllianceValue: values[3] },
  { day: 53, book: 'Nehemiah', chapter: 3, verses: '6-12', title: 'Halfway Assessment', theme: 'Review and recalibration', focus: 'How far have you come', applicationPrompt: 'What progress have you made in 53 days?', keyVerse: 'The Old Gate was repaired', mensAllianceValue: values[4] },
  { day: 54, book: 'Nehemiah', chapter: 3, verses: '13-20', title: 'Renewed Commitment', theme: 'Recommitting to the journey', focus: 'Every section matters', applicationPrompt: 'What section needs renewed attention?', keyVerse: 'Next to them...made repairs', mensAllianceValue: values[5] },
  { day: 55, book: 'Nehemiah', chapter: 3, verses: '28-32', title: 'Pressing Forward', theme: 'The second half begins', focus: 'Finish strong', applicationPrompt: 'What will it take to finish next 35 days strong?', keyVerse: 'Each made repairs in front of their own house', mensAllianceValue: values[0] },
  { day: 56, book: 'Nehemiah', chapter: 7, verses: '73', title: 'Eight Weeks Complete', theme: 'Sabbath rest at 8-week mark', focus: 'Extended rest and recovery', applicationPrompt: 'Assess progress. Adjust course. Rest deeply', keyVerse: 'The priests, the Levites...settled in their own towns', isSabbath: true, sabbathActivity: 'Review Week 8 - Prepare for final push', mensAllianceValue: values[1] },

  // WEEK 9: MAINTAINING THE WORK (Days 57-63)
  { day: 57, book: 'Nehemiah', chapter: 13, verses: '6-7', title: 'Nehemiah Returns', theme: 'Things fall apart without vigilance', focus: 'Stay alert', applicationPrompt: 'What area needs renewed vigilance?', keyVerse: 'I was not in Jerusalem...I came back to Jerusalem', mensAllianceValue: values[2] },
  { day: 58, book: 'Nehemiah', chapter: 13, verses: '8-9', title: 'Throwing Out the Trash', theme: 'Radical removal of evil', focus: 'What needs thrown out', applicationPrompt: 'What literal or spiritual trash needs removing?', keyVerse: 'I was greatly displeased and threw all of Tobiah\'s household goods out', mensAllianceValue: values[3] },
  { day: 59, book: 'Nehemiah', chapter: 13, verses: '10-14', title: 'Restoring What Was Neglected', theme: 'Getting back on track', focus: 'Restore neglected areas', applicationPrompt: 'What have you been neglecting?', keyVerse: 'I learned that the portions assigned to the Levites had not been given', mensAllianceValue: values[4] },
  { day: 60, book: 'Nehemiah', chapter: 13, verses: '15-18', title: 'Sabbath Violations', theme: 'Rest is non-negotiable', focus: 'Protect your Sabbath', applicationPrompt: 'Are you truly resting on your Sabbath?', keyVerse: 'In those days I saw people in Judah treading winepresses on the Sabbath', mensAllianceValue: values[5] },
  { day: 61, book: 'Nehemiah', chapter: 13, verses: '19-22', title: 'Closing the Gates', theme: 'Protecting boundaries', focus: 'Enforce your boundaries', applicationPrompt: 'What boundary needs enforcing more strictly?', keyVerse: 'I ordered the doors to be shut', mensAllianceValue: values[0] },
  { day: 62, book: 'Nehemiah', chapter: 7, verses: '73', title: 'Two-Thirds Complete', theme: 'Endurance check-in', focus: 'Keep going - 2/3 done', applicationPrompt: 'You\'re two-thirds done. What will keep you going?', keyVerse: 'The priests, the Levites...settled in their own towns', mensAllianceValue: values[1] },
  { day: 63, book: 'Nehemiah', chapter: 8, verses: '1-3', title: 'Nine Weeks Complete', theme: 'Sabbath reflection on perseverance', focus: 'Rest and recommit', applicationPrompt: 'What needs maintenance? What boundaries need reinforcing?', keyVerse: 'All the people came together as one', isSabbath: true, sabbathActivity: 'Review Week 9', mensAllianceValue: values[2] },

  // WEEK 10: DEALING WITH COMPROMISE (Days 64-70)
  { day: 64, book: 'Nehemiah', chapter: 13, verses: '23-27', title: 'Mixed Marriages', theme: 'Compromise leads to corruption', focus: 'Where have you compromised', applicationPrompt: 'Where have you compromised your convictions?', keyVerse: 'I saw men of Judah who had married women from Ashdod', mensAllianceValue: values[3] },
  { day: 65, book: 'Nehemiah', chapter: 13, verses: '26', title: 'Remember Solomon', theme: 'Even the strong can fall', focus: 'Stay humble stay vigilant', applicationPrompt: 'What warning from Solomon applies to you?', keyVerse: 'Was it not because of marriages like these that Solomon...sinned?', mensAllianceValue: values[4] },
  { day: 66, book: 'Nehemiah', chapter: 13, verses: '28-30', title: 'Purifying the Priests', theme: 'Leadership must be pure', focus: 'Lead with integrity', applicationPrompt: 'In what area of leadership do you need more integrity?', keyVerse: 'I purified the priests and the Levites', mensAllianceValue: values[5] },
  { day: 67, book: 'Nehemiah', chapter: 13, verses: '30-31', title: 'Assigning Duties', theme: 'Clear roles and responsibilities', focus: 'Know your role', applicationPrompt: 'What is your specific role in God\'s kingdom?', keyVerse: 'I assigned the priests and Levites to their duties', mensAllianceValue: values[0] },
  { day: 68, book: 'Nehemiah', chapter: 13, verses: '31', title: 'Remember Me O God', theme: 'Working for God\'s approval', focus: 'Who are you trying to please', applicationPrompt: 'Are you working for God\'s approval or man\'s?', keyVerse: 'Remember me with favor, my God', mensAllianceValue: values[1] },
  { day: 69, book: 'Nehemiah', chapter: 7, verses: '5-69', title: 'The Final Push Begins', theme: '21 days left', focus: 'Sprint to the finish', applicationPrompt: 'What will your final 21 days look like?', keyVerse: 'These are the people of the province who came up', mensAllianceValue: values[2] },
  { day: 70, book: 'Nehemiah', chapter: 2, verses: '17-20', title: 'Ten Weeks Complete', theme: 'Sabbath reflection on purity', focus: 'Rest and self-examination', applicationPrompt: 'Where have you compromised? Confess. Realign', keyVerse: 'The God of heaven will give us success', isSabbath: true, sabbathActivity: 'Review Week 10 - Rest', mensAllianceValue: values[3] },

  // WEEK 11: PURIFICATION AND HOLINESS (Days 71-77)
  { day: 71, book: 'Nehemiah', chapter: 8, verses: '1-3', title: 'Holiness Matters', theme: 'Set apart for God', focus: 'Live differently', applicationPrompt: 'How does your life look different from the world?', keyVerse: 'All the people came together as one', mensAllianceValue: values[4] },
  { day: 72, book: 'Nehemiah', chapter: 9, verses: '1-3', title: 'The Cost of Holiness', theme: 'Holiness requires sacrifice', focus: 'What must you sacrifice', applicationPrompt: 'What must you sacrifice to live a holy life?', keyVerse: 'They stood in their places and confessed their sins', mensAllianceValue: values[5] },
  { day: 73, book: 'Nehemiah', chapter: 5, verses: '14-19', title: 'Holiness in Marriage', theme: 'Purity in relationship', focus: 'Honor your wife', applicationPrompt: 'How are you honoring your wife in thought and action?', keyVerse: 'Neither I nor my brothers ate the food allotted to the governor', mensAllianceValue: values[0] },
  { day: 74, book: 'Nehemiah', chapter: 5, verses: '6-13', title: 'Holiness in Work', theme: 'Excellence and integrity', focus: 'Work as unto the Lord', applicationPrompt: 'Are you working with integrity and excellence?', keyVerse: 'What you are doing is not right', mensAllianceValue: values[1] },
  { day: 75, book: 'Nehemiah', chapter: 6, verses: '5-9', title: 'Holiness in Speech', theme: 'Words that build up', focus: 'Control your tongue', applicationPrompt: 'What do your words reveal about your heart?', keyVerse: 'Nothing like what you are saying is happening', mensAllianceValue: values[2] },
  { day: 76, book: 'Nehemiah', chapter: 6, verses: '17-19', title: 'Holiness in Thought', theme: 'Guard your mind', focus: 'Take thoughts captive', applicationPrompt: 'What thoughts need to be taken captive?', keyVerse: 'The nobles of Judah were sending many letters to Tobiah', mensAllianceValue: values[3] },
  { day: 77, book: 'Nehemiah', chapter: 10, verses: '39', title: 'Eleven Weeks Complete', theme: 'Sabbath reflection on holiness', focus: 'Rest in God\'s sanctification', applicationPrompt: 'How has God sanctified you? Rest in His holiness', keyVerse: 'We will not neglect the house of our God', isSabbath: true, sabbathActivity: 'Review Week 11', mensAllianceValue: values[4] },

  // WEEK 12: FINAL REFORMS (Days 78-84)
  { day: 78, book: 'Nehemiah', chapter: 2, verses: '17-20', title: 'No Turning Back', theme: 'Commitment to completion', focus: 'Burn the ships', applicationPrompt: 'What bridge do you need to burn to finish?', keyVerse: 'The God of heaven will give us success', mensAllianceValue: values[5] },
  { day: 79, book: 'Nehemiah', chapter: 1, verses: '1-4', title: 'The Man in the Mirror', theme: 'Personal transformation', focus: 'Who have you become', applicationPrompt: 'Who have you become over these 79 days?', keyVerse: 'When I heard these things, I sat down and wept', mensAllianceValue: values[0] },
  { day: 80, book: 'Nehemiah', chapter: 7, verses: '1-4', title: 'Legacy Building', theme: 'What will you leave behind', focus: 'Think generationally', applicationPrompt: 'What legacy are you building?', keyVerse: 'I put in charge...Hananiah...because he was a man of integrity', mensAllianceValue: values[1] },
  { day: 81, book: 'Nehemiah', chapter: 8, verses: '4-8', title: 'Teaching Your Sons', theme: 'Passing it on', focus: 'Disciple the next generation', applicationPrompt: 'Who are you discipling and mentoring?', keyVerse: 'They read from the Book...making it clear', mensAllianceValue: values[2] },
  { day: 82, book: 'Nehemiah', chapter: 4, verses: '15-18', title: 'The Brotherhood', theme: 'Iron sharpening iron', focus: 'Strengthen your brothers', applicationPrompt: 'Which brother needs your strength today?', keyVerse: 'Each of the builders wore his sword at his side', mensAllianceValue: values[3] },
  { day: 83, book: 'Nehemiah', chapter: 6, verses: '15', title: 'One Week Left', theme: 'Final sprint', focus: 'Give everything', applicationPrompt: 'How will you make these last 7 days count?', keyVerse: 'The wall was completed on the twenty-fifth of Elul', mensAllianceValue: values[4] },
  { day: 84, book: 'Nehemiah', chapter: 12, verses: '27-43', title: 'Twelve Weeks Complete', theme: 'Pre-celebration Sabbath', focus: 'Rest before final week', applicationPrompt: 'Final preparation. Rest. Pray', keyVerse: 'At the dedication of the wall', isSabbath: true, sabbathActivity: 'Review Week 12 - Prepare for completion', mensAllianceValue: values[5] },

  // WEEK 13: COMPLETION AND LEGACY (Days 85-90)
  { day: 85, book: 'Nehemiah', chapter: 6, verses: '15-16', title: 'The Wall Still Stands', theme: 'What you\'ve built endures', focus: 'Your work matters', applicationPrompt: 'What have you built that will last?', keyVerse: 'All the surrounding nations were afraid', mensAllianceValue: values[0] },
  { day: 86, book: 'Nehemiah', chapter: 13, verses: '31', title: 'Nehemiah\'s Legacy', theme: 'A life well-lived', focus: 'What\'s your legacy', applicationPrompt: 'What do you want to be remembered for?', keyVerse: 'Remember me with favor, my God', mensAllianceValue: values[1] },
  { day: 87, book: 'Nehemiah', chapter: 12, verses: '43', title: 'The Next Generation', theme: 'Passing the torch', focus: 'Who are you raising up', applicationPrompt: 'Who will carry on what you\'ve started?', keyVerse: 'God had given them great joy', mensAllianceValue: values[2] },
  { day: 88, book: 'Nehemiah', chapter: 9, verses: '4-8', title: 'Remembering the Journey', theme: 'Reflection and gratitude', focus: 'Write your testimony', applicationPrompt: 'How has God transformed you in 90 days?', keyVerse: 'Blessed be your glorious name', mensAllianceValue: values[3] },
  { day: 89, book: 'Nehemiah', chapter: 8, verses: '9-12', title: 'The Man You\'ve Become', theme: 'Transformation complete', focus: 'Celebrate the change', applicationPrompt: 'Who are you today that you weren\'t on Day 1?', keyVerse: 'The joy of the LORD is your strength', mensAllianceValue: values[4] },
  { day: 90, book: 'Nehemiah', chapter: 6, verses: '16', title: 'What\'s Next', theme: 'Beyond the 90 days', focus: 'Commit to lifelong growth', applicationPrompt: 'What comes after Day 90? How will you keep building?', keyVerse: 'They realized that this work had been done with the help of our God', mensAllianceValue: values[5] }
];

/**
 * Generate full reading content from template
 */
function generateReading(template: ReadingTemplate): DailyReading {
  const week = Math.ceil(template.day / 7);
  
  // For Sabbath days
  if (template.isSabbath) {
    const reflection = `Week ${week}, Day ${template.day} - Sabbath Rest

${template.theme}. ${template.focus}.

This is your Sabbath - a day of rest, reflection, and renewal. You've worked hard for six days. Now rest is not optional, it's commanded. God doesn't need you to prove yourself on the seventh day. He needs you to remember that He is God and you are not.

Today's passage from ${template.book} ${template.chapter}:${template.verses} provides a lens to review your week. ${template.title} reminds you that this journey isn't just about you. It's about community, legacy, and the God who is rebuilding you.

Reflect on these questions:
${template.applicationPrompt}

This Sabbath, resist the urge to "catch up" on work. Resist the pull to be productive. Today, your productivity is measured by your ability to rest, to celebrate, to connect with God and others without agenda.

Review your week. Celebrate your wins. Acknowledge your struggles. Rest in God's grace. Prepare for the week ahead.`;

    const application = `Sabbath Application:

${template.sabbathActivity}

Take time today to:
1. Review your journal from this week
2. Celebrate specific victories (write them down)
3. Confess specific failures (write them down)
4. Connect with your accountability brothers
5. Spend extended time in prayer and Scripture
6. Rest physically - take a nap, walk, be still
7. Invest relationally - wife, kids, community
8. Prepare mentally for the week ahead

${template.applicationPrompt}

Don't rush this. Don't skip this. Sabbath rest is not laziness - it's obedience. God commanded rest because He knows you need it. Trust Him enough to rest.`;

    const prayer = `Father, thank You for commanding rest. Thank You for this Sabbath day.

I confess I'm tempted to keep working, to keep producing, to prove my worth. But today, help me rest. Help me remember that my worth comes from You, not from my work.

${template.applicationPrompt} Show me clearly. Give me wisdom.

As I review this week, help me see Your hand in my progress. Help me celebrate victories without pride. Help me acknowledge failures without shame. Give me grace to rest in You.

Prepare me for the week ahead. Strengthen me. Renew me. Remind me why I'm on this journey.

I rest in You today. Amen.`;

    return {
      day: template.day,
      book: template.book,
      chapter: template.chapter,
      verses: template.verses,
      title: template.title,
      passage: `[${template.book} ${template.chapter}:${template.verses}] - Sabbath reflection passage. This scripture provides context for reviewing Week ${week}. ${template.theme}. God calls you to rest today, to reflect on His faithfulness, and to prepare for what's ahead. Rest is not weakness - it's wisdom.`,
      reflection,
      application,
      prayer,
      mensAllianceValue: template.mensAllianceValue
    };
  }
  
  // For regular days
  const reflection = `Week ${week}, Day ${template.day}. ${template.theme}. ${template.focus}.

This passage from ${template.book} ${template.chapter}:${template.verses} reveals a crucial truth for men rebuilding their lives. ${template.title} is not just a biblical concept—it's a practical reality you face today.

When Nehemiah faced this challenge, he didn't compromise. He didn't make excuses. He took decisive action. That's what real men do. Not boys who talk about change. Men who make change happen.

Your journey is at a critical point. You've been building for ${template.day} days. Some days have been easier than others. But this principle—${template.theme}—is essential for finishing strong. Without it, your walls will crumble.

${template.focus}. This isn't optional. This is required. The enemy wants you to skip this. He wants you to think it's not that important. But it is. This is the difference between men who finish and men who quit halfway.

Key verse: "${template.keyVerse}"

Look at what's at stake. Your family. Your integrity. Your calling. Your legacy. All of it depends on whether you apply this truth today. Not tomorrow. Today. Right now.`;

  const application = `${template.applicationPrompt}

Today, be brutally honest. No more excuses. No more "I'll deal with it later." Today is the day.

Write down your answer to that question. Be specific. Not vague spiritual language. Concrete, measurable answers. What exactly needs to change? What exactly will you do about it?

Then take one action step today. Not a big overhaul. Just one step. One conversation. One decision. One boundary. One act of obedience.

This is Day ${template.day}. You've come this far. Don't waste it. Apply what you're learning. Take action on what God is showing you.

Your brothers are watching. Your family is counting on you. God is equipping you. Now move.`;

  const prayer = `Father, give me courage to apply ${template.theme} in my life today. Show me clearly where I need to ${template.focus}. Don't let me make excuses or delay obedience.

${template.applicationPrompt} Help me answer honestly. Give me wisdom to know what to do and courage to do it.

I'm on Day ${template.day} of this journey. Don't let me waste it. Make this truth real in my life today. Transform me through obedience, not just information.

Give me strength for what You're asking me to do. I can't do this alone. I need You. Fight for me. Work through me. Change me. Amen.`;

  const passage = `[${template.book} ${template.chapter}:${template.verses}] - This passage teaches about ${template.theme.toLowerCase()}. Key verse: "${template.keyVerse}"

In Nehemiah's context, this was a pivotal moment in the rebuilding process. The people had to decide whether to continue forward or compromise their mission. Nehemiah chose decisive action. He confronted the issue directly. He didn't let fear or opposition stop him. 

This is the model for men today—see the problem, address it with courage, and keep building. The wall depends on it.`;

  return {
    day: template.day,
    book: template.book,
    chapter: template.chapter,
    verses: template.verses,
    title: template.title,
    passage,
    reflection,
    application,
    prayer,
    mensAllianceValue: template.mensAllianceValue
  };
}

/**
 * Generate all readings from Day 15 onwards (Days 1-13 are manually crafted in nehemiahReadings.ts)
 */
export function generateTemplateReadings(): DailyReading[] {
  // Filter for days 15-90 (Days 1-13 are manual, Day 14 is first Sabbath)
  return allDayTemplates
    .filter(t => t.day >= 7) // Start from Day 7 (first Sabbath)
    .map(template => generateReading(template));
}

export default generateTemplateReadings;
