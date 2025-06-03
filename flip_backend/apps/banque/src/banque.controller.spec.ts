import { Test, TestingModule } from '@nestjs/testing';
import { BanqueController } from './banque.controller';
import { BanqueService } from './banque.service';

describe('BanqueController', () => {
  let banqueController: BanqueController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BanqueController],
      providers: [BanqueService],
    }).compile();

    banqueController = app.get<BanqueController>(BanqueController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(banqueController.getHello()).toBe('Hello World!');
    });
  });
});
