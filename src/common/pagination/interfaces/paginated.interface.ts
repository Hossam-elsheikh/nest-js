// this define the shape of the response 

export interface Paginated<T> {
  data: T[];
  meta: {
    itemsPerPAge: number;
    totalItems: number;
    currentPage: number;
    totalPages: number;
  };
  links: {
    first: string;
    last: string;
    current: string;
    next: string;
    previous: string;
  };
}
