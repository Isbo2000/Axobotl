from PIL import Image, ImageDraw, ImageFont
import discord
import math
import io

class Images:
    """
    Easier way of working with PIL images

    Images() => None
        .load(
            image: str | bytes | discord.Attachment
        ) => Image.Image

        .add_textbox(
            image: Image.Image | None,
            text: str,
            color: (r: int, g: int, b: int) | None = (0, 0, 0),
            location: (x: int, y: int) | None = (0, 0),
            textbox_size: (width: int, height: int) | None,
            font: str | None = "Questrial",
            max_size: int | None = "250",
            target_size: int | None = "100",
            textbox_color: (r: int, g: int, b: int, a: int) | None = (0, 0, 0, 0),
            center: bool = True
        ) = > Image.Image

        .save(
            image: Image.Image,
            filename: str | None = "Image.png"
        ) => discord.File()
    """
    async def load(image: str | bytes | discord.Attachment):
        """
        .load(
            image: str | bytes | discord.Attachment
        ) => Image.Image

        Open a given image into a Image.Image object
        """

        if isinstance(image, bytes):
            image = io.BytesIO(image)

        if isinstance(image, discord.Attachment):
            i = await image.read()
            image = io.BytesIO(i)

        with Image.open(image) as img:
            img.load()
        
        return img.copy()
    
    def add_textbox(
            image: Image.Image | None,
            text: str,
            color: tuple[int,int,int] | None = None,
            location: tuple[int,int] | None = None,
            textbox_size: tuple[int,int] | None = None,
            font: str | None = None,
            max_size: int | None = None,
            target_size: int = 100,
            textbox_color: tuple[int,int,int,int] | None = None,
            center: bool = True
        ):
        """
        .add_textbox(
            image: Image.Image | None,
            text: str,
            color: (r: int, g: int, b: int) | None = (0, 0, 0),
            location: (x: int, y: int) | None = (0, 0),
            textbox_size: (width: int, height: int) | None,
            font: str | None = "Questrial",
            max_size: int | None = "250",
            target_size: int | None = "100",
            textbox_color: (r: int, g: int, b: int, a: int) | None = (0, 0, 0, 0),
            center: bool = True
        ) = > Image.Image

        Create textbox with given text and add it to a given image
        """

        if font == None: font = "./Assets/Fonts/Questrial/Questrial-Regular.ttf"

        with Image.open("./Assets/Commands/text/text.png") as textbox:
            textbox.load()
        textbox.copy()

        if textbox_size:
            textbox = textbox.resize(textbox_size)
            max_size = max_size if max_size else textbox_size[1]
        else:
            max_size = max_size if max_size else 250

        if textbox_color: ImageDraw.Draw(textbox).rectangle([0,0,textbox.width,textbox.height],textbox_color)
        
        testimg = Image.new('RGB', (textbox.width, textbox.height))

        width = ImageDraw.Draw(testimg).textbbox((0,0), text, font=ImageFont.truetype(font,target_size))[2]
        size = round(target_size / (width / textbox.width) * 0.90)
        size = size if size < max_size else max_size

        l,t,r,b = ImageDraw.Draw(testimg).textbbox((0,0), text, font=ImageFont.truetype(font,size))

        color = color if color else (0,0,0)
        stroke = (255,255,255) if color < (127,127,127) else (0,0,0)
        
        ImageDraw.Draw(textbox).text((((textbox.width-r)/2) if center else 10,(textbox.height-b)/2), text, fill=color, stroke_width=2, stroke_fill=stroke, font=ImageFont.truetype(font,size))

        if image == None:
            return textbox
        
        else:
            image.paste(textbox,location if location else (0,0),textbox)
            return image
    
    def save(image: Image.Image, filename: str | None = None):
        """
        .save(
            image: Image.Image,
            filename: str | None = "Image.png"
        ) => discord.File()

        Save a given image as a discord.File() object with the given filename
        """

        buffer = io.BytesIO()
        image.save(buffer,"PNG")
        buffer.seek(0)

        return discord.File(buffer, filename if filename else "Image.png")
    
    