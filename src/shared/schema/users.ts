/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum userTypes {
  ADMIN = 'admin', 
  USERS = 'user', 
  SELLER = 'seller'
}
@Schema({
  timestamps: true,
})
export class Users extends Document {
  @Prop({required : true})
  name: string;

  @Prop({ required : true})
  email : string;

  @Prop({required : true })
  password : string;

  @Prop({required : true, enum: [userTypes.ADMIN, userTypes.USERS, userTypes.SELLER] })
  type : string; 

  @Prop({ default: false })
  isVerified: boolean; 

  @Prop({default: null})
  otp: string; 

  @Prop({ default : null })
  otpExpiryTime : Date;
}

export const UserSchema = SchemaFactory.createForClass(Users);
