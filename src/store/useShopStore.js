import { create } from "zustand";
import { persist } from "zustand/middleware";

const useShopStore = create(
  persist(
    (set, get) => ({
      /* =====================================================
         CART
      ====================================================== */

      cart: [],

      addToCart: ({ product, size, quantity = 1 }) => {
        if (!product || !size) return;

        const cart = get().cart;

        /*
         * Aynı ürün + aynı beden sepette varsa
         * yeni satır oluşturmak yerine miktarı artır.
         */
        const existingItem = cart.find(
          (item) => item.product.id === product.id && item.size === size,
        );

        if (existingItem) {
          set({
            cart: cart.map((item) =>
              item.product.id === product.id && item.size === size
                ? {
                    ...item,
                    quantity: item.quantity + quantity,
                  }
                : item,
            ),
          });

          return;
        }

        set({
          cart: [
            ...cart,
            {
              id: `${product.id}-${size}`,
              product,
              size,
              quantity,
            },
          ],
        });
      },

      removeFromCart: (id) => {
        set({
          cart: get().cart.filter((item) => item.id !== id),
        });
      },

      increaseCartItem: (id) => {
        set({
          cart: get().cart.map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item,
          ),
        });
      },

      decreaseCartItem: (id) => {
        const cart = get().cart;

        const target = cart.find((item) => item.id === id);

        if (!target) return;

        if (target.quantity <= 1) {
          set({
            cart: cart.filter((item) => item.id !== id),
          });

          return;
        }

        set({
          cart: cart.map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity: item.quantity - 1,
                }
              : item,
          ),
        });
      },

      clearCart: () => {
        set({
          cart: [],
        });
      },

      /* =====================================================
         FAVORITES
      ====================================================== */

      favorites: [],

      toggleFavorite: (product) => {
        if (!product) return;

        const favorites = get().favorites;

        const exists = favorites.some((item) => item.id === product.id);

        if (exists) {
          set({
            favorites: favorites.filter((item) => item.id !== product.id),
          });

          return;
        }

        set({
          favorites: [...favorites, product],
        });
      },

      isFavorite: (productId) => {
        return get().favorites.some((item) => item.id === productId);
      },
    }),
    {
      name: "ares-shop-storage",
    },
  ),
);

export default useShopStore;
