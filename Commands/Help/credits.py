from discord.ext import commands
import discord
import json

with open('./Assets/config.json') as cfg:
    config = json.load(cfg)
with open('./Assets/credits.json') as crd:
    credits = json.load(crd)

class Credits(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
    
    @discord.slash_command(name="credits",description="View the credits")
    async def credits(self, ctx: discord.ApplicationContext):

        invite = f"https://discord.com/api/oauth2/authorize?client_id={self.bot.user.id}&permissions={config['permissions']}&scope=applications.commands%20bot"
        server = f"https://discord.gg/{config['server']}"

        embed = discord.Embed(
            title="**Credits**",
            description="\n".join(config["description"]),
            color=discord.Color.from_rgb(0,164,255)
        )

        for credit in credits:
            embed.add_field(
                name="\u200B\n",
                value=f"<@{credit['id']}>|`{await self.bot.fetch_user(credit['id'])}`\n{credit['description']}",
                inline=False
            )
        
        embed.add_field(
            name="",
            value=f"[Invite Me!]({invite})   |   [Join Server!]({server})",
            inline=False
        )

        embed.set_footer(
            text=f"{self.bot.user.name}   |   Version: {config['version']}",
            icon_url=self.bot.user.avatar
        )

        await ctx.respond(embed=embed)

def setup(bot):
    bot.add_cog(Credits(bot))