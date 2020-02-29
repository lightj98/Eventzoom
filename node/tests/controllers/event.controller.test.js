import request from 'supertest';
import index from '../../src/root';
import eventService from '../../src/services/event.service';
import fileService from '../../src/services/file.service';
import getValidJwt from './getValidJwt';

jest.mock('../../src/services/event.service');
jest.mock('../../src/services/file.service');

describe('testing GET events/', () => {
	it('should fetch all event', async () => {
		eventService.getEvents = jest.fn().mockImplementation(async () => ['example1', 'example2']);
		const res = await request(index.app)
			.get('/events/')
			.send();
		await expect(res.body).toEqual(['example1', 'example2']);
		return expect(eventService.getEvents.mock.calls[0]).toEqual([undefined]);
	});
	it('should fail if service returns error', async () => {
		eventService.getEvents = jest.fn().mockImplementation(() => Promise.reject(Error('test')));
		const res = await request(index.app)
			.get('/events/')
			.send();
		await expect(res.body).toEqual({ status: 400, message: 'test' });
		return expect(eventService.getEvents.mock.calls[0]).toEqual([undefined]);
	});
	it('should fetch an event with query param', async () => {
		eventService.getEvents = jest.fn().mockImplementation(async () => ['example1', 'example2']);
		const res = await request(index.app)
			.get('/events/?query=example')
			.send();
		await expect(res.body).toEqual(['example1', 'example2']);
		return expect(eventService.getEvents.mock.calls[0]).toEqual(['example']);
	});
});

describe('testing events/advanced', () => {
	it('should fetch an event', async () => {
		eventService.getEventsAdvanced = jest.fn().mockImplementation(async () => ['example1']);
		const res = await request(index.app)
			.get('/events/advanced?title=test')
			.send();
		return expect(res.body).toEqual(['example1']);
	});
	it('should fail if service returns error', async () => {
		eventService.getEventsAdvanced = jest.fn().mockImplementation(() => Promise.reject(Error('test')));
		const res = await request(index.app)
			.get('/events/advanced')
			.send();
		await expect(res.body).toEqual({ status: 400, message: 'test' });
		return expect(eventService.getEventsAdvanced.mock.calls[0]).toEqual([[]]);
	});
});


describe('testing events/1', () => {
	it('should fetch successfully', async () => {
		eventService.getEventById = jest.fn().mockImplementation(async () => ({ test: 'test' }));
		const res = await request(index.app)
			.get('/events/1')
			.send();
		await expect(res.body).toEqual({ test: 'test' });
		return expect(eventService.getEventById.mock.calls[0]).toEqual(['1']);
	});
	it('should fail if service returns error', async () => {
		eventService.getEventById = jest.fn().mockImplementation(() => Promise.reject(Error('test')));
		const res = await request(index.app)
			.get('/events/1')
			.send();
		await expect(res.body).toEqual({ status: 400, message: 'test' });
		return expect(eventService.getEventById.mock.calls[0]).toEqual(['1']);
	});
});

describe(' testing POST events/', () => {
	it('should calll service and return success true', async () => {
		eventService.addEvent = jest.fn().mockImplementation(async () => ({ something: true }));
		fileService.uploadFile = jest.fn().mockImplementation(async () => ('http://google.com'));
		const date = new Date(2019, 1, 1);
		// eslint-disable-next-line no-unused-expressions
		const res = await request(index.app)
			.post('/events')
			.set('Authorization', `Bearer ${await getValidJwt()}`)
			.attach('file', `${__dirname}/image.png`)
			.field('title', 'Cats')
			.field('description', 'Cats')
			.field('speaker', 'speaker')
			.field('vagueLocation', 'Location')
			.field('specificLocation', 'Location')
			.field('disabilityAccess', '1')
			.field('organiser', 'John')
			.field('capacity', 2)
			.field('series', '5e595ce2d8118f0888f56150')
			.field('date', date.toString());
		await expect(res.body).toEqual({ success: true });
		// remove date from check to deal with timezone fuckaroo
		eventService.addEvent.mock.calls[0][0].date = 'excluded';
		await expect(eventService.addEvent.mock.calls[0]).toMatchSnapshot();
		return expect(fileService.uploadFile.mock.calls[0]).toMatchSnapshot();
	});
});
