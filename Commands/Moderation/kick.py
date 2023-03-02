from discord.ext import commands
import discord
import Modules

class Kick(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
    
    @discord.slash_command(name="kick",description="Kick a user from the server")
    @discord.guild_only()
    @discord.default_permissions(kick_members=True)
    @discord.option(name="user",description="Enter a user to kick",required=True)
    @discord.option(name="reason",description="Enter a reason for the kick",required=False)
    async def kick(self, ctx: discord.ApplicationContext, user: discord.Member, reason: str = "No reason given"):
        try:
            await user.kick(reason=reason)

            title = f"Kicked {user} from the server"
            description = f"**Reason:** {reason}"

            await Modules.Embeds(self.bot,title=title,description=description).respond(ctx,True)
            
        except discord.Forbidden:
            raise commands.BotMissingPermissions(missing_permissions=["kick_members"])

def setup(bot):
    bot.add_cog(Kick(bot))