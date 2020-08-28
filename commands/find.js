module.exports = {
    name: 'find',
    description: 'Look for a horsey.',
    args: false,
    usage: false,
    guildOnly: true,
    cooldown: 30,
    aliases: ['recruit'],
    cooldownMessage: 'You\'ve already looked for a horsey',
    execute(message, args) {
        const horseyOne = 'cactus';
        const horseyTwo = 'horse';
        const horseyThree = 'pony';
        const horseyFour = 'zaneanderman';
        const horseyFive = 'god';
        const horseySix = 'rrs';
        const horseySeven = 'bot';
        const horseyEight = 'sweaty';
        const horseyNine = 'no-name';
        let horsey = null;

        const min = Math.ceil(1);
        const max = Math.floor(101);
        const random = Math.floor(Math.random() * (max - min + 1) + min); 

        if (random >= 1 && random < 30) {
            horsey = horseyOne;
        } else if (random >= 30 && random < 50) {
            horsey = horseyTwo;
        } else if (random >= 50 && random < 65) {
            horsey = horseyThree;
        } else if (random >= 65 && random < 80) {
            horsey = horseyFour;
        } else if (random >= 80 && random < 87) {
            horsey = horseyFive;
        } else if (random >= 87 && random < 92) {
            horsey = horseySix;
        } else if (random >= 92 && random < 96) {
            horsey = horseySeven;
        } else if (random >= 96 && random < 99) {
            horsey = horseyEight;
        } else if (random >= 99 && random < 101) {
            horsey = horseyNine;
        }

        return message.reply(`you found a ${horsey} horsey!`);
    },
};
