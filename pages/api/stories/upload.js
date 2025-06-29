import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const form = new formidable.IncomingForm();
  form.uploadDir = path.join(process.cwd(), 'public', 'stories');
  form.keepExtensions = true;

  if (!fs.existsSync(form.uploadDir)) fs.mkdirSync(form.uploadDir, { recursive: true });

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ success: false, message: 'Form error' });

    const { username, caption } = fields;
    const file = files.media;
    const fileName = path.basename(file[0].filepath);
    const mediaURL = `/stories/${fileName}`;

    // Simulate save to DB
    const story = {
      username: username[0],
      caption: caption[0],
      mediaURL,
      createdAt: new Date().toISOString()
    };

    console.log('✅ New story uploaded:', story);

    return res.status(200).json({ success: true, story });
  });
}