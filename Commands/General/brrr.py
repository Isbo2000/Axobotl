from discord.ext import commands
import discord
import json

with open('./Assets/config.json') as cfg:
    config = json.load(cfg)

class Brrr(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
    
    @discord.slash_command(name="brrr",description="Replies with 'HAHA <text> GO BRRRRRRRRRRRRRRRRRR'")
    @discord.option(name="text",description="Enter text to go BRRRRRRRRRRRRRRRRRR",required=True)
    async def brrr(self, ctx: discord.ApplicationContext, text: str):

        invite = f"https://discord.com/api/oauth2/authorize?client_id={self.bot.user.id}&permissions={config['permissions']}&scope=applications.commands%20bot"
        server = f"https://discord.gg/{config['server']}"

        embed = discord.Embed(
            title=f"HAHA {text} GO BRRRRRRRRRRRRRRRRRR",
            description=f"[Invite Me!]({invite})   |   [Join Server!]({server})",
            color=discord.Color.from_rgb(config['color'])
        )

        embed.set_footer(
            text=f"{self.bot.user.name}   |   Version: {config['version']}",
            icon_url=self.bot.user.avatar
        )

        await ctx.respond(embed=embed)

def setup(bot):
    bot.add_cog(Brrr(bot))