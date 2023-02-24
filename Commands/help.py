from discord.ext import commands
import discord
import json

with open('./Assets/config.json') as cfg:
    config = json.load(cfg)

class Help(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
    
    @discord.slash_command(name="help")
    async def help(self, ctx: discord.ApplicationContext):

        invite = f"https://discord.com/api/oauth2/authorize?client_id={self.bot.user.id}&permissions={config['permissions']}&scope=applications.commands%20bot"

        embed = discord.Embed(
            title="**Help Menu**",
            description="\n".join(config["description"]),
            color=discord.Color.from_rgb(0,164,255)
        )

        embed.add_field(
            name="More coming soon!",
            value="B)"
            )

        embed.add_field(
            name="Credits:",
            value=(
                "Type this to see the credits:\n"
                "`/credits`"
            ),
            inline=False
        )

        embed.add_field(
            name="Invite:",
            value=f"Link to invite this bot to your server:\n**[Invite Me!]({invite})**",
            inline=False
        )

        embed.set_footer(
            text=f"{config['name']}   |   Version: {config['version']}"
        )

        await ctx.respond(embed=embed)

def setup(bot):
    bot.add_cog(Help(bot))