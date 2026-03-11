import { useState, useRef } from "react";

const GOLD = "#C9A24A";
const RED = "#7A0F12";
const BG = "#080808";

// ── SERIES DEFINITIONS ─────────────────────────────────────────────────────
const SERIES_LIST = [
  { key: "founders", label: "Founders Series", color: "#C9A24A" },
  { key: "quickhits", label: "Quick Hits", color: "#7A8FC9" },
  { key: "nobloat", label: "No-Bloat", color: "#6BBF8E" },
  { key: "iphone", label: "iPhone GSP", color: "#C97A7A" },
  { key: "reaction", label: "Eating + Reaction", color: "#C9A24A" },
  { key: "wheretobuy", label: "Where to Buy", color: "#7AC9A2" },
  { key: "commercial", label: "Commercial", color: "#A27AC9" },
  { key: "other", label: "Other", color: "#888" },
];

const SERIES_MAP = Object.fromEntries(SERIES_LIST.map(s => [s.key, s]));

const TYPE_STYLE = {
  hook:  { color: "#C9A24A", fontWeight: "bold", fontSize: 15 },
  beat:  { color: "#555", fontSize: 13, fontStyle: "italic" },
  body:  { color: "#C8C0B4", fontSize: 14 },
  close: { color: "#E0D9CE", fontWeight: "bold", fontSize: 14 },
  tag:   { color: "#E07070", fontWeight: "bold", fontSize: 13, fontStyle: "italic" },
};

