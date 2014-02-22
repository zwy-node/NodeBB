var	fork = require('child_process').fork,
	start = function() {
		var	nbb = fork('./app', [], {
				env: {
					'NODE_ENV': process.env.NODE_ENV
				}
			});

		nbb.on('message', function(cmd) {
			if (cmd === 'nodebb:restart') {
				nbb.on('exit', function() {
					start();
				});
				nbb.kill();
			}
		});
	};

start();