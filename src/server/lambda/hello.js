exports.handler = hello

function hello(event, context, callback) {
  console.log('event', event)
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ msg: 'Hello' }),
  })
}
