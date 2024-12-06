import { Prisma, PrismaClient } from '@prisma/client';

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
        data: await this.prisma.adoption.findUnique({ where: { id } }),
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
        data: await this.prisma.missing.findUnique({ where: { id } }),
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
        data: await this.prisma.wish.findUnique({ where: { id } }),
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error,
      };
    }
  }

  async getContactUsList() {
    try {
      return {
        data: await this.prisma.contactUs.findMany(),
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error,
      };
    }
  }

  async createAdoption(data: Prisma.AdoptionCreateInput) {
    try {
      this.prisma.adoption.create({ data });
      return { error: null, message: 'Adoption created successfully' };
    } catch (error) {
      return { error, message: 'Error in creating adoption' };
    }
  }

  async createMissing(data: Prisma.MissingCreateInput) {
    try {
      this.prisma.missing.create({ data });
      return { error: null, message: 'Missing created successfully' };
    } catch (error) {
      return { error, message: 'Error in creating missing' };
    }
  }

  async createWish(data: Prisma.WishCreateInput) {
    try {
      this.prisma.wish.create({ data });
      return { error: null, message: 'Wish created successfully' };
    } catch (error) {
      return { error, message: 'Error in creating missing' };
    }
  }

  async updateAdoption(id: string, data: Prisma.AdoptionUpdateInput) {
    try {
      this.prisma.adoption.update({ where: { id }, data });
      return { error: null, message: 'Adoption updated successfully' };
    } catch (error) {
      return { error, message: 'Error in creating missing' };
    }
  }

  async updateMissing(id: string, data: Prisma.MissingUpdateInput) {
    try {
      this.prisma.missing.update({ where: { id }, data });
      return { error: null, message: 'Missing updated successfully' };
    } catch (error) {
      return { error, message: 'Error in creating missing' };
    }
  }

  async updateWish(id: string, data: Prisma.WishUpdateInput) {
    try {
      this.prisma.wish.update({ where: { id }, data });
      return { error: null, message: 'Wish updated successfully' };
    } catch (error) {
      return { error, message: 'Error in creating missing' };
    }
  }

  async createContactUs(data: Prisma.ContactUsCreateInput) {
    try {
      this.prisma.contactUs.create({ data });
      return { error: null, message: 'Contact Us created successfully' };
    } catch (error) {
      return { error, message: 'Error in creating missing' };
    }
  }
}
