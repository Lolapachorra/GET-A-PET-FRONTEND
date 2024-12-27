import { useState } from "react";
import formStyles from "./Form.module.css";

import Input from "./Input";
import Select from "./Select";

function PetForm({ handleSubmit, petData, btnText }) {

  const [submitbutton, setSubmitButton] = useState(false)
  const onFileChange = (e) => {
    setPreview(Array.from(e.target.files));
    setPet({ ...pet, images: [...e.target.files] });
  };
  const handleChange = (e) => {
    setPet({ ...pet, [e.target.name]: e.target.value });
  };
  const handleColor = (e) => {
    setPet({ ...pet, color: e.target.options[e.target.selectedIndex].text });
  };
  const submit = async (e) => {
    setSubmitButton(true);
    e.preventDefault();
    console.log(pet);
    await handleSubmit(pet);
    setSubmitButton(false);
  };
  const [pet, setPet] = useState(petData || {});
  const [preview, setPreview] = useState([]);
  const colors = ["Branco", "Preto", "Cinza", "Caramelo", "Mesclado"];
  return (
    <form onSubmit={submit} className={formStyles.form_container}>
      <div className={formStyles.preview_pet_images}>
        {preview.length > 0
          ? preview.map((image, index) => (
              <img
                src={URL.createObjectURL(image)}
                alt={pet.name}
                key={`${pet.name} + ${index}`}
              />
            ))
          : pet.images &&
            pet.images.map((image, index) => (
              <img
                src={`${image}`}
                alt={pet.name}
                key={`${pet.name} + ${index}`}
              />
            ))}
      </div>
      <Input
        text="Imagens do pet"
        type="file"
        name="images"
        handleOnChange={onFileChange}
        multiple={true}
      />
      <Input
        text="Nome do pet"
        type="text"
        name="name"
        handleOnChange={handleChange}
        placeholder="Digite um nome"
        value={pet.name || ""}
        maxLength={30}
      />
      <Input
        text="Idade do pet"
        type="text"
        name="age"
        handleOnChange={handleChange}
        placeholder="Digite a idade, se nao souber coloque ??"
        value={pet.age || ""}
        maxLength={2}
      />
      <Input
        text="Peso do pet"
        type="number"
        name="weight"
        handleOnChange={handleChange}
        placeholder="Digite o peso do pet"
        value={pet.weight || ""}
        max={100}
      />
      <Select
        text="Selecione a cor"
        options={colors}
        handleOnChange={handleColor}
        name="color"
        value={pet.color || ""}
      />
      <input className="enviar" type="submit" disabled={submitbutton} value={btnText}/>
    </form>
  );
}

export default PetForm;
