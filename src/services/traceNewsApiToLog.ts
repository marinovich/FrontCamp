import * as Models from 'models';

export const traceNewsApiToLog = (object: Models.IRequestFactoryResult): Models.IRequestFactoryResult => {
  return new Proxy(object, {
    get(target, propKey) {
      const origMethod = target[propKey];

      return async function (...args) {
        const result = origMethod.apply(this, args);

        const argsMessage = args.length
          ? `arguments: ${args.map(arg => Object.keys(arg).map(key => `${key} = ${arg[key]}`)).join(', ')}`
          : 'no arguments';

        // tslint:disable:no-console
        console.log(`Getting ${String(propKey)} from NewsApi with ${argsMessage}`);
        console.log(`Receiving ${String(propKey)} result: `, await result);

        return result;
      };
    },
  });
};
