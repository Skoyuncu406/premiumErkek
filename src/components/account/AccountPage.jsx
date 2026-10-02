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

import useAuthStore from "@/store/useAuthStore";

/* =========================================================
   ACCOUNT PAGE
========================================================= */

export default function AccountPage() {
  /* =======================================================
     PASSWORD VISIBILITY
  ======================================================== */

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

  /* =======================================================
     AUTH
  ======================================================== */

  const currentUser = useAuthStore(
    (state) => state.currentUser,
  );

  const login = useAuthStore(
    (state) => state.login,
  );

  const register = useAuthStore(
    (state) => state.register,
  );

  const logout = useAuthStore(
    (state) => state.logout,
  );

  /* =======================================================
     MESSAGES
  ======================================================== */

  const [
    loginMessage,
    setLoginMessage,
  ] = useState("");

  const [
    registerMessage,
    setRegisterMessage,
  ] = useState("");

  /* =======================================================
     LOGIN
  ======================================================== */

  function handleLogin(event) {
    event.preventDefault();

    setLoginMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const email = formData.get("email");
    const password =
      formData.get("password");

    const result = login({
      email,
      password,
    });

    if (!result?.success) {
      setLoginMessage(
        result?.message ||
          "Giriş işlemi gerçekleştirilemedi.",
      );

      return;
    }

    setLoginMessage("");
    form.reset();
  }

  /* =======================================================
     REGISTER
  ======================================================== */

  function handleRegister(event) {
    event.preventDefault();

    setRegisterMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("name");
    const surname =
      formData.get("surname");

    const email = formData.get("email");

    const password =
      formData.get("password");

    const passwordAgain =
      formData.get("passwordAgain");

    const terms = formData.get("terms");

    if (password !== passwordAgain) {
      setRegisterMessage(
        "Şifreler birbiriyle eşleşmiyor.",
      );

      return;
    }

    if (!terms) {
      setRegisterMessage(
        "Devam etmek için üyelik koşullarını kabul edin.",
      );

      return;
    }

    const result = register({
      name,
      surname,
      email,
      password,
    });

    if (!result?.success) {
      setRegisterMessage(
        result?.message ||
          "Hesap oluşturulamadı.",
      );

      return;
    }

    setRegisterMessage("");
    form.reset();
  }

  /* =======================================================
     AUTHENTICATED ACCOUNT
  ======================================================== */

  if (currentUser) {
    return (
      <AuthenticatedAccount
        user={currentUser}
        onLogout={logout}
      />
    );
  }

  /* =======================================================
     LOGIN / REGISTER
  ======================================================== */

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
        {/* =================================================
            PAGE HEADER
        ================================================== */}

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

        {/* =================================================
            ACCOUNT GRID
        ================================================== */}

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
              {/* INTRO */}

              <SectionLabel>
                Mevcut Müşteri
              </SectionLabel>

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
                Siparişlerinizi
                görüntülemek, kayıtlı
                bilgilerinize erişmek ve
                alışverişinizi daha hızlı
                tamamlamak için hesabınıza
                giriş yapın.
              </p>

              {/* ===========================================
                  LOGIN FORM
              ============================================ */}

              <form
                onSubmit={handleLogin}
                className="mt-9"
              >
                <AccountInput
                  id="login-email"
                  label="E-posta"
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="E-posta adresiniz"
                  required
                />

                <div className="mt-7">
                  <PasswordInput
                    id="login-password"
                    label="Şifre"
                    name="password"
                    autoComplete="current-password"
                    placeholder="Şifreniz"
                    visible={
                      loginPasswordVisible
                    }
                    onToggle={() =>
                      setLoginPasswordVisible(
                        (current) =>
                          !current,
                      )
                    }
                    required
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

                      focus:outline-none
                      focus-visible:outline-none

                      sm:text-[8px]
                    "
                  >
                    Şifremi Unuttum
                  </button>
                </div>

                {/* MESSAGE */}

                {loginMessage && (
                  <FormMessage>
                    {loginMessage}
                  </FormMessage>
                )}

                {/* BUTTON */}

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

              {/* SECURITY */}

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
                  Bu demo sürümünde hesap
                  bilgileriniz yalnızca
                  üyelik deneyimini
                  göstermek amacıyla
                  tarayıcınızda saklanır.
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
              <SectionLabel>
                Yeni Müşteri
              </SectionLabel>

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
                favorilerinizi yönetebilir,
                alışveriş deneyiminizi
                kişiselleştirebilir ve ARES
                parçaları hakkında
                değerlendirme yapabilirsiniz.
              </p>

              {/* ===========================================
                  REGISTER FORM
              ============================================ */}

              <form
                onSubmit={handleRegister}
                className="mt-9"
              >
                {/* NAME */}

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
                    required
                  />

                  <AccountInput
                    id="register-surname"
                    label="Soyad"
                    type="text"
                    name="surname"
                    autoComplete="family-name"
                    placeholder="Soyadınız"
                    required
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
                    required
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
                        (current) =>
                          !current,
                      )
                    }
                    required
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
                        (current) =>
                          !current,
                      )
                    }
                    required
                  />
                </div>

                {/* TERMS */}

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
                    name="terms"
                    value="accepted"
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
                    Üyelik koşullarını ve
                    gizlilik politikasını
                    okudum ve kabul ediyorum.
                  </span>
                </label>

                {/* MESSAGE */}

                {registerMessage && (
                  <FormMessage>
                    {registerMessage}
                  </FormMessage>
                )}

                {/* BUTTON */}

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
                  <span>
                    Hesap Oluştur
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
                </button>
              </form>

              {/* BENEFITS */}

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
                  text="Favori Yönetimi"
                />

                <Benefit
                  number="03"
                  text="Değerlendirmeler"
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
   AUTHENTICATED ACCOUNT
