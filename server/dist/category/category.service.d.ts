import { PrismaService } from "src/database/prisma.service";
import { CategoryCreateDTO, CategoryUpdateDTO } from "./category.dto";
export declare class CategoryService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    findAll(): Promise<{
        id: string;
        name: string;
        slug: string;
        isVisible: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findById(id: string): Promise<{
        id: string;
        name: string;
        slug: string;
        isVisible: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findBySlug(slug: string): Promise<{
        id: string;
        name: string;
        slug: string;
        isVisible: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    create(dto: CategoryCreateDTO): Promise<{
        id: string;
        name: string;
        slug: string;
        isVisible: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, dto: CategoryUpdateDTO): Promise<{
        id: string;
        name: string;
        slug: string;
        isVisible: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    delete(id: string): Promise<{
        id: string;
        name: string;
        slug: string;
        isVisible: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
