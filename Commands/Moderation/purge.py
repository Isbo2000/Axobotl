from discord.ext import commands
import discord
import Modules

class Purge(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
    
    @discord.slash_command(name="purge",description="Bulk delete recent messages")
    @discord.guild_only()
    @discord.default_permissions(manage_messages=True,read_message_history=True)
    @discord.option(name="limit",description="How many messages to search through",required=True)
    @discord.option(name="reason",description="Enter a reason for the bulk delete",required=False)
    @discord.option(name="user",description="Enter a user to delete only their messages",required=False)
    async def purge(self, ctx: discord.ApplicationContext, limit: int, reason: str = "No reason given", user: discord.Member = None):
        await ctx.defer(ephemeral=True)

        def check(msg: discord.Message):
            if user:
                return msg.author == user
            else:
                return True

        try:
            deleted = await ctx.channel.purge(limit=limit,reason=reason,check=check)
        
        except discord.Forbidden:
            raise commands.BotMissingPermissions(missing_permissions=["manage_messages","read_message_history"])
        
        title = f"Purged {len(deleted)} out of {limit} messages{f' by {user}' if user else ''}"
        description = f"**Reason:** {reason}"

        await Modules.Embeds(self.bot,title=title,description=description).respond(ctx,True)

def setup(bot):
    bot.add_cog(Purge(bot))