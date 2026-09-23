"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  CreditCard,
  LockKeyhole,
  PackageCheck,
  ShieldCheck,
  Truck,
} from "lucide-react";

import useShopStore from "@/store/useShopStore";

/* =========================================================
   INITIAL FORM
========================================================= */

const initialForm = {
  name: "",
  surname: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  district: "",
  postalCode: "",
  addressTitle: "",
  note: "",
  cardHolder: "",
  cardNumber: "",
  expiry: "",
  cvc: "",
};

/* =========================================================
   CHECKOUT PAGE
========================================================= */

export default function CheckoutPage() {
  const router = useRouter();

  const cart = useShopStore((state) => state.cart);
  const clearCart = useShopStore(
    (state) => state.clearCart
  );

  const [form, setForm] =
    useState(initialForm);

  const [errors, setErrors] =
    useState({});

  const [deliveryType, setDeliveryType] =
    useState("standard");

  const [paymentType, setPaymentType] =
    useState("card");

  const [termsAccepted, setTermsAccepted] =
    useState(false);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  /* =========================================================
     CALCULATIONS
  ========================================================== */

  const itemCount = useMemo(
    () =>
      cart.reduce(
        (total, item) =>
          total + item.quantity,
        0
      ),
    [cart]
  );

  const subtotal = useMemo(
    () =>
      cart.reduce(
        (total, item) =>
          total +
          item.product.price *
            item.quantity,
        0
      ),
    [cart]
  );

  const shipping =
    deliveryType === "express"
      ? 249
      : 0;

  const total =
    subtotal + shipping;

  /* =========================================================
     INPUT CHANGE
  ========================================================== */

  function handleChange(event) {
    const { name, value } =
      event.target;

    let nextValue = value;

    if (name === "phone") {
      nextValue =
        formatPhone(value);
    }

    if (name === "cardNumber") {
      nextValue =
        formatCardNumber(value);
    }

    if (name === "expiry") {
      nextValue =
        formatExpiry(value);
    }

    if (name === "cvc") {
      nextValue = value
        .replace(/\D/g, "")
        .slice(0, 4);
    }

    setForm((current) => ({
      ...current,
      [name]: nextValue,
    }));

    if (errors[name]) {
      setErrors((current) => ({
        ...current,
        [name]: "",
      }));
    }

    if (errors.submit) {
      setErrors((current) => ({
        ...current,
        submit: "",
      }));
    }
  }

  /* =========================================================
     VALIDATION
  ========================================================== */

  function validateForm() {
    const nextErrors = {};

    if (!form.name.trim()) {
      nextErrors.name =
        "Ad alanı zorunludur.";
    }

    if (!form.surname.trim()) {
      nextErrors.surname =
        "Soyad alanı zorunludur.";
    }

    if (!form.email.trim()) {
      nextErrors.email =
        "E-posta alanı zorunludur.";
    } else if (
      !isValidEmail(form.email)
    ) {
      nextErrors.email =
        "Geçerli bir e-posta adresi girin.";
    }

    const phoneDigits =
      form.phone.replace(/\D/g, "");

    if (!form.phone.trim()) {
      nextErrors.phone =
        "Telefon alanı zorunludur.";
    } else if (
      phoneDigits.length < 10
    ) {
      nextErrors.phone =
        "Geçerli bir telefon numarası girin.";
    }

    if (!form.address.trim()) {
      nextErrors.address =
        "Teslimat adresi zorunludur.";
    }

    if (!form.city.trim()) {
      nextErrors.city =
        "İl alanı zorunludur.";
    }

    if (!form.district.trim()) {
      nextErrors.district =
        "İlçe alanı zorunludur.";
    }

    if (paymentType === "card") {
      if (
        !form.cardHolder.trim()
      ) {
        nextErrors.cardHolder =
          "Kart üzerindeki isim zorunludur.";
      }

      const cardDigits =
        form.cardNumber.replace(
          /\D/g,
          ""
        );

      if (
        !form.cardNumber.trim()
      ) {
        nextErrors.cardNumber =
          "Kart numarası zorunludur.";
      } else if (
        cardDigits.length !== 16
      ) {
        nextErrors.cardNumber =
          "Kart numarası 16 haneli olmalıdır.";
      }

      if (!form.expiry.trim()) {
        nextErrors.expiry =
          "Son kullanma tarihi zorunludur.";
      } else if (
        !isValidExpiry(
          form.expiry
        )
      ) {
        nextErrors.expiry =
          "Geçerli bir son kullanma tarihi girin.";
      }

      if (!form.cvc.trim()) {
        nextErrors.cvc =
          "CVV alanı zorunludur.";
      } else if (
        form.cvc.length < 3 ||
        form.cvc.length > 4
      ) {
        nextErrors.cvc =
          "Geçerli bir CVV girin.";
      }
    }

    if (!termsAccepted) {
      nextErrors.terms =
        "Siparişi tamamlamak için sözleşmeleri kabul etmelisiniz.";
    }

    setErrors(nextErrors);

    return (
      Object.keys(nextErrors)
        .length === 0
    );
  }

  /* =========================================================
     SUBMIT
  ========================================================== */

  async function handleSubmit(
    event
  ) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const isValid =
      validateForm();

    if (!isValid) {
      requestAnimationFrame(
        () => {
          const firstError =
            document.querySelector(
              '[aria-invalid="true"]'
            );

          firstError?.focus();
        }
      );

      return;
    }

    setIsSubmitting(true);

    try {
      /*
        ==========================================
        DEMO PAYMENT

        Production aşamasında:

        1. Server Action / API
        2. PostgreSQL Order oluşturma
        3. Payment provider
        4. Server-side ödeme doğrulama
        5. Order status güncelleme
        6. Başarılı işlem sonrası sepet temizleme

        yapılacak.

        Kart bilgileri localStorage veya
        sessionStorage içine kaydedilmez.
        ==========================================
      */

      await new Promise(
        (resolve) => {
          setTimeout(
            resolve,
            700
          );
        }
      );

      /* -----------------------------------------
         CREATE ORDER NUMBER
      ------------------------------------------ */

      const orderNumber =
        generateOrderNumber();

      /* -----------------------------------------
         SAFE ORDER SUMMARY

         Kart bilgileri, CVV ve açık adres
         burada tutulmuyor.
      ------------------------------------------ */

      const orderSummary = {
        orderNumber,
        total,
        itemCount,
        deliveryType,
        createdAt:
          new Date().toISOString(),
      };

      /* -----------------------------------------
         STORE TEMPORARY ORDER
      ------------------------------------------ */

      sessionStorage.setItem(
        "ares-last-order",
        JSON.stringify(
          orderSummary
        )
      );

      /* -----------------------------------------
         CLEAR CART
      ------------------------------------------ */

      clearCart();

      /* -----------------------------------------
         SUCCESS PAGE
      ------------------------------------------ */

      router.replace(
        "/siparis-basarili"
      );
    } catch (error) {
      console.error(
        "Checkout error:",
        error
      );

      setErrors(
        (current) => ({
          ...current,
          submit:
            "Sipariş oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.",
        })
      );

      setIsSubmitting(false);
    }
  }

  /* =========================================================
     EMPTY CART
  ========================================================== */

  if (cart.length === 0) {
    return <EmptyCheckout />;
  }

  /* =========================================================
     CHECKOUT
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
        {/* ===================================================
            TOP
        ==================================================== */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-[var(--ares-border)]
            pb-4
            sm:pb-5
          "
        >
          <div
            className="
              flex
              items-center
              gap-3
            "
          >
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
              ARES / Secure Checkout
            </p>
          </div>

          <div
            className="
              flex
              items-center
              gap-2
              text-[var(--ares-muted)]
            "
          >
            <LockKeyhole
              size={13}
              strokeWidth={1.2}
            />

            <span
              className="
                hidden
                text-[7px]
                font-semibold
                uppercase
                tracking-[0.12em]
                sm:inline
              "
            >
              Güvenli Ödeme
            </span>
          </div>
        </div>

        {/* ===================================================
            FORM
        ==================================================== */}

        <form
          onSubmit={
            handleSubmit
          }
          noValidate
        >
          <div
            className="
              grid
              gap-14
              pt-8
              lg:grid-cols-[minmax(0,1fr)_360px]
              lg:gap-16
              xl:grid-cols-[minmax(0,1fr)_400px]
              xl:gap-24
            "
          >
            {/* ===============================================
                LEFT
            ================================================ */}

            <div className="min-w-0">
              {/* =============================================
                  CONTACT
              ============================================== */}

              <CheckoutSection
                number="01"
                eyebrow="İletişim"
                title="İletişim bilgileri"
              >
                <div
                  className="
                    grid
                    gap-7
                    sm:grid-cols-2
                    sm:gap-5
                  "
                >
                  <CheckoutInput
                    id="checkout-name"
                    label="Ad"
                    name="name"
                    value={
                      form.name
                    }
                    error={
                      errors.name
                    }
                    onChange={
                      handleChange
                    }
                    autoComplete="given-name"
                    placeholder="Adınız"
                  />

                  <CheckoutInput
                    id="checkout-surname"
                    label="Soyad"
                    name="surname"
                    value={
                      form.surname
                    }
                    error={
                      errors.surname
                    }
                    onChange={
                      handleChange
                    }
                    autoComplete="family-name"
                    placeholder="Soyadınız"
                  />
                </div>

                <div
                  className="
                    mt-7
                    grid
                    gap-7
                    sm:grid-cols-2
                    sm:gap-5
                  "
                >
                  <CheckoutInput
                    id="checkout-email"
                    label="E-posta"
                    name="email"
                    type="email"
                    value={
                      form.email
                    }
                    error={
                      errors.email
                    }
                    onChange={
                      handleChange
                    }
                    autoComplete="email"
                    placeholder="E-posta adresiniz"
                  />

                  <CheckoutInput
                    id="checkout-phone"
                    label="Telefon"
                    name="phone"
                    type="tel"
                    value={
                      form.phone
                    }
                    error={
                      errors.phone
                    }
                    onChange={
                      handleChange
                    }
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="05XX XXX XX XX"
                  />
                </div>
              </CheckoutSection>

              {/* =============================================
                  ADDRESS
              ============================================== */}

              <CheckoutSection
                number="02"
                eyebrow="Teslimat"
                title="Teslimat adresi"
              >
                <CheckoutInput
                  id="checkout-address"
                  label="Adres"
                  name="address"
                  value={
                    form.address
                  }
                  error={
                    errors.address
                  }
                  onChange={
                    handleChange
                  }
                  autoComplete="street-address"
                  placeholder="Mahalle, cadde, sokak ve bina bilgisi"
                />

                <div
                  className="
                    mt-7
                    grid
                    gap-7
                    sm:grid-cols-2
                    sm:gap-5
                  "
                >
                  <CheckoutInput
                    id="checkout-city"
                    label="İl"
                    name="city"
                    value={
                      form.city
                    }
                    error={
                      errors.city
                    }
                    onChange={
                      handleChange
                    }
                    autoComplete="address-level1"
                    placeholder="İl"
                  />

                  <CheckoutInput
                    id="checkout-district"
                    label="İlçe"
                    name="district"
                    value={
                      form.district
                    }
                    error={
                      errors.district
                    }
                    onChange={
                      handleChange
                    }
                    autoComplete="address-level2"
                    placeholder="İlçe"
                  />
                </div>

                <div
                  className="
                    mt-7
                    grid
                    gap-7
                    sm:grid-cols-2
                    sm:gap-5
                  "
                >
                  <CheckoutInput
                    id="checkout-postal-code"
                    label="Posta Kodu"
                    name="postalCode"
                    value={
                      form.postalCode
                    }
                    onChange={
                      handleChange
                    }
                    autoComplete="postal-code"
                    inputMode="numeric"
                    placeholder="Posta kodu"
                  />

                  <CheckoutInput
                    id="checkout-address-title"
                    label="Adres Başlığı"
                    name="addressTitle"
                    value={
                      form.addressTitle
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Ev, İş..."
                  />
                </div>

                <div className="mt-7">
                  <CheckoutTextarea
                    id="checkout-note"
                    label="Sipariş Notu"
                    name="note"
                    value={
                      form.note
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Teslimat için eklemek istediğiniz bir not varsa yazabilirsiniz."
                  />
                </div>
              </CheckoutSection>

              {/* =============================================
                  SHIPPING
              ============================================== */}

              <CheckoutSection
                number="03"
                eyebrow="Kargo"
                title="Teslimat yöntemi"
              >
                <div
                  className="
                    border-y
                    border-[var(--ares-border)]
                  "
                >
                  <DeliveryOption
                    active={
                      deliveryType ===
                      "standard"
                    }
                    onClick={() =>
                      setDeliveryType(
                        "standard"
                      )
                    }
                    icon={Truck}
                    title="Standart Teslimat"
                    description="Tahmini 2–4 iş günü"
                    price="Ücretsiz"
                  />

                  <DeliveryOption
                    active={
                      deliveryType ===
                      "express"
                    }
                    onClick={() =>
                      setDeliveryType(
                        "express"
                      )
                    }
                    icon={
                      PackageCheck
                    }
                    title="Hızlı Teslimat"
                    description="Tahmini 1–2 iş günü"
                    price="₺249"
                    borderTop
                  />
                </div>
              </CheckoutSection>

              {/* =============================================
                  PAYMENT
              ============================================== */}

              <CheckoutSection
                number="04"
                eyebrow="Ödeme"
                title="Ödeme yöntemi"
                last
              >
                <div
                  className="
                    border-y
                    border-[var(--ares-border)]
                  "
                >
                  <PaymentOption
                    active={
                      paymentType ===
                      "card"
                    }
                    onClick={() =>
                      setPaymentType(
                        "card"
                      )
                    }
                    icon={
                      CreditCard
                    }
                    title="Kredi / Banka Kartı"
                    description="Visa, Mastercard ve desteklenen banka kartları"
                  />
                </div>

                {paymentType ===
                  "card" && (
                  <div className="mt-8">
                    <CheckoutInput
                      id="card-holder"
                      label="Kart Üzerindeki İsim"
                      name="cardHolder"
                      value={
                        form.cardHolder
                      }
                      error={
                        errors.cardHolder
                      }
                      onChange={
                        handleChange
                      }
                      autoComplete="cc-name"
                      placeholder="Ad Soyad"
                    />

                    <div className="mt-7">
                      <CheckoutInput
                        id="card-number"
                        label="Kart Numarası"
                        name="cardNumber"
                        value={
                          form.cardNumber
                        }
                        error={
                          errors.cardNumber
                        }
                        onChange={
                          handleChange
                        }
                        inputMode="numeric"
                        autoComplete="cc-number"
                        placeholder="0000 0000 0000 0000"
                        maxLength={
                          19
                        }
                      />
                    </div>

                    <div
                      className="
                        mt-7
                        grid
                        grid-cols-2
                        gap-5
                      "
                    >
                      <CheckoutInput
                        id="card-expiry"
                        label="Son Kullanma"
                        name="expiry"
                        value={
                          form.expiry
                        }
                        error={
                          errors.expiry
                        }
                        onChange={
                          handleChange
                        }
                        inputMode="numeric"
                        autoComplete="cc-exp"
                        placeholder="AA / YY"
                        maxLength={
                          7
                        }
                      />

                      <CheckoutInput
                        id="card-cvc"
                        label="CVV"
                        name="cvc"
                        type="password"
                        value={
                          form.cvc
                        }
                        error={
                          errors.cvc
                        }
                        onChange={
                          handleChange
                        }
                        inputMode="numeric"
                        autoComplete="cc-csc"
                        placeholder="•••"
                        maxLength={
                          4
                        }
                      />
                    </div>

                    <div
                      className="
                        mt-6
                        flex
                        items-start
                        gap-3
                      "
                    >
                      <ShieldCheck
                        size={14}
                        strokeWidth={
                          1.2
                        }
                        className="
                          mt-[1px]
                          flex-shrink-0
                          text-[var(--ares-gold)]
                        "
                      />

                      <p
                        className="
                          max-w-[520px]
                          text-[8px]
                          leading-[1.7]
                          text-[var(--ares-muted-light)]
                        "
                      >
                        Kart bilgileriniz
                        ARES tarafından
                        saklanmaz. Gerçek
                        ödeme
                        entegrasyonunda
                        ödeme bilgileri
                        güvenli ödeme
                        sağlayıcısı
                        üzerinden
                        işlenecektir.
                      </p>
                    </div>
                  </div>
                )}
              </CheckoutSection>
            </div>

            {/* ===============================================
                ORDER SUMMARY
            ================================================ */}

            <aside>
              <div
                className="
                  lg:sticky
                  lg:top-[158px]
                "
              >
                <div
                  className="
                    border-t
                    border-[var(--ares-dark)]
                    pt-5
                  "
                >
                  <div
                    className="
                      flex
                      items-end
                      justify-between
                      gap-4
                    "
                  >
                    <div>
                      <p
                        className="
                          text-[7px]
                          font-semibold
                          uppercase
                          tracking-[0.16em]
                          text-[var(--ares-muted-light)]
                        "
                      >
                        Sipariş
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
                        Sipariş Özeti
                      </h2>
                    </div>

                    <span
                      className="
                        text-[8px]
                        font-semibold
                        uppercase
                        tracking-[0.1em]
                        text-[var(--ares-muted)]
                      "
                    >
                      {itemCount} Ürün
                    </span>
                  </div>

                  {/* =========================================
                      PRODUCTS
                  ========================================== */}

                  <div
                    className="
                      mt-6
                      max-h-[330px]
                      space-y-5
                      overflow-y-auto
                      border-y
                      border-[var(--ares-border)]
                      py-5
                      pr-2
                    "
                  >
                    {cart.map(
                      (item) => (
                        <OrderItem
                          key={
                            item.id
                          }
                          item={
                            item
                          }
                        />
                      )
                    )}
                  </div>

                  {/* =========================================
                      TOTALS
                  ========================================== */}

                  <div className="mt-6 space-y-4">
                    <SummaryRow
                      label="Ara Toplam"
                      value={formatTRY(
                        subtotal
                      )}
                    />

                    <SummaryRow
                      label="Kargo"
                      value={
                        shipping ===
                        0
                          ? "Ücretsiz"
                          : formatTRY(
                              shipping
                            )
                      }
                    />

                    <div
                      className="
                        border-t
                        border-[var(--ares-border)]
                        pt-4
                      "
                    >
                      <div
                        className="
                          flex
                          items-end
                          justify-between
                          gap-5
                        "
                      >
                        <div>
                          <span
                            className="
                              block
                              text-[7px]
                              font-semibold
                              uppercase
                              tracking-[0.14em]
                              text-[var(--ares-muted-light)]
                            "
                          >
                            Toplam
                          </span>

                          <span
                            className="
                              mt-1
                              block
                              text-[8px]
                              text-[var(--ares-muted)]
                            "
                          >
                            Vergiler
                            dahil
                          </span>
                        </div>

                        <strong
                          className="
                            font-editorial
                            text-[27px]
                            font-medium
                            text-[var(--ares-dark-deep)]
                          "
                        >
                          {formatTRY(
                            total
                          )}
                        </strong>
                      </div>
                    </div>
                  </div>

                  {/* =========================================
                      TERMS
                  ========================================== */}

                  <label
                    className="
                      mt-7
                      flex
                      cursor-pointer
                      items-start
                      gap-3
                    "
                  >
                    <input
                      type="checkbox"
                      checked={
                        termsAccepted
                      }
                      onChange={(
                        event
                      ) => {
                        setTermsAccepted(
                          event
                            .target
                            .checked
                        );

                        if (
                          errors.terms
                        ) {
                          setErrors(
                            (
                              current
                            ) => ({
                              ...current,
                              terms:
                                "",
                            })
                          );
                        }
                      }}
                      className="peer sr-only"
                    />

                    <span
                      className={`
                        mt-[1px]
                        flex
                        h-4
                        w-4
                        flex-shrink-0
                        items-center
                        justify-center
                        border
                        transition-all
                        duration-300

                        ${
                          termsAccepted
                            ? "border-[var(--ares-dark)] bg-[var(--ares-dark)]"
                            : "border-[var(--ares-border-dark)] bg-transparent"
                        }
                      `}
                    >
                      <Check
                        size={10}
                        strokeWidth={
                          1.8
                        }
                        className={`
                          text-[var(--ares-background-soft)]
                          transition-opacity
                          duration-200

                          ${
                            termsAccepted
                              ? "opacity-100"
                              : "opacity-0"
                          }
                        `}
                      />
                    </span>

                    <span
                      className="
                        text-[8px]
                        leading-[1.65]
                        text-[var(--ares-muted)]
                      "
                    >
                      Ön bilgilendirme
                      formunu ve
                      mesafeli satış
                      sözleşmesini
                      okudum, kabul
                      ediyorum.
                    </span>
                  </label>

                  {errors.terms && (
                    <p
                      className="
                        mt-3
                        text-[8px]
                        leading-[1.5]
                        text-[#9f3a38]
                      "
                    >
                      {
                        errors.terms
                      }
                    </p>
                  )}

                  {/* =========================================
                      SUBMIT ERROR
                  ========================================== */}

                  {errors.submit && (
                    <p
                      role="alert"
                      className="
                        mt-4
                        text-center
                        text-[8px]
                        leading-[1.6]
                        text-[#9f3a38]
                      "
                    >
                      {
                        errors.submit
                      }
                    </p>
                  )}

                  {/* =========================================
                      SUBMIT
                  ========================================== */}

                  <button
                    type="submit"
                    disabled={
                      isSubmitting
                    }
                    className="
                      ares-button
                      group
                      mt-6
                      w-full
                      justify-between
                      px-6
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                  >
                    <span>
                      {isSubmitting
                        ? "İşleniyor..."
                        : "Siparişi Tamamla"}
                    </span>

                    <ArrowRight
                      size={14}
                      strokeWidth={
                        1.3
                      }
                      className="
                        transition-transform
                        duration-300
                        group-hover:translate-x-1
                      "
                    />
                  </button>

                  {/* =========================================
                      SECURITY
                  ========================================== */}

                  <div
                    className="
                      mt-5
                      flex
                      items-center
                      justify-center
                      gap-2
                      text-[var(--ares-muted-light)]
                    "
                  >
                    <LockKeyhole
                      size={11}
                      strokeWidth={
                        1.2
                      }
                    />

                    <span
                      className="
                        text-[7px]
                        font-medium
                        uppercase
                        tracking-[0.1em]
                      "
                    >
                      Güvenli ve
                      şifreli ödeme
                    </span>
                  </div>

                  <Link
                    href="/sepet"
                    className="
                      mt-7
                      flex
                      items-center
                      justify-center
                      gap-2
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
                    <ArrowLeft
                      size={12}
                      strokeWidth={
                        1.3
                      }
                    />

                    Sepete Dön
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </form>
      </div>
    </section>
  );
}

/* =========================================================
   SECTION
========================================================= */

function CheckoutSection({
  number,
  eyebrow,
  title,
  children,
  last = false,
}) {
  return (
    <section
      className={`
        ${
          last
            ? "pb-4"
            : "border-b border-[var(--ares-border)] pb-10 sm:pb-12"
        }

        [&+section]:pt-10
        sm:[&+section]:pt-12
      `}
    >
      <div
        className="
          mb-7
          flex
          items-start
          gap-5
        "
      >
        <span
          className="
            pt-1
            font-editorial
            text-[15px]
            text-[var(--ares-gold)]
          "
        >
          {number}
        </span>

        <div>
          <p
            className="
              text-[7px]
              font-semibold
              uppercase
              tracking-[0.16em]
              text-[var(--ares-muted-light)]
            "
          >
            {eyebrow}
          </p>

          <h2
            className="
              mt-2
              font-editorial
              text-[29px]
              font-medium
              leading-none
              tracking-[-0.025em]
              text-[var(--ares-dark-deep)]
              sm:text-[32px]
            "
          >
            {title}
          </h2>
        </div>
      </div>

      {children}
    </section>
  );
}

/* =========================================================
   INPUT
========================================================= */

function CheckoutInput({
  id,
  label,
  name,
  type = "text",
  placeholder,
  autoComplete,
  inputMode,
  value,
  onChange,
  error,
  maxLength,
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="
          block
          text-[7px]
          font-semibold
          uppercase
          tracking-[0.14em]
          text-[var(--ares-muted-light)]
          sm:text-[8px]
        "
      >
        {label}
      </label>

      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={
          placeholder
        }
        autoComplete={
          autoComplete
        }
        inputMode={
          inputMode
        }
        maxLength={
          maxLength
        }
        aria-invalid={
          Boolean(error)
        }
        aria-describedby={
          error
            ? `${id}-error`
            : undefined
        }
        className={`
          ares-account-input
          mt-2
          min-h-[48px]
          w-full
          px-2
          text-[10px]
          sm:text-[11px]

          ${
            error
              ? "!border-b-[#9f3a38]"
              : ""
          }
        `}
      />

      {error && (
        <p
          id={`${id}-error`}
          className="
            mt-2
            text-[8px]
            leading-[1.4]
            text-[#9f3a38]
          "
        >
          {error}
        </p>
      )}
    </div>
  );
}

/* =========================================================
   TEXTAREA
========================================================= */

function CheckoutTextarea({
  id,
  label,
  name,
  placeholder,
  value,
  onChange,
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="
          block
          text-[7px]
          font-semibold
          uppercase
          tracking-[0.14em]
          text-[var(--ares-muted-light)]
          sm:text-[8px]
        "
      >
        {label}
      </label>

      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={
          placeholder
        }
        rows={3}
        className="
          ares-account-input
          mt-3
          w-full
          resize-none
          px-2
          py-3
          text-[10px]
          leading-[1.7]
          sm:text-[11px]
        "
      />
    </div>
  );
}

/* =========================================================
   DELIVERY OPTION
========================================================= */

function DeliveryOption({
  active,
  onClick,
  icon: Icon,
  title,
  description,
  price,
  borderTop = false,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex
        w-full
        items-center
        gap-4
        py-5
        text-left

        ${
          borderTop
            ? "border-t border-[var(--ares-border)]"
            : ""
        }
      `}
    >
      <span
        className={`
          flex
          h-[18px]
          w-[18px]
          flex-shrink-0
          items-center
          justify-center
          rounded-full
          border
          transition-colors
          duration-300

          ${
            active
              ? "border-[var(--ares-dark)]"
              : "border-[var(--ares-border-dark)]"
          }
        `}
      >
        <span
          className={`
            h-[8px]
            w-[8px]
            rounded-full
            bg-[var(--ares-dark)]
            transition-opacity
            duration-200

            ${
              active
                ? "opacity-100"
                : "opacity-0"
            }
          `}
        />
      </span>

      <Icon
        size={17}
        strokeWidth={1.15}
        className="
          flex-shrink-0
          text-[var(--ares-muted)]
        "
      />

      <div
        className="
          min-w-0
          flex-1
        "
      >
        <p
          className="
            text-[9px]
            font-semibold
            text-[var(--ares-dark-deep)]
            sm:text-[10px]
          "
        >
          {title}
        </p>

        <p
          className="
            mt-1
            text-[8px]
            text-[var(--ares-muted-light)]
          "
        >
          {description}
        </p>
      </div>

      <span
        className="
          flex-shrink-0
          text-[8px]
          font-semibold
          uppercase
          tracking-[0.08em]
          text-[var(--ares-dark-deep)]
        "
      >
        {price}
      </span>
    </button>
  );
}

/* =========================================================
   PAYMENT OPTION
========================================================= */

function PaymentOption({
  active,
  onClick,
  icon: Icon,
  title,
  description,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        flex
        w-full
        items-center
        gap-4
        py-5
        text-left
      "
    >
      <span
        className={`
          flex
          h-[18px]
          w-[18px]
          flex-shrink-0
          items-center
          justify-center
          rounded-full
          border

          ${
            active
              ? "border-[var(--ares-dark)]"
              : "border-[var(--ares-border-dark)]"
          }
        `}
      >
        <span
          className={`
            h-[8px]
            w-[8px]
            rounded-full
            bg-[var(--ares-dark)]

            ${
              active
                ? "opacity-100"
                : "opacity-0"
            }
          `}
        />
      </span>

      <Icon
        size={17}
        strokeWidth={1.15}
        className="
          flex-shrink-0
          text-[var(--ares-muted)]
        "
      />

      <div>
        <p
          className="
            text-[9px]
            font-semibold
            text-[var(--ares-dark-deep)]
            sm:text-[10px]
          "
        >
          {title}
        </p>

        <p
          className="
            mt-1
            text-[8px]
            leading-[1.5]
            text-[var(--ares-muted-light)]
          "
        >
          {description}
        </p>
      </div>
    </button>
  );
}

/* =========================================================
   ORDER ITEM
========================================================= */

function OrderItem({
  item,
}) {
  const productImage =
    item.product.image ||
    item.product.images?.[0];

  return (
    <div
      className="
        grid
        grid-cols-[64px_minmax(0,1fr)_auto]
        gap-3
      "
    >
      <div
        className="
          relative
          aspect-[3/4]
          overflow-hidden
          bg-[var(--ares-background-warm)]
        "
      >
        {productImage && (
          <Image
            src={
              productImage
            }
            alt={
              item.product.name
            }
            fill
            sizes="64px"
            className="object-cover"
          />
        )}
      </div>

      <div
        className="
          min-w-0
          py-1
        "
      >
        <p
          className="
            truncate
            text-[9px]
            font-semibold
            text-[var(--ares-dark-deep)]
          "
        >
          {item.product.name}
        </p>

        <p
          className="
            mt-2
            text-[7px]
            uppercase
            tracking-[0.08em]
            text-[var(--ares-muted-light)]
          "
        >
          Beden {item.size}
          {" / "}
          Adet {item.quantity}
        </p>
      </div>

      <p
        className="
          py-1
          text-right
          text-[9px]
          font-medium
          text-[var(--ares-dark-deep)]
        "
      >
        {formatTRY(
          item.product.price *
            item.quantity
        )}
      </p>
    </div>
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
        gap-5
      "
    >
      <span
        className="
          text-[8px]
          uppercase
          tracking-[0.1em]
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
   EMPTY CHECKOUT
========================================================= */

function EmptyCheckout() {
  return (
    <section
      className="
        flex
        min-h-[calc(100svh-108px)]
        items-center
        bg-[var(--ares-background-soft)]
        px-5
        py-16
        lg:min-h-[calc(100svh-126px)]
      "
    >
      <div
        className="
          mx-auto
          max-w-[620px]
          text-center
        "
      >
        <p
          className="
            text-[8px]
            font-semibold
            uppercase
            tracking-[0.18em]
            text-[var(--ares-muted-light)]
          "
        >
          ARES / Checkout
        </p>

        <h1
          className="
            mt-5
            font-editorial
            text-[38px]
            font-medium
            leading-none
            tracking-[-0.035em]
            text-[var(--ares-dark-deep)]
            sm:text-[46px]
          "
        >
          Sepetiniz boş.
        </h1>

        <p
          className="
            mx-auto
            mt-5
            max-w-[420px]
            text-[10px]
            leading-[1.8]
            text-[var(--ares-muted)]
          "
        >
          Ödeme adımına
          geçebilmek için önce
          koleksiyondan bir ürün
          seçmeniz gerekiyor.
        </p>

        <Link
          href="/urunler"
          className="
            ares-button
            group
            mt-8
          "
        >
          Koleksiyonu Keşfet

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
   FORMATTERS
========================================================= */

function formatTRY(value) {
  return new Intl.NumberFormat(
    "tr-TR",
    {
      style: "currency",
      currency: "TRY",
      maximumFractionDigits: 0,
    }
  ).format(
    Number(value) || 0
  );
}

function formatCardNumber(
  value
) {
  const digits = value
    .replace(/\D/g, "")
    .slice(0, 16);

  return digits
    .replace(
      /(.{4})/g,
      "$1 "
    )
    .trim();
}

function formatExpiry(value) {
  const digits = value
    .replace(/\D/g, "")
    .slice(0, 4);

  if (
    digits.length <= 2
  ) {
    return digits;
  }

  return `${digits.slice(
    0,
    2
  )} / ${digits.slice(2)}`;
}

function formatPhone(value) {
  const digits = value
    .replace(/\D/g, "")
    .slice(0, 11);

  if (!digits) {
    return "";
  }

  if (
    digits.length <= 4
  ) {
    return digits;
  }

  if (
    digits.length <= 7
  ) {
    return `${digits.slice(
      0,
      4
    )} ${digits.slice(4)}`;
  }

  if (
    digits.length <= 9
  ) {
    return `${digits.slice(
      0,
      4
    )} ${digits.slice(
      4,
      7
    )} ${digits.slice(7)}`;
  }

  return `${digits.slice(
    0,
    4
  )} ${digits.slice(
    4,
    7
  )} ${digits.slice(
    7,
    9
  )} ${digits.slice(9)}`;
}

/* =========================================================
   VALIDATORS
========================================================= */

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    email.trim()
  );
}

function isValidExpiry(value) {
  const match =
    value.match(
      /^(\d{2})\s\/\s(\d{2})$/
    );

  if (!match) {
    return false;
  }

  const month =
    Number(match[1]);

  const year =
    Number(match[2]);

  if (
    month < 1 ||
    month > 12
  ) {
    return false;
  }

  const now =
    new Date();

  const currentYear =
    now.getFullYear() %
    100;

  const currentMonth =
    now.getMonth() + 1;

  if (
    year < currentYear
  ) {
    return false;
  }

  if (
    year ===
      currentYear &&
    month < currentMonth
  ) {
    return false;
  }

  return true;
}

/* =========================================================
   ORDER NUMBER
========================================================= */

function generateOrderNumber() {
  const year =
    new Date().getFullYear();

  const timestamp =
    Date.now()
      .toString()
      .slice(-6);

  const random =
    Math.floor(
      100 +
        Math.random() * 900
    );

  return `ARES-${year}-${timestamp}${random}`;
}