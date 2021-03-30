import { getMetadataArgsStorage } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
// @ts-ignore
import { defaultMetadataStorage } from 'class-transformer/cjs/storage';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';

import { SessionController } from './Session';
import { UserController } from './User';

export * from './Session';
export * from './User';

export const router = {
    controllers: [UserController, SessionController]
};
const schemas = validationMetadatasToSchemas({
    classTransformerMetadataStorage: defaultMetadataStorage,
    refPointerPrefix: '#/components/schemas/'
});
export const spec = routingControllersToSpec(getMetadataArgsStorage(), router, {
    components: { schemas }
});
