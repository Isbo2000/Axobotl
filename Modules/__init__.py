"""
Embeds(bot: discord.Bot, **args) => discord.Embed()
        .send(user: discord.User | discord.TextChannel)

        .respond(ctx: discord.ApplicationContext, ephemeral: bool = False)

        .edit(msg: discord.Interaction | discord.WebhookMessage)

        .create()

Images() => None
        .load(image: str | bytes | discord.Attachment) => Image.Image

        .add_textbox(image: Image.Image | None, text: str, **args) = > Image.Image
        
        .save(image: Image.Image, filename: str | None = "Image.png") => discord.File()
"""

from Modules.embeds import Embeds
from Modules.images import Images