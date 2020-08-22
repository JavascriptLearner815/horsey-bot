module.exports = {
    name: 'find',
    description: 'Look for a horsey.',
    args: false,
    usage: false,
    guildOnly: true,
    cooldown: 30,
    aliases: ['recruit'],
    execute(message, args) {
        const userID = message.author.id;
        const guildID = message.guild.id;
        const horseyOne = 'cactus';
        const horseyTwo = 'horse';
        const horseyThree = 'pony';
        const horseyFour = 'zaneanderman';
        const horseyFive = 'god';
        let horsey = null;

        const min = Math.ceil(1);
        const max = Math.floor(15);
        const random = Math.floor(Math.random() * (max - min + 1) + min); 

        if (random === 1 || random === 2 || random === 3 || random === 4 || random === 5) {
            horsey = horseyOne;
        } else if (random === 6 || random === 7 || random === 8 || random === 9) {
            horsey = horseyTwo;
        } else if (random === 10 || random === 11 || random === 12) {
            horsey = horseyThree;
        } else if (random === 13 || random === 14) {
            horsey = horseyFour;
        } else if (random === 15) {
            horsey = horseyFive;
        }

        globalThis.userData.push({
            user: userID,
            guild: guildID,
            item: horsey
        });

        return message.reply(`You found a ${horsey} horsey!`);
    },
};
