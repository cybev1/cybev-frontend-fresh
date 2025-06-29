import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import dbConnect from '@/lib/dbConnect';
import Reel from '@/models/Reel';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  await dbConnect();
  const form = new formidable.IncomingForm();
  form.uploadDir = './public/uploads/reels';
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: 'Error parsing form data' });

    try {
      const { caption = '', tags = '', category = '' } = fields;
      const file = files.media;
      if (!file) return res.status(400).json({ error: 'No media uploaded' });

      const fileName = path.basename(file[0].filepath);
      const reel = new Reel({
        caption,
        tags: tags.split(',').map((tag) => tag.trim()),
        category,
        mediaUrl: `/uploads/reels/${fileName}`,
        slug: uuidv4(),
        createdAt: new Date(),
      });

      await reel.save();
      return res.status(200).json({ message: 'Reel uploaded successfully', reel });
    } catch (error) {
      return res.status(500).json({ error: 'Error saving reel' });
    }
  });
}
