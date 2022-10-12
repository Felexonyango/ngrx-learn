import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ObjectId } from "bson";
import { Model } from "mongoose";
import { UserService } from "src/user/services/user.service";
import { defaultMenuData } from "../model/Menu.data";
import { Menu } from "../model/Menu.model";

@Injectable()
export class MenuService implements OnModuleInit {
    constructor(
        @InjectModel(Menu.name) private menuModel:Model<Menu>,
        private userService:UserService
        ){}

    async onModuleInit() {
        await this.createMenu(defaultMenuData)
    }

    async createMenu(defaultMenu){
        const menus = await this.menuModel.find();
        if(menus.length == 0){
            await this.menuModel.insertMany(defaultMenu)
        }
    }

    // async getAllMenuItems(userId:ObjectId){
    //     const user = await this.userService.findSingleUser(userId);
        
    //     let roles = user.role;
    //     let allMenuItems = await this.menuModel.find();

    //     let foundMenuItems : any = [];
    //     //if allow ath user is false return the object

    //     for (let menuItem of allMenuItems) {
    //        let ifRoleExists = roles.some((v) => menuItem.role.includes(v));

    //        if (ifRoleExists) {
    //          foundMenuItems.push(menuItem);
    //         }
    //     }

    //     let x = foundMenuItems.map((v) => {
    //         if (v?.children?.length < 1) {
    //           return {
    //             _id: v._id,
    //             title: v.title,
    //             name: v.name,
    //             url: v.url,
    //             icon: v.icon,
    //             roles: v.roles,
    //             isAllowAllAuthenticatedUsers: v.isAllowAllAuthenticatedUsers,
    //           };
    //         }
    //         return v;
    //       });

    //       return x;
    // }

    async getAllMenuItems(userId:ObjectId){
        const user = await this.userService.findSingleUser(userId);
        
        let roles = user.role;
        let allMenuItems = await this.menuModel.find();

        let foundMenuItems : any = [];
        //if allow ath user is false return the object

        for (let menuItem of allMenuItems) {
           let ifRoleExists = roles.some((v) => menuItem.role.includes(v));
           
           if (ifRoleExists && menuItem.items) {
               let childItems = []
               for(let item of menuItem.items){
                   let childRoleExists = roles.some((v) => item.role.includes(v));
                   if(childRoleExists) childItems.push(item);
                }
             menuItem.items = childItems;
             foundMenuItems.push(menuItem);
            }
        }
    return foundMenuItems;
    }
}