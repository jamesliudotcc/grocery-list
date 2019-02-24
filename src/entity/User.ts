import * as bcrypt from 'bcrypt';
import {
  BeforeInsert,
  Column,
  Entity,
  ObjectID,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  firstName: string = '';

  @Column()
  lastName: string = '';

  @Column()
  email: string = '';

  @Column()
  password: string = '';

  @BeforeInsert()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 12);
  }

  async validPassword(plainTextPassword: string) {
    return await bcrypt.compare(plainTextPassword, this.password + '');
  }
}
