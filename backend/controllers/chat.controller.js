import prisma from "../lib/prisma.js"


export const getChats = async(req,res)=>{
    const tokenUserId = req.userId;
    try {
        const chats = await prisma.chat.findMany({
            where:{
                userIds:{
                    hasSome:[tokenUserId]
                }
            }
        })
        for(const chat of chats){
            const receiverId = chat.userIds.find((id) => id !== tokenUserId)
            const receiver = await prisma.user.findUnique({
                where:{
                    id:receiverId
                },
                select:{
                    id:true,
                    username:true,
                    avatar:true
                }
            })

            chat.receiver = receiver
        }
        res.status(200).json({chats})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:""})
    }

}

export const getChat = async(req,res)=>{
    const tokenUserId = req.userId;
    const chatID = req.params.id;
    try {
        const chat = await prisma.chat.findUnique({
            where:{
                id:chatID,
                userIds:{
                    hasSome:[tokenUserId]
                }
            },
            include:{
                messages:{
                    orderBy:{
                        createdAt:"asc"
                    }
                }
            }
        })

        await prisma.chat.update({
            where: {
              id: req.params.id,
            },
            data: {
              seenBy: {
                push: [tokenUserId],
              },
            },
          });
        res.status(200).json({chat})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"chat not found"})
    }
}

export const addChat = async(req,res)=>{
    const tokenUserId = req.userId;
    const recieverId = req.body.recieverId;
    try {
        const newChat = await prisma.chat.create({
            data:{
                userIds:[tokenUserId,recieverId]
            }
        })
        res.status(200).json({message:"Chat Added",newChat})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"chat not added"})
    }
}

export const readChat = async(req,res)=>{
    const tokenUserId = req.userId;

  
    try {
      const chat = await prisma.chat.update({
        where: {
          id: req.params.id,
          userIDs: {
            hasSome: [tokenUserId],
          },
        },
        data: {
          seenBy: {
            set: [tokenUserId],
          },
        },
      });
      res.status(200).json(chat);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to read chat!" });
    }
}