import { hydra } from "../namespaces";

export const JsonLdHelper = {
  validKeys(instance: object, nonHydra = false): Iterable<string> {
    return Object.keys(instance).filter(
      _ => _.length > 0 && _.charAt(0) !== "@" && (!nonHydra || Object.keys(hydra).indexOf(_) === -1)
    );
  }
};
