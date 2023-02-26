from discord.ext import commands
import discord
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
    async def nom(self, ctx: discord.ApplicationContext, user: discord.Member):

        invite = f"https://discord.com/api/oauth2/authorize?client_id={self.bot.user.id}&permissions={config['permissions']}&scope=applications.commands%20bot"
        server = f"https://discord.gg/{config['server']}"

        nom = random.choice(images)

        embed = discord.Embed(
            title=f"**{ctx.author.display_name} nommed on {user.display_name}**",
            description=f"[Invite Me!]({invite})   |   [Join Server!]({server})",
            color=discord.Color.from_rgb(0,164,255)
        )
        
        embed.set_image(url=nom)

        embed.set_footer(
            text=f"{self.bot.user.name}   |   Version: {config['version']}",
            icon_url=self.bot.user.avatar
        )

        await ctx.respond(embed=embed)


def setup(bot):
    bot.add_cog(Nom(bot))