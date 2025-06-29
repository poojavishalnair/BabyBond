import { ActivityTemplate, ContentType } from '@/types'
import { generateId } from '@/lib/utils'

// Prenatal Activity Templates (28-40 weeks)
export const prenatalActivities: ActivityTemplate[] = [
  {
    id: generateId(),
    title: "Morning Belly Talk",
    description: "Start your day by talking to your baby, sharing your plans and feelings",
    instructions: [
      "Find a comfortable position, sitting or lying down",
      "Place your hands gently on your belly",
      "Speak in a soft, loving voice to your baby",
      "Share what you're planning for the day",
      "Tell your baby how much you love them",
      "Take a moment to feel for any movements"
    ],
    type: 'educational' as ContentType,
    ageGroup: 'prenatal',
    duration: 10,
    difficulty: 'easy',
    benefits: [
      "Promotes early bonding",
      "Helps baby recognize your voice",
      "Reduces maternal stress",
      "Encourages mindful pregnancy"
    ],
    materials: [],
    tips: [
      "Consistency is key - try to do this at the same time each day",
      "Don't worry if you feel silly at first, it gets more natural",
      "Your partner can join in too"
    ],
    imageUrl: "https://images.pexels.com/photos/1556652/pexels-photo-1556652.jpeg",
    createdAt: new Date()
  },
  {
    id: generateId(),
    title: "Classical Music Session",
    description: "Play soothing classical music for your baby's brain development",
    instructions: [
      "Choose a quiet, comfortable space",
      "Select gentle classical music (Mozart, Bach, or Vivaldi work well)",
      "Place headphones or speakers near your belly",
      "Keep volume at a comfortable level",
      "Relax and listen together for 15-20 minutes",
      "Notice any baby movements during the music"
    ],
    type: 'educational' as ContentType,
    ageGroup: 'prenatal',
    duration: 20,
    difficulty: 'easy',
    benefits: [
      "Stimulates brain development",
      "May improve memory and learning",
      "Promotes relaxation for both mom and baby",
      "Establishes early music appreciation"
    ],
    materials: ["Music player or phone", "Comfortable seating"],
    tips: [
      "Baroque music with 60 beats per minute is ideal",
      "Avoid music that's too loud or jarring",
      "Try different composers to see what baby responds to"
    ],
    imageUrl: "https://images.pexels.com/photos/3693120/pexels-photo-3693120.jpeg",
    createdAt: new Date()
  },
  {
    id: generateId(),
    title: "Prenatal Yoga Flow",
    description: "Gentle yoga movements to connect with your baby and prepare your body",
    instructions: [
      "Start in a comfortable seated position",
      "Take 5 deep breaths, focusing on your baby",
      "Perform gentle cat-cow stretches on hands and knees",
      "Move into child's pose, modified for pregnancy",
      "Practice gentle side stretches while seated",
      "End with meditation, hands on belly"
    ],
    type: 'movement' as ContentType,
    ageGroup: 'prenatal',
    duration: 15,
    difficulty: 'medium',
    benefits: [
      "Improves flexibility and strength",
      "Reduces pregnancy discomfort",
      "Promotes relaxation",
      "Prepares body for labor"
    ],
    materials: ["Yoga mat", "Comfortable clothing"],
    tips: [
      "Listen to your body and don't overstretch",
      "Avoid poses lying on your back after first trimester",
      "Stay hydrated throughout"
    ],
    imageUrl: "https://images.pexels.com/photos/396133/pexels-photo-396133.jpeg",
    createdAt: new Date()
  },
  {
    id: generateId(),
    title: "Bedtime Story Reading",
    description: "Read aloud to your baby before bed to establish routine and bonding",
    instructions: [
      "Choose a comfortable position in bed or a chair",
      "Select a children's book or pregnancy book",
      "Place one hand on your belly while reading",
      "Read in a calm, soothing voice",
      "Take pauses to talk to your baby about the story",
      "End with a gentle goodnight message"
    ],
    type: 'stories' as ContentType,
    ageGroup: 'prenatal',
    duration: 15,
    difficulty: 'easy',
    benefits: [
      "Introduces baby to language patterns",
      "Creates bedtime routine",
      "Promotes bonding",
      "Helps mom relax before sleep"
    ],
    materials: ["Children's books", "Comfortable seating"],
    tips: [
      "Choose books you'll want to read after baby is born",
      "Vary your tone and expression",
      "Don't worry about finishing the whole book"
    ],
    imageUrl: "https://images.pexels.com/photos/1741230/pexels-photo-1741230.jpeg",
    createdAt: new Date()
  },
  {
    id: generateId(),
    title: "Gentle Belly Massage",
    description: "Soothing massage to connect with baby and relieve tension",
    instructions: [
      "Wash your hands and find a comfortable position",
      "Use a small amount of pregnancy-safe oil",
      "Start with gentle circular motions around your belly",
      "Talk to your baby as you massage",
      "Pay attention to areas that feel tense",
      "End with both hands resting on your belly"
    ],
    type: 'sensory' as ContentType,
    ageGroup: 'prenatal',
    duration: 10,
    difficulty: 'easy',
    benefits: [
      "Promotes bonding through touch",
      "Relieves skin tension and itching",
      "Encourages relaxation",
      "May help prevent stretch marks"
    ],
    materials: ["Pregnancy-safe massage oil", "Towel"],
    tips: [
      "Use gentle pressure only",
      "Avoid essential oils unless approved by doctor",
      "Stop if you feel any discomfort"
    ],
    imageUrl: "https://images.pexels.com/photos/1556652/pexels-photo-1556652.jpeg",
    createdAt: new Date()
  },
  {
    id: generateId(),
    title: "Meditation and Visualization",
    description: "Peaceful meditation to connect with your baby and reduce stress",
    instructions: [
      "Find a quiet, comfortable space",
      "Sit or lie in a supported position",
      "Close your eyes and take deep breaths",
      "Visualize your baby growing healthy and strong",
      "Send loving thoughts to your baby",
      "Imagine holding your baby after birth"
    ],
    type: 'meditation' as ContentType,
    ageGroup: 'prenatal',
    duration: 15,
    difficulty: 'easy',
    benefits: [
      "Reduces stress and anxiety",
      "Promotes emotional bonding",
      "Improves mental well-being",
      "Prepares for parenthood"
    ],
    materials: ["Quiet space", "Comfortable cushions"],
    tips: [
      "Don't worry if your mind wanders",
      "Use guided meditations if helpful",
      "Practice regularly for best results"
    ],
    imageUrl: "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg",
    createdAt: new Date()
  },
  {
    id: generateId(),
    title: "Partner Bonding Time",
    description: "Activities for both parents to connect with baby together",
    instructions: [
      "Both partners place hands on belly",
      "Take turns talking to the baby",
      "Share hopes and dreams for your child",
      "Play music and feel for baby's response together",
      "Practice breathing exercises as a team",
      "End with a group hug including baby"
    ],
    type: 'educational' as ContentType,
    ageGroup: 'prenatal',
    duration: 20,
    difficulty: 'easy',
    benefits: [
      "Strengthens family bonds",
      "Helps partner feel included",
      "Prepares for co-parenting",
      "Creates shared memories"
    ],
    materials: [],
    tips: [
      "Schedule regular partner bonding time",
      "Let each partner lead sometimes",
      "Don't force it if partner feels awkward initially"
    ],
    imageUrl: "https://images.pexels.com/photos/1556652/pexels-photo-1556652.jpeg",
    createdAt: new Date()
  },
  {
    id: generateId(),
    title: "Singing Lullabies",
    description: "Sing gentle songs to your baby to promote recognition and bonding",
    instructions: [
      "Choose simple, repetitive lullabies",
      "Sit comfortably with hands on belly",
      "Sing in a soft, gentle voice",
      "Don't worry about perfect pitch",
      "Repeat the same songs regularly",
      "Feel for baby's movements while singing"
    ],
    type: 'songs' as ContentType,
    ageGroup: 'prenatal',
    duration: 10,
    difficulty: 'easy',
    benefits: [
      "Baby learns to recognize your voice",
      "Creates calming associations",
      "Promotes language development",
      "Reduces maternal stress"
    ],
    materials: [],
    tips: [
      "Traditional lullabies work well",
      "Make up your own songs too",
      "Sing the same songs you'll use after birth"
    ],
    imageUrl: "https://images.pexels.com/photos/3693120/pexels-photo-3693120.jpeg",
    createdAt: new Date()
  },
  {
    id: generateId(),
    title: "Gratitude Journaling",
    description: "Write letters or journal entries to your unborn baby",
    instructions: [
      "Get a special notebook or journal",
      "Write a letter to your baby",
      "Share your feelings about pregnancy",
      "Describe what you're looking forward to",
      "Include details about your day",
      "Read entries aloud to your belly"
    ],
    type: 'educational' as ContentType,
    ageGroup: 'prenatal',
    duration: 15,
    difficulty: 'easy',
    benefits: [
      "Processes pregnancy emotions",
      "Creates keepsake for child",
      "Promotes mindfulness",
      "Strengthens maternal bond"
    ],
    materials: ["Journal or notebook", "Pen"],
    tips: [
      "Write regularly, even if just a few lines",
      "Include photos or mementos",
      "Don't worry about perfect writing"
    ],
    imageUrl: "https://images.pexels.com/photos/1741230/pexels-photo-1741230.jpeg",
    createdAt: new Date()
  },
  {
    id: generateId(),
    title: "Nature Connection Walk",
    description: "Take peaceful walks while connecting with baby and nature",
    instructions: [
      "Choose a safe, peaceful walking route",
      "Walk at a comfortable, slow pace",
      "Talk to your baby about what you see",
      "Take breaks to rest and connect",
      "Practice deep breathing in fresh air",
      "End with a moment of gratitude"
    ],
    type: 'movement' as ContentType,
    ageGroup: 'prenatal',
    duration: 20,
    difficulty: 'easy',
    benefits: [
      "Provides gentle exercise",
      "Reduces stress through nature",
      "Improves mood and energy",
      "Promotes healthy pregnancy"
    ],
    materials: ["Comfortable walking shoes", "Water bottle"],
    tips: [
      "Listen to your body and rest when needed",
      "Avoid uneven or challenging terrain",
      "Bring water and snacks"
    ],
    imageUrl: "https://images.pexels.com/photos/396133/pexels-photo-396133.jpeg",
    createdAt: new Date()
  }
]

