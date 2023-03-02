from discord.ext import commands
import discord
import Modules

class Unban(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
    
    @discord.slash_command(name="unban",description="Unban a user from the server")
    @discord.guild_only()
    @discord.default_permissions(ban_members=True)
    @discord.option(name="user",description="Enter a user to unban",required=True)
    @discord.option(name="reason",description="Enter a reason for the unban",required=False)
    async def unban(self, ctx: discord.ApplicationContext, user: discord.Member, reason: str = "No reason given"):
        try:
            try:
                await ctx.guild.unban(user=user,reason=reason)
            
            except discord.Forbidden:
                raise commands.BotMissingPermissions(missing_permissions=["ban_members"])

            title = f"Unbanned {user} from the server"
            description = f"**Reason:** {reason}"
            color = None
        
        except discord.NotFound:
            title = "Unable to unban"
            description = f"{user} is not currently banned"
            color = [255,0,0]

        await Modules.Embeds(self.bot,title=title,description=description,color=color).respond(ctx,True)

def setup(bot):
    bot.add_cog(Unban(bot))