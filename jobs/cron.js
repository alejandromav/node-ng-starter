/*global require, module*/

const schedule = require('node-schedule');
const log4js   = require('log4js');
const logger   = log4js.getLogger('JOB');
logger.level = 'debug';

module.exports.start = () => {
	logger.info('CRON START');
	require('./create-database')();

	//- REALTIME JOBS
	schedule.scheduleJob('* 08 * * *', function(){
		logger.info('RUNNING CONFIG JOBS...');
	});
};
