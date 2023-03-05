"""
Embeds(bot: discord.Bot, **args) => discord.Embed()
    .send(user: discord.User | discord.TextChannel)
    .respond(ctx: discord.ApplicationContext, ephemeral: bool = False, file: discord.File = None)
    .edit(msg: discord.Interaction, file: discord.File = None)
"""

from Modules.embeds import Embeds