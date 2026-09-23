"use client";

import { useState } from "react";

import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  LockKeyhole,
  UserRound,
} from "lucide-react";

export default function AccountPage() {
  /* =========================================================
     PASSWORD VISIBILITY
  ========================================================== */

  const [
    loginPasswordVisible,
    setLoginPasswordVisible,
  ] = useState(false);

  const [
    registerPasswordVisible,
    setRegisterPasswordVisible,
  ] = useState(false);

  const [
    registerPasswordAgainVisible,
    setRegisterPasswordAgainVisible,
  ] = useState(false);

  /* =========================================================
     RENDER
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
            SMALL PAGE HEADER
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
              ARES / Private Client
            </p>
          </div>

          <UserRound
            size={15}
            strokeWidth={1.15}
            className="
              text-[var(--ares-muted)]
            "
          />
        </div>

        {/* ===================================================
            ACCOUNT GRID
        ==================================================== */}

        <div
          className="
            grid

            lg:grid-cols-2
          "
        >
          {/* =================================================
              LOGIN
          ================================================== */}

          <div
            className="
              border-b
              border-[var(--ares-border)]

              py-10

              sm:py-14

              lg:border-b-0
              lg:border-r
              lg:py-16
              lg:pr-14

              xl:pr-20

              2xl:pr-24
            "
          >
            <div className="max-w-[520px]">
              {/* =============================================
                  LOGIN INTRO
              ============================================== */}

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
                    text-[7px]
                    font-semibold

                    uppercase
                    tracking-[0.18em]

                    text-[var(--ares-muted)]

                    sm:text-[8px]
                  "
                >
                  Mevcut Müşteri
                </p>
              </div>

              <h1
                className="
                  mt-5

                  font-editorial

                  text-[38px]
                  font-medium

                  leading-[0.95]

                  tracking-[-0.035em]

                  text-[var(--ares-dark-deep)]

                  sm:text-[44px]

                  lg:text-[48px]
                "
              >
                Tekrar hoş geldiniz.
              </h1>

              <p
                className="
                  mt-5

                  max-w-[410px]

                  text-[10px]

                  leading-[1.8]

                  text-[var(--ares-muted)]

                  sm:text-[11px]
                "
              >
                Siparişlerinizi görüntülemek,
                kayıtlı bilgilerinize erişmek ve
                alışverişinizi daha hızlı tamamlamak
                için hesabınıza giriş yapın.
              </p>

              {/* =============================================
                  LOGIN FORM
              ============================================== */}

              <form
                onSubmit={(event) =>
                  event.preventDefault()
                }
                className="mt-9"
              >
                {/* EMAIL */}

                <AccountInput
                  id="login-email"
                  label="E-posta"
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="E-posta adresiniz"
                />

                {/* PASSWORD */}

                <div className="mt-7">
                  <PasswordInput
                    id="login-password"
                    label="Şifre"
                    name="password"
                    autoComplete="current-password"
                    placeholder="Şifreniz"
                    visible={loginPasswordVisible}
                    onToggle={() =>
                      setLoginPasswordVisible(
                        (current) => !current
                      )
                    }
                  />
                </div>

                {/* FORGOT PASSWORD */}

                <div
                  className="
                    mt-4

                    flex
                    justify-end
                  "
                >
                  <button
                    type="button"
                    className="
                      text-[7px]
                      font-semibold

                      uppercase
                      tracking-[0.1em]

                      text-[var(--ares-muted)]

                      underline
                      underline-offset-4

                      transition-colors
                      duration-300

                      hover:text-[var(--ares-dark-deep)]

                      sm:text-[8px]
                    "
                  >
                    Şifremi Unuttum
                  </button>
                </div>

                {/* LOGIN BUTTON */}

                <button
                  type="submit"
                  className="
                    ares-button

                    group

                    mt-7

                    w-full

                    justify-between

                    px-6
                  "
                >
                  <span>Giriş Yap</span>

                  <ArrowRight
                    size={14}
                    strokeWidth={1.3}
                    className="
                      transition-transform
                      duration-300

                      group-hover:translate-x-1
                    "
                  />
                </button>
              </form>

              {/* =============================================
                  LOGIN SECURITY
              ============================================== */}

              <div
                className="
                  mt-6

                  flex
                  items-start

                  gap-3

                  border-t
                  border-[var(--ares-border)]

                  pt-5
                "
              >
                <LockKeyhole
                  size={13}
                  strokeWidth={1.2}
                  className="
                    mt-[2px]

                    flex-shrink-0

                    text-[var(--ares-gold)]
                  "
                />

                <p
                  className="
                    max-w-[390px]

                    text-[8px]

                    leading-[1.7]

                    text-[var(--ares-muted-light)]
                  "
                >
                  Hesap bilgileriniz güvenli bağlantı
                  üzerinden işlenir ve yalnızca
                  hesabınıza erişim amacıyla
                  kullanılır.
                </p>
              </div>
            </div>
          </div>

          {/* =================================================
              REGISTER
          ================================================== */}

          <div
            className="
              py-10

              sm:py-14

              lg:py-16
              lg:pl-14

              xl:pl-20

              2xl:pl-24
            "
          >
            <div className="max-w-[520px]">
              {/* =============================================
                  REGISTER INTRO
              ============================================== */}

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
                    text-[7px]
                    font-semibold

                    uppercase
                    tracking-[0.18em]

                    text-[var(--ares-muted)]

                    sm:text-[8px]
                  "
                >
                  Yeni Müşteri
                </p>
              </div>

              <h2
                className="
                  mt-5

                  font-editorial

                  text-[38px]
                  font-medium

                  leading-[0.95]

                  tracking-[-0.035em]

                  text-[var(--ares-dark-deep)]

                  sm:text-[44px]

                  lg:text-[48px]
                "
              >
                ARES hesabınızı oluşturun.
              </h2>

              <p
                className="
                  mt-5

                  max-w-[430px]

                  text-[10px]

                  leading-[1.8]

                  text-[var(--ares-muted)]

                  sm:text-[11px]
                "
              >
                Hesabınızı oluşturarak
                siparişlerinizi takip edebilir, adres
                bilgilerinizi yönetebilir ve alışveriş
                sürecinizi daha hızlı
                tamamlayabilirsiniz.
              </p>

              {/* =============================================
                  REGISTER FORM
              ============================================== */}

              <form
                onSubmit={(event) =>
                  event.preventDefault()
                }
                className="mt-9"
              >
                {/* NAME + SURNAME */}

                <div
                  className="
                    grid

                    gap-7

                    sm:grid-cols-2
                    sm:gap-5
                  "
                >
                  <AccountInput
                    id="register-name"
                    label="Ad"
                    type="text"
                    name="name"
                    autoComplete="given-name"
                    placeholder="Adınız"
                  />

                  <AccountInput
                    id="register-surname"
                    label="Soyad"
                    type="text"
                    name="surname"
                    autoComplete="family-name"
                    placeholder="Soyadınız"
                  />
                </div>

                {/* EMAIL */}

                <div className="mt-7">
                  <AccountInput
                    id="register-email"
                    label="E-posta"
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="E-posta adresiniz"
                  />
                </div>

                {/* PASSWORDS */}

                <div
                  className="
                    mt-7

                    grid

                    gap-7

                    sm:grid-cols-2
                    sm:gap-5
                  "
                >
                  <PasswordInput
                    id="register-password"
                    label="Şifre"
                    name="password"
                    autoComplete="new-password"
                    placeholder="Şifre oluşturun"
                    visible={
                      registerPasswordVisible
                    }
                    onToggle={() =>
                      setRegisterPasswordVisible(
                        (current) => !current
                      )
                    }
                  />

                  <PasswordInput
                    id="register-password-again"
                    label="Şifre Tekrar"
                    name="passwordAgain"
                    autoComplete="new-password"
                    placeholder="Şifreyi tekrarlayın"
                    visible={
                      registerPasswordAgainVisible
                    }
                    onToggle={() =>
                      setRegisterPasswordAgainVisible(
                        (current) => !current
                      )
                    }
                  />
                </div>

                {/* ===========================================
                    TERMS
                ============================================ */}

                <label
                  className="
                    mt-6

                    flex
                    cursor-pointer

                    items-start

                    gap-3
                  "
                >
                  <input
                    type="checkbox"
                    className="
                      peer
                      sr-only
                    "
                  />

                  <span
                    className="
                      mt-[1px]

                      flex

                      h-[16px]
                      w-[16px]

                      flex-shrink-0

                      items-center
                      justify-center

                      border
                      border-[var(--ares-border-dark)]

                      transition-all
                      duration-300

                      peer-checked:border-[var(--ares-dark)]
                      peer-checked:bg-[var(--ares-dark)]
                    "
                  >
                    <Check
                      size={10}
                      strokeWidth={1.8}
                      className="
                        opacity-0

                        text-[var(--ares-background-soft)]

                        transition-opacity
                        duration-200

                        peer-checked:opacity-100
                      "
                    />
                  </span>

                  <span
                    className="
                      text-[8px]

                      leading-[1.7]

                      text-[var(--ares-muted)]
                    "
                  >
                    Üyelik koşullarını ve gizlilik
                    politikasını okudum ve kabul
                    ediyorum.
                  </span>
                </label>

                {/* REGISTER BUTTON */}

                <button
                  type="submit"
                  className="
                    ares-button

                    group

                    mt-7

                    w-full

                    justify-between

                    px-6
                  "
                >
                  <span>Hesap Oluştur</span>

                  <ArrowRight
                    size={14}
                    strokeWidth={1.3}
                    className="
                      transition-transform
                      duration-300

                      group-hover:translate-x-1
                    "
                  />
                </button>
              </form>

              {/* =============================================
                  BENEFITS
              ============================================== */}

              <div
                className="
                  mt-7

                  grid
                  grid-cols-3

                  border-t
                  border-[var(--ares-border)]

                  pt-5
                "
              >
                <Benefit
                  number="01"
                  text="Sipariş Takibi"
                />

                <Benefit
                  number="02"
                  text="Adres Yönetimi"
                />

                <Benefit
                  number="03"
                  text="Hızlı Alışveriş"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


