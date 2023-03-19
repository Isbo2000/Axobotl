from discord.ext import commands
import discord
import Modules

class Remove_timeout(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    perms = discord.Permissions(moderate_members=True)
    
    remove = discord.commands.SlashCommandGroup(name="remove",description="Remove the timeout from a user",guild_only=True,default_member_permissions=perms)

    @remove.command(name="timeout",description="Remove the timeout from a user")
    @discord.default_permissions(moderate_members=True)
    @discord.option(name="user",description="Enter a user to timeout",required=True)
    @discord.option(name="reason",description="Enter a reason for the timeout",required=False)
    async def timeout(self, ctx: discord.ApplicationContext, user: discord.Member, reason: str = "No reason given"):
        if user.timed_out:
            try:
                await user.remove_timeout(reason=reason)
                
            except discord.Forbidden:
                raise commands.BotMissingPermissions(missing_permissions=["moderate_members"])
            
            title = f"Removed timeout from {user}"
            description = f"**Reason:** {reason}"
            color = None

        else:
            title = "Unable to remove timeout"
            description = f"{user} is not currently timed out"
            color = [255,0,0]

        await Modules.Embeds(self.bot,title=title,description=description,color=color).respond(ctx,True)

def setup(bot):
    bot.add_cog(Remove_timeout(bot))