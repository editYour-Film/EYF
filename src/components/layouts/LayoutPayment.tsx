import Container from "@/components/_shared/UI/Container";
import styles from "@/styles/SigninLayout.module.css";
import Footer from "../_shared/Footer";
import Header from "../_shared/Header";

const LayoutPayment = ({ children }: any) => {
  return (
    <>
      <div
        className={
          "bg-black min-h-screen flex flex-col justify-start gap-10 md:gap-16 pt-20 md:pt-0 " +
          styles.sign_in_container
        }
      >
        <Header />
        <main>
          <Container>{children}</Container>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default LayoutPayment;
