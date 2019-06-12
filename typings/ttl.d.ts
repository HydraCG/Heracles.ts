// Anything imported that ends in .json has the shape of "any".
declare module "*.ttl" {
  const value: string;
  export default value;
}
