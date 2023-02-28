from discord.ext import commands
import discord
import json

with open('./Assets/config.json') as cfg:
    config = json.load(cfg)

with open('./Assets/Commands/updown.json') as cde:
    code = json.load(cde)
key = {}
for i in code:
    key[code[i]] = i

class Updown(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
    
    @discord.slash_command(name="updown",description="Replies with upsidedown text")
    @discord.option(name="text",description="Enter text to turn it upsidedown",required=True)
    async def updown(self, ctx: discord.ApplicationContext, text: str):

        invite = f"https://discord.com/api/oauth2/authorize?client_id={self.bot.user.id}&permissions={config['permissions']}&scope=applications.commands%20bot"
        server = f"https://discord.gg/{config['server']}"

        result = "".join([code[i] if i in code else key[i] if i in key else i for i in text])[::-1]

        embed = discord.Embed(
            title=f"{result}",
            description=f"[Invite Me!]({invite})   |   [Join Server!]({server})",
            color=discord.Color.from_rgb(config['color'])
        )

        embed.set_footer(
            text=f"{self.bot.user.name}   |   Version: {config['version']}",
            icon_url=self.bot.user.avatar
        )

        await ctx.respond(embed=embed)

def setup(bot):
    bot.add_cog(Updown(bot))