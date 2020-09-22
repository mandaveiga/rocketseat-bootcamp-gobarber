import path from "path";
import multer from "multer";
import crypto from "crypto";

export default {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, "..", "..", "tmp"),
        filename(request, file, callback) {
            const fileHash = crypto.randomBytes(10).toString("hex");
            const filename = `${fileHash}-${file.originalname}`;

            return callback(null, filename);
        },
    }),
    directory: path.resolve(__dirname, "..", "..", "tmp"),
};