// ── INITIAL SCRIPTS ────────────────────────────────────────────────────────
const INIT_SCRIPTS = [
  {
    id: "FS01", series: "founders", number: "01",
    title: "Who is Georges St-Pierre?", topic: "Origin Story — Identity",
    hook: "INTERVIEW QUESTION: Georges, for people who don't know you — who are you, and what have you dedicated your life to?",
    viralangle: "Let him introduce himself in his own words. Don't prompt the UFC. Don't prompt the titles. The goal is for him to land on what drives him — competition, discipline, doing things right. That authenticity is what makes everything that follows credible.",
    direction: "Seat him comfortably. Camera rolling before the question is asked. The first 30 seconds of his answer will be the warmup — the gold usually comes 60–90 seconds in once he stops performing and starts talking. Don't interrupt. Let silence sit.",
    versions: [
      {
        label: "Primary Question",
        lines: [
          { type: "hook", text: "Georges, for people who don't know you — who are you, and what have you dedicated your life to?" },
        ]
      },
      {
        label: "Follow-Up Questions",
        lines: [
          { type: "body", text: "What does it mean to you to be a champion — not just in the cage, but in how you live?" },
          { type: "body", text: "You've always been described as one of the most disciplined athletes in combat sports. Where does that come from?" },
          { type: "body", text: "When you were competing at the highest level, what separated you from everyone else?" },
          { type: "body", text: "What do you want people to know about Georges St-Pierre the person — not the fighter?" },
        ]
      },
      {
        label: "📋 Director Notes",
        lines: [
          { type: "beat", text: "Do NOT brief GSP on specific answers. These are conversation starters, not scripts." },
          { type: "beat", text: "Shoot wide first, then tighten in. His face tells the story more than his words." },
          { type: "beat", text: "If he goes long — let him. Clip extraction happens in edit. You want options." },
          { type: "beat", text: "Target clip: any moment where he speaks about identity, purpose, or discipline. That's the brand anchor." },
        ]
      }
    ]
  },
  {
    id: "FS02", series: "founders", number: "02",
    title: "How did you stay healthy fighting in the UFC?", topic: "Performance Nutrition — Athlete Credibility",
    hook: "INTERVIEW QUESTION: When you were competing in the UFC, how did you think about what you put in your body? What was your relationship with food and nutrition at the highest level?",
    viralangle: "This is the credibility bridge — it connects GSP's elite athletic career directly to why his food standard matters. Every claim on the GSPFood box lands harder once the audience understands what this man's body has been through and what he demanded of it.",
    direction: "This should feel like a locker room conversation, not an interview. Get him talking about specific fights, specific weight cuts, specific moments where nutrition was the difference. Specificity is credibility. If he mentions a camp or a training period — follow that thread.",
    versions: [
      {
        label: "Primary Question",
        lines: [
          { type: "hook", text: "When you were competing in the UFC, how did you think about what you put in your body? What was your relationship with food and nutrition at the highest level?" },
        ]
      },
      {
        label: "Follow-Up Questions",
        lines: [
          { type: "body", text: "What did a typical fight camp look like nutritionally? What were you eating, and why?" },
          { type: "body", text: "Were there foods you refused to eat during your career? Things you knew would slow you down?" },
          { type: "body", text: "How did what you ate affect how you felt in the cage? Can you feel the difference between a good nutrition week and a bad one?" },
          { type: "body", text: "Now that you're not competing, has your relationship with food changed? What does healthy eating look like for you today?" },
          { type: "body", text: "You have five kids now. How does what you learned as an athlete change how you think about what you feed them?" },
        ]
      },
      {
        label: "📋 Director Notes",
        lines: [
          { type: "beat", text: "Listen for: any specific story about food affecting performance. That's the clip." },
          { type: "beat", text: "Listen for: the contrast between 'what I ate as a fighter' and 'what most people eat.' That transition is gold for edit." },
          { type: "beat", text: "If he mentions bloating, heaviness, or how bad food slows recovery — those words connect directly to the Pinsa no-bloat claim. Don't point that out. Let it happen naturally." },
          { type: "beat", text: "Target clip: any 20–30 second window where he describes what elite nutrition felt like. That clip runs before any GSPFood mention." },
        ]
      }
    ]
  },
  {
    id: "FS03", series: "founders", number: "03",
    title: "What makes Pinsa different from regular pizza?", topic: "Product Education — The Pinsa Difference",
    hook: "INTERVIEW QUESTION: A lot of people are going to see GSPFood Pinsa and think — okay, it's a frozen pizza. What would you say to them? What actually makes this different?",
    viralangle: "This is where the product sells itself through his understanding of it. The goal is for him to explain pinsa — the 72-hour fermentation, lentils and fava beans, the lighter feel — in his own words, in a way that makes the listener go 'wait, I didn't know that.' Education as entertainment.",
    direction: "Have a physical pinsa and the box in the room. If he picks it up, reaches for it, tears it — let him. Don't stage it. The most credible moment in any product video is when the person interacts with the product naturally, without being told to. Have him walk you through what he actually knows about it.",
    versions: [
      {
        label: "Primary Question",
        lines: [
          { type: "hook", text: "A lot of people are going to see GSPFood Pinsa and think — okay, it's a frozen pizza. What would you say to them? What actually makes this different?" },
        ]
      },
      {
        label: "Follow-Up Questions",
        lines: [
          { type: "body", text: "Can you explain what Pinsa actually is — the history of it, where it comes from?" },
          { type: "body", text: "What is the 72-hour fermentation doing to the dough that makes it different? Why does that matter?" },
          { type: "body", text: "When you eat a Pinsa versus a regular pizza, what do you feel differently? What does your body tell you?" },
          { type: "body", text: "Why lentils and fava beans? Most people have never heard that in the context of a pizza-style product." },
          { type: "body", text: "40 grams of protein — walk us through that. That's a serious number. How does that happen in a Pinsa?" },
          { type: "body", text: "If you had to describe the texture to someone who's never had it — how would you explain it?" },
        ]
      },
      {
        label: "📋 Director Notes",
        lines: [
          { type: "beat", text: "Keep the Pinsa warm and on the table throughout. If he tears it and shows the crust interior — that's a hero clip." },
          { type: "beat", text: "The 'no bloat' answer is the most shareable moment in this entire interview. Don't rush past it." },
          { type: "beat", text: "If he says 'it's not a pizza, it's a pinsa' unprompted — stop. Do not cut. That is the tagline delivered organically." },
          { type: "beat", text: "Target clip: the moment he explains what 72-hour fermentation means in plain language. That's a standalone education reel." },
        ]
      }
    ]
  },
  {
    id: "FS04", series: "founders", number: "04",
    title: "What is the mission behind GSPFood?", topic: "Brand Mission — Why This Exists",
    hook: "INTERVIEW QUESTION: You're Georges St-Pierre — you could put your name on anything. Why this? Why food? Why Pinsa?",
    viralangle: "This is the 'why' video. The answer to this question is the entire brand story in one thread. Every other Founders video is a chapter — this is the spine. The goal is a genuine answer about what he actually believes, not a polished mission statement.",
    direction: "This is the most important interview question on the shoot. Give it room. Don't rush into the follow-ups. If he gives a short answer, sit in the silence — he will often go deeper. The real answer usually comes after the first answer ends.",
    versions: [
      {
        label: "Primary Question",
        lines: [
          { type: "hook", text: "You're Georges St-Pierre — you could put your name on anything. Why this? Why food? Why Pinsa?" },
        ]
      },
      {
        label: "Follow-Up Questions",
        lines: [
          { type: "body", text: "What problem were you trying to solve when GSPFood started? What gap did you see that nobody else was filling?" },
          { type: "body", text: "What does it mean to you that your name is on this box? What does that responsibility feel like?" },
          { type: "body", text: "A lot of athletes license their name for money and move on. What makes this different for you personally?" },
          { type: "body", text: "What's the standard? What does a product have to meet before it gets the GSP name?" },
          { type: "body", text: "What would it mean to you if GSPFood changed the way Canadian families think about frozen food?" },
          { type: "body", text: "Where do you want this brand to be in five years?" },
        ]
      },
      {
        label: "📋 Director Notes",
        lines: [
          { type: "beat", text: "If he says anything about refusing to compromise — that is a pull quote. Flag it in the edit log." },
          { type: "beat", text: "If he talks about his kids in this answer — let it run. The family motivation is the most universal hook in the brand." },
          { type: "beat", text: "Watch for the moment his posture changes and he leans in. That's when the real answer is coming." },
          { type: "beat", text: "Target clip: any 30–45 second window where he explains why his name means something. That's the brand manifesto clip." },
        ]
      }
    ]
  },
  {
    id: "FS05", series: "founders", number: "05",
    title: "How does GSPFood benefit you personally?", topic: "Personal Benefit — Real Life Use",
    hook: "INTERVIEW QUESTION: Forget the brand for a second — how does GSPFood Pinsa actually fit into your life? When do you eat it? What does it do for you personally?",
    viralangle: "Authenticity over endorsement. The audience can smell a forced testimonial. What they can't resist is a real answer — a specific moment, a specific flavour, a real reaction. This is the video that makes people believe everything else he says.",
    direction: "Most casual setup of the day. Kitchen if possible. Have a Pinsa ready to eat — not just as a prop, but actually eat it during this conversation if natural. The goal is to get him off the talking-head format and into a real moment of genuine interaction with the product.",
    versions: [
      {
        label: "Primary Question",
        lines: [
          { type: "hook", text: "Forget the brand for a second — how does GSPFood Pinsa actually fit into your life? When do you eat it? What does it do for you personally?" },
        ]
      },
      {
        label: "Follow-Up Questions",
        lines: [
          { type: "body", text: "What's your go-to flavour right now and why?" },
          { type: "body", text: "When in your week does this actually show up? After training? With the kids? Late night?" },
          { type: "body", text: "You have five kids — has this actually changed what dinner looks like in your house?" },
          { type: "body", text: "You're someone who's been extremely careful about what goes in your body your whole career. Does eating this feel different from other frozen food? How?" },
          { type: "body", text: "What's the reaction been from your kids? Do they ask for it?" },
          { type: "body", text: "If a friend — not a fan, just a regular person — asked you honestly: 'Is this actually good?' What do you say?" },
        ]
      },
      {
        label: "📋 Director Notes",
        lines: [
          { type: "beat", text: "If he actually eats during this segment — keep rolling. A genuine reaction mid-bite is worth more than any scripted line." },
          { type: "beat", text: "The 'my kids ask for it' moment — if it comes up, let it breathe. That is the most shareable sentence in the entire shoot." },
          { type: "beat", text: "If he names a specific flavour as his favourite — isolate that clip. It can run as a standalone flavour endorsement." },
          { type: "beat", text: "Target clip: any 15–20 second window of genuine product interaction — bite, reaction, real opinion. That's the social proof engine." },
        ]
      }
    ]
  },
  {
    id: "FS06", series: "founders", number: "06",
    title: "The Future of GSPFood", topic: "Vision — Where This Is Going",
    hook: "INTERVIEW QUESTION: Where does this go from here? What's the vision for GSPFood — not just as a product, but as something bigger?",
    viralangle: "'You came in early' makes every viewer feel like an insider. The vision answer — when it's genuine — creates anticipation and gives people a reason to follow the brand long-term. This is the loyalty-building closer.",
    direction: "This is the last interview segment. GSP will be warmed up, comfortable, more open than at the start. Let it run long. The closer he lands on his own vision — unprompted — the better. His optimism and ambition are the brand's story.",
    versions: [
      {
        label: "Primary Question",
        lines: [
          { type: "hook", text: "Where does this go from here? What's the vision for GSPFood — not just as a product, but as something bigger?" },
        ]
      },
      {
        label: "Follow-Up Questions",
        lines: [
          { type: "body", text: "What does success look like for this brand in five years? Ten years?" },
          { type: "body", text: "What would it mean to you if GSPFood became a household name — the way your career made you one?" },
          { type: "body", text: "You went from Quebec to becoming one of the most recognised athletes on the planet. Do you see that same kind of ambition in what you're building with food?" },
          { type: "body", text: "What do you want people to remember about what GSPFood stood for?" },
          { type: "body", text: "What would you say directly to someone who just bought their first box?" },
        ]
      },
      {
        label: "📋 Director Notes",
        lines: [
          { type: "beat", text: "The answer to 'what would you say to someone who just bought their first box' is the closing clip of the entire Founders Series. Save it for last." },
          { type: "beat", text: "If he gets emotional or reflective — do not cut. That is the most authentic moment on the shoot." },
          { type: "beat", text: "Watch for a natural 'thank you' or acknowledgment to early supporters. That moment earns loyalty." },
          { type: "beat", text: "Target clip: his personal vision in 30–45 seconds, unprompted. That becomes the brand manifesto video." },
        ]
      }
    ]
  },
  {
    id: "FS07", series: "founders", number: "07",
    title: "GSP Certified — Closing Statement", topic: "Testimonial + Brand Authority",
    hook: "INTERVIEW QUESTION: If you had to sum up everything GSPFood stands for in one sentence — what would you say?",
    viralangle: "This is the money question. Asked last, after he's been talking for hours and is completely off-guard. The best brand lines in history came from someone being asked to just say it simply. Don't prep him on this one. Ask it cold.",
    direction: "Ask this question completely cold — do not warn him it's coming. The most authentic brand statement will come when he's not thinking about it. Seat him with the box in hand or on the table. Keep camera tight. One take.",
    versions: [
      {
        label: "Primary Question",
        lines: [
          { type: "hook", text: "If you had to sum up everything GSPFood stands for in one sentence — what would you say?" },
        ]
      },
      {
        label: "Follow-Up Questions",
        lines: [
          { type: "body", text: "Why does your name on this box mean something different than another celebrity brand?" },
          { type: "body", text: "What's your personal guarantee to someone buying this for the first time?" },
          { type: "body", text: "If you had to sell the Pinsa in one line — what would you say?" },
          { type: "body", text: "Last thing — look right at the camera. Tell the person watching this why they should try GSPFood Pinsa." },
        ]
      },
      {
        label: "📋 Director Notes",
        lines: [
          { type: "beat", text: "This is the final question of the day. Don't announce it as important — just ask it naturally." },
          { type: "beat", text: "If he says 'It's not a pizza. It's a Pinsa.' organically — that is the entire shoot in one moment." },
          { type: "beat", text: "If he says something unexpected and genuine — that becomes the brand line. Stay open." },
          { type: "beat", text: "'I'm Georges St-Pierre and this Pinsa is GSP Certified' — if it comes out naturally, that's the closer for every Founders video." },
        ]
      }
    ]
  },
  {
    id: "COM01", series: "commercial", number: "01",
    title: "The Supermarket Moment", topic: "Comedy Commercial — FP + GSP",
    hook: "A French-Italian standoff in the frozen food aisle.",
    viralangle: "The 'French guy vs Italian guy' line is the viral moment. Relatable parent energy + unexpected celebrity cameo + kid delivering the tagline = pure shareable comedy. The café challenge at the end sets up a Part 2.",
    direction: "Two-camera setup. FP is the straight man — this is his scene first, GSP is the surprise. The comedy lives in the pause before FP turns around. Kid's fist pump needs to be BIG. Don't over-direct the child — just let them react. Shoot the whisper scene tight — GSP's 'shhhhh' must land. FP's final 'alright listen' should feel like he's genuinely considering it, not caving.",
    versions: [
      {
        label: "Full Commercial — 60s",
        lines: [
          { type: "beat", text: "[INT. GROCERY STORE — FROZEN AISLE. FP walks with his kids. Kids suddenly sprint ahead toward the freezer section.]" },
          { type: "body", text: "CHILD: Pappa! Pappa! Can we have a Pinsa tonight — before my hockey game?" },
          { type: "body", text: "FP: Buddy. Absolutely not. You don't eat pizza before a game. Too heavy. I'll make you pasta with tuna — carbs, protein. Boom. Hockey fuel." },
          { type: "beat", text: "[Child holds up the GSPFood box]" },
          { type: "body", text: "CHILD: It's not a pizza, Pappa. It's a PINSA. And look — Georges St-Pierre likes it!" },
          { type: "beat", text: "[FP takes the box. Squints at it. Turns it over.]" },
          { type: "body", text: "FP: What the heck is a Pinsa?" },
          { type: "beat", text: "[A voice from just off his shoulder — calm, confident.]" },
          { type: "body", text: "GSP (O.S.): Forty grams of protein. No soy. Fermented for seventy-two hours. And it tastes better than any frozen pizza you've ever had." },
          { type: "beat", text: "[FP slowly turns. Georges St-Pierre is standing right beside him. FP blinks.]" },
          { type: "body", text: "FP: …George?" },
          { type: "beat", text: "[GSP puts one finger to his lips.]" },
          { type: "body", text: "GSP (whispering): Shhhh." },
          { type: "beat", text: "[Beat. FP looks at the box. Looks at GSP. Looks at the box.]" },
          { type: "body", text: "FP: George. No disrespect. But a French guy is not going to walk up to an Italian guy in a grocery store and tell him this is the best pizza he's ever had." },
          { type: "body", text: "GSP: It's not a pizza." },
          { type: "body", text: "GSP: It's a Pinsa." },
          { type: "beat", text: "[Kid tugs FP's sleeve, grinning.]" },
          { type: "body", text: "CHILD: Told you, Pappa." },
          { type: "beat", text: "[FP exhales. He's thinking. He looks at GSP. A slow nod.]" },
          { type: "body", text: "FP: Alright. Listen. I own a café — next door. We throw one in the oven. If this Pinsa is anywhere close to one of my homemade pizzas… I'll admit it." },
          { type: "body", text: "GSP (smiling): Let's do it." },
          { type: "beat", text: "[Kid fist-pumps. Hard cut to black.]" },
          { type: "tag", text: "GSPFood. It's not a pizza. It's a Pinsa." },
        ]
      },
      {
        label: "Cut-Down — 30s",
        lines: [
          { type: "beat", text: "[Frozen aisle. Kid sprints to freezer, holds up box.]" },
          { type: "body", text: "CHILD: Pappa! Can we have Pinsa before my hockey game?" },
          { type: "body", text: "FP: You're not eating pizza before a game. Too heavy." },
          { type: "body", text: "CHILD: It's not a pizza. It's a PINSA. Georges St-Pierre likes it!" },
          { type: "beat", text: "[Voice beside him.]" },
          { type: "body", text: "GSP: Forty grams of protein. No soy. Fermented 72 hours. Tastes better than any frozen pizza you've had." },
          { type: "beat", text: "[FP turns. Stares at GSP.]" },
          { type: "body", text: "FP: George… no disrespect… but a French guy isn't telling an Italian guy this is the best pizza he's had." },
          { type: "body", text: "GSP: It's not a pizza. It's a Pinsa." },
          { type: "body", text: "CHILD: Told you, Pappa." },
          { type: "beat", text: "[Kid fist-pumps.]" },
          { type: "tag", text: "GSPFood. It's not a pizza. It's a Pinsa." },
        ]
      },
      {
        label: "15s — Pre-Roll / Social",
        lines: [
          { type: "body", text: "CHILD: Pappa, it's not a pizza — it's a PINSA. Georges St-Pierre says so!" },
          { type: "body", text: "FP: A French guy isn't telling an Italian guy—" },
          { type: "body", text: "GSP: It's not a pizza. It's a Pinsa." },
          { type: "beat", text: "[Kid fist-pumps.]" },
          { type: "tag", text: "GSPFood. It's not a pizza. It's a Pinsa." },
        ]
      }
    ]
  },
  {
    id: "WTB01", series: "wheretobuy", number: "01",
    title: "Sobeys — Frozen Aisle", topic: "Where-to-Buy — Sobeys",
    hook: "You can find GSPFood Pinsa right now — at Sobeys.",
    viralangle: "Specificity builds trust. 'Frozen aisle' tells people exactly where to go. Shoot this in-store on Day 2 — GSP standing in front of the actual Sobeys freezer section with product on shelf behind him.",
    direction: "Day 2 — Sobeys store. GSP stands in front of the freezer section. Product visible on shelf behind him. iPhone or camera — candid energy, not overly produced. One take if possible. No teleprompter. Let him gesture to the shelf naturally.",
    versions: [
      {
        label: "15–20s — All Platforms",
        lines: [
          { type: "hook", text: "You want to try a Pinsa? You can find GSPFood right here — at Sobeys." },
          { type: "beat", text: "[GSP gestures to the freezer shelf behind him]" },
          { type: "body", text: "Frozen aisle. Five flavours. Forty grams of protein. No bloat." },
          { type: "body", text: "Grab one. Try it. Let me know what you think." },
          { type: "tag", text: "It's not a pizza. It's a Pinsa." },
        ]
      },
      {
        label: "30s — Extended",
        lines: [
          { type: "hook", text: "A lot of you have been asking — where can I find GSPFood Pinsa?" },
          { type: "body", text: "Right here. Sobeys. Frozen aisle." },
          { type: "beat", text: "[GSP turns, gestures to shelf]" },
          { type: "body", text: "Five flavours. Forty grams of protein. Made with lentils and fava beans, no soy, fermented seventy-two hours." },
          { type: "body", text: "It's fast. It's clean. And it actually tastes great." },
          { type: "body", text: "Go find it." },
          { type: "tag", text: "GSPFood. It's not a pizza. It's a Pinsa." },
        ]
      }
    ]
  },
  {
    id: "WTB02", series: "wheretobuy", number: "02",
    title: "Costco — Frozen Aisle", topic: "Where-to-Buy — Costco",
    hook: "Costco people — this one's for you.",
    viralangle: "Costco has its own culture. The 'Costco people' opener signals community. Emphasize value — multiple boxes, family size, stocking up. This audience buys in bulk so lean into that.",
    direction: "Shoot in studio or store. If in-store, Costco requires advance approval — confirm logistics. If studio, hold a Costco-sized multipack if available. Keep energy slightly warmer than the Sobeys version — Costco shoppers are loyal and enthusiastic.",
    versions: [
      {
        label: "15–20s — All Platforms",
        lines: [
          { type: "hook", text: "Costco people — GSPFood Pinsa is now at Costco." },
          { type: "beat", text: "[holds up box or gestures to shelf]" },
          { type: "body", text: "Frozen aisle. Forty grams of protein. Five flavours. No bloat." },
          { type: "body", text: "Stock up. You're going to want more than one." },
          { type: "tag", text: "It's not a pizza. It's a Pinsa." },
        ]
      },
      {
        label: "30s — Extended",
        lines: [
          { type: "hook", text: "If you shop at Costco — GSPFood Pinsa is there waiting for you." },
          { type: "body", text: "Frozen aisle. Grab a box — or a few." },
          { type: "body", text: "Forty grams of protein per pinsa. Made with lentils and fava beans. No soy. Fermented seventy-two hours. Five flavours." },
          { type: "body", text: "This is the kind of food you actually want to have at home when life gets busy." },
          { type: "body", text: "Go find it at Costco." },
          { type: "tag", text: "GSPFood. It's not a pizza. It's a Pinsa." },
        ]
      }
    ]
  },
  {
    id: "WTB03", series: "wheretobuy", number: "03",
    title: "IGA + Foodland", topic: "Where-to-Buy — IGA / Foodland",
    hook: "IGA. Foodland. GSPFood Pinsa is there.",
    viralangle: "IGA and Foodland skew toward community grocery shoppers — often older, loyal to their local store. Keep the tone warm and direct. Acknowledge both banners in the same breath so neither feels like an afterthought.",
    direction: "Studio or simple clean background. GSP holds box. Warm, direct — less 'hype', more trusted recommendation. These are neighbourhood grocery stores — match that energy.",
    versions: [
      {
        label: "15–20s — All Platforms",
        lines: [
          { type: "hook", text: "If you shop at IGA or Foodland — GSPFood Pinsa is in your frozen aisle right now." },
          { type: "beat", text: "[holds up box]" },
          { type: "body", text: "Forty grams of protein. No bloat. Five flavours." },
          { type: "body", text: "Go check it out." },
          { type: "tag", text: "It's not a pizza. It's a Pinsa." },
        ]
      },
      {
        label: "30s — Extended",
        lines: [
          { type: "hook", text: "To everyone shopping at IGA and Foodland — I want you to know GSPFood Pinsa is there." },
          { type: "body", text: "Frozen aisle. Five flavours. Forty grams of protein. Made clean — lentils, fava beans, no soy, fermented seventy-two hours." },
          { type: "body", text: "It's fast. It's healthy. And it actually tastes great." },
          { type: "body", text: "Look for it next time you're in." },
          { type: "tag", text: "GSPFood. It's not a pizza. It's a Pinsa." },
        ]
      }
    ]
  },
  {
    id: "WTB04", series: "wheretobuy", number: "04",
    title: "Safeway + Thrifty's", topic: "Where-to-Buy — Safeway / Thrifty Foods",
    hook: "BC and Alberta — GSPFood Pinsa just landed at Safeway and Thrifty Foods.",
    viralangle: "Safeway and Thrifty Foods are western Canada. Geo-targeting this video to BC/Alberta will outperform a generic version. Call out the region directly — people respond when they feel seen.",
    direction: "Studio or clean location. Same format as IGA version. Consider adding a quick nod to western Canada — it plays well on local social and signals expansion momentum.",
    versions: [
      {
        label: "15–20s — All Platforms",
        lines: [
          { type: "hook", text: "Western Canada — GSPFood Pinsa is now at Safeway and Thrifty Foods." },
          { type: "beat", text: "[holds up box]" },
          { type: "body", text: "Frozen aisle. Forty grams of protein. Five flavours. No bloat." },
          { type: "body", text: "Go find it." },
          { type: "tag", text: "It's not a pizza. It's a Pinsa." },
        ]
      },
      {
        label: "30s — Extended",
        lines: [
          { type: "hook", text: "If you're in BC or Alberta — GSPFood Pinsa is at Safeway and Thrifty Foods." },
          { type: "body", text: "Frozen aisle. Five flavours. Forty grams of protein. Lentils and fava beans, no soy, fermented seventy-two hours." },
          { type: "body", text: "It's the kind of meal that fits a busy life — without compromising on what you put in your body." },
          { type: "body", text: "Look for it at Safeway or Thrifty Foods near you." },
          { type: "tag", text: "GSPFood. It's not a pizza. It's a Pinsa." },
        ]
      }
    ]
  },
  {
    id: "WTB05", series: "wheretobuy", number: "05",
    title: "No Frills + Cataldi + More", topic: "Where-to-Buy — Additional Locations",
    hook: "More stores. More cities. More places to find GSPFood Pinsa.",
    viralangle: "The 'and more locations' framing builds momentum — it signals growth. Naming No Frills signals accessibility and value. Cataldi is a community favourite in its markets. Ending with 'find it near you' drives traffic to the website/store locator.",
    direction: "Studio. Keep it punchy — this is the catch-all version. GSP can riff a bit more here since the list of stores is flexible. Have him hold the box throughout. End with a clear CTA to the website or link in bio.",
    versions: [
      {
        label: "15–20s — All Platforms",
        lines: [
          { type: "hook", text: "No Frills. Cataldi. And more locations across Canada." },
          { type: "beat", text: "[holds up box]" },
          { type: "body", text: "GSPFood Pinsa is in your neighbourhood. Frozen aisle." },
          { type: "body", text: "Forty grams of protein. No bloat. Five flavours." },
          { type: "close", text: "Find the store nearest you — link in bio." },
          { type: "tag", text: "It's not a pizza. It's a Pinsa." },
        ]
      },
      {
        label: "30s — Extended",
        lines: [
          { type: "hook", text: "We're growing. And I want to make sure you know where to find us." },
          { type: "body", text: "No Frills. Cataldi. And more locations being added across Canada." },
          { type: "beat", text: "[holds up box]" },
          { type: "body", text: "Frozen aisle. Five flavours. Forty grams of protein. Lentils, fava beans, no soy, fermented seventy-two hours." },
          { type: "body", text: "If you don't see it yet at your store — check the link in bio. We'll show you the nearest location." },
          { type: "tag", text: "GSPFood. It's not a pizza. It's a Pinsa." },
        ]
      }
    ]
  },
  {
    id: "COM02", series: "commercial", number: "02",
    title: "The Pinsa Challenge — Julia vs Francesco", topic: "Beat Bobby Flay-Style Commercial",
    hook: "Fresh always wins. Let's test that.",
    viralangle: "'Wait… this was frozen?' is the money moment — clip that reaction alone and it does numbers. The split-screen format is native to TikTok and Reels. The reveal lands because the audience already assumes Francesco wins. Subverting that expectation is the entire engine of this piece. Tag #PinsaChallenge and let UGC do the rest.",
    direction: "Shoot this like a real cooking show — not an ad. Two cameras minimum. One locked on each competitor. Third camera roaming for reactions and hero food shots. Francesco needs to be genuinely working hard — real dough, real prep, real flour. Julia needs to look completely relaxed. The comedy is in the contrast. The judge reactions need to be genuine — don't brief them on which pinsa wins beforehand. Capture everything. One challenge shoot yields 5–8 content pieces (see versions below). Sound design is critical — use a real cooking show-style score and countdown clock graphic.",
    versions: [
      {
        label: "Full Commercial — 60s",
        lines: [
          { type: "beat", text: "[FAST DRAMATIC INTRO — 0–4s. Quick cuts: kitchen, competitors, logo flash.]" },
          { type: "hook", text: "HOST (V.O.): Today on the Pinsa Challenge… Julia vs Francesco. Fresh vs Frozen." },
          { type: "beat", text: "[Cut to competitors facing each other.]" },
          { type: "body", text: "FRANCESCO: Fresh always wins." },
          { type: "body", text: "JULIA: Let's test that." },
          { type: "beat", text: "[RULES GRAPHIC appears — 4–8s]" },
          { type: "body", text: "GRAPHIC: RULES / Make the best pinsa / Fastest wins / Taste test decides" },
          { type: "beat", text: "[Countdown graphic: 3… 2… 1… GO!]" },
          { type: "beat", text: "[SPLIT SCREEN — 8–25s. Timer graphic ticking on screen.]" },
          { type: "body", text: "FRANCESCO SIDE: Rolling dough — flour flies in slow motion. Chopping ingredients. Sauce prepped by hand. Full production." },
          { type: "body", text: "JULIA SIDE: Opens freezer. Pulls out GSPFood Pinsa. Adds a few toppings. Slides it into the oven. Leans against the counter." },
          { type: "beat", text: "[PRESSURE MOMENT — 25–40s. Francesco still building. Julia's oven light glows.]" },
          { type: "body", text: "JULIA: Done." },
          { type: "beat", text: "[She pulls the pinsa out. Places it on the board. Francesco looks up — still mid-prep.]" },
          { type: "body", text: "FRANCESCO: …Already?" },
          { type: "beat", text: "[THE JUDGES — 40–55s. Judges taste both. Reaction shots. Genuine pause.]" },
          { type: "body", text: "JUDGE 1 (tasting Julia's): Wait… this one was frozen?" },
          { type: "body", text: "JUDGE 2: This one wins." },
          { type: "beat", text: "[Reveal shot — Julia's Pinsa under the camera. Cheese pull. Golden crust.]" },
          { type: "beat", text: "[FINAL FRAME — 55–60s. Black screen.]" },
          { type: "tag", text: "FROZEN. FAST. CHAMPION TASTE." },
          { type: "tag", text: "GSPFood. It's not a pizza. It's a Pinsa." },
        ]
      },
      {
        label: "30s Cut-Down — Instagram / TikTok",
        lines: [
          { type: "hook", text: "HOST (V.O.): Julia vs Francesco. Fresh vs Frozen. GO." },
          { type: "beat", text: "[Split screen — Francesco rolls dough / Julia opens freezer. Timer ticking.]" },
          { type: "body", text: "JULIA: Done." },
          { type: "body", text: "FRANCESCO: …Already?" },
          { type: "beat", text: "[Judges taste. Pause. Reaction.]" },
          { type: "body", text: "JUDGE: Wait — this was frozen?" },
          { type: "body", text: "JUDGE: This one wins." },
          { type: "beat", text: "[Cheese pull reveal.]" },
          { type: "tag", text: "Frozen. Fast. Champion Taste." },
          { type: "tag", text: "GSPFood. It's not a pizza. It's a Pinsa." },
        ]
      },
      {
        label: "15s Hook — Pre-Roll / Reels",
        lines: [
          { type: "hook", text: "Fresh vs Frozen. One minute. Judges decide." },
          { type: "beat", text: "[Split screen chaos → Julia pulls pinsa → Judge reacts]" },
          { type: "body", text: "JUDGE: This one wins." },
          { type: "beat", text: "[Reveal: frozen pinsa.]" },
          { type: "tag", text: "GSPFood. It's not a pizza. It's a Pinsa." },
        ]
      },
      {
        label: "🎬 BONUS: 5–8 Clips From This Single Shoot",
        lines: [
          { type: "beat", text: "Every piece below can be cut from the same shoot day — no additional filming required." },
          { type: "body", text: "CLIP 1 — Main Reel: Full Julia vs Francesco challenge. 45–60s. The flagship piece." },
          { type: "body", text: "CLIP 2 — 'Frozen vs Fresh' Moment: Just the split-screen race. 15s. Hook-first cut. No context needed." },
          { type: "body", text: "CLIP 3 — Food Reel: Slow motion food shots only. Flour fly, toppings drop, cheese pull, oven glow. Music-driven. No dialogue. 20–30s." },
          { type: "body", text: "CLIP 4 — Taste Test Reel: Judges tasting, reactions, the reveal. 15–20s. High surprise factor." },
          { type: "body", text: "CLIP 5 — Judge Reaction Clip: 'Wait… this was FROZEN?' — just the reaction, looped or standalone. 5–8s. Built for shares." },
          { type: "body", text: "CLIP 6 — Behind the Scenes: Francesco flouring the counter, Julia grinning at the freezer, judges deliberating. Candid iPhone footage. 30–60s." },
          { type: "body", text: "CLIP 7 — Julia Wins: Julia holding the pinsa box like a trophy. Quick celebration. Text overlay: FROZEN WINS. 5–10s." },
          { type: "beat", text: "[DIRECTOR NOTE: Shoot a clean 'Bobby Flay walks away' moment — Francesco removing his apron or shaking his head with a smile. That clip alone could be the one that goes viral.]" },
        ]
      }
    ]
  },
  {
    id: "COM03", series: "commercial", number: "03",
    title: "It's Not Pizza. It's Pinsa.", topic: "Kitchen Dialogue — GSP + Giuseppe + Mark Kerr",
    hook: "So… it's a pizza?",
    viralangle: "The three-man correction format is pure comedy — one setup, one deadpan correction, one punchline. 'It's not a pizza.' / 'It's a PINSA.' is a quotable exchange that works as a standalone clip. The Little Caesars 'Bottom Line' corporate tone is the right reference — serious guys taking it seriously makes it funnier. Mark Kerr is the audience surrogate: he says what everyone watching is thinking.",
    direction: "Three guys in aprons. Kitchen set — counters, oven, proper cooking environment. Treat it like a corporate product demonstration, not a comedy sketch — the humour comes from how straight everyone plays it. Mark picks up the box genuinely confused. GSP corrects him like he's been correcting people his whole life. Giuseppe steps in like a man who has been waiting his entire career for this moment. The product montage at 0:13 needs to be genuinely beautiful — this is where the food sells itself. Shoot the crave shots separately with the food stylist and cut them in post. GSP's final line to camera should feel like a natural close, not a scripted CTA.",
    versions: [
      {
        label: "30s — Full Commercial",
        lines: [
          { type: "beat", text: "[0:00–0:03 — COLD OPEN. Wide shot. Three guys in kitchen aprons — GSP, Mark, Giuseppe. Light upbeat music. They look ready for business.]" },
          { type: "beat", text: "[0:03–0:07 — Mark picks up the GSPFood box. Squints at it. Turns it over.]" },
          { type: "body", text: "MARK: So… it's a pizza?" },
          { type: "beat", text: "[0:07–0:10 — Cut to GSP. Calm. Certain.]" },
          { type: "body", text: "GSP: It's not a pizza." },
          { type: "beat", text: "[0:10–0:13 — Giuseppe steps forward. The energy of a man born for this moment.]" },
          { type: "body", text: "GIUSEPPE: Oh no. It's a pinsa." },
          { type: "beat", text: "[0:13–0:20 — PRODUCT MONTAGE (food stylist shots). Quick cuts:]" },
          { type: "body", text: "• Box on counter — hero shot" },
          { type: "body", text: "• Oven tray slides in / oven light glow" },
          { type: "body", text: "• Cheese bubbling close-up" },
          { type: "body", text: "• Pepperoni crisp / Meat Lovers texture" },
          { type: "body", text: "• Basil drop on Margherita" },
          { type: "body", text: "• Slice pull / crust close-up — the honeycomb interior" },
          { type: "beat", text: "[ON-SCREEN TEXT — clean, fast: '72-hour fermented sourdough' / 'High protein • No soy']" },
          { type: "beat", text: "[0:20–0:25 — GSP takes the first bite. CRUNCH. Mark watches.]" },
          { type: "body", text: "MARK: Okay… that crunch is real." },
          { type: "body", text: "GIUSEPPE: Told you." },
          { type: "beat", text: "[0:25–0:30 — All five flavours lined up on the counter. GSP turns to camera.]" },
          { type: "close", text: "GSP: Pizza night… upgraded. Welcome to Pinsa Night." },
          { type: "tag", text: "END CARD: Available at Sobeys, Costco + more retailers." },
          { type: "tag", text: "GSPFood. It's not a pizza. It's a Pinsa." },
        ]
      },
      {
        label: "15s — Cut-Down",
        lines: [
          { type: "beat", text: "[Mark holds up box.]" },
          { type: "body", text: "MARK: So… it's a pizza?" },
          { type: "body", text: "GSP: It's not a pizza." },
          { type: "body", text: "GIUSEPPE: It's a PINSA." },
          { type: "beat", text: "[Quick food montage — cheese pull, crunch, slice.]" },
          { type: "body", text: "MARK: …That crunch is real." },
          { type: "tag", text: "GSPFood. It's not a pizza. It's a Pinsa." },
        ]
      },
      {
        label: "📋 Shot List — Food Stylist Montage (0:13–0:20)",
        lines: [
          { type: "beat", text: "These 7 shots are the crave engine of the commercial. Shoot with food stylist — separate from the dialogue portion. These need to be beautiful." },
          { type: "body", text: "SHOT 1 — Box Hero: GSPFood box centred on clean counter. Soft key light. All five flavours visible if possible." },
          { type: "body", text: "SHOT 2 — Oven Slide: Tray slides into oven. Oven light glows orange through the glass. Low angle through the door." },
          { type: "body", text: "SHOT 3 — Cheese Bubble: Extreme close-up of cheese bubbling and browning. Macro lens if available." },
          { type: "body", text: "SHOT 4 — Pepperoni Crisp: Close-up of pepperoni edges crisping. The curl. The oil. Catch light on each piece." },
          { type: "body", text: "SHOT 5 — Basil Drop: Fresh basil leaf falling onto Margherita in slow motion. 60fps or 120fps. Clean white or dark background." },
          { type: "body", text: "SHOT 6 — Slice Pull: Full pinsa on board. Pull one slice — cheese stretch held as long as possible. Side angle. Shoot multiple takes." },
          { type: "body", text: "SHOT 7 — Crust Interior: Tear or cut the crust in half. Camera catches the airy honeycomb inside. Hold. This is the product differentiator — give it 2 full seconds." },
        ]
      },
      {
        label: "🎬 Standalone Clips From This Shoot",
        lines: [
          { type: "body", text: "CLIP 1 — The Correction: Just Mark / GSP / Giuseppe exchange. 8s. The most shareable moment — works with zero context." },
          { type: "body", text: "CLIP 2 — Giuseppe Steps In: Just Giuseppe's delivery of 'Oh no. It's a pinsa.' isolated. 3–4s. Meme-ready." },
          { type: "body", text: "CLIP 3 — The Crunch: Mark's reaction to the first bite. 'That crunch is real.' 5s. Works as a standalone testimonial." },
          { type: "body", text: "CLIP 4 — Flavour Lineup: All five on the counter. GSP gestures across them. No dialogue — just the visual. 5s." },
          { type: "body", text: "CLIP 5 — Food Reel Only: The 7-shot montage cut to music. No dialogue. 15s. Pure food content for the feed." },
        ]
      }
    ]
  },
  {
    id: "QH01", series: "quickhits", number: "01",
    title: "Pick Your Fighter", topic: "Quick Hit — Multi-Flavour Hold",
    hook: "Pick your fighter.",
    viralangle: "Holding all five flavours like a card hand is instantly shareable — people tag friends. 'Pick your fighter' is a meme-native format that drives comments. Works as a standalone clip or as a series opener.",
    direction: "GSP holds all five flavour boxes fanned out like playing cards. Direct to lens. Deadpan energy. No explanation needed — the image does the work. Cut fast.",
    versions: [
      {
        label: "5–10s — TikTok / Reels",
        lines: [
          { type: "hook", text: "Pick your fighter." },
          { type: "beat", text: "[GSP fans out all five GSPFood flavour boxes toward the camera. Holds. Stares.]" },
          { type: "tag", text: "Five flavours. One choice. GSPFood Pinsa." },
        ]
      }
    ]
  },
  {
    id: "QH02", series: "quickhits", number: "02",
    title: "Post-Workout Casual Bite", topic: "Quick Hit — Real Life Eating",
    hook: "Post-workout. This is what I'm eating.",
    viralangle: "The 'real life' format outperforms polished content on TikTok. GSP eating casually after training — no glam, no setup — is more credible than any produced food shot. Authenticity is the strategy.",
    direction: "iPhone. Kitchen or gym-adjacent. GSP in workout clothes or just changed. He pulls the pinsa out, stands at the counter, takes a bite. No table. No plating. Just eating. This should feel like he forgot the camera was on.",
    versions: [
      {
        label: "15s — TikTok / iPhone Series",
        lines: [
          { type: "hook", text: "Post-workout. This is what I'm eating." },
          { type: "beat", text: "[GSP pulls a slice off a whole pinsa on the counter. Stands. Takes a casual bite.]" },
          { type: "body", text: "Forty grams of protein. No bloat. Ready in minutes." },
          { type: "beat", text: "[Chews. Nods. Looks at camera.]" },
          { type: "tag", text: "GSPFood. It's not a pizza. It's a Pinsa." },
        ]
      }
    ]
  },
  {
    id: "QH03", series: "quickhits", number: "03",
    title: "First Bite Hero Reaction", topic: "Quick Hit — First Bite Pause + Crunch",
    hook: "[No words needed — the bite says it all.]",
    viralangle: "The pause after the first bite is the whole video. That 2-second silence where GSP just looks at the camera — that's what gets shared. Audio design is critical here: the crunch needs to be crisp and clear.",
    direction: "Tight shot — just above the jaw to the eyes. GSP takes the first bite, slow. Crust crunch is loud and clean. He pauses. Looks directly at the lens. No words. Hold for 2 full seconds. Cut to black. Do multiple takes — you want the most natural pause, not performed.",
    versions: [
      {
        label: "8–12s — All Platforms",
        lines: [
          { type: "beat", text: "[Tight shot. GSP lifts the slice. Takes one clean bite — CRUNCH.]" },
          { type: "beat", text: "[He stops. Chews slowly. Stares directly into the lens. Two full seconds of silence.]" },
          { type: "beat", text: "[Hard cut to black.]" },
          { type: "tag", text: "GSPFood. It's not a pizza. It's a Pinsa." },
        ]
      }
    ]
  },
  {
    id: "QH04", series: "quickhits", number: "04",
    title: "Side-Angle Crunch", topic: "Quick Hit — Audio-Focused",
    hook: "[The crunch is the hook.]",
    viralangle: "ASMR-adjacent content performs extremely well with food. The side profile crunch — clean audio, no music — rewards headphones. Pin the audio as the CTA: 'Turn the volume up.' Gets saved and rewatched.",
    direction: "Side profile. Camera low and close to jaw level — you want to see and hear the crust shatter. Quiet room, no music. Let the crunch breathe. GSP doesn't look at the camera — he just eats. Minimal text overlay.",
    versions: [
      {
        label: "8–12s — TikTok / Reels (Audio Focus)",
        lines: [
          { type: "beat", text: "[Side angle, jaw level. Quiet room. GSP lifts a slice to his mouth.]" },
          { type: "beat", text: "[CRUNCH — clean, loud, satisfying. He chews. The crust is clearly airy inside.]" },
          { type: "beat", text: "[No words. No music.]" },
          { type: "tag", text: "🔊 Turn it up. GSPFood Pinsa." },
        ]
      }
    ]
  },
  {
    id: "QH05", series: "quickhits", number: "05",
    title: "Silent Approval", topic: "Quick Hit — Bite + Look + Nod",
    hook: "[No words needed.]",
    viralangle: "The nod is more convincing than any line of copy. GSP's reputation does the work — one slow, deliberate nod from him after a bite is a five-star review. Caption only: 'GSP Approved.'",
    direction: "Clean studio or kitchen. Medium shot — chest up. GSP bites, chews, looks at the lens, gives one slow nod. That's the whole video. Don't let him smile — the approval should feel earned, not performed. Three takes minimum.",
    versions: [
      {
        label: "6–10s — All Platforms",
        lines: [
          { type: "beat", text: "[GSP takes a bite. Chews. Looks at the camera.]" },
          { type: "beat", text: "[One slow, deliberate nod.]" },
          { type: "beat", text: "[Cut.]" },
          { type: "tag", text: "GSP Approved. GSPFood Pinsa." },
        ]
      }
    ]
  },
  {
    id: "QH06", series: "quickhits", number: "06",
    title: "Second Bite — I'm Going Back In", topic: "Quick Hit — Going Back for More",
    hook: "…I'm going back in.",
    viralangle: "'Going back for a second bite' signals genuine enjoyment — it's more credible than any claim. The pause before he goes in again is the tension. This format has been used in countless viral food reviews because it works every time.",
    direction: "Continuous shot. GSP takes a bite, pauses like he's done, then looks at the remaining slice and goes back in for a second bite. The 'decision' to go back is the video. Natural — don't choreograph it too tightly. If the first bite is good enough, the second happens naturally.",
    versions: [
      {
        label: "10–15s — All Platforms",
        lines: [
          { type: "beat", text: "[GSP takes a bite. Chews. Sets the slice down like he's done.]" },
          { type: "beat", text: "[Pause. He glances at the slice.]" },
          { type: "body", text: "…I'm going back in." },
          { type: "beat", text: "[Picks it up. Takes a second bite. Bigger this time.]" },
          { type: "tag", text: "GSPFood Pinsa. You'll go back in too." },
        ]
      }
    ]
  },
  {
    id: "QH07", series: "quickhits", number: "07",
    title: "Explain While Chewing", topic: "Quick Hit — One Sentence Max",
    hook: "[Mid-chew] Forty grams of protein.",
    viralangle: "Talking while chewing breaks the polished ad convention — it feels real. One clean claim, delivered mid-bite, lands harder than a produced voiceover. The rule is strict: one sentence max, no exceptions.",
    direction: "Loose, casual — kitchen counter or wherever feels natural. GSP mid-chew, looks at camera, says the line. That's it. Don't stop chewing. Don't swallow first. The messiness is the point. Caption can add the claim as text overlay.",
    versions: [
      {
        label: "5–8s — TikTok / Reels",
        lines: [
          { type: "beat", text: "[GSP mid-chew. Looks at camera. Doesn't stop chewing.]" },
          { type: "hook", text: "Forty grams of protein." },
          { type: "beat", text: "[Keeps chewing. Looks back at the slice. Cut.]" },
          { type: "tag", text: "GSPFood Pinsa." },
        ]
      }
    ]
  },
  {
    id: "QH08", series: "quickhits", number: "08",
    title: "Flavour Ranking", topic: "Quick Hit — Top 2 Today",
    hook: "Today's top two. Don't @ me.",
    viralangle: "Rankings are the highest-engagement format on TikTok — everyone disagrees and has to comment. 'Don't @ me' invites the pile-on. This drives comments, saves, and shares simultaneously. The flavour order changes shoot to shoot to keep it fresh.",
    direction: "GSP holds two boxes — his picks for today. Direct to lens. He can change the ranking next time — this should feel like a live opinion, not a permanent statement. Shoot a version for multiple ranking combos if time allows.",
    versions: [
      {
        label: "10–15s — TikTok / Reels",
        lines: [
          { type: "hook", text: "Today's top two. Don't @ me." },
          { type: "beat", text: "[GSP holds up two GSPFood flavour boxes — one in each hand.]" },
          { type: "body", text: "Number one: [FLAVOUR]. Number two: [FLAVOUR]." },
          { type: "beat", text: "[Looks at camera. Shrugs slightly.]" },
          { type: "body", text: "The other three are still good. These are just better." },
          { type: "tag", text: "GSPFood Pinsa. What's your ranking?" },
        ]
      }
    ]
  },
  {
    id: "QH09", series: "quickhits", number: "09",
    title: "Texture Breakdown", topic: "Quick Hit — Airy Inside / Crisp Outside",
    hook: "This is what makes it different.",
    viralangle: "The texture story is the product education play disguised as food content. 'Airy inside, crisp outside' is the key differentiator from regular frozen pizza. Tearing the crust open on camera is the proof point — it's visual, shareable, and builds genuine curiosity.",
    direction: "Pull a full pinsa on a board. GSP tears a piece open — you want to see the honeycomb interior. Hold for 2 seconds. Then the crunch from the outside. The visual contrast between the airy inside and the crisp crust is the story — let the camera see both. This is the content that gets saved.",
    versions: [
      {
        label: "15–20s — All Platforms",
        lines: [
          { type: "hook", text: "This is what makes it different from every other frozen pizza." },
          { type: "beat", text: "[GSP tears a piece of pinsa open. Camera catches the airy, honeycomb interior.]" },
          { type: "body", text: "Airy inside. Crisp outside." },
          { type: "beat", text: "[He bites the edge — audible crunch.]" },
          { type: "body", text: "That's the seventy-two-hour fermentation. You can't fake that." },
          { type: "tag", text: "GSPFood. It's not a pizza. It's a Pinsa." },
        ]
      }
    ]
  },
  {
    id: "QH10", series: "quickhits", number: "10",
    title: "Pizza Night Win", topic: "Quick Hit — Family-Friendly",
    hook: "Pizza night just got a lot better.",
    viralangle: "'Pizza night win' is the family content hook — parents share this because it solves a real problem they have. GSP as a dad of five makes this completely authentic. No performance required — this is just true.",
    direction: "Warm, approachable energy — this is the one Quick Hit that should feel family-friendly and inviting rather than elite or performance-focused. Kitchen setting preferred. GSP can smile here. Hold the box toward the camera — this is a recommendation, not a reveal.",
    versions: [
      {
        label: "15–20s — All Platforms",
        lines: [
          { type: "hook", text: "Pizza night just got a lot better." },
          { type: "beat", text: "[GSP holds up the GSPFood box — warm, relaxed energy.]" },
          { type: "body", text: "I've got five kids. Pizza night is real in our house. But I'm not serving them something heavy with no nutritional value." },
          { type: "body", text: "Forty grams of protein. No bloat. Ready fast. And they actually love it." },
          { type: "close", text: "Pizza night doesn't have to be a cheat. This is Pinsa Night." },
          { type: "tag", text: "GSPFood. It's not a pizza. It's a Pinsa." },
        ]
      }
    ]
  },
  {
    id: "PN01", series: "other", number: "01",
    title: "Pinsa Night — Option A", topic: "Pinsa Night Series — Ep. 1",
    hook: "Pizza night doesn't have to be unhealthy. We're doing Pinsa Night.",
    viralangle: "Renaming 'pizza night' to 'pinsa night' is a cultural play — if it catches on, every post that uses the phrase is free advertising. This is the seed video. Keep it warm, real, and family-first. The product is almost secondary — the ritual is the story.",
    direction: "Kitchen. Evening light if possible — warm, golden hour tone. GSP at the counter, family energy in the background (or implied). This isn't a performance, it's a routine. He should feel like he's showing you his actual Friday night. iPhone or cinema — either works, but keep it warm.",
    versions: [
      {
        label: "30–45s — Instagram / Facebook",
        lines: [
          { type: "beat", text: "[Kitchen. Evening. GSP at the counter with a GSPFood box. Comfortable, warm energy.]" },
          { type: "hook", text: "Pizza night doesn't have to be unhealthy. We're doing Pinsa Night." },
          { type: "beat", text: "[He opens the box. Slides the pinsa onto a board.]" },
          { type: "body", text: "Five kids. Friday night. Everybody wants pizza." },
          { type: "body", text: "I get it. I was the same growing up. But I'm not putting something heavy and processed in front of my kids and calling it dinner." },
          { type: "body", text: "So we changed the tradition." },
          { type: "beat", text: "[He holds up a finished, golden pinsa. Steam rising.]" },
          { type: "body", text: "Forty grams of protein. Light. No bloat. Ready in minutes. And it actually tastes better." },
          { type: "close", text: "Pinsa Night. Try it this Friday." },
          { type: "tag", text: "GSPFood. It's not a pizza. It's a Pinsa." },
        ]
      },
      {
        label: "15–20s — TikTok / Reels",
        lines: [
          { type: "hook", text: "Pizza night doesn't have to be unhealthy." },
          { type: "body", text: "Five kids. Friday night. We do Pinsa Night now." },
          { type: "beat", text: "[GSP holds up a finished golden pinsa — steam, cheese, perfect crust.]" },
          { type: "body", text: "Forty grams of protein. No bloat. Ready fast. Kids love it." },
          { type: "tag", text: "GSPFood. It's not a pizza. It's a Pinsa." },
        ]
      }
    ]
  },
  {
    id: "FS07", series: "founders", number: "07",
    title: "GSP Certified", topic: "Testimonial + Brand Authority",
    hook: "I don't just endorse any product. My reputation means everything to me.",
    viralangle: "'GSP Certified' as a closing line is a brand stamp — quotable, ownable, shareable. The Italian friends origin story builds authenticity. The 'light, no bloat' section is the most relatable moment for parents.",
    direction: "GSP seated at a table. Hot Pinsa in front of him — fully plated, steam if possible. The pace is slow, deliberate. This isn't a pitch. He's having a conversation. Let him pick up the slice naturally — don't cue it. The final line 'GSP Certified' lands harder if he holds the slice up like a champion holds a belt. Direct to lens, no smile — pure conviction on the close.",
    versions: [
      {
        label: "Full Version — 60–90s",
        lines: [
          { type: "beat", text: "[INT. RESTAURANT TABLE. GSP seated. A hot, fully loaded Pinsa on the table in front of him. He picks up a slice.]" },
          { type: "hook", text: "I don't just endorse any product. My reputation means everything to me." },
          { type: "beat", text: "[He gestures to the Pinsa.]" },
          { type: "body", text: "When my Italian friends first introduced me to this… I had to learn more. What is it? Where does it come from? What's actually in it?" },
          { type: "body", text: "And the more I found out, the more I knew — I wanted to be part of this. Not just because it tastes better than most frozen pizzas. It really does. But because it's different." },
          { type: "beat", text: "[He leans forward.]" },
          { type: "body", text: "It's light. No heavy feeling after. No bloat. You can eat it and still move." },
          { type: "body", text: "For busy parents — always looking for something fast, something real, something you can put in front of your kids before a game and not feel guilty about — this is it. Forty grams of protein. Especially if you're like me, with five active kids." },
          { type: "beat", text: "[He sets the slice down. Points to the box.]" },
          { type: "body", text: "Lentils and fava beans. No soy. Fermented for seventy-two hours. That process — that's what makes it different. That's what makes it light." },
          { type: "beat", text: "[He picks the slice back up.]" },
          { type: "body", text: "And the best part? It's ready fast. When life gets busy, eating well can be a challenge. This takes that challenge away." },
          { type: "beat", text: "[He takes a bite. Nods slowly. Looks at camera.]" },
          { type: "close", text: "If you want something that tastes great and fits an active lifestyle — check out Pinsa online, or find it at your nearest Sobeys." },
          { type: "beat", text: "[Small pause. He holds up the slice.]" },
          { type: "tag", text: "I'm Georges St-Pierre… and this Pinsa is GSP Certified." },
        ]
      },
      {
        label: "30–45s — Instagram / Facebook",
        lines: [
          { type: "hook", text: "I don't just endorse any product. My reputation means everything to me." },
          { type: "body", text: "When my Italian friends introduced me to this, I had to know more. And after trying it — I wanted to be part of it. Not just because it tastes better than most frozen pizzas. Because it's different." },
          { type: "body", text: "It's light. No bloat. Forty grams of protein. Lentils and fava beans, no soy, fermented seventy-two hours. Fast to prepare — and that matters when life gets busy." },
          { type: "body", text: "Find it at Sobeys, or online." },
          { type: "beat", text: "[Holds up slice.]" },
          { type: "tag", text: "I'm Georges St-Pierre. And this Pinsa is GSP Certified." },
        ]
      },
      {
        label: "15–20s — TikTok / Reels",
        lines: [
          { type: "hook", text: "I don't just put my name on anything." },
          { type: "body", text: "This is light, no bloat, forty grams of protein — lentils, fava beans, no soy, fermented seventy-two hours. Fast to prepare. Actually tastes great." },
          { type: "body", text: "Find it at Sobeys." },
          { type: "tag", text: "I'm Georges St-Pierre. GSP Certified." },
        ]
      }
    ]
  },
];

