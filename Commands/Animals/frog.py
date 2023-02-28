from discord.ext import commands
import discord
import Modules
import random
import json

with open('./Assets/Commands/frog.json') as img:
    images = json.load(img)

class Frog(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
    
    @discord.slash_command(name="frog",description="Sends a random frog image")
    async def frog(self, ctx: discord.ApplicationContext):
        title = "**Have a random frog!**"
        image = random.choice(images)

        await Modules.Embeds(self.bot,title=title,image=image).respond(ctx)

def setup(bot):
    bot.add_cog(Frog(bot))