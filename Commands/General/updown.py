from discord.ext import commands
import discord
import Modules
import json

with open('./Assets/Commands/updown.json') as cde:
    code = json.load(cde)
key = {}
for i in code:
    key[code[i]] = i

class Updown(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
    
    @discord.slash_command(name="updown",description="Replies with upsidedown text")
    @discord.option(name="text",description="Enter text to turn it upsidedown",required=True)
    async def updown(self, ctx: discord.ApplicationContext, text: str):
        result = "".join([code[i] if i in code else key[i] if i in key else i for i in text])[::-1]

        await Modules.Embeds(self.bot,title=result).respond(ctx)

def setup(bot):
    bot.add_cog(Updown(bot))