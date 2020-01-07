import "reflect-metadata";

import { createExpressApp } from "./common/inversify/createExpressApp";
import { createInversifyContainer } from "./common/inversify/createInversifyContainer";
import { logger } from "./common/utils";
import { exceptionHandlers } from "./exceptionHandlers";

const { PORT } = process.env;

createInversifyContainer()
  .then((inversifyContainer) => {
    createExpressApp(inversifyContainer, exceptionHandlers).listen(PORT);
    logger.log("info", `server is running on port:${PORT}`);
  });