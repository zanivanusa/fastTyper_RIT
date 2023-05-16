import Text from "../models/textModel.js";

const getRandomText = async (req, res) => {
  try {
    const count = await Text.countDocuments();
    const randomIndex = Math.floor(Math.random() * count);
    const randomText = await Text.findOne().skip(randomIndex);

    if (!randomText) {
      return res.status(404).json({ message: 'No text found' });
    }

    res.status(200).json(randomText);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getRandomText };
