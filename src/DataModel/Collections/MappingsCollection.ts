import { IIriTemplateMapping } from "../IIriTemplateMapping";
import { IMappingsCollection } from "./IMappingsCollection";
import TypedResourceFilteredCollection from "./TypedResourceFilterableCollection";

/**
 * Provides a collection of {@link IIriTemplateMapping} that can be filtered with relevant criteria.
 * @class
 */
export default class MappingsCollection extends TypedResourceFilteredCollection<IIriTemplateMapping>
  implements IMappingsCollection {
  /**
   * Initializes a new instance of the {@link MappingsCollection}
   * class with initial collections of mappings to filter.
   * @param mappings {Iterable<IIriTemplateMapping>} Initial collection of mappings to filter.
   */
  public constructor(mappings: Iterable<IIriTemplateMapping>) {
    super(mappings);
  }

  public ofVariableName(variableName: string): IMappingsCollection {
    return (this.narrowFiltersWith<IIriTemplateMapping>(
      "variable",
      value => value.variable === variableName
    ) as any) as MappingsCollection;
  }

  protected createInstance(items: Iterable<IIriTemplateMapping>): MappingsCollection {
    return new MappingsCollection(items);
  }
}
