import { create } from "zustand";
import { persist } from "zustand/middleware";

/* =========================================================
   DEMO AUTH STORE

   Bu yapı yalnızca ARES demo / portfolio sürümü içindir.

   Gerçek production authentication değildir.
   Kullanıcı bilgileri browser localStorage içerisinde
   saklanır.

   Production aşamasında:
   - PostgreSQL
   - Prisma
   - gerçek authentication
   - server-side session

   ile değiştirilecektir.
========================================================= */

const useAuthStore = create(
  persist(
    (set, get) => ({
      /* ===================================================
         STATE
      ==================================================== */

      users: [],

      currentUser: null,

      /* ===================================================
         REGISTER
      ==================================================== */

      register: ({ name, surname, email, password }) => {
        const normalizedEmail = String(email || "")
          .trim()
          .toLocaleLowerCase("tr-TR");

        if (
          !name?.trim() ||
          !surname?.trim() ||
          !normalizedEmail ||
          !password
        ) {
          return {
            success: false,
            message: "Lütfen tüm alanları doldurun.",
          };
        }

        const users = get().users || [];

        const existingUser = users.find(
          (user) => user.email === normalizedEmail,
        );

        if (existingUser) {
          return {
            success: false,
            message: "Bu e-posta adresiyle kayıtlı bir hesap bulunuyor.",
          };
        }

        const user = {
          id: createUserId(),
          name: name.trim(),
          surname: surname.trim(),
          email: normalizedEmail,
          password,
          createdAt: new Date().toISOString(),
        };

        set({
          users: [...users, user],
          currentUser: createPublicUser(user),
        });

        return {
          success: true,
          user: createPublicUser(user),
        };
      },

      /* ===================================================
         LOGIN
      ==================================================== */

      login: ({ email, password }) => {
        const normalizedEmail = String(email || "")
          .trim()
          .toLocaleLowerCase("tr-TR");

        const users = get().users || [];

        const user = users.find(
          (item) =>
            item.email === normalizedEmail && item.password === password,
        );

        if (!user) {
          return {
            success: false,
            message: "E-posta adresi veya şifre hatalı.",
          };
        }

        const publicUser = createPublicUser(user);

        set({
          currentUser: publicUser,
        });

        return {
          success: true,
          user: publicUser,
        };
      },

      /* ===================================================
         LOGOUT
      ==================================================== */

      logout: () => {
        set({
          currentUser: null,
        });
      },

      /* ===================================================
         HELPERS
      ==================================================== */

      isAuthenticated: () => {
        return Boolean(get().currentUser?.id);
      },
    }),

    {
      name: "ares-auth-storage",
    },
  ),
);

export default useAuthStore;

/* =========================================================
   CREATE PUBLIC USER

   Password bilgisini currentUser/session içerisine
   taşımıyoruz.
========================================================= */

function createPublicUser(user) {
  return {
    id: user.id,
    name: user.name,
    surname: user.surname,
    email: user.email,
    createdAt: user.createdAt,
  };
}

/* =========================================================
   CREATE USER ID
========================================================= */

function createUserId() {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return `ares-user-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}
