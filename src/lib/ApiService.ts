import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { REMOTE_HOST } from "@env";

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: REMOTE_HOST,
    });
  }

  private async request<T>(config: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance(config);
      return response.data;
    } catch (error) {
      console.error(error)
      throw error;
    }
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return await this.request<T>({ ...config, method: "GET", url });
  }

  public async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return await this.request<T>({ ...config, method: "POST", url, data });
  }
}

export default new ApiService();
