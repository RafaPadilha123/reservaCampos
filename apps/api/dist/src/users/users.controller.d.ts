import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<{
        id: number;
        email: string;
        name: string;
        password: string;
        role: string;
    }>;
    findAll(): Promise<{
        id: number;
        email: string;
        name: string;
        role: string;
    }[]>;
}
