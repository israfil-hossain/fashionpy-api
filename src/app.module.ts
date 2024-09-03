import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import config from "config";
import { AllExceptionFilter } from "./httpExceptionFilter";
import { UsersModule } from "./users/users.module";

const uri =
  "mongodb+srv://fashionpy:pHe9oc0s2Is6xf8V@fashionpy.9h1yg7v.mongodb.net/?retryWrites=true&w=majority&appName=fashionpy";

@Module({
  imports: [
    MongooseModule.forRoot(config.get<string>("mongodbUrl")),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: "APP_FILTER",
      useClass: AllExceptionFilter,
    },
  ],
})
export class AppModule {}
