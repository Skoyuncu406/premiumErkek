"use client";

import { X } from "lucide-react";

const clothingSizes = [
  {
    size: "S",
    chest: "88–94",
    waist: "76–82",
    hip: "90–96",
  },
  {
    size: "M",
    chest: "94–100",
    waist: "82–88",
    hip: "96–102",
  },
  {
    size: "L",
    chest: "100–106",
    waist: "88–94",
    hip: "102–108",
  },
  {
    size: "XL",
    chest: "106–112",
    waist: "94–100",
    hip: "108–114",
  },
];

const tailoringSizes = [
  {
    size: "46",
    chest: "90–93",
    waist: "78–81",
    hip: "92–95",
  },
  {
    size: "48",
    chest: "94–97",
    waist: "82–85",
    hip: "96–99",
  },
  {
    size: "50",
    chest: "98–101",
    waist: "86–89",
    hip: "100–103",
  },
  {
    size: "52",
    chest: "102–105",
    waist: "90–93",
    hip: "104–107",
  },
];

export default function SizeGuide({
  open = false,
  onClose = () => {},
  product,
}) {
  const numericSizes = product?.sizes?.some((size) =>
    /^\d+$/.test(String(size))
  );

  const sizeData = numericSizes
    ? tailoringSizes
    : clothingSizes;

  return (
    <>
      {/* OVERLAY */}

      <div
        onClick={onClose}
        className={`
          fixed
          inset-0
          z-[80]

          bg-black/25
          backdrop-blur-[2px]

          transition-opacity
          duration-500

          ${
            open
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
      />

      {/* DRAWER */}

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Beden rehberi"
        className={`
          fixed
          right-0
          top-0
          z-[90]

          flex
          h-dvh

          w-[92%]
          max-w-[520px]

          flex-col

          bg-[var(--ares-background-soft)]

          transition-transform
          duration-500

          ease-[cubic-bezier(0.22,1,0.36,1)]

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
            min-h-[86px]

            items-center
            justify-between

            border-b
            border-[var(--ares-border)]

            px-6

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
              ARES / Fit Guide
            </p>

            <h2
              className="
                mt-2

                font-editorial

                text-[30px]
                font-medium

                leading-none

                tracking-[-0.025em]

                text-[var(--ares-dark-deep)]
              "
            >
              Beden Rehberi
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Beden rehberini kapat"
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
              strokeWidth={1.2}
            />
          </button>
        </div>

        {/* CONTENT */}

        <div
          className="
            flex-1
            overflow-y-auto

            px-6
            py-8

            sm:px-8
            sm:py-10
          "
        >
          {/* PRODUCT */}

          <div
            className="
              border-b
              border-[var(--ares-border)]

              pb-7
            "
          >
            <p
              className="
                text-[8px]
                font-semibold

                uppercase
                tracking-[0.16em]

                text-[var(--ares-muted-light)]
              "
            >
              Seçili Ürün
            </p>

            <p
              className="
                mt-3

                font-editorial

                text-[24px]
                font-medium

                leading-none

                text-[var(--ares-dark-deep)]
              "
            >
              {product?.name}
            </p>

            <p
              className="
                mt-2

                text-[9px]

                text-[var(--ares-muted)]
              "
            >
              {product?.category}
            </p>
          </div>

          {/* INTRO */}

          <div className="py-7">
            <p
              className="
                max-w-[390px]

                text-[10px]

                leading-[1.8]

                text-[var(--ares-muted)]

                sm:text-[11px]
              "
            >
              Size en uygun bedeni belirlemek için
              ölçülerinizi aşağıdaki tabloyla
              karşılaştırabilirsiniz. Ölçüler santimetre
              cinsindendir.
            </p>
          </div>

          {/* TABLE */}

          <div
            className="
              border-t
              border-[var(--ares-dark-deep)]
            "
          >
            <div
              className="
                grid
                grid-cols-4

                border-b
                border-[var(--ares-border)]

                py-4
              "
            >
              <TableHeading>
                Beden
              </TableHeading>

              <TableHeading>
                Göğüs
              </TableHeading>

              <TableHeading>
                Bel
              </TableHeading>

              <TableHeading>
                Basen
              </TableHeading>
            </div>

            {sizeData.map((item) => (
              <div
                key={item.size}
                className="
                  grid
                  grid-cols-4

                  border-b
                  border-[var(--ares-border)]

                  py-4
                "
              >
                <span
                  className="
                    text-[10px]
                    font-semibold

                    text-[var(--ares-dark-deep)]
                  "
                >
                  {item.size}
                </span>

                <TableValue>
                  {item.chest}
                </TableValue>

                <TableValue>
                  {item.waist}
                </TableValue>

                <TableValue>
                  {item.hip}
                </TableValue>
              </div>
            ))}
          </div>

          {/* MEASUREMENT GUIDE */}

          <div
            className="
              mt-10

              border-t
              border-[var(--ares-border)]

              pt-8
            "
          >
            <div className="flex items-center gap-3">
              <span
                className="
                  h-px
                  w-7

                  bg-[var(--ares-gold)]
                "
              />

              <p
                className="
                  text-[8px]
                  font-semibold

                  uppercase
                  tracking-[0.18em]

                  text-[var(--ares-muted)]
                "
              >
                Nasıl Ölçülür?
              </p>
            </div>

            <div
              className="
                mt-6

                flex
                flex-col

                gap-6
              "
            >
              <Measurement
                number="01"
                title="Göğüs"
              >
                Mezurayı göğsünüzün en geniş
                noktasından, yere paralel olacak
                şekilde geçirin.
              </Measurement>

              <Measurement
                number="02"
                title="Bel"
              >
                Belinizin doğal ve en dar
                noktasından ölçüm alın.
              </Measurement>

              <Measurement
                number="03"
                title="Basen"
              >
                Ayaklarınız bitişik durumdayken
                basenin en geniş noktasını ölçün.
              </Measurement>
            </div>
          </div>

          {/* NOTE */}

          <div
            className="
              mt-10

              bg-[var(--ares-background-warm)]

              px-5
              py-5
            "
          >
            <p
              className="
                text-[9px]

                leading-[1.8]

                text-[var(--ares-muted)]
              "
            >
              İki beden arasında kalıyorsanız ürünün
              kalıbına ve tercih ettiğiniz kullanım
              şekline göre seçim yapmanızı öneririz.
            </p>
          </div>
        </div>

        {/* BOTTOM */}

        <div
          className="
            flex-shrink-0

            border-t
            border-[var(--ares-border)]

            bg-[var(--ares-background-soft)]

            p-6

            sm:px-8
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
            Alışverişe Devam Et
          </button>
        </div>
      </aside>
    </>
  );
}

function TableHeading({ children }) {
  return (
    <span
      className="
        text-[7px]
        font-semibold

        uppercase
        tracking-[0.12em]

        text-[var(--ares-muted-light)]

        sm:text-[8px]
      "
    >
      {children}
    </span>
  );
}

function TableValue({ children }) {
  return (
    <span
      className="
        text-[9px]

        text-[var(--ares-muted)]

        sm:text-[10px]
      "
    >
      {children}
    </span>
  );
}

function Measurement({
  number,
  title,
  children,
}) {
  return (
    <div
      className="
        grid
        grid-cols-[34px_1fr]

        gap-4
      "
    >
      <span
        className="
          font-editorial

          text-[18px]

          text-[var(--ares-gold)]
        "
      >
        {number}
      </span>

      <div>
        <p
          className="
            text-[9px]
            font-semibold

            uppercase
            tracking-[0.12em]

            text-[var(--ares-dark-deep)]
          "
        >
          {title}
        </p>

        <p
          className="
            mt-2

            max-w-[330px]

            text-[9px]

            leading-[1.7]

            text-[var(--ares-muted)]
          "
        >
          {children}
        </p>
      </div>
    </div>
  );
}