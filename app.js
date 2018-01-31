/*global require*/

const server = require('server');
const express = require('express');
const { get } = server.router;
const { modern } = server.utils;

//- CRON
require('./jobs/cron').start();

const middleware = modern(express.static('./public/dist/'));

server(
	{ views: 'public/dist' },
	[
		get('/*', middleware)
	]
);
