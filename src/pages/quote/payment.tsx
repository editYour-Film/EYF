import Head from "next/head";
import Button from "@/components/_shared/form/Button";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LayoutPayment from "@/components/layouts/LayoutPayment";
import Input from "@/components/_shared/form/Input";
import validator from "validator";
import { inputErrors } from "@/const";

export default function Payment() {
  const { push } = useRouter();
  const options = [
    {
      label: "16/9",
      value: "16/9",
    },
    {
      label: "9/16",
      value: "9/16",
    },
    {
      label: "Carré",
      value: "carre",
    },
  ];
  const [selectedOption, setSelectedOption] = useState("16/9");

  const optionsBtn = [
    {
      label: "OUI",
      value: true,
    },
    {
      label: "NON",
      value: false,
    },
  ];
  const [selectedOptionBtn, setSelectedOptionBtn] = useState(true);

  const [videoInfo, setVideoInfo] = useState({
    format: "16/9",
    title: "",
    persontag: "",
    code: "",
    promo: true,
  });
  const [date, setDate] = useState({
    day: "",
    month: "",
    year: "",
  });

  const [dateError, setDateError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [personTagError, setPersonTagError] = useState("");
  const [codeError, setCodeError] = useState("");

  useEffect(() => {
    setVideoInfo((previousState: any) => ({
      ...previousState,
      format: selectedOption,
      promo: selectedOptionBtn,
    }));
  }, [selectedOption, selectedOptionBtn]);

  const onSubmit = () => {
    setDateError("");
    setTitleError("");
    setPersonTagError("");
    setCodeError("");

    let isValid = true;
    if (!validator.isDate(date.year + "/" + date.month + "/" + date.day)) {
      setDateError(inputErrors.invalid);
      isValid = false;
    }
    if (!validator.isAlphanumeric(videoInfo.title)) {
      setTitleError(inputErrors.invalid);
      isValid = false;
    }
    if (!validator.isAlphanumeric(videoInfo.persontag)) {
      setPersonTagError(inputErrors.invalid);
      isValid = false;
    }
    if (!validator.isAlphanumeric(videoInfo.title)) {
      setTitleError(inputErrors.invalid);
      isValid = false;
    }
    if (!validator.isAlphanumeric(videoInfo.persontag)) {
      setPersonTagError(inputErrors.invalid);
      isValid = false;
    }
    if (!validator.isAlphanumeric(videoInfo.code)) {
      setCodeError(inputErrors.invalid);
      isValid = false;
    }

    if (isValid) alert("OK");
  };

  return (
    <>
      <Head>
        <title>EditYour.Film</title>
        <meta name="description" content="" />
      </Head>

      <LayoutPayment>
        <div className="flex flex-col gap-8 md:gap-11">
          <div>
            <h3 className="text-2xl font-semibold mb-4">
              Validez votre commande
            </h3>
            <hr />
          </div>
          <p className="opacity-70 max-w-4xl">
            Le montage débute dès le lendemain de la commande si celle-ci est
            passée avant 14h00, la veille. <br />
            Lorsque vous aurez validé le montage définitif, vous recevrez le
            fichier de votre film monté, étalonné et mixé sur votre smartphone
            ou votre ordinateur. Une facture de prestation de montage vous est
            envoyée automatiquement. C’est simple !
          </p>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-32 ">
            <div className="bg-blackBerry rounded-xl p-4 -mx-4">
              <h4 className="text-lg ">Nom du monteur</h4>
              <h4 className="text-lg ">numéro de commande</h4>

              <div className="flex flex-col gap-2.5 mt-6">
                <InfoItem>
                  <p className="text-sm">Date</p>
                  <p className="text-sm">17/09/2021</p>
                </InfoItem>
                <InfoItem>
                  <div>
                    <p>Date</p>
                    <p className="opacity-70 text-sm">Temps de montage</p>
                    <p className="opacity-70 text-sm">Durée sélectionnée</p>
                  </div>
                  <div>
                    <p className="opacity-70 text-sm mt-6 text-right">
                      Xminutes Xsecondes
                    </p>
                    <p className="opacity-70 text-sm text-right">Xminutes</p>
                  </div>
                </InfoItem>
                <InfoItem>
                  <div>
                    <p>Modèle de montage</p>
                    <p className="opacity-70 text-sm">Format du modèle</p>
                  </div>
                  <div>
                    <p className="opacity-70 text-sm mt-6 text-right">ref</p>
                  </div>
                </InfoItem>
                <InfoItem>
                  <div>
                    <p>Séquences vidéos - photos</p>
                    <p className="opacity-70 text-sm">
                      Nombres de fichiers vidéos
                    </p>
                    <p className="opacity-70 text-sm">
                      Nombres de fichiers photos
                    </p>
                    <p className="opacity-70 text-sm">
                      Durée de tous les contenus
                    </p>
                  </div>
                  <div>
                    <p className="opacity-70 text-sm mt-6 text-right">nb</p>
                    <p className="opacity-70 text-sm text-right">nb</p>
                    <p className="opacity-70 text-sm text-right">
                      Xminutes Xsecondes
                    </p>
                  </div>
                </InfoItem>
                <InfoItem>
                  <div>
                    <p>Date de remise</p>
                  </div>
                  <div className="text-sm text-right">
                    <Input
                      type="date"
                      date={date}
                      setDate={setDate}
                      error={dateError}
                    />
                  </div>
                </InfoItem>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <Input
                type="radio"
                options={options}
                selectedOption={selectedOption}
                label="Choisissez le format"
                onChange={setSelectedOption}
              />

              <Input
                type="text"
                label="Titre de la vidéo"
                value={videoInfo.title}
                onChange={(e) => {
                  setVideoInfo((previousState: any) => ({
                    ...previousState,
                    title: e.target.value,
                  }));
                }}
                error={titleError}
              />
              <Input
                type="text"
                label="Personnes à titrer"
                helpIconText="Personnes à titrer"
                value={videoInfo.persontag}
                onChange={(e) => {
                  setVideoInfo((previousState: any) => ({
                    ...previousState,
                    persontag: e.target.value,
                  }));
                }}
                error={personTagError}
              />
              <Input
                type="text"
                label="Code de réduction"
                value={videoInfo.code}
                onChange={(e) => {
                  setVideoInfo((previousState: any) => ({
                    ...previousState,
                    code: e.target.value,
                  }));
                }}
                error={codeError}
              />

              <Input
                type="radio-btn"
                options={optionsBtn}
                selectedOption={selectedOptionBtn}
                label="Utilisation promotionnelle de votre vidéo"
                helpIconText="Utilisation promotionnelle de votre vidéo"
                onChange={setSelectedOptionBtn}
              />
              <Button text="Je valide" onClick={onSubmit} />
            </div>
          </div>
        </div>
      </LayoutPayment>
    </>
  );
}

type InfoItemProps = {
  children: React.ReactNode;
};
const InfoItem: React.FC<InfoItemProps> = ({ children }) => {
  return (
    <div className="flex justify-between p-4 bg-blackBerry rounded-md gap-4">
      {children}
    </div>
  );
};
