from discord.ext import commands
from dotenv import load_dotenv
import requests
import discord
import Modules
import json
import os

with open('./Assets/config.json') as cfg:
    config = json.load(cfg)

class Cat(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
    
    @discord.slash_command(name="cat",description="Sends a random cat image")
    @commands.cooldown(1,config['cooldown'],commands.BucketType.member)
    async def cat(self, ctx: discord.ApplicationContext):
        title = "**Have a random cat!**"

        load_dotenv()
        request = requests.get("https://api.thecatapi.com/v1/images/search?api_key="+os.getenv("CATAPIKEY"))
        image = json.loads(request.content.decode('utf-8'))[0]['url']

        await Modules.Embeds(self.bot,title=title,image=image).respond(ctx)

def setup(bot):
    bot.add_cog(Cat(bot))