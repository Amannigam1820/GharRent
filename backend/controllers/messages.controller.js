import prisma from "../lib/prisma.js"

export const addMessage = async (req, res) => {
  const tokenUserId = req.userId;
  const chatId = req.params.chatId;
  const text = req.body.text;

  const maxRetries = 3;
  let attempts = 0;
  let success = false;

  while (!success && attempts < maxRetries) {
    try {
      await prisma.$transaction(async (prisma) => {
        const chat = await prisma.chat.findUnique({
          where: {
            id: chatId,
            userIds: {
              hasSome: [tokenUserId],
            },
          },
        });

        if (!chat) {
          throw new Error("Chat not found!");
        }

        const message = await prisma.message.create({
          data: {
            text,
            chatId,
            userId: tokenUserId,
          },
        });

        await prisma.chat.update({
          where: {
            id: chatId,
          },
          data: {
            seenBy: {
              push: tokenUserId,
            },
            lastMessage: text,
          },
        });

        res.status(200).json(message);
      });

      success = true; // Transaction succeeded
    } catch (err) {
      console.log(err);
      attempts++;
      if (attempts >= maxRetries) {
        res.status(500).json({ message: "Failed to add message after multiple attempts!" });
        return;
      }
    }
  }
};