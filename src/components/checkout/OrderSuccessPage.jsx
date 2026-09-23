"use client";

import Link from "next/link";
import {
  useEffect,
  useState,
} from "react";

import {
  ArrowRight,
  Check,
  CheckCheck,
  Copy,
  Mail,
  PackageCheck,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";

/* =========================================================
   ORDER SUCCESS PAGE
========================================================= */

export default function OrderSuccessPage() {
  const [order, setOrder] =
    useState(null);

  const [isReady, setIsReady] =
    useState(false);

  const [copied, setCopied] =
    useState(false);

  /* =========================================================
     LOAD ORDER
  ========================================================== */

  useEffect(() => {
    try {
      const storedOrder =
        sessionStorage.getItem(
          "ares-last-order"
        );

      if (!storedOrder) {
        setIsReady(true);
        return;
      }

      const parsedOrder =
        JSON.parse(storedOrder);

      if (
        !parsedOrder ||
        !parsedOrder.orderNumber
      ) {
        setIsReady(true);
        return;
      }

      setOrder(parsedOrder);
    } catch (error) {
      console.error(
        "Sipariş bilgisi okunamadı:",
        error
      );
    } finally {
      setIsReady(true);
    }
  }, []);

  /* =========================================================
     COPY ORDER NUMBER
  ========================================================== */

  async function handleCopyOrderNumber() {
    if (!order?.orderNumber) {
      return;
    }

    try {
      await navigator.clipboard.writeText(
        order.orderNumber
      );

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error(
        "Sipariş numarası kopyalanamadı:",
        error
      );
    }
  }

  /* =========================================================
     INITIAL CLIENT LOAD
  ========================================================== */

  if (!isReady) {
    return <SuccessLoading />;
  }

  /* =========================================================
     INVALID DIRECT ACCESS
  ========================================================== */

  if (!order) {
    return <InvalidSuccessState />;
  }

  /* =========================================================
     SUCCESS
  ========================================================== */

  return (
    <section
      className="
        flex
        min-h-[calc(100svh-108px)]
        items-center
        bg-[var(--ares-background-soft)]
        lg:min-h-[calc(100svh-126px)]
      "
    >
      <div className="ares-container-wide w-full">
        <div
          className="
            mx-auto
            flex
            w-full
            max-w-[900px]
            flex-col
            items-center
            justify-center
            py-7
            text-center
            sm:py-9
            lg:py-7
          "
        >
          {/* ===============================================
              SUCCESS ICON
          ================================================ */}

          <div
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              border-[var(--ares-gold)]
              sm:h-14
              sm:w-14
            "
          >
            <Check
              size={19}
              strokeWidth={1.25}
              className="
                text-[var(--ares-gold)]
              "
            />
          </div>

          {/* ===============================================
              EYEBROW
          ================================================ */}

          <p
            className="
              mt-5
              w-full
              text-center
              text-[7px]
              font-semibold
              uppercase
              tracking-[0.2em]
              text-[var(--ares-muted)]
              sm:mt-6
              sm:text-[8px]
            "
          >
            ARES / Siparişiniz Alındı
          </p>

          {/* ===============================================
              TITLE
          ================================================ */}

          <h1
            className="
              mx-auto
              mt-3
              w-full
              max-w-[720px]
              text-center
              font-editorial
              text-[40px]
              font-medium
              leading-[0.92]
              tracking-[-0.04em]
              text-[var(--ares-dark-deep)]
              sm:mt-4
              sm:text-[52px]
              lg:text-[58px]
            "
          >
            Teşekkür ederiz.
          </h1>

          {/* ===============================================
              DESCRIPTION
          ================================================ */}

          <p
            className="
              mx-auto
              mt-5
              w-full
              max-w-[520px]
              text-center
              text-[9px]
              leading-[1.8]
              text-[var(--ares-muted)]
              sm:text-[10px]
            "
          >
            Siparişiniz başarıyla
            alınmıştır. Hazırlık ve teslimat
            sürecindeki gelişmeler sipariş
            durumunuza yansıtılacaktır.
          </p>

          {/* ===============================================
              ORDER NUMBER
          ================================================ */}

          <div
            className="
              mx-auto
              mt-6
              w-full
              max-w-[480px]
              border-y
              border-[var(--ares-border)]
              py-4
              text-center
              sm:mt-7
            "
          >
            <p
              className="
                text-center
                text-[7px]
                font-semibold
                uppercase
                tracking-[0.16em]
                text-[var(--ares-muted-light)]
              "
            >
              Sipariş Numarası
            </p>

            <div
              className="
                mt-2
                flex
                flex-col
                items-center
                justify-center
                gap-3
                sm:flex-row
                sm:gap-4
              "
            >
              <p
                className="
                  text-center
                  font-editorial
                  text-[20px]
                  font-medium
                  tracking-[0.03em]
                  text-[var(--ares-dark-deep)]
                "
              >
                {order.orderNumber}
              </p>

              <button
                type="button"
                onClick={
                  handleCopyOrderNumber
                }
                aria-label="Sipariş numarasını kopyala"
                className="
                  group
                  inline-flex
                  min-w-[98px]
                  items-center
                  justify-center
                  gap-2
                  px-3
                  py-1
                  text-[7px]
                  font-semibold
                  uppercase
                  tracking-[0.11em]
                  text-[var(--ares-muted)]
                  transition-colors
                  duration-300
                  hover:text-[var(--ares-dark-deep)]
                  focus:outline-none
                  focus-visible:outline-none
                  sm:border-l
                  sm:border-[var(--ares-border-dark)]
                "
              >
                {copied ? (
                  <>
                    <CheckCheck
                      size={12}
                      strokeWidth={1.4}
                      className="
                        text-[var(--ares-gold)]
                      "
                    />

                    <span>
                      Kopyalandı
                    </span>
                  </>
                ) : (
                  <>
                    <Copy
                      size={11}
                      strokeWidth={1.3}
                      className="
                        transition-transform
                        duration-300
                        group-hover:-translate-y-[1px]
                      "
                    />

                    <span>
                      Kopyala
                    </span>
                  </>
                )}
              </button>
            </div>

            {/* ORDER META */}

            <div
              className="
                mx-auto
                mt-4
                flex
                flex-wrap
                items-center
                justify-center
                gap-x-5
                gap-y-2
              "
            >
              <span
                className="
                  text-[7px]
                  uppercase
                  tracking-[0.1em]
                  text-[var(--ares-muted-light)]
                "
              >
                {order.itemCount} Ürün
              </span>

              <span
                aria-hidden="true"
                className="
                  hidden
                  h-[3px]
                  w-[3px]
                  rounded-full
                  bg-[var(--ares-border-dark)]
                  sm:block
                "
              />

              <span
                className="
                  font-editorial
                  text-[17px]
                  font-medium
                  text-[var(--ares-dark-deep)]
                "
              >
                {formatTRY(order.total)}
              </span>

              <span
                aria-hidden="true"
                className="
                  hidden
                  h-[3px]
                  w-[3px]
                  rounded-full
                  bg-[var(--ares-border-dark)]
                  sm:block
                "
              />

              <span
                className="
                  text-[7px]
                  uppercase
                  tracking-[0.1em]
                  text-[var(--ares-muted-light)]
                "
              >
                {getDeliveryLabel(
                  order.deliveryType
                )}
              </span>
            </div>
          </div>

          {/* ===============================================
              ORDER PROCESS
          ================================================ */}

          <div
            className="
              mx-auto
              mt-7
              grid
              w-full
              max-w-[720px]
              grid-cols-1
              gap-6
              border-b
              border-[var(--ares-border)]
              pb-7
              text-center
              sm:grid-cols-3
              sm:gap-0
            "
          >
            <ProcessItem
              icon={Mail}
              number="01"
              title="Onay"
              text="Siparişiniz başarıyla oluşturuldu."
            />

            <ProcessItem
              icon={PackageCheck}
              number="02"
              title="Hazırlık"
              text="Ürünleriniz ARES ekibi tarafından hazırlanır."
              bordered
            />

            <ProcessItem
              icon={Truck}
              number="03"
              title="Teslimat"
              text="Siparişiniz kargoya teslim edilerek adresinize gönderilir."
            />
          </div>

          {/* ===============================================
              SECURITY
          ================================================ */}

          <div
            className="
              mx-auto
              mt-5
              flex
              w-full
              max-w-[500px]
              flex-col
              items-center
              justify-center
              gap-2
              text-center
            "
          >
            <ShieldCheck
              size={14}
              strokeWidth={1.2}
              className="
                text-[var(--ares-gold)]
              "
            />

            <p
              className="
                mx-auto
                w-full
                text-center
                text-[7px]
                leading-[1.7]
                text-[var(--ares-muted-light)]
                sm:text-[8px]
              "
            >
              Ödeme bilgileriniz güvenli
              şekilde işlenir. Kart
              bilgileriniz ARES tarafından
              saklanmaz.
            </p>
          </div>

          {/* ===============================================
              ACTIONS
          ================================================ */}

          <div
            className="
              mx-auto
              mt-6
              flex
              w-full
              flex-col
              items-center
              justify-center
              gap-4
              text-center
              sm:flex-row
              sm:gap-6
            "
          >
            <Link
              href="/urunler"
              className="
                ares-button
                group
                min-w-[210px]
                justify-between
              "
            >
              <span>
                Koleksiyona Dön
              </span>

              <ArrowRight
                size={14}
                strokeWidth={1.3}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </Link>

            <Link
              href="/hesabim"
              className="
                text-center
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
              Hesabıma Git
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   PROCESS ITEM
========================================================= */

function ProcessItem({
  icon: Icon,
  number,
  title,
  text,
  bordered = false,
}) {
  return (
    <div
      className={`
        flex
        flex-col
        items-center
        justify-start
        px-5
        text-center
        sm:px-7

        ${
          bordered
            ? "sm:border-x sm:border-[var(--ares-border)]"
            : ""
        }
      `}
    >
      <Icon
        size={16}
        strokeWidth={1.1}
        className="
          mx-auto
          text-[var(--ares-gold)]
        "
      />

      <span
        className="
          mt-2.5
          block
          w-full
          text-center
          font-editorial
          text-[13px]
          text-[var(--ares-gold)]
        "
      >
        {number}
      </span>

      <h2
        className="
          mt-1
          w-full
          text-center
          text-[7px]
          font-semibold
          uppercase
          tracking-[0.14em]
          text-[var(--ares-dark-deep)]
          sm:text-[8px]
        "
      >
        {title}
      </h2>

      <p
        className="
          mx-auto
          mt-2
          w-full
          max-w-[190px]
          text-center
          text-[7px]
          leading-[1.65]
          text-[var(--ares-muted)]
          sm:text-[8px]
        "
      >
        {text}
      </p>
    </div>
  );
}

/* =========================================================
   LOADING
========================================================= */

function SuccessLoading() {
  return (
    <section
      className="
        flex
        min-h-[calc(100svh-108px)]
        items-center
        justify-center
        bg-[var(--ares-background-soft)]
        lg:min-h-[calc(100svh-126px)]
      "
    >
      <div className="text-center">
        <span
          className="
            mx-auto
            block
            h-6
            w-6
            animate-spin
            rounded-full
            border
            border-[var(--ares-border-dark)]
            border-t-[var(--ares-gold)]
          "
        />

        <p
          className="
            mt-4
            text-[7px]
            font-semibold
            uppercase
            tracking-[0.16em]
            text-[var(--ares-muted-light)]
          "
        >
          Sipariş bilgileri hazırlanıyor
        </p>
      </div>
    </section>
  );
}

/* =========================================================
   INVALID SUCCESS STATE
========================================================= */

function InvalidSuccessState() {
  return (
    <section
      className="
        flex
        min-h-[calc(100svh-108px)]
        items-center
        justify-center
        bg-[var(--ares-background-soft)]
        lg:min-h-[calc(100svh-126px)]
      "
    >
      <div
        className="
          mx-auto
          flex
          max-w-[600px]
          flex-col
          items-center
          px-5
          text-center
        "
      >
        <ShoppingBag
          size={26}
          strokeWidth={1}
          className="
            text-[var(--ares-gold)]
          "
        />

        <p
          className="
            mt-6
            text-[7px]
            font-semibold
            uppercase
            tracking-[0.18em]
            text-[var(--ares-muted-light)]
          "
        >
          ARES / Sipariş
        </p>

        <h1
          className="
            mt-4
            font-editorial
            text-[40px]
            font-medium
            leading-none
            tracking-[-0.035em]
            text-[var(--ares-dark-deep)]
            sm:text-[48px]
          "
        >
          Sipariş bilgisi bulunamadı.
        </h1>

        <p
          className="
            mx-auto
            mt-5
            max-w-[420px]
            text-[9px]
            leading-[1.8]
            text-[var(--ares-muted)]
          "
        >
          Bu sayfa tamamlanmış bir
          siparişin ardından görüntülenebilir.
        </p>

        <Link
          href="/urunler"
          className="
            ares-button
            group
            mt-8
            min-w-[210px]
            justify-between
          "
        >
          <span>
            Koleksiyonu Keşfet
          </span>

          <ArrowRight
            size={14}
            strokeWidth={1.3}
            className="
              transition-transform
              duration-300
              group-hover:translate-x-1
            "
          />
        </Link>
      </div>
    </section>
  );
}

/* =========================================================
   HELPERS
========================================================= */

function formatTRY(value) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);
}

function getDeliveryLabel(type) {
  if (type === "express") {
    return "Hızlı Teslimat";
  }

  return "Standart Teslimat";
}