import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import multer from 'multer';
import cloudinary from '../../../utils/cloudinary';

const upload = multer({ storage: multer.memoryStorage() });

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Bir hata oluştu: ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Yöntem ${req.method} desteklenmiyor!` });
  },
});

apiRoute.use(upload.single('file'));

apiRoute.post(async (req: any, res: NextApiResponse) => {
  const file = req.file;
  if (!file) return res.status(400).json({ error: 'Dosya yok!' });

  const stream = cloudinary.uploader.upload_stream(
    { folder: 'products' },
    (error, result) => {
      if (error) return res.status(500).json({ error: error.message });
      res.status(200).json({ url: result?.secure_url });
    }
  );
  stream.end(file.buffer);
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
}; 