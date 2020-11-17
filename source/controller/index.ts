import { getMetadataArgsStorage } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';

import { SessionController } from './Session';
import { UserController } from './User';

export * from './Session';
export * from './User';

export const router = {
    controllers: [UserController, SessionController]
};
const schemas = validationMetadatasToSchemas({
    refPointerPrefix: '#/components/schemas/'
});
export const spec = routingControllersToSpec(getMetadataArgsStorage(), router, {
    components: { schemas }
});
