import mongoose from 'mongoose';

const SeriesSchema = new mongoose.Schema({
	title: {
		type: String, required: true,
	},
	description: {
		type: String, required: true,
	},
	image: {
		type: String, required: true,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User',
	},
	events: [{
		type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Event',
	}],

});
const Series = mongoose.model('Series', SeriesSchema);

export default Series;
