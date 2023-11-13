import multer from "multer";
import DataParser from "datauri/parser.js";
import path from "path";
const storage = multer.memoryStorage();

const upload = multer({ storage });

export const formatImage = (file) => {
  const parser = new DataParser();
  const dataUri = parser.format(
    path.extname(file.originalname).toString(),
    file.buffer
  );
  return dataUri.content;
};

export default upload;
