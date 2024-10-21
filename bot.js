const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

const TOKEN = 'YOUR_BOT_TOKEN';

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// Command handling
client.on('messageCreate', (message) => {
    if (message.author.bot) return;

    const args = message.content.slice(1).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    switch (command) {
        case 'ping':
            message.channel.send('Pong!');
            break;

        case 'beep':
            message.channel.send('Boop!');
            break;

        case 'roll':
            const sides = args[0] ? parseInt(args[0]) : 6;
            const roll = Math.floor(Math.random() * sides) + 1;
            message.channel.send(`You rolled a ${roll}!`);
            break;

        case 'say':
            const sayMessage = args.join(' ');
            message.channel.send(sayMessage);
            break;

        case 'joke':
            // Basic joke response
            const jokes = [
                "Why don't scientists trust atoms? Because they make up everything!",
                "Why did the scarecrow win an award? Because he was outstanding in his field!",
                "I told my computer I needed a break, and now it won't stop sending me beach wallpapers."
            ];
            const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
            message.channel.send(randomJoke);
            break;

        case 'userinfo':
            const user = message.mentions.users.first() || message.author;
            message.channel.send(`Username: ${user.username}\nID: ${user.id}\nCreated at: ${user.createdAt}`);
            break;

        case 'kick':
            if (!message.member.permissions.has('KICK_MEMBERS')) return message.reply('You do not have permission to kick members.');
            const memberToKick = message.mentions.members.first();
            if (memberToKick) {
                memberToKick.kick().then(() => {
                    message.channel.send(`${memberToKick.user.tag} has been kicked.`);
                }).catch(err => {
                    message.channel.send('I was unable to kick the member.');
                    console.error(err);
                });
            } else {
                message.channel.send('Please mention a valid member to kick.');
            }
            break;

        case 'ban':
            if (!message.member.permissions.has('BAN_MEMBERS')) return message.reply('You do not have permission to ban members.');
            const memberToBan = message.mentions.members.first();
            if (memberToBan) {
                memberToBan.ban().then(() => {
                    message.channel.send(`${memberToBan.user.tag} has been banned.`);
                }).catch(err => {
                    message.channel.send('I was unable to ban the member.');
                    console.error(err);
                });
            } else {
                message.channel.send('Please mention a valid member to ban.');
            }
            break;

        default:
            message.channel.send('Unknown command! Use !ping, !beep, !roll, !say, !joke, !userinfo, !kick, or !ban.');
            break;
    }
});

client.login(TOKEN);
