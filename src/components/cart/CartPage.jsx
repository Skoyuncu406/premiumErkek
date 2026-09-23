"use client";

import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";

import useShopStore from "@/store/useShopStore";

export default function CartPage() {
  const cart = useShopStore((state) => state.cart);

  const removeFromCart = useShopStore(
    (state) => state.removeFromCart
  );

  const increaseCartItem = useShopStore(
    (state) => state.increaseCartItem
  );

  const decreaseCartItem = useShopStore(
    (state) => state.decreaseCartItem
  );

  const clearCart = useShopStore(
    (state) => state.clearCart
  );

  /* =========================================================
     CALCULATIONS
  ========================================================== */

  const itemCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = cart.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );

  const shipping = 0;
  const total = subtotal + shipping;

  /* =========================================================
     PRICE FORMATTER
  ========================================================== */

  function formatPrice(value) {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      maximumFractionDigits: 0,
    }).format(value);
  }

  /* =========================================================
     EMPTY CART
  ========================================================== */

  if (cart.length === 0) {
    return <EmptyCart />;
  }

  /* =========================================================
     CART
  ========================================================== */

  return (
    <section
      className="
        min-h-[70vh]
        bg-[var(--ares-background-soft)]
        py-5
        sm:py-8
        lg:py-10
      "
    >
      <div className="ares-container-wide">
        <div
          className="
            grid
            gap-14
            pt-8
            lg:grid-cols-[minmax(0,1fr)_360px]
            lg:gap-16
            lg:pt-10
            xl:grid-cols-[minmax(0,1fr)_400px]
            xl:gap-24
          "
        >
          {/* =================================================
              CART ITEMS
          ================================================== */}

          <div className="min-w-0">
            {/* DESKTOP LABELS */}

            <div
              className="
                hidden
                grid-cols-[minmax(0,1fr)_120px_120px]
                gap-8
                border-b
                border-[var(--ares-dark-deep)]
                pb-4
                lg:grid
              "
            >
              <span className="cart-heading">
                Ürün
              </span>

              <span className="cart-heading text-center">
                Adet
              </span>

              <span className="cart-heading text-right">
                Toplam
              </span>
            </div>

            {/* PRODUCTS */}

            <div>
              {cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={() =>
                    removeFromCart(item.id)
                  }
                  onIncrease={() =>
                    increaseCartItem(item.id)
                  }
                  onDecrease={() =>
                    decreaseCartItem(item.id)
                  }
                  formatPrice={formatPrice}
                />
              ))}
            </div>

            {/* CART ACTIONS */}

            <div
              className="
                flex
                justify-between
                gap-5
                pt-7
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              <Link
                href="/urunler"
                className="
                  ares-link
                  text-[8px]
                  text-[var(--ares-dark-deep)]
                "
              >
                Alışverişe Devam Et
              </Link>

              <button
                type="button"
                onClick={clearCart}
                className="
                  w-fit
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-[0.12em]
                  text-[var(--ares-muted)]
                  transition-colors
                  duration-300
                  hover:text-[var(--ares-dark-deep)]
                "
              >
                Sepeti Temizle
              </button>
            </div>
          </div>

          {/* =================================================
              ORDER SUMMARY
          ================================================== */}

          <aside
            className="
              h-fit
              border-t
              border-[var(--ares-dark-deep)]
              pt-6
              lg:sticky
              lg:top-[158px]
            "
          >
            <div
              className="
                flex
                items-center
                justify-between
                border-b
                border-[var(--ares-border)]
                pb-5
              "
            >
              <h2
                className="
                  font-editorial
                  text-[30px]
                  font-medium
                  leading-none
                  text-[var(--ares-dark-deep)]
                "
              >
                Sipariş Özeti
              </h2>

              <span
                className="
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-[0.12em]
                  text-[var(--ares-muted)]
                "
              >
                {itemCount} ürün
              </span>
            </div>

            {/* SUBTOTAL */}

            <SummaryRow
              label="Ara Toplam"
              value={formatPrice(subtotal)}
            />

            {/* SHIPPING */}

            <SummaryRow
              label="Kargo"
              value="Ücretsiz"
            />

            {/* SHIPPING MESSAGE */}

            <div
              className="
                border-b
                border-[var(--ares-border)]
                py-5
              "
            >
              <p
                className="
                  text-[9px]
                  leading-[1.7]
                  text-[var(--ares-muted)]
                "
              >
                ARES siparişlerinde standart
                teslimat ücretsizdir.
              </p>
            </div>

            {/* TOTAL */}

            <div
              className="
                flex
                items-end
                justify-between
                gap-6
                py-6
              "
            >
              <div>
                <p
                  className="
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-[var(--ares-muted)]
                  "
                >
                  Toplam
                </p>

                <p
                  className="
                    mt-1
                    text-[8px]
                    text-[var(--ares-muted-light)]
                  "
                >
                  KDV dahil
                </p>
              </div>

              <p
                className="
                  font-editorial
                  text-[28px]
                  font-medium
                  leading-none
                  text-[var(--ares-dark-deep)]
                "
              >
                {formatPrice(total)}
              </p>
            </div>

            {/* =================================================
                CHECKOUT
            ================================================== */}

            <Link
              href="/odeme"
              className="
                ares-button
                group
                w-full
                justify-between
                px-6
              "
            >
              <span>Ödemeye Geç</span>

              <ArrowRight
                size={15}
                strokeWidth={1.3}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </Link>

            {/* TRUST */}

            <div
              className="
                mt-5
                flex
                flex-wrap
                gap-x-4
                gap-y-1
              "
            >
              <span className="cart-trust">
                Güvenli ödeme
              </span>

              <span className="cart-trust">
                14 gün kolay iade
              </span>

              <span className="cart-trust">
                Ücretsiz kargo
              </span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   CART ITEM
