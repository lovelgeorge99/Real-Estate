import ChatModel from "../models/chatModels/chatModel.js";

export const createChat = async (req, res) => {
    // Check if a chat with the given members already exists (regardless of order)
    const existingChat = await ChatModel.findOne({
      $or: [
        { members: [req.body.senderId, req.body.receiverId] },
        { members: [req.body.receiverId, req.body.senderId] },
      ],
    });
  
    if (existingChat) {
      // If a chat already exists, you can handle it accordingly
      return res.status(200).json(existingChat);
    }
  const newChat = new ChatModel({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    console.log("insede try")
    const result = await newChat.save();
    res.status(200).json(result);
  } catch (error) {
   
    res.status(500).json(error);
  }
};

export const userChats = async (req, res) => {
  try {
    const chat = await ChatModel.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const findChat = async (req, res) => {
  try {
    const chat = await ChatModel.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    }).sort({ updatedAt: -1 });
    res.status(200).json(chat)
  } catch (error) {
    res.status(500).json(error)
  }
};