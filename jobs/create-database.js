/*global __dirname, require, process, module*/

const fs = require('fs');
const path = require('path');
const mysql = require('mysql');
const log4js = require('log4js');
const logger = log4js.getLogger('MASTER JOB');
logger.level = 'debug';

const connections = require('./../config/connections');
const datasource = connections[process.env.DB || 'localhost'];

module.exports = () => {
	logger.info('START JOB: CREATE DATABASE');
	const pool = mysql.createPool({
		host: datasource.url,
		user: datasource.user,
		password: datasource.password,
		multipleStatements: true,
		insecureAuth: true
	});

	fs.readFile(path.join(__dirname, '..', 'resources/sql/create.sql'), 'utf8', (err, data) => {
		if (err) {
			logger.error(err);
		} else {
			pool.query(data, err => {
				if (err) {
					logger.error('FINISH JOB: CREATE DATABASE');
					logger.error(err);
				} else {
					logger.info('FINISH JOB: CREATE DATABASE [OK]');
				}
			});
		}
	});
};
