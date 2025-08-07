import { Post } from 'src/posts/post.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class MetaOption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'json',
    nullable: false,
  })
  metaValue: string;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  // with the next lines, the relation between post and metaoption become bi-directional not unidirectional

  @OneToOne(
    () => Post,
    (post) => post.metaOptions, // inverse relationship mentioning, you should do it in post entity as well
    {
      onDelete: 'CASCADE', // deletes metaoption whenever post deleted
    },
  )
  @JoinColumn() // it adds a column with the id of the other entity in the used table
  post: Post;
}
