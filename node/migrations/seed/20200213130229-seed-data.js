'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = async function (db) {
  await db.insert('events', {
    title: "Cat Test Event",
    description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    image: "https://i.imgur.com/WsxRdVG.jpg",
    speaker: "Cat Berathian",
    location: "Cardiff",
    disabilityaccess: true,
    organiser: "Catty Catty cat",
    capacity: 90,
    date: "2020-03-03T00:00:00.000Z",
  });
  await db.insert('events', {
    title: "Cat Test Event 2",
    description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    image: "https://i.imgur.com/vgZrB5U.jpg",
    speaker: "Cat-lanister",
    location: "Cardiff",
    disabilityaccess: false,
    organiser: "Catty Catty cat",
    capacity: 46,
    date: "2020-03-03T00:00:00.000Z",
  });

  await db.insert('events', {
    title: "Cat Test Event 3",
    description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    image: "https://i.imgur.com/HwIbeq1.jpg",
    speaker: "Cat-lin Stark",
    location: "Cardiff",
    disabilityaccess: false,
    organiser: "A dog",
    capacity: 10,
    date: "2020-03-03T00:00:00.000Z",
  });

  await db.insert('events', {
    title: "Cat Test Event 4",
    description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    image: "https://i.imgur.com/PtmP1yu.jpg",
    speaker: "Catty mcCatperson",
    location: "Cardiff",
    disabilityaccess: true,
    organiser: "Catty",
    capacity: 34,
    date: "2020-03-03T00:00:00.000Z",
  });

  return null;
};

exports.down = async function (db) {
  await db.dropCollection('events');
  return null;
};

exports._meta = {
  "version": 1
};