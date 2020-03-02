import bcrypt from 'bcryptjs';
import User from '../models/user.model';

const createUser = async (user) => {
	const hash = await bcrypt.hash(user.password, 8);
	await ((new User({ ...user, password: hash })).save());
	return true;
};

const getUserByEmail = async (email) => {
	try {
		return await User.findOne({ email });
	} catch (e) {
		throw Error('Error while getting single user');
	}
};

const getUserById = async (id) => {
	try {
		return await User.findById(id);
	} catch (e) {
		throw Error('Error while getting single user');
	}
};

const changeUserSeriesSubscription = async (seriesId, UserId, subscribe) => {
	const user = await getUserById(userId);
	if (subscribe) {
		// Suscribe user
		user.subscribedSeries.push(seriesId);
	} else {
		// Unsubscribe user
		user.subscribedSeries.pull(seriesId);
	}
};

export default {
	createUser, getUserByEmail, getUserById, changeUserSeriesSubscription,
};
