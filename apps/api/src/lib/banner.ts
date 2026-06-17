import { logger } from "./logger";

type BannerOptions = {
  hostname: string;
  port: number;
};

export function printStartupBanner({ hostname, port }: BannerOptions) {
  const localUrl = `http://localhost:${port}`;
  const networkUrl = `http://${hostname}:${port}`;

  console.log("");
  console.log("  Quest GP API");
  console.log("  ------------------------------");
  console.log(`  Local:   ${localUrl}`);
  console.log(`  Network: ${networkUrl}`);
  console.log("  Status:  ready for racing");
  console.log("");

  logger.info({ localUrl, networkUrl }, "api server started");
}
