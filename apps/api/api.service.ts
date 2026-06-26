
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ApiService {
  
  private readonly baseUrl = 'http://localhost:3000';

  constructor(private readonly httpService: HttpService) {}

  
  async request(method: 'get' | 'post' | 'patch' | 'delete', endpoint: string, data?: any, token?: string) {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    
    const response$ = this.httpService.request({
      method,
      url: `${this.baseUrl}${endpoint}`,
      data,
      headers,
    });

    const response = await firstValueFrom(response$);
    return response.data;
  }
}