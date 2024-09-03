import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { userTypes } from 'src/shared/schema/users';
import { UserRepository } from 'src/shared/repositories/user.repository';
import { generateHashPassword } from 'src/shared/utility/password-manager';

@Injectable()
export class UsersService {
  constructor(
    @Inject(UserRepository) private readonly userDB: UserRepository,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try{
      //generate the has password 
      createUserDto.password = await generateHashPassword(
        createUserDto.password,
      )

      //check is it for admin 
      if(createUserDto.type === userTypes.ADMIN && createUserDto.secretToken !== process.env.ADMIN_SECRET_TOKEN ){
        throw new Error('Not allowed to create admin'); 
      }else{
        createUserDto.isVerified = true; 
      }

      //user is already exist 
      const user = await this.userDB.findOne({
        email : createUserDto.email,
      })

      if(user){
        throw new Error('User already exists !')
      }
      const otp = Math.floor(Math.random() * 900000) * 100000; 

      const otpExpiryTime = new Date(); 

      const newUser = await this.userDB.create({
        ...createUserDto, 
        otp, 
        otpExpiryTime
      })

      if(newUser.type !== userTypes.ADMIN){
        // sendEmail(newUser.email, otp); 
        console.log(newUser.email, otp)
      }
      return {
        success : true, 
        message : 'User created successfully ', 
        result: { email : newUser.email }
      }

    }
    catch(error){
      throw error; 
    }
  }

  login(email:string, password: string){
    return 'This action login a user'; 
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
