const express = require('express');
const multer = require('multer');
const obj2gltf = require('obj2gltf');
const fs = require('fs-extra');
const path = require('path');
const app = express();
const PORT = 3001;

// Setup upload directory
const uploadDir = path.join(__dirname, 'uploads');
fs.ensureDirSync(uploadDir);
const upload = multer({ 
    dest: 'uploads/',
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(obj)$/i)) {
            return cb(new Error('Only .obj files are allowed!'), false);
        }
        cb(null, true);
    }
});

// Output directory for GLB models inside the Next.js public folder
const outputDir = path.join(__dirname, 'public/models');
fs.ensureDirSync(outputDir);

// Serve the models statically via Express if needed, though Next.js handles /models/
app.use('/models', express.static(outputDir));

// Security: Read API key from environment variable, with a fallback for local dev
const API_KEY = process.env.GLTF_UPLOAD_API_KEY || 'mowglai-secret-key-2026';

// API Endpoint
app.post('/upload-and-convert', upload.single('modelFile'), async (req, res) => {
    // 1. API Security Check
    const clientApiKey = req.headers['x-api-key'];
    if (clientApiKey !== API_KEY) {
        if (req.file) await fs.remove(req.file.path); // Cleanup unauthorized upload
        return res.status(401).json({ error: 'Unauthorized: Invalid API Key.' });
    }

    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Please upload a file.' });
        }

        const inputPath = req.file.path;
        const outputFileName = `${Date.now()}_generated.glb`;
        const outputPath = path.join(outputDir, outputFileName);

        const options = {
            binary: true,
            dracoOptions: {
                compressionLevel: 7
            }
        };

        const gltf = await obj2gltf(inputPath, options);
        await fs.writeFile(outputPath, gltf);

        await fs.remove(inputPath);

        const fileUrl = `http://localhost:3000/models/${outputFileName}`;
        res.json({ 
            success: true, 
            message: 'GLB file generated successfully!', 
            downloadUrl: fileUrl 
        });

    } catch (error) {
        console.error('Conversion Error:', error);
        res.status(500).json({ error: 'Error converting file.' });
    }
});

app.listen(PORT, () => {
    console.log(`Backend Conversion Server running at: http://localhost:${PORT}`);
});
