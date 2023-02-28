from discord.ext import commands
import discord
import Modules
import random
import json

with open('./Assets/Commands/axolotl.json') as img:
    images = json.load(img)

class Axolotl(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
    
    @discord.slash_command(name="axolotl",description="Sends a random axolotl image")
    async def axolotl(self, ctx: discord.ApplicationContext):
        title = "**Have a random axolotl!**"
        image = random.choice(images)

        await Modules.Embeds(self.bot,title=title,image=image).respond(ctx)

def setup(bot):
    bot.add_cog(Axolotl(bot))