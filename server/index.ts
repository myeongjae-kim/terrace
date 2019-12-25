import "reflect-metadata";

import { createExpressApp } from "./common/inversify/createExpressApp";
import { createInversifyContainer } from "./common/inversify/createInversifyContainer";
import { NextApplication } from "./common/nextjs/NextApplication";
import { logger } from "./common/utils";
import { errorHandlers } from "./errorHandlers";

const PORT = 3000;

const nextApplication = new NextApplication();

nextApplication.run()
  .then(createInversifyContainer)
  .then((inversifyContainer) => {
    createExpressApp(inversifyContainer, errorHandlers).listen(PORT);
    logger.log("info", `server is running on port:${PORT}`);
  });