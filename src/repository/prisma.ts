import { TableType } from '@/interface';
import { Prisma, PrismaClient } from '@prisma/client';

export default class PrismaRepository {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAdoptionListForLanding() {
    try {
      return {
        data: await this.prisma.adoption.findMany({
          take: 10,
          orderBy: {
            created_at: 'desc',
          },
        }),
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
        data: await this.prisma.missing.findMany({
          take: 10,
          orderBy: {
            created_at: 'desc',
          },
        }),
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
        data: await this.prisma.wish.findMany({
          take: 10,
          orderBy: {
            created_at: 'desc',
          },
        }),
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
      const data =
        type === 'all'
          ? await this.prisma.adoption.findMany({
              orderBy: {
                created_at: 'desc',
              },
            })
          : await this.prisma.adoption.findMany({
              where: { type },
              orderBy: {
                created_at: 'desc',
              },
            });
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
        data: await this.prisma.missing.findMany({
          orderBy: {
            created_at: 'desc',
          },
        }),
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
        data: await this.prisma.wish.findMany({
          orderBy: {
            created_at: 'desc',
          },
        }),
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
        data: await this.prisma.contactUs.findMany({
          orderBy: {
            created_at: 'desc',
          },
        }),
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
      await this.prisma.adoption.create({ data });
      return { error: null, message: 'Adoption created successfully' };
    } catch (error) {
      return { error, message: 'Error in creating adoption' };
    }
  }

  async createMissing(data: Prisma.MissingCreateInput) {
    try {
      await this.prisma.missing.create({ data });
      return { error: null, message: 'Missing created successfully' };
    } catch (error) {
      return { error, message: 'Error in creating missing' };
    }
  }

  async createWish(data: Prisma.WishCreateInput) {
    try {
      await this.prisma.wish.create({ data });
      return { error: null, message: 'Wish created successfully' };
    } catch (error) {
      return { error, message: 'Error in creating missing' };
    }
  }

  async updateAdoption(id: string, data: Prisma.AdoptionUpdateInput) {
    try {
      await this.prisma.adoption.update({ where: { id }, data });
      return { error: null, message: 'Adoption updated successfully' };
    } catch (error) {
      return { error, message: 'Error in creating missing' };
    }
  }

  async updateMissing(id: string, data: Prisma.MissingUpdateInput) {
    try {
      await this.prisma.missing.update({ where: { id }, data });
      return { error: null, message: 'Missing updated successfully' };
    } catch (error) {
      return { error, message: 'Error in creating missing' };
    }
  }

  async updateWish(id: string, data: Prisma.WishUpdateInput) {
    try {
      await this.prisma.wish.update({ where: { id }, data });
      return { error: null, message: 'Wish updated successfully' };
    } catch (error) {
      return { error, message: 'Error in creating missing' };
    }
  }

  async createContactUs(data: Prisma.ContactUsCreateInput) {
    try {
      await this.prisma.contactUs.create({ data });
      return { error: null, message: 'Contact Us created successfully' };
    } catch (error) {
      return { error, message: 'Error in creating missing' };
    }
  }

  private getUpdateFunction(table: TableType) {
    switch (table) {
      case TableType.Adoption:
        return this.updateAdoption;
      case TableType.Missing:
        return this.updateMissing;
      case TableType.Wish:
        return this.updateWish;
    }
  }

  async toggleShowItem(table: TableType, id: string, show: boolean) {
    try {
      await this.getUpdateFunction(table)?.(id, {
        show,
      });
      return { error: null };
    } catch (error) {
      return { error };
    }
  }

  async deleteItem(table: TableType, id: string) {
    try {
      switch (table) {
        case TableType.Adoption:
          await this.prisma.adoption.delete({ where: { id } });
        case TableType.Missing:
          await this.prisma.missing.delete({ where: { id } });
        case TableType.Wish:
          await this.prisma.wish.delete({ where: { id } });
        default:
          return {
            error: 'invalid table',
          };
      }
    } catch (error) {
      return { error };
    }
  }
}
