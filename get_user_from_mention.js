const { prefix } = require('./config.json');

module.exports = function getUserFromMention(mention) {
    if (!mention) return;

    if (mention.startsWith('<@') && mention.endsWith('>')) {
        mention = mention.slice(2, -1);

        if (mention.startsWith(prefix)) {
            mention = mention.slice(1);
        }

        return client.users.cache.get(mention);
    }
}
