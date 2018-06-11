export class Page<T> {

    public content: T[];
    public first: boolean;
    public last: boolean;
    public number: number;
    public numberOfElements: number;
    public pageable: Pageable;
    public size: number;
    public sort: Sort;
    public totalElements: number;
    public totalPages: number;

    public static fromJson<C>(json: any, contentMapper: (content: any) => C): Page<C> {
        let page = new Page<C>();
        page.content = json.content.map(instance => contentMapper(instance));
        page.first = json.first;
        page.last = json.last;
        page.number = json.number;
        page.numberOfElements = json.numberOfElements;
        page.pageable = Pageable.fromJson(json.pageable);
        page.size = json.size;
        page.sort = Sort.fromJson(json.sort);
        page.totalElements = json.totalElements;
        page.totalPages = json.totalPages;
        return page;
    }
}

export class Pageable {

    public offset: number;
    public pageNumber: number;
    public pageSize: number;
    public paged: boolean;
    public sort: Sort;
    public unpaged: boolean;

    public static fromJson(json: any): Pageable {
        let pageable = new Pageable();
        pageable.offset = json.offset;
        pageable.pageNumber = json.pageNumber;
        pageable.pageSize = json.pageSize;
        pageable.paged = json.paged;
        pageable.sort = Sort.fromJson(json.sort);
        pageable.unpaged = json.unpaged;
        return pageable;
    }
}

export class Sort {

    public sorted: boolean;
    public unsorted: boolean;

    public static fromJson(json: any): Sort {
        let sort = new Sort();
        sort.sorted = json.sorted;
        sort.unsorted = json.unsorted;
        return sort;
    }
}

// "first": true,
// "last": false,
// "number": 0,
// "numberOfElements": 20,
// "pageable": {
//     "offset": 0,
//     "pageNumber": 0,
//     "pageSize": 20,
//     "paged": true,
//     "sort": {
//         "sorted": false,
//         "unsorted": true
//     },
//     "unpaged": false
// },
// "size": 20,
// "sort": {
//     "sorted": false,
//     "unsorted": true
// },
// "totalElements": 124,
// "totalPages": 7
