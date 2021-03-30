import {
    IsOptional,
    IsString,
    IsUUID,
    IsPositive,
    IsDateString,
    IsUrl
} from 'class-validator';

export class BaseModel {
    @IsOptional()
    @IsUUID()
    objectId?: string;

    @IsOptional()
    @IsDateString()
    createdAt?: string;

    @IsOptional()
    @IsDateString()
    updatedAt?: string;
}

export class FileModel extends BaseModel {
    @IsString()
    provider: string;

    @IsString()
    bucket: string;

    @IsString()
    name: string;

    @IsUrl()
    url: string;
}

export class CoordinateModel {
    @IsPositive()
    latitude: number;

    @IsPositive()
    longitude: number;
}

export class BaseQuery {
    @IsOptional()
    @IsPositive()
    pageSize?: number;

    @IsOptional()
    @IsPositive()
    pageIndex?: number;

    @IsOptional()
    @IsString()
    keyword?: string;
}
