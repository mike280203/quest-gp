import { app } from "./src/app";
import { printStartupBanner } from "./src/lib/banner";

const hostname = "0.0.0.0";
const port = 3001;

printStartupBanner({ hostname, port });

export default {
  hostname,
  port,
  fetch: app.fetch,
};
