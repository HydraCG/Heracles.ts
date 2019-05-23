import { IDictionary } from "../IDictionary";
import { IIriTemplateMapping } from "./IIriTemplateMapping";
import MappingsBuilder from "./MappingsBuilder";

export default class PropertyMapping {
  private readonly builder: MappingsBuilder;
  private readonly result: IDictionary<string>;
  private readonly mapping: IIriTemplateMapping;

  /**
   * Initializes a new instance of the {@link PropertyMapping} class.
   * @param {MappingsBuilder} builder Mappings builder.
   * @param {IDictionary<string>} result Current property mappings.
   * @param {IIriTemplateMapping} mapping IRI template mapping.
   */
  public constructor(builder: MappingsBuilder, result: IDictionary<string>, mapping: IIriTemplateMapping) {
    this.builder = builder;
    this.result = result;
    this.mapping = mapping;
  }

  /**
   * Allows to map a value to a variable mapping.
   * @param {string} value Value to be used.
   * @returns {MappingsBuilder}
   */
  public havingValueOf(value: string): MappingsBuilder {
    this.result[this.mapping.variable] = value;
    return this.builder;
  }
}
