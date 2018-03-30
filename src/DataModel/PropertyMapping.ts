import { IIriTemplateMapping } from "./IIriTemplateMapping";
import MappingsBuilder from "./MappingsBuilder";

export default class PropertyMapping {
  private readonly builder: MappingsBuilder;
  private readonly result: { [name: string]: string };
  private readonly mapping: IIriTemplateMapping;

  public constructor(builder: MappingsBuilder, result: { [name: string]: string }, mapping: IIriTemplateMapping) {
    this.builder = builder;
    this.result = result;
    this.mapping = mapping;
  }

  public havingValueOf(value: string): MappingsBuilder {
    this.result[this.mapping.variable] = value;
    return this.builder;
  }
}