// Postnatal Activity Templates (0-6 months)
export const postnatalActivities: ActivityTemplate[] = [
  {
    id: generateId(),
    title: "Tummy Time with Stories",
    description: "Engage your baby during tummy time with colorful books and stories",
    instructions: [
      "Place baby on their tummy on a soft surface",
      "Get down to baby's eye level",
      "Show high-contrast books or pictures",
      "Read in an animated, engaging voice",
      "Point to pictures and describe them",
      "Watch for signs of tiredness and adjust"
    ],
    type: 'stories' as ContentType,
    ageGroup: 'newborn',
    duration: 5,
    difficulty: 'easy',
    benefits: [
      "Strengthens neck and shoulder muscles",
      "Promotes visual development",
      "Encourages language development",
      "Builds parent-child bond"
    ],
    materials: ["High-contrast books", "Soft blanket", "Tummy time mat"],
    tips: [
      "Start with short sessions (2-3 minutes)",
      "Do this when baby is alert and happy",
      "Stop if baby becomes fussy"
    ],
    imageUrl: "https://images.pexels.com/photos/1556652/pexels-photo-1556652.jpeg",
    createdAt: new Date()
  },
  {
    id: generateId(),
    title: "Sensory Play with Textures",
    description: "Introduce different safe textures for baby to explore",
    instructions: [
      "Gather safe textured items (soft fabric, smooth wood, etc.)",
      "Hold baby securely in your lap",
      "Gently guide baby's hands to touch different textures",
      "Describe each texture as baby explores",
      "Watch baby's reactions and responses",
      "Keep sessions short and positive"
    ],
    type: 'sensory' as ContentType,
    ageGroup: '0-3months',
    duration: 10,
    difficulty: 'easy',
    benefits: [
      "Develops tactile awareness",
      "Stimulates brain development",
      "Encourages curiosity",
      "Builds sensory processing skills"
    ],
    materials: ["Various safe textured items", "Clean cloth"],
    tips: [
      "Ensure all items are clean and safe",
      "Supervise closely during exploration",
      "Follow baby's lead and interest"
    ],
    imageUrl: "https://images.pexels.com/photos/3693120/pexels-photo-3693120.jpeg",
    createdAt: new Date()
  },
  {
    id: generateId(),
    title: "Gentle Baby Massage",
    description: "Soothing massage to promote bonding and relaxation",
    instructions: [
      "Ensure room is warm and comfortable",
      "Use a small amount of baby-safe oil",
      "Start with gentle strokes on baby's arms",
      "Move to legs, back, and tummy",
      "Talk or sing softly during massage",
      "Watch for baby's cues and comfort level"
    ],
    type: 'sensory' as ContentType,
    ageGroup: 'newborn',
    duration: 15,
    difficulty: 'medium',
    benefits: [
      "Promotes bonding and attachment",
      "Improves circulation",
      "Helps with digestion",
      "Calms and soothes baby"
    ],
    materials: ["Baby-safe massage oil", "Soft towel", "Warm room"],
    tips: [
      "Choose a time when baby is calm but alert",
      "Use gentle pressure only",
      "Stop if baby seems uncomfortable"
    ],
    imageUrl: "https://images.pexels.com/photos/1556652/pexels-photo-1556652.jpeg",
    createdAt: new Date()
  },
  {
    id: generateId(),
    title: "Musical Movement Time",
    description: "Dance and move gently with your baby to different types of music",
    instructions: [
      "Choose various types of music (classical, folk, jazz)",
      "Hold baby securely against your chest",
      "Sway and move gently to the rhythm",
      "Change movements with different songs",
      "Sing along when you know the words",
      "Watch baby's reactions to different styles"
    ],
    type: 'songs' as ContentType,
    ageGroup: '0-3months',
    duration: 15,
    difficulty: 'easy',
    benefits: [
      "Develops rhythm and musical awareness",
      "Promotes bonding through movement",
      "Stimulates vestibular system",
      "Introduces cultural music"
    ],
    materials: ["Music player", "Comfortable space to move"],
    tips: [
      "Keep movements gentle and smooth",
      "Try different music genres",
      "Follow baby's energy level"
    ],
    imageUrl: "https://images.pexels.com/photos/3693120/pexels-photo-3693120.jpeg",
    createdAt: new Date()
  },
  {
    id: generateId(),
    title: "Face-to-Face Conversation",
    description: "Engage in 'conversations' with your baby to promote language development",
    instructions: [
      "Position yourself 8-12 inches from baby's face",
      "Make eye contact and smile",
      "Talk to baby in a sing-song voice",
      "Wait for baby's responses (coos, gurgles, expressions)",
      "Respond to baby's sounds as if having a conversation",
      "Copy baby's facial expressions"
    ],
    type: 'educational' as ContentType,
    ageGroup: 'newborn',
    duration: 10,
    difficulty: 'easy',
    benefits: [
      "Promotes language development",
      "Builds social skills",
      "Strengthens emotional bond",
      "Develops communication patterns"
    ],
    materials: [],
    tips: [
      "Use exaggerated facial expressions",
      "Give baby time to 'respond'",
      "Do this when baby is alert and content"
    ],
    imageUrl: "https://images.pexels.com/photos/1556652/pexels-photo-1556652.jpeg",
    createdAt: new Date()
  },
  {
    id: generateId(),
    title: "High Contrast Visual Play",
    description: "Use black and white patterns to stimulate baby's developing vision",
    instructions: [
      "Show baby high-contrast cards or books",
      "Hold items 8-12 inches from baby's face",
      "Move items slowly from side to side",
      "Describe what baby is seeing",
      "Watch for baby's eye tracking",
      "Change images every 30 seconds"
    ],
    type: 'educational' as ContentType,
    ageGroup: 'newborn',
    duration: 8,
    difficulty: 'easy',
    benefits: [
      "Stimulates visual development",
      "Improves focus and attention",
      "Develops tracking skills",
      "Promotes brain development"
    ],
    materials: ["High-contrast cards or books", "Good lighting"],
    tips: [
      "Use simple patterns initially",
      "Keep sessions short to avoid overstimulation",
      "Follow baby's gaze and interest"
    ],
    imageUrl: "https://images.pexels.com/photos/3693120/pexels-photo-3693120.jpeg",
    createdAt: new Date()
  },
  {
    id: generateId(),
    title: "Peek-a-Boo Games",
    description: "Classic games that teach object permanence and cause-and-effect",
    instructions: [
      "Cover your face with your hands or a cloth",
      "Say 'Where's Mommy/Daddy?' in an excited voice",
      "Reveal your face and say 'Peek-a-boo!'",
      "Watch baby's reaction and smile",
      "Repeat several times",
      "Try variations like hiding baby's face gently"
    ],
    type: 'educational' as ContentType,
    ageGroup: '3-6months',
    duration: 5,
    difficulty: 'easy',
    benefits: [
      "Teaches object permanence",
      "Develops anticipation skills",
      "Promotes laughter and joy",
      "Builds trust and security"
    ],
    materials: ["Soft cloth or your hands"],
    tips: [
      "Start slowly and build excitement",
      "Watch for baby's cues of enjoyment",
      "Stop if baby becomes overstimulated"
    ],
    imageUrl: "https://images.pexels.com/photos/1556652/pexels-photo-1556652.jpeg",
    createdAt: new Date()
  },
  {
    id: generateId(),
    title: "Gentle Exercise and Stretching",
    description: "Help baby with gentle movements to promote physical development",
    instructions: [
      "Lay baby on their back on a soft surface",
      "Gently move baby's arms in cycling motions",
      "Help baby 'bicycle' their legs",
      "Gently stretch arms up and across body",
      "Support baby in sitting position briefly",
      "Always move slowly and watch baby's comfort"
    ],
    type: 'movement' as ContentType,
    ageGroup: '0-3months',
    duration: 10,
    difficulty: 'medium',
    benefits: [
      "Promotes motor development",
      "Helps with digestion",
      "Builds muscle strength",
      "Improves flexibility"
    ],
    materials: ["Soft surface", "Comfortable clothing for baby"],
    tips: [
      "Never force movements",
      "Stop if baby seems uncomfortable",
      "Do this when baby is calm and alert"
    ],
    imageUrl: "https://images.pexels.com/photos/396133/pexels-photo-396133.jpeg",
    createdAt: new Date()
  },
  {
    id: generateId(),
    title: "Lullaby and Rocking Time",
    description: "Soothing songs and gentle rocking to calm and bond with baby",
    instructions: [
      "Hold baby comfortably in your arms",
      "Choose familiar lullabies or soft songs",
      "Rock gently back and forth or side to side",
      "Sing in a soft, soothing voice",
      "Make eye contact when baby is alert",
      "Continue until baby is calm or sleepy"
    ],
    type: 'songs' as ContentType,
    ageGroup: 'newborn',
    duration: 15,
    difficulty: 'easy',
    benefits: [
      "Promotes bonding and attachment",
      "Helps regulate baby's emotions",
      "Establishes bedtime routines",
      "Develops musical awareness"
    ],
    materials: ["Comfortable chair or rocking chair"],
    tips: [
      "Use the same songs regularly",
      "Don't worry about perfect singing",
      "Follow baby's cues for when to stop"
    ],
    imageUrl: "https://images.pexels.com/photos/3693120/pexels-photo-3693120.jpeg",
    createdAt: new Date()
  },
  {
    id: generateId(),
    title: "Mirror Play and Recognition",
    description: "Use mirrors to help baby develop self-awareness and visual skills",
    instructions: [
      "Hold baby in front of a safe, unbreakable mirror",
      "Point to baby's reflection and say their name",
      "Make faces in the mirror together",
      "Touch baby's nose, then point to reflection's nose",
      "Encourage baby to reach toward the mirror",
      "Describe what you both see"
    ],
    type: 'educational' as ContentType,
    ageGroup: '3-6months',
    duration: 8,
    difficulty: 'easy',
    benefits: [
      "Develops self-awareness",
      "Improves visual tracking",
      "Promotes social development",
      "Encourages reaching and grasping"
    ],
    materials: ["Safe, unbreakable mirror"],
    tips: [
      "Use a mirror specifically designed for babies",
      "Keep sessions short and fun",
      "Watch for signs of overstimulation"
    ],
    imageUrl: "https://images.pexels.com/photos/1556652/pexels-photo-1556652.jpeg",
    createdAt: new Date()
  }
]

export const allActivityTemplates = [...prenatalActivities, ...postnatalActivities]