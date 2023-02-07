import express from 'express';
import * as dotenv from 'dotenv';
import {v2 as cloudinary} from 'cloudinary';

import Post from '../mongodb/models/post.js';

dotenv.config();
const router = express.Router();

router.get('/', (req, res) => {
    res.send("post routes page")
})

export default router;