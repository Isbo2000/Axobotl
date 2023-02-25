from discord.ext import commands
import discord
import json

with open('./Assets/config.json') as cfg:
    config = json.load(cfg)

class Commands(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
    
    @discord.slash_command(name="commands",description="Shows a list of commands")
    async def commands(self, ctx: discord.ApplicationContext):

        invite = f"https://discord.com/api/oauth2/authorize?client_id={self.bot.user.id}&permissions={config['permissions']}&scope=applications.commands%20bot"
        server = f"https://discord.gg/{config['server']}"

        embed = discord.Embed(
            title="**Commands**",
            description="\n".join(config["description"]),
            color=discord.Color.from_rgb(0,164,255)
        )

        for command in self.bot.application_commands:
            embed.add_field(
                name=command.mention,
                value=command.description,
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
    bot.add_cog(Commands(bot))