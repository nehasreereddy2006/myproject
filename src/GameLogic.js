export const emojiPuzzles = [
  { emoji: "💻🛡️", answer: "security" },
  { emoji: "🌐📡", answer: "internet" },
  { emoji: "🔐📂", answer: "privacy" },
  { emoji: "🧠⚠️", answer: "awareness" },
  { emoji: "📡🔗", answer: "network" },
  { emoji: "🕵️‍♂️💻", answer: "hacker" },
  { emoji: "💾🔍", answer: "forensics" },
  { emoji: "⚠️📧", answer: "phishing" },
  { emoji: "🧩🔐", answer: "encryption" },
  { emoji: "🧠📊", answer: "analysis" }
];

export const qrScenarios = [
  {
    fakeMessage: "Your parcel delivery failed. Scan the QR code to update your address.",
    realMessage: "Track your parcel using the official courier website or mobile app.",
    explanation: "Delivery companies never ask users to scan random QR codes to confirm addresses."
  },
  {
    fakeMessage: "Scan this QR code to receive your scholarship payment.",
    realMessage: "Official scholarship updates are always provided through government portals.",
    explanation: "Government payments never require QR scans from unknown sources."
  },
  {
    fakeMessage: "You won a ₹5000 voucher. Scan the QR code to claim it.",
    realMessage: "Legitimate offers are usually available through verified apps or official websites.",
    explanation: "Unexpected rewards asking you to scan QR codes are a common scam tactic."
  },
  {
    fakeMessage: "Your bank account needs verification. Scan the QR code immediately.",
    realMessage: "Banks require verification only through their official apps or secure websites.",
    explanation: "Banks never ask users to verify accounts by scanning random QR codes."
  }
];

export const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const sampleEmails = [
  {
    id: 1,
    sender: 'Google Security',
    subject: 'New sign-in from Chrome on Windows',
    preview: 'We noticed a new login to your Google Account from a Windows device.',
    time: '10:42 AM',
    isReal: true,
    content: 'We noticed a new login to your Google Account from a Windows device. If this was you, you don\'t need to do anything. If not, we\'ll help you secure your account.',
    explanation: 'Correct! This is a genuine security alert. Notice the sender name and lack of urgent threats or suspicious links.'
  },
  {
    id: 2,
    sender: 'YouTube',
    subject: 'Your weekly YouTube report',
    preview: 'Here’s how your videos performed this week.',
    time: '9:15 AM',
    isReal: true,
    content: 'Hi there,\n\nHere’s how your videos performed this week. Log in to your Studio dashboard to see more detailed analytics.',
    explanation: 'Correct! This is a standard weekly report from YouTube.'
  },
  {
    id: 3,
    sender: 'Amazon',
    subject: 'Your order has been shipped',
    preview: 'Track your package and delivery details here.',
    time: 'Yesterday',
    isReal: true,
    content: 'Hello,\n\nYour order has been shipped and is on its way. Track your package and delivery details here.',
    explanation: 'Correct! This is a standard shipping notification without any suspicious requests for payment or personal info.'
  },
  {
    id: 4,
    sender: 'University Admin',
    subject: 'Semester timetable updated',
    preview: 'The new timetable for the upcoming semester has been uploaded.',
    time: 'Yesterday',
    isReal: true,
    content: 'Dear Students,\n\nThe new timetable for the upcoming semester has been uploaded to the student portal. Please review your schedules.',
    explanation: 'Correct! This looks like a legitimate internal university email.'
  },
  {
    id: 5,
    sender: 'GitHub',
    subject: 'Security alert for your repository',
    preview: 'A new device signed into your GitHub account.',
    time: '2 days ago',
    isReal: true,
    content: 'A new device signed into your GitHub account. Please review your active sessions to ensure your account is secure.',
    explanation: 'Correct! This is a standard security alert from GitHub alerting you of a new login.'
  },
  {
    id: 6,
    sender: 'G00gle Support',
    subject: 'Urgent! Verify your account immediately',
    preview: 'Your Gmail account will be suspended unless you verify now.',
    time: '8:00 AM',
    isReal: false,
    content: 'Dear User,\n\nYour Gmail account will be suspended unless you verify now. Click here to confirm your details immediately: http://g00gle-verify-now.com',
    explanation: 'Incorrect. Look carefully for phishing clues. The sender name is spelled "G00gle", there is a fake sense of urgency, and the link is suspicious.'
  },
  {
    id: 7,
    sender: 'PayPaI Security',
    subject: 'Suspicious login attempt',
    preview: 'Click here to secure your PayPal account immediately.',
    time: '11:30 AM',
    isReal: false,
    content: 'We noticed a suspicious login attempt on your account. Click here to secure your PayPal account immediately or it will be locked: http://paypal-secure-login-update.net',
    explanation: 'Incorrect. Look carefully for phishing clues. Note the sender name "PayPaI" (capital i instead of L), the urgent threat to lock the account, and the fake URL.'
  },
  {
    id: 8,
    sender: 'Netflix Billing',
    subject: 'Payment failed – Update card now',
    preview: 'Your subscription will stop if payment is not updated.',
    time: '1:45 PM',
    isReal: false,
    content: 'Hi Customer,\n\nYour recent payment failed. Your subscription will stop if payment is not updated within 24 hours. Update your billing details here: http://netflix-billing-update-now.com',
    explanation: 'Incorrect. Look carefully for phishing clues. The generic greeting "Hi Customer", artificial urgency ("within 24 hours"), and suspicious link indicate a scam.'
  },
  {
    id: 9,
    sender: 'Bank Alert',
    subject: 'Confirm your account information',
    preview: 'Due to security reasons please confirm your banking details.',
    time: '3:20 PM',
    isReal: false,
    content: 'Dear Customer,\n\nDue to security reasons please confirm your banking details immediately to prevent a hold on your account. Click here to verify: http://secure-bank-verification.com',
    explanation: 'Incorrect. Look carefully for phishing clues. Banks do not ask you to confirm banking details via email links, especially with threats to place a hold on your account.'
  },
  {
    id: 10,
    sender: 'Apple Support Team',
    subject: 'Your Apple ID has been locked',
    preview: 'Click the link below to unlock your account.',
    time: '4:55 PM',
    isReal: false,
    content: 'Your Apple ID has been locked due to multiple failed login attempts. Click the link below to unlock your account immediately: http://apple-id-unlock-service.net',
    explanation: 'Incorrect. Look carefully for phishing clues. The email uses urgency and a suspicious non-Apple domain (apple-id-unlock-service.net) to steal credentials.'
  }
];