========================================================= */

function CartItem({
  item,
  onRemove,
  onIncrease,
  onDecrease,
  formatPrice,
}) {
  const { product } = item;

  return (
    <article
      className="
        grid
        grid-cols-[88px_minmax(0,1fr)]
        gap-4
        border-b
        border-[var(--ares-border)]
        py-6
        sm:grid-cols-[110px_minmax(0,1fr)]
        sm:gap-6
        lg:grid-cols-[minmax(0,1fr)_120px_120px]
        lg:items-center
        lg:gap-8
        lg:py-7
      "
    >
      {/* PRODUCT */}

      <div
        className="
          contents
          lg:flex
          lg:min-w-0
          lg:items-center
          lg:gap-6
        "
      >
        {/* IMAGE */}

        <Link
          href={`/urunler/${product.slug}`}
          className="
            relative
            aspect-[3/4]
            w-[88px]
            flex-shrink-0
            overflow-hidden
            bg-[var(--ares-background-warm)]
            sm:w-[110px]
          "
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="110px"
            className="
              object-cover
              object-center
              transition-transform
              duration-700
              hover:scale-[1.04]
            "
          />
        </Link>

        {/* PRODUCT INFO */}

        <div
          className="
            flex
            min-w-0
            flex-col
            justify-between
            py-1
            lg:py-0
          "
        >
          <div>
            <p
              className="
                text-[7px]
                font-semibold
                uppercase
                tracking-[0.15em]
                text-[var(--ares-muted-light)]
              "
            >
              {product.category}
            </p>

            <Link
              href={`/urunler/${product.slug}`}
              className="
                mt-2
                block
                font-editorial
                text-[20px]
                font-medium
                leading-[1]
                text-[var(--ares-dark-deep)]
                transition-colors
                duration-300
                hover:text-[var(--ares-brown)]
                sm:text-[23px]
              "
            >
              {product.name}
            </Link>

            <div
              className="
                mt-3
                flex
                flex-wrap
                gap-x-5
                gap-y-1
              "
            >
              <ProductMeta
                label="Beden"
                value={item.size}
              />

              <ProductMeta
                label="Renk"
                value={product.color}
              />
            </div>
          </div>

          <div className="mt-4">
            <p
              className="
                text-[9px]
                font-medium
                text-[var(--ares-dark-deep)]
              "
            >
              {product.formattedPrice}
            </p>

            <button
              type="button"
              onClick={onRemove}
              className="
                mt-3
                flex
                items-center
                gap-2
                text-[7px]
                font-semibold
                uppercase
                tracking-[0.1em]
                text-[var(--ares-muted)]
                transition-colors
                duration-300
                hover:text-[#9f3a38]
                lg:hidden
              "
            >
              <Trash2
                size={12}
                strokeWidth={1.2}
              />

              Kaldır
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE CONTROLS */}

      <div
        className="
          col-span-2
          flex
          items-center
          justify-between
          border-t
          border-[var(--ares-border)]
          pt-4
          lg:hidden
        "
      >
        <QuantityControl
          quantity={item.quantity}
          onDecrease={onDecrease}
          onIncrease={onIncrease}
        />

        <p
          className="
            text-[10px]
            font-semibold
            text-[var(--ares-dark-deep)]
          "
        >
          {formatPrice(
            product.price * item.quantity
          )}
        </p>
      </div>

      {/* DESKTOP QUANTITY */}

      <div
        className="
          hidden
          justify-center
          lg:flex
        "
      >
        <QuantityControl
          quantity={item.quantity}
          onDecrease={onDecrease}
          onIncrease={onIncrease}
        />
      </div>

      {/* DESKTOP TOTAL */}

      <div
        className="
          hidden
          text-right
          lg:block
        "
      >
        <p
          className="
            text-[10px]
            font-semibold
            text-[var(--ares-dark-deep)]
          "
        >
          {formatPrice(
            product.price * item.quantity
          )}
        </p>

        <button
          type="button"
          onClick={onRemove}
          aria-label={`${product.name} ürününü sepetten kaldır`}
          className="
            ml-auto
            mt-4
            flex
            items-center
            gap-2
            text-[7px]
            font-semibold
            uppercase
            tracking-[0.1em]
            text-[var(--ares-muted)]
            transition-colors
            duration-300
            hover:text-[#9f3a38]
          "
        >
          <Trash2
            size={12}
            strokeWidth={1.2}
          />

          Kaldır
        </button>
      </div>
    </article>
  );
}

/* =========================================================
   QUANTITY CONTROL
========================================================= */

function QuantityControl({
  quantity,
  onDecrease,
  onIncrease,
}) {
  return (
    <div
      className="
        inline-flex
        h-9
        items-center
        border
        border-[var(--ares-border)]
      "
    >
      <button
        type="button"
        onClick={onDecrease}
        aria-label="Adedi azalt"
        className="
          flex
          h-full
          w-9
          items-center
          justify-center
          text-[var(--ares-dark-deep)]
          transition-colors
          duration-300
          hover:bg-[var(--ares-background-warm)]
        "
      >
        <Minus
          size={11}
          strokeWidth={1.3}
        />
      </button>

      <span
        className="
          flex
          h-full
          min-w-[38px]
          items-center
          justify-center
          border-x
          border-[var(--ares-border)]
          text-[9px]
          font-medium
          text-[var(--ares-dark-deep)]
        "
      >
        {quantity}
      </span>

      <button
        type="button"
        onClick={onIncrease}
        aria-label="Adedi artır"
        className="
          flex
          h-full
          w-9
          items-center
          justify-center
          text-[var(--ares-dark-deep)]
          transition-colors
          duration-300
          hover:bg-[var(--ares-background-warm)]
        "
      >
        <Plus
          size={11}
          strokeWidth={1.3}
        />
      </button>
    </div>
  );
}

/* =========================================================
   PRODUCT META
========================================================= */

function ProductMeta({
  label,
  value,
}) {
  return (
    <p
      className="
        text-[8px]
        text-[var(--ares-muted)]
      "
    >
      <span
        className="
          mr-1
          text-[7px]
          font-semibold
          uppercase
          tracking-[0.08em]
          text-[var(--ares-muted-light)]
        "
      >
        {label}
      </span>

      {value}
    </p>
  );
}

/* =========================================================
   SUMMARY ROW
========================================================= */

function SummaryRow({
  label,
  value,
}) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        border-b
        border-[var(--ares-border)]
        py-5
      "
    >
      <span
        className="
          text-[9px]
          text-[var(--ares-muted)]
        "
      >
        {label}
      </span>

      <span
        className="
          text-[9px]
          font-medium
          text-[var(--ares-dark-deep)]
        "
      >
        {value}
      </span>
    </div>
  );
}

