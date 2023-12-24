import MessageModel from "../models/chatModels/message.model.js";

export const addMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body.message;

  console.log(req.body)
  
 
  const message = new MessageModel({
    chatId:chatId,
    senderId:senderId,
    text:text
  });
  try {
    const result = await message.save();
    console.log(result)
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getMessages = async (req, res) => {
  const { chatId } = req.params;
  try {
    const result = await MessageModel.find({ chatId });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