========================================================= */

function AuthenticatedAccount({
  user,
  onLogout,
}) {
  const fullName = [
    user?.name,
    user?.surname,
  ]
    .filter(Boolean)
    .join(" ");

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
        {/* HEADER */}

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

        {/* CONTENT */}

        <div
          className="
            grid

            py-12

            sm:py-16

            lg:grid-cols-12
            lg:py-20
          "
        >
          {/* INTRO */}

          <div
            className="
              lg:col-span-7
              lg:pr-16

              xl:pr-24
            "
          >
            <SectionLabel>
              ARES Member
            </SectionLabel>

            <h1
              className="
                mt-5

                max-w-[650px]

                font-editorial

                text-[40px]
                font-medium

                leading-[0.95]

                tracking-[-0.035em]

                text-[var(--ares-dark-deep)]

                sm:text-[48px]
                lg:text-[58px]
              "
            >
              Hoş geldiniz,
              <br />
              {user?.name}.
            </h1>

            <p
              className="
                mt-6

                max-w-[480px]

                text-[10px]
                leading-[1.8]

                text-[var(--ares-muted)]

                sm:text-[11px]
              "
            >
              ARES hesabınız üzerinden
              favorilerinizi yönetebilir,
              alışverişinizi sürdürebilir ve
              ARES parçaları hakkında
              değerlendirme yapabilirsiniz.
            </p>
          </div>

          {/* INFORMATION */}

          <div
            className="
              mt-12

              border-t
              border-[var(--ares-border)]

              pt-8

              lg:col-span-5
              lg:mt-0
              lg:border-l
              lg:border-t-0
              lg:pl-14
              lg:pt-0

              xl:pl-20
            "
          >
            <p
              className="
                text-[7px]
                font-semibold

                uppercase
                tracking-[0.18em]

                text-[var(--ares-muted-light)]

                sm:text-[8px]
              "
            >
              Üyelik Bilgileri
            </p>

            <AccountInformation
              label="Ad Soyad"
              value={fullName}
            />

            <AccountInformation
              label="E-posta"
              value={user?.email}
            />

            {/* STATUS */}

            <div
              className="
                mt-8

                flex
                items-center
                gap-3

                border-t
                border-[var(--ares-border)]

                pt-6
              "
            >
              <span
                className="
                  flex
                  h-6
                  w-6

                  items-center
                  justify-center

                  bg-[var(--ares-dark-deep)]

                  text-[var(--ares-background-soft)]
                "
              >
                <Check
                  size={11}
                  strokeWidth={1.5}
                />
              </span>

              <div>
                <p
                  className="
                    text-[8px]
                    font-semibold

                    uppercase
                    tracking-[0.12em]

                    text-[var(--ares-dark-deep)]
                  "
                >
                  Aktif Üye
                </p>

                <p
                  className="
                    mt-1

                    text-[8px]

                    text-[var(--ares-muted-light)]
                  "
                >
                  Ürün değerlendirmesi
                  yapabilirsiniz.
                </p>
              </div>
            </div>

            {/* LOGOUT */}

            <button
              type="button"
              onClick={onLogout}
              className="
                group

                mt-10

                flex
                min-h-[48px]
                w-full

                items-center
                justify-between

                bg-[#211A16]

                px-6

                text-[#FAF8F3]

                transition-colors
                duration-300

                hover:bg-[#35271F]

                focus:outline-none
                focus-visible:outline-none
              "
            >
              <span
                className="
                  text-[8px]
                  font-semibold

                  uppercase
                  tracking-[0.14em]

                  text-[#FAF8F3]
                "
              >
                Çıkış Yap
              </span>

              <ArrowRight
                size={14}
                strokeWidth={1.3}
                className="
                  text-[#C9AD78]

                  transition-transform
                  duration-300

                  group-hover:translate-x-1
                "
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   SECTION LABEL
========================================================= */

function SectionLabel({ children }) {
  return (
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
        {children}
      </p>
    </div>
  );
}

/* =========================================================
   FORM MESSAGE
========================================================= */

function FormMessage({ children }) {
  return (
    <p
      role="alert"
      className="
        mt-5

        text-[9px]
        leading-[1.6]

        text-[var(--ares-brown)]
      "
    >
      {children}
    </p>
  );
}

/* =========================================================
   ACCOUNT INFORMATION
========================================================= */

function AccountInformation({
  label,
  value,
}) {
  return (
    <div
      className="
        mt-7

        border-b
        border-[var(--ares-border)]

        pb-5
      "
    >
      <p
        className="
          text-[7px]
          font-semibold

          uppercase
          tracking-[0.14em]

          text-[var(--ares-muted-light)]
        "
      >
        {label}
      </p>

      <p
        className="
          mt-2

          text-[11px]
          font-medium

          text-[var(--ares-dark-deep)]

          sm:text-[12px]
        "
      >
        {value || "—"}
      </p>
    </div>
  );
}

/* =========================================================
   ACCOUNT INPUT
========================================================= */

function AccountInput({
  id,
  label,
  type,
  name,
  placeholder,
  autoComplete,
  required = false,
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
        required={required}
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
========================================================= */

function PasswordInput({
  id,
  label,
  name,
  placeholder,
  autoComplete,
  visible,
  onToggle,
  required = false,
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
          required={required}
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
========================================================= */

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