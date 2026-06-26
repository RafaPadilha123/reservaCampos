import { HttpService } from '@nestjs/axios';
export declare class ApiService {
    private readonly httpService;
    private readonly baseUrl;
    constructor(httpService: HttpService);
    request(method: 'get' | 'post' | 'patch' | 'delete', endpoint: string, data?: any, token?: string): Promise<any>;
}
