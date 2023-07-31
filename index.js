const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');

const {
    Client,
    Intents,
    Collection
} = require('discord.js');

const client = new Client({
    intents: [Intents.FLAGS.GUILDS]
});

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const dotenv = require('dotenv');
dotenv.config();
const TOKEN = process.env['BOT_TOKEN'];
const GUILD_ID = process.env['GUILD_ID'];


const commands = [];

client.commands = new Collection();

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command);
}
client.once('ready', () => {
    console.log('Ready!');
    
    const CLIENT_ID = client.user.id;
    const rest = new REST({
        version: '10'
    }).setToken(TOKEN);
    (async () => {
        try {
             await rest.put(
                    Routes.applicationCommands(CLIENT_ID), {
                        body: commands
                    },
                );
                console.log('Successfully registered application commands globally');
            } /*else {
                await rest.put(
                    Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
                        body: commands
                    },
                );
                console.log('Successfully registered application commands for development guild');
            }*/
         catch (error) {
            if (error) console.error(error);
        }
    })();
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return;
	await interaction.deferReply();
	//interaction.reply({type: 3, content: ' ' });
    try {
        await command.execute(interaction);
    } catch (error) {
        if (error) console.error(error);
        await interaction.deferReply();
	    interaction.editReply({ content: 'error'});
    }
});


client.login(process.env.BOT_TOKEN);
