const { SlashCommandBuilder } = require('@discordjs/builders');
const { getBulbs } = require('../lifx/getBulbs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lifxlist')
		.setDescription('huebot get lifx bulbs'),
   async execute(interaction) {
	try {
	  
		const bulbTxt = await getBulbs();
	  	const ModelData = bulbTxt
	  console.log(ModelData);
	  await interaction.followUp({type: 3, content: `${ModelData}`})
	}catch (error) {
	errtxt = JSON.stringify(error.message);
	 if (error) console.error(error);
	 await interaction.followUp({ content: `${interaction.user}`+"```"+`${errtxt}`+"```"});
}
   }
}
