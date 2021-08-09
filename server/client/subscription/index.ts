
// const subscriptionServer = SubscriptionServer.create(
//   {
//     schema,
//     execute,
//     subscribe,
//     onConnect(connectionParams: any, webSocket: any, context: any) {
//       console.log("Connected!");
//     },
//     onDisconnect(webSocket: any, context: any) {
//       console.log("Disconnected!");
//     },
//   },
//   {
//     server: httpServer,
//     path: server.graphqlPath,
//   }
// );

// ["SIGINT", "SIGTERM"].forEach((signal) => {
//   process.on(signal, () => subscriptionServer.close());
// });