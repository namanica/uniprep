import { EnvironmentContext, JestEnvironmentConfig } from '@jest/environment';
import NodeEnvironment from 'jest-environment-node';

class CustomEnvironment extends NodeEnvironment {
  constructor(config: JestEnvironmentConfig, context: EnvironmentContext) {
    const deleteGlobalProperty = (prop: string) => {
      const descriptor = Object.getOwnPropertyDescriptor(global, prop);

      if (descriptor) {
        delete (global as any)[prop];
      }
    };

    deleteGlobalProperty('localStorage');
    deleteGlobalProperty('sessionStorage');

    super(config, context);
  }
}

module.exports = CustomEnvironment;