const REF_IMAGES = {
  conor: "data:image/jpeg;base64,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",
  beckham_dark: "data:image/jpeg;base64,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",
  beckham_outdoor: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCABLAHgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDo9T0KOPWoV1dUsodXmLnS1unW2jVSC7yOpA8w54x8ucDB6101voMdzpajStevoUltyirFe/ao/wC7/GDwP9kg9a57xkbfxP8AY4rrWIIxDE0oS2gZxlmCkFs57p24yT2rldAuE8M6itxaXQQyIs01lLKzKIuSUYhDuboRgDGa43VipAafxPvLptM07w/eMsl8bhZYJYJz5M6AFTuDklWBI4JI689q5PWdDutB16HTZJA5nhVxtOcxs3AI7E7RkCt+9sU+ISaprE11Itwm2HTdOgA3FQDjIPRSTyR3z7VipZXqXhhvHmfUopoLaJpZMyRY38c9BnH0xROaZpS+I6vxR4K0nTfB0s1qdWiujA175c2TGCSoIcDhWwcepx7Vwfh3Vb3TbCUWc1mgRkvGM+3LlAV2DPU/OTtHP5V6nLqMHiP4ba7qEqbdYhsjZ3p3H7yHOQM4weucetcze+GdAtNL8N3MtpMYJrES3nkzfvHdwu3g5+XKvnA4zTkrK6JvocnNPpt1dJNeWNraRpbhBbabGENwQRjexPHC9ev86lvpdKv7wvY2cOmWzxhBbAsSCCQWLH68+lWToFjqesT3FncTwWrzMYoVi4WMH5cZ5HHrXUN4N0g6bHNBcTGeI5YM4YgHjkDtWblF6XOiNF8ikY2oDUrr4XC8ktoYrYXixiS3j2eeFUqHdQMcEYDcEnr2rlorFo4INQEo+xykKzkHckndOP4scj1H5V3OpOZfAj6RbWOrWk9sAZ1SApatuYcuSTnOCwPH6154Z47ezutOZbiWeSZfK2nES8YYgZ5c8KCegzQ43djjZu+FYI7jXYtGkuYzpt5IvneY21cqcg4J+8OmDnrXr3iHwJor+G7pdEtYbS4t5DOGtUDM7KpzG2T0Ppkc84zXhkWtX9hZ3FwZQp1BQFjRNyRhCOpIzvUqvGeOCc8VUs9UnhtZr621G8iv3ZleKN3HnsT1Yg8jGSe5NXFct09QUtQt7Oe71ee5tVmliRSzgKSVycYPoMmtnT7SCK+EexJZXYgAcrH9Kt3urJe6bHeWAnsftMXkXatISrlSOFbPIOc4PIqODNnape2RjuQ0ggkaJslG44/EHHFQnzO5NRSlLlidLpE+j6LqMU+uuHj/AIYAoJIPSRkx9wYOPU9qKyrcJcXV0gi8yedGtbbzTlDsUbixwSORgY5yKKtc/wBkajy6WOds9RmnjeV7vzTFtaUuWDYOF456fdH41ZOpqs032dkjeJMbw21zwF7nnrnFYkF+kLyicBYpEIYsSCxwBlcd/Y8cdapuAbhJ/JzHgEdsjIOD71n7Nbmi7HV6Trc9jd28tjczxvbspVQuGIH3hweVPI9SKtjVrYeIZr8xAXIvUuFcMCFU72K88feI68cVxdtfqs+0RlhNIODztHJIH51q2rRT3N0gTLIhbfznAXgen9aOTlTLpJpnrnjqG9sra71/T7STyNRtDa6nC5HTACSkL35xke3Y1ydnF4ivdGbUH8l9MsYEjw0R/dqpXCoeCWwzEt049a5W68S6s+lrpt0xgtE2AIu5cbQABgnHRemMck4rQk8TalBot1p8F6FszEBJa5BDq20nGec5H5GnKXNvsKCum0LPqFst0XnjmSWGQlJoHbZIc9gOvToa7+21exj064vLWxW3t7xlfzGhCAtxuBHc9/pXj19qa28UEFm7rPgmTB+VWPYDv2/EUj6/fXmkw28pdbSNjI+1QOvDAAf/AK6PZ3Wh1UpcseSR6B4Q1vTNAe4vDqpOrXUEm63vgUt3k3qy/OMgDGevTNax8UaPpVxeXgsrW8kvdOaeVzEB58vmbAm3JUKADuAyTnPNeMX18Lq5QxMGQAbce9a+j3BS3aNThZFaNsYzgjGR71o00rmboqTfKylfXl5KqyMsotknkMa5Pkorc8Lng/z49K0/DWnRvb3F9Of9WHkRGYfMoGDweucn8qzreyv5by5tEQTbcAgkEY6A4OOuRWi9n/ZUNtBeWdzBNOP3IYHE8fYqB6kd+nWlJNxsjD4Gm0aMYjvNOj2QTSWwbzG2bQC4HOB17dql01IbWEwaaqxkhZcAksD2yCcg8GufS6vzAVdhHlQ8eML8h6Bf8aXTLmezuJWR8owCnccgj1/n+dSny6E8rk7ydvQ7zRLm2k0e7aW9eK6hIQpa8OpzvTrwWLAnIPqD1NFedXzPBNMI5WSAyCQqqngkdz9DRWquxPTREV7pTCRSjyAmMSLviKB17EfXmnwyl2a2kcSE/Km1SFP9eP6VA1x5EuC7Mi8Ln1/+tVeaYG/3K4RSRhxx2/yPwqbNmlrrU0LKHdqVorvJIxLN5m4ZI/yKt6WiyXlx5afvWjlOQcZ4PftUGmQF9RDRyBgkDyb8ZxxS2RDyXkgO7Fk/IGMnBA/nUSd7lwW3zJSuo3dtcwm6+0Rht7hwpJYAfxde3bioNRvLqO0S3kjCRwDdv8rDF2Xdgt3wAOO3NZsFncNFIqH5tofapOMev8q2Ne8xbaSGf7uQV2txnGASPXApp+/Z6kxXu6I34/hheXlqk8MjGQ24k2CRSSWAIwPT159K5G/tr7QIbrSr6F4Lreo8uTBIUj7wPTB9RXS6J8Qo7YOb1LkyCMIRbttZ8EYwT0AHb+tdjfeIvAvijR4W1KWCWRAQqz5jniYjoMc4+mRTUprSa0OhpbxZ5Bp1uHvYVb7u4ZxVuwYwSGHP3JGBx1613N18N7KZhc+GdYEyMpIimbP5MOfzFc3B8PfEtgjs9vE4i+8scm5gPUDHP4VblF9QjdW0K812sGqGVUXbJb7HLqThc4Jx9BU9w0l2+6efz3PzIyOSAMY49Bg1TuJIY7yF7xNsQYJKoP3lyCw/EDFS2FxAuoyRQbWgZ2eNc58sbj8p/DFJI5cR8TaKOq3Uy3TSLHshcbYQpJCAk5TPfrnmrGk/ZLaJ2n3MWXkk8A+p9qs6rbQyxyRqQoOHQ+n+c1QBe1tGVrWQv2JGeKU1bSw6M4uN2W764aeG4gaPe64YIsmAPfA68fyoqjbyzW0v2qBhJMmcF1ymMYxg+xooje2hDkuhMljdX2fIs7i6AKKGWEnlvugkZG4kj5c5NTyeDvE0QIk8N6kicAPJbMP51dtbiWyvPLt5pFjdvmCsdvAABx+XPtXpGhHWbrSJo3Dyh7dgZncZRuzc5yOoI60KSsVBcyueUxW2oaNaTPc2lxaPIjhd8WC4C9OexpugtsvBbsAVuLd0x/wHnjt0rZ1vUZUlSwu1VjAiqFJ6sMMfqeQPoaZaX8Vmt9MFAknEc21BsARd52A84z0qbN3j3OmMbJS7GVpen39/K0tmjE2sKtOVfBWIYDdevB5A96k1yMPp8U5BWVm2sDx03VsQ3F/bQ2N1bXDxW06G0jUTM2I3HKMCMEce3rWxcfDrUjpMCS3dvPJbkylVViZO4GT3rSvCNKpFXT9DOjJzg9LHlsNjcXN8kNvE8sjA/LGMn8vxFVtwfIPH1r1pAtzpNxqWnWMJ1aK2aMB1OTgq2Rgj5vk4z3BB615ZH5krFwnmhiSQOvJzmqjNSWgOLT12L2l+Ir/S2UJKZI16Ddhl+h/oa9D0X4nRSSQx3qyggBWcpjjPfHB9OleeQ2YLl5YJF2jhX4BNXIkjDLuG9s52qOM9qznGMuhvDmXodR45li1bxDC2ixpcXElnuujhcE5OPbOCB+VcIiTWjo8ah3QFiNwJIGRgjseDxXpWjXGn6fps0t1FbHUhIESUplgGYYAwc4Aya2tY0bTk0t4orO2lAWOVrlYwZQQQTkj1xg9sHpXFPHwpzUJLyHLBVJPmWxwmt6Rd6foIvpWASRxAU2sGU43ZyRjpWTpzu5uJvJDx7MlgOU7CvUvHNze+IPDMdtYQTTGaSOYiOJn8rGflAAOcnj+lYei+Gbq00C+t7/S/311EjQFSvmZwSRjOVI5+X39q3pVPa0+buck17KXJ2PO74TwSywoHSKRVYL/EVOSD+VFb+t6LqPlWZTw7fwSQ2oSdxEzB2DHDYA9MD8KK6ldIzUrq9i/Lod9ZxNNO8H7vJAUsTjj29q9L8H3wXw1dSjHEBI5qrNZW8kEm+PdzjkmpLSzt4oXEcKqNvauN1DshRS2PL7/RLjXL25u3m+z5kz80ZcsMAZ46dKS0iUWd21w5jkW2cDevBwjAYPrknj6V6BdRRgORGmQD/CKwpraHy1cxgsfWtqdTZhKNk13OM0i8zNp8T3Uky78fZokLuvBA46HtXtmgeEQ9naf2pNcXLws0irJIVwWxw4BwcenSsXwHp9obm7uDbx+bCVEbbfu5znFenwKFwAMDFdE2ptSscivH3UeZeKtMOga9FqOnxyRpLKDKik4Y+o9z3/OuO8Q+AkSKbXNIkBswpmlhLcx85P1X0P4V6145AfSFDDIyDXMaFPJbaXO8TAFo5Q2QCCA64GD25P51yyqNS0OqlC8TxsyzRSGPziSeoatPT7W9vD/ottNc/wDXGIv/ACFdLouhaZd/EbUrC4s45bSCaQRwtkqoDEAYr23T7aCzCQ20SQxKo2pGNqj6AVrdPRBKo4HhjWVzpt3aT6jpt1ExXBHkuOAeO3ua7vSfE+iQIrMJI9vJZkYcY+nFdnrxP2qE5IPl9QfeqkcSSS5cZwPWuapG79DWFS6vbcoxeKtKlLzROVWP5kkdDgkjGASPSsWTxLpmr67pyxySSXDTKhdIwFK57cnuBniupuLaFVYCJcE8jHX61ha14K8OiF72LS44LofN5tu7Qtn1+QiiCV7tvT7jKpHm0NZrS3knktxA0kVyipMVnKlRzhs/nRXzzq2r6np+pXMdrqd7Gu7/AJ+HOfrk80VtGnUaupGb5Yu1j//Z",
  beckham_action: "data:image/jpeg;base64,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",
  rock_field: "data:image/jpeg;base64,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",
  rock_smile: "data:image/jpeg;base64,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",
  rock_pour: "data:image/jpeg;base64,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",
  rock_hold: "data:image/jpeg;base64,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",
  gordon_f1: "data:image/jpeg;base64,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",
  gordon_homechef: "data:image/jpeg;base64,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",
  gordon_kitchen: "data:image/jpeg;base64,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",
};

