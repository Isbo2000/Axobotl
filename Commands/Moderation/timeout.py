from discord.ext import commands
import datetime
import discord
import Modules

class Timeout(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
    
    @discord.slash_command(name="timeout",description="Timeout a user (default 10 minutes)")
    @discord.guild_only()
    @discord.default_permissions(moderate_members=True)
    @discord.option(name="user",description="Enter a user to timeout",required=True)
    @discord.option(name="minutes",description="Enter the amount of minutes to timeout a given user",required=False)
    @discord.option(name="reason",description="Enter a reason for the timeout",required=False)
    async def timeout(self, ctx: discord.ApplicationContext, user: discord.Member, minutes: int = 10, reason: str = "No reason given"):
        duration = datetime.timedelta(minutes=minutes)
        
        try:
            await user.timeout_for(duration=duration,reason=reason)
        
        except discord.Forbidden:
            raise commands.BotMissingPermissions(missing_permissions=["moderate_members"])

        title = f"Timed out {user} for {minutes} minutes"
        description = f"**Reason:** {reason}"

        await Modules.Embeds(self.bot,title=title,description=description).respond(ctx)
        
def setup(bot):
    bot.add_cog(Timeout(bot))