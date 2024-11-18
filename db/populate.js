let pool = require("./pool");
const { Client } = require("pg");

const SQL = `CREATE TABLE IF NOT EXISTS members (
   id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
   firstName VARCHAR (255),
   lastName VARCHAR (255),
   email VARCHAR (255),
   password VARCHAR ( 255 ),
  isAdmin BOOLEAN DEFAULT false,
  membership BOOLEAN DEFAULT false
)`;

const SQL2 = `
CREATE TABLE IF NOT EXISTS messages (
   id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
title TEXT,
timestamp TEXT,
body TEXT,
author INTEGER,
isSecret BOOLEAN DEFAULT false

)
`;

const SQL3 = `
INSERT INTO messages (title, timestamp, body, author, isSecret) VALUES 
('Welcome Message', '2024-11-16 08:00:00', 
'Welcome to our community! We are excited to have you here. This platform is designed to help you connect, learn, and grow. Feel free to explore the various sections, join discussions, and share your thoughts. We are committed to fostering a positive and inclusive environment for all members. If you have any questions, our support team is always here to help!', 
1, false),

('Maintenance Update', '2024-11-15 14:30:00', 
'Our servers will undergo scheduled maintenance tonight from 11 PM to 2 AM. During this time, you may experience intermittent access to the site. We are performing these updates to improve performance and reliability. We apologize for any inconvenience caused and appreciate your patience. We recommend saving your work and logging out before the maintenance window begins.', 
1, false),

('Secret Announcement', '2024-11-14 10:15:00', 
'This is a confidential message intended only for administrators. Please do not share this information with non-admin users. We are planning a major feature release next month, and we need to prepare accordingly. More details will be shared in our upcoming meeting. Let’s ensure we’re all aligned for a smooth rollout.', 
1, true),

('Weekly Tips', '2024-11-13 09:00:00', 
'Here are some helpful tips to get the most out of your week: 1) Start each day with a to-do list to stay organized. 2) Take short breaks after every 90 minutes of focused work to recharge. 3) Keep your workspace clutter-free to boost productivity. 4) Remember to stay hydrated and take care of your mental well-being. Wishing you a productive and positive week ahead!', 
1, false),

('Event Reminder', '2024-11-12 16:45:00', 
'Don’t miss our live Q&A session this Friday at 7 PM! Our special guest is an industry expert who will be discussing the latest trends in technology and innovation. This is a great opportunity to ask questions, network with fellow members, and gain valuable insights. Be sure to mark your calendar and join us for an engaging and informative session.', 
1, false),

('Holiday Notice', '2024-11-11 12:00:00', 
'Our office will be closed from December 24th to January 2nd for the holiday season. During this time, support may be limited, but we will do our best to respond to urgent inquiries. We hope you have a wonderful holiday filled with joy, relaxation, and time spent with loved ones. Thank you for being a part of our community this year!', 
1, false),

('Feedback Request', '2024-11-10 18:30:00', 
'We are constantly striving to improve our platform, and your feedback is invaluable to us. If you have a few minutes, we would love to hear your thoughts on our recent updates and how we can enhance your experience. Please take our short survey, and let us know what you think. Your feedback will help shape the future of our community.', 
1, false),

('Hidden Easter Egg', '2024-11-09 07:00:00', 
'Congratulations! You have found a hidden message on our platform. This is a special Easter egg for our curious users who love to explore. As a token of appreciation, we are offering you a unique badge that you can showcase on your profile. Keep exploring and discovering new things – you never know what you might find!', 
1, true),

('New Feature Alert', '2024-11-08 11:20:00', 
'We are excited to announce the launch of our brand-new feature: Real-time Collaboration! Now you can work together with your peers on projects, documents, and more in real-time. This feature is designed to enhance productivity and teamwork. Try it out and let us know what you think. Your feedback is crucial as we continue to improve the platform.', 
1, false),

('Bug Fixes', '2024-11-07 22:10:00', 
'We have just rolled out several bug fixes and improvements to enhance your experience. These fixes address issues reported by our community, including performance optimizations, UI enhancements, and security updates. Thank you for your patience and for helping us identify these issues. Please continue to provide feedback so we can make our platform even better!', 
1, false);

`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: "postgresql://postgres:root@localhost:5432/top_users",
  });
  await client.connect();
  await client.query(SQL);
  await client.query(SQL2);
  await client.query(SQL3);
  await client.query(SQL4);
  await client.query(SQL5);

  await client.end();
  console.log("done");
}

main();
