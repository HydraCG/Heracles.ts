import { hydra } from "../../namespaces";
import { IClass } from "../IClass";
import { ICollectionSpecification } from "../ICollectionSpecification";
import { IResource } from "../IResource";
import ResourceFilterableCollection from "./ResourceFilterableCollection";

/**
 * Provides a convenient way of accessing description resources of returned by an operation.
 */
export default class ReturnedResourcesCollection extends ResourceFilterableCollection<IResource> {
  /**
   * Obtains returned classes, if any.
   */
  public classes(): ResourceFilterableCollection<IClass> {
    return this.narrowFiltersWith("type", hydra.Class) as ResourceFilterableCollection<IClass>;
  }

  /**
   * Obtains returned collections matching some specification, if any.
   */
  public collections(): ResourceFilterableCollection<ICollectionSpecification> {
    return this.narrowFiltersWith("type", hydra.CollectionSpecification) as ResourceFilterableCollection<
      ICollectionSpecification
    >;
  }

  /**
   * Obtains returned resources that are neither {@link IClass} nor {@link ICollectionSpecification}, if any.
   */
  public resources(): ResourceFilterableCollection<IResource> {
    return ((this.narrowFiltersWith("type", hydra.Resource) as any).narrowFiltersWith(
      "type",
      hydra.Class,
      false
    ) as any).narrowFiltersWith("type", hydra.CollectionSpecification, false) as ResourceFilterableCollection<
      IResource
    >;
  }
}
