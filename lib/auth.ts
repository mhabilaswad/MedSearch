// // lib/auth.ts
// import { prisma } from "@/lib/prisma";

// export const verifyCredentials = async (email: string, password: string) => {
//   try {
//     const user = await prisma.user.findUnique({
//       where: { email },
//     });

//     if (user && user.password === password) { // gunakan hash password di dunia nyata
//       return user;
//     }
//     return null;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };
