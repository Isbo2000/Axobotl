from discord.ext import commands
import discord
import Modules

class Ban(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
    
    choices = [
        'Past 1 minute',
        'Past 5 minutes',
        'Past 10 minutes',
        'Past 15 minutes',
        'Past 30 minutes',
        'Past 1 hour',
        'Past 3 hours',
        'Past 6 hours',
        'Past 12 hours',
        'Past 1 day',
        'Past 2 days',
        'Past 3 days',
        'Past 4 days',
        'Past 5 days',
        'Past 6 days',
        'Past 7 days'
    ]
    
    @discord.slash_command(name="ban",description="Ban a user from the server")
    @discord.guild_only()
    @discord.default_permissions(ban_members=True)
    @discord.option(name="user",description="Enter a user to ban",required=True)
    @discord.option(name="reason",description="Enter a reason for the ban",required=False)
    @discord.option(name="delete_messages",description="Enter amount of their recent message history to delete (default none)",choices=choices,required=False)
    async def ban(self, ctx: discord.ApplicationContext, user: discord.Member, reason: str = "No reason given", delete_messages: str = None):

        seconds = None

        if delete_messages:
            delmsg = delete_messages.replace("Past ","")
            time = int(delmsg.split(" ")[0])
            if "minute" in delmsg:
                seconds = time * 60
            elif "hour" in delmsg:
                seconds = time * 60 * 60
            elif "day" in delmsg:
                seconds = time * 24 * 60 * 60

        try:
            await ctx.guild.ban(user=user,delete_message_seconds=seconds,reason=reason)

        except discord.Forbidden:
            raise commands.BotMissingPermissions(missing_permissions=["ban_members"])

        title = f"Banned {user} from the server"
        description = f"**Reason:** {reason}\n\nDeleted {f'the {delete_messages}' if delete_messages else 'none'} of their message history"

        await Modules.Embeds(self.bot,title=title,description=description).respond(ctx)

def setup(bot):
    bot.add_cog(Ban(bot))