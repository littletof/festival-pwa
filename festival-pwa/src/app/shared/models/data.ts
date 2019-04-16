export class ProgData<T> {
    payload?: T;
    src: 'cache' | 'web';
    error?: any;
    cacheDate?: Date;
    wontFetch?: boolean;
}

export class HashedData<T> {
    data: T;
    hash: number;
}

export class LocalStorageData<T> {
    data: T;
    cacheDate: Date;
}
