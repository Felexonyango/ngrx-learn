import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "src/user/user.module";
import { MenuController } from "./controller/menu.controller";
import { Menu, MenuSchema } from "./model/Menu.model";
import { MenuService } from "./services/menu.service";

@Module({
    imports:[
        MongooseModule.forFeature([{name:Menu.name, schema:MenuSchema}]),
        UserModule
    ],
    providers:[MenuService],
    controllers:[MenuController],
    exports:[MenuService]
})

export class MenuModule {}