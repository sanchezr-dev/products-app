import { IApiResponse } from "@/types";

export type JSONPrimitive = string | number | boolean | null;
export type JSONObject = { [key: string]: JSONData };
export type JSONArray = JSONData[];
export type JSONData = JSONPrimitive | JSONObject | JSONArray;

export class FetchError extends Error {
  response: Response;
  data?: { [key: string]: string | number };

  constructor({
    message,
    response,
    data,
  }: {
    message: string;
    response: Response;
    data?: { [key: string]: string | number };
  }) {
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FetchError);
    }

    this.name = "FetchError";
    this.response = response;
    this.data = data;
  }
}

export default class FetchJson {
  private static getHeaders(accessToken?: string) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    if (accessToken) {
      headers.append("Authorization", `Bearer ${accessToken}`);
    }

    return headers;
  }

  static async fetchJson<JSON = unknown>(
    input: RequestInfo,
    init?: RequestInit
  ): Promise<JSON> {
    const response = await fetch(input, init);
    const data = await response.json();

    if (response.ok) {
      return data;
    }

    throw new FetchError({
      message: response.statusText,
      response,
      data,
    });
  }

  static async get(url: string, accessToken?: string): Promise<IApiResponse> {
    const request = new Request(url, {
      method: "GET",
      headers: this.getHeaders(accessToken),
    });
    return await this.fetchJson(request);
  }

  static async post(
    url: string,
    payload: JSONData,
    accessToken?: string
  ): Promise<any> {
    const request = new Request(url, {
      method: "POST",
      headers: this.getHeaders(accessToken),
      body: JSON.stringify(payload),
    });
    return await this.fetchJson(request);
  }
}
