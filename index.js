require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Client, GatewayIntentBits, ChannelType, PermissionFlagsBits } = require('discord.js');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.post('/create', async (req, res) => {
  const client = new Client({ intents: [GatewayIntentBits.Guilds] });

  try {
    await client.login(process.env.BOT_TOKEN);

    // Create server
    const guild = await client.guilds.create({
      name: 'TURSMEX',
      icon: null,
    });

    // Delete default channels
    const defaultChannels = guild.channels.cache;
    for (const [, channel] of defaultChannels) {
      await channel.delete().catch(() => {});
    }

    // Create 10 text channels and post message 5 times in each
    const channelNames = [
      'welcome', 'general', 'announcements', 'chat', 'random',
      'media', 'voice-text', 'events', 'resources', 'lounge'
    ];

    for (const name of channelNames) {
      const channel = await guild.channels.create({
        name,
        type: ChannelType.GuildText,
      });

      for (let i = 0; i < 5; i++) {
        await channel.send('THIS SERVER IS NOW YOURS FRIEND! 🎉');
      }
    }

    // Create permanent invite from first channel
    const firstChannel = guild.channels.cache.find(c => c.type === ChannelType.GuildText);
    const invite = await firstChannel.createInvite({ maxAge: 0, maxUses: 0 });

    await client.destroy();
    res.json({ success: true, invite: invite.url, serverId: guild.id });

  } catch (err) {
    await client.destroy().catch(() => {});
    res.status(500).json({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`TURSMEX running on http://localhost:${PORT}`));
