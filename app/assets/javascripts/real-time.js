var socket = io.connect('http://tubalr.nodejitsu.com');

function push_search (search) {
  socket.emit('new_search', search);
}