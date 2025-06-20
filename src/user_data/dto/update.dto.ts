
import { ApiExpectationFailedResponse, ApiProperty } from '@nestjs/swagger';
import { isEmail, IsNumber, IsOptional, isString, IsString, IsStrongPassword, IsUUID, } from 'class-validator';
import { User } from 'src/entity/user.entity';


export class UpdateDTO implements Readonly<UpdateDTO> {

  @ApiProperty({ required: false })
  file: {
    uri: string,
    fileName:string,
    type: string
  };

  @ApiProperty({ required:false})
  age: string;

  @ApiProperty({required: false})
  description: string

   @ApiProperty({required: false})
  isPublic: string
  

  public static from(dto: Partial<UpdateDTO>) {
    const it = new UpdateDTO();
    const result = Object.assign({}, it, dto)
    return result;
  }



  public toEntity() {

    const it = new User();
    it.lastChangedDateTime = new Date();
    it.createDateTime = new Date();
    return it;
  }
}