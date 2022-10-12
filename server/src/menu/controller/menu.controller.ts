import { Controller, Get, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/user/auth/auth.guard";
import { getUser } from "src/user/auth/user.decorator";
import { MenuService } from "../services/menu.service";

@Controller('menu')
@UseGuards(JwtAuthGuard)
export class MenuController {
    constructor(private menuService:MenuService){}

    @Get('allMenuItems')
    async getMenuItems(@getUser() user){
        return await this.menuService.getAllMenuItems(user.userId);
    }
}