// ── POSE REFERENCE DATA ──────────────────────────────────────────────────────
const POSES = [
  { id:1, refImg:REF_IMAGES.conor, title:"The Ownership Lean", ref:"Conor / Proper Twelve", refDesc:"Leaning on bar, product beside him, direct to lens. Dark warm background.", gspVersion:"GSP leans on kitchen counter. Pinsa on the surface beside his hand. Looks directly to lens — no smile, pure ownership.", setting:"Dark Studio", energy:"Premium · Editorial", pinsa:"On surface beside GSP", hands:"One hand resting near pinsa", expression:"Direct. Serious. Owns the room.", lighting:"Single warm key from left. Deep shadow right.", pose:"lean", color:"#C9A24A" },
  { id:2, refImg:REF_IMAGES.beckham_dark, title:"The Seated Authority", ref:"Beckham / Haig Club", refDesc:"Seated at table, product foreground, moody blue light, confident off-axis look.", gspVersion:"GSP seated behind a table. Pinsa plated sharp in foreground. One hand rests near it. Looks slightly off-axis — confident, not performing.", setting:"Dark Studio / Restaurant", energy:"Luxury · Editorial", pinsa:"Sharp in foreground on table", hands:"One near pinsa, one raised slightly", expression:"Confident half-smile.", lighting:"Moody blue-toned ambient. Single key on face.", pose:"seated", color:"#7A8FC9" },
  { id:3, refImg:REF_IMAGES.beckham_outdoor, title:"The Casual Outdoor", ref:"Beckham / Haig Club Orange", refDesc:"Open shirt, natural outdoor setting, product raised casually, genuine smile.", gspVersion:"GSP in casual open shirt, outdoor or bright kitchen. Holds a pinsa slice up casually, mid-laugh. Off-duty founder energy.", setting:"Outdoor / Bright Kitchen", energy:"Lifestyle · Approachable", pinsa:"Slice held up casually one hand", hands:"One raising slice, other relaxed", expression:"Genuine relaxed smile.", lighting:"Natural daylight or warm window.", pose:"casual_raise", color:"#6BBF8E" },
  { id:4, refImg:REF_IMAGES.beckham_action, title:"The Craftsman Mid-Action", ref:"Beckham / Haig Club Orange", refDesc:"Leaning over product, mid-action, focused downward like a craftsman.", gspVersion:"GSP leaning over the pinsa on a prep surface, placing a topping or drizzling olive oil. Eyes down — focused. Rings visible.", setting:"Kitchen / Studio", energy:"Craft · Authentic", pinsa:"On prep surface, GSP working on it", hands:"Both hands active — placing topping", expression:"Focused. Looking at pinsa not camera.", lighting:"Warm overhead practical. Slight side fill.", pose:"lean_over", color:"#C9A24A" },
  { id:5, refImg:REF_IMAGES.rock_field, title:"The Origin Story", ref:"The Rock / Teremana Field", refDesc:"In the origin environment, surrounded by the product's story, arms crossed.", gspVersion:"GSP in a real bakery or production kitchen. Surrounded by the 72-hour fermentation story — dough, flour, the process. Arms crossed. Pride.", setting:"Bakery / Production Kitchen", energy:"Story · Authentic", pinsa:"Environment tells the story", hands:"Arms crossed or hands on hips", expression:"Pride. This is where it starts.", lighting:"Natural industrial. Warm tones.", pose:"arms_crossed_env", color:"#A27AC9" },
  { id:6, refImg:REF_IMAGES.rock_smile, title:"The Champion Raise", ref:"The Rock / Teremana", refDesc:"Product at chest height, big smile, both subject and product sharp.", gspVersion:"GSP holds full pinsa at chest with both hands, big genuine smile. White seamless. Most approachable and shareable shot in the library.", setting:"White Seamless Studio", energy:"Joyful · Shareable", pinsa:"Full pinsa held at chest, both hands", hands:"Both hands under pinsa lifting toward camera", expression:"Big genuine smile. Pride.", lighting:"Bright even white seamless.", pose:"chest_raise", color:"#C9A24A" },
  { id:7, refImg:REF_IMAGES.rock_pour, title:"The Casual Slice Pull", ref:"The Rock / Teremana", refDesc:"Casually pulling product, relaxed, candid energy — caught in the moment.", gspVersion:"GSP casually pulling a slice from the pinsa, relaxed and seated or leaning. Mid-action, not posed. Caught in the moment.", setting:"Kitchen / Casual Interior", energy:"Candid · Real", pinsa:"Being pulled — mid-slice pull", hands:"One hand pulling slice from whole", expression:"Casual. Maybe slight smile. Not performing.", lighting:"Warm practical. Natural feel.", pose:"slice_pull_casual", color:"#6BBF8E" },
  { id:8, refImg:REF_IMAGES.rock_hold, title:"The One-Hand Extension", ref:"The Rock / Teremana", refDesc:"Product extended toward camera in one hand, big energy, direct.", gspVersion:"GSP extends the full pinsa toward camera with one hand. Direct look to lens. Other arm relaxed. 'Here it is.' Energy.", setting:"Outdoor / Bright Studio", energy:"Bold · Direct", pinsa:"Extended toward camera, one hand", hands:"One arm fully extended toward lens", expression:"Confident. Direct. Slight smile.", lighting:"Natural bright or clean studio.", pose:"one_arm_extend", color:"#C97A7A" },
  { id:9, refImg:REF_IMAGES.gordon_f1, title:"The Paddock — In-Store", ref:"Gordon Ramsay / F1 Paddock", refDesc:"Presenting food to real people in real environment, candid reactions.", gspVersion:"GSP in Sobeys frozen aisle presenting pinsa to a shopper. Real reaction. He's in the moment — not posing. Day 2 shoot.", setting:"Sobeys Store — Day 2", energy:"Real · Social Proof", pinsa:"Held on tray, being presented", hands:"Presenting pinsa toward a shopper", expression:"Engaged. Natural. Mid-conversation.", lighting:"Store ambient. Natural.", pose:"presenting_to_person", color:"#7AC9A2" },
  { id:10, refImg:REF_IMAGES.gordon_homechef, title:"The Kitchen Lean-Forward", ref:"Gordon Ramsay / Home Chef", refDesc:"Leaning forward over product on surface, both arms framing it, direct to camera.", gspVersion:"GSP leans forward over pinsa on kitchen counter, both arms on either side. Looks up directly at lens. Product sharp in foreground.", setting:"Kitchen Studio", energy:"Authority · Direct", pinsa:"On counter in sharp foreground", hands:"Both arms resting on counter framing pinsa", expression:"Serious. Focused. Direct to lens.", lighting:"Clean kitchen. Even fill.", pose:"lean_forward_over", color:"#C9A24A" },
  { id:11, refImg:REF_IMAGES.gordon_kitchen, title:"The Final Hero — Arms Crossed", ref:"Gordon Ramsay / Flora", refDesc:"Arms crossed, standing behind product spread, direct to camera. Zero compromise.", gspVersion:"GSP stands directly behind the plated pinsa. Arms crossed. Direct to camera. 'I made this. It meets my standard.' Closing shot for every flavour.", setting:"Dark or Kitchen Studio", energy:"Authority · Conviction", pinsa:"Plated in sharp foreground", hands:"Arms crossed at chest", expression:"Direct. No smile. Pure conviction.", lighting:"Even warm studio. Slight vignette.", pose:"arms_crossed_behind", color:"#7A0F12" },
  { id:12, title:"The Box Hold", ref:"Original brief — E-commerce", refDesc:"Both hands holding product box, label to camera, white seamless.", gspVersion:"GSP holds GSPFood box with both hands, label facing camera. Direct look. White seamless. The pure e-commerce and retail shot.", setting:"White Seamless Studio", energy:"Commercial · Clean", pinsa:"The box IS the product", hands:"Both hands holding box forward", expression:"Direct. Confident.", lighting:"Full white seamless. Even bright.", pose:"box_hold", color:"#888" },
  { id:13, title:"The Box + Pinsa Dual Hold", ref:"Original brief — Brand integration", refDesc:"Box in one hand, finished pinsa in other, both raised at chest.", gspVersion:"GSP holds GSPFood box left hand, finished cooked pinsa right. Both raised at chest. Before/after story in one frame.", setting:"White or Dark Studio", energy:"Brand · Story", pinsa:"Held in one hand, box in other", hands:"Both raised — box left, pinsa right", expression:"Proud. The transformation.", lighting:"White seamless or dark BG option.", pose:"dual_hold", color:"#C9A24A" },
  { id:14, title:"The First Bite", ref:"Universal — every food campaign", refDesc:"Mid-bite, real unscripted reaction, eye level, tight crop. 60fps.", gspVersion:"GSP takes the first bite. Eye level, tight crop. No direction. Just roll and capture. 60fps.", setting:"Kitchen / Studio", energy:"Authentic · Reaction", pinsa:"At mouth level — mid-bite", hands:"Both hands holding slice to mouth", expression:"Real. Unscripted. Whatever happens.", lighting:"Warm fill. Natural.", pose:"first_bite", color:"#6BBF8E" },
  { id:15, title:"The Oven Pull", ref:"Original brief — Steam hero", refDesc:"Pulling tray from oven, arms extended, steam rising, face visible above.", gspVersion:"GSP pulls pinsa from oven. Arms extended, steam rising above tray, face visible above. Low angle catches the steam. Shoot immediately.", setting:"Kitchen", energy:"Action · Drama", pinsa:"On tray, just out of oven, steaming", hands:"Both hands holding tray handles", expression:"Satisfied anticipation. Eyes on pinsa.", lighting:"Oven glow + backlight for steam.", pose:"oven_pull", color:"#C97A7A" },
  { id:16, title:"The Athletic Wear Hold", ref:"Performance narrative", refDesc:"Athletic wear, product held casually, post-workout recovery meal energy.", gspVersion:"GSP in athletic training kit. Holds pinsa casually in one hand. Post-training meal narrative. Protein story.", setting:"Clean Studio / Gym Adjacent", energy:"Performance · Health", pinsa:"Held casually in one hand", hands:"One hand holding pinsa, other on hip", expression:"Relaxed post-workout. Real.", lighting:"Clean studio or practical.", pose:"athletic_hold", color:"#7A8FC9" },
  { id:17, title:"The Side Profile", ref:"Lifestyle — off duty", refDesc:"Side profile, standing at counter, eating casually, natural window light.", gspVersion:"GSP side-on at kitchen counter eating a slice. Casual clothes. Real kitchen. The most human off-duty shot.", setting:"Real Kitchen", energy:"Human · Lifestyle", pinsa:"Slice being eaten, side profile", hands:"Holding slice at mouth, side view", expression:"Relaxed. Private moment.", lighting:"Natural window light from front.", pose:"side_profile_eat", color:"#6BBF8E" },
  { id:18, title:"The Low Angle Dramatic", ref:"Unexpected angle", refDesc:"Camera low looking up, product extended toward lens overhead — commanding.", gspVersion:"Camera positioned low. GSP holds pinsa above and extends toward lens. Face visible above. Commanding, unexpected, premium.", setting:"Dark or White Studio", energy:"Dramatic · Unexpected", pinsa:"Extended above, toward low camera", hands:"Both hands holding pinsa forward toward lens", expression:"Commanding. Powerful.", lighting:"Single overhead key + low fill.", pose:"low_angle_extend", color:"#A27AC9" },
  { id:19, title:"The Before / After Split", ref:"Conversion content", refDesc:"Same pose twice: frozen box left, cooked pinsa right. The transformation.", gspVersion:"Same GSP pose twice — LEFT: frozen box. RIGHT: cooked plated pinsa. Same framing. The transformation story. Key conversion content.", setting:"White Seamless Studio", energy:"Conversion · Story", pinsa:"Box left / cooked pinsa right", hands:"Same confident hold both sides", expression:"Same expression both frames.", lighting:"Even consistent both sides.", pose:"split_before_after", color:"#7AC9A2" },
  { id:20, title:"The Dark Premium", ref:"Conor energy + Beckham tone", refDesc:"Dark seamless, single hard key, half-face lit, product forward. Most premium shot.", gspVersion:"Pure dark seamless. Single key from 45° — half his face and the pinsa lit, other half deep shadow. Most premium shot in the library.", setting:"Dark Seamless Studio", energy:"Premium · Luxury", pinsa:"Held at chest, in the light", hands:"Both hands holding pinsa at chest", expression:"Serious. Half-lit. Cinematic.", lighting:"Single hard key 45°. No fill. Deep shadow.", pose:"dark_premium", color:"#C9A24A" },
];

function PoseSVG({ pose, color: c = "#C9A24A" }) {
  const body="#2a2a2a", skin="#8B6F5E";
  const figs = {
    lean: <svg viewBox="0 0 160 180" fill="none"><rect x="0" y="132" width="160" height="7" rx="2" fill="#333"/><ellipse cx="112" cy="130" rx="26" ry="9" fill={c} opacity="0.7"/><rect x="52" y="68" width="34" height="62" rx="8" fill={body}/><circle cx="69" cy="50" r="20" fill={skin}/><rect x="30" y="104" width="42" height="9" rx="4" fill={skin}/><circle cx="62" cy="48" r="2.5" fill="#111"/><circle cx="76" cy="48" r="2.5" fill="#111"/></svg>,
    seated: <svg viewBox="0 0 160 180" fill="none"><rect x="10" y="118" width="140" height="7" rx="2" fill="#333"/><ellipse cx="80" cy="116" rx="34" ry="11" fill={c} opacity="0.8"/><rect x="50" y="65" width="34" height="52" rx="8" fill={body}/><circle cx="67" cy="47" r="20" fill={skin}/><rect x="28" y="108" width="44" height="9" rx="4" fill={skin}/><circle cx="60" cy="45" r="2.5" fill="#111"/><circle cx="74" cy="45" r="2.5" fill="#111"/></svg>,
    casual_raise: <svg viewBox="0 0 160 180" fill="none"><rect x="50" y="78" width="34" height="78" rx="8" fill={body}/><circle cx="67" cy="56" r="20" fill={skin}/><rect x="86" y="52" width="9" height="42" rx="4" fill={skin} transform="rotate(30 90 52)"/><polygon points="106,36 128,48 116,66" fill={c} opacity="0.8"/><rect x="30" y="88" width="22" height="9" rx="4" fill={skin}/><path d="M60 62 Q67 69 74 62" stroke="#111" strokeWidth="2" fill="none"/><circle cx="60" cy="52" r="2.5" fill="#111"/><circle cx="74" cy="52" r="2.5" fill="#111"/></svg>,
    lean_over: <svg viewBox="0 0 160 180" fill="none"><rect x="0" y="125" width="160" height="7" rx="2" fill="#333"/><ellipse cx="80" cy="123" rx="38" ry="12" fill={c} opacity="0.8"/><rect x="46" y="62" width="34" height="62" rx="8" fill={body} transform="rotate(-10 63 93)"/><circle cx="63" cy="45" r="20" fill={skin}/><rect x="18" y="115" width="50" height="9" rx="4" fill={skin}/><rect x="92" y="115" width="50" height="9" rx="4" fill={skin}/><circle cx="55" cy="48" r="2.5" fill="#111"/><circle cx="71" cy="48" r="2.5" fill="#111"/></svg>,
    arms_crossed_env: <svg viewBox="0 0 160 180" fill="none"><rect x="0" y="0" width="160" height="155" fill="#111"/><rect x="8" y="18" width="28" height="118" rx="3" fill="#1a1a1a"/><rect x="124" y="28" width="28" height="108" rx="3" fill="#1a1a1a"/><rect x="50" y="72" width="36" height="82" rx="8" fill={body}/><rect x="28" y="96" width="52" height="9" rx="4" fill={skin} transform="rotate(-14 54 100)"/><rect x="72" y="96" width="52" height="9" rx="4" fill={skin} transform="rotate(14 98 100)"/><circle cx="68" cy="52" r="20" fill={skin}/><circle cx="60" cy="50" r="2.5" fill="#111"/><circle cx="76" cy="50" r="2.5" fill="#111"/></svg>,
    chest_raise: <svg viewBox="0 0 160 180" fill="none"><rect x="46" y="78" width="42" height="82" rx="8" fill={body}/><ellipse cx="67" cy="86" rx="38" ry="13" fill={c} opacity="0.9"/><rect x="18" y="86" width="34" height="9" rx="4" fill={skin}/><rect x="86" y="86" width="34" height="9" rx="4" fill={skin}/><circle cx="67" cy="56" r="20" fill={skin}/><path d="M58 63 Q67 72 76 63" stroke="#111" strokeWidth="2.5" fill="none"/><circle cx="59" cy="53" r="3" fill="#111"/><circle cx="75" cy="53" r="3" fill="#111"/></svg>,
    slice_pull_casual: <svg viewBox="0 0 160 180" fill="none"><rect x="48" y="76" width="34" height="80" rx="8" fill={body}/><ellipse cx="72" cy="112" rx="33" ry="11" fill={c} opacity="0.5"/><polygon points="72,98 108,106 100,118 64,110" fill={c} opacity="0.9"/><rect x="86" y="98" width="38" height="9" rx="4" fill={skin} transform="rotate(20 105 103)"/><circle cx="65" cy="54" r="20" fill={skin}/><path d="M57 61 Q65 67 73 61" stroke="#111" strokeWidth="1.5" fill="none"/><circle cx="57" cy="52" r="2.5" fill="#111"/><circle cx="73" cy="52" r="2.5" fill="#111"/></svg>,
    one_arm_extend: <svg viewBox="0 0 160 180" fill="none"><rect x="53" y="76" width="34" height="80" rx="8" fill={body}/><rect x="86" y="76" width="54" height="11" rx="5" fill={skin}/><ellipse cx="148" cy="80" rx="14" ry="20" fill={c} opacity="0.9" transform="rotate(90 148 80)"/><rect x="20" y="93" width="34" height="9" rx="4" fill={body}/><circle cx="70" cy="54" r="20" fill={skin}/><circle cx="62" cy="52" r="2.5" fill="#111"/><circle cx="78" cy="52" r="2.5" fill="#111"/><polygon points="6,78 18,72 18,84" fill={c} opacity="0.7"/></svg>,
    presenting_to_person: <svg viewBox="0 0 160 180" fill="none"><rect x="124" y="38" width="28" height="128" rx="2" fill="#1a1a1a"/><rect x="127" y="58" width="22" height="7" rx="2" fill="#333"/><rect x="127" y="78" width="22" height="7" rx="2" fill="#333"/><rect x="43" y="73" width="34" height="83" rx="8" fill={body}/><rect x="4" y="83" width="26" height="73" rx="8" fill="#1e1e1e"/><circle cx="17" cy="66" r="16" fill="#6B5A52"/><rect x="28" y="106" width="54" height="5" rx="2" fill="#444"/><ellipse cx="55" cy="104" rx="22" ry="7" fill={c} opacity="0.8"/><rect x="48" y="103" width="38" height="9" rx="4" fill={skin}/><circle cx="60" cy="51" r="20" fill={skin}/><circle cx="52" cy="49" r="2.5" fill="#111"/><circle cx="68" cy="49" r="2.5" fill="#111"/></svg>,
    lean_forward_over: <svg viewBox="0 0 160 180" fill="none"><rect x="0" y="130" width="160" height="7" rx="2" fill="#333"/><ellipse cx="80" cy="128" rx="42" ry="14" fill={c} opacity="0.9"/><rect x="48" y="68" width="36" height="62" rx="8" fill={body} transform="rotate(-8 66 99)"/><circle cx="62" cy="48" r="20" fill={skin}/><rect x="4" y="124" width="50" height="9" rx="4" fill={skin}/><rect x="106" y="124" width="50" height="9" rx="4" fill={skin}/><circle cx="54" cy="46" r="2.5" fill="#111"/><circle cx="70" cy="46" r="2.5" fill="#111"/></svg>,
    arms_crossed_behind: <svg viewBox="0 0 160 180" fill="none"><ellipse cx="80" cy="152" rx="46" ry="15" fill={c} opacity="0.9"/><ellipse cx="80" cy="149" rx="43" ry="13" fill={c} opacity="0.5"/><ellipse cx="80" cy="157" rx="50" ry="7" fill="#222"/><rect x="48" y="68" width="38" height="86" rx="8" fill={body}/><rect x="26" y="93" width="55" height="10" rx="4" fill={skin} transform="rotate(-12 53 98)"/><rect x="72" y="93" width="55" height="10" rx="4" fill={skin} transform="rotate(12 100 98)"/><circle cx="67" cy="48" r="20" fill={skin}/><circle cx="59" cy="46" r="3" fill="#111"/><circle cx="75" cy="46" r="3" fill="#111"/><line x1="59" y1="57" x2="75" y2="57" stroke="#111" strokeWidth="1.5"/></svg>,
    box_hold: <svg viewBox="0 0 160 180" fill="none"><rect x="48" y="76" width="38" height="80" rx="8" fill={body}/><rect x="33" y="70" width="68" height="52" rx="6" fill={c} opacity="0.8"/><rect x="36" y="73" width="62" height="46" rx="4" fill={c} opacity="0.3"/><text x="67" y="98" textAnchor="middle" fill="#000" fontSize="7" fontWeight="bold">GSPFOOD</text><rect x="16" y="106" width="34" height="9" rx="4" fill={skin}/><rect x="106" y="106" width="34" height="9" rx="4" fill={skin}/><circle cx="67" cy="50" r="20" fill={skin}/><circle cx="59" cy="48" r="2.5" fill="#111"/><circle cx="75" cy="48" r="2.5" fill="#111"/></svg>,
    dual_hold: <svg viewBox="0 0 160 180" fill="none"><rect x="50" y="78" width="34" height="78" rx="8" fill={body}/><rect x="4" y="73" width="43" height="34" rx="5" fill={c} opacity="0.7"/><text x="25" y="93" textAnchor="middle" fill="#000" fontSize="5">GSPFood</text><rect x="18" y="98" width="38" height="9" rx="4" fill={skin}/><ellipse cx="132" cy="86" rx="20" ry="7" fill={c} opacity="0.9" transform="rotate(-20 132 86)"/><rect x="86" y="98" width="38" height="9" rx="4" fill={skin}/><circle cx="67" cy="54" r="20" fill={skin}/><circle cx="59" cy="51" r="2.5" fill="#111"/><circle cx="75" cy="51" r="2.5" fill="#111"/></svg>,
    first_bite: <svg viewBox="0 0 160 180" fill="none"><rect x="48" y="80" width="36" height="75" rx="8" fill={body}/><rect x="20" y="70" width="43" height="9" rx="4" fill={skin} transform="rotate(25 41 75)"/><rect x="91" y="70" width="43" height="9" rx="4" fill={skin} transform="rotate(-25 113 75)"/><polygon points="53,57 103,61 98,73 48,69" fill={c} opacity="0.9"/><circle cx="66" cy="46" r="20" fill={skin}/><path d="M58 54 Q66 61 74 54" stroke="#111" strokeWidth="2" fill="none"/><circle cx="58" cy="43" r="2.5" fill="#111"/><circle cx="74" cy="43" r="2.5" fill="#111"/></svg>,
    oven_pull: <svg viewBox="0 0 160 180" fill="none"><rect x="0" y="124" width="160" height="50" rx="4" fill="#1a1a1a"/><rect x="8" y="114" width="144" height="17" rx="3" fill="#222"/><rect x="18" y="108" width="124" height="9" rx="3" fill="#444"/><ellipse cx="80" cy="108" rx="44" ry="11" fill={c} opacity="0.8"/><path d="M48 97 Q43 82 48 67" stroke="#ffffff44" strokeWidth="3" fill="none" strokeLinecap="round"/><path d="M80 95 Q75 80 80 63" stroke="#ffffff44" strokeWidth="3" fill="none" strokeLinecap="round"/><path d="M112 97 Q117 81 112 66" stroke="#ffffff44" strokeWidth="3" fill="none" strokeLinecap="round"/><rect x="3" y="110" width="37" height="9" rx="4" fill={skin}/><rect x="120" y="110" width="37" height="9" rx="4" fill={skin}/><rect x="48" y="46" width="36" height="63" rx="8" fill={body}/><circle cx="66" cy="28" r="20" fill={skin}/><circle cx="58" cy="26" r="2.5" fill="#111"/><circle cx="74" cy="26" r="2.5" fill="#111"/></svg>,
    athletic_hold: <svg viewBox="0 0 160 180" fill="none"><rect x="48" y="76" width="36" height="80" rx="8" fill="#1e3a5f"/><ellipse cx="120" cy="112" rx="23" ry="8" fill={c} opacity="0.8" transform="rotate(-30 120 112)"/><rect x="84" y="106" width="40" height="9" rx="4" fill={skin} transform="rotate(-15 104 111)"/><rect x="18" y="106" width="32" height="9" rx="4" fill={skin}/><circle cx="66" cy="53" r="20" fill={skin}/><circle cx="58" cy="50" r="2.5" fill="#111"/><circle cx="74" cy="50" r="2.5" fill="#111"/><line x1="48" y1="88" x2="84" y2="88" stroke="#4a8fcf" strokeWidth="2" opacity="0.5"/></svg>,
    side_profile_eat: <svg viewBox="0 0 160 180" fill="none"><rect x="0" y="140" width="160" height="7" rx="2" fill="#333"/><rect x="63" y="78" width="28" height="62" rx="8" fill={body}/><ellipse cx="70" cy="54" rx="16" ry="20" fill={skin}/><rect x="53" y="70" width="48" height="9" rx="4" fill={skin} transform="rotate(-20 77 75)"/><polygon points="98,58 125,63 119,75 92,70" fill={c} opacity="0.9"/><rect x="0" y="0" width="18" height="155" fill="#ffffff06"/><circle cx="62" cy="50" r="3.5" fill="#111"/></svg>,
    low_angle_extend: <svg viewBox="0 0 160 180" fill="none"><ellipse cx="80" cy="158" rx="68" ry="21" fill={c} opacity="0.9"/><ellipse cx="80" cy="153" rx="63" ry="19" fill={c} opacity="0.5"/><rect x="26" y="120" width="43" height="11" rx="5" fill={skin} transform="rotate(30 47 126)"/><rect x="91" y="120" width="43" height="11" rx="5" fill={skin} transform="rotate(-30 113 126)"/><rect x="50" y="52" width="34" height="72" rx="8" fill={body}/><circle cx="67" cy="33" r="18" fill={skin}/><circle cx="60" cy="31" r="2.5" fill="#111"/><circle cx="74" cy="31" r="2.5" fill="#111"/></svg>,
    split_before_after: <svg viewBox="0 0 160 180" fill="none"><line x1="80" y1="0" x2="80" y2="168" stroke="#333" strokeWidth="1.5" strokeDasharray="4,3"/><rect x="16" y="80" width="40" height="30" rx="4" fill="#7A8FC9" opacity="0.7"/><text x="36" y="97" textAnchor="middle" fill="#fff" fontSize="5">FROZEN</text><rect x="20" y="110" width="28" height="52" rx="5" fill={body}/><circle cx="34" cy="58" r="15" fill={skin}/><circle cx="28" cy="56" r="2" fill="#111"/><circle cx="40" cy="56" r="2" fill="#111"/><ellipse cx="120" cy="90" rx="26" ry="9" fill={c} opacity="0.9"/><rect x="106" y="99" width="28" height="52" rx="5" fill={body}/><circle cx="120" cy="56" r="15" fill={skin}/><circle cx="114" cy="54" r="2" fill="#111"/><circle cx="126" cy="54" r="2" fill="#111"/><text x="36" y="174" textAnchor="middle" fill="#555" fontSize="8">BEFORE</text><text x="120" y="174" textAnchor="middle" fill={c} fontSize="8">AFTER</text></svg>,
    dark_premium: <svg viewBox="0 0 160 180" fill="none"><rect x="0" y="0" width="160" height="175" fill="#050505"/><ellipse cx="38" cy="58" rx="78" ry="98" fill="#ffffff05"/><rect x="48" y="73" width="36" height="83" rx="8" fill="#1a1a1a"/><rect x="48" y="73" width="18" height="83" rx="8" fill="#2a2a2a"/><ellipse cx="66" cy="86" rx="37" ry="12" fill={c} opacity="0.9"/><ellipse cx="55" cy="84" rx="19" ry="9" fill={c} opacity="0.3"/><rect x="18" y="86" width="34" height="9" rx="4" fill={skin} opacity="0.9"/><rect x="83" y="86" width="34" height="9" rx="4" fill="#222"/><circle cx="66" cy="51" r="20" fill="#5a4a42"/><path d="M66 31 A20 20 0 0 1 86 51 A20 20 0 0 1 66 71 Z" fill={skin}/><circle cx="58" cy="49" r="2.5" fill="#111" opacity="0.4"/><circle cx="74" cy="49" r="2.5" fill="#111"/></svg>,
  };
  return figs[pose] || figs["arms_crossed_behind"];
}

// ── BLANK TEMPLATES ─────────────────────────────────────────────────────────
function blankScript(series) {
  return {
    id: `NEW_${Date.now()}`,
    series,
    number: "",
    title: "Untitled Script",
    topic: "",
    hook: "",
    viralangle: "",
    direction: "",
    versions: [
      { label: "Full Version", lines: [{ type: "hook", text: "" }] },
      { label: "Cut-Down Version", lines: [{ type: "hook", text: "" }] },
    ]
  };
}

