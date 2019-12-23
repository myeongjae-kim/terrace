import { AxiosError } from "axios";

export default (data: any): AxiosError => ({
  isAxiosError: true,
  response: {
    data
  }
} as any)