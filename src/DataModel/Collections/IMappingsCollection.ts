import { IIriTemplateMapping } from "../IIriTemplateMapping";
import { ITypedResourceFilteredCollection } from "./ITypedResourceFilteredCollection";

/**
 * Provides an abstract description of the collection of {@link IIriTemplateMapping}
 * that can be filtered with relevant criteria.
 * @interface
 */
export interface IMappingsCollection extends ITypedResourceFilteredCollection<IIriTemplateMapping> {
  /**
   * Obtains a collection of mappings for a given variable name.
   * @param variableName {string} Variable name.
   * @returns {IMappingsCollection}
   */
  ofVariableName(variableName: string): IMappingsCollection;
}
