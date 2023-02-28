from discord.ext import commands
import discord
import asyncio
import Modules
import random
import json

with open('./Assets/Commands/coin.json') as img:
    images = json.load(img)

class Coin(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
    
    @discord.slash_command(name="coin",description="Flips an axolotl coin")
    async def coin(self, ctx: discord.ApplicationContext):
        msg = await Modules.Embeds(self.bot,title="***Flipping***",image=images['flipping']).respond(ctx)

        await asyncio.sleep(3)

        flip = random.randrange(0,2)
        if (flip == 0):
            await Modules.Embeds(self.bot,title="**Heads**",image=images['heads']).edit(msg)
        elif (flip == 1):
            await Modules.Embeds(self.bot,title="**Tails**",image=images['tails']).edit(msg)


def setup(bot):
    bot.add_cog(Coin(bot))