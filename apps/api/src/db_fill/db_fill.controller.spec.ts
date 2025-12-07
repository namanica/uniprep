import { Test, TestingModule } from '@nestjs/testing';
import { DbFillController } from './db_fill.controller';
import { DbFillService } from './db_fill.service';

describe('DbFillController', () => {
  let controller: DbFillController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DbFillController],
      providers: [DbFillService],
    }).compile();

    controller = module.get<DbFillController>(DbFillController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
