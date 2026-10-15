import {pgTable,serial,text,timestamp,boolean } from "drizzle-orm/pg-core";
import { eq, or } from "drizzle-orm";
export const usersTable = pgTable("users", {
    id: serial("id").primaryKey(),
    name: text("name"),
    email: text("email").unique(),
    phoneNo: text("phone_no").unique(),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow(),
    updateAt: timestamp("update_at").defaultNow(),
    deleteAt: timestamp("delete_at"),
    isDeleted: boolean("is_deleted").default(false),
    isActive: boolean("is_active").default(true)
});

export class UsersClass {
    constructor(db) {
        this.db = db;
    }
    async userExist(email, phone) {
        const [users] = await this.db.select().from(usersTable).where(or(eq(usersTable.email, email),eq(usersTable.phoneNo, phone) ),
                eq(usersTable.isActive, true)
            );
        return users || null;
    }
    async createUser(userData) {
        const [user] = await this.db .insert(usersTable) .values(userData) .returning();
        return user;
    }
    async updateUser(id, data) {
        const [user] = await this.db .update(usersTable).set(data).where(eq(usersTable.id, id)).returning();
        return user;
    }
}