from discord.ext import commands
import discord
import Modules
import random
import json

with open('./Assets/config.json') as cfg:
    config = json.load(cfg)

with open('./Assets/Commands/nom.json') as img:
    images = json.load(img)

class Nom(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
    
    @discord.slash_command(name="nom",description="'Noms' on another user")
    @discord.option(name="user",description="Enter a user to 'nom' on",required=True)
    @commands.cooldown(1,config['cooldown'],commands.BucketType.member)
    async def nom(self, ctx: discord.ApplicationContext, user: discord.Member):
        title = f"**{ctx.author.display_name} nommed on {user.display_name}**"
        image = random.choice(images)

        await Modules.Embeds(self.bot,title=title,image=image).respond(ctx)


def setup(bot):
    bot.add_cog(Nom(bot))