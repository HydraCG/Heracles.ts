import MappingsCollection from "./Collections/MappingsCollection";
import { IHeader } from "./IHeader";
import { ITemplate } from "./ITemplate";
import { IDictionary, ITemplated, MappingBuilder } from "./ITemplated";
import MappingsBuilder from "./MappingsBuilder";

/**
 * Provides a base functionality for haeders that has expandable template.
 * @class
 */
export default class TemplatedHeader implements IHeader, ITemplated<IHeader> {
  public readonly name: string;

  public readonly value: string = "";

  private readonly template: string;

  private readonly mappings: MappingsCollection;

  /**
   * Initializes a new instance of the {@link TemplatedHeader} class.
   * @param {IHeader} header The header
   * @param {IIriTemplate} template Header template.
   * @constructor
   */
  public constructor(header: IHeader, template: ITemplate) {
    this.name = header.name;
    this.template = template.template;
    this.mappings = template.mappings;
  }

  public expand(mappedVariables: IDictionary | MappingBuilder): IHeader {
    let templateVariables: IDictionary = null;
    if (mappedVariables instanceof Function) {
      const builder = new MappingsBuilder(this.mappings);
      mappedVariables(builder);
      templateVariables = builder.complete() as IDictionary;
    } else {
      templateVariables = mappedVariables as IDictionary;
    }

    let value = this.template;
    for (const property of Object.keys(templateVariables)) {
      if (this.template.length === 0) {
        value = templateVariables[property] || "";
        if (value.length > 0) {
          break;
        }
      }

      value = value.replace(new RegExp(`{ ?${property} ?}`), templateVariables[property]);
    }

    return { name: this.name, value };
  }
}
