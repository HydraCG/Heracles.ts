// Anything imported that ends in .json has the shape of "any".
declare module "*.json" {
  const value: any;
  export default value;
}
