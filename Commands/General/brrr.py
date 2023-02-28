from discord.ext import commands
import discord
import Modules

class Brrr(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
    
    @discord.slash_command(name="brrr",description="Replies with 'HAHA <text> GO BRRRRRRRRRRRRRRRRRR'")
    @discord.option(name="text",description="Enter text to go BRRRRRRRRRRRRRRRRRR",required=True)
    async def brrr(self, ctx: discord.ApplicationContext, text: str):
        title = f"HAHA {text} GO BRRRRRRRRRRRRRRRRRR"

        await Modules.Embeds(self.bot,title=title).respond(ctx)

def setup(bot):
    bot.add_cog(Brrr(bot))