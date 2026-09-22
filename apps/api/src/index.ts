import { app, logger } from "./app";
import { config } from "./config";

app.listen(config.port, () => {
  logger.info(`Penginapan Annisa API running on port ${config.port}`);
  logger.info(
    `Scalar Interactive API Docs: http://localhost:${config.port}/docs`,
  );
  logger.info(
    `Health check endpoint: http://localhost:${config.port}/health`,
  );
});
