import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  MoreThan
} from 'typeorm';
import { User } from './User';

@Entity({ name: 'sessions' })
export class Session extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'varchar',
    length: 1000
  })
  token!: string;

  @Column({
    type: 'bigint'
  })
  expiresAt!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({ nullable: true })
  userId!: number;

  @ManyToOne(() => User, (user) => user.sessions)
  user!: User;

  static async checkTokenValidity(token: string) {
    const session = await this.findOne({
      where: {
        token,
        expiresAt: MoreThan(new Date().getTime())
      }
    });
    if (session) {
      session.expiresAt =
        new Date().getTime() +
        parseInt(process.env.SESSION_TIMEOUT as string, 10);
      await session.save();
      return await User.findOne({
        where: {
          id: session.userId
        }
      });
    }
  }
}
