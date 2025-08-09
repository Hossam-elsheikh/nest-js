import { Inject, Injectable } from '@nestjs/common';
import { PaginationQueryDto } from '../dtos/pagination-query.dto';
import { ObjectLiteral, Repository } from 'typeorm';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { Paginated } from '../interfaces/paginated.interface';

@Injectable()
export class PaginationProvider {
  constructor(
    // we're injecting request to make request body available in the provider
    @Inject(REQUEST)
    private readonly request: Request,
  ) {}
  // here we are accepting generic T that can be type of any entity to make it dynamic to use any repository
  public async paginateQuery<T extends ObjectLiteral>(
    paginateQuery: PaginationQueryDto,
    repository: Repository<T>,
  ): Promise<Paginated<T>> {
    // here we define the return type
    let results = await repository.find({
      skip: (paginateQuery.page || 1 - 1) * (paginateQuery.limit || 10),
      take: paginateQuery.limit, // take n posts at a time
    });

    // here we are trying to follow the paginated.interface.ts structure

    // create the request links
    const baseUrl =
      this.request.protocol + '://' + this.request.headers.host + '/';
    const newUrl = new URL(this.request.url, baseUrl);

    // calculating page number
    const totalItems = await repository.count();
    const totalPages = Math.ceil(totalItems / (paginateQuery.limit || 10));
    const nextPAge =
      paginateQuery === totalPages
        ? paginateQuery.page
        : (paginateQuery.page || 1) + 1;

    const prevPage =
      paginateQuery.page === 1
        ? paginateQuery.page
        : (paginateQuery.page || 1) - 1;

    const finalResponse: Paginated<T> = {
      data: results,
      meta: {
        itemsPerPAge: paginateQuery.limit || 10,
        totalItems: totalItems,
        currentPage: paginateQuery.page || 1,
        totalPages: totalPages,
      },
      links: {
        first: `${newUrl.origin}${newUrl.pathname}?limit=${paginateQuery.limit}&page=1`,
        last: `${newUrl.origin}${newUrl.pathname}?limit=${paginateQuery.limit}&page=${totalPages}`,
        current: `${newUrl.origin}${newUrl.pathname}?limit=${paginateQuery.limit}&page=${paginateQuery.page}`,
        next: `${newUrl.origin}${newUrl.pathname}?limit=${paginateQuery.limit}&page=${nextPAge}`,
        previous: `${newUrl.origin}${newUrl.pathname}?limit=${paginateQuery.limit}&page=${prevPage}`,
      },
    };
    return finalResponse;
  }
}
