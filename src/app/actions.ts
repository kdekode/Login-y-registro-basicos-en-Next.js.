'use me';

import { db } from "@/db";
import {users} from "@/db/schema";
import {eq} from "drizzle-orm";
import bcrypt from "bcryptjs";
import {cookies} from "next/headers";
 
export async function registerUser(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
     
    if (!email || !password) {
        return {error: 'Por favor, rellena todos los campos.'};
    }

    const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .get();
    
    if (existingUser) {
        return {error: 'El correo electrónico ya esta registrado.'};
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insert(users).values({
        email,
        password: hashedPassword,
    });

    return {success: 'Usuario registrado correctamente.'}; 
};


export async function loginAction(formData: FormData) {

    const email = formData.get('email') as string; 
    const password = formData.get('password') as string; 

    if (!email || !password) {
        return {error: 'Por favor, rellena todos los campos.'}
    }

    const user = await db 
    .select() 
    .from(users)
    .where(eq(users.email, email))
    .get();

    if(!user) {
        return {error : 'Usuario incorrecto.'}; 
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
     
    if(!isPasswordValid) {
        return {error : 'Credenciales incorrectas.'};
    }

    const cookieStore = await cookies();
    cookieStore.set('session_user_id', String(user.id), {
        httpOnly: true, // Protege contra ataques XSS 
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge:60 * 60 * 24,
    });
    
    return {success: 'Sssion inciada correctamente.'};
}

export async function logoutAction() {
    const cookieStore = await cookies();
    cookieStore.delete('session_user_id');
    return {success: 'sesión cerrada.'};
}