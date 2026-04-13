const Chat = require("../models/Chat");
const User = require("../models/user");

const createOrAccessChat=async(req,res)=>{
    try{
        const { userId } = req.body;
        if (!userId) {
      return res.status(400).json({
        message: "UserId is required",
      });
    }
     let chat = await Chat.findOne({
      isGroupChat: false,
      users: {
        $all: [req.user._id, userId], // both users must be in chat
      },
    })
      .populate("users", "name email")
      .populate("latestMessage");

    if (chat) {
      return res.status(200).json(chat);
    }

    //If no previous chat found
    const newChat = await Chat.create({
      isGroupChat: false,
      users: [req.user._id, userId],
    });

    const fullChat = await Chat.findById(newChat._id)
      .populate("users", "name email");

    res.status(201).json(fullChat);
  } catch (error) {
    res.status(500).json({
      message: "Error creating/accessing chat",
      error: error.message,
    });
  }
};


const getUserChats = async (req, res) => {
  try {
    // find chats where logged-in user is a member
    let chats = await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users", "name email") // get user info
      .populate("latestMessage") // get last message
      .sort({ updatedAt: -1 }); // newest chats first

    // 🔥 populate sender inside latestMessage
    chats = await Chat.populate(chats, {
      path: "latestMessage.sender",
      select: "name email",
    });

    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching chats",
      error: error.message,
    });
  }
};
module.exports = { createOrAccessChat ,getUserChats};
    