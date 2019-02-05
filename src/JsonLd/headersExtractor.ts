import HeadersCollection from "../DataModel/Collections/HeadersCollection";
import { IHeader } from "../DataModel/IHeader";
import { IHeaderTemplate } from "../DataModel/IHeaderTemplate";
import TemplatedHeader from "../DataModel/TemplatedHeader";

export const headersExtractor = headers => {
  const result = new Array<IHeader>();
  for (const header of headers) {
    if (!!header.mapping) {
      result.push(new TemplatedHeader(header, header as IHeaderTemplate));
    } else {
      const name = header.split(":")[0];
      result.push({ name, value: header.substr(name.length + 1).trim() });
    }
  }

  return new HeadersCollection(result);
};
