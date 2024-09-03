import { InjectModel } from "@nestjs/mongoose";
import { Users } from "../schema/users";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserRepository{
    constructor(
        @InjectModel(Users.name)
        private readonly userModel: Model<Users>
    ){}    

    async findOne(query: any){
        return this.userModel.findOne(query);
    }

    async create(data: Record<string, any>){
        return await this.userModel.create(data); 
    }
}