const Hapi = require("@hapi/hapi");
const routes = require("./routes");
const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: "localhost",
  });

  await server.route(routes);
  await server.start();

  console.log(`server berjalan di ${server.info.uri}`);
};

init();
