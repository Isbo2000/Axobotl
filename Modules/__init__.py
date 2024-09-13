"""
#### Embeds(bot: discord.Bot, **args)
        .send(user: discord.User | discord.TextChannel)

        .respond(ctx: discord.ApplicationContext, ephemeral: bool = False)

        .edit(msg: discord.Interaction | discord.WebhookMessage)

        .create()

#### Images()
        .load(image: str | bytes | discord.Attachment)

        .add_textbox(image: Image.Image | None, text: str, **args)
        
        .save(image: Image.Image, filename: str | None = "Image.png")
"""

from Modules.embeds import Embeds
from Modules.images import Images