// ── LINE EDITOR ─────────────────────────────────────────────────────────────
function LineEditor({ lines, onChange }) {
  const addLine = (type) => onChange([...lines, { type, text: "" }]);
  const removeLine = (i) => onChange(lines.filter((_, idx) => idx !== i));
  const updateLine = (i, field, val) => onChange(lines.map((l, idx) => idx === i ? { ...l, [field]: val } : l));
  const moveLine = (i, dir) => {
    const arr = [...lines];
    const j = i + dir;
    if (j < 0 || j >= arr.length) return;
    [arr[i], arr[j]] = [arr[j], arr[i]];
    onChange(arr);
  };

  const inp = { background: "#0d0d0d", border: "1px solid #2a2a2a", borderRadius: 4, color: "#E0D9CE", fontFamily: "Georgia, serif", fontSize: 13, padding: "6px 10px", outline: "none", width: "100%" };

  return (
    <div>
      {lines.map((line, i) => (
        <div key={i} style={{ display: "flex", gap: 6, marginBottom: 8, alignItems: "flex-start" }}>
          <select value={line.type} onChange={e => updateLine(i, "type", e.target.value)}
            style={{ ...inp, width: 80, flexShrink: 0, fontSize: 11, padding: "6px 4px" }}>
            {["hook","body","beat","close","tag"].map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <textarea value={line.text} onChange={e => updateLine(i, "text", e.target.value)} rows={2}
            style={{ ...inp, flex: 1, resize: "vertical", lineHeight: 1.5, ...TYPE_STYLE[line.type] }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 3, flexShrink: 0 }}>
            <button onClick={() => moveLine(i, -1)} style={{ background: "#1a1a1a", border: "none", borderRadius: 3, color: "#666", cursor: "pointer", padding: "3px 6px", fontSize: 11 }}>↑</button>
            <button onClick={() => moveLine(i, 1)} style={{ background: "#1a1a1a", border: "none", borderRadius: 3, color: "#666", cursor: "pointer", padding: "3px 6px", fontSize: 11 }}>↓</button>
            <button onClick={() => removeLine(i)} style={{ background: "#2a1010", border: "none", borderRadius: 3, color: "#C97A7A", cursor: "pointer", padding: "3px 6px", fontSize: 11 }}>✕</button>
          </div>
        </div>
      ))}
      <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
        {["hook","body","beat","close","tag"].map(t => (
          <button key={t} onClick={() => addLine(t)} style={{ padding: "4px 12px", background: "#111", border: "1px solid #2a2a2a", borderRadius: 20, color: "#666", cursor: "pointer", fontSize: 11, fontFamily: "Georgia" }}>
            + {t}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── MAIN APP ────────────────────────────────────────────────────────────────
export default function ScriptLibrary() {
  const [mainTab, setMainTab] = useState("scripts");
  const [scripts, setScripts] = useState(INIT_SCRIPTS);
  const [activeId, setActiveId] = useState("FS01");
  const [activeSeries, setActiveSeries] = useState("founders");
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(null);
  const [activeVersion, setActiveVersion] = useState(0);
  const [copied, setCopied] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [showNewModal, setShowNewModal] = useState(false);
  const [newSeries, setNewSeries] = useState("founders");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedPose, setSelectedPose] = useState(null);
  const [poseFilter, setPoseFilter] = useState("All");
  const [poses, setPoses] = useState(POSES);
  const [poseEditing, setPoseEditing] = useState(null);
  const [poseDeleteConfirm, setPoseDeleteConfirm] = useState(null);

  // ── CHECKLIST STATE ──
  const CHECKLIST_ITEMS = [
    { id: "dl1", section: "🗓 Key Deadlines", text: "Content Review", due: "Wed March 12" },
    { id: "dl2", section: "🗓 Key Deadlines", text: "Scripts Locked", due: "Fri March 14" },
    { id: "dl3", section: "🗓 Key Deadlines", text: "Pre-Production Complete", due: "Fri April 11" },
    { id: "dl4", section: "🗓 Key Deadlines", text: "Shoot Day 1 — Studio", due: "Sun April 13" },
    { id: "dl5", section: "🗓 Key Deadlines", text: "Shoot Day 2 — Sobeys", due: "Mon April 14" },
    { id: "dl6", section: "🗓 Key Deadlines", text: "Final Delivery", due: "Mon April 28" },
    { id: "ca1", section: "🎭 Casting & Talent", text: "Confirm GSP — both shoot days" },
    { id: "ca2", section: "🎭 Casting & Talent", text: "Confirm FP (Francesco) — Day 1" },
    { id: "ca3", section: "🎭 Casting & Talent", text: "Confirm Mark Kerr — Day 1 (COM03)" },
    { id: "ca4", section: "🎭 Casting & Talent", text: "Confirm Giuseppe — Day 1 (COM03)" },
    { id: "ca5", section: "🎭 Casting & Talent", text: "Confirm Julia — Day 1 (COM02)" },
    { id: "ca6", section: "🎭 Casting & Talent", text: "Cast child actor(s) for COM01" },
    { id: "ca7", section: "🎭 Casting & Talent", text: "Cast 2–3 judges for Pinsa Challenge — do NOT brief them on who wins" },
    { id: "cr1", section: "🎬 Crew — Day 1 (Full Studio)", text: "Director confirmed" },
    { id: "cr2", section: "🎬 Crew — Day 1 (Full Studio)", text: "Director of Photography (DP) confirmed" },
    { id: "cr3", section: "🎬 Crew — Day 1 (Full Studio)", text: "Camera Operator 2 confirmed" },
    { id: "cr4", section: "🎬 Crew — Day 1 (Full Studio)", text: "Camera Operator 3 (roaming) confirmed" },
    { id: "cr5", section: "🎬 Crew — Day 1 (Full Studio)", text: "Food Stylist confirmed" },
    { id: "cr6", section: "🎬 Crew — Day 1 (Full Studio)", text: "Hair & Makeup Artist confirmed" },
    { id: "cr7", section: "🎬 Crew — Day 1 (Full Studio)", text: "Sound Recordist confirmed" },
    { id: "cr8", section: "🎬 Crew — Day 1 (Full Studio)", text: "Gaffer / Lighting Technician confirmed" },
    { id: "cr9", section: "🎬 Crew — Day 1 (Full Studio)", text: "Single point-of-contact for GSP direction confirmed" },
    { id: "cr10", section: "🎬 Crew — Day 2 (Sobeys — Lean)", text: "DP confirmed" },
    { id: "cr11", section: "🎬 Crew — Day 2 (Sobeys — Lean)", text: "Camera Operator confirmed" },
    { id: "cr12", section: "🎬 Crew — Day 2 (Sobeys — Lean)", text: "Production Assistant confirmed" },
    { id: "cr13", section: "🎬 Crew — Day 2 (Sobeys — Lean)", text: "iPhone operator confirmed (candid / BTS)" },
    { id: "lo1", section: "📍 Location & Permits", text: "Studio booked — April 13" },
    { id: "lo2", section: "📍 Location & Permits", text: "Sobeys location confirmed — April 14" },
    { id: "lo3", section: "📍 Location & Permits", text: "Sobeys store management briefed and authorized" },
    { id: "lo4", section: "📍 Location & Permits", text: "Costco approval obtained (if in-store for WTB02)" },
    { id: "lo5", section: "📍 Location & Permits", text: "All location permits secured" },
    { id: "eq1", section: "🎥 Equipment", text: "Primary cinema camera package confirmed" },
    { id: "eq2", section: "🎥 Equipment", text: "Lenses confirmed (including macro for food shots)" },
    { id: "eq3", section: "🎥 Equipment", text: "Lighting package confirmed (dark studio + white seamless)" },
    { id: "eq4", section: "🎥 Equipment", text: "Audio package confirmed (lapel mics + boom)" },
    { id: "eq5", section: "🎥 Equipment", text: "iPhones charged for iPhone Series + BTS" },
    { id: "eq6", section: "🎥 Equipment", text: "60fps / 120fps slow motion capability confirmed" },
    { id: "eq7", section: "🎥 Equipment", text: "Timer / countdown graphic ready (Pinsa Challenge)" },
    { id: "pr1", section: "🧴 Props & Wardrobe", text: "GSPFood boxes — all 5 flavours (min 10 each)" },
    { id: "pr2", section: "🧴 Props & Wardrobe", text: "3x aprons for COM03 (GSP, Mark, Giuseppe)" },
    { id: "pr3", section: "🧴 Props & Wardrobe", text: "Aprons / chef attire for Pinsa Challenge" },
    { id: "pr4", section: "🧴 Props & Wardrobe", text: "GSP wardrobe options: dark studio / athletic wear / casual kitchen" },
    { id: "pr5", section: "🧴 Props & Wardrobe", text: "Child wardrobe confirmed (COM01)" },
    { id: "pr6", section: "🧴 Props & Wardrobe", text: "FP wardrobe confirmed (COM01)" },
    { id: "fs1", section: "🍕 Food Styling", text: "Food stylist briefed on all 7 hero shots for COM03 montage" },
    { id: "fs2", section: "🍕 Food Styling", text: "All 5 flavours prepped and available" },
    { id: "fs3", section: "🍕 Food Styling", text: "Cheese pull setup planned (multiple takes)" },
    { id: "fs4", section: "🍕 Food Styling", text: "Basil drop slow-motion shot planned (60fps+)" },
    { id: "fs5", section: "🍕 Food Styling", text: "Crust interior tear shot planned" },
    { id: "fs6", section: "🍕 Food Styling", text: "Oven / air fryer on set and operational" },
    { id: "fs7", section: "🍕 Food Styling", text: "Cutting boards, serving boards, knives on set" },
    { id: "d1c1", section: "🎬 Day 1 — Founders Series (7 questions)", text: "FS01 — Who is Georges St-Pierre?" },
    { id: "d1c2", section: "🎬 Day 1 — Founders Series (7 questions)", text: "FS02 — How did you stay healthy fighting in the UFC?" },
    { id: "d1c3", section: "🎬 Day 1 — Founders Series (7 questions)", text: "FS03 — What makes Pinsa different from regular pizza?" },
    { id: "d1c4", section: "🎬 Day 1 — Founders Series (7 questions)", text: "FS04 — What is the mission behind GSPFood?" },
    { id: "d1c5", section: "🎬 Day 1 — Founders Series (7 questions)", text: "FS05 — How does GSPFood benefit you personally?" },
    { id: "d1c6", section: "🎬 Day 1 — Founders Series (7 questions)", text: "FS06 — The Future of GSPFood" },
    { id: "d1c7", section: "🎬 Day 1 — Founders Series (7 questions)", text: "FS07 — GSP Certified (ask cold — last question of the day)" },
    { id: "d1c8", section: "🎬 Day 1 — Founders Series (7 questions)", text: "'If you had to sell the Pinsa in one line?' — ask every session" },
    { id: "d1v1", section: "🎬 Day 1 — Commercials", text: "COM01 — The Supermarket Moment (60s + 30s + 15s)" },
    { id: "d1v2", section: "🎬 Day 1 — Commercials", text: "COM02 — The Pinsa Challenge (full shoot + all clip variations)" },
    { id: "d1v3", section: "🎬 Day 1 — Commercials", text: "COM03 — It's Not Pizza. It's Pinsa. (30s + 15s)" },
    { id: "d1v4", section: "🎬 Day 1 — Commercials", text: "COM03 food stylist montage — all 7 hero shots" },
    { id: "d1q1", section: "🎬 Day 1 — Quick Hits", text: "QH01 — Pick Your Fighter" },
    { id: "d1q2", section: "🎬 Day 1 — Quick Hits", text: "QH03 — First Bite Hero Reaction" },
    { id: "d1q3", section: "🎬 Day 1 — Quick Hits", text: "QH04 — Side-Angle Crunch (audio-focused)" },
    { id: "d1q4", section: "🎬 Day 1 — Quick Hits", text: "QH05 — Silent Approval" },
    { id: "d1q5", section: "🎬 Day 1 — Quick Hits", text: "QH06 — Second Bite — Going Back In" },
    { id: "d1q6", section: "🎬 Day 1 — Quick Hits", text: "QH07 — Explain While Chewing" },
    { id: "d1q7", section: "🎬 Day 1 — Quick Hits", text: "QH08 — Flavour Ranking" },
    { id: "d1q8", section: "🎬 Day 1 — Quick Hits", text: "QH09 — Texture Breakdown (crust tear)" },
    { id: "d1q9", section: "🎬 Day 1 — Quick Hits", text: "QH10 — Pizza Night Win" },
    { id: "d1p1", section: "🎬 Day 1 — Other", text: "PN01 — Pinsa Night (30–45s + 15–20s)" },
    { id: "d1w1", section: "🎬 Day 1 — Other", text: "WTB02 — Costco (studio)" },
    { id: "d1w2", section: "🎬 Day 1 — Other", text: "WTB03 — IGA + Foodland" },
    { id: "d1w3", section: "🎬 Day 1 — Other", text: "WTB04 — Safeway + Thrifty's" },
    { id: "d1w4", section: "🎬 Day 1 — Other", text: "WTB05 — No Frills + Cataldi + More" },
    { id: "d1g1", section: "🎬 Day 1 — GSP Certified (FS07)", text: "Full 60–90s version" },
    { id: "d1g2", section: "🎬 Day 1 — GSP Certified (FS07)", text: "30–45s cut" },
    { id: "d1g3", section: "🎬 Day 1 — GSP Certified (FS07)", text: "15–20s TikTok cut" },
    { id: "d1ph1", section: "📸 Day 1 — Photo Shoot (100 shots)", text: "Create Your Own — 20 hero shots" },
    { id: "d1ph2", section: "📸 Day 1 — Photo Shoot (100 shots)", text: "Margherita — 20 hero shots" },
    { id: "d1ph3", section: "📸 Day 1 — Photo Shoot (100 shots)", text: "3 Cheese — 20 hero shots" },
    { id: "d1ph4", section: "📸 Day 1 — Photo Shoot (100 shots)", text: "Pepperoni Rush — 20 hero shots" },
    { id: "d1ph5", section: "📸 Day 1 — Photo Shoot (100 shots)", text: "Meat Lovers — 20 hero shots" },
    { id: "d2w1", section: "🏪 Day 2 — Sobeys", text: "WTB01 — Sobeys in-store (GSP at freezer shelf) 15s + 30s" },
    { id: "d2q1", section: "🏪 Day 2 — Sobeys", text: "QH02 — Post-Workout Casual Bite (iPhone)" },
    { id: "d2s1", section: "🏪 Day 2 — Sobeys", text: "GSP surprising shoppers — candid reactions" },
    { id: "d2s2", section: "🏪 Day 2 — Sobeys", text: "Shopper reaction shots (get releases)" },
    { id: "d2s3", section: "🏪 Day 2 — Sobeys", text: "Product on shelf — hero shelf shot" },
    { id: "d2s4", section: "🏪 Day 2 — Sobeys", text: "BTS content — Day 2" },
    { id: "po1", section: "🎞 Post-Production", text: "All Founders Series interviews logged and clip-tagged" },
    { id: "po2", section: "🎞 Post-Production", text: "Pull quote moments flagged in edit log" },
    { id: "po3", section: "🎞 Post-Production", text: "All commercials cut — full + cut-downs + 15s pre-rolls" },
    { id: "po4", section: "🎞 Post-Production", text: "All Where-to-Buy videos cut — 15s + 30s" },
    { id: "po5", section: "🎞 Post-Production", text: "All Quick Hits cut and exported" },
    { id: "po6", section: "🎞 Post-Production", text: "Pinsa Challenge standalone clips cut (5–8 pieces)" },
    { id: "po7", section: "🎞 Post-Production", text: "COM03 standalone clips cut (5 pieces)" },
    { id: "po8", section: "🎞 Post-Production", text: "'GSP Certified' stamp / graphic ready" },
    { id: "po9", section: "🎞 Post-Production", text: "All 100 photos retouched and delivered" },
    { id: "po10", section: "🎞 Post-Production", text: "Legal review — all claims (40g protein, 85% less fat, 'compared to traditional pizza')" },
    { id: "po11", section: "🎞 Post-Production", text: "All videos exported — platform formats (16:9, 9:16, 1:1)" },
    { id: "po12", section: "🎞 Post-Production", text: "Captions / subtitles added to all videos" },
    { id: "po13", section: "🎞 Post-Production", text: "Final delivery package sent — April 28" },
    { id: "re1", section: "🛒 Retailer Coordination", text: "Sobeys — in-store approval for Day 2 confirmed" },
    { id: "re2", section: "🛒 Retailer Coordination", text: "Costco — in-store shoot approval obtained" },
    { id: "re3", section: "🛒 Retailer Coordination", text: "IGA / Foodland — content shared with retailer contacts" },
    { id: "re4", section: "🛒 Retailer Coordination", text: "Safeway / Thrifty's — content shared with retailer contacts" },
    { id: "re5", section: "🛒 Retailer Coordination", text: "No Frills / Cataldi — content shared with retailer contacts" },
  ];
  const [checkItems, setCheckItems] = useState(CHECKLIST_ITEMS);
  const [checked, setChecked] = useState({});
  const [checkSection, setCheckSection] = useState("All");
  const [checkEditId, setCheckEditId] = useState(null);
  const [checkEditDraft, setCheckEditDraft] = useState(null);
  const [checkDeleteId, setCheckDeleteId] = useState(null);
  const [showAddItem, setShowAddItem] = useState(false);
  const [newItemText, setNewItemText] = useState("");
  const [newItemDue, setNewItemDue] = useState("");
  const [newItemSection, setNewItemSection] = useState("");
  const [showAddSection, setShowAddSection] = useState(false);
  const [newSectionName, setNewSectionName] = useState("");
  const [editSectionId, setEditSectionId] = useState(null);
  const [editSectionDraft, setEditSectionDraft] = useState("");

  const toggleCheck = (id) => setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  const allSections = Array.from(new Set(checkItems.map(i => i.section)));
  const checkSections = ["All", ...allSections];
  const totalDone = checkItems.filter(i => checked[i.id]).length;
  const sectionDone = (sec) => checkItems.filter(i => i.section === sec && checked[i.id]).length;
  const sectionTotal = (sec) => checkItems.filter(i => i.section === sec).length;

  const startEditItem = (item) => { setCheckEditId(item.id); setCheckEditDraft({ ...item }); };
  const saveEditItem = () => { setCheckItems(prev => prev.map(i => i.id === checkEditId ? checkEditDraft : i)); setCheckEditId(null); setCheckEditDraft(null); };
  const cancelEditItem = () => { setCheckEditId(null); setCheckEditDraft(null); };
  const deleteItem = (id) => { setCheckItems(prev => prev.filter(i => i.id !== id)); setCheckDeleteId(null); setChecked(prev => { const n = {...prev}; delete n[id]; return n; }); };
  const addItem = () => {
    if (!newItemText.trim()) return;
    const sec = newItemSection || (checkSection !== "All" ? checkSection : (allSections[0] || "General"));
    const id = `custom_${Date.now()}`;
    setCheckItems(prev => [...prev, { id, section: sec, text: newItemText.trim(), due: newItemDue.trim() || undefined }]);
    setNewItemText(""); setNewItemDue(""); setNewItemSection(""); setShowAddItem(false);
  };
  const addSection = () => {
    if (!newSectionName.trim()) return;
    const sec = newSectionName.trim();
    const id = `custom_${Date.now()}`;
    setCheckItems(prev => [...prev, { id, section: sec, text: "New item — click to edit", due: undefined }]);
    setCheckSection(sec); setNewSectionName(""); setShowAddSection(false);
  };
  const renameSection = (oldName, newName) => {
    if (!newName.trim() || newName === oldName) { setEditSectionId(null); return; }
    setCheckItems(prev => prev.map(i => i.section === oldName ? { ...i, section: newName.trim() } : i));
    if (checkSection === oldName) setCheckSection(newName.trim());
    setEditSectionId(null);
  };
  const deleteSection = (sec) => {
    const ids = checkItems.filter(i => i.section === sec).map(i => i.id);
    setCheckItems(prev => prev.filter(i => i.section !== sec));
    setChecked(prev => { const n = {...prev}; ids.forEach(id => delete n[id]); return n; });
    if (checkSection === sec) setCheckSection("All");
  };

  const seriesScripts = scripts.filter(s => s.series === activeSeries);
  const current = editing ? draft : (scripts.find(s => s.id === activeId) || scripts[0]);
  const seriesColor = SERIES_MAP[activeSeries]?.color || GOLD;

  const startEdit = () => { setDraft(JSON.parse(JSON.stringify(current))); setEditing(true); };
  const cancelEdit = () => { setEditing(false); setDraft(null); };
  const saveEdit = () => {
    setScripts(prev => prev.map(s => s.id === draft.id ? draft : s));
    setEditing(false); setDraft(null);
  };
  const deleteScript = (id) => {
    const remaining = scripts.filter(s => s.id !== id);
    setScripts(remaining);
    setDeleteConfirm(null);
    if (activeId === id) setActiveId(remaining.find(s => s.series === activeSeries)?.id || remaining[0]?.id);
  };
  const addScript = () => {
    const s = blankScript(newSeries);
    setScripts(prev => [...prev, s]);
    setActiveSeries(newSeries);
    setActiveId(s.id);
    setShowNewModal(false);
    setDraft(JSON.parse(JSON.stringify(s)));
    setEditing(true);
    setActiveVersion(0);
  };
  const duplicateScript = () => {
    const clone = { ...JSON.parse(JSON.stringify(current)), id: `DUP_${Date.now()}`, title: current.title + " (Copy)" };
    setScripts(prev => [...prev, clone]);
    setActiveId(clone.id);
  };

  const copyScript = () => {
    const v = current.versions[activeVersion];
    const lines = v.lines.map(l => l.type === "beat" ? `\n${l.text}\n` : l.text).join("\n");
    const text = `${current.title} — ${v.label}\n${"─".repeat(50)}\n${lines}\n\nDIRECTION: ${current.direction}\nVIRAL ANGLE: ${current.viralangle}`;
    navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };

  const inpStyle = { background: "#0d0d0d", border: "1px solid #2a2a2a", borderRadius: 6, color: "#E0D9CE", fontFamily: "Georgia, serif", fontSize: 13, padding: "8px 12px", outline: "none", width: "100%" };

  return (
    <div style={{ minHeight: "100vh", background: BG, color: "#E0D9CE", fontFamily: "Georgia, serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Aleo:ital,wght@0,300;0,400;0,700;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 3px; } ::-webkit-scrollbar-thumb { background: #7A0F12; }
        button:focus { outline: none; }
        textarea:focus, input:focus, select:focus { border-color: #C9A24A !important; }
        .btn:hover { opacity: 0.8; }
        .row:hover { background: #0f0f0f !important; }
      `}</style>

      {/* ── HEADER ── */}
      <div style={{ background: RED, borderBottom: `2px solid ${GOLD}`, height: 52, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={() => setSidebarOpen(o => !o)} style={{ background: "none", border: "none", color: "#ffffff88", cursor: "pointer", fontSize: 16, padding: "4px 8px" }}>☰</button>
          <span style={{ fontFamily: "'Bebas Neue'", fontSize: 22, color: GOLD, letterSpacing: "0.12em" }}>GSPFOOD</span>
          <span style={{ width: 1, height: 18, background: "#ffffff33" }} />
          <div style={{ display: "flex", gap: 4 }}>
            {[["scripts","📝 Scripts"], ["poses","📸 Pose References"], ["checklist","✅ Checklist"]].map(([key, label]) => (
              <button key={key} onClick={() => setMainTab(key)} style={{ padding: "5px 14px", background: mainTab === key ? "rgba(255,255,255,0.15)" : "transparent", border: "none", borderRadius: 6, color: mainTab === key ? "#fff" : "#ffffff66", cursor: "pointer", fontSize: 12, fontFamily: "Georgia", letterSpacing: "0.05em" }}>
                {label}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ fontSize: 11, color: "#ffffff66" }}>{scripts.length} scripts</span>
          <button className="btn" onClick={() => setShowNewModal(true)} style={{ padding: "6px 16px", background: GOLD, border: "none", borderRadius: 6, color: "#000", fontFamily: "'Bebas Neue'", fontSize: 13, letterSpacing: "0.1em", cursor: "pointer" }}>
            + NEW SCRIPT
          </button>
        </div>
      </div>

      {/* ── CHECKLIST TAB ── */}
      {mainTab === "checklist" && (
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px 60px" }}>

          {/* Progress + header row */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={{ fontFamily: "'Bebas Neue'", fontSize: 18, color: GOLD, letterSpacing: "0.1em" }}>PRODUCTION CHECKLIST</span>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span style={{ fontSize: 12, color: totalDone === checkItems.length ? "#6BBF8E" : "#666" }}>{totalDone} / {checkItems.length}</span>
                <button className="btn" onClick={() => { setShowAddItem(true); setShowAddSection(false); }} style={{ padding: "5px 12px", background: GOLD, border: "none", borderRadius: 6, color: "#000", fontFamily: "'Bebas Neue'", fontSize: 11, letterSpacing: "0.08em", cursor: "pointer" }}>+ ADD ITEM</button>
                <button className="btn" onClick={() => { setShowAddSection(true); setShowAddItem(false); }} style={{ padding: "5px 12px", background: "transparent", border: `1px solid ${GOLD}55`, borderRadius: 6, color: GOLD, fontFamily: "'Bebas Neue'", fontSize: 11, letterSpacing: "0.08em", cursor: "pointer" }}>+ SECTION</button>
              </div>
            </div>
            <div style={{ height: 4, background: "#1a1a1a", borderRadius: 2, overflow: "hidden" }}>
              <div style={{ height: "100%", width: checkItems.length ? `${(totalDone / checkItems.length) * 100}%` : "0%", background: totalDone === checkItems.length && checkItems.length > 0 ? "#6BBF8E" : GOLD, borderRadius: 2, transition: "width 0.3s" }} />
            </div>
          </div>

          {/* Add Item form */}
          {showAddItem && (
            <div style={{ background: "#0e0e0e", border: `1px solid ${GOLD}44`, borderRadius: 8, padding: 16, marginBottom: 16 }}>
              <div style={{ fontFamily: "'Bebas Neue'", fontSize: 12, color: GOLD, letterSpacing: "0.1em", marginBottom: 12 }}>NEW ITEM</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <input value={newItemText} onChange={e => setNewItemText(e.target.value)} placeholder="Item text…" onKeyDown={e => e.key === "Enter" && addItem()}
                  style={{ background: "#0a0a0a", border: "1px solid #2a2a2a", borderRadius: 6, color: "#E0D9CE", fontFamily: "Georgia", fontSize: 13, padding: "8px 12px", outline: "none" }} />
                <div style={{ display: "flex", gap: 8 }}>
                  <select value={newItemSection} onChange={e => setNewItemSection(e.target.value)}
                    style={{ flex: 1, background: "#0a0a0a", border: "1px solid #2a2a2a", borderRadius: 6, color: newItemSection ? "#E0D9CE" : "#666", fontFamily: "Georgia", fontSize: 12, padding: "7px 10px", outline: "none" }}>
                    <option value="">Section: {checkSection !== "All" ? checkSection : allSections[0] || "—"}</option>
                    {allSections.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <input value={newItemDue} onChange={e => setNewItemDue(e.target.value)} placeholder="Due date (optional)"
                    style={{ flex: 1, background: "#0a0a0a", border: "1px solid #2a2a2a", borderRadius: 6, color: "#E0D9CE", fontFamily: "Georgia", fontSize: 12, padding: "7px 10px", outline: "none" }} />
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={addItem} style={{ flex: 1, padding: "7px", background: GOLD, border: "none", borderRadius: 6, color: "#000", fontFamily: "'Bebas Neue'", fontSize: 12, letterSpacing: "0.08em", cursor: "pointer" }}>ADD</button>
                  <button onClick={() => { setShowAddItem(false); setNewItemText(""); setNewItemDue(""); setNewItemSection(""); }} style={{ flex: 1, padding: "7px", background: "transparent", border: "1px solid #333", borderRadius: 6, color: "#666", fontFamily: "Georgia", fontSize: 12, cursor: "pointer" }}>Cancel</button>
                </div>
              </div>
            </div>
          )}

          {/* Add Section form */}
          {showAddSection && (
            <div style={{ background: "#0e0e0e", border: `1px solid ${GOLD}44`, borderRadius: 8, padding: 16, marginBottom: 16 }}>
              <div style={{ fontFamily: "'Bebas Neue'", fontSize: 12, color: GOLD, letterSpacing: "0.1em", marginBottom: 12 }}>NEW SECTION</div>
              <div style={{ display: "flex", gap: 8 }}>
                <input value={newSectionName} onChange={e => setNewSectionName(e.target.value)} placeholder="Section name…" onKeyDown={e => e.key === "Enter" && addSection()}
                  style={{ flex: 1, background: "#0a0a0a", border: "1px solid #2a2a2a", borderRadius: 6, color: "#E0D9CE", fontFamily: "Georgia", fontSize: 13, padding: "8px 12px", outline: "none" }} />
                <button onClick={addSection} style={{ padding: "8px 16px", background: GOLD, border: "none", borderRadius: 6, color: "#000", fontFamily: "'Bebas Neue'", fontSize: 12, letterSpacing: "0.08em", cursor: "pointer" }}>ADD</button>
                <button onClick={() => { setShowAddSection(false); setNewSectionName(""); }} style={{ padding: "8px 16px", background: "transparent", border: "1px solid #333", borderRadius: 6, color: "#666", fontFamily: "Georgia", fontSize: 12, cursor: "pointer" }}>Cancel</button>
              </div>
            </div>
          )}

          {/* Section filter pills */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
            {checkSections.map(s => {
              const done = s === "All" ? totalDone : sectionDone(s);
              const total = s === "All" ? checkItems.length : sectionTotal(s);
              const isActive = checkSection === s;
              const allDone = done === total && total > 0;
              return (
                <button key={s} onClick={() => setCheckSection(s)}
                  style={{ padding: "5px 12px", borderRadius: 20, border: `1px solid ${isActive ? GOLD : allDone ? "#6BBF8E33" : "#222"}`, background: isActive ? `${GOLD}18` : allDone ? "#6BBF8E0a" : "transparent", color: isActive ? GOLD : allDone ? "#6BBF8E" : "#555", fontSize: 10, cursor: "pointer", fontFamily: "Georgia", display: "flex", alignItems: "center", gap: 5 }}>
                  {allDone && "✓ "}{s === "All" ? "All" : s.replace(/^[^\s]+ /, "")}
                  <span style={{ opacity: 0.6, fontSize: 9 }}>{done}/{total}</span>
                </button>
              );
            })}
          </div>

          {/* Items grouped by section */}
          {(checkSection === "All" ? allSections : [checkSection]).map(sec => {
            const items = checkItems.filter(i => i.section === sec);
            const done = sectionDone(sec);
            const total = sectionTotal(sec);
            const allDone = done === total && total > 0;
            return (
              <div key={sec} style={{ marginBottom: 28 }}>
                {/* Section header */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, paddingBottom: 6, borderBottom: `1px solid ${allDone ? "#6BBF8E22" : "#1a1a1a"}` }}>
                  {editSectionId === sec ? (
                    <>
                      <input autoFocus value={editSectionDraft} onChange={e => setEditSectionDraft(e.target.value)}
                        onKeyDown={e => { if (e.key === "Enter") renameSection(sec, editSectionDraft); if (e.key === "Escape") setEditSectionId(null); }}
                        style={{ background: "#0a0a0a", border: `1px solid ${GOLD}`, borderRadius: 4, color: "#E0D9CE", fontFamily: "'Bebas Neue'", fontSize: 13, letterSpacing: "0.1em", padding: "3px 8px", outline: "none", width: 220 }} />
                      <button onClick={() => renameSection(sec, editSectionDraft)} style={{ padding: "3px 10px", background: GOLD, border: "none", borderRadius: 4, color: "#000", fontSize: 11, fontFamily: "'Bebas Neue'", cursor: "pointer" }}>SAVE</button>
                      <button onClick={() => setEditSectionId(null)} style={{ padding: "3px 8px", background: "transparent", border: "1px solid #333", borderRadius: 4, color: "#666", fontSize: 11, cursor: "pointer" }}>✕</button>
                    </>
                  ) : (
                    <>
                      <span style={{ fontFamily: "'Bebas Neue'", fontSize: 13, color: allDone ? "#6BBF8E" : GOLD, letterSpacing: "0.12em", flex: 1 }}>{sec}</span>
                      <span style={{ fontSize: 10, color: allDone ? "#6BBF8E" : "#555" }}>{done}/{total}</span>
                      {allDone && <span style={{ fontSize: 10, color: "#6BBF8E" }}>✓</span>}
                      <button onClick={() => { setEditSectionId(sec); setEditSectionDraft(sec); }} title="Rename section"
                        style={{ padding: "2px 7px", background: "transparent", border: "1px solid #222", borderRadius: 4, color: "#555", fontSize: 10, cursor: "pointer" }}>✏️</button>
                      <button onClick={() => { if (window.confirm(`Delete entire section "${sec}" and all its items?`)) deleteSection(sec); }} title="Delete section"
                        style={{ padding: "2px 7px", background: "transparent", border: "1px solid #2a1010", borderRadius: 4, color: "#7A0F12", fontSize: 10, cursor: "pointer" }}>🗑</button>
                    </>
                  )}
                </div>

                {/* Items */}
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {items.map(item => {
                    const isChecked = !!checked[item.id];
                    const isEditing = checkEditId === item.id;
                    const isDeleting = checkDeleteId === item.id;

                    if (isEditing) return (
                      <div key={item.id} style={{ background: "#0e0e0e", border: `1px solid ${GOLD}44`, borderRadius: 7, padding: "10px 12px" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                          <input value={checkEditDraft.text} onChange={e => setCheckEditDraft(d => ({ ...d, text: e.target.value }))}
                            style={{ background: "#0a0a0a", border: "1px solid #2a2a2a", borderRadius: 6, color: "#E0D9CE", fontFamily: "Georgia", fontSize: 13, padding: "7px 10px", outline: "none" }} />
                          <div style={{ display: "flex", gap: 8 }}>
                            <select value={checkEditDraft.section} onChange={e => setCheckEditDraft(d => ({ ...d, section: e.target.value }))}
                              style={{ flex: 1, background: "#0a0a0a", border: "1px solid #2a2a2a", borderRadius: 6, color: "#E0D9CE", fontFamily: "Georgia", fontSize: 12, padding: "6px 8px", outline: "none" }}>
                              {allSections.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                            <input value={checkEditDraft.due || ""} onChange={e => setCheckEditDraft(d => ({ ...d, due: e.target.value }))} placeholder="Due date"
                              style={{ flex: 1, background: "#0a0a0a", border: "1px solid #2a2a2a", borderRadius: 6, color: "#E0D9CE", fontFamily: "Georgia", fontSize: 12, padding: "6px 8px", outline: "none" }} />
                          </div>
                          <div style={{ display: "flex", gap: 8 }}>
                            <button onClick={saveEditItem} style={{ flex: 1, padding: "6px", background: GOLD, border: "none", borderRadius: 5, color: "#000", fontFamily: "'Bebas Neue'", fontSize: 12, cursor: "pointer" }}>SAVE</button>
                            <button onClick={cancelEditItem} style={{ flex: 1, padding: "6px", background: "transparent", border: "1px solid #333", borderRadius: 5, color: "#666", fontSize: 12, cursor: "pointer" }}>Cancel</button>
                          </div>
                        </div>
                      </div>
                    );

                    return (
                      <div key={item.id} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "9px 12px", borderRadius: 7, background: isChecked ? "#0d0d0d" : "#0a0a0a", border: `1px solid ${isChecked ? "#1e1e1e" : "#141414"}`, transition: "all 0.15s" }}>
                        {/* Checkbox */}
                        <div onClick={() => toggleCheck(item.id)} style={{ width: 18, height: 18, borderRadius: 4, border: `2px solid ${isChecked ? "#6BBF8E" : "#333"}`, background: isChecked ? "#6BBF8E" : "transparent", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1, cursor: "pointer", transition: "all 0.15s" }}>
                          {isChecked && <span style={{ color: "#000", fontSize: 11, fontWeight: "bold", lineHeight: 1 }}>✓</span>}
                        </div>
                        {/* Text */}
                        <div style={{ flex: 1, cursor: "pointer" }} onClick={() => toggleCheck(item.id)}>
                          <span style={{ fontSize: 13, color: isChecked ? "#555" : "#C8C0B4", textDecoration: isChecked ? "line-through" : "none", lineHeight: 1.4 }}>{item.text}</span>
                          {item.due && <span style={{ marginLeft: 8, fontSize: 10, color: isChecked ? "#444" : GOLD, fontFamily: "'Bebas Neue'", letterSpacing: "0.08em" }}>{item.due}</span>}
                        </div>
                        {/* Actions */}
                        {isDeleting ? (
                          <div style={{ display: "flex", gap: 4, alignItems: "center", flexShrink: 0 }}>
                            <span style={{ fontSize: 10, color: "#888" }}>Delete?</span>
                            <button onClick={() => deleteItem(item.id)} style={{ padding: "2px 8px", background: RED, border: "none", borderRadius: 4, color: "#fff", fontSize: 10, cursor: "pointer" }}>Yes</button>
                            <button onClick={() => setCheckDeleteId(null)} style={{ padding: "2px 8px", background: "transparent", border: "1px solid #333", borderRadius: 4, color: "#666", fontSize: 10, cursor: "pointer" }}>No</button>
                          </div>
                        ) : (
                          <div style={{ display: "flex", gap: 4, opacity: 0.4, flexShrink: 0 }} className="item-actions">
                            <button onClick={() => startEditItem(item)} title="Edit"
                              style={{ padding: "2px 7px", background: "transparent", border: "1px solid #2a2a2a", borderRadius: 4, color: "#aaa", fontSize: 10, cursor: "pointer" }}>✏️</button>
                            <button onClick={() => setCheckDeleteId(item.id)} title="Delete"
                              style={{ padding: "2px 7px", background: "transparent", border: "1px solid #2a1010", borderRadius: 4, color: "#7A0F12", fontSize: 10, cursor: "pointer" }}>🗑</button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                  {/* Add item to this section inline */}
                  <button onClick={() => { setShowAddItem(true); setNewItemSection(sec); setShowAddSection(false); window.scrollTo(0,0); }}
                    style={{ padding: "7px 12px", background: "transparent", border: `1px dashed #222`, borderRadius: 7, color: "#444", fontSize: 11, fontFamily: "Georgia", cursor: "pointer", textAlign: "left" }}>
                    + add item to {sec.replace(/^[^\s]+ /, "")}
                  </button>
                </div>
              </div>
            );
          })}
          {checkItems.length === 0 && (
            <div style={{ textAlign: "center", color: "#444", padding: "60px 0", fontFamily: "Georgia", fontSize: 14 }}>No items yet. Add a section and start building your checklist.</div>
          )}
        </div>
      )}

      {/* ── POSES TAB ── */}
      {mainTab === "poses" && (() => {
        const poseSettings = ["All", "Dark Studio", "White Seamless Studio", "Kitchen / Studio", "Outdoor / Bright Kitchen", "Sobeys Store — Day 2", "Real Kitchen", "Bakery / Production Kitchen", "Dark Seamless Studio", "Other"];
        const filtered = poseFilter === "All" ? poses : poses.filter(p => p.setting === poseFilter);
        const inp = { background: "#0d0d0d", border: "1px solid #2a2a2a", borderRadius: 4, color: "#E0D9CE", fontFamily: "Georgia, serif", fontSize: 12, padding: "5px 8px", outline: "none", width: "100%" };

        const updatePose = (id, field, val) => setPoses(prev => prev.map(p => p.id === id ? { ...p, [field]: val } : p));
        const deletePose = (id) => { setPoses(prev => prev.filter(p => p.id !== id)); if (selectedPose === id) setSelectedPose(null); if (poseDeleteConfirm === id) setPoseDeleteConfirm(null); };
        const addPose = () => {
          const newId = Date.now();
          setPoses(prev => [...prev, { id: newId, title: "New Pose", ref: "", refDesc: "", gspVersion: "", setting: "Dark Studio", energy: "", pinsa: "", hands: "", expression: "", lighting: "", pose: "arms_crossed_behind", color: GOLD }]);
          setSelectedPose(newId);
          setPoseEditing(newId);
        };

        return (
          <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px 60px" }}>
            {/* Toolbar */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {poseSettings.map(s => (
                  <button key={s} onClick={() => setPoseFilter(s)} style={{ padding: "5px 12px", borderRadius: 20, border: `1px solid ${poseFilter === s ? GOLD : "#222"}`, background: poseFilter === s ? `${GOLD}18` : "transparent", color: poseFilter === s ? GOLD : "#555", fontSize: 11, cursor: "pointer", fontFamily: "Georgia" }}>{s}</button>
                ))}
              </div>
              <button className="btn" onClick={addPose} style={{ padding: "7px 18px", background: GOLD, border: "none", borderRadius: 6, color: "#000", fontFamily: "'Bebas Neue'", fontSize: 13, letterSpacing: "0.1em", cursor: "pointer", flexShrink: 0 }}>+ ADD POSE</button>
            </div>

            {/* Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
              {filtered.map(pose => {
                const isOpen = selectedPose === pose.id;
                const isEditing = poseEditing === pose.id;
                return (
                  <div key={pose.id}
                    style={{ background: isOpen ? "#111" : "#0b0b0b", border: `1px solid ${isOpen ? pose.color : "#1a1a1a"}`, borderRadius: 10, overflow: "hidden", transition: "border-color 0.2s" }}>

                    {/* SVG diagram — click to toggle open */}
                    <div onClick={() => { setSelectedPose(isOpen ? null : pose.id); if (isOpen) setPoseEditing(null); }}
                      style={{ background: "#080808", padding: 12, height: 148, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                      <div style={{ width: 116, height: 130 }}>
                        <PoseSVG pose={pose.pose} color={pose.color} />
                      </div>
                    </div>

                    {/* Card header */}
                    <div style={{ padding: "10px 12px" }} onClick={() => { setSelectedPose(isOpen ? null : pose.id); if (isOpen) setPoseEditing(null); }} className="row" style2={{ cursor: "pointer" }}>
                      {isEditing ? (
                        <div onClick={e => e.stopPropagation()}>
                          <input value={pose.title} onChange={e => updatePose(pose.id, "title", e.target.value)}
                            style={{ ...inp, marginBottom: 5, fontFamily: "'Bebas Neue'", fontSize: 13 }} placeholder="Pose title" />
                          <div style={{ display: "flex", gap: 5 }}>
                            <input value={pose.energy} onChange={e => updatePose(pose.id, "energy", e.target.value)}
                              style={{ ...inp, fontSize: 10 }} placeholder="Energy / tone" />
                            <input value={pose.color} onChange={e => updatePose(pose.id, "color", e.target.value)}
                              style={{ ...inp, width: 70, fontFamily: "monospace" }} placeholder="#color" />
                          </div>
                        </div>
                      ) : (
                        <div style={{ cursor: "pointer" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                            <span style={{ fontFamily: "'Bebas Neue'", fontSize: 10, color: pose.color, letterSpacing: "0.15em" }}>POSE {String(pose.id).toString().slice(-2).padStart(2,"0")}</span>
                            <span style={{ fontSize: 9, color: "#444" }}>{pose.setting}</span>
                          </div>
                          <div style={{ fontSize: 13, color: "#E0D9CE", marginBottom: 3, lineHeight: 1.3 }}>{pose.title}</div>
                          <div style={{ fontSize: 10, color: "#666", fontStyle: "italic" }}>{pose.energy}</div>
                        </div>
                      )}
                    </div>

                    {/* Expanded detail */}
                    {isOpen && (
                      <div style={{ padding: "0 12px 14px", borderTop: "1px solid #1a1a1a", paddingTop: 10 }} onClick={e => e.stopPropagation()}>

                        {/* Edit / Done / Delete buttons */}
                        <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
                          {isEditing ? (
                            <button className="btn" onClick={() => setPoseEditing(null)}
                              style={{ flex: 1, padding: "6px", background: GOLD, border: "none", borderRadius: 6, color: "#000", fontFamily: "'Bebas Neue'", fontSize: 12, cursor: "pointer" }}>✓ DONE</button>
                          ) : (
                            <button className="btn" onClick={() => setPoseEditing(pose.id)}
                              style={{ flex: 1, padding: "6px", background: RED, border: "none", borderRadius: 6, color: "#fff", fontSize: 12, cursor: "pointer" }}>Edit</button>
                          )}
                          {poseDeleteConfirm === pose.id ? (
                            <>
                              <button className="btn" onClick={() => deletePose(pose.id)}
                                style={{ padding: "6px 10px", background: "#4a1010", border: "1px solid #C97A7A", borderRadius: 6, color: "#C97A7A", fontSize: 11, cursor: "pointer" }}>Confirm Delete</button>
                              <button className="btn" onClick={() => setPoseDeleteConfirm(null)}
                                style={{ padding: "6px 8px", background: "#111", border: "1px solid #2a2a2a", borderRadius: 6, color: "#666", fontSize: 11, cursor: "pointer" }}>✕</button>
                            </>
                          ) : (
                            <button className="btn" onClick={() => setPoseDeleteConfirm(pose.id)}
                              style={{ padding: "6px 10px", background: "#111", border: "1px solid #222", borderRadius: 6, color: "#444", fontSize: 12, cursor: "pointer" }}>🗑</button>
                          )}
                        </div>

                        {/* Reference section */}
                        <div style={{ fontSize: 10, color: pose.color, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 5, fontFamily: "'Bebas Neue'" }}>Reference</div>
                        {pose.refImg && !isEditing && (
                          <div style={{ marginBottom: 8, borderRadius: 6, overflow: "hidden", border: `1px solid ${pose.color}33` }}>
                            <img src={pose.refImg} alt={pose.ref} style={{ width: "100%", height: 100, objectFit: "cover", display: "block", opacity: 0.85 }} />
                          </div>
                        )}
                        {isEditing ? (
                          <div style={{ marginBottom: 10 }}>
                            <input value={pose.ref} onChange={e => updatePose(pose.id, "ref", e.target.value)}
                              style={{ ...inp, marginBottom: 5 }} placeholder="Reference name (e.g. Conor / Proper Twelve)" />
                            <textarea value={pose.refDesc} onChange={e => updatePose(pose.id, "refDesc", e.target.value)} rows={2}
                              style={{ ...inp, resize: "vertical" }} placeholder="Reference description..." />
                          </div>
                        ) : (
                          <div style={{ fontSize: 11, color: "#777", fontStyle: "italic", marginBottom: 10, lineHeight: 1.5 }}>{pose.ref}{pose.refDesc ? ` — ${pose.refDesc}` : ""}</div>
                        )}

                        {/* GSP Version */}
                        <div style={{ fontSize: 10, color: GOLD, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 5, fontFamily: "'Bebas Neue'" }}>GSP Version</div>
                        {isEditing ? (
                          <textarea value={pose.gspVersion} onChange={e => updatePose(pose.id, "gspVersion", e.target.value)} rows={3}
                            style={{ ...inp, resize: "vertical", marginBottom: 10, lineHeight: 1.5 }} placeholder="Describe GSP's version of this pose..." />
                        ) : (
                          <div style={{ fontSize: 12, color: "#C8C0B4", marginBottom: 10, lineHeight: 1.6 }}>{pose.gspVersion}</div>
                        )}

                        {/* 4-field grid */}
                        {isEditing ? (
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 8 }}>
                            {[["pinsa","Pinsa"], ["hands","Hands"], ["expression","Expression"], ["lighting","Lighting"]].map(([field, label]) => (
                              <div key={field} style={{ background: "#0d0d0d", borderRadius: 6, padding: "7px 9px" }}>
                                <div style={{ fontSize: 9, color: "#555", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4, fontFamily: "'Bebas Neue'" }}>{label}</div>
                                <textarea value={pose[field]} onChange={e => updatePose(pose.id, field, e.target.value)} rows={2}
                                  style={{ ...inp, padding: "4px 6px", fontSize: 11, resize: "vertical" }} />
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                            {[["Pinsa", pose.pinsa], ["Hands", pose.hands], ["Expression", pose.expression], ["Lighting", pose.lighting]].map(([label, val]) => (
                              <div key={label} style={{ background: "#0d0d0d", borderRadius: 6, padding: "7px 9px" }}>
                                <div style={{ fontSize: 9, color: "#555", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 2, fontFamily: "'Bebas Neue'" }}>{label}</div>
                                <div style={{ fontSize: 11, color: "#888", lineHeight: 1.4 }}>{val}</div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Setting field when editing */}
                        {isEditing && (
                          <div style={{ marginTop: 8 }}>
                            <div style={{ fontSize: 9, color: "#555", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4, fontFamily: "'Bebas Neue'" }}>Setting / Location</div>
                            <input value={pose.setting} onChange={e => updatePose(pose.id, "setting", e.target.value)}
                              style={inp} placeholder="e.g. Dark Studio" />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })()}

      {/* ── SCRIPTS TAB ── */}
      {mainTab === "scripts" && <div style={{ display: "flex", height: "calc(100vh - 52px)", flex: 1 }}>

        {/* ── LEFT: SERIES + SCRIPT LIST ── */}
        {sidebarOpen && (
          <div style={{ width: 260, borderRight: "1px solid #181818", display: "flex", flexDirection: "column", flexShrink: 0, overflow: "hidden" }}>
            {/* Series tabs */}
            <div style={{ padding: "10px 10px 6px", borderBottom: "1px solid #181818", display: "flex", flexWrap: "wrap", gap: 4 }}>
              {SERIES_LIST.map(s => {
                const count = scripts.filter(sc => sc.series === s.key).length;
                const isActive = activeSeries === s.key;
                return (
                  <button key={s.key} onClick={() => { setActiveSeries(s.key); const first = scripts.find(sc => sc.series === s.key); if (first) setActiveId(first.id); }}
                    style={{ padding: "4px 10px", borderRadius: 20, border: `1px solid ${isActive ? s.color : "#222"}`, background: isActive ? `${s.color}18` : "transparent", color: isActive ? s.color : "#555", fontSize: 10, cursor: "pointer", fontFamily: "Georgia", display: "flex", alignItems: "center", gap: 4 }}>
                    {s.label}
                    {count > 0 && <span style={{ background: isActive ? s.color : "#333", color: isActive ? "#000" : "#777", borderRadius: 10, padding: "0 5px", fontSize: 9 }}>{count}</span>}
                  </button>
                );
              })}
            </div>

            {/* Script list */}
            <div style={{ flex: 1, overflowY: "auto" }}>
              {seriesScripts.length === 0 ? (
                <div style={{ padding: 20, textAlign: "center", color: "#444", fontSize: 12, fontStyle: "italic" }}>
                  No scripts in this series yet.<br />
                  <span style={{ color: GOLD, cursor: "pointer" }} onClick={() => { setNewSeries(activeSeries); setShowNewModal(true); }}>+ Add one</span>
                </div>
              ) : seriesScripts.map((s) => {
                const isActive = activeId === s.id;
                return (
                  <div key={s.id} className="row" onClick={() => { setActiveId(s.id); setEditing(false); setDraft(null); setActiveVersion(0); }}
                    style={{ padding: "13px 16px", cursor: "pointer", background: isActive ? "#111" : "transparent", borderLeft: `3px solid ${isActive ? seriesColor : "transparent"}`, borderBottom: "1px solid #111" }}>
                    {s.number && <div style={{ fontFamily: "'Bebas Neue'", fontSize: 10, color: isActive ? seriesColor : "#444", letterSpacing: "0.2em", marginBottom: 3 }}>#{s.number}</div>}
                    <div style={{ fontSize: 13, color: isActive ? "#E0D9CE" : "#888", lineHeight: 1.4 }}>{s.title}</div>
                    {s.topic && <div style={{ fontSize: 10, color: "#444", marginTop: 3 }}>{s.topic}</div>}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── RIGHT: SCRIPT PANEL ── */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>
          {!current ? (
            <div style={{ textAlign: "center", color: "#444", paddingTop: 80 }}>
              <div style={{ fontFamily: "'Bebas Neue'", fontSize: 24, marginBottom: 8 }}>NO SCRIPT SELECTED</div>
              <div style={{ fontSize: 13 }}>Select a series and script from the left, or add a new one.</div>
            </div>
          ) : (
            <>
              {/* Script header */}
              <div style={{ marginBottom: 20, paddingBottom: 18, borderBottom: "1px solid #181818" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 10 }}>
                  <div style={{ flex: 1 }}>
                    {editing ? (
                      <div style={{ display: "flex", gap: 10, marginBottom: 8 }}>
                        <input value={draft.number} onChange={e => setDraft(d => ({...d, number: e.target.value}))}
                          placeholder="Ep #" style={{ ...inpStyle, width: 60 }} />
                        <input value={draft.title} onChange={e => setDraft(d => ({...d, title: e.target.value}))}
                          placeholder="Script title" style={{ ...inpStyle, flex: 1, fontSize: 16, fontFamily: "'Bebas Neue'", letterSpacing: "0.06em" }} />
                      </div>
                    ) : (
                      <h1 style={{ fontFamily: "'Bebas Neue'", fontSize: 28, color: "#fff", letterSpacing: "0.06em", marginBottom: 4 }}>{current.title}</h1>
                    )}
                    {editing ? (
                      <div style={{ display: "flex", gap: 10 }}>
                        <input value={draft.topic} onChange={e => setDraft(d => ({...d, topic: e.target.value}))}
                          placeholder="Topic / category" style={{ ...inpStyle, fontSize: 12 }} />
                        <select value={draft.series} onChange={e => setDraft(d => ({...d, series: e.target.value}))}
                          style={{ ...inpStyle, width: 160 }}>
                          {SERIES_LIST.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
                        </select>
                      </div>
                    ) : (
                      <div style={{ fontSize: 11, color: "#555" }}>
                        <span style={{ color: seriesColor }}>{SERIES_MAP[current.series]?.label}</span>
                        {current.topic && <span> · {current.topic}</span>}
                      </div>
                    )}
                  </div>
                  {/* Action buttons */}
                  <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                    {editing ? (
                      <>
                        <button className="btn" onClick={cancelEdit} style={{ padding: "6px 14px", background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 6, color: "#888", cursor: "pointer", fontSize: 12 }}>Cancel</button>
                        <button className="btn" onClick={saveEdit} style={{ padding: "6px 14px", background: GOLD, border: "none", borderRadius: 6, color: "#000", fontFamily: "'Bebas Neue'", fontSize: 13, cursor: "pointer", letterSpacing: "0.08em" }}>SAVE</button>
                      </>
                    ) : (
                      <>
                        <button className="btn" onClick={copyScript} style={{ padding: "6px 12px", background: copied ? "#1a4a2a" : "#111", border: `1px solid ${copied ? "#6BBF8E" : "#2a2a2a"}`, borderRadius: 6, color: copied ? "#6BBF8E" : "#666", cursor: "pointer", fontSize: 12 }}>{copied ? "✓ Copied" : "Copy"}</button>
                        <button className="btn" onClick={duplicateScript} style={{ padding: "6px 12px", background: "#111", border: "1px solid #2a2a2a", borderRadius: 6, color: "#666", cursor: "pointer", fontSize: 12 }}>Duplicate</button>
                        <button className="btn" onClick={startEdit} style={{ padding: "6px 14px", background: RED, border: "none", borderRadius: 6, color: "#fff", cursor: "pointer", fontSize: 12 }}>Edit</button>
                        {deleteConfirm === current.id ? (
                          <>
                            <button className="btn" onClick={() => deleteScript(current.id)} style={{ padding: "6px 12px", background: "#4a1010", border: "1px solid #C97A7A", borderRadius: 6, color: "#C97A7A", cursor: "pointer", fontSize: 12 }}>Confirm Delete</button>
                            <button className="btn" onClick={() => setDeleteConfirm(null)} style={{ padding: "6px 10px", background: "#111", border: "1px solid #2a2a2a", borderRadius: 6, color: "#666", cursor: "pointer", fontSize: 12 }}>✕</button>
                          </>
                        ) : (
                          <button className="btn" onClick={() => setDeleteConfirm(current.id)} style={{ padding: "6px 10px", background: "#111", border: "1px solid #2a2a2a", borderRadius: 6, color: "#444", cursor: "pointer", fontSize: 12 }}>🗑</button>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* Viral angle */}
                {editing ? (
                  <div style={{ marginTop: 10 }}>
                    <div style={{ fontSize: 10, color: GOLD, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 5, fontFamily: "'Bebas Neue'" }}>⚡ Viral Angle</div>
                    <textarea value={draft.viralangle} onChange={e => setDraft(d => ({...d, viralangle: e.target.value}))} rows={2}
                      style={{ ...inpStyle, resize: "vertical", fontSize: 13, fontStyle: "italic" }} placeholder="Why will this go viral?" />
                  </div>
                ) : current.viralangle ? (
                  <div style={{ background: "#7A0F1215", border: "1px solid #7A0F1233", borderRadius: 7, padding: "10px 14px", marginTop: 10 }}>
                    <div style={{ fontSize: 10, color: GOLD, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 4, fontFamily: "'Bebas Neue'" }}>⚡ Viral Angle</div>
                    <div style={{ fontSize: 13, color: "#C8C0B4", lineHeight: 1.6, fontStyle: "italic" }}>{current.viralangle}</div>
                  </div>
                ) : null}
              </div>

              {/* Version tabs */}
              <div style={{ display: "flex", gap: 6, marginBottom: 18, flexWrap: "wrap", alignItems: "center" }}>
                {(editing ? draft : current).versions.map((v, i) => (
                  <button key={i} className="btn" onClick={() => setActiveVersion(i)} style={{
                    padding: "6px 16px", borderRadius: 6, border: "none", cursor: "pointer",
                    background: activeVersion === i ? GOLD : "#111",
                    color: activeVersion === i ? "#000" : "#666",
                    fontFamily: "'Bebas Neue'", fontSize: 12, letterSpacing: "0.08em",
                  }}>{v.label || `Version ${i+1}`}</button>
                ))}
                {editing && (
                  <button className="btn" onClick={() => {
                    setDraft(d => ({ ...d, versions: [...d.versions, { label: "New Version", lines: [{ type: "hook", text: "" }] }] }));
                    setActiveVersion((editing ? draft : current).versions.length);
                  }} style={{ padding: "6px 14px", background: "#111", border: "1px dashed #333", borderRadius: 6, color: "#555", cursor: "pointer", fontSize: 12 }}>+ Add Version</button>
                )}
              </div>

              {/* Script lines */}
              <div style={{ marginBottom: 24 }}>
                {editing ? (
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                      <input value={draft.versions[activeVersion]?.label || ""} onChange={e => setDraft(d => { const v = [...d.versions]; v[activeVersion] = { ...v[activeVersion], label: e.target.value }; return { ...d, versions: v }; })}
                        style={{ ...inpStyle, width: 220, fontSize: 12 }} placeholder="Version label (e.g. 30–45s)" />
                      {draft.versions.length > 1 && (
                        <button className="btn" onClick={() => { setDraft(d => { const v = d.versions.filter((_, i) => i !== activeVersion); return { ...d, versions: v }; }); setActiveVersion(0); }}
                          style={{ padding: "5px 12px", background: "#2a1010", border: "1px solid #C97A7A33", borderRadius: 6, color: "#C97A7A", cursor: "pointer", fontSize: 11 }}>Remove Version</button>
                      )}
                    </div>
                    <LineEditor lines={draft.versions[activeVersion]?.lines || []} onChange={lines => setDraft(d => { const v = [...d.versions]; v[activeVersion] = { ...v[activeVersion], lines }; return { ...d, versions: v }; })} />
                  </div>
                ) : (
                  <div>
                    {current.versions[activeVersion]?.lines.map((line, i) => {
                      const st = TYPE_STYLE[line.type] || {};
                      return (
                        <div key={i} style={{ marginBottom: line.type === "beat" ? 16 : 9 }}>
                          <span style={{ ...st, lineHeight: 1.8, display: "block" }}>{line.text}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Direction notes */}
              <div style={{ background: "#0d0d0d", border: "1px solid #1e1e1e", borderRadius: 8, padding: "14px 16px", marginBottom: 20 }}>
                <div style={{ fontSize: 10, color: GOLD, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 6, fontFamily: "'Bebas Neue'" }}>🎬 Director Notes</div>
                {editing ? (
                  <textarea value={draft.direction} onChange={e => setDraft(d => ({...d, direction: e.target.value}))} rows={3}
                    style={{ ...inpStyle, resize: "vertical", fontStyle: "italic", fontSize: 13 }} placeholder="On-set direction for GSP..." />
                ) : (
                  <div style={{ fontSize: 13, color: "#777", lineHeight: 1.7, fontStyle: "italic" }}>{current.direction || "—"}</div>
                )}
              </div>

              {/* Hooks quick ref (view only) */}
              {!editing && seriesScripts.length > 1 && (
                <div style={{ background: "#0a0a0a", border: "1px solid #181818", borderRadius: 8, padding: "14px 16px" }}>
                  <div style={{ fontSize: 10, color: "#444", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12, fontFamily: "'Bebas Neue'" }}>
                    {SERIES_MAP[activeSeries]?.label} — All Hooks
                  </div>
                  {seriesScripts.map((s, i) => (
                    <div key={s.id} onClick={() => setActiveId(s.id)} style={{ display: "flex", gap: 10, padding: "7px 0", borderBottom: i < seriesScripts.length - 1 ? "1px solid #111" : "none", cursor: "pointer", opacity: activeId === s.id ? 1 : 0.5 }}>
                      <span style={{ fontFamily: "'Bebas Neue'", fontSize: 10, color: seriesColor, minWidth: 24 }}>{s.number || "—"}</span>
                      <span style={{ fontSize: 12, color: "#C8C0B4", fontStyle: "italic", lineHeight: 1.5 }}>"{s.hook || s.title}"</span>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>}

      {/* ── NEW SCRIPT MODAL ── */}
      {showNewModal && (
        <div style={{ position: "fixed", inset: 0, background: "#000000cc", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#111", border: `1px solid ${GOLD}44`, borderRadius: 12, padding: 28, width: 340 }}>
            <div style={{ fontFamily: "'Bebas Neue'", fontSize: 20, color: GOLD, letterSpacing: "0.1em", marginBottom: 16 }}>NEW SCRIPT</div>
            <div style={{ fontSize: 11, color: "#666", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8, fontFamily: "'Bebas Neue'" }}>Series</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
              {SERIES_LIST.map(s => (
                <button key={s.key} onClick={() => setNewSeries(s.key)} style={{ padding: "5px 12px", borderRadius: 20, border: `1px solid ${newSeries === s.key ? s.color : "#2a2a2a"}`, background: newSeries === s.key ? `${s.color}20` : "transparent", color: newSeries === s.key ? s.color : "#555", fontSize: 11, cursor: "pointer" }}>
                  {s.label}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn" onClick={() => setShowNewModal(false)} style={{ flex: 1, padding: "10px", background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 8, color: "#666", cursor: "pointer" }}>Cancel</button>
              <button className="btn" onClick={addScript} style={{ flex: 1, padding: "10px", background: GOLD, border: "none", borderRadius: 8, color: "#000", fontFamily: "'Bebas Neue'", fontSize: 14, letterSpacing: "0.1em", cursor: "pointer" }}>CREATE</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
