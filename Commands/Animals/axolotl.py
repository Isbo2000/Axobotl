from discord.ext import commands
from bs4 import BeautifulSoup  
import requests
import discord
import Modules
import random
import json

with open('./Assets/config.json') as cfg:
    config = json.load(cfg)

class Axolotl(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
    
    @discord.slash_command(name="axolotl",description="Sends a random axolotl image")
    @commands.cooldown(1,config['cooldown'],commands.BucketType.member)
    async def axolotl(self, ctx: discord.ApplicationContext):
        title = "**Have a random axolotl!**"

        async def getrequest() -> requests.Response:
            return requests.get("https://axolotlexpert.com/pictures-of-axolotls/")
        request = await getrequest()

        soup = BeautifulSoup(request.text, 'html.parser')

        images = []
        for item in soup.find_all('img'): 
            images.append(item['src'])
        images.pop(0)

        image = random.choice(images)

        await Modules.Embeds(self.bot,title=title,image=image).respond(ctx)

def setup(bot):
    bot.add_cog(Axolotl(bot))