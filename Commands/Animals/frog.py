from discord.ext import commands
import discord
import random
import json

with open('./Assets/config.json') as cfg:
    config = json.load(cfg)

with open('./Assets/Commands/frog.json') as img:
    images = json.load(img)

class Frog(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
    
    @discord.slash_command(name="frog",description="Sends a random frog image")
    async def frog(self, ctx: discord.ApplicationContext):

        invite = f"https://discord.com/api/oauth2/authorize?client_id={self.bot.user.id}&permissions={config['permissions']}&scope=applications.commands%20bot"
        server = f"https://discord.gg/{config['server']}"

        frog = random.choice(images)

        embed = discord.Embed(
            title="**Have a random frog!**",
            description=f"[Invite Me!]({invite})   |   [Join Server!]({server})",
            color=discord.Color.from_rgb(config['color'])
        )
        
        embed.set_image(url=frog)

        embed.set_footer(
            text=f"{self.bot.user.name}   |   Version: {config['version']}",
            icon_url=self.bot.user.avatar
        )

        await ctx.respond(embed=embed)


def setup(bot):
    bot.add_cog(Frog(bot))