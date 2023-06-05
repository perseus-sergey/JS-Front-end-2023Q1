export interface IJson {
  [x: string]: string | number | boolean | Date | IJson | IJsonArray;
}
export type IJsonArray = (string | number | boolean | Date | IJson | IJsonArray)[];
export type LinkOptions = { [key: string]: string };
export interface ResponseMaker {
  endpoint: string;
  options?: {
      sources?: string;
  };
}
