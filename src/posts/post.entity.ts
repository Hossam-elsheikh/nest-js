import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { postType } from './enums/postType.enum';
import { postStatus } from './enums/postStatus.enum';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { User } from 'src/users/user.entity';
import { Tag } from 'src/tags/tag.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 512,
    nullable: false,
  })
  title: string;

  @Column({
    type: 'enum',
    enum: postType,
    default: postType.POST,
    nullable: false,
  })
  postType: postType;

  @Column({
    type: 'varchar',
    length: 256,
    unique: true,
    nullable: false,
  })
  slug: string;

  @Column({
    type: 'enum',
    enum: postStatus,
    default: postStatus.SCHEDULED,
    nullable: false,
  })
  status: postStatus;

  @Column({
    type: 'text',
    nullable: true,
  })
  content?: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  schema?: string;

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: true,
  })
  featuredImagUrl?: string;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  publishOn?: Date;

  @OneToOne(
    () => MetaOption,
    (metaOption) => metaOption.post, // inverse relationship
    {
      cascade: true, // you can define the actions to cascade by using array of action instead of boolean ['remove','insert']
      eager: true, // grap the data of the related metaOptions with it while fetching posts
    },
  )
  metaOptions?: MetaOption;

  @Column({
    type: 'text',
    nullable: true,
  })
  @ManyToOne(() => User, (user) => user.posts, {
    eager: true, // fetch the author data with it
  })
  author: User;

  @ManyToMany(() => Tag, (tag) => tag.posts, {
    eager: true,
  })
  @JoinTable() // creates a junction table
  // this @joinTable is defining the winning part
  tags?: Tag[];
}
