from discord.ext import commands
import discord
import Modules
import json

with open('./Assets/config.json') as cfg:
    config = json.load(cfg)

class Brrr(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
    
    @discord.slash_command(name="brrr",description="Replies with 'HAHA <text> GO BRRRRRRRRRRRRRRRRRR'")
    @discord.option(name="text",description="Enter text to go BRRRRRRRRRRRRRRRRRR",required=True)
    @commands.cooldown(1,config['cooldown'],commands.BucketType.member)
    async def brrr(self, ctx: discord.ApplicationContext, text: str):
        title = f"HAHA {text} GO BRRRRRRRRRRRRRRRRRR"

        await Modules.Embeds(self.bot,title=title).respond(ctx)

def setup(bot):
    bot.add_cog(Brrr(bot))