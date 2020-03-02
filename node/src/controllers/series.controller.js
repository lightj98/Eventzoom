import express from 'express';
import passport from 'passport';
import multer from 'multer';
import validator from '../middleware/validator';
import seriesService from '../services/series.service';
import fileService from '../services/file.service';

const router = express.Router();
const upload = multer();

router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	upload.single('image'),
	validator('required', { field: 'title' }),
	validator('required', { field: 'description' }),
	validator('fileSize', { file: 'file', maxSize: 1e+7 }), // 10MB
	validator('fileType', { file: 'file', types: /^image\/.*$/ }),
	async (req, res) => {
		const location = await fileService.uploadFile(req.validated.file);
		await seriesService.createSeries(
			{
				title: req.validated.title,
				description: req.validated.description,
				image: location,
				user: req.user._id,
			},
		);
		res.json({ success: true });
	},
);


router.get(
	'/mine',
	passport.authenticate('jwt', { session: false }),
	async (req, res) => {
		const series = await seriesService.getSeriesForUser(req.user);
		res.json(series);
	},
);

router.get(
	'/:id',
	async (req, res) => {
		try {
			const series = await seriesService.getSeriesById(req.params.id);
			return res.send(series);
		} catch (e) {
			return res.status(400).json({ status: 400, message: e.message });
		}
	},
);

router.post(
	'/change-subscription',
	validator('required', { field: 'seriesId' }),

	async (req, res) => {
		try {
			return res.status(200);
		} catch (e) {
			return res.status(400).json({ status: 400, message: e.message });
		}
	},
);

export default router;
