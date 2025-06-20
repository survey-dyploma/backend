
import { ApiProperty } from '@nestjs/swagger';
import { IsJSON, IsNumber, IsOptional, IsString,IsUUID, } from 'class-validator';
import { Post } from 'src/entity/post.entity';
import { User } from 'src/entity/user.entity';
import { Markingdt } from './types';
import { emit } from 'process';
import { Likes } from 'src/entity/likes.entity';


export class CreateDTO implements Readonly<CreateDTO> {
  @IsUUID()
  @IsOptional()
  id: string;

  @ApiProperty({ required: true })
  title: string

  @ApiProperty({required: false})
  description: string

  @ApiProperty({required: false, default: ""})
  title_picture: string

  @ApiProperty({required: false})
  marking: string

  @ApiProperty({ required:false})
  creator: User;

  @ApiProperty({ required:false , default: 0 })
  views: number;

  @ApiProperty({ required:false})
  likes: Likes[];



  

  public static from(dto: Partial<CreateDTO>) {
    const it = new CreateDTO();
    const result = Object.assign({}, it, dto)
    return result;
  }

  public static fromEntity(entity: Post) {
    return this.from({
      id: entity.id,
      title: entity.title,
      description: entity.description,
      title_picture: entity.title_picture,
      creator: entity.creator,
      views: entity.views,
      likes: entity.likes
    });
  }

  public WithoutMarking() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      title_picture: this.title_picture,
      creator: this.creator,
      views: this.views,
      likes: this.likes
    };
  }

  public toEntity(dto: Partial<CreateDTO>) {
    const it = new Post();
    return it;
  }
}