/* =========================================================
   ACCOUNT INPUT
========================================================== */

function AccountInput({
  id,
  label,
  type,
  name,
  placeholder,
  autoComplete,
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
        type={type}
        name={name}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="
          ares-account-input

          mt-2

          min-h-[48px]
          w-full

          px-2

          text-[10px]

          sm:text-[11px]
        "
      />
    </div>
  );
}


/* =========================================================
   PASSWORD INPUT
========================================================== */

function PasswordInput({
  id,
  label,
  name,
  placeholder,
  autoComplete,
  visible,
  onToggle,
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

      <div
        className="
          relative

          mt-2
        "
      >
        <input
          id={id}
          type={
            visible
              ? "text"
              : "password"
          }
          name={name}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="
            ares-account-input

            mt-0

            min-h-[48px]
            w-full

            px-2
            pr-10

            text-[10px]

            sm:text-[11px]
          "
        />

        <button
          type="button"
          onClick={onToggle}
          aria-label={
            visible
              ? "Şifreyi gizle"
              : "Şifreyi göster"
          }
          className="
            absolute

            right-0
            top-1/2

            flex

            h-9
            w-9

            -translate-y-1/2

            items-center
            justify-end

            text-[var(--ares-muted)]

            transition-colors
            duration-300

            hover:text-[var(--ares-dark-deep)]

            focus:outline-none
            focus-visible:outline-none
          "
        >
          {visible ? (
            <EyeOff
              size={15}
              strokeWidth={1.2}
            />
          ) : (
            <Eye
              size={15}
              strokeWidth={1.2}
            />
          )}
        </button>
      </div>
    </div>
  );
}


/* =========================================================
   BENEFIT
========================================================== */

function Benefit({
  number,
  text,
}) {
  return (
    <div>
      <span
        className="
          font-editorial

          text-[15px]

          text-[var(--ares-gold)]
        "
      >
        {number}
      </span>

      <p
        className="
          mt-1

          text-[7px]
          font-semibold

          uppercase

          leading-[1.5]

          tracking-[0.08em]

          text-[var(--ares-muted)]

          sm:text-[8px]
        "
      >
        {text}
      </p>
    </div>
  );
}