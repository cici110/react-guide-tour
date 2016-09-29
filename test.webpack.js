var context = require.context('./test', true, /spec\.js$/);
context.keys().forEach(context);

var context = require.context('./app', true, /\.jsx?$/);
context.keys().forEach(context);

