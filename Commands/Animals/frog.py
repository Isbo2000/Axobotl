from discord.ext import commands
from dotenv import load_dotenv
import requests
import discord
import Modules
import json
import os

with open('./Assets/config.json') as cfg:
    config = json.load(cfg)

class Frog(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
    
    @discord.slash_command(name="frog",description="Sends a random frog image")
    @commands.cooldown(10,3600,commands.BucketType.guild)
    async def frog(self, ctx: discord.ApplicationContext):
        title = "**Have a random frog!**"

        async def getrequest() -> requests.Response:
            load_dotenv()
            return requests.get("https://api.unsplash.com/photos/random?query=frog&client_id="+os.getenv("FROGAPIKEY"))
        
        request = await getrequest()
        content = json.loads(request.content.decode('utf-8'))

        description = ("**Photo by ["+content['user']['name']+"]("+content['user']['links']['html']+
            "?utm_source=Axobotl&utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=Axobotl&utm_medium=referral)**"
        )
        
        await Modules.Embeds(self.bot,title=title,image=content['urls']['regular'],description=description).respond(ctx)

        requests.get(content['links']['download_location']+"&client_id="+os.getenv("FROGAPIKEY"))

def setup(bot):
    bot.add_cog(Frog(bot))