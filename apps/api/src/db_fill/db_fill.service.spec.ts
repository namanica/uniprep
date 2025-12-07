import { Test, TestingModule } from '@nestjs/testing';
import { DbFillService } from './db_fill.service';

describe('DbFillService', () => {
  let service: DbFillService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DbFillService],
    }).compile();

    service = module.get<DbFillService>(DbFillService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
