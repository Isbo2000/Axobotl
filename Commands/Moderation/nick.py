from discord.ext import commands
import discord
import Modules

class Nick(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
    
    @discord.slash_command(name="nick",description="Change a user's nickname")
    @discord.guild_only()
    @discord.default_permissions(change_nickname=True,manage_nicknames=True)
    @discord.option(name="user",description="Enter a user",required=True)
    @discord.option(name="nickname",description="Enter their new nickname (leave blank to clear)",required=False)
    @discord.option(name="reason",description="Enter a reason for changing their nickname",required=False)
    async def nick(self, ctx: discord.ApplicationContext, user: discord.Member, nickname: str, reason: str = "No reason given"):
        try:
            new = await user.edit(nick=nickname,reason=reason)
        
        except discord.Forbidden:
            raise commands.BotMissingPermissions(missing_permissions=["change_nickname","manage_nicknames"])
        
        title = f"Changed {user}'s nickname to: {new.display_name if new else user.display_name}"
        description = f"**Reason:** {reason}"

        await Modules.Embeds(self.bot,title=title,description=description).respond(ctx,True)

def setup(bot):
    bot.add_cog(Nick(bot))