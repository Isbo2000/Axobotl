from discord.ext import commands
import discord
import json

with open('./Assets/config.json') as cfg:
    config = json.load(cfg)

class Help(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
    
    @discord.slash_command(name="help",description="Shows helpful information about the bot")
    async def help(self, ctx: discord.ApplicationContext):

        invite = f"https://discord.com/api/oauth2/authorize?client_id={self.bot.user.id}&permissions={config['permissions']}&scope=applications.commands%20bot"
        server = f"https://discord.gg/{config['server']}"

        credits = self.bot.get_command('credits')
        cmds = self.bot.get_command('commands')

        embed = discord.Embed(
            title="**Help Menu**",
            description="\n".join(config["description"]),
            color=discord.Color.from_rgb(0,164,255)
        )

        embed.add_field(
            name="\n",
            value=(
                f"{cmds.mention} | {cmds.description}"
                f"\n\n{credits.mention} | {credits.description}\n"
            ),
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
    bot.add_cog(Help(bot))