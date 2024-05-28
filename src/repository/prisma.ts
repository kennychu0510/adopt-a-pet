import { PrismaClient } from '@prisma/client';

export default class PrismaRepository {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAdoptionListForLanding() {
    try {
      return {
        data: await this.prisma.adoption.findMany({ take: 10 }),
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error,
      };
    }
  }

  async getMissingListForLanding() {
    try {
      return {
        data: await this.prisma.missing.findMany({ take: 10 }),
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error,
      };
    }
  }

  async getWishListForLanding() {
    try {
      return {
        data: await this.prisma.wish.findMany({ take: 10 }),
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error,
      };
    }
  }

  async getAdoptionDetailById(id: string) {
    try {
      return {
        data: await this.prisma.adoption.findUnique({ where: { id: Number(id) } }),
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error,
      };
    }
  }

  async getAdoptionListByType(type: string) {
    try {
      const data = type === 'all' ? await this.prisma.adoption.findMany() : await this.prisma.adoption.findMany({ where: { type } });
      return {
        data,
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error,
      };
    }
  }

  async getMissingList() {
    try {
      return {
        data: await this.prisma.missing.findMany(),
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error,
      };
    }
  }

  async getMissingDetailById(id: string) {
    try {
      return {
        data: await this.prisma.missing.findUnique({ where: { id: Number(id) } }),
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error,
      };
    }
  }

  async getWishListList() {
    try {
      return {
        data: await this.prisma.wish.findMany(),
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error,
      };
    }
  }

  async getWishDetailById(id: string) {
    try {
      return {
        data: await this.prisma.wish.findUnique({ where: { id: Number(id) } }),
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error,
      };
    }
  }
}
