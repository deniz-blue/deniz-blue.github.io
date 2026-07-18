# Using FFmpeg to display videos using Minecraft item frame maps

If you have played Minecraft, you may have seen "map art". They are images made out of Minecraft maps. Generally, on vanilla-like servers, you make a map art by building inside a large area, and then you use a map to capture the image. The map is then placed in an item frame, which can be placed on walls. This is a great way to display images in Minecraft.

But what if you wanted to display a video in Minecraft?

Long time ago, I was really into the Minecraft Protocol (RIP wiki.vg). I was trying to make a custom Minecraft server via [node-minecraft-protocol](https://github.com/prismarinejs/node-minecraft-protocol) and I wanted to display a video in Minecraft.

## The idea

Well, a video is composed of frames, and a frame is an image. So, if we can convert a video into a series of images, we can then convert those images into Minecraft maps, and then display them in item frames.

My first approach (I was very naive back then) was to use [ffmpeg](https://ffmpeg.org/) to convert a video into a series of images to a folder, then use a script to convert those images into Minecraft maps, and then use a custom Minecraft server to display those maps in item frames.

But, as you can imagine, this is very inefficient - we do not really need to store every single image on the filesystem. It creates a lot of overhead, and eats up a lot of storage space.

The solution is actually quite simple: we can pipe into and out of ffmpeg.

--- TODO ---
