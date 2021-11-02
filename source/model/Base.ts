import {
    IsOptional,
    IsString,
    IsUUID,
    IsPositive,
    IsDate,
    IsUrl
} from 'class-validator';
import { Object as LCObject } from 'leancloud-storage';

export type TypeKeys<D, V> = {
    [K in keyof D]: D[K] extends V ? K : never;
}[keyof D];

export type DataKeys<D> = Omit<D, TypeKeys<D, Function>>;

const LCObjectDataKeys = ['attributes', 'cid', 'changed'];

export class BaseModel extends LCObject {
    @IsOptional()
    @IsUUID()
    objectId?: string;

    @IsOptional()
    @IsDate()
    createdAt?: Date;

    @IsOptional()
    @IsDate()
    updatedAt?: Date;

    constructor(data: DataKeys<BaseModel>) {
        super();

        for (const key in data)
            if (
                Object.prototype.hasOwnProperty.call(data, key) &&
                key[0] !== '_' &&
                !LCObjectDataKeys.includes(key)
            )
                this.set(key, data[key]);
    }
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
