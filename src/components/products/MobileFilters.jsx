import { X } from "lucide-react";

const categories = [
  "Tümü",
  "Yeni Gelenler",
  "Tailoring",
  "Outerwear",
  "Essentials",
];

const sizes = [
  "S",
  "M",
  "L",
  "XL",
  "46",
  "48",
  "50",
  "52",
];

const colors = [
  {
    name: "Kahverengi",
    value: "#725443",
  },
  {
    name: "Kum",
    value: "#c5ad8b",
  },
  {
    name: "Ekru",
    value: "#e9e0d0",
  },
  {
    name: "Antrasit",
    value: "#55514e",
  },
];

const prices = [
  {
    id: "0-5000",
    label: "₺0 — ₺5.000",
  },
  {
    id: "5000-10000",
    label: "₺5.000 — ₺10.000",
  },
  {
    id: "10000-plus",
    label: "₺10.000 +",
  },
];

export default function MobileFilters({
  open,
  onClose,
  filters,
  onCategoryChange,
  onSizeChange,
  onColorChange,
  onPriceChange,
  onClear,
  resultCount,
}) {
  return (
    <>
      {/* OVERLAY */}

      <div
        onClick={onClose}
        className={`
          fixed
          inset-0

          z-[80]

          bg-black/30

          backdrop-blur-[2px]

          transition-opacity
          duration-500

          lg:hidden

          ${
            open
              ? `
                pointer-events-auto
                opacity-100
              `
              : `
                pointer-events-none
                opacity-0
              `
          }
        `}
      />

      {/* DRAWER */}

      <aside
        className={`
          fixed

          right-0
          top-0

          z-[90]

          flex

          h-dvh
          w-[90%]
          max-w-[430px]

          flex-col

          bg-[var(--ares-background-soft)]

          transition-transform
          duration-500

          ease-[cubic-bezier(0.22,1,0.36,1)]

          lg:hidden

          ${
            open
              ? "translate-x-0"
              : "translate-x-full"
          }
        `}
      >
        {/* HEADER */}

        <div
          className="
            flex
            h-[72px]

            flex-shrink-0

            items-center
            justify-between

            border-b
            border-[var(--ares-border)]

            px-5

            sm:px-8
          "
        >
          <div>
            <p
              className="
                text-[8px]
                font-semibold

                uppercase
                tracking-[0.18em]

                text-[var(--ares-muted)]
              "
            >
              ARES / Collection
            </p>

            <h2
              className="
                mt-1

                font-editorial

                text-[26px]
                font-medium

                leading-none
              "
            >
              Filtreler
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Filtreleri kapat"
            className="
              flex
              h-10
              w-10

              items-center
              justify-end

              text-[var(--ares-dark-deep)]
            "
          >
            <X
              size={20}
              strokeWidth={1.3}
            />
          </button>
        </div>

        {/* FILTER CONTENT */}

        <div
          className="
            flex-1

            overflow-y-auto

            px-5
            py-2

            sm:px-8
          "
        >
          <MobileSection title="Kategori">
            <div className="flex flex-col">
              {categories.map((category) => {
                const active =
                  filters.category === category;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() =>
                      onCategoryChange(category)
                    }
                    className="
                      flex
                      min-h-[45px]

                      items-center
                      justify-between

                      border-b
                      border-[var(--ares-border)]/60

                      text-left
                    "
                  >
                    <span
                      className={`
                        text-[11px]

                        ${
                          active
                            ? "text-[var(--ares-dark-deep)]"
                            : "text-[var(--ares-muted)]"
                        }
                      `}
                    >
                      {category}
                    </span>

                    {active && (
                      <span
                        className="
                          h-[4px]
                          w-[4px]

                          rounded-full

                          bg-[var(--ares-gold)]
                        "
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </MobileSection>

          <MobileSection title="Beden">
            <div className="grid grid-cols-4 gap-2">
              {sizes.map((size) => {
                const active =
                  filters.sizes.includes(size);

                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() =>
                      onSizeChange(size)
                    }
                    className={`
                      flex
                      h-11

                      items-center
                      justify-center

                      border

                      text-[10px]
                      font-medium

                      transition-all
                      duration-300

                      ${
                        active
                          ? `
                            border-[var(--ares-dark)]
                            bg-[var(--ares-dark)]
                            text-[var(--ares-background-soft)]
                          `
                          : `
                            border-[var(--ares-border)]
                            text-[var(--ares-muted)]
                          `
                      }
                    `}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </MobileSection>

          <MobileSection title="Renk">
            <div className="grid grid-cols-2 gap-3">
              {colors.map((color) => {
                const active =
                  filters.colors.includes(color.name);

                return (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() =>
                      onColorChange(color.name)
                    }
                    className="
                      flex
                      items-center

                      gap-3
                    "
                  >
                    <span
                      className={`
                        flex
                        h-[18px]
                        w-[18px]

                        items-center
                        justify-center

                        border

                        ${
                          active
                            ? "border-[var(--ares-dark)]"
                            : "border-black/10"
                        }
                      `}
                    >
                      <span
                        className="
                          h-[12px]
                          w-[12px]
                        "
                        style={{
                          backgroundColor:
                            color.value,
                        }}
                      />
                    </span>

                    <span
                      className={`
                        text-[10px]

                        ${
                          active
                            ? "text-[var(--ares-dark-deep)]"
                            : "text-[var(--ares-muted)]"
                        }
                      `}
                    >
                      {color.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </MobileSection>

          <MobileSection title="Fiyat">
            <div className="flex flex-col gap-4">
              {prices.map((price) => {
                const active =
                  filters.price === price.id;

                return (
                  <button
                    key={price.id}
                    type="button"
                    onClick={() =>
                      onPriceChange(price.id)
                    }
                    className="
                      flex
                      items-center
                      justify-between
                    "
                  >
                    <span
                      className={`
                        text-[10px]

                        ${
                          active
                            ? "text-[var(--ares-dark-deep)]"
                            : "text-[var(--ares-muted)]"
                        }
                      `}
                    >
                      {price.label}
                    </span>

                    {active && (
                      <span
                        className="
                          h-[4px]
                          w-[4px]

                          rounded-full

                          bg-[var(--ares-gold)]
                        "
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </MobileSection>
        </div>

        {/* BOTTOM ACTIONS */}

        <div
          className="
            flex-shrink-0

            border-t
            border-[var(--ares-border)]

            bg-[var(--ares-background-soft)]

            p-5

            sm:p-8
          "
        >
          <button
            type="button"
            onClick={onClose}
            className="
              ares-button

              w-full
            "
          >
            {resultCount} Ürünü Göster
          </button>

          <button
            type="button"
            onClick={onClear}
            className="
              mt-4

              w-full

              text-center

              text-[8px]
              font-semibold

              uppercase
              tracking-[0.14em]

              text-[var(--ares-muted)]
            "
          >
            Tüm Filtreleri Temizle
          </button>
        </div>
      </aside>
    </>
  );
}

function MobileSection({
  title,
  children,
}) {
  return (
    <div
      className="
        border-b
        border-[var(--ares-border)]

        py-7
      "
    >
      <p
        className="
          mb-5

          text-[8px]
          font-semibold

          uppercase
          tracking-[0.16em]

          text-[var(--ares-muted-light)]
        "
      >
        {title}
      </p>

      {children}
    </div>
  );
}