const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'MAKAMESCO-MD<=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYU1FY0RVL2k4aVJPandoRXZWcDFMOEZ6WHRDSWdBVFNJOTcxNmJyRllYWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib3hSUlJmQzA0U24xOTExZkhacnZLWFJRd2F3ZkgzY2MrbDNvWS9nbHdUMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhS2FSblBmbHFNbm4xeXdDdjF5NHVzSXlKblliYUdqM25NNHF4YTAxYzBRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJa3ZSOGg1T0ZSRXl2cG5OVHF5UzlnT1Zlc0JPcTZVMVlTSCtnc3JsV2dJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktERXltV1NYbzByTmNUMU9GSERGRGhYMjhzOGJqTXJTTjcwdW5vZVRHRTA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVhdDlCV3hjQUt4M1dLVjNkQmxWUU1NK0hBYnh2U2cySXE5SmZsRDZORU09In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0hDNmJnWjBieFE1VlFSMDlGUVZDR1NlSnV1OUhwUndpSkR4eEpON1VuWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0M4MFFnQWlLRWV3MWNBTEZqWnBhYTN2Y1JoVWJRR1gzd0xoSmRiU1drOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkxuZ2xsVTBObGJRcGZvOXloUjRKUldTdUQyaTBzOUNlQjhUQm9BS2FGT2QrUUdvR3BRNFZqcGZUaHo0VjVIVzRuZ1dpTUUxZDJvMTNlbDVRVlMyekJ3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NTgsImFkdlNlY3JldEtleSI6IjkyRzFWSGpFTERkOVVYNENhWkF3bG8wMVZxUllrcmE0ZTBsQ2djS1JDNlE9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjU0NzQxNzQ5ODc2QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkQ2QjJBNjk4MDI2MDRCRDA5QjUyRDg3QkI0RUVGOUEzIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTQxMzMwMTd9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6Ijk5OUJDSzJUIiwibWUiOnsiaWQiOiIyNTQ3NDE3NDk4NzY6ODRAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiIxNDM0NzgwMTMwNTkxNzk6ODRAbGlkIiwibmFtZSI6IkRyZWFta2lkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNPZUpyQmdRaCtTM3hBWVlHeUFBS0FBPSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJnNlV6Z3lCUWt3bWdmd0tnNFpwS0tFQkpFZFpIdGxGcmF1UHJEN0xEeDBZPSIsImFjY291bnRTaWduYXR1cmUiOiJJZU5oMFhPOTJRbUQzMDJQVEd3NXptcnZIZTlVZlZpbzhKUjMwclZUR0NQMHNTQlA4amU1VlFMb1c0bWhSRGFxd2daQjFKMlIwZFJXUXh1SXZJMDZDQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiNmZmaVZsZW1VbnNqTkhNNWdZNjBVYUs1dVdlcDhHVVMrMzdoUlhudU9sK0xjR240L2dCUHM2dk8rKzN1YmRnM2VlTS9PZlBWeDNiMlFlR3RuU2NYQ1E9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTQ3NDE3NDk4NzY6ODRAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWU9sTTRNZ1VKTUpvSDhDb09HYVNpaEFTUkhXUjdaUmEycmo2dyt5dzhkRyJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FJSURRPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzU0MTMzMDEyLCJsYXN0UHJvcEhhc2giOiIyVjc3cVUiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUJqdiJ9',
    PREFIXE: process.env.PREFIX || "+",
    GITHUB : process.env.GITHUB|| 'https://github.com/sesco001/Makamesco_md',
    OWNER_NAME : process.env.OWNER_NAME || "Makamesco",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254741749876",  
              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT: process.env.AUTO_REACTION || "yes",  
     AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'yes',
    URL: process.env.URL || "https://files.catbox.moe/39n0nf.jpg",  
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || 'non',              
    CHAT_BOT: process.env.CHAT_BOT || "no",              
    AUTO_READ: process.env.AUTO_READ_MESSAGES || "yes",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_HANDLE || 'no', 
    AUTO_REPLY : process.env.AUTO_REPLY || "no", 
    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || 'your status have been viewed by Makamesco MD',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    AUTO_BIO: process.env.AUTO_BIO || 'yes',       
    ANTI_CALL_TEXT : process.env.ANTI_CALL_TEXT || 'yes',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VbAEL9r5vKA7RCdnYG0S",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VbAEL9r5vKA7RCdnYG0S",
    CHANNEL :process.env.CHANNEL || "https://whatsapp.com/channel/0029VbAEL9r5vKA7RCdnYG0S",
    CAPTION : process.env.CAPTION || "✧MAKAMESCO MD✧",
    BOT : process.env.BOT_NAME || '✧DREAMKID MD✧⁠',
    MODE: process.env.PUBLIC_MODE || "yes",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Nairobi", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    LUCKY_ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    ANTI_CALL: process.env.ANTI_CALL || 'yes', 
    AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',             
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, 
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
