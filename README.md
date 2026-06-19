# TURSMEX Server Generator

## Setup

1. **Add your bot token** — open `.env` and replace `YOUR_BOT_TOKEN_HERE` with your real bot token

2. **Make sure your bot has these permissions** in the Discord Developer Portal:
   - `bot` scope
   - `Administrator` permission (needed to create guilds, channels, invites)
   - Enable **Server Members Intent** under Privileged Gateway Intents

3. **Important** — your bot must be verified to create servers via API.
   Bots can only create guilds if they are in fewer than 10 servers.

4. **Run the server:**
   ```
   node index.js
   ```

5. **Open your browser** at `http://localhost:3000`

6. Click **Create TURSMEX Server** and watch it go!

## What it does
- Creates a server named TURSMEX
- Creates 10 text channels
- Posts "THIS SERVER IS NOW YOURS FRIEND! 🎉" 5 times in each channel
- Generates a permanent (never-expiring) invite link

## Transfer ownership to your friend
Discord doesn't allow bots to transfer ownership — it's manual only:
Server Settings → Members → click the three dots next to your friend → Transfer Ownership