/* =========================================================
   EMPTY CART
========================================================= */

function EmptyCart() {
  return (
    <section
      className="
        flex
        min-h-[70vh]
        items-center
        justify-center
        bg-[var(--ares-background-soft)]
        px-5
        py-20
      "
    >
      <div
        className="
          mx-auto
          max-w-[620px]
          text-center
        "
      >
        <ShoppingBag
          size={28}
          strokeWidth={1}
          className="
            mx-auto
            text-[var(--ares-gold)]
          "
        />

        <p
          className="
            mt-8
            text-[8px]
            font-semibold
            uppercase
            tracking-[0.2em]
            text-[var(--ares-muted)]
          "
        >
          ARES / Shopping Bag
        </p>

        <h1
          className="
            mt-4
            font-editorial
            text-[48px]
            font-medium
            leading-[0.9]
            tracking-[-0.04em]
            text-[var(--ares-dark-deep)]
            sm:text-[64px]
          "
        >
          Sepetiniz boş.
        </h1>

        <p
          className="
            mx-auto
            mt-6
            max-w-[410px]
            text-[10px]
            leading-[1.8]
            text-[var(--ares-muted)]
            sm:text-[11px]
          "
        >
          ARES koleksiyonunu keşfedin ve
          gardırobunuza zamansız parçalar ekleyin.
        </p>

        <Link
          href="/urunler"
          className="
            ares-button
            mt-8
          "
        >
          Koleksiyonu Keşfet

          <ArrowRight
            size={14}
            strokeWidth={1.3}
          />
        </Link>
      </div>
    </section>
  );
}