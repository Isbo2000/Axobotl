from discord.ext import commands
from dotenv import load_dotenv
import requests
import discord
import Modules
import json
import os

with open('./Assets/config.json') as cfg:
    config = json.load(cfg)

class Dog(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
    
    @discord.slash_command(name="dog",description="Sends a random dog image")
    @commands.cooldown(1,config['cooldown'],commands.BucketType.member)
    async def dog(self, ctx: discord.ApplicationContext):
        title = "**Have a random dog!**"

        load_dotenv()
        request = requests.get("https://api.thedogapi.com/v1/images/search?api_key="+os.getenv("DOGAPIKEY"))
        image = json.loads(request.content.decode('utf-8'))[0]['url']

        await Modules.Embeds(self.bot,title=title,image=image).respond(ctx)

def setup(bot):
    bot.add_cog(Dog(bot))