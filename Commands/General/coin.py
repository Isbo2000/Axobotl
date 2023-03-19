from discord.ext import commands
import discord
import asyncio
import Modules
import random
import json

with open('./Assets/config.json') as cfg:
    config = json.load(cfg)

class Coin(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
    
    @discord.slash_command(name="coin",description="Flips an axolotl coin")
    @commands.cooldown(1,config['cooldown'],commands.BucketType.member)
    async def coin(self, ctx: discord.ApplicationContext):
        await ctx.defer()

        coin = discord.File("./Assets/Commands/coin/coin.gif", "Coin.gif")
        heads = discord.File("./Assets/Commands/coin/heads.png", "Heads.png")
        tails = discord.File("./Assets/Commands/coin/tails.png", "Tails.png")

        msg = await Modules.Embeds(self.bot,title="***Flipping***",file=coin,color=None).respond(ctx)

        await asyncio.sleep(3)

        flip = random.randrange(0,2)

        if (flip == 0):
            await Modules.Embeds(self.bot,title="**Heads**",file=heads).edit(msg)

        elif (flip == 1):
            await Modules.Embeds(self.bot,title="**Tails**",file=tails).edit(msg)


def setup(bot):
    bot.add_cog(Coin(bot))