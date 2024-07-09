// ExternalApiService.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { Service } from "typedi";

interface ExternalApiServiceOptions {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
}

@Service()
export class ExternalApiService {
  private axiosInstance: AxiosInstance;

  private constructor(options: ExternalApiServiceOptions) {
    this.axiosInstance = axios.create({
      baseURL: options?.baseURL || "",
      timeout: options?.timeout || 5000,
      headers: options?.headers || { "Content-Type": "application/json" },
    });

    this.initializeResponseInterceptor();
  }

  public static Builder = class {
    public options: ExternalApiServiceOptions;

    constructor(baseURL: string) {
      this.options = { baseURL };
    }

    public setTimeout(timeout: number) {
      this.options.timeout = timeout;
      return this;
    }

    public setHeaders(headers: Record<string, string>) {
      this.options.headers = headers;
      return this;
    }

    public build() {
      return new ExternalApiService(this.options);
    }
  };

  private initializeResponseInterceptor() {
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        console.error("API Error:", error.response?.data || error.message);
        return Promise.reject(error);
      }
    );
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.get<T>(url, config);
    return response.data;
  }

  public async post<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data, config);
    return response.data;
  }
}
