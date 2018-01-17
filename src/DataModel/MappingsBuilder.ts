import MappingsCollection from "./Collections/MappingsCollection";
import PropertyMapping from "./PropertyMapping";

export default class MappingsBuilder {
  private readonly mappings: MappingsCollection;
  private readonly result: { [name: string]: string };

  public constructor(mappings: MappingsCollection) {
    this.mappings = mappings;
    this.result = {};
  }

  public withProperty(property: string): PropertyMapping {
    const mapping = this.mappings.ofProperty(property).first();
    if (!mapping) {
      throw new Error(`Invalid mapping of property '${property}.`);
    }

    return new PropertyMapping(this, this.result, mapping);
  }

  public withVariable(variableName: string): PropertyMapping {
    const mapping = this.mappings.ofVariableName(variableName).first();
    if (!mapping) {
      throw new Error(`Invalid mapping of variable name mapping '${variableName}.`);
    }

    return new PropertyMapping(this, this.result, mapping);
  }

  public complete(): { [name: string]: string } {
    return this.result;
  }
}
