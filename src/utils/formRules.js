const rules = {
  emailPattern: (value) => {
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return (
      pattern.test(value) ||
      "Su correo debe seguir el patrón usuario@correo.com"
    );
  },
  noBlankTextRequired: (value) => !!value || "Campo no debe quedar vacío",
  min: (v) =>
    (!!v && v.length >= 8) ||
    "Tu contraseña debe contener al menos 8 carácteres",
  passwordRequired: (value) => !!value || "Una contraseña es requerida",
};

export default rules;
