import Event from '../models/event.model';

const getEvents = async (query) => {
	try {
		if (query) {
			const regSearch = new RegExp(`${query}`, 'i');
			return await Event.find({ title: regSearch });
		}
		return await Event.find({});
	} catch (e) {
		// Log Errors
		throw Error('Error while getting events');
	}
};

const getEventById = async (id) => {
	try {
		return await Event.findById(id);
	} catch (e) {
		throw Error('Error while getting single event');
	}
};

export default { getEvents, getEventById };
