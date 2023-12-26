import TelegramBot from 'node-telegram-bot-api';
import fetch from 'node-fetch';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

// set the date to tehran
process.env.TZ = 'Asia/Tehran';

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

const groupsFilePath = './groups.json';
let groups = {};

// Load existing group data
if (fs.existsSync(groupsFilePath)) {
  groups = JSON.parse(fs.readFileSync(groupsFilePath, 'utf8'));
}

const saveGroups = () => {
  fs.writeFileSync(groupsFilePath, JSON.stringify(groups, null, 2));
};

const updateGroupStatus = (chatId, status) => {
  if (status === 'added') {
    groups[chatId] = { lastUptime: new Date(), lastDowntime: null };
  } else if (status === 'removed') {
    console.log(`Removing group ${chatId}`);
    delete groups[chatId];
  }
  saveGroups();
};

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  // Handle adding bot to a group
  if (msg.text === '/start') {
    updateGroupStatus(chatId, 'added');
    // send a welcome message
    bot.sendMessage(chatId, 'Welcome to the group!');
  }

  // Implement logic for detecting bot removal and call `updateGroupStatus(chatId, 'removed')`
  // when the bot is removed from a group
  if (msg.left_chat_member) {
    updateGroupStatus(chatId, 'removed');
  }
});

let isChecking = false;

const checkInternet = async () => {
  if (isChecking) return;
  isChecking = true;
  console.log('Checking internet');
  try {
    await fetch('https://www.google.com');
    console.log('Internet is up');
    for (const chatId in groups) {
      try {
        if (groups[chatId].lastDowntime) {
          const downtimeDuration =
            (new Date() -
              (groups[chatId].lastDowntime || groups[chatId].lastUptime)) /
            1000;
          const message = await bot.sendMessage(
            chatId,
            `😬 Back online. We had a downtime of ${humanReadableTime(
              downtimeDuration || 0,
            )} seconds.`,
          );
          // this message should pinned to the group
          await bot.pinChatMessage(chatId, message.message_id);
          groups[chatId].lastUptime = new Date();
          groups[chatId].lastDowntime = null;
        }
        // send a message about internet is up and everything is fine now with time of downtime

        await bot.sendMessage(
          chatId,
          `🆙 Internet is online ${new Date().toLocaleString('en-US', {
            hour12: false,
          })}.`,
        );
      } catch (error) {
        // remove if the bot was blocked
        if (error.response.body.error_code === 403) {
          updateGroupStatus(chatId, 'removed');
        } else throw error;
      }
    }
    saveGroups();
  } catch (error) {
    console.log('Internet is down', error.message);
    for (const chatId in groups) {
      if (!groups[chatId].lastDowntime) {
        groups[chatId].lastDowntime = new Date();
      }
    }
    saveGroups();
  } finally {
    isChecking = false;
  }
};

function humanReadableTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds - hours * 3600) / 60);
  const secondsLeft = seconds - hours * 3600 - minutes * 60;
  return `${
    (hours > 0 ? hours + ' hours ' : '') +
    (minutes > 0 ? minutes + ' minutes ' : '') +
    (secondsLeft > 0 ? roundToDecimalPlaces(secondsLeft, 2) + ' seconds' : '')
  }`;
}

function roundToDecimalPlaces(num, decimalPlaces) {
  const multiplier = Math.pow(10, decimalPlaces);
  return Math.round(num * multiplier) / multiplier;
}

console.log('Bot is running');
setInterval(checkInternet, (process.env.CHECK_INTERVAL || 60) * 1000);