export const contacts = [
  {
    id: 1,
    name: 'JioIndia',
    avatar: '📱',
    isReal: true,
    history: [
      { sender: 'them', text: 'Your data pack will expire tomorrow. Recharge using the MyJio app.' }
    ],
    explanation: 'Correct! This is a standard expiration notice from a service provider.'
  },
  {
    id: 2,
    name: 'College Admin',
    avatar: '🎓',
    isReal: true,
    history: [
      { sender: 'them', text: 'Tomorrow’s seminar will start at 10 AM in Seminar Hall 2.' }
    ],
    explanation: 'Correct! This is a typical administrative announcement.'
  },
  {
    id: 3,
    name: 'Amazon',
    avatar: '📦',
    isReal: true,
    history: [
      { sender: 'them', text: 'Your order has been delivered. Thank you for shopping with us.' }
    ],
    explanation: 'Correct! This is a standard delivery confirmation.'
  },
  {
    id: 4,
    name: 'Friend',
    avatar: '👤',
    isReal: true,
    history: [
      { sender: 'them', text: 'Hey are we meeting in the lab today?' }
    ],
    explanation: 'Correct! This is a normal conversational message from a known contact.'
  },
  {
    id: 5,
    name: 'OTP Service',
    avatar: '🔐',
    isReal: true,
    history: [
      { sender: 'them', text: 'Your OTP for login is 483921. Do not share it with anyone.' }
    ],
    explanation: 'Correct! This is a standard OTP message with the expected warning not to share it.'
  },
  {
    id: 6,
    name: 'Unknown Number',
    avatar: '?',
    isReal: false,
    history: [
      { sender: 'them', text: 'Congratulations! You won ₹50,000 in a lucky draw. Click this link to claim.' }
    ],
    explanation: 'Incorrect. This relies on the false promise of free money to trick you into clicking a link.'
  },
  {
    id: 7,
    name: 'Bank Alert',
    avatar: '🏦',
    isReal: false,
    history: [
      { sender: 'them', text: 'Your bank account will be blocked today. Verify immediately here: bit.ly/secure-bank' }
    ],
    explanation: 'Incorrect. Banks do not send SMS messages threatening immediate blocking with shortlinks to verify.'
  },
  {
    id: 8,
    name: 'Lottery Dept',
    avatar: '🏆',
    isReal: false,
    history: [
      { sender: 'them', text: 'Your phone number has won a lottery of $1,000,000.' }
    ],
    explanation: 'Incorrect. You cannot win a lottery you did not enter.'
  },
  {
    id: 9,
    name: 'Paytm Support',
    avatar: '💳',
    isReal: false,
    history: [
      { sender: 'them', text: 'Your wallet will be suspended unless you confirm details here.' }
    ],
    explanation: 'Incorrect. Official support channels do not send threatening SMS regarding suspension.'
  },
  {
    id: 10,
    name: 'Unknown',
    avatar: '?',
    isReal: false,
    history: [
      { sender: 'them', text: 'Free iPhone giveaway! Register now using this link.' }
    ],
    explanation: 'Incorrect. This uses the promise of a high-value item ("Free iPhone") to trick you.'
  }